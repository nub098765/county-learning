#!/usr/bin/env python3
"""
build_maps_hires.py - HIGH-DETAIL, LAND-ONLY county outlines.

Why this exists
  The Census "cartographic boundary" files (what build_maps.py used) are
  generalized for printing at 1:500,000, which smooths away narrow rivers,
  barrier islands and bay inlets (e.g. Aquidneck Island looks attached to
  mainland Rhode Island). This script instead takes:

    1. TIGER/Line county boundaries  - full detail, but they run out over the
       water (a county "includes" its bays and coastal waters), and
    2. OpenStreetMap land polygons   - an accurate coastline,

  and keeps only the part of each county that is LAND (county  ∩  land).
  Small inland lakes and ponds stay as part of their county, like the Census
  maps, but BIG lakes (at least --lake-min-km2, default 100: Lake Okeechobee,
  Lake Winnebago, ...) are cut out using the Census water polygons. The ocean
  is cut away using the OSM coastline. OSM's land layer has two blind spots, so
  the script ALSO cuts away the Census's own water polygons for:
    - the GREAT LAKES (OSM counts them as land), and
    - bays, sounds and lagoons OSM leaves as land (e.g. Laguna Madre, which
      otherwise fuses Padre Island to the Texas mainland).
  Those water files are downloaded the first time into ./areawater/ (only for
  counties that touch the sea or a Great Lake) - this step needs internet.
  Alaska is skipped (huge files; OSM's Alaska coast is good) unless you pass
  --water-alaska.

DOWNLOADS (put them in the same folder as this script)
  A) TIGER/Line counties, national file:
       https://www2.census.gov/geo/tiger/TIGER2025/COUNTY/tl_2025_us_county.zip
     (use the newest TIGER year; keep the file name tl_YYYY_us_county.zip)
  B) OSM land polygons, split WGS84 version (~900 MB):
       https://osmdata.openstreetmap.de/data/land-polygons.html
       -> "Split polygons, WGS84"  = land-polygons-split-4326.zip
     UNZIP this one (the script finds land_polygons.shp inside the folder;
     reading straight from the zip also works but is much slower).

  OPTIONAL SPEEDUP for big runs (--states all): the shapefile has no spatial
  index, so every state re-scans all 900 MB. Convert it once with GDAL
  (ogr2ogr -f GPKG land.gpkg land_polygons.shp) and put land.gpkg next to this
  script; it is used automatically and is many times faster.

  OpenStreetMap data is © OpenStreetMap contributors (ODbL). If your site is
  public, put "Coastlines © OpenStreetMap contributors" somewhere visible
  (the footer next to "Made by ..." is fine).

SETUP (once)
  pip install -U geopandas shapely pyproj pyogrio

RUN
  python build_maps_hires.py                 # the 11 states your game uses
  python build_maps_hires.py --states 44,48  # just Rhode Island and Texas
  python build_maps_hires.py --states all    # every state, DC and the territories
                                             # (slow: an hour or more; safe to stop and
                                             # re-run - finished states are saved in
                                             # map-data/hires/ and skipped)

  --tolerance-m   simplification in real metres (default 8). Lower = more
                  detail, bigger file. 0 keeps every vertex.
  --min-island-m2 drop islets smaller than this (default 3000 m^2, about a
                  tennis court). Alaska uses --ak-min-island-m2 (default
                  50000) because it has a staggering number of rocks.
  --min-water-km2 water bodies smaller than this are left as land, so they never show
                  up as stray dots (default 25). It applies to the Census "Bay / Sound /
                  Inlet ..." name cut and to any tiny hole left inside a county. ISLANDS
                  are not affected (see --min-island-m2). 0 turns the filter off.
  --lake-min-km2  inland lakes at least this big are cut out of their counties
                  (default 100). --no-lakes turns it off. Needs the Census water file
                  of EVERY county (downloaded once into ./areawater/). Alaska is
                  skipped unless you pass --water-alaska.

OUTPUT: ./map-data/counties-hires.json
  { "<STATE_FIPS>": { name, viewBox, scale, counties:[{geoid,name,namelsad,d}] } }
  Coordinates are whole numbers in a 16000-unit-wide viewBox (so "scale" is
  20 relative to the old 800-wide maps) and paths use relative commands to
  stay compact. Every county still carries its GEOID.
"""
import argparse, glob, json, os, re, sys, time, urllib.request

