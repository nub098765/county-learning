#!/usr/bin/env python3
"""
split_maps.py - turn counties-hires.json into the per-state files the site loads on demand.

WHAT IT MAKES
  maps/<svg id>.js    what script.js actually loads (loadStateMap): one line that hands the state's
                      county markup to window.__stateMaps["<svg id>"]. A <script> tag is used instead of
                      fetch() so it also works when index.html is opened by double-clicking.
  maps/<svg id>.svg   the same markup as a plain SVG file (handy for looking at a map; not loaded by the site)

  maps/manifest.js    list of every state that is NOT hard-coded in script.js (county ids + names, viewBox).
                      index.html loads it before script.js, and script.js uses it to add the state's stateData
                      entry, setup-list row and map box by itself. So a new state needs NO site edits:
                      run this, upload the maps/ folder, and the state lights up on the US map.
                      (Ids already in the manifest never change when you rebuild a state.)
                      Add --snippets to also get the old paste-it-yourself new-state-snippets/<key>.txt.

RUN  (from the folder that has script.js and index.html; the json comes from build_maps_hires.py)
  python split_maps.py                        # every state in map-data/counties-hires.json
  python split_maps.py --states 12            # just Florida  (FIPS codes, comma separated)
  python split_maps.py --json path/to/counties-hires.json
  python split_maps.py --snippets             # also write new-state-snippets/ (not needed any more)
  python split_maps.py --update-index         # also fix the viewBox of the empty <svg> shells in index.html
                                              # (a backup index.html.bak is saved first)

NOTES
  * Existing states keep the county ids/names already in script.js (that is what the game code looks counties
    up by); only the shapes change. A county that script.js doesn't know (or vice versa) is reported and the
    state is skipped, so a bad file can't silently break the game.
  * The empty <svg id="..."> shell in index.html owns the viewBox. If a state's new shapes have different
    proportions (Ohio, Wisconsin and Texas all did) the shell must be updated too - this script tells you,
    or does it for you with --update-index.
  * New county ids follow your convention: plain slug (alachua), and when that id is already taken anywhere
    (another state's county, or any element in index.html) the state's postal code is added (washington-fl).
"""
import argparse, html, json, os, re, sys, unicodedata

FIPS = {"01": "Alabama", "02": "Alaska", "04": "Arizona", "05": "Arkansas", "06": "California", "08": "Colorado",
        "09": "Connecticut", "10": "Delaware", "11": "District of Columbia", "12": "Florida", "13": "Georgia",
        "15": "Hawaii", "16": "Idaho", "17": "Illinois", "18": "Indiana", "19": "Iowa", "20": "Kansas",
        "21": "Kentucky", "22": "Louisiana", "23": "Maine", "24": "Maryland", "25": "Massachusetts",
        "26": "Michigan", "27": "Minnesota", "28": "Mississippi", "29": "Missouri", "30": "Montana",
        "31": "Nebraska", "32": "Nevada", "33": "New Hampshire", "34": "New Jersey", "35": "New Mexico",
        "36": "New York", "37": "North Carolina", "38": "North Dakota", "39": "Ohio", "40": "Oklahoma",
        "41": "Oregon", "42": "Pennsylvania", "44": "Rhode Island", "45": "South Carolina",
        "46": "South Dakota", "47": "Tennessee", "48": "Texas", "49": "Utah", "50": "Vermont", "51": "Virginia",
        "53": "Washington", "54": "West Virginia", "55": "Wisconsin", "56": "Wyoming",
        # territories (the names match the shapes on the US map picker in index.html)
        "60": "American Samoa", "69": "Northern Mariana Islands", "72": "Puerto Rico", "78": "U.S. Virgin Islands"}
POSTAL = {"Alabama": "al", "Alaska": "ak", "Arizona": "az", "Arkansas": "ar", "California": "ca", "Colorado": "co",
          "Connecticut": "ct", "Delaware": "de", "District of Columbia": "dc", "Florida": "fl", "Georgia": "ga",
          "Hawaii": "hi", "Idaho": "id", "Illinois": "il", "Indiana": "in", "Iowa": "ia", "Kansas": "ks",
          "Kentucky": "ky", "Louisiana": "la", "Maine": "me", "Maryland": "md", "Massachusetts": "ma",
          "Michigan": "mi", "Minnesota": "mn", "Mississippi": "ms", "Missouri": "mo", "Montana": "mt",
          "Nebraska": "ne", "Nevada": "nv", "New Hampshire": "nh", "New Jersey": "nj", "New Mexico": "nm",
          "New York": "ny", "North Carolina": "nc", "North Dakota": "nd", "Ohio": "oh", "Oklahoma": "ok",
          "Oregon": "or", "Pennsylvania": "pa", "Rhode Island": "ri", "South Carolina": "sc",
          "South Dakota": "sd", "Tennessee": "tn", "Texas": "tx", "Utah": "ut", "Vermont": "vt",
          "Virginia": "va", "Washington": "wa", "West Virginia": "wv", "Wisconsin": "wi", "Wyoming": "wy",
          "American Samoa": "as", "Northern Mariana Islands": "mp", "Puerto Rico": "pr", "U.S. Virgin Islands": "vi"}


