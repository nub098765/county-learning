#!/usr/bin/env python3
"""
restore_farmington.py - put the water between Antelope Island and the Davis County
mainland (Farmington Bay and the shallows around the island) back into the Great Salt
Lake file.

Why: the UGRC 2016 shapefile only has the main north and south arms, so that water is
missing and Antelope Island comes out fused to the mainland. This takes the UGRC lake
and adds the OpenStreetMap lake, but ONLY inside a lon/lat box around the island, so
the rest of the lake stays exactly the UGRC (2016) shape.

Run it in the jameson folder, after load_ugrc_lake.py:

    python3 restore_farmington.py

It needs osm_lakes/great_salt.geojson (the UGRC lake) and osm_lakes/great_salt.geojson.osm.bak
(the old OpenStreetMap lake, which load_ugrc_lake.py saved). The UGRC lake is kept as
great_salt.geojson.ugrc.bak the first time, so you can run this again with a different
--box and it always starts from the pure UGRC shape.

    --box W S E N     lon/lat box where OSM water is added (default -112.30 40.80 -111.88 41.14)
"""
import argparse, json, os, sys

import pyproj
from shapely.geometry import shape, mapping, box, Polygon, MultiPolygon
from shapely.ops import transform, unary_union
from shapely.validation import make_valid

D = "osm_lakes"
CUR = os.path.join(D, "great_salt.geojson")
UGRC = CUR + ".ugrc.bak"
OSM = CUR + ".osm.bak"
TO_AREA = pyproj.Transformer.from_crs(4326, 5070, always_xy=True).transform


def load(path):
    fc = json.load(open(path))
    return unary_union([make_valid(shape(f["geometry"])) for f in fc["features"]])


def km2(g):
    return transform(TO_AREA, g).area / 1e6


def parts(g):
    return [g] if isinstance(g, Polygon) else list(getattr(g, "geoms", []))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--box", nargs=4, type=float, default=[-112.30, 40.80, -111.88, 41.14],
                    metavar=("W", "S", "E", "N"))
    a = ap.parse_args()

    if not os.path.exists(OSM):
        sys.exit(f"Missing {OSM}. It is made by load_ugrc_lake.py when it replaces the OpenStreetMap lake.")
    if not os.path.exists(UGRC):
        if not os.path.exists(CUR):
            sys.exit(f"Missing {CUR}. Run load_ugrc_lake.py first.")
        os.replace(CUR, UGRC)
        print(f"kept the UGRC lake as {UGRC}")

    ugrc, osm = load(UGRC), load(OSM)
    area = box(*a.box)
    add = make_valid(osm).intersection(area)
    lake = make_valid(unary_union([ugrc, add]))

    print(f"UGRC lake          {km2(ugrc):8,.0f} km2")
    print(f"OSM water in box   {km2(add):8,.0f} km2   (box lon {a.box[0]}..{a.box[2]}, lat {a.box[1]}..{a.box[3]})")
    print(f"combined lake      {km2(lake):8,.0f} km2, {len(parts(lake))} piece(s), "
          f"{sum(len(p.interiors) for p in parts(lake))} island(s)/holes")

    json.dump({"type": "FeatureCollection",
               "features": [{"type": "Feature", "properties": {"name": "great_salt", "source": "UGRC 2016 + OSM inside box"},
                             "geometry": mapping(lake)}]}, open(CUR, "w"))
    print("saved", CUR)


if __name__ == "__main__":
    main()