import geopandas as gpd
import numpy as np
import pandas as pd
import shapely
from shapely import STRtree
from shapely.geometry import Polygon, MultiPolygon
from shapely.ops import unary_union
from shapely.validation import make_valid

W = 16000  # output viewBox width, in integer units

# the states the game currently builds
PLAYABLE = ["44", "15", "33", "02", "06", "48", "55", "01", "04", "39", "10", "12"]

# fixed projections where a "local Albers" would be wrong or awkward
FIXED_CRS = {
    "02": "EPSG:3338",    # Alaska Albers
    "15": "ESRI:102007",  # Hawaii Albers
    "72": "EPSG:32161",   # Puerto Rico
    "78": "EPSG:32161",   # US Virgin Islands
    "66": "EPSG:32655",   # Guam
    "69": "EPSG:32655",   # N. Mariana Islands
    "60": "EPSG:32702",   # American Samoa
}
# land-polygon bounding boxes to read (lon/lat). Alaska needs two because the
# Aleutians cross the 180th meridian.
LAND_BOXES = {
    "02": [(-180, 50, -128, 72), (166, 50, 180, 56)],
    "15": [(-162, 18, -154, 23)],
}


# states with Great Lakes shoreline (the lake water has to be removed from these)
# Alaska's water files are enormous and OSM handles its coast well, so skip it unless asked
SKIP_WATER_STATES = {"02"}
GREAT_LAKES_STATES = {"17", "18", "26", "27", "36", "39", "42", "55"}
LAKE_NAME = re.compile(r"^(Lake|Lk) (Superior|Michigan|Huron|Erie|Ontario|St\.? ?Clair|Saint Clair)$|^Green Bay$", re.I)   # the Census abbreviates Lake as "Lk"
SEA_NAME = re.compile(r"\b(Laguna|Lagoon|Sound|Snd|Bay|Gulf|Harbor|Harbour|Hbr|Inlet|Ocean|Sea)\b", re.I)
BAY_NAME = re.compile(r"\b(Bay|Harbor|Harbour|Hbr|Haven)\b", re.I)


def fetch(url, dest):
    if os.path.exists(dest) and os.path.getsize(dest) > 0:
        return True
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    req = urllib.request.Request(url, headers={"User-Agent": "county-map-builder"})
    for attempt in range(3):
        try:
            tmp = dest + ".part"          # write to a temp name so a stop mid-download
            with urllib.request.urlopen(req, timeout=60) as r, open(tmp, "wb") as f:   # never leaves a half file
                f.write(r.read())
            os.replace(tmp, dest)
            return True
        except Exception as e:  # network hiccup: retry, then give up on this county
            err = e
            time.sleep(1.5 * (attempt + 1))
    print(f"   WARNING: could not download {url}: {err}")
    if os.path.exists(dest):
        os.remove(dest)
    return False


