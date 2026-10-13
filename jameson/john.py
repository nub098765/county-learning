# pyright: reportMissingModuleSource=false
import glob, geopandas as gpd

for f in sorted(glob.glob("areawater/tl_*_49*_areawater.zip")):
    d = gpd.read_file(f)
    d = d.to_crs(5070)
    d["km2"] = d.geometry.area / 1e6
    big = d[d["km2"] > 20].sort_values("km2", ascending=False)
    if len(big):
        print(f.split("_")[2])
        print(big[["FULLNAME", "MTFCC", "km2"]].round(0).to_string(index=False))