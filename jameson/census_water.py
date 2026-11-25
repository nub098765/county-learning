#!/usr/bin/env python3
"""
census_water.py - look inside the Census water files (./areawater/) and, if you want, save
some of the water polygons as a lake file in osm_lakes/, where build_maps_hires.py uses
them as extra water to cut out of the counties.

Step 1 - LIST what is there (saves nothing). Run in the jameson folder:

    python3 census_water.py 49011 49057 49003 49035 49045

(those are the Utah counties around the lake: Davis, Weber, Box Elder, Salt Lake, Tooele).
It prints every water polygon over 5 km2 with its name, type, area and centre (lon, lat),
biggest first, and marks the ones inside the Farmington Bay box.

Step 2 - SAVE the ones you pick, by name text or by row number:

    python3 census_water.py 49011 49057 49003 49035 49045 --take "Farmington" --out farmington_bay
    python3 census_water.py 49011 49057 49003 49035 49045 --rows 3 7 --out farmington_bay
    python3 census_water.py 49011 49057 49003 49035 49045 --rows 4 5 8 9 18 19 --close 300 --out farmington_bay

--take is a case-insensitive piece of the polygon's name. --rows are the numbers from the list.
The file goes to osm_lakes/<out>.geojson. Delete that file to undo.
"""
import argparse, glob, json, os, re, sys

import geopandas as gpd
import pandas as pd
import pyproj
from shapely.geometry import mapping
from shapely.ops import unary_union
from shapely.validation import make_valid

BOX = (-112.30, 40.80, -111.80, 41.20)   # lon/lat box to flag (Farmington Bay / Antelope Island area)
AREA = pyproj.Transformer.from_crs(4326, 5070, always_xy=True)


def km2(g):
    import shapely
    return shapely.transform(g, lambda c: __import__("numpy").column_stack(AREA.transform(c[:, 0], c[:, 1]))).area / 1e6


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("geoids", nargs="+", help="county GEOIDs, e.g. 49011")
    ap.add_argument("--min-km2", type=float, default=5.0)
    ap.add_argument("--take", help="save polygons whose name contains this text")
    ap.add_argument("--rows", type=int, nargs="*", help="save these row numbers from the list")
    ap.add_argument("--out", default="farmington_bay", help="output name (osm_lakes/<out>.geojson)")
    ap.add_argument("--close", type=float, default=0.0, metavar="M",
                    help="close gaps and slivers narrower than 2*M metres between the saved pieces (try 300)")
    a = ap.parse_args()

    frames = []
    for g in a.geoids:
        hits = sorted(glob.glob(os.path.join("areawater", f"tl_*_{g}_areawater.zip")))
        if not hits:
            print(f"no water file for {g} in areawater/ - skipped")
            continue
        d = gpd.read_file(hits[-1]).to_crs(4326)
        d["county"] = g
        frames.append(d)
    if not frames:
        sys.exit("No water files found. Run this in the jameson folder (it needs ./areawater/).")
    w = gpd.GeoDataFrame(pd.concat(frames, ignore_index=True), crs=4326)
    w["FULLNAME"] = w["FULLNAME"].fillna("")
    w["km2"] = [km2(make_valid(g)) for g in w.geometry]
    w = w[w.km2 >= a.min_km2].sort_values("km2", ascending=False).reset_index(drop=True)

    print(f"{'row':>3}  {'county':6} {'name':32} {'type':6} {'km2':>8}  centre (lon, lat)")
    for i, r in w.iterrows():
        c = r.geometry.centroid
        inbox = BOX[0] <= c.x <= BOX[2] and BOX[1] <= c.y <= BOX[3]
        print(f"{i:>3}  {r.county:6} {(r.get('FULLNAME') or '(no name)')[:32]:32} {r.get('MTFCC', ''):6} "
              f"{r.km2:8,.0f}  {c.x:.3f}, {c.y:.3f}{'   <- in box' if inbox else ''}")

    pick = pd.Series(False, index=w.index)
    if a.take:
        pick |= w["FULLNAME"].fillna("").str.contains(re.escape(a.take), case=False)
    if a.rows:
        pick |= w.index.isin(a.rows)
    if not pick.any():
        print("\n(nothing saved - add --take or --rows to save some)")
        return
    sel = w[pick]
    geom = unary_union([make_valid(g) for g in sel.geometry])
    if a.close > 0:
        to5070 = pyproj.Transformer.from_crs(4326, 5070, always_xy=True).transform
        to4326 = pyproj.Transformer.from_crs(5070, 4326, always_xy=True).transform
        from shapely.ops import transform as sh_transform
        g5 = sh_transform(to5070, geom)
        n0 = len(getattr(g5, "geoms", [g5]))
        g5 = make_valid(g5.buffer(a.close).buffer(-a.close))
        print(f"closed gaps of up to {2 * a.close:.0f} m: {n0} piece(s) -> {len(getattr(g5, 'geoms', [g5]))}")
        geom = sh_transform(to4326, g5)
    os.makedirs("osm_lakes", exist_ok=True)
    out = os.path.join("osm_lakes", a.out + ".geojson")
    json.dump({"type": "FeatureCollection",
               "features": [{"type": "Feature", "properties": {"name": a.out, "source": "Census areawater"},
                             "geometry": mapping(geom)}]}, open(out, "w"))
    print(f"\nsaved {len(sel)} polygon(s), about {sel.km2.sum():,.0f} km2 -> {out}")


if __name__ == "__main__":
    main()