def tiger_water(grp, year, crs, lakes, min_water_m2=0):
    """Water polygons (in `crs`) that the OSM coastline treats as land, from the Census.

    Always:  bays, sounds, lagoons, gulf/ocean polygons  (e.g. Laguna Madre, which
             OSM calls land - that fused Padre Island to the Texas mainland).
    If lakes: also the Great Lakes (Superior, Michigan, ...) and bays touching them.
    Returns one geometry, or None.
    """
    frames = []
    geoids = list(grp.GEOID)
    for n, geoid in enumerate(geoids, 1):
        dest = os.path.join("areawater", f"tl_{year}_{geoid}_areawater.zip")
        url = f"https://www2.census.gov/geo/tiger/TIGER{year}/AREAWATER/tl_{year}_{geoid}_areawater.zip"
        if fetch(url, dest):
            frames.append(gpd.read_file(dest))
        if n % 20 == 0:
            print(f"   water files: {n}/{len(geoids)}")
    if not frames:
        return None
    water = gpd.GeoDataFrame(pd.concat(frames, ignore_index=True), crs=frames[0].crs).to_crs(crs)
    names = water["FULLNAME"].fillna("").str.strip()
    mt = water["MTFCC"].fillna("")
    geoms = list(water.geometry)
    pick = set()

    # coastal bays / sounds / lagoons / gulf
    sea = mt.isin(["H2051", "H2053"]) | (mt.eq("H2030") & names.map(lambda s: bool(SEA_NAME.search(s))))
    pick |= set(water.index[sea])

    # Great Lakes + bays that touch them
    if lakes:
        seeds = set(water.index[names.map(lambda s: bool(LAKE_NAME.match(s)))])
        if not seeds:
            top = sorted(range(len(geoms)), key=lambda i: -geoms[i].area)[:8]
            print("   WARNING: found NO Great Lakes polygon by name. Largest water polygons here are:")
            for i in top:
                print(f"      {names[i] or '(no name)'!r:32} MTFCC={mt[i]}  {geoms[i].area/1e6:,.0f} km2")
        cand_ok = set(water.index[mt.isin(["H2030", "H2051"]) & names.map(lambda s: bool(BAY_NAME.search(s)))])
        tree = STRtree(geoms)
        inc, frontier = set(seeds), list(seeds)
        while frontier:
            nxt = []
            for i in frontier:
                for j in tree.query(geoms[i], predicate="intersects"):
                    if j not in inc and j in cand_ok:
                        inc.add(j); nxt.append(j)
            frontier = nxt
        pick |= inc
    if not pick:
        return None
    # say what is being cut, biggest first, so odd choices are easy to spot
    big = sorted(pick, key=lambda i: -geoms[i].area)[:6]
    print("   cutting water:", "; ".join(f"{names[i] or '(unnamed)'} [{mt[i]}]" for i in big), f"... {len(pick)} polygons")
    cut = unary_union([make_valid(geoms[i]) for i in pick])
    if min_water_m2 > 0:
        # Merge touching pieces first (a bay split across counties is one body of water), then drop
        # the small ones. A small pond that merely has "Bay" or "Inlet" in its name is not connected to
        # anything big, so it fails this test and stays land; a real bay touches the sea / a Great Lake
        # and merges into a big body, so it passes. This is what stops stray dots appearing.
        parts = polygons_of(cut)
        keep = [p for p in parts if p.area >= min_water_m2]
        if len(keep) != len(parts):
            print(f"   ignoring {len(parts) - len(keep)} small water bodies (under {min_water_m2/1e6:g} km2) so they stay land")
        cut = unary_union(keep) if keep else None
    return cut


def local_crs(bounds):
    minx, miny, maxx, maxy = bounds
    lat1 = miny + (maxy - miny) / 6
    lat2 = maxy - (maxy - miny) / 6
    return (f"+proj=aea +lat_1={lat1:.4f} +lat_2={lat2:.4f} +lat_0={(miny+maxy)/2:.4f} "
            f"+lon_0={(minx+maxx)/2:.4f} +x_0=0 +y_0=0 +datum=NAD83 +units=m +no_defs")


def polygons_of(g):
    """All Polygon parts of any geometry (drops stray lines/points)."""
    if g is None or g.is_empty:
        return []
    return [p for p in shapely.get_parts(g) if isinstance(p, Polygon) and not p.is_empty]


