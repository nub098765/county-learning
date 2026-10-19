# Usage: python3 cut_exclaves.py maps/svg-virginia.js manassas manassas-park prince-william
# Cuts the small detached pieces (exclaves) of the LAST county out of each city listed before it,
# so the cities no longer paint over them. Writes a .bak backup the first time.
import re, sys, shutil, os
from shapely.geometry import Polygon

path, cities, county = sys.argv[1], sys.argv[2:-1], sys.argv[-1]
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

cm = pat(county).search(src)
rs = sorted(rings(cm.group(2)), key=lambda r: -abs(Polygon(r).buffer(0).area))
exclaves = [Polygon(r).buffer(0) for r in rs[1:] if Polygon(r).buffer(0).area > 0]   # everything except the main body
print(f"{county}: {len(rs)} pieces, {len(exclaves)} detached")
if not os.path.exists(path + ".bak"): shutil.copy(path, path + ".bak")
for c in cities:
    m = pat(c).search(src)
    g = geom(m.group(2))
    cut = g
    for e in exclaves: cut = cut.difference(e)
    print(f"{c}: area {g.area:.0f} -> {cut.area:.0f}")
    src = src[:m.start(2)] + to_d(cut) + src[m.end(2):]
open(path, "w", encoding="utf-8").write(src)
print("done; backup at", path + ".bak")