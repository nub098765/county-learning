#!/usr/bin/env python3
"""
make_audio_manifest.py - the list of county-name recordings the site knows about, and the sheet to record from.

THE RECORDINGS
  One file per county NAME (so one "Washington" serves every Washington County), named by the slug of the name:
      audio/washington.mp3
      audio/saint-louis.mp3          (Saint Louis, Missouri, Minnesota ... all share it)
  A few names are said differently in different states. For those, put the file in a folder named for the state
  and it wins over the shared one for that state only:
      audio/louisiana/calcasieu.mp3
  The slug is the name lowercased, accents and apostrophes dropped, anything else turned into "-":
      Prince George's -> prince-georges    Doña Ana -> dona-ana    Saint Louis -> saint-louis
  Use one file type for all of them (mp3 is safest; m4a also works everywhere).

RUN (from the site folder: the one with script.js and the audio/ folder)
  python make_audio_manifest.py             writes audio/manifest.js (what the site reads) and says what it found
  python make_audio_manifest.py --list      writes audio-needed.csv: every county name, how many counties use it,
                                            and whether it's recorded yet. THIS is the sheet to record from.
  python make_audio_manifest.py --list --state ohio     the same for just one state (a good pilot: Ohio is 88 names)

Re-run it whenever you add recordings; then upload audio/ with the site.
"""
import argparse, csv, glob, json, os, re, sys, unicodedata
from collections import defaultdict


def slug(name):
    n = unicodedata.normalize("NFD", name)
    n = "".join(c for c in n if not unicodedata.combining(c)).lower()
    n = re.sub(r"['\u2019\u02bb]", "", n)
    return re.sub(r"[^a-z0-9]+", "-", n).strip("-")


def county_names(script="script.js", manifest="maps/manifest.js"):
    """{state key: [(name)]} from the states written out in script.js plus the ones in maps/manifest.js."""
    out = defaultdict(list)
    if os.path.exists(script):
        js = open(script, encoding="utf-8").read()
        i = js.find("const stateData = {")
        blk = js[i:js.find("\n};", i)] if i >= 0 else ""
        for m in re.finditer(r'\{ *id: *"[^"]+", *name: *"([^"]+)", *stateKey: *"([^"]+)"', blk):
            out[m.group(2)].append(m.group(1))
    if os.path.exists(manifest):
        t = open(manifest, encoding="utf-8").read()
        try:
            for st in json.loads(t[t.index("["):t.rindex("]") + 1]):
                for _cid, name in st["counties"]:
                    out[st["key"]].append(name)
        except Exception as e:
            print(f"!! couldn't read {manifest}: {e}")
    return out


def scan(audio_dir):
    shared, by_state, exts = [], {}, defaultdict(int)
    for f in sorted(glob.glob(os.path.join(audio_dir, "*"))):
        if os.path.isfile(f) and not f.endswith(".js") and not os.path.basename(f).startswith("."):
            stem, ext = os.path.splitext(os.path.basename(f))
            shared.append(stem); exts[ext.lstrip(".").lower()] += 1
        elif os.path.isdir(f):
            key = os.path.basename(f)
            for g in sorted(glob.glob(os.path.join(f, "*"))):
                if os.path.isfile(g) and not os.path.basename(g).startswith("."):
                    stem, ext = os.path.splitext(os.path.basename(g))
                    by_state.setdefault(key, []).append(stem); exts[ext.lstrip(".").lower()] += 1
    return shared, by_state, exts


def main():
    ap = argparse.ArgumentParser(description="Write audio/manifest.js, or the sheet of names to record.")
    ap.add_argument("--audio", default="audio")
    ap.add_argument("--list", action="store_true", help="write audio-needed.csv instead")
    ap.add_argument("--state", help="with --list: only this state's names (its key, e.g. ohio or new_hampshire)")
    a = ap.parse_args()

    names = county_names()
    shared, by_state, exts = scan(a.audio)
    have = set(shared)
    for k, v in by_state.items():
        have |= {f"{k}/{s}" for s in v}

    if a.list:
        if not names:
            sys.exit("Couldn't find any county names (run this from the folder with script.js, and maps/manifest.js).")
        use = {a.state: names[a.state]} if a.state else names
        if a.state and a.state not in names:
            sys.exit(f"No state called {a.state!r}. Keys look like: {', '.join(sorted(names)[:8])} ...")
        rows = {}
        for st, lst in use.items():
            for n in lst:
                r = rows.setdefault(slug(n), {"name": n, "count": 0, "states": []})
                r["count"] += 1
                if st not in r["states"]:
                    r["states"].append(st)
        with open("audio-needed.csv", "w", newline="", encoding="utf-8") as f:
            w = csv.writer(f)
            w.writerow(["name to say", "file name (without the type)", "counties using it", "states", "recorded?"])
            for sl, r in sorted(rows.items()):
                w.writerow([r["name"], sl, r["count"], " ".join(sorted(r["states"])[:4]) + (" ..." if len(r["states"]) > 4 else ""),
                            "yes" if sl in have else ""])
        done = sum(1 for sl in rows if sl in have)
        print(f"audio-needed.csv: {len(rows)} distinct names ({done} recorded, {len(rows) - done} to go)"
              + (f" for {a.state}" if a.state else ""))
        return

    ext = max(exts, key=exts.get) if exts else "mp3"
    if len(exts) > 1:
        print(f"!! mixed file types {dict(exts)}: the site uses one type for all, so only .{ext} files will play.")
    if not shared and not by_state:
        print(f"No recordings found in {a.audio}/ yet. Writing an empty manifest (so nothing shows up).")
    known = {slug(n) for lst in names.values() for n in lst} if names else None
    if known:
        for s in shared:
            if s not in known:
                print(f"   ?? {a.audio}/{s}: no county has that name (typo in the file name?)")
        for k, lst in by_state.items():
            if k not in names:
                print(f"   ?? folder {a.audio}/{k}/ isn't a state key (use e.g. 'louisiana' or 'new_hampshire')")
            for s in lst:
                if s not in known:
                    print(f"   ?? {a.audio}/{k}/{s}: no county has that name")
    os.makedirs(a.audio, exist_ok=True)
    manifest = {"ext": ext, "shared": sorted(shared), "state": {k: sorted(v) for k, v in sorted(by_state.items())}}
    with open(os.path.join(a.audio, "manifest.js"), "w", encoding="utf-8") as f:
        f.write("window.__audioManifest = " + json.dumps(manifest, separators=(",", ":")) + ";\n")
    extra = sum(len(v) for v in by_state.values())
    print(f"{a.audio}/manifest.js: {len(shared)} shared recordings, {extra} state-specific, type .{ext}")
    if names:
        allslugs = {slug(n) for lst in names.values() for n in lst}
        print(f"   {len(allslugs & set(shared))} of {len(allslugs)} distinct county names are covered")


if __name__ == "__main__":
    main()
