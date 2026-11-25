#!/usr/bin/env python3
"""
patch_maps.py - small hand fixes for the map JSON that build_maps_hires.py writes.

Why: some oddities (a stray rectangle of lake, a sliver of river) are cheaper to remove from the finished
map than to chase through the whole build. This works on the output files, needs no downloads, and runs in
a second.

USE
  python patch_maps.py map-data/hires/27.v4.json            # one state's cache file
  python patch_maps.py map-data/counties-hires.json         # or the combined file
  (the original is copied to <name>.orig first, once; the file is then fixed in place)

  Fixing a state's cache file and then re-running build_maps_hires.py (WITHOUT --redo) rebuilds
  counties-hires.json from the caches in a moment, so the fix carries through.

THE FIX LIST (edit PATCHES below). Coordinates are the numbers in the map file itself (the 16000-wide
viewBox), so to find one, open the page, or see the picture the fix prints. Two kinds of fix:

  {"fips": "27", "county": "Lake of the Woods", "remove_shape_at": (4430, 1000)}
      removes the whole land shape (and anything sitting inside it) that contains that point.

  {"fips": "24", "county": "Washington", "cut_box": (x0, y0, x1, y1)}
      cuts that rectangle out of the county, keeping the rest.   "county" may be left out to cut every county.

These numbers only stay right while the state is built from the same data with the same settings. If you
rebuild a state with --redo after a new Census year, re-check its entries.
"""
import json, os, re, shutil, sys

from shapely.geometry import Polygon, MultiPolygon, Point, box
from shapely.ops import unary_union

def smooth(pts, rounds=3):
    """Chaikin corner cutting: turns a few waypoints into a gentle curve (end points stay fixed)."""
    for _ in range(rounds):
        out = [pts[0]]
        for a, b in zip(pts, pts[1:]):
            out += [(.75 * a[0] + .25 * b[0], .75 * a[1] + .25 * b[1]), (.25 * a[0] + .75 * b[0], .25 * a[1] + .75 * b[1])]
        pts = out + [pts[-1]]
    return pts


# Cook County, IL: the lake cut missed the stretch of Lake Michigan from Highland Park to the Loop, leaving a
# stair-stepped rectangle of water as land. This cuts it away along a smooth shoreline joining the two good shores.
_IL_SHORE = smooth([(14720, 1957), (14992, 2348), (15223, 3205)])

# Sault shore, MI: the shore there climbs in two steps; this redraws it as one smooth slope (the two entries below)
_SAULT = smooth([(11700, 4984), (11714, 4977), (11724, 4968), (11736, 4960), (11750, 4955)], 2)

