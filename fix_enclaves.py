#!/usr/bin/env python3
"""
fix_enclaves.py - cut a city/county out of the county that covers it, in your maps/svg-*.js files.

PROBLEM: in some maps a small shape (an independent city such as Lexington VA, or any enclave) sits INSIDE a
bigger county whose outline has no hole for it. The county is drawn later, so it paints right over the small
shape: the small one is invisible, its callout arrow points at "nothing", and clicks go to the county.

FIX: for every pair where a shape is (almost) completely inside a bigger one, the bigger one gets a hole where
the small one is. Nothing else is touched: no outline is simplified, no ring or island is dropped, and shapes
that already have the hole are left alone.

RUN (from your site folder, the one that contains maps/):
    python fix_enclaves.py                  report only: lists what it would fix, changes nothing
    python fix_enclaves.py --write          fix the files (originals are saved in maps/_before_enclave_fix/)
    python fix_enclaves.py --maps maps --write --inside 0.9
Needs shapely (you already have it if build_maps_hires.py runs). Re-run make_lod_maps.py afterwards if you use it.
"""
import argparse, glob, json, os, re, shutil, sys
from shapely.geometry import Polygon
from shapely.strtree import STRtree

TOKEN = re.compile(r'([MmLlHhVvZz])|(-?\d*\.?\d+(?:[eE][-+]?\d+)?)')


def rings_of(d):
    """Plain-lines path (M/L/H/V/Z, relative or absolute) -> list of rings; None if it has curves etc."""
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
        p = Polygon(r).buffer(0)
        if p.is_empty: continue
        g = p if g is None else g.symmetric_difference(p)
    return g


def ring_to_path(ring):
    pts = [(int(round(x)), int(round(y))) for x, y in ring]
    out = [pts[0]]
    for p in pts[1:]:
        if p != out[-1]: out.append(p)
    if len(out) > 1 and out[0] == out[-1]: out.pop()
    if len(out) < 3: return None
    return f"M{out[0][0]} {out[0][1]}l" + " ".join(f"{b[0]-a[0]} {b[1]-a[1]}" for a, b in zip(out, out[1:])) + "z"


def geom_to_d(g):
    polys = [g] if g.geom_type == "Polygon" else [p for p in g.geoms if p.geom_type == "Polygon"]
    parts = []
    for p in polys:
        for ring in [p.exterior, *p.interiors]:
            s = ring_to_path(list(ring.coords)[:-1])
            if s: parts.append(s)
    return "".join(parts)


def fix_text(text, inside_frac):
    """Returns (new_text, [(small_id, big_id), ...])."""
    tags = [(m.start(), m.end(), m.group(0)) for m in re.finditer(r'<path\b[^>]*>', text)]
    items = []
    for s, e, tag in tags:
        mid = re.search(r'\sid="([^"]+)"', tag); md = re.search(r'\sd="([^"]*)"', tag)
        if not (mid and md): continue
        rings = rings_of(md.group(1))
        if not rings: continue
        g = evenodd(rings)
        if g is not None and not g.is_empty and g.area > 0: items.append((s, e, tag, mid.group(1), md.group(1), g))
    geoms = [it[5] for it in items]
    tree = STRtree(geoms)
    cuts = {}                                        # big index -> [small indexes]
    for i, it in enumerate(items):
        small = it[5]
        for j in tree.query(small):
            j = int(j)
            if j == i or geoms[j].area <= small.area: continue
            if small.intersection(geoms[j]).area >= inside_frac * small.area:
                cuts.setdefault(j, []).append(i)
    if not cuts: return text, []
    edits, fixed = [], []
    for j, smalls in cuts.items():
        g = geoms[j]
        for i in smalls:
            g = g.difference(items[i][5]); fixed.append((items[i][3], items[j][3]))
        s, e, tag, _, d, _ = items[j]
        newd = geom_to_d(g)
        if newd: edits.append((s, e, tag.replace(f'd="{d}"', f'd="{newd}"', 1)))
    out, pos = [], 0
    for s, e, new in sorted(edits):
        out.append(text[pos:s]); out.append(new); pos = e
    out.append(text[pos:])
    return "".join(out), fixed


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--maps", default="maps"); ap.add_argument("--write", action="store_true")
    ap.add_argument("--inside", type=float, default=0.9, help="how much of the small shape must lie inside the big one (default 0.9)")
    a = ap.parse_args()
    files = sorted(f for f in glob.glob(os.path.join(a.maps, "*.js")) if not f.endswith(".lo.js") and os.path.basename(f) != "manifest.js")
    if not files: sys.exit(f"No map files found in {a.maps}/")
    total = 0
    for f in files:
        src = open(f, encoding="utf-8").read()
        m = re.match(r'^(.*?\]\s*=\s*)(".*")(\s*;?\s*)$', src, re.S)
        if not m: continue
        new, fixed = fix_text(json.loads(m.group(2)), a.inside)
        if not fixed: continue
        total += len(fixed)
        print(f"{os.path.basename(f)}: " + "; ".join(f"{s} was hidden under {b}" for s, b in fixed))
        if a.write:
            bak = os.path.join(a.maps, "_before_enclave_fix"); os.makedirs(bak, exist_ok=True)
            if not os.path.exists(os.path.join(bak, os.path.basename(f))): shutil.copy(f, bak)
            open(f, "w", encoding="utf-8").write(m.group(1) + json.dumps(new, ensure_ascii=False, separators=(",", ":")) + m.group(3))
    print(f"\n{total} shapes {'fixed' if a.write else 'would be fixed (run again with --write)'} in {len(files)} files")


if __name__ == "__main__":
    main()
