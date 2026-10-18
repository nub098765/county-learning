# Usage: python3 cut_overlap.py svg-colorado.js boulder broomfield
# Cuts the 2nd county out of the 1st, so the 1st no longer paints over it. Writes a backup the first time.
import re, sys, os, shutil
from shapely.geometry import Polygon

path, keep_cut, cutter = sys.argv[1], sys.argv[2], sys.argv[3]
src = open(path, encoding="utf-8").read()

def pat(i): return re.compile(r'(<path id=\\"%s\\"[^>]*? d=\\")([^"\\]*)(\\")' % re.escape(i))

def rings(d):
    out = []
    for m in re.finditer(r'M\s*(-?[\d.]+)[ ,](-?[\d.]+)([^M]*)', d):
        x, y = float(m.group(1)), float(m.group(2)); pts = [(x, y)]
        nums = [float(v) for v in re.findall(r'-?[\d.]+', m.group(3))]
        for a, b in zip(nums[0::2], nums[1::2]):
            x += a; y += b; pts.append((x, y))
        if len(pts) >= 3: out.append(pts)
    return out

def geom(d):                                  # evenodd: each ring toggles inside/outside
    g = Polygon()
    for r in rings(d):
        g = g.symmetric_difference(Polygon(r).buffer(0))
    return g

def to_d(g):
    parts = []
    polys = [g] if g.geom_type == "Polygon" else [p for p in getattr(g, "geoms", []) if p.geom_type == "Polygon"]
    for p in polys:
        for ring in [p.exterior] + list(p.interiors):
            c = [(round(x), round(y)) for x, y in ring.coords][:-1]
            c = [pt for i, pt in enumerate(c) if i == 0 or pt != c[i - 1]]
            if len(c) < 3: continue
            s = f"M{c[0][0]} {c[0][1]}"
            for (x0, y0), (x1, y1) in zip(c, c[1:]): s += f"l{x1 - x0} {y1 - y0} "
            parts.append(s.rstrip() + "z")
    return "".join(parts)

a, b = pat(keep_cut).search(src), pat(cutter).search(src)
if not a or not b: sys.exit("couldn't find both ids in " + path)
ga, gb = geom(a.group(2)), geom(b.group(2))
print(f"overlap area: {ga.intersection(gb).area:.0f} (map units squared)")
new = ga.difference(gb)
if not os.path.exists(path + ".bak"): shutil.copy(path, path + ".bak")
src = src[:a.start(2)] + to_d(new) + src[a.end(2):]
open(path, "w", encoding="utf-8").write(src)
print("done:", keep_cut, "now has a hole where", cutter, "is")