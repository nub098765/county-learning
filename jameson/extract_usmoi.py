#!/usr/bin/env python3
"""
extract_usmoi.py - cut the nine U.S. Minor Outlying Islands out of the OSM land polygons.
The Census county file has no state 74 (your check showed only the real Wake/Johnston/Baker/Kingman counties),
so the islands come from the same OSM land layer the rest of the maps use.

Run from jameson (needs land_polygons.shp or land.gpkg there):
    python3 extract_usmoi.py
Writes usmoi/islands.geojson (one feature per island) and prints each island's pieces and size.
"""
import glob, os, sys
import geopandas as gpd
from shapely.geometry import box
from shapely.ops import unary_union

# name: (lon, lat, search box lon0, lat0, lon1, lat1)  - boxes are generous but never reach the neighbouring island
ISLANDS = {
    "Midway Atoll":    (-177.38, 28.21, (-177.50, 28.10, -177.25, 28.32)),
    "Wake Island":     (166.63, 19.30, (166.50, 19.20, 166.75, 19.40)),
    "Johnston Atoll":  (-169.52, 16.73, (-169.70, 16.60, -169.35, 16.85)),
    "Palmyra Atoll":   (-162.08, 5.88, (-162.20, 5.80, -161.95, 5.97)),
    "Kingman Reef":    (-162.42, 6.39, (-162.52, 6.32, -162.33, 6.46)),
    "Howland Island":  (-176.62, 0.81, (-176.70, 0.74, -176.54, 0.88)),
    "Baker Island":    (-176.48, 0.19, (-176.55, 0.13, -176.41, 0.26)),
    "Jarvis Island":   (-160.01, -0.37, (-160.10, -0.45, -159.93, -0.30)),
    "Navassa Island":  (-75.01, 18.41, (-75.10, 18.34, -74.93, 18.48)),
}

land_path = (glob.glob("land*.gpkg") or glob.glob("land_polygons.shp") or glob.glob("*/land_polygons.shp") or [None])[0]
if not land_path:
    sys.exit("Can't find the OSM land polygons (land.gpkg or land_polygons.shp).")
print("Land:", land_path, "\n")
os.makedirs("usmoi", exist_ok=True)
rows = []
for name, (lon, lat, b) in ISLANDS.items():
    land = gpd.read_file(land_path, bbox=b)
    if not len(land):
        print(f"{name:<16} NO land polygon in its box  <-- OSM has nothing here")
        continue
    g = unary_union([p.intersection(box(*b)) for p in land.geometry])
    parts = [p for p in (g.geoms if g.geom_type == "MultiPolygon" else [g]) if not p.is_empty]
    area = gpd.GeoSeries([g], crs=4326).to_crs(6933).area.iloc[0] / 1e6
    sizes = sorted((gpd.GeoSeries([p], crs=4326).to_crs(6933).area.iloc[0] / 1e6 for p in parts), reverse=True)
    print(f"{name:<16} {len(parts):>3} piece(s)  {area:8.3f} km2  biggest {sizes[0]:.3f}  smallest {sizes[-1]:.4f}  centre {g.centroid.x:.3f}, {g.centroid.y:.3f}")
    rows.append({"name": name, "lon": lon, "lat": lat, "geometry": g})
if rows:
    gpd.GeoDataFrame(rows, crs=4326).to_file("usmoi/islands.geojson", driver="GeoJSON")
    print(f"\nsaved {len(rows)} island(s) -> usmoi/islands.geojson")
