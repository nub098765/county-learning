# Run from the site folder (the one with index.html):  python3 make_as_shape.py
# Merges Tutuila's Eastern and Western pieces into ONE outline (so there's no line between them) and writes as-shape.js
import re, json
from shapely.geometry import Polygon
from shapely.ops import unary_union

html = open("index.html", encoding="utf-8").read()
tpl = re.search(r'<template id="us-map-template">(.*?)</template>', html, re.S).group(1)
polys = []
for p in re.findall(r'<path[^>]*class="us-st"[^>]*>', tpl):
    if 'data-name="American Samoa"' not in p: continue
    d = re.search(r' d="([^"]*)"', p).group(1)
    for m in re.finditer(r"M[^M]*", d):
        nums = [float(v) for v in re.findall(r"-?\d+\.?\d*", m.group(0))]
        pts = list(zip(nums[0::2], nums[1::2]))
        xs = [x for x, _ in pts]
        if len(pts) >= 3 and max(xs) < 750 and max(xs) - min(xs) > 0.8:   # Tutuila side only, no specks
            polys.append(Polygon(pts).buffer(0))
merged = unary_union([p.buffer(0.02) for p in polys]).buffer(-0.02).simplify(0.015)

parts = []
for g in (merged.geoms if hasattr(merged, "geoms") else [merged]):
    c = [f"{x:.2f} {y:.2f}" for x, y in g.exterior.coords[:-1]]
    parts.append("M" + " L".join(c) + "Z")
d = "".join(parts)
open("as-shape.js", "w", encoding="utf-8").write(
    "window.SHAPE_EXTRA = Object.assign(window.SHAPE_EXTRA || {}, " + json.dumps({"American Samoa": d}) + ");\n")
print(len(polys), "pieces ->", len(parts), "outlines;", len(d) // 1024, "KB written to as-shape.js")