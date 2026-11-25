#!/usr/bin/env python3
"""
check_exclaves.py - show every separate piece (part) the Census has for some Virginia counties / cities,
and what is left of each one after the build's land clip. Saves nothing.

Run it in the jameson folder (same place as build_maps_hires.py):

    python3 check_exclaves.py                       # Manassas, Radford, Fairfax City AND the counties around them
    python3 check_exclaves.py 51683 51750           # or any GEOIDs (any state: add --state 17 and use that state's GEOIDs)

For each county it prints one line per piece, biggest first, then one line per HOLE in it (a hole in a city
is usually a piece of the surrounding county that lies inside the city - an exclave of the county):
    area in the Census file  ->  area left after clipping to the OSM land  (and the percentage),
    and the piece's centre (lon, lat), so you can look it up on a map.

How to read it:
  * only ONE piece listed         -> the Census itself has no separate exclave for it
  * several pieces, all ~100%     -> they exist; if they are missing on the map something later in the build
                                     drops them (a size cut-off, a lake or river cut)
  * a piece at 0% or a few %      -> the OSM land layer calls it water, so the clip removes it
"""
import argparse, glob, sys

import geopandas as gpd
import pyproj
import shapely
from shapely import STRtree
from shapely.ops import transform, unary_union
from shapely.validation import make_valid

import build_maps_hires as b

DEFAULT = ["51683", "51153", "51750", "51121", "51155", "51600", "51059", "51685"]
# Manassas, Prince William Co., Radford, Montgomery Co., Pulaski Co., Fairfax city, Fairfax Co., Manassas Park


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("geoids", nargs="*", default=DEFAULT)
    ap.add_argument("--state", default="51", help="state FIPS (default 51, Virginia)")
    a = ap.parse_args()

    tl = sorted(glob.glob("tl_*_us_county.zip")) or sorted(glob.glob("tl_*_us_county"))
    if not tl:
        sys.exit("Could not find tl_YYYY_us_county.zip in this folder.")
    land_path = b.find_land()
    if not land_path:
        sys.exit("Could not find the OSM land polygons (see the build script's DOWNLOADS section).")

    allc = gpd.read_file(tl[-1])
    st = allc[allc.STATEFP == a.state].to_crs(4326)
    crs = b.FIXED_CRS.get(a.state) or b.local_crs(st.total_bounds)
    grp = st.to_crs(crs)
    land = b.read_land(land_path, a.state, st.total_bounds).to_crs(crs)
    land_geoms = [make_valid(g) for g in land.geometry]
    tree = STRtree(land_geoms)
    back = pyproj.Transformer.from_crs(crs, 4326, always_xy=True).transform

    for geoid in a.geoids:
        rows = grp[grp.GEOID == geoid]
        if rows.empty:
            print(f"\n{geoid}: not found in state {a.state}")
            continue
        row = rows.iloc[0]
        parts = [p for p in shapely.get_parts(make_valid(row.geometry)) if p.geom_type == "Polygon" and not p.is_empty]
        parts.sort(key=lambda p: -p.area)
        print(f"\n{geoid} {row.NAMELSAD}: {len(parts)} piece(s) in the Census file")
        for i, p in enumerate(parts):
            hits = tree.query(p, predicate="intersects")
            kept = unary_union([p.intersection(land_geoms[j]) for j in hits]).area if len(hits) else 0.0
            c = transform(back, p.representative_point())
            print(f"   piece {i}: {p.area/1e6:9.4f} km2 -> {kept/1e6:9.4f} km2 after land clip ({kept/p.area:4.0%})   centre {c.x:.4f}, {c.y:.4f}")
            for r in p.interiors:
                h = shapely.geometry.Polygon(r)
                hc = transform(back, h.representative_point())
                print(f"      hole in piece {i}: {h.area/1e6:9.4f} km2   centre {hc.x:.4f}, {hc.y:.4f}")


if __name__ == "__main__":
    main()