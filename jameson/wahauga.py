python3 - <<'EOF'
import glob, geopandas as gpd
files = sorted(glob.glob("areawater/tl_*_02*_areawater.zip"))
print(len(files), "Alaska water files downloaded")
for f in files:
    d = gpd.read_file(f)
    m = d[d["FULLNAME"].fillna("").str.contains("Iliamna", case=False)]
    if len(m):
        m = m.to_crs(3338)
        m["km2"] = m.geometry.area / 1e6
        print(f.split("_")[2], m.groupby(["FULLNAME", "MTFCC"]).km2.sum().round(0).to_string())
EOF