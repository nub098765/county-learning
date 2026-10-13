import json, re
from shapely.geometry import Polygon
from shapely.ops import unary_union
from find_thin_lakes import read_counties, find_gaps, polys_of, PAD

src = open("maps/svg-utah.js", encoding="utf-8").read()
svg = json.loads(re.match(r'^(.*?\]\s*=\s*)(".*")(\s*;?\s*)$', src, re.S).group(2))
cs = read_counties(svg)
raw = unary_union([c["geom"] for c in cs])
land = unary_union([c["geom"].buffer(PAD) for c in cs])
gap = max(find_gaps(cs, raw), key=lambda f: f.area)
hole = max((Polygon(r) for p in polys_of(land) for r in p.interiors if Polygon(r).intersects(gap)), key=lambda h: h.area)
print("lake hole area", round(hole.area), "gap area", round(gap.area))
for c in cs:
    a = c["geom"].intersection(hole).area
    if a > 1:
        print(c["name"], "covers", round(a), "inside the lake", [round(v) for v in c["geom"].intersection(hole).bounds])