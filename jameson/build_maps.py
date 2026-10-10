#!/usr/bin/env python3
"""
build_maps.py - turn official US Census boundary files into SVG path data
for Countypleth.

SETUP (once)
  pip install geopandas shapely pyproj

DOWNLOAD (from https://www.census.gov/geographies/mapping-files/time-series/geo/cartographic-boundary.html
  -> "Counties" and "States", pick the newest year, resolution 500k)
  cb_YYYY_us_county_500k.zip
  cb_YYYY_us_state_500k.zip
Put both zips in the same folder as this script.

RUN
  python build_maps.py            (year is detected from the zip names)
  python build_maps.py --tolerance 0.1

  --tolerance is the simplification strength in PIXELS of the final 800px-wide
  state map (default 0.25). It is relative to each state's size, so tiny
  states like Rhode Island keep as much detail as big ones. Lower = more
  detail and bigger files; 0 = keep every point.
  Alaska is simplified at 3x that value (--ak-factor) because its coastline is
  enormous.

  Each state is projected around its own center, so north is "up" in every
  state map (the earlier version used one national projection, which tilted
  states far from the middle of the country, like Rhode Island).

OUTPUT (./map-data/)
  counties.json   { "<STATE_FIPS>": { name, viewBox, counties:[{geoid,name,namelsad,d}] } }
  us-states.json  state outlines for the picker map, with Alaska/Hawaii insets
  territories.json  PR, VI, MP, AS (and GU) each in their own projection
Every county keeps its GEOID, so you can map it to your existing ids
(e.g. "santa-cruz-az") with a small lookup table and keep saved progress.
"""
import argparse, json, os, re
import geopandas as gpd
from shapely.affinity import translate, scale
from shapely.geometry import MultiPolygon, Polygon

# state FIPS -> projection best suited to it
CRS = {
    "02": "EPSG:3338",   # Alaska Albers
    "15": "ESRI:102007", # Hawaii Albers
    "72": "EPSG:32161",  # Puerto Rico
    "78": "EPSG:32161",  # US Virgin Islands
    "66": "EPSG:32655",  # Guam
    "69": "EPSG:32655",  # N. Mariana Islands
    "60": "EPSG:32702",  # American Samoa
}
CONUS = "EPSG:5070"
TERRITORIES = {"72", "78", "66", "69", "60"}
W = 800  # viewBox width per state map


def ring_d(coords, prec):
    pts = [f"{x:.{prec}f} {y:.{prec}f}" for x, y in coords]
    return "M" + "L".join(pts) + "Z"


def geom_d(g, prec=1):
    polys = g.geoms if isinstance(g, MultiPolygon) else [g]
    out = []
    for p in polys:
        if not isinstance(p, Polygon) or p.is_empty:
            continue
        out.append(ring_d(p.exterior.coords, prec))
        out += [ring_d(r.coords, prec) for r in p.interiors]
    return "".join(out)


def local_crs(grp):
    """Albers projection centred on this group, so north is up for every state."""
    minx, miny, maxx, maxy = grp.total_bounds          # lon/lat degrees
    lat1 = miny + (maxy - miny) / 6
    lat2 = maxy - (maxy - miny) / 6
    return (f"+proj=aea +lat_1={lat1:.4f} +lat_2={lat2:.4f} +lat_0={(miny+maxy)/2:.4f} "
            f"+lon_0={(minx+maxx)/2:.4f} +x_0=0 +y_0=0 +datum=NAD83 +units=m +no_defs")


def simplify_group(proj, tol_m):
    """Simplify a state's counties together so shared borders stay shared."""
    if tol_m <= 0:
        return proj
    try:
        import numpy as np, shapely
        geoms = shapely.coverage_simplify(np.asarray(list(proj.geometry), dtype=object), tol_m)
    except Exception:  # older shapely/GEOS: simplify each county on its own
        geoms = [g.simplify(tol_m, preserve_topology=True) for g in proj.geometry]
    proj = proj.copy()
    proj["geometry"] = list(geoms)
    return proj