PATCHES = [
    # Winnebago County, WI: remove the lake west of Lake Winnebago (turn it back into land)
    {"fips": "55", "county": "Winnebago", "fill_holes_in_box": (10500, 10810, 10820, 11015)},
    # Kenedy County, TX: the Census Laguna Madre polygon has a blocky, dead-straight west edge here; fill that notch back to land
    {"fips": "48", "county": "Kenedy", "add_poly": [(11249, 13546), (11290, 13546), (11290, 13742), (11249, 13742)]},
    # Southern Maryland: dozens of tiny detached specks in the Potomac / Chesapeake that are not real islands
    {"fips": "24", "county": "St. Mary's", "drop_small": 400},
    {"fips": "24", "county": "Charles", "drop_small": 400},
    {"fips": "24", "county": "Charles", "cut_box": (8030, 5178, 8200, 5303)},   # a 195-unit-long hairline sliver in the Potomac, not land
    # Chippewa County, MI (St. Marys River / Sugar Island): straight-edged slivers left where Census water was clipped
    {"fips": "26", "county": "Chippewa", "cut_box": (12200, 4940, 12240, 5045)},                 # floating triangle east of Sugar Island
    {"fips": "26", "county": "Chippewa", "cut_box": (11872, 4998, 11888, 5006)},                 # stray speck at the top of the channel
    {"fips": "26", "county": "Chippewa", "cut_box": (11668, 4925, 11740, 4966)},                 # angular shard on the Sault shore
    {"fips": "26", "county": "Chippewa", "cut_box": (11736, 4925, 11758, 4954)},                 # its leftover stub
    {"fips": "26", "county": "Chippewa", "cut_poly": _SAULT + [(11750, 4930), (11700, 4930)]},   # steps left on the Sault shore: trim above the slope
    {"fips": "26", "county": "Chippewa", "add_poly": _SAULT + [(11750, 4996), (11700, 4996)]},   # ...and fill below it
    {"fips": "26", "county": "Chippewa", "cut_poly": [(11846, 4966), (11905, 4966), (11905, 4982), (11884, 4984), (11868, 4991), (11853, 4976)]},  # sharp wedge at Sugar Island's west tip
    {"fips": "17", "county": "Cook",
     "cut_poly": [(14720, 1890)] + _IL_SHORE + [(15245, 3250), (16000, 3250), (16000, 1890)]},
    # Lake of the Woods County, MN: a rectangle of open lake the lake cut missed (south of the Northwest Angle)
    {"fips": "27", "county": "Lake of the Woods", "remove_shape_at": (4430, 1000)},
    # Lake Champlain, VT: thin vertical slivers left in the lake along the county seams
    {"fips": "50", "county": "Grand Isle", "cut_box": (1067, 4797, 1099, 4971)},
    {"fips": "50", "county": "Chittenden", "cut_box": (1068, 4966, 1107, 5095)},
    {"fips": "50", "county": "Chittenden", "cut_box": (1783, 3312, 1790, 3538)},
    {"fips": "50", "county": "Chittenden", "cut_box": (1783, 3536, 1793, 3727)},
    # South Hero -> Colchester: a hairline straight "causeway" across the lake, plus a tail and stray hairlines
    {"fips": "50", "county": "Grand Isle", "thin_in_box": (1485, 4305, 1570, 4352, 6)},
    {"fips": "50", "county": "Chittenden", "thin_in_box": (1550, 4310, 1680, 4400, 6)},
    {"fips": "50", "county": "Grand Isle", "thin_in_box": (1090, 4710, 1125, 4800, 6)},
    {"fips": "50", "county": "Chittenden", "cut_box": (1778, 3360, 1786, 3492)},
    {"fips": "50", "county": "Chittenden", "cut_box": (1668, 4170, 1727, 4207)},
    # Grand Isle islands: hairline bridges/seams (under ~60 m wide) joining or crossing the islands
    {"fips": "50", "county": "Grand Isle", "thin_in_box": (0, 0, 2300, 5000, 3)},
    {"fips": "50", "county": "Franklin", "thin_in_box": (600, 0, 2300, 4400, 3)},
    {"fips": "50", "county": "Chittenden", "thin_in_box": (1000, 4900, 1300, 5300, 3)},
]


def parse_rings(d):
    rings = []
    for m in re.finditer(r"M(-?\d+) (-?\d+)l([^z]*)z", d):
        x, y = int(m.group(1)), int(m.group(2))
        pts = [(x, y)]
        nums = list(map(int, m.group(3).split()))
        for i in range(0, len(nums) - 1, 2):
            x += nums[i]; y += nums[i + 1]
            pts.append((x, y))
        if len(pts) >= 3:
            rings.append(pts)
    return rings


def ring_path(pts):
    pts = [(int(round(x)), int(round(y))) for x, y in pts]
    out = [pts[0]]
    for p in pts[1:]:
        if p != out[-1]:
            out.append(p)
    if len(out) > 1 and out[0] == out[-1]:
        out.pop()
    if len(out) < 3:
        return ""
    return f"M{out[0][0]} {out[0][1]}l" + " ".join(f"{b[0]-a[0]} {b[1]-a[1]}" for a, b in zip(out, out[1:])) + "z"


def to_geometry(d):
    """Path -> shapely geometry. Rings are sorted biggest first and combined by even-odd (nested = hole), like the page draws them."""
    geom = None
    for r in sorted(parse_rings(d), key=lambda r: -abs(Polygon(r).area)):
        p = Polygon(r).buffer(0)
        if p.is_empty:
            continue
        geom = p if geom is None else geom.symmetric_difference(p)
    return geom


def polygons(g):
    if g is None or g.is_empty:
        return []
    if isinstance(g, Polygon):
        return [g]
    return [p for p in getattr(g, "geoms", []) if isinstance(p, Polygon) and not p.is_empty]


