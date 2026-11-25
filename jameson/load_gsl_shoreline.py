#!/usr/bin/env python3
"""
load_gsl_shoreline.py - use the UGRC "GSLShoreline" shapefile (outlines of Great Salt Lake at 4,200 / 4,209 /
4,212 / 4,218 ft) as the lake for Utah.

Run in the jameson folder, with the unzipped GSLShoreline_... folder (or the GSLShoreline.* files) in it:

    python3 load_gsl_shoreline.py            # uses the 4,200 ft outline, the lowest one
    python3 load_gsl_shoreline.py --level 4209

What it does
  - reads the polygons for that water level, merges them, and closes land lines narrower than 600 m
    (the causeway and county seams) so they don't show as a line across the lake
  - saves the result as osm_lakes/great_salt.geojson, which the build cuts out of the Utah counties
  - renames the old lake files so nothing conflicts (the build uses EVERY *.geojson in osm_lakes/):
        great_salt.geojson  -> great_salt.geojson.pre_shoreline.bak
        farmington_bay.geojson, bay_link.geojson -> <name>.geojson.pre_shoreline.bak
    To undo: rename those back (remove .pre_shoreline.bak) and delete nothing else.

Then rebuild Utah (note the --lake-min-km2 20):
    python3 build_maps_hires.py --states 49 --redo --lake-min-km2 20
"""
import argparse, glob, json, os, sys

import geopandas as gpd
import pyproj
from shapely.geometry import mapping
from shapely.ops import transform, unary_union
from shapely.validation import make_valid

TO5070 = pyproj.Transformer.from_crs(4326, 5070, always_xy=True).transform
TO4326 = pyproj.Transformer.from_crs(5070, 4326, always_xy=True).transform


def km2(g):
    return transform(TO5070, g).area / 1e6


def pieces(g):
    return [p for p in getattr(g, "geoms", [g]) if not p.is_empty]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--level", default="4200", help="water level in feet: 4200, 4209, 4212 or 4218 (default 4200)")
    ap.add_argument("--close", type=float, default=300.0,
                    help="metres; closes land lines up to twice this wide (default 300, 0 = off)")
    a = ap.parse_args()

    hits = sorted(glob.glob("GSLShoreline*/GSLShoreline*.shp") + glob.glob("GSLShoreline*.shp"))
    if not hits:
        sys.exit("Can't find GSLShoreline*.shp - put the unzipped GSLShoreline_... folder in jameson and rerun.")
    print("Reading", hits[0])
    d = gpd.read_file(hits[0])
    if d.crs is None:
        d = d.set_crs(3857)
    d = d.to_crs(4326)
    levels = sorted(set(str(x) for x in d["ELEVATION"]))
    print("water levels in the file:", ", ".join(levels))
    sel = d[d["ELEVATION"].astype(str) == str(a.level)]
    if sel.empty:
        sys.exit(f"No polygons at level {a.level}.")
    lake = make_valid(unary_union([make_valid(g) for g in sel.geometry]))
    ps = pieces(lake)
    holes = sum(len(p.interiors) for p in ps if p.geom_type == "Polygon")
    big = sorted((km2(p) for p in ps), reverse=True)[:6]
    print(f"{a.level} ft: {len(sel)} polygon(s) -> {len(ps)} piece(s), {km2(lake):,.0f} km2, {holes} island(s)/holes inside")
    print("  biggest pieces (km2):", ", ".join(f"{x:,.0f}" for x in big))
    print("  (Great Salt Lake at 4,200 ft is roughly 4,000 - 4,800 km2)")

    if a.close > 0:
        g5 = transform(TO5070, lake)
        g5 = make_valid(g5.buffer(a.close).buffer(-a.close))
        closed = transform(TO4326, g5)
        n0 = len([p for p in ps if km2(p) > 20])
        n1 = len([p for p in pieces(closed) if km2(p) > 20])
        print(f"closed land lines up to {2 * a.close:.0f} m wide: pieces over 20 km2 {n0} -> {n1}, "
              f"+{km2(closed) - km2(lake):.2f} km2")
        lake = closed

    os.makedirs("osm_lakes", exist_ok=True)
    for name in ("great_salt", "farmington_bay", "bay_link"):
        f = os.path.join("osm_lakes", name + ".geojson")
        if os.path.exists(f):
            os.replace(f, f + ".pre_shoreline.bak")
            print(f"moved {f} -> {f}.pre_shoreline.bak")
    out = os.path.join("osm_lakes", "great_salt.geojson")
    json.dump({"type": "FeatureCollection", "features": [{"type": "Feature",
               "properties": {"name": "great_salt", "source": f"UGRC GSLShoreline {a.level} ft"},
               "geometry": mapping(lake)}]}, open(out, "w"))
    print("saved", out)


if __name__ == "__main__":
    main()