# County spellings that are fixed by hand: state FIPS -> {the Census spelling: how the site should spell it}.
# (Matched ignoring case and spaces, so "Le Flore", "LeFlore" and "LE FLORE" all hit the same entry.)
# Applies to every state the site learns from maps/manifest.js; states written out in script.js keep the
# spellings they already have there.
NAME_FIXES = {
    "21": {"LaRue": "Larue"},        # Kentucky
    "40": {"Le Flore": "LeFlore"},   # Oklahoma
    "22": {"De Soto": "DeSoto"},     # Louisiana
    "17": {"De Witt": "DeWitt"},     # Illinois
}


def strip_accents(s):
    return "".join(c for c in unicodedata.normalize("NFD", s) if not unicodedata.combining(c))


def norm(s):
    """Name key that ignores case, punctuation, accents and St./Saint (so 'St. Croix' == 'Saint Croix')."""
    return re.sub(r"[^a-z]", "", strip_accents(s).lower().replace("saint", "st"))


def slug(s):
    return re.sub(r"[^a-z0-9]+", "-", strip_accents(s).lower()).strip("-")


def parse_state_data(js):
    """{key: {name, svgId, counties:[(id, name), ...]}} read from `const stateData = {...}` in script.js."""
    i = js.index("const stateData = {")
    blk = js[i:js.index("\n};", i)]
    starts = [(m.start(), m.group(1)) for m in re.finditer(r"^  ([a-z_]+): *\{", blk, flags=re.M)]
    out = {}
    for n, (pos, key) in enumerate(starts):
        seg = blk[pos:(starts[n + 1][0] if n + 1 < len(starts) else len(blk))]
        out[key] = {"name": re.search(r'name: *"([^"]+)"', seg).group(1),
                    "svgId": re.search(r'svgId: *"([^"]+)"', seg).group(1),
                    "counties": re.findall(r'\{ *id: *"([^"]+)", *name: *"([^"]+)"', seg)}
    return out


def load_manifest(path):
    """{key: entry} from maps/manifest.js, or {} if it doesn't exist (or can't be read)."""
    if not os.path.exists(path):
        return {}
    try:
        txt = open(path, encoding="utf-8").read()
        lst = json.loads(txt[txt.index("["):txt.rindex("]") + 1])
        return {m["key"]: m for m in lst}
    except Exception as e:
        print(f"!! couldn't read {path} ({e}); starting a fresh manifest")
        return {}


def esc(s):
    return html.escape(s, quote=True)


def fmt_scale(v):
    v = float(v)
    return str(int(v)) if v.is_integer() else str(v)


def path_markup(cid, display, label, d):
    return (f'<path id="{esc(cid)}" data-name="{esc(display)}" class="county" tabindex="0" role="button" '
            f'aria-label="{esc(label)}" fill-rule="evenodd" d="{d}" />')


