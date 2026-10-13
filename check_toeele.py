import json, re
from shapely.geometry import Point, Polygon
from find_thin_lakes import read_counties, rings_of

src = open("maps/svg-utah.js", encoding="utf-8").read()
svg = json.loads(re.match(r'^(.*?\]\s*=\s*)(".*")(\s*;?\s*)$', src, re.S).group(2))
vb = [float(v) for v in re.search(r'viewBox="([\d.\-\s]+)"', svg).group(1).split()]
k = vb[2] / 990.0
pt = Point(vb[0] + 353 * k, vb[1] + 297 * k)
t = next(c for c in read_counties(svg) if c["name"].startswith("Tooele"))
for i, r in enumerate(rings_of(t["d"])):
    poly = Polygon(r)
    if poly.buffer(0).contains(pt) or poly.contains(pt):
        print(i, "points", len(r), "area", round(abs(poly.area)), "valid", poly.is_valid, "bounds", [round(v) for v in poly.bounds])