#!/usr/bin/env python3
"""Remove the hairline across the Nansemond River mouth in Suffolk (51.v4.json).

Usage:  python3 patch_virginia.py path/to/51.v4.json
Keeps a .orig backup the first time it runs. Safe to run twice (the second run finds nothing to do).
"""
import json, math, os, re, shutil, sys
from shapely.geometry import Polygon
from shapely.ops import unary_union

COUNTY = "Suffolk"
MIN_SHARED_EDGE = 40   # only a shared edge at least this long counts; real touching points are 2-3 units


def parse(d):
    rings = []
    for sub in re.findall(r"M[^M]*", d):
        m = re.match(r"M(-?[\d.]+)[ ,](-?[\d.]+)", sub)
        x, y = float(m.group(1)), float(m.group(2))
        nums = list(map(float, re.findall(r"-?\d+\.?\d*", sub[m.end():])))
        pts = [(x, y)]
        for i in range(0, len(nums) - 1, 2):
            x += nums[i]; y += nums[i + 1]
            pts.append((x, y))
        rings.append(pts)
    return rings


def signed_area(pts):
    a = 0
    for i in range(len(pts)):
        x1, y1 = pts[i]; x2, y2 = pts[(i + 1) % len(pts)]
        a += x1 * y2 - x2 * y1
    return a / 2


def has_long_shared_edge(rings):
    edges = {}
    for i, r in enumerate(rings):
        for j in range(len(r)):
            edges[(r[j], r[(j + 1) % len(r)])] = i
    for (a, b), i in edges.items():
        j = edges.get((b, a))
        if j is not None and j != i and math.hypot(a[0] - b[0], a[1] - b[1]) >= MIN_SHARED_EDGE:
            return True
    return False


def emit(pts):
    x0, y0 = int(round(pts[0][0])), int(round(pts[0][1]))
    px, py = x0, y0
    steps = []
    for x, y in pts[1:]:
        x, y = int(round(x)), int(round(y))
        steps.append(f"{x - px} {y - py}")
        px, py = x, y
    return f"M{x0} {y0}l" + " ".join(steps) + "z"


def orient(pts, positive):
    return pts if (signed_area(pts) > 0) == positive else pts[::-1]


path = sys.argv[1]
if not os.path.exists(path + ".orig"):
    shutil.copy(path, path + ".orig")
data = json.load(open(path))

changed = False
for c in data["counties"]:
    if c["name"] != COUNTY:
        continue
    rings = parse(c["d"])
    if not has_long_shared_edge(rings):
        continue
    outers = [r for r in rings if signed_area(r) > 0]
    holes = [r for r in rings if signed_area(r) <= 0]
    land = unary_union([Polygon(r).buffer(0) for r in outers])
    if holes:
        land = land.difference(unary_union([Polygon(r).buffer(0) for r in holes]))
    polys = list(land.geoms) if land.geom_type == "MultiPolygon" else [land]
    parts = []
    for p in polys:
        if p.is_empty:
            continue
        parts.append(emit(orient(list(p.exterior.coords)[:-1], True)))
        for h in p.interiors:
            parts.append(emit(orient(list(h.coords)[:-1], False)))
    c["d"] = "".join(parts)
    changed = True
    print("reopened the river mouth in", COUNTY)

json.dump(data, open(path, "w"), separators=(",", ":"))
print("done" if changed else "done, nothing to change")
