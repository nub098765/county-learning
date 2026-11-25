#!/usr/bin/env python3
"""
fix_utah_bay.py - two small Great Salt Lake fixes from Census water files (run in the jameson folder).

  1. BAY LINK:  Bear River Bay (the 210 km2 Box Elder piece you already saved) is joined to the main lake only
     through an unnamed 15 km2 Box Elder piece (centre -112.388, 41.243) and then ~1.5 km of land before the
     Weber lake piece (centre -112.334, 41.177). This script closes that 1.5 km gap and saves the result as
     osm_lakes/bay_link.geojson. Delete that file to undo.

  2. FREMONT ISLAND: the UGRC lake has no islands, so Fremont Island (Davis County) is water. In the Census data
     the island is joined to the Weber shore by exposed lake bed (low water), so it is not a closed hole. This
     script takes the Census LAND around the island (inside FREMONT_BOX) and cuts it out of
     osm_lakes/great_salt.geojson. The old file is kept as osm_lakes/great_salt.geojson.fremont.bak (it must
     end in .bak, because the build uses every *.geojson in that folder). Re-running starts again from it.

Run it first WITHOUT --save: it only prints what it found. If the numbers look right, run it again with --save.

    python3 fix_utah_bay.py
    python3 fix_utah_bay.py --save
"""
import argparse, glob, json, os, shutil, sys

import geopandas as gpd
import pyproj
from shapely.geometry import LineString, Point, Polygon, box, mapping
from shapely.ops import nearest_points, transform, unary_union
from shapely.validation import make_valid

GEOIDS = ["49011", "49057", "49003", "49035", "49045"]       # Davis, Weber, Box Elder, Salt Lake, Tooele
FREMONT_BOX = (-112.42, 41.12, -112.27, 41.215)              # land inside this box (island + bridge) is cut out of the lake
TO5070 = pyproj.Transformer.from_crs(4326, 5070, always_xy=True).transform
TO4326 = pyproj.Transformer.from_crs(5070, 4326, always_xy=True).transform


def km2(g):
    return transform(TO5070, g).area / 1e6


def load_water(geoid):
    hits = sorted(glob.glob(os.path.join("areawater", f"tl_*_{geoid}_areawater.zip")))
    if not hits:
        sys.exit(f"No water file for {geoid} in areawater/ - run the Utah build once, or download it.")
    d = gpd.read_file(hits[-1]).to_crs(4326)
    d["FULLNAME"] = d["FULLNAME"].fillna("")
    d["geometry"] = [make_valid(g) for g in d.geometry]
    return d


def close(geom, metres):
    g = transform(TO5070, geom)
    g = make_valid(g.buffer(metres).buffer(-metres))
    return transform(TO4326, g)


