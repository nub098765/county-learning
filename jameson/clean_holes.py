#!/usr/bin/env python3
"""
clean_holes.py - remove the stray see-through dots from the finished county shapes (no re-download needed).

WHY THE DOTS EXIST
  build_maps_hires.py simplifies each county and rounds it to whole numbers. That squeezes thin inlets shut and
  leaves little self-crossing loops in the outline. Drawn with the even-odd fill rule, a loop inside a county shows
  up as a tiny hole (a "dot"), invisible at normal size but obvious once you zoom in. 34-55% of the outlines in
  Florida / Wisconsin / Ohio had this. The 25 km2 water filter can't see them: it runs BEFORE they are created.

WHAT THIS DOES (per county)
  1. repairs every outline (make_valid), keeping the even-odd meaning of the original path
  2. snaps it to the whole-number grid the site uses
  3. fills in every hole smaller than --min-hole-px (a hole that is that many pixels across when the map is
     shown 1000px wide; default 10, roughly "under ~25 km2"). Big lakes (Okeechobee, Winnebago...) are much
     larger than that and stay cut out. Islands are never touched.
  A hole is also left alone if a NEIGHBOURING county really occupies that spot (a true enclave).

RUN
  python clean_holes.py                       # every map-data/hires/*.v4.json; originals saved in map-data/hires/before-clean/
  python clean_holes.py 12_v4.json 55_v4.json --out-dir cleaned      # specific files, written to another folder
  python clean_holes.py map-data/counties-hires.json                 # the combined file works too
  then:  python build_maps_hires.py   (it reuses the cache, so this takes seconds)   ->   python split_maps.py
"""
import argparse, glob, json, math, os, shutil, sys
import numpy as np
import shapely
from shapely.geometry import Polygon, MultiPolygon
from shapely.ops import unary_union
from shapely.strtree import STRtree
import re


def parse_rings(d):
    out = []
    for m in re.finditer(r"M(-?\d+) (-?\d+)l([^z]*)z", d):
        x, y = int(m.group(1)), int(m.group(2)); pts = [(x, y)]; n = [int(v) for v in m.group(3).split()]
        for i in range(0, len(n) - 1, 2):
            x += n[i]; y += n[i + 1]; pts.append((x, y))
        out.append(pts)
    return out


def polys_only(g):
    """The polygon parts of any geometry (make_valid can return lines/points too)."""
    if g is None or g.is_empty:
        return Polygon()
    parts = [p for p in shapely.get_parts(g) if p.geom_type == "Polygon" and not p.is_empty] if g.geom_type != "Polygon" else [g]
    if g.geom_type == "GeometryCollection":
        parts = [p for q in shapely.get_parts(g) for p in (shapely.get_parts(q) if q.geom_type == "MultiPolygon" else [q]) if p.geom_type == "Polygon"]
    return unary_union(parts) if parts else Polygon()


def county_geom(d):
    """The outline the browser draws for this path under the even-odd rule.
    Each ring is repaired first (make_valid keeps loops' even-odd meaning); then rings are combined by how deeply
    they are nested: outer land minus lakes, plus islands inside lakes, minus ponds on those islands, and so on."""
    ps = []
    for r in parse_rings(d):
        if len(r) < 3:
            continue
        p = polys_only(shapely.make_valid(Polygon(r)))
        if not p.is_empty and p.area > 0:
            ps.append(p)
    if not ps:
        return Polygon()
    tree = STRtree(ps)
    levels = {}
    for i, p in enumerate(ps):
        # nesting depth = how many other rings completely enclose this one (a whole-ring test: a single point can
        # fall inside a lake that the outer ring surrounds and give the wrong answer)
        depth = sum(1 for j in tree.query(p) if j != i and ps[j].area > p.area and ps[j].covers(p))
        levels.setdefault(depth, []).append(p)
    g = unary_union(levels.get(0, []))
    for lv in sorted(k for k in levels if k > 0):
        layer = unary_union(levels[lv])
        g = g.difference(layer) if lv % 2 else g.union(layer)
    return polys_only(g)


def plist(g):
    return [] if g is None or g.is_empty else (list(g.geoms) if g.geom_type == "MultiPolygon" else [g])


def ring_path(pts):
    pts = [(int(round(x)), int(round(y))) for x, y in pts]
    out = [pts[0]]
    for p in pts[1:]:
        if p != out[-1]:
            out.append(p)
    if len(out) > 1 and out[0] == out[-1]:
        out.pop()
    if len(out) < 3:
        return ""
    return f"M{out[0][0]} {out[0][1]}l" + " ".join(f"{b[0]-a[0]} {b[1]-a[1]}" for a, b in zip(out, out[1:])) + "z"


