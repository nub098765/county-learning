#!/usr/bin/env python3
"""
find_thin_lakes.py - find lakes that are too thin to be worth drawing, and (optionally) fill them in.

WHAT IT LOOKS FOR
  In your maps/svg-*.js files a lake is a gap in the land (the counties around it have a bite taken out
  of them). Long, narrow lakes (Lake of the Ozarks, Truman Lake...) are only a couple of pixels wide at
  game size, so the two shorelines merge into a gray scribble. For every gap this script measures the
  WIDEST point of the lake in screen pixels (at --ref-px, default 700 px wide map) and calls it thin if
  that is under --min-width-px (default 10). Wide lakes (Okeechobee, Winnebago, Mille Lacs) are kept.
  Real islands are never touched, and a gap is only ever "water": land that belongs to another county
  is not a gap.

RUN (from your site folder, the one that contains maps/):
    python find_thin_lakes.py                       report only, changes nothing
    python find_thin_lakes.py --preview             also writes thin-lake-preview/<map>.svg (open in a browser:
                                                    red = would be filled, blue = kept)
    python find_thin_lakes.py --write               fill the thin lakes (backups go to maps/_before_lake_fill/)
    python find_thin_lakes.py --only svg-missouri --min-width-px 14 --preview
  When a lake is filled, each county around it grows into it until the lake is used up, so county borders
  end up roughly halfway across where the lake was.
Needs shapely. Re-run make_lod_maps.py afterwards if you use the light .lo.js maps.
"""
import argparse, glob, html, json, math, os, re, shutil, sys
from shapely.geometry import Polygon
from shapely.ops import polylabel, unary_union
from shapely import make_valid

TOKEN = re.compile(r'([MmLlHhVvZz])|(-?\d*\.?\d+(?:[eE][-+]?\d+)?)')
PAD = 2.0          # counties are padded by this much (map units) so hairline gaps along borders don't count


def rings_of(d):
    if not re.match(r'^[\sMmLlHhVvZz,\-\d.eE+]*$', d): return None
    rings, cur, x, y, sx, sy, cmd = [], None, 0.0, 0.0, 0.0, 0.0, None
    toks = [(m.group(1), m.group(2)) for m in TOKEN.finditer(d)]
    i = 0
    def num():
        nonlocal i
        v = float(toks[i][1]); i += 1; return v
    while i < len(toks):
        c, n = toks[i]
        if c:
            cmd = c; i += 1
            if cmd in 'Zz':
                if cur and len(cur) >= 3: rings.append(cur)
                cur = None; x, y = sx, sy
            continue
        if cmd is None: return None
        if cmd in 'Mm':
            dx, dy = num(), num(); x, y = (x + dx, y + dy) if cmd == 'm' else (dx, dy)
            if cur and len(cur) >= 3: rings.append(cur)
            cur = [(x, y)]; sx, sy = x, y; cmd = 'l' if cmd == 'm' else 'L'
        elif cmd in 'Ll':
            dx, dy = num(), num(); x, y = (x + dx, y + dy) if cmd == 'l' else (dx, dy)
            cur = [(x, y)] if cur is None else cur + [(x, y)]
        elif cmd in 'Hh':
            v = num(); x = x + v if cmd == 'h' else v
            if cur is None: return None
            cur.append((x, y))
        elif cmd in 'Vv':
            v = num(); y = y + v if cmd == 'v' else v
            if cur is None: return None
            cur.append((x, y))
        else:
            return None
    if cur and len(cur) >= 3: rings.append(cur)
    return rings


def evenodd(rings):
    g = None
    for r in rings:
        p = make_valid(Polygon(r))
        if p.is_empty: continue
        g = p if g is None else g.symmetric_difference(p)
    return g


def polys_of(g):
    if g is None or g.is_empty: return []
    if g.geom_type == 'Polygon': return [g]
    return [p for x in getattr(g, 'geoms', []) for p in polys_of(x)]


def ring_to_path(ring):
    pts = [(int(round(x)), int(round(y))) for x, y in ring]
    out = [pts[0]]
    for p in pts[1:]:
        if p != out[-1]: out.append(p)
    if len(out) > 1 and out[0] == out[-1]: out.pop()
    if len(out) < 3: return None
    return f"M{out[0][0]} {out[0][1]}l" + " ".join(f"{b[0]-a[0]} {b[1]-a[1]}" for a, b in zip(out, out[1:])) + "z"


def geom_to_d(g):
    parts = []
    for p in polys_of(g):
        for ring in [p.exterior, *p.interiors]:
            s = ring_to_path(list(ring.coords)[:-1])
            if s: parts.append(s)
    return "".join(parts)


