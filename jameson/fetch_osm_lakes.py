#!/usr/bin/env python3
"""
fetch_osm_lakes.py - download lake outlines from OpenStreetMap (via Nominatim)
into ./osm_lakes/, where build_maps_hires.py picks them up.

Run it in the same folder as build_maps_hires.py:

    python3 fetch_osm_lakes.py                                  # Lake Okeechobee
    python3 fetch_osm_lakes.py "Lake Pontchartrain=pontchartrain" "Lake Maurepas=maurepas"
    python3 fetch_osm_lakes.py "relation:1205151=huron"         # fetch an exact OpenStreetMap relation by ID

Each argument is  search name = file name. The file name decides which lake it replaces:
okeechobee.geojson replaces the Census shape of Lake Okeechobee; use underscores for spaces
(great_salt.geojson = Great Salt Lake). Check the printed name and area before you build.

Needs internet. Nominatim asks for at most one request per second; this script waits.
Data (c) OpenStreetMap contributors (ODbL).
"""
import json, os, sys, time, urllib.parse, urllib.request

import pyproj
from shapely.geometry import shape, mapping
from shapely.ops import transform

DEFAULT = ["Lake Okeechobee=okeechobee"]
UA = "county-map-builder/1.0 (personal hobby project)"
TO_AREA = pyproj.Transformer.from_crs(4326, 5070, always_xy=True).transform


def search(name):
    url = ("https://nominatim.openstreetmap.org/search?" + urllib.parse.urlencode({
        "q": name, "format": "geojson", "polygon_geojson": 1, "limit": 10, "countrycodes": "us"}))
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.load(r)


def lookup(rel_id):
    """Fetch one exact OpenStreetMap relation by its ID (no name search, so no wrong matches)."""
    url = ("https://nominatim.openstreetmap.org/lookup?" + urllib.parse.urlencode({
        "osm_ids": f"R{rel_id}", "format": "geojson", "polygon_geojson": 1, "polygon_threshold": 0.0001}))
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=180) as r:
        return json.load(r)


def pick(fc):
    """Largest polygon result, preferring ones OSM tags as water. Returns (feature, km2) or None."""
    best = None
    for f in fc.get("features", []):
        g = f.get("geometry")
        if not g or g.get("type") not in ("Polygon", "MultiPolygon"):
            continue
        p = f.get("properties", {})
        km2 = transform(TO_AREA, shape(g)).area / 1e6
        water = (p.get("type") == "water") or (p.get("category") == "natural" and p.get("type") in ("water", "bay"))
        key = (water, km2)
        if best is None or key > best[0]:
            best = (key, f, km2)
    return None if best is None else (best[1], best[2])


def main():
    args = sys.argv[1:] or DEFAULT
    os.makedirs("osm_lakes", exist_ok=True)
    for n, a in enumerate(args):
        name, _, fname = a.partition("=")
        fname = (fname or name.lower().replace("lake ", "").replace(" ", "_")).strip()
        if n:
            time.sleep(1.2)
        print(f"\n{name}")
        if name.strip().lower().startswith("relation:"):
            got = pick(lookup(name.split(":", 1)[1].strip()))
        else:
            got = pick(search(name))
        if got is None:
            print("   no polygon found - nothing saved")
            continue
        f, km2 = got
        p = f.get("properties", {})
        print(f"   found: {p.get('display_name') or p.get('name')}")
        print(f"   osm {p.get('osm_type')} {p.get('osm_id')}, {p.get('category')}/{p.get('type')}, about {km2:,.0f} km2")
        geom = shape(f["geometry"])
        n_holes = sum(len(q.interiors) for q in (geom.geoms if geom.geom_type == "MultiPolygon" else [geom]))
        print(f"   {n_holes} island(s)/holes inside")
        out = os.path.join("osm_lakes", fname + ".geojson")
        json.dump({"type": "FeatureCollection",
                   "features": [{"type": "Feature", "properties": {"name": name}, "geometry": mapping(geom)}]},
                  open(out, "w"))
        print(f"   saved {out}")


if __name__ == "__main__":
    main()