def main():
    ap = argparse.ArgumentParser(description="Split counties-hires.json into maps/<svg id>.js files.")
    ap.add_argument("--json", help="counties-hires.json (default: map-data/counties-hires.json, then ./counties-hires.json)")
    ap.add_argument("--states", help="comma list of state FIPS codes to build (default: every state in the json)")
    ap.add_argument("--script", default="script.js")
    ap.add_argument("--index", default="index.html")
    ap.add_argument("--out", default="maps")
    ap.add_argument("--snippets", action="store_true", help="also write new-state-snippets/<key>.txt (manual paste-in pieces)")
    ap.add_argument("--update-index", action="store_true", help="fix viewBox of the <svg> shells in index.html")
    a = ap.parse_args()

    jpath = a.json or next((p for p in ("map-data/counties-hires.json", "counties-hires.json") if os.path.exists(p)), None)
    if not jpath:
        sys.exit("Can't find counties-hires.json. Run build_maps_hires.py first, or pass --json path.")
    for p in (a.script, a.index):
        if not os.path.exists(p):
            sys.exit(f"Can't find {p}. Run this from the folder that contains script.js and index.html.")

    data = json.load(open(jpath, encoding="utf-8"))
    js = open(a.script, encoding="utf-8").read()
    idx = open(a.index, encoding="utf-8").read()
    states = parse_state_data(js)
    in_script = set(states)
    mpath = os.path.join(a.out, "manifest.js")
    manifest = load_manifest(mpath)
    for k, m in manifest.items():            # states the site learned from the manifest keep their ids too
        if k not in states:
            states[k] = {"name": m["name"], "svgId": m["svgId"], "counties": [tuple(c) for c in m["counties"]]}
    by_name = {s["name"]: (k, s) for k, s in states.items()}
    taken = {cid for s in states.values() for cid, _ in s["counties"]} | set(re.findall(r'\bid="([^"]+)"', idx))
    want = a.states.split(",") if a.states else list(data)
    os.makedirs(a.out, exist_ok=True)
    problems, idx_new = [], idx

    print(f"Reading {jpath}: {len(data)} state(s) -> building {', '.join(want)}\n")
    for fips in want:
        if fips not in data:
            problems.append(f"{fips}: not in {jpath}"); print(f"!! {fips}: not in the json, skipped"); continue
        if fips not in FIPS:
            problems.append(f"{fips}: unknown FIPS"); print(f"!! {fips}: unknown state code, skipped"); continue
        name, st = FIPS[fips], data[fips]
        counties = st["counties"]
        fixes = {re.sub(r"[^a-z]", "", k.lower()): v for k, v in NAME_FIXES.get(fips, {}).items()}
        if fixes:
            fixed = []
            for c in counties:
                new = fixes.get(re.sub(r"[^a-z]", "", c["name"].lower()))
                if new and new != c["name"]:
                    lsad = c["namelsad"]
                    c = {**c, "name": new,
                         "namelsad": new + lsad[len(c["name"]):] if lsad.startswith(c["name"]) else lsad}
                    print(f"   spelling: {new}")
                fixed.append(c)
            counties = fixed
        is_new = name not in by_name
        if not is_new:
            key, sd = by_name[name]
            svg_id = sd["svgId"]
            known = {norm(n): (cid, n) for cid, n in sd["counties"]}
            got = {norm(c["name"]) for c in counties}
            missing, extra = sorted(set(known) - got), sorted(got - set(known))
            if missing or extra:
                if key in manifest and key not in in_script:
                    print(f"   note: {name}'s county list changed since the manifest was written "
                          f"(missing {[known[k][1] for k in missing]}, new {extra}); giving it fresh ids")
                    for cid, _ in sd["counties"]:
                        taken.discard(cid)
                    is_new = True
                else:
                    msg = (f"{name}: counties don't line up with script.js "
                           f"(in script.js but not in the json: {[known[k][1] for k in missing]}; "
                           f"in the json but not in script.js: {extra}) - skipped")
                    problems.append(msg); print("!! " + msg); continue
        if not is_new:
            rows = []
            for c in counties:
                cid, disp = known[norm(c["name"])]
                if key not in in_script:
                    disp = c["name"]            # manifest states: always the current spelling (see NAME_FIXES)
                suffix = c["namelsad"][len(c["name"]):] if c["namelsad"].startswith(c["name"]) else " County"
                rows.append((cid, disp, disp + suffix, c["d"]))
        else:
            key = re.sub(r"[^a-z0-9]+", "_", name.lower()).strip("_")
            svg_id = "svg-" + re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-")
            rows = []
            for c in counties:
                cid = slug(c["name"])
                if cid in taken:
                    cid = f'{cid}-{POSTAL[name]}'
                if cid in taken:
                    cid = f"{cid}-county"
                taken.add(cid)
                rows.append((cid, c["name"], c["namelsad"], c["d"]))
            if any(not r[3] for r in rows):
                print(f"   WARNING: no shape for {[r[1] for r in rows if not r[3]]}")

        # "scale" = the map's width / 800. build_maps_hires.py writes it (20 for its 16000-wide maps); an older file
        # without it (like an 800-wide territories.json) gets it worked out from its viewBox instead of a blind 20.
        scale = fmt_scale(st.get("scale") or float(st["viewBox"].split()[2]) / 800)
        vb = st["viewBox"]
        markup = (f'<svg id="{svg_id}" class="state-map" viewBox="{vb}" data-unit-scale="{scale}" width="100%" '
                  f'xmlns="http://www.w3.org/2000/svg" aria-label="Map of {esc(name)} Counties">\n'
                  + "\n".join(path_markup(*r) for r in rows) + "\n</svg>")
        with open(os.path.join(a.out, svg_id + ".svg"), "w", encoding="utf-8") as f:
            f.write(markup)
        with open(os.path.join(a.out, svg_id + ".js"), "w", encoding="utf-8") as f:   # ensure_ascii: safe whatever charset the server says
            f.write(f'(window.__stateMaps = window.__stateMaps || {{}})[{json.dumps(svg_id)}] = {json.dumps(markup)};\n')
        size = os.path.getsize(os.path.join(a.out, svg_id + ".js"))
        line = f"{'NEW ' if is_new else '    '}{name}: {len(rows)} counties -> {a.out}/{svg_id}.js ({size/1e6:.2f} MB)"

        if key not in in_script:
            manifest[key] = {"key": key, "name": name, "svgId": svg_id, "viewBox": vb, "scale": float(scale),
                             "counties": [[r[0], r[1]] for r in rows]}
            line += "   (in manifest.js)"
        if key in in_script:
            m = re.search(r'(<svg id="' + re.escape(svg_id) + r'"[^>]*?viewBox=")([^"]+)(")', idx)
            if not m:
                line += "   !! no <svg id=\"%s\"> shell found in index.html" % svg_id
            elif m.group(2) != vb:
                if a.update_index:
                    idx_new = idx_new.replace(m.group(0), m.group(1) + vb + m.group(3), 1)
                    line += f"   shell viewBox {m.group(2)} -> {vb} (updated)"
                else:
                    line += f"\n      !! index.html shell viewBox is '{m.group(2)}' but the new shapes need '{vb}'. Update it, or re-run with --update-index"
            else:
                line += "   (shell viewBox matches)"
        print(line)

        if is_new and a.snippets:
            os.makedirs("new-state-snippets", exist_ok=True)
            entries = ",\n".join(f'      {{ id: "{cid}", name: "{disp}", stateKey: "{key}" }}' for cid, disp, _, _ in rows)
            txt = f"""===== NEW STATE: {name}  (key "{key}", svg id "{svg_id}", {len(rows)} counties) =====
Paste each piece where it says. Nothing else needs to change; the map shapes are in {a.out}/{svg_id}.js.
Upload the whole {a.out}/ folder with the site.

----- 1) script.js: inside `const stateData = {{ ... }}`, as a new entry (anywhere between two entries; order sets list order) -----
  {key}: {{
    name: "{name}",
    svgId: "{svg_id}",
    counties: [
{entries}
    ]
  }},

----- 2) index.html: in the state list, among the other <div class="state-row" ...> blocks -----
     <div class="state-row" id="state-{key}" data-state="{key}">
       <span class="state-name">{name}</span>
       <span class="state-count">{len(rows)} counties</span>
     </div>

----- 3) index.html: among the other map boxes (next to the "... SVG Map" blocks) -----
     <!-- {name} SVG Map -->
     <div class="map-box hidden" data-state="{key}">
     <svg id="{svg_id}" class="state-map hidden" viewBox="{vb}" data-unit-scale="{scale}" width="100%" xmlns="http://www.w3.org/2000/svg" aria-label="Map of {name} Counties"><!-- {a.out}/{svg_id}.svg: loaded on demand --></svg>
     </div>

----- 4) style.css: next to the other "body.scale-states-by-size #svg-..." lines (optional; 430px is a starting guess, tune to taste) -----
body.scale-states-by-size #{svg_id} {{ --w: 430px; }}
"""
            with open(os.path.join("new-state-snippets", key + ".txt"), "w", encoding="utf-8") as f:
                f.write(txt)
            print(f"      -> new-state-snippets/{key}.txt  (4 pieces to paste in)")

    if manifest:
        ordered = sorted(manifest.values(), key=lambda m: m["name"])
        with open(mpath, "w", encoding="utf-8") as f:
            f.write("window.__stateManifest = " + json.dumps(ordered, separators=(",", ":")) + ";\n")
        print(f"\n{mpath}: {len(ordered)} state(s) the site picks up automatically: {', '.join(m['name'] for m in ordered)}")
    if a.update_index and idx_new != idx:
        if not os.path.exists(a.index + ".bak"):
            open(a.index + ".bak", "w", encoding="utf-8").write(idx)
        open(a.index, "w", encoding="utf-8").write(idx_new)
        print(f"\nindex.html updated (backup: {a.index}.bak)")
    if problems:
        print("\nPROBLEMS (those states were NOT written):"); [print("  - " + p) for p in problems]; sys.exit(1)
    print("\nDone.")


if __name__ == "__main__":
    main()