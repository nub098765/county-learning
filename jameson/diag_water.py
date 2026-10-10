#!/usr/bin/env python3
"""
diag_water.py - show what the Census calls the biggest water polygons in a county.

Use it to see how Lake Erie / Lake Michigan are named in the files that
build_maps_hires.py downloaded into ./areawater/ . Run from the same folder:

    python diag_water.py 39035 55029

(39035 = Cuyahoga County OH on Lake Erie, 55029 = Door County WI)
Paste the output back to me.
"""
import glob, sys
import geopandas as gpd

for geoid in sys.argv[1:] or ["39035", "55029"]:
    files = glob.glob(f"areawater/tl_*_{geoid}_areawater.zip")
    if not files:
        print(f"{geoid}: no file in ./areawater/ (run build_maps_hires.py for its state first)")
        continue
    d = gpd.read_file(files[0])
    print(f"\n{geoid}  {files[0]}   columns: {', '.join(d.columns)}")
    print(f"  {len(d)} water polygons; biggest by AWATER:")
    d = d.sort_values("AWATER", ascending=False).head(10)
    for _, r in d.iterrows():
        print(f"   {str(r.get('FULLNAME'))!r:34} MTFCC={r.get('MTFCC')}  {r['AWATER']/1e6:>10,.1f} km2")