def tiger_lakes(grp, year, crs, min_m2):
    """Big INLAND lakes and reservoirs (Okeechobee, Winnebago, ...) from the Census water files.

    Reads the water file of every county in `grp`, merges touching pieces (a lake is split at county
    lines in these files, so each piece is small but the lake is big), and keeps the merged lakes of
    at least min_m2. Returns one geometry in `crs`, or None. The Great Lakes are skipped here: the
    other cut (tiger_water) already handles them.
    """
    frames = []
    geoids = list(grp.GEOID)
    for n, geoid in enumerate(geoids, 1):
        dest = os.path.join("areawater", f"tl_{year}_{geoid}_areawater.zip")
        url = f"https://www2.census.gov/geo/tiger/TIGER{year}/AREAWATER/tl_{year}_{geoid}_areawater.zip"
        if fetch(url, dest):
            d = gpd.read_file(dest)
            d = d[d["MTFCC"].isin(["H2030", "H2040"])]          # lakes/ponds and reservoirs only
            if len(d):
                frames.append(d)
        if n % 20 == 0:
            print(f"   lake water files: {n}/{len(geoids)}")
    if not frames:
        return None
    water = gpd.GeoDataFrame(pd.concat(frames, ignore_index=True), crs=frames[0].crs).to_crs(crs)
    names = water["FULLNAME"].fillna("").str.strip().tolist()
    keep = [i for i, nm in enumerate(names) if not LAKE_NAME.match(nm)]
    geoms = [make_valid(water.geometry.iloc[i]) for i in keep]
    names = [names[i] for i in keep]
    if not geoms:
        return None
    lakes = [p for p in polygons_of(unary_union(geoms)) if p.area >= min_m2]
    if not lakes:
        print(f"   no inland lake reaches {min_m2/1e6:g} km2")
        return None
    tree = STRtree(geoms)
    report = []
    for p in lakes:
        idx = tree.query(p, predicate="intersects")
        best = max(idx, key=lambda i: geoms[i].area)
        report.append((p.area, names[best] or "(unnamed)"))
    report.sort(reverse=True)
    print(f"   cutting {len(lakes)} lake(s) of at least {min_m2/1e6:g} km2: "
          + "; ".join(f"{nm} {a/1e6:,.0f} km2" for a, nm in report[:8]) + (" ..." if len(report) > 8 else ""))
    return unary_union(lakes)


def drop_small_holes(g, min_area):
    """Fill in holes smaller than min_area (stray ponds); bigger holes and every island are kept."""
    if g is None or g.is_empty or min_area <= 0:
        return g
    polys, changed = [], False
    for p in polygons_of(g):
        keep = [r for r in p.interiors if Polygon(r).area >= min_area]
        if len(keep) != len(p.interiors):
            changed = True
            p = Polygon(p.exterior, keep)
        polys.append(p)
    # union again so an island that sat inside a filled-in hole is absorbed instead of overlapping
    return unary_union(polys) if changed else g


def ring_path(pts):
    """Closed ring -> 'M x y l dx dy ... z' with integer, relative coordinates."""
    pts = [(int(round(x)), int(round(y))) for x, y in pts]
    out = [pts[0]]
    for p in pts[1:]:
        if p != out[-1]:
            out.append(p)
    if len(out) > 1 and out[0] == out[-1]:
        out.pop()
    if len(out) < 3:
        return ""
    s = f"M{out[0][0]} {out[0][1]}l"
    s += " ".join(f"{b[0]-a[0]} {b[1]-a[1]}" for a, b in zip(out, out[1:]))
    return s + "z"


def geom_path(g):
    parts = []
    for poly in polygons_of(g):
        parts.append(ring_path(poly.exterior.coords))
        parts += [ring_path(r.coords) for r in poly.interiors]
    return "".join(p for p in parts if p)


def find_land():
    gp = glob.glob("land*.gpkg")
    if gp:
        print("Using indexed land file", gp[0])
        return gp[0]
    for pat in ("land_polygons.shp", os.path.join("*", "land_polygons.shp"),
                os.path.join("*", "*", "land_polygons.shp")):
        hit = glob.glob(pat)
        if hit:
            return hit[0]
    zips = glob.glob("land-polygons-*4326*.zip")
    if zips:
        print("Reading land polygons straight from the zip (slow - unzipping it first is much faster).")
        return f"zip://{zips[0]}"
    return None


