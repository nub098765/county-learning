#!/usr/bin/env python3
"""
check_usmoi.py - what does the Census county file hold for the U.S. Minor Outlying Islands?
Saves nothing. Run from the folder that has tl_YYYY_us_county.zip (jameson):
    python3 check_usmoi.py
Optional: if the OSM land polygons are there too, it also shows how much of each island survives the land clip.
"""
import glob, sys
import geopandas as gpd
from shapely.geometry import box

NAMES = ("midway", "wake", "johnston", "palmyra", "kingman", "howland", "baker", "jarvis", "navassa")

tl = sorted(glob.glob("tl_*_us_county.zip")) or sorted(glob.glob("tl_*_us_county"))
if not tl:
    sys.exit("Can't find tl_YYYY_us_county.zip in this folder.")
c = gpd.read_file(tl[-1])
print("File:", tl[-1], "-", len(c), "rows; state codes present:", sorted(c.STATEFP.unique())[-8:])

by_state = c[c.STATEFP == "74"]
by_name = c[c.NAME.str.lower().str.contains("|".join(NAMES)) | c.NAMELSAD.str.lower().str.contains("|".join(NAMES))]
rows = gpd.GeoDataFrame(__import__("pandas").concat([by_state, by_name]).drop_duplicates("GEOID"), crs=c.crs)
if rows.empty:
    sys.exit("\nNo STATEFP 74 rows and nothing named Midway/Wake/Johnston/Palmyra/Kingman/Howland/Baker/Jarvis/Navassa.\n"
             "Paste this output - the islands then need another source (the Census 'cartographic boundary' state file).")

land_path = (glob.glob("land*.gpkg") or glob.glob("land_polygons.shp") or glob.glob("*/land_polygons.shp") or [None])[0]
print(f"\n{len(rows)} row(s) found{'; land file: ' + land_path if land_path else '; no OSM land file found, skipping the clip check'}\n")
rows = rows.to_crs(4326)
for r in rows.itertuples():
    g = r.geometry
    parts = list(g.geoms) if g.geom_type == "MultiPolygon" else [g]
    a_km2 = gpd.GeoSeries([g], crs=4326).to_crs(6933).area.iloc[0] / 1e6      # equal-area
    cx, cy = g.centroid.x, g.centroid.y
    line = f"{r.GEOID}  {r.NAMELSAD:<34} state {r.STATEFP}  {len(parts):>3} piece(s)  {a_km2:10.3f} km2  centre {cx:9.4f}, {cy:8.4f}"
    if land_path:
        b = g.bounds
        land = gpd.read_file(land_path, bbox=(b[0] - .1, b[1] - .1, b[2] + .1, b[3] + .1))
        if len(land):
            kept = gpd.GeoSeries([g.intersection(land.union_all() if hasattr(land, "union_all") else land.unary_union)], crs=4326).to_crs(6933).area.iloc[0] / 1e6
            line += f"   after land clip {kept:.3f} km2 ({100 * kept / max(a_km2, 1e-9):.0f}%)"
        else:
            line += "   after land clip: NO land polygon near it (OSM has nothing here)"
    print(line)
