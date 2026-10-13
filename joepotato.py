import json, re
from shapely.geometry import Point
from shapely.ops import unary_union
from find_thin_lakes import read_counties, find_gaps, PAD

src = open("maps/svg-utah.js", encoding="utf-8").read()
svg = json.loads(re.match(r'^(.*?\]\s*=\s*)(".*")(\s*;?\s*)$', src, re.S).group(2))
vb = [float(v) for v in re.search(r'viewBox="([\d.\-\s]+)"', svg).group(1).split()]
cs = read_counties(svg)
raw = unary_union([c["geom"] for c in cs])
gaps = find_gaps(cs, raw)
k = vb[2] / 990.0
for dx, dy in [(0, 0), (-6, 0), (6, 0), (0, -6), (0, 6), (-20, 0), (20, 0)]:
    x, y = vb[0] + (353 + dx) * k, vb[1] + (297 + dy) * k
    p = Point(x, y)
    county = [c["name"] for c in cs if c["geom"].contains(p)]
    ing = [i for i, g in enumerate(gaps) if g.contains(p)]
    print((dx, dy), "county:", county or "none", "| in gap:", ing or "none")