def read_land(path, fips, state_bounds):
    pad = 0.15
    minx, miny, maxx, maxy = state_bounds
    boxes = LAND_BOXES.get(fips) or [(minx - pad, miny - pad, maxx + pad, maxy + pad)]
    frames = [gpd.read_file(path, bbox=b) for b in boxes]
    land = gpd.GeoDataFrame(pd.concat(frames, ignore_index=True), crs=frames[0].crs)
    return land


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--states", default="playable", help="comma list of state FIPS, 'playable' or 'all'")
    ap.add_argument("--tolerance-m", type=float, default=8.0)
    ap.add_argument("--min-island-m2", type=float, default=3000.0)
    ap.add_argument("--ak-min-island-m2", type=float, default=50000.0)
    ap.add_argument("--redo", action="store_true", help="rebuild states even if already saved in map-data/hires/")
    ap.add_argument("--no-tiger-water", action="store_true", help="skip the Census water cut (Great Lakes, lagoons, sounds)")
    ap.add_argument("--water-alaska", action="store_true", help="also run the Census water cut for Alaska (huge downloads)")
    ap.add_argument("--min-water-km2", type=float, default=25.0,
                    help="water bodies smaller than this stay land, so no stray dots (default 25; 0 = off)")
    ap.add_argument("--lake-min-km2", type=float, default=100.0,
                    help="cut inland lakes at least this big out of their counties (default 100)")
    ap.add_argument("--no-lakes", action="store_true", help="don't cut big inland lakes")
    a = ap.parse_args()

    tl = sorted(glob.glob("tl_*_us_county.zip")) or sorted(glob.glob("tl_*_us_county"))
    if not tl:
        sys.exit("Could not find tl_YYYY_us_county.zip in this folder (see the DOWNLOADS section).")
    land_path = find_land()
    if not land_path:
        sys.exit("Could not find the OSM land polygons (land_polygons.shp). See the DOWNLOADS section.")
    print("Counties:", tl[-1]); print("Land    :", land_path)
    year = re.search(r"tl_(\d{4})_us_county", tl[-1]).group(1)

    counties = gpd.read_file(tl[-1])
    want = None if a.states == "all" else (PLAYABLE if a.states == "playable" else a.states.split(","))
    if want:
        counties = counties[counties.STATEFP.isin(want)]
    counties = counties.to_crs(4326)

    os.makedirs("map-data", exist_ok=True)
    out = {}
    os.makedirs(os.path.join("map-data", "hires"), exist_ok=True)
    for fips, grp in counties.groupby("STATEFP"):
        cache = os.path.join("map-data", "hires", f"{fips}.v4.json")
        if os.path.exists(cache) and not a.redo:
            out[fips] = json.load(open(cache))
            print(f"\n== {fips}: already built, using {cache}  (add --redo to rebuild)")
            continue
        print(f"\n== {fips}: {len(grp)} counties")
        land = read_land(land_path, fips, grp.total_bounds)
        crs = FIXED_CRS.get(fips) or local_crs(grp.total_bounds)
        grp = grp.to_crs(crs)
        land = land.to_crs(crs)
        land_geoms = [make_valid(g) for g in land.geometry]
        tree = STRtree(land_geoms)

        clipped = []
        for g in grp.geometry:
            g = make_valid(g)
            hits = tree.query(g, predicate="intersects")
            pieces = [g.intersection(land_geoms[i]) for i in hits]
            clipped.append(unary_union(pieces) if pieces else Polygon())

        # Cut water the OSM coastline treats as land: the Great Lakes, and lagoons/bays/sounds
        # (e.g. Laguna Madre). Only counties that touch the sea are checked, plus every county
        # in a Great Lakes state.
        want_lakes = fips in GREAT_LAKES_STATES
        if not a.no_tiger_water and (fips not in SKIP_WATER_STATES or a.water_alaska):
            raw = [make_valid(g) for g in grp.geometry]
            coastal = [i for i, (r, c) in enumerate(zip(raw, clipped))
                       if want_lakes or (r.area > 0 and (1 - c.area / r.area) > 0.001)]
            if coastal:
                print(f"   checking Census water for {len(coastal)} coastal/lake counties")
                cut = tiger_water(grp.iloc[coastal], year, crs, want_lakes, a.min_water_km2 * 1e6)
                if cut is not None and not cut.is_empty:
                    ctree = STRtree([cut])
                    clipped = [g.difference(cut) if not g.is_empty and len(ctree.query(g)) else g for g in clipped]

        # Cut the BIG inland lakes (Okeechobee, Winnebago, ...). Unlike the cut above this needs the Census
        # water file of every county, not just the coastal ones.
        if not a.no_lakes and not a.no_tiger_water and (fips not in SKIP_WATER_STATES or a.water_alaska):
            print(f"   checking Census water of all {len(grp)} counties for big lakes")
            lake_cut = tiger_lakes(grp, year, crs, a.lake_min_km2 * 1e6)
            if lake_cut is not None and not lake_cut.is_empty:
                ltree = STRtree([lake_cut])
                clipped = [g.difference(lake_cut) if not g.is_empty and len(ltree.query(g)) else g for g in clipped]

        # drop islets below the size cut-off
        min_area = a.ak_min_island_m2 if fips == "02" else a.min_island_m2
        cleaned = []
        for g in clipped:
            keep = [p for p in polygons_of(g) if p.area >= min_area]
            cleaned.append(MultiPolygon(keep) if keep else Polygon())

        # fill in tiny holes (stray ponds) left inside counties; islands are untouched, big lakes stay cut
        holes_before = sum(len(p.interiors) for g in cleaned for p in polygons_of(g))
        cleaned = [drop_small_holes(g, a.min_water_km2 * 1e6) for g in cleaned]
        holes_after = sum(len(p.interiors) for g in cleaned for p in polygons_of(g))
        if holes_before != holes_after:
            print(f"   filled in {holes_before - holes_after} tiny holes (under {a.min_water_km2:g} km2); {holes_after} kept")

        # simplify all counties together so shared borders stay shared
        if a.tolerance_m > 0:
            try:
                cleaned = list(shapely.coverage_simplify(np.asarray(cleaned, dtype=object), a.tolerance_m))
            except Exception:
                cleaned = [g.simplify(a.tolerance_m, preserve_topology=True) for g in cleaned]

        # fit to a W-unit-wide viewBox, y flipped for SVG
        allb = unary_union([g for g in cleaned if not g.is_empty]).bounds
        x0, y0, x1, y1 = allb
        k = W / (x1 - x0)
        tf = lambda g: shapely.transform(g, lambda c: np.column_stack(((c[:, 0]-x0)*k, (y1-c[:, 1])*k)))
        entries = []
        for row, g in zip(grp.itertuples(), cleaned):
            d = geom_path(tf(g)) if not g.is_empty else ""
            entries.append({"geoid": row.GEOID, "name": row.NAME, "namelsad": row.NAMELSAD, "d": d})
            if not d:
                print("   WARNING: no land found for", row.NAMELSAD)
        out[fips] = {"viewBox": f"0 0 {W} {round((y1-y0)*k)}", "scale": W / 800, "counties": entries}
        kb = sum(len(e["d"]) for e in entries) // 1000
        print(f"   {len(entries)} counties, {kb} KB, viewBox {out[fips]['viewBox']}")
        with open(cache, "w") as f:
            json.dump(out[fips], f, separators=(",", ":"))
        for e in entries:
            if e["name"] in ("Newport", "Calhoun"):
                print(f"   {e['name']}: {e['d'].count('M')} separate land pieces")

    # (each finished state is also saved on its own, so a crash or Ctrl-C never loses work)
    with open("map-data/counties-hires.json", "w") as f:
        json.dump(out, f, separators=(",", ":"))
    print("\nWrote map-data/counties-hires.json")


if __name__ == "__main__":
    main()