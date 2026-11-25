#!/usr/bin/env python3
"""
load_ugrc_lake.py - turn the Utah UGRC "Great Salt Lake Water Level 2016" shapefile
into osm_lakes/great_salt.geojson, where build_maps_hires.py picks it up and uses it
INSTEAD of the Census shape of Great Salt Lake.

Run it in the jameson folder (same place as build_maps_hires.py):

    python3 load_ugrc_lake.py
    python3 load_ugrc_lake.py path/to/GSLWaterLevel2016.shp          # if it can't find the file
    python3 load_ugrc_lake.py path/to/other.shp --name some_lake     # any other lake, same idea

It looks for GSLWaterLevel2016*.shp in this folder and its sub-folders. Keep the
.shp, .shx, .dbf and .prj files together (the .prj tells it the projection).

The OpenStreetMap file that was there is renamed to great_salt.geojson.osm.bak (NOT
.geojson, or the build would use it as a second lake). Rename it back to undo.
"""
import argparse, glob, json, os, sys

import geopandas as gpd
import pyproj
from shapely.geometry import Polygon, MultiPolygon, mapping
from shapely.ops import transform, unary_union
from shapely.validation import make_valid

TO_AREA = pyproj.Transformer.from_crs(4326, 5070, always_xy=True).transform


def polys(g):
    if g is None or g.is_empty:
        return []
    if isinstance(g, Polygon):
        return [g]
    if isinstance(g, MultiPolygon):
        return list(g.geoms)
    return [p for x in getattr(g, "geoms", []) for p in polys(x)]


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("shp", nargs="?", help="the shapefile (default: search for GSLWaterLevel2016*.shp)")
    ap.add_argument("--name", default="great_salt", help="output name; great_salt = Great Salt Lake")
    a = ap.parse_args()

    shp = a.shp
    if not shp:
        hits = sorted(glob.glob("**/GSLWaterLevel2016*.shp", recursive=True))
        if not hits:
            sys.exit("Could not find GSLWaterLevel2016*.shp here. Pass its path:  python3 load_ugrc_lake.py <path to .shp>")
        shp = hits[0]
    print("Reading", shp)

    d = gpd.read_file(shp)
    if d.crs is None:
        sys.exit("The shapefile has no projection (.prj file missing). Keep the .prj next to the .shp and try again.")
    print(f"   {len(d)} feature(s), projection {d.crs.to_string()}")

    d = d.to_crs(4326)
    shapes = [make_valid(g) for g in d.geometry if g is not None and not g.is_empty]
    parts = [p for g in shapes for p in polys(g)]
    if not parts:
        sys.exit("No polygons found in that file.")
    lake = unary_union(parts)

    pieces = polys(lake)
    km2 = [transform(TO_AREA, p).area / 1e6 for p in pieces]
    holes = sum(len(p.interiors) for p in pieces)
    print(f"   {len(pieces)} separate water piece(s), total about {sum(km2):,.0f} km2, {holes} island(s)/holes inside")
    print("   biggest pieces (km2):", ", ".join(f"{k:,.0f}" for k in sorted(km2, reverse=True)[:6]))
    print("   (Great Salt Lake is roughly 2,500 - 4,500 km2 depending on the water level; the build also")
    print("    drops pieces under 100 km2 and islands under 1 km2.)")

    os.makedirs("osm_lakes", exist_ok=True)
    out = os.path.join("osm_lakes", a.name + ".geojson")
    if os.path.exists(out):
        bak = out + ".osm.bak"
        if not os.path.exists(bak):
            os.replace(out, bak)
            print(f"   moved the old {out} to {bak}")
    json.dump({"type": "FeatureCollection",
               "features": [{"type": "Feature", "properties": {"name": a.name, "source": "UGRC GSL water level 2016"},
                             "geometry": mapping(lake)}]}, open(out, "w"))
    print(f"   saved {out}")


if __name__ == "__main__":
    main()