def read_counties(svg):
    out = []
    for m in re.finditer(r'<path\b[^>]*>', svg):
        tag = m.group(0)
        i = re.search(r'\sid="([^"]+)"', tag); d = re.search(r'\sd="([^"]*)"', tag)
        if not (i and d) or 'county' not in tag: continue
        rings = rings_of(d.group(1))
        g = evenodd(rings) if rings else None
        if g is None or g.is_empty: continue
        n = re.search(r'data-name="([^"]*)"', tag)
        out.append({"id": i.group(1), "name": html.unescape(n.group(1)) if n else i.group(1), "d": d.group(1), "geom": g})
    return out


def find_gaps(counties, raw_union):
    """Every gap (hole) in the land, as the true water shape with islands cut out."""
    land = unary_union([c["geom"].buffer(PAD) for c in counties])
    gaps = []
    for p in polys_of(land):
        for ring in p.interiors:
            fill = Polygon(ring).buffer(PAD).difference(raw_union)
            if not fill.is_empty and fill.area > 0: gaps.append(fill)
    return gaps


def find_notches(counties, radius):
    """Bites out of the state's outer edge (bays, inlets, border lakes like Bear Lake / Lake Mead).
    Found by 'closing' the outline: smoothing over any notch narrower than 2*radius."""
    land = unary_union([c["geom"].buffer(PAD) for c in counties])
    outline = unary_union([Polygon(p.exterior) for p in polys_of(land)])   # outer edge only, holes ignored
    closed = outline.buffer(radius).buffer(-radius)
    return [p for p in polys_of(closed.difference(outline)) if p.area > 0]


def measure(fill, px_per_unit):
    best = 0.0
    for part in polys_of(fill):
        pt = polylabel(part, tolerance=max(0.5, math.sqrt(part.area) / 60))
        best = max(best, 2 * part.boundary.distance(pt))
    per = fill.length
    return {"width_px": best * px_per_unit, "width": best, "area_px2": fill.area * px_per_unit ** 2,
            "compact": (4 * math.pi * fill.area / per ** 2) if per else 0.0}


def split_fill(fill, near, step):
    """Grow each neighbouring county into `fill` ring by ring. near: {id: geom}. -> {id: geometry}"""
    remaining, grown, got = fill, dict(near), {k: [] for k in near}
    ids = list(near)
    for it in range(300):
        if remaining.is_empty or remaining.area < 1.0: break
        for j in range(len(ids)):
            k = ids[(j + it) % len(ids)]            # rotate the order so nobody is favoured
            piece = grown[k].buffer(step).intersection(remaining)
            if piece.is_empty: continue
            got[k].append(piece); grown[k] = grown[k].union(piece); remaining = remaining.difference(piece)
    for p in polys_of(remaining):                    # anything unreachable goes to the closest county
        k = min(ids, key=lambda i: near[i].distance(p))
        got[k].append(p)
    return {k: unary_union(v) for k, v in got.items() if v}