def pieces(g):
    return list(getattr(g, "geoms", [g]))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--seam-close", type=float, default=300.0,
                    help="metres; fills thin land lines (county seams, hairline causeways) inside the lake; closes lines up to twice this wide (default 300, 0 = off)")
    ap.add_argument("--save", action="store_true", help="write the files (default: only print)")
    ap.add_argument("--link-width", type=float, default=800.0, help="metres; width of the water channel joining the two pieces (default 800)")
    a = ap.parse_args()

    water = {g: load_water(g) for g in GEOIDS}

    # ---- 1. bay link ------------------------------------------------------------------------------------
    be = water["49003"]
    p_small = Point(-112.388, 41.243)
    cand = be[(be.geometry.intersects(p_small)) & (be.FULLNAME == "")]
    wb = water["49057"]
    wb_gsl = wb[wb.FULLNAME.str.startswith("Great Salt")].copy()
    wb_gsl["d"] = [g.centroid.distance(Point(-112.334, 41.177)) for g in wb_gsl.geometry]
    link = None
    if cand.empty or wb_gsl.empty:
        print("BAY LINK: could not find the two pieces - skipped")
    else:
        small = cand.geometry.iloc[0]
        weber = wb_gsl.sort_values("d").geometry.iloc[0]
        print(f"BAY LINK: Box Elder unnamed piece {km2(small):.1f} km2, Weber lake piece {km2(weber):.1f} km2")
        s5, w5 = transform(TO5070, small), transform(TO5070, weber)
        p1, p2 = nearest_points(s5, w5)
        print(f"  nearest points are {p1.distance(p2):,.0f} m apart; joining them with a {a.link_width:.0f} m wide channel")
        corridor = LineString([p1, p2]).buffer(a.link_width / 2)
        link = transform(TO4326, make_valid(unary_union([s5, w5, corridor])))
        n = len(pieces(link))
        print(f"  result: {n} piece(s), {km2(link):.1f} km2" + ("" if n == 1 else "   <- expected 1"))

    # ---- 2. Fremont Island ------------------------------------------------------------------------------
    gsl = []
    for d in water.values():
        gsl += list(d[d.FULLNAME.str.startswith("Great Salt")].geometry)
    merged = close(unary_union(gsl), 300)              # 300 m closes the county seams (~260 m)
    cutbox = box(*FREMONT_BOX)
    land = make_valid(cutbox.difference(merged))
    here = Point(-112.36, 41.165)                       # inside Fremont Island
    cands = [p for p in pieces(land) if p.geom_type == "Polygon" and p.contains(here)]
    island = []
    if not cands:
        print("FREMONT: the point inside the island is not land in the Census data - island step skipped")
    else:
        h = cands[0]
        print(f"FREMONT: Census land around the island, inside the cut box: {km2(h):.1f} km2 "
              "(island about 9-11 km2 plus the exposed land bridge to the Weber shore; expect 25-60)")
        if 15 <= km2(h) <= 90:
            island = [h]
        else:
            print("  size looks wrong - island step skipped")

    # ---- write ------------------------------------------------------------------------------------------
    if not a.save:
        print("\n(nothing saved - run again with --save if this looks right)")
        return
    os.makedirs("osm_lakes", exist_ok=True)
    if link is not None:
        out = os.path.join("osm_lakes", "bay_link.geojson")
        json.dump({"type": "FeatureCollection", "features": [{"type": "Feature",
                   "properties": {"name": "bay_link", "source": "Census areawater"}, "geometry": mapping(link)}]},
                  open(out, "w"))
        print(f"saved {out}")

    lake_f = os.path.join("osm_lakes", "great_salt.geojson")
    bak = lake_f + ".fremont.bak"
    if not os.path.exists(bak):
        shutil.copy(lake_f, bak)
        print(f"backed up {lake_f} -> {bak}")
    d = gpd.read_file(bak)
    if d.crs is None:
        d = d.set_crs(4326)
    lake = unary_union([make_valid(g) for g in d.to_crs(4326).geometry])
    print(f"great_salt lake (UGRC): {km2(lake):,.0f} km2, {len(pieces(lake))} piece(s)")
    if island:
        lake = make_valid(lake.difference(unary_union(island)))
        print(f"  minus Fremont land: {km2(lake):,.0f} km2")

    # ---- 3. seams: thin land lines between lake pieces (e.g. the straight line across the lake) ----------
    if a.seam_close > 0:
        others = [link] if link is not None else []
        for f in glob.glob(os.path.join("osm_lakes", "*.geojson")):
            if os.path.basename(f) in ("great_salt.geojson", "bay_link.geojson"):
                continue
            o = gpd.read_file(f)
            if o.crs is None:
                o = o.set_crs(4326)
            others += [make_valid(g) for g in o.to_crs(4326).geometry]
        ut = box(-113.3, 40.5, -111.4, 41.9)                  # only the Great Salt Lake area
        allw = make_valid(unary_union([lake] + others).intersection(ut))
        closed = close(allw, a.seam_close)
        seams = make_valid(closed.difference(allw))
        n_before = len([p for p in pieces(allw) if km2(p) > 20])
        n_after = len([p for p in pieces(closed) if km2(p) > 20])
        print(f"SEAMS: closing land lines narrower than {2 * a.seam_close:.0f} m adds {km2(seams):.2f} km2; "
              f"lake pieces over 20 km2: {n_before} -> {n_after}")
        lake = make_valid(unary_union([lake, seams]))

    json.dump({"type": "FeatureCollection", "features": [{"type": "Feature",
               "properties": {"name": "great_salt", "source": "UGRC minus Fremont Island, seams closed"},
               "geometry": mapping(lake)}]}, open(lake_f, "w"))
    print(f"saved {lake_f}")

if __name__ == "__main__":
    main()