def fit(gdf, width=W):
    """Flip y (SVG is top-down) and scale so the layer is `width` wide."""
    minx, miny, maxx, maxy = gdf.total_bounds
    k = width / (maxx - minx)
    geoms = [scale(translate(g, -minx, -maxy), k, -k, origin=(0, 0)) for g in gdf.geometry]
    return geoms, round((maxy - miny) * k), k


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--year", help="optional; auto-detected from cb_YYYY_us_county_500k.zip")
    ap.add_argument("--tolerance", type=float, default=0.25, help="simplification in output pixels (default 0.25)")
    ap.add_argument("--ak-factor", type=float, default=3.0, help="multiply the tolerance for Alaska (default 3)")
    a = ap.parse_args()
    here = os.path.dirname(os.path.abspath(__file__))
    dirs = [os.getcwd()] + ([here] if here != os.getcwd() else [])

    def find(kind):
        """Find cb_YYYY_us_<kind>_<res>.zip (or an unzipped folder/.shp). Prefers 500k."""
        hits = []
        for d in dirs:
            for p in os.listdir(d):
                m = re.fullmatch(r"cb_(\d{4})_us_%s_(500k|5m|20m)(\.zip)?" % kind, p, re.I)
                if m and (a.year is None or m.group(1) == a.year):
                    hits.append((m.group(1), m.group(2) != "500k", os.path.join(d, p)))
        if not hits:
            return None
        hits.sort(key=lambda h: (h[1], [-int(c) for c in h[0]]))
        return hits[0][2], hits[0][0]

    c, s = find("county"), find("state")
    if not c or not s:
        print("Could not find the Census files. Looked in:")
        for d in dirs:
            print("  ", d)
            print("   contains:", ", ".join(sorted(os.listdir(d))[:15]) or "(empty)")
        print("Need: cb_YYYY_us_county_500k.zip and cb_YYYY_us_state_500k.zip")
        raise SystemExit(1)
    a.year = c[1]
    print("Using", c[0], "and", s[0])

    counties = gpd.read_file(c[0])
    states = gpd.read_file(s[0])
    # the picker map is small, so it is simplified in degrees as before
    states["geometry"] = states.geometry.simplify(0.0005, preserve_topology=True)

    os.makedirs("map-data", exist_ok=True)

    # ---- one map per state / territory --------------------------------
    out = {}
    for fips, grp in counties.groupby("STATEFP"):
        crs = CRS.get(fips) or local_crs(grp)
        proj = grp.to_crs(crs)
        minx, miny, maxx, maxy = proj.total_bounds
        tol_m = a.tolerance * (maxx - minx) / W * (a.ak_factor if fips == "02" else 1.0)
        proj = simplify_group(proj, tol_m)
        geoms, h, _ = fit(proj)
        out[fips] = {
            "name": states.loc[states.STATEFP == fips, "NAME"].iloc[0],
            "viewBox": f"0 0 {W} {h}",
            "counties": [
                {"geoid": r.GEOID, "name": r.NAME, "namelsad": r.NAMELSAD, "d": geom_d(g)}
                for r, g in zip(proj.itertuples(), geoms)
            ],
        }
    json.dump(out, open("map-data/counties.json", "w"), separators=(",", ":"))

    # ---- picker map: lower 48 in Albers, AK/HI as insets ---------------
    lower = states[~states.STATEFP.isin(["02", "15"] + list(TERRITORIES))].to_crs(CONUS)
    lower_geoms, lh, k = fit(lower, 1000)
    minx, miny, maxx, maxy = lower.total_bounds
    picker = [
        {"fips": r.STATEFP, "name": r.NAME, "abbr": r.STUSPS, "d": geom_d(g)}
        for r, g in zip(lower.itertuples(), lower_geoms)
    ]
    for fips, (sc, ox, oy) in {"02": (0.35, 20, lh - 260), "15": (1.0, 260, lh - 130)}.items():
        s = states[states.STATEFP == fips].to_crs(CRS[fips])
        g, _, kk = fit(s, 1000 * 0.25 if fips == "02" else 1000 * 0.12)
        for r, geom in zip(s.itertuples(), g):
            picker.append({"fips": fips, "name": r.NAME, "abbr": r.STUSPS,
                           "d": geom_d(translate(geom, ox, oy))})
    json.dump({"viewBox": f"0 0 1000 {lh}", "states": picker},
              open("map-data/us-states.json", "w"), separators=(",", ":"))

    # ---- territories panel: each in its own box, own scale -------------
    terr = {}
    for fips in sorted(TERRITORIES):
        if fips in out:
            terr[fips] = out[fips]
    json.dump(terr, open("map-data/territories.json", "w"), separators=(",", ":"))

    n = sum(len(v["counties"]) for v in out.values())
    print(f"Wrote {n} county-equivalents in {len(out)} states/territories to ./map-data/")
    print("Check: Alaska should list Haines Borough, Skagway Municipality, Hoonah-Angoon CA,")
    print("       Puerto Rico should list 78 municipios (Mona Island is inside Mayaguez).")


if __name__ == "__main__":
    main()