def write_preview(path, vb, counties, rows):
    w, h = vb[2], vb[3]
    out = [f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb[0]} {vb[1]} {w} {h}" width="1000" style="background:#fff">']
    for c in counties:
        out.append(f'<path d="{c["d"]}" fill="#efede4" stroke="#999" stroke-width="{w/1500:.1f}" fill-rule="evenodd"/>')
    for r in rows:
        col = "#d62728" if r["fill_it"] else "#1f77b4"
        out.append(f'<path d="{geom_to_d(r["fill"])}" fill="{col}" stroke="{col}" stroke-width="{w/700:.1f}" fill-rule="evenodd" opacity=".85"/>')
        cx, cy = r["fill"].representative_point().coords[0]
        out.append(f'<text x="{cx:.0f}" y="{cy - w/150:.0f}" font-size="{w/90:.0f}" fill="{col}" font-family="sans-serif" text-anchor="middle">{r["width_px"]:.0f}px</text>')
    out.append("</svg>")
    open(path, "w", encoding="utf-8").write("\n".join(out))


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--maps", default="maps"); ap.add_argument("--only", help="just this map, e.g. svg-missouri")
    ap.add_argument("--min-width-px", type=float, default=10.0, help="lakes whose widest point is under this are 'thin' (default 10)")
    ap.add_argument("--ref-px", type=float, default=700.0, help="screen width the map is judged at (default 700)")
    ap.add_argument("--keep", action="append", default=[], help="never fill a lake that touches ALL of these counties, e.g. --keep Seneca,Schuyler (can be repeated)")
    ap.add_argument("--notch", action="append", default=[], help="also fill edge notches (border lakes) touching ALL of these counties, e.g. --notch Rich or --notch Clark (can be repeated)")
    ap.add_argument("--notch-px", type=float, default=80.0, help="biggest edge notch (in screen px) that may be filled (default 80)")
    ap.add_argument("--preview", action="store_true"); ap.add_argument("--write", action="store_true")
    ap.add_argument("--all", action="store_true", help="list every gap, not just the 12 widest per map")
    a = ap.parse_args()
    files = sorted(f for f in glob.glob(os.path.join(a.maps, "*.js")) if not f.endswith(".lo.js") and os.path.basename(f) != "manifest.js")
    if a.only: files = [f for f in files if os.path.basename(f)[:-3] == a.only]
    if not files: sys.exit(f"No map files found in {a.maps}/")
    total_fill = total_keep = 0
    for f in files:
        src = open(f, encoding="utf-8").read()
        m = re.match(r'^(.*?\]\s*=\s*)(".*")(\s*;?\s*)$', src, re.S)
        if not m: continue
        svg = json.loads(m.group(2))
        vbm = re.search(r'viewBox="([\d.\-\s]+)"', svg)
        if not vbm: continue
        vb = [float(v) for v in vbm.group(1).split()]
        counties = read_counties(svg)
        if len(counties) < 2: continue
        raw = unary_union([c["geom"] for c in counties])
        ppu = a.ref_px / vb[2]
        rows = []
        for fill in find_gaps(counties, raw):
            r = measure(fill, ppu); r["fill"] = fill
            r["next_to"] = sorted({c["name"] for c in counties if c["geom"].distance(fill) <= 2 * PAD + 1})
            protected = any(all(n.strip().lower() in {x.lower() for x in r["next_to"]} for n in grp.split(",")) for grp in a.keep)
            r["fill_it"] = r["width_px"] < a.min_width_px and not protected
            if protected and r["width_px"] < a.min_width_px: r["next_to"].append("(kept by --keep)")
            rows.append(r)
        if a.notch:
            for fill in find_notches(counties, a.notch_px / ppu):
                r = measure(fill, ppu); r["fill"] = fill
                r["next_to"] = sorted({c["name"] for c in counties if c["geom"].distance(fill) <= 2 * PAD + 1})
                low = [x.lower() for x in r["next_to"]]
                hit = any(all(any(n.strip().lower() in x for x in low) for n in grp.split(",")) for grp in a.notch)
                if not hit: continue
                r["fill_it"] = True; r["next_to"].append("(edge notch, via --notch)")
                rows.append(r)
        if not rows: continue
        rows.sort(key=lambda r: -r["width_px"])
        nf = sum(r["fill_it"] for r in rows); total_fill += nf; total_keep += len(rows) - nf
        print(f"\n{os.path.basename(f)}: {len(rows)} lakes/gaps ({nf} thin -> fill, {len(rows)-nf} kept)")
        print(f"   {'widest':>7} {'area':>8} {'compact':>8}  decision  next to")
        for r in rows if a.all else rows[:12]:
            print(f"   {r['width_px']:6.1f}px {r['area_px2']:7.0f}px2 {r['compact']:8.2f}  {'FILL' if r['fill_it'] else 'keep':8s}  {', '.join(r['next_to'][:4])}")
        if not a.all and len(rows) > 12: print(f"   ... and {len(rows)-12} more (thinner ones; --all lists them)")
        if a.preview:
            os.makedirs("thin-lake-preview", exist_ok=True)
            write_preview(os.path.join("thin-lake-preview", os.path.basename(f)[:-3] + ".svg"), vb, counties, rows)
        if a.write and nf:
            by_id = {c["id"]: c for c in counties}; changed = set()
            for r in (r for r in rows if r["fill_it"]):
                near = {c["id"]: c["geom"].intersection(r["fill"].buffer(r["width"] * 3 + 20)) for c in counties if c["geom"].distance(r["fill"]) <= 2 * PAD + 1}
                if not near: continue
                for k, piece in split_fill(r["fill"], near, max(2.0, r["width"] / 8)).items():
                    by_id[k]["geom"] = make_valid(unary_union([by_id[k]["geom"], piece])); changed.add(k)
            for k in changed:
                c = by_id[k]; newd = geom_to_d(c["geom"])
                if newd: svg = svg.replace(f' d="{c["d"]}"', f' d="{newd}"', 1)
            bak = os.path.join(a.maps, "_before_lake_fill"); os.makedirs(bak, exist_ok=True)
            if not os.path.exists(os.path.join(bak, os.path.basename(f))): shutil.copy(f, bak)
            open(f, "w", encoding="utf-8").write(m.group(1) + json.dumps(svg, ensure_ascii=False, separators=(",", ":")) + m.group(3))
            print(f"   wrote {os.path.basename(f)}: {len(changed)} counties grew into {nf} thin lakes")
    print(f"\n{total_fill} thin lakes {'filled' if a.write else 'would be filled'}, {total_keep} kept." + ("" if a.write else "  (add --write to apply)"))


if __name__ == "__main__":
    main()
