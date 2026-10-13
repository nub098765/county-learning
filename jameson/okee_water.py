#!/usr/bin/env python3
"""Lists the big Census water polygons around Lake Okeechobee, so we can see which pieces of the lake the
build script is missing. Run it from the folder that has the areawater/ folder (the jameson folder):
    python3 okee_water.py
and send me the output."""
import glob, os, re
import geopandas as gpd
import pandas as pd
rows = []
for f in sorted(glob.glob(os.path.join("areawater", "tl_*_12*_areawater.zip"))):
    geoid = re.search(r"_(12\d{3})_areawater", f).group(1)
    if geoid not in ("12093", "12043", "12051", "12099", "12085", "12055", "12111"):   # Okeechobee, Glades, Hendry, Palm Beach, Martin, Highlands, St. Lucie
        continue
    d = gpd.read_file(f)
    d = d.to_crs(5070)
    d["km2"] = d.geometry.area / 1e6
    d = d[d.km2 >= 3]
    for r in d.itertuples():
        rows.append((geoid, r.FULLNAME or "(no name)", r.MTFCC, round(r.km2, 1)))
if not rows:
    print("No water files found - run this from the folder that contains areawater/")
for r in sorted(rows, key=lambda r: -r[3]):
    print(f"county {r[0]}  {r[1]!r:40} {r[2]}  {r[3]} km2")