def to_path(g):
    parts = []
    for poly in polygons(g):
        parts.append(ring_path(poly.exterior.coords))
        parts += [ring_path(r.coords) for r in poly.interiors]
    return "".join(p for p in parts if p)


def remove_shape_at(g, point):
    pt = Point(point)
    keep = [p for p in polygons(g) if not Polygon(p.exterior).contains(pt)]
    return unary_union(keep) if keep else Polygon()


def cut_box(g, rect):
    return g.difference(box(*rect))


def open_box(g, spec):
    """Inside the box, remove parts thinner than 2*r units (hairline causeways, spikes); the rest is untouched."""
    x0, y0, x1, y1, r = spec
    thin = g.difference(g.buffer(-r).buffer(r))
    return g.difference(thin.intersection(box(x0, y0, x1, y1)))


def add_poly(g, pts):
    return unary_union([g, Polygon(pts).buffer(0)])


def cut_poly(g, pts):
    return g.difference(Polygon(pts).buffer(0))


def smooth_in_box(g, spec):
    """Inside the box, round off small steps and corners (close, then open, by r units); the rest is untouched."""
    x0, y0, x1, y1, r = spec
    g2 = g.buffer(r).buffer(-r).buffer(-r).buffer(r)
    inside = box(x0, y0, x1, y1)
    return unary_union([g.difference(inside), g2.intersection(inside)])


def drop_small(g, max_area):
    """Delete every detached piece of land smaller than max_area units^2 (specks, not real islands)."""
    keep = [p for p in polygons(g) if p.area >= max_area]
    return unary_union(keep) if keep else Polygon()


def fill_holes_in_box(g, rect):
    """Fill (turn back into land) every lake/hole of the county whose outline lies inside the box."""
    b = box(*rect)
    out = []
    for p in polygons(g):
        keep = [r for r in p.interiors if not Polygon(r).within(b)]
        out.append(Polygon(p.exterior, keep))
    return unary_union(out)


def apply(state, patches, label):
    done = 0
    for pt in patches:
        for c in state["counties"]:
            if pt.get("county") and c["name"] != pt["county"] and c.get("namelsad") != pt["county"]:
                continue
            g = to_geometry(c["d"])
            if g is None or g.is_empty:
                continue
            before = g.area
            if "remove_shape_at" in pt:
                g2 = remove_shape_at(g, pt["remove_shape_at"])
            elif "thin_in_box" in pt:
                g2 = open_box(g, pt["thin_in_box"])
            elif "smooth_in_box" in pt:
                g2 = smooth_in_box(g, pt["smooth_in_box"])
            elif "drop_small" in pt:
                g2 = drop_small(g, pt["drop_small"])
            elif "fill_holes_in_box" in pt:
                g2 = fill_holes_in_box(g, pt["fill_holes_in_box"])
            elif "add_poly" in pt:
                g2 = add_poly(g, pt["add_poly"])
            elif "cut_poly" in pt:
                g2 = cut_poly(g, pt["cut_poly"])
            elif "cut_box" in pt:
                g2 = cut_box(g, pt["cut_box"])
            else:
                continue
            if abs(g2.area - before) < 1:
                continue                                   # nothing here: leave the path exactly as it was
            c["d"] = to_path(g2)
            done += 1
            print(f"  {label}: {c['namelsad'] or c['name']}: {before:,.0f} -> {g2.area:,.0f} units^2   ({list(pt)[-1]})")
    return done


def main():
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    path = sys.argv[1]
    data = json.load(open(path))
    single = "counties" in data and "viewBox" in data         # one state's cache file, not the combined one
    states = {os.path.basename(path).split(".")[0]: data} if single else data
    total = 0
    for fips, st in states.items():
        mine = [p for p in PATCHES if p["fips"] == fips]
        if mine:
            total += apply(st, mine, fips)
    if not total:
        print("Nothing to change (already patched, or no entries for this file).")
        return
    if not os.path.exists(path + ".orig"):
        shutil.copyfile(path, path + ".orig")
    json.dump(data, open(path, "w"), separators=(",", ":"))
    print(f"Patched {total} county shape(s) in {path}  (original kept as {path}.orig)")


if __name__ == "__main__":
    main()