def geom_path(g):
    parts = []
    for p in plist(g):
        parts.append(ring_path(p.exterior.coords))
        parts += [ring_path(r.coords) for r in p.interiors]
    return "".join(x for x in parts if x)


def clean_state(st, min_px, name=""):
    width = float(st["viewBox"].split()[2])
    min_area = math.pi / 4 * (min_px * width / 1000.0) ** 2
    counties = st["counties"]
    before = [county_geom(c["d"]) for c in counties]
    snapped = [polys_only(shapely.set_precision(g, 1.0)) if not g.is_empty else g for g in before]
    for g in snapped:
        if not g.is_empty:
            shapely.prepare(g)
    tree = STRtree(snapped)
    filled = kept_enclave = holes_before = 0
    result = []
    for i, g in enumerate(snapped):
        if g.is_empty:
            result.append(g); continue
        new, changed = [], False
        for p in plist(g):
            holes_before += len(p.interiors)
            keep = []
            for r in p.interiors:
                h = Polygon(r)
                if h.area >= min_area:
                    keep.append(r); continue
                c = h.representative_point()
                if any(j != i and snapped[j].contains(c) for j in tree.query(c)):
                    keep.append(r); kept_enclave += 1; continue
                filled += 1; changed = True
            new.append(Polygon(p.exterior, keep) if len(keep) != len(p.interiors) else p)
        result.append(polys_only(unary_union(new)) if changed else g)   # union absorbs an islet that sat in a filled hole
    # report
    worst = 0.0
    for b, a in zip(before, result):
        if not b.is_empty and b.area > 0:
            worst = max(worst, abs(a.area - b.area) / b.area)
    bad_before = sum(1 for c in counties for r in parse_rings(c["d"]) if not Polygon(r).is_valid)
    new_counties = []
    for c, g in zip(counties, result):
        d = geom_path(g)
        new_counties.append({**c, "d": d})
    bad_after = sum(1 for c in new_counties for r in parse_rings(c["d"]) if not Polygon(r).is_valid)
    holes_after = sum(len(p.interiors) for g in result for p in plist(g))
    kb0, kb1 = sum(len(c["d"]) for c in counties) // 1000, sum(len(c["d"]) for c in new_counties) // 1000
    print(f"  {name}: self-crossing outlines {bad_before} -> {bad_after} | holes {holes_before} -> {holes_after} "
          f"(filled {filled}, kept {holes_after - 0} incl. {kept_enclave} true enclaves) | biggest area change in any county {worst*100:.3f}% | {kb0} KB -> {kb1} KB")
    empties = [c["name"] for c, g in zip(counties, result) if c["d"] and not g.is_empty is True and False]
    return {**st, "counties": new_counties}


def main():
    ap = argparse.ArgumentParser(description="Remove stray see-through dots from finished county shapes.")
    ap.add_argument("files", nargs="*", help="state json files (default: map-data/hires/*.v4.json)")
    ap.add_argument("--min-hole-px", type=float, default=10.0, help="fill holes smaller than this many pixels across at 1000px wide (default 10; 0 = only repair)")
    ap.add_argument("--out-dir", help="write cleaned files here instead of replacing the originals")
    a = ap.parse_args()
    files = a.files or sorted(glob.glob(os.path.join("map-data", "hires", "*.v4.json")))
    if not files:
        sys.exit("No files found. Give file names, or run from the folder that has map-data/hires/*.v4.json")
    for f in files:
        data = json.load(open(f, encoding="utf-8"))
        print(f"{f}:")
        if "counties" in data:
            out = clean_state(data, a.min_hole_px, os.path.basename(f))
        else:
            out = {fips: clean_state(st, a.min_hole_px, fips) for fips, st in data.items()}
        if a.out_dir:
            os.makedirs(a.out_dir, exist_ok=True); dest = os.path.join(a.out_dir, os.path.basename(f))
        else:
            bdir = os.path.join(os.path.dirname(f) or ".", "before-clean"); os.makedirs(bdir, exist_ok=True)
            dest = f
            if not os.path.exists(os.path.join(bdir, os.path.basename(f))):
                shutil.copy2(f, os.path.join(bdir, os.path.basename(f)))
        with open(dest, "w", encoding="utf-8") as fh:
            json.dump(out, fh, separators=(",", ":"))
        print(f"  -> {dest}")


if __name__ == "__main__":
    main()
