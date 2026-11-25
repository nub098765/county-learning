#!/usr/bin/env python3
"""
build_usmoi.py - the U.S. Minor Outlying Islands as a globe map for the game.

What it makes (from usmoi/islands.geojson, which extract_usmoi.py wrote):
  maps/svg-united-states-minor-outlying-islands.js   (+ .svg to look at)   the map the game loads
  maps/manifest.js                                    gets the state added / updated (existing entries are kept)

The map is a fixed orthographic view of the Pacific like the playtester's drawing. Each island sits in a round bubble
at its real spot (Palmyra+Kingman and Howland+Baker share a pill with two halves), blown up to fill the bubble so
every island is readable. Clicking the bubble or the island itself picks that island. Bubbles that would overlap are
pushed apart a little, and a thin line points back to the island's true position. Great Lakes water is cut out of the
continents backdrop when jameson/usmoi/great_lakes.geojson is present (or supplied with --water).

RUN (from the folder with script.js, index.html and maps/ - i.e. county-learning):
    python3 build_usmoi.py --islands jameson/usmoi/islands.geojson
  The faint continents come from the OSM land polygons (read once; takes a minute or two; saved in usmoi/backdrop.json):
    python3 build_usmoi.py --islands jameson/usmoi/islands.geojson --land jameson/land-polygons-split-4326/land_polygons.shp
  --no-land  leaves the continents out.   --preview writes usmoi_preview.html you can open to check the layout.
"""
import argparse, json, math, os, re, sys

import numpy as np
from shapely.geometry import Polygon, MultiPolygon, Point, shape, box
from shapely.ops import unary_union
from shapely.validation import make_valid
import shapely

W = 16000
CX = CY = 8000.0
R = 7650.0                       # globe radius, in map units
LON0, LAT0 = -131.0, 17.5        # the view; fitted to the playtester's drawing
BUBBLE = 0.066 * R               # bubble radius
GAP = 0.18 * BUBBLE
SMOOTH = 0                       # set from --smooth
REEF_COLOR = "#c9cabd"            # neutral light gray, like the island fills (not currentColor, which is the warm accent)
REEF_FILL = 0.07             # how strong the reef fill is (0 = invisible, 0.3 = bold)
REEF_LINE = 0.32                 # how strong the reef outline is
THIN = {"Kingman Reef"}           # islands whose real land is too thin to see at bubble scale
THIN_HALF = float(os.environ.get("THIN_HALF", 9))   # map units added around them (half thickness)
LAND_MIN_HALF = 4                # map units added around land that sits inside a reef outline (so it stays visible)

STATE_NAME = "United States Minor Outlying Islands"
KEY = "united_states_minor_outlying_islands"
SVG_ID = "svg-united-states-minor-outlying-islands"

# island name in the geojson -> (county id, name shown in the game)
NAMES = {
    "Baker Island": ("baker-island", "Baker Island"),
    "Howland Island": ("howland-island", "Howland Island"),
    "Jarvis Island": ("jarvis-island", "Jarvis Island"),
    "Johnston Atoll": ("johnston-atoll", "Johnston Atoll"),
    "Kingman Reef": ("kingman-reef", "Kingman Reef"),
    "Midway Atoll": ("midway-atoll", "Midway Atoll"),
    "Navassa Island": ("navassa-island", "Navassa Island"),
    "Palmyra Atoll": ("palmyra-atoll", "Palmyra Atoll"),
    "Wake Island": ("wake-island", "Wake Island"),
}
# pills: (north island, south island) - drawn as one capsule, north half on top
PAIRS = [("Kingman Reef", "Palmyra Atoll"), ("Howland Island", "Baker Island")]


def ortho(lon, lat):
    """lon/lat arrays -> (x, y, visible) in map units. Hidden points are pushed onto the horizon."""
    l = np.radians(np.asarray(lon, float) - LON0); p = np.radians(np.asarray(lat, float)); p0 = math.radians(LAT0)
    x = np.cos(p) * np.sin(l)
    y = math.cos(p0) * np.sin(p) - math.sin(p0) * np.cos(p) * np.cos(l)
    vis = math.sin(p0) * np.sin(p) + math.cos(p0) * np.cos(p) * np.cos(l) >= 0
    n = np.hypot(x, y)
    scale = np.where(vis, 1.0, 1.0 / np.maximum(n, 1e-9))
    return CX + R * x * scale, CY - R * y * scale, vis


def ring_path(pts):
    pts = [(int(round(x)), int(round(y))) for x, y in pts]
    out = [pts[0]]
    for q in pts[1:]:
        if q != out[-1]:
            out.append(q)
    if len(out) > 1 and out[0] == out[-1]:
        out.pop()
    if len(out) < 3:
        return ""
    return f"M{out[0][0]} {out[0][1]}l" + " ".join(f"{b[0]-a[0]} {b[1]-a[1]}" for a, b in zip(out, out[1:])) + "z"


def geom_path(g):
    parts = []
    for p in ([g] if g.geom_type == "Polygon" else list(getattr(g, "geoms", []))):
        if p.geom_type != "Polygon" or p.is_empty:
            continue
        parts.append(ring_path(p.exterior.coords))
        parts += [ring_path(r.coords) for r in p.interiors]
    return "".join(x for x in parts if x)


# ---------------------------------------------------------------- continents (faint backdrop)
def load_backdrop(land_path, cache, detail=0.05):
    if os.path.exists(cache):
        cached = json.load(open(cache))
        if cached:
            return [shape(g) for g in cached]
        print(f"{cache} is empty - ignoring it and reading the land file again")
    if not land_path:
        return None
    import geopandas as gpd
    import warnings
    warnings.filterwarnings("ignore")
    try:
        from rasterio import features as rfeat
        from rasterio.transform import from_origin
    except ImportError:
        sys.exit("This needs rasterio (pip install rasterio).")
    # The land tiles are read in small chunks and burned straight into one fine land/not-land picture
    # (a uint8 grid, about 20 MB at 0.05 degrees). No shapes are kept between chunks, so memory stays low.
    # Afterwards the picture is traced into outlines, so the coast follows the real shore instead of blocks.
    CELL = detail                                          # degrees per pixel (0.05 = about 5 km)
    nx, ny = int(round(360 / CELL)), int(round(145 / CELL))  # lon -180..180, lat -60..85 (row 0 = north)
    tf = from_origin(-180, 85, CELL, CELL)
    mask = np.zeros((ny, nx), dtype=np.uint8)
    print(f"reading the OSM land tiles in small chunks at {CELL} degree detail ...")
    STEP = 20000
    start = 0
    while True:
        try:
            d = gpd.read_file(land_path, rows=slice(start, start + STEP))
        except Exception as e:
            print(f"   stopped reading at tile {start:,}: {e}")
            break
        if len(d) == 0:
            break
        start += len(d)
        shapes_ = [(g, 1) for g in d.geometry if g is not None and not g.is_empty]
        if shapes_:
            rfeat.rasterize(shapes_, out=mask, transform=tf, all_touched=False)
        print(f"   {start:,} tiles read")
        del d, shapes_
    print(f"painted {int(mask.sum()):,} land cells; tracing the outlines ...")
    out = []
    for geom, val in rfeat.shapes(mask, mask=mask.astype(bool), transform=tf):
        p = shape(geom)
        if p.area < 0.008:                 # square degrees: keeps every Hawaiian island and the small Caribbean ones, drops specks
            continue
        t = p.simplify(CELL * 0.7)         # turns the pixel staircase into straight, natural-looking edges
        if not t.is_empty:
            out.append(t)
    if not out:
        print("!! read the land file but found no land pieces - is this the right file? (not saving a cache)")
        return None
    json.dump([shapely.geometry.mapping(g) for g in out], open(cache, "w"))
    return out


def _visible_region():
    """The hemisphere facing the viewer, drawn on a flat lon/lat sheet that is cut at the far-side meridian.
    Longitudes run from SEAM-360 to SEAM, so the region is one simple polygon (it contains the north pole)."""
    seam = ((LON0 + 180 + 180) % 360) - 180
    p0 = math.radians(LAT0)
    pts = []
    for l in range(-180, 181):
        lat = math.degrees(math.atan(-math.cos(math.radians(l)) / math.tan(p0)))   # horizon latitude at this longitude
        pts.append((LON0 + l, lat))
    pts += [(seam, 90.0), (seam - 360, 90.0)]
    return Polygon(pts).buffer(0), seam


_VIS = None


def visible_clip(g):
    """Cut land (lon/lat) down to what faces the viewer BEFORE projecting. Without this, far-side points get pushed onto the
    rim and make straight chords across the globe's edge (and make_valid grinds on them)."""
    global _VIS
    if _VIS is None:
        _VIS = _visible_region()
    vis, seam = _VIS
    out = []
    east = g.intersection(box(seam, -90, 540, 90))                      # beyond the seam: wrap it round by 360 degrees (540 = room for land joined across the date line)
    west = g.intersection(box(-180, -90, seam, 90))
    if not east.is_empty:
        out.append(shapely.transform(east, lambda c: c - np.array([360.0, 0.0])))
    if not west.is_empty:
        out.append(west)
    res = []
    for h in out:
        q = h.intersection(vis)
        if q.is_empty:
            continue
        res += [x for x in ([q] if q.geom_type == "Polygon" else list(getattr(q, "geoms", []))) if x.geom_type == "Polygon" and not x.is_empty]
    return res


def join_antimeridian(polys):
    """The land picture is cut at lon +/-180, so land that crosses it (Chukotka, Wrangel, Fiji, the Aleutians) arrives as two
    pieces that each get an outline along the cut, which shows as a straight line across the land.
    Shift the western pieces by +360 and merge them into the eastern ones so each landmass is one shape."""
    from shapely import affinity
    parts = []
    for p in polys:
        parts.extend([p] if p.geom_type == "Polygon" else list(p.geoms))
    east, west, rest = [], [], []
    for g in parts:
        x0, _, x1, _ = g.bounds
        if x1 >= 179.99 and x0 > -179.99:
            east.append(g)
        elif x0 <= -179.99 and x1 < 179.99:
            west.append(g)
        else:
            rest.append(g)
    if not east or not west:
        return parts
    snap = lambda g: shapely.set_precision(g, 1e-6)       # the two sides meet at 180.0 and -180.0+360; snap away float noise
    merged = unary_union([snap(g) for g in east] + [snap(affinity.translate(g, xoff=360.0)) for g in west])
    new_parts = [x for x in shapely.get_parts(merged) if x.geom_type == "Polygon"]
    print(f"joined {len(east)} + {len(west)} pieces across the date line into {len(new_parts)}")
    return rest + new_parts


def project_backdrop(polys, water=None):
    disc = Point(CX, CY).buffer(R, 96)
    parts = []
    water = make_valid(unary_union(water)) if water else None
    def tr(c):
        x, y, _ = ortho(c[:, 0], c[:, 1]); return np.column_stack((x, y))
    for g in join_antimeridian(polys):
        g = shapely.segmentize(g, 0.3)
        if water is not None:
            g = g.difference(water)
        for v in visible_clip(make_valid(g)):
            q = make_valid(shapely.transform(v, tr))
            q = q.intersection(disc)
            if not q.is_empty and q.area > 100:
                parts.append(q.simplify(2))
    return parts


def smooth_geom(g, n):
    """Soften jagged island outlines: simplify a little, then round the corners (Chaikin) n times."""
    if n <= 0:
        return g
    g = g.simplify(2.0 + 1.5 * n)
    def chaikin(coords):
        c = list(coords)[:-1]
        for _ in range(n):
            if len(c) < 4:
                break
            nc = []
            for a, b in zip(c, c[1:] + c[:1]):
                nc.append((0.75 * a[0] + 0.25 * b[0], 0.75 * a[1] + 0.25 * b[1]))
                nc.append((0.25 * a[0] + 0.75 * b[0], 0.25 * a[1] + 0.75 * b[1]))
            c = nc
        return c + c[:1]
    polys = []
    for p in ([g] if g.geom_type == "Polygon" else list(getattr(g, "geoms", []))):
        if p.geom_type != "Polygon" or p.is_empty:
            continue
        ext = chaikin(p.exterior.coords)
        if len(ext) < 4:
            continue
        holes = [chaikin(r.coords) for r in p.interiors if len(r.coords) >= 5]
        polys.append(make_valid(Polygon(ext, [h for h in holes if len(h) >= 4])))
    return unary_union(polys) if polys else g


# ---------------------------------------------------------------- islands
def load_islands(path):
    feats = json.load(open(path))["features"]
    out = {}
    for f in feats:
        n = f["properties"]["name"]
        if n in NAMES:
            out[n] = (f["properties"]["lon"], f["properties"]["lat"], shape(f["geometry"]))
    miss = [n for n in NAMES if n not in out]
    if miss:
        print("!! not in the geojson:", ", ".join(miss))
    return out


def magnify(geom, lat, radius, reef=None):
    """island (lon/lat) -> polygons centred on (0,0) and scaled so the whole island fits a circle of `radius` (y down).
    If a reef outline is given, the scale and centre come from the reef (land + reef together), and the reef is returned too."""
    ky = 110.57; kx = 111.32 * math.cos(math.radians(lat))
    km = lambda gg: shapely.transform(gg, lambda c: np.column_stack((c[:, 0] * kx, -c[:, 1] * ky)))
    g = km(geom)
    parts = [p for p in ([g] if g.geom_type == "Polygon" else list(g.geoms)) if not p.is_empty]
    tot = sum(p.area for p in parts)
    parts = [p for p in parts if p.area >= 0.002 * tot] or parts        # drop dust that would only be specks
    g = unary_union(parts)
    rf = km(reef) if reef is not None else None
    x0, y0, x1, y1 = (unary_union([g, rf]) if rf is not None else g).bounds
    mx, my = (x0 + x1) / 2, (y0 + y1) / 2
    half = math.hypot(x1 - x0, y1 - y0) / 2 or 1e-6
    k = radius * 0.80 / half
    sc = lambda gg: shapely.transform(gg, lambda c: np.column_stack(((c[:, 0] - mx) * k, (c[:, 1] - my) * k)))
    return sc(g), k, (sc(rf) if rf is not None else None)


def load_reefs(islands_path, names):
    """Optional reef/lagoon outlines. For each island, looks for <name_with_underscores>.geojson (e.g. kingman_reef.geojson)
    next to islands.geojson or in a reefs/ folder beside it. Only polygons are used."""
    base = os.path.dirname(islands_path) or "."
    out = {}
    for n in names:
        slug = re.sub(r"[^a-z0-9]+", "_", n.lower()).strip("_")
        for p in (os.path.join(base, slug + ".geojson"), os.path.join(base, "reefs", slug + ".geojson")):
            if not os.path.exists(p):
                continue
            polys = []
            for f in json.load(open(p))["features"]:
                g = shape(f["geometry"])
                polys += [x for x in ([g] if g.geom_type == "Polygon" else list(getattr(g, "geoms", []))) if x.geom_type == "Polygon"]
            if polys:
                out[n] = make_valid(unary_union(polys))
                print(f"reef outline for {n}: {p} ({len(polys)} polygons)")
            break
    return out


def layout(islands):
    """-> {name: (cx, cy)} bubble centres (single) ; pills are placed via their middle point."""
    units = []   # each: dict(names, true=(x,y) of the unit centre, offsets {name: (dx,dy)}, radius body circles)
    paired = {n for pr in PAIRS for n in pr}
    for n, (lon, lat, _) in islands.items():
        if n in paired:
            continue
        x, y, _v = ortho([lon], [lat])
        units.append({"names": [n], "off": {n: (0, 0)}, "true": {n: (x[0], y[0])}, "c": [x[0], y[0]]})
    for a, b in PAIRS:
        if a not in islands or b not in islands:
            continue
        xa, ya, _ = ortho([islands[a][0]], [islands[a][1]]); xb, yb, _ = ortho([islands[b][0]], [islands[b][1]])
        c = [(xa[0] + xb[0]) / 2, (ya[0] + yb[0]) / 2]
        units.append({"names": [a, b], "off": {a: (0, -BUBBLE), b: (0, BUBBLE)}, "true": {a: (xa[0], ya[0]), b: (xb[0], yb[0])}, "c": c})
    anchor = [list(u["c"]) for u in units]
    def circles(u):
        return [(u["c"][0] + dx, u["c"][1] + dy) for dx, dy in u["off"].values()]
    for _ in range(400):
        moved = False
        for i in range(len(units)):
            for j in range(i + 1, len(units)):
                for (ax, ay) in circles(units[i]):
                    for (bx, by) in circles(units[j]):
                        d = math.hypot(ax - bx, ay - by); need = 2 * BUBBLE + GAP
                        if d < need:
                            ux, uy = ((ax - bx) / d, (ay - by) / d) if d > 1e-6 else (1, 0)
                            push = (need - d) / 2 + 0.5
                            units[i]["c"][0] += ux * push; units[i]["c"][1] += uy * push
                            units[j]["c"][0] -= ux * push; units[j]["c"][1] -= uy * push
                            moved = True
        for u, a in zip(units, anchor):                   # a light pull back to the true spot
            u["c"][0] += (a[0] - u["c"][0]) * 0.02; u["c"][1] += (a[1] - u["c"][1]) * 0.02
        if not moved:
            break
    return units


def build(islands, backdrop, reefs=None):
    units = layout(islands)
    cid = lambda n: NAMES[n][0]
    out = []
    # ---- backdrop
    out.append(f'<g class="um-back" pointer-events="none" aria-hidden="true">')
    out.append(f'<circle cx="{CX:.0f}" cy="{CY:.0f}" r="{R:.0f}" fill="currentColor" fill-opacity=".06" stroke="currentColor" stroke-opacity=".35" stroke-width="30"/>')
    if backdrop:
        out.append(f'<path d="{"".join(geom_path(b) for b in backdrop)}" fill="currentColor" fill-opacity=".16" stroke="currentColor" stroke-opacity=".3" stroke-width="12" fill-rule="evenodd"/>')
    out.append("</g>")
    # ---- leaders (true position -> bubble)
    out.append('<g class="um-leaders" pointer-events="none" aria-hidden="true">')
    shapes, bubbles = [], []
    for u in units:
        for n in u["names"]:
            tx, ty = u["true"][n]
            bx, by = u["c"][0] + u["off"][n][0], u["c"][1] + u["off"][n][1]
            d = math.hypot(bx - tx, by - ty)
            out.append(f'<circle cx="{tx:.0f}" cy="{ty:.0f}" r="34" fill="currentColor" fill-opacity=".7"/>')
            if d > BUBBLE * 1.05:
                sx, sy = (tx - bx) / d, (ty - by) / d
                ex, ey = bx + sx * BUBBLE, by + sy * BUBBLE
                if len(u["names"]) == 2:       # pill: aim at the capsule edge nearest the true spot
                    ex, ey = bx + sx * BUBBLE, by + sy * BUBBLE
                out.append(f'<line x1="{tx:.0f}" y1="{ty:.0f}" x2="{ex:.0f}" y2="{ey:.0f}" stroke="currentColor" stroke-opacity=".5" stroke-width="14"/>')
    out.append("</g>")
    # ---- bubbles first (so the island shapes sit on top of them), then islands
    for u in units:
        if len(u["names"]) == 1:
            n = u["names"][0]; i, disp = NAMES[n]
            out.append(f'<circle id="x-{i}-callout" class="county va-callout" data-county-id="{i}" data-name="{disp}" tabindex="0" role="button" '
                       f'aria-label="{disp}" cx="{u["c"][0]:.0f}" cy="{u["c"][1]:.0f}" r="{BUBBLE:.0f}" />')
        else:
            a, b = u["names"]; cx, cy = u["c"]; r = BUBBLE
            top = f"M{cx - r:.0f} {cy:.0f}L{cx - r:.0f} {cy - r:.0f}A{r:.0f} {r:.0f} 0 0 1 {cx + r:.0f} {cy - r:.0f}L{cx + r:.0f} {cy:.0f}Z"
            bot = f"M{cx - r:.0f} {cy:.0f}L{cx - r:.0f} {cy + r:.0f}A{r:.0f} {r:.0f} 0 0 0 {cx + r:.0f} {cy + r:.0f}L{cx + r:.0f} {cy:.0f}Z"
            for n, d in ((a, top), (b, bot)):
                i, disp = NAMES[n]
                out.append(f'<path id="x-{i}-callout" class="county va-callout" data-county-id="{i}" data-name="{disp}" tabindex="0" role="button" aria-label="{disp}" d="{d}" />')
    reefs = reefs or {}
    items = []
    for u in units:
        for n in u["names"]:
            i, disp = NAMES[n]
            lon, lat, geom = islands[n]
            g, k, rf = magnify(geom, lat, BUBBLE, reefs.get(n))
            ox, oy = u["c"][0] + u["off"][n][0], u["c"][1] + u["off"][n][1]
            mv = lambda gg, ox=ox, oy=oy: shapely.transform(gg, lambda c: c + np.array([ox, oy]))
            items.append((n, i, disp, mv(g), mv(rf) if rf is not None else None))
    # reef outlines: faint, not clickable, above the bubbles and below the land
    for n, i, disp, g, rf in items:
        if rf is None:
            continue
        rf = smooth_geom(rf, SMOOTH) if SMOOTH else rf.simplify(1.5)
        out.append(f'<path class="um-reef" data-for="{i}" pointer-events="none" aria-hidden="true" fill="{REEF_COLOR}" fill-opacity="{REEF_FILL}" '
                   f'stroke="{REEF_COLOR}" stroke-opacity="{REEF_LINE}" stroke-width="3" fill-rule="evenodd" d="{geom_path(make_valid(rf))}" />')
    for n, i, disp, g, rf in items:
        if rf is not None:
            # next to a whole reef the real land is a pinprick, so give it a minimum drawn thickness
            g = make_valid(g).buffer(LAND_MIN_HALF, join_style="mitre", mitre_limit=2.0)   # fatter, but still the same angular shape
            g = g.simplify(0.3)
        elif n in THIN:
            # Kingman is three pinprick slivers of land: give them a minimum drawn thickness with rounded ends so they read as islands
            g = make_valid(g).buffer(THIN_HALF, quad_segs=6).simplify(0.4)
        else:
            g = smooth_geom(g, SMOOTH) if SMOOTH else g.simplify(2.0)
        d = geom_path(make_valid(g))
        out.append(f'<path id="{i}" data-name="{disp}" class="county" tabindex="0" role="button" aria-label="{disp}" fill-rule="evenodd" d="{d}" />')
    return "\n".join(out), units


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--islands", default="jameson/usmoi/islands.geojson")
    ap.add_argument("--land", help="land_polygons.shp (or land.gpkg) for the faint continents")
    ap.add_argument("--water", help="GeoJSON water polygons to cut out of the land backdrop")
    ap.add_argument("--no-land", action="store_true")
    ap.add_argument("--reefs", action="store_true", help="draw reef outlines from files like jameson/usmoi/kingman_reef.geojson (off by default: playtesters preferred just the islands)")
    ap.add_argument("--detail", type=float, default=0.05, help="backdrop detail in degrees per pixel (smaller = finer; 0.05 default)")
    ap.add_argument("--smooth", type=int, default=0, help="soften island outlines: 0 = off, 2 = gentle")
    ap.add_argument("--out", default="maps")
    ap.add_argument("--preview", action="store_true")
    a = ap.parse_args()
    global SMOOTH
    SMOOTH = a.smooth
    if not os.path.exists(a.islands):
        sys.exit(f"Can't find {a.islands} - run extract_usmoi.py in jameson first.")
    islands = load_islands(a.islands)
    cache = os.path.join(os.path.dirname(a.islands) or ".", "backdrop.json")
    backdrop = None
    if not a.no_land:
        polys = load_backdrop(a.land, cache, a.detail)
        if polys:
            water_path = a.water or os.path.join(os.path.dirname(a.islands), "great_lakes.geojson")
            if a.water and not os.path.exists(water_path):
                sys.exit(f"Can't find water file: {water_path}")
            water = None
            if os.path.exists(water_path):
                water = [shape(f["geometry"]) for f in json.load(open(water_path))["features"]]
                print(f"cutting {len(water)} water polygons from backdrop")
            backdrop = project_backdrop(polys, water)
            print(f"backdrop: {len(backdrop)} land pieces")
        else:
            print("no land file given and no usmoi/backdrop.json yet - drawing the globe without continents (pass --land to add them)")
    reefs = load_reefs(a.islands, islands.keys()) if a.reefs else {}
    body, units = build(islands, backdrop, reefs)
    vb = f"0 0 {W} {W}"
    svg = (f'<svg id="{SVG_ID}" class="state-map" viewBox="{vb}" data-unit-scale="20" width="100%" xmlns="http://www.w3.org/2000/svg" '
           f'aria-label="Map of the {STATE_NAME}">\n{body}\n</svg>')
    os.makedirs(a.out, exist_ok=True)
    open(os.path.join(a.out, SVG_ID + ".svg"), "w", encoding="utf-8").write(svg)
    open(os.path.join(a.out, SVG_ID + ".js"), "w", encoding="utf-8").write(
        f'(window.__stateMaps = window.__stateMaps || {{}})[{json.dumps(SVG_ID)}] = {json.dumps(svg)};\n')
    # manifest
    mpath = os.path.join(a.out, "manifest.js")
    lst = []
    if os.path.exists(mpath):
        t = open(mpath, encoding="utf-8").read()
        lst = [m for m in json.loads(t[t.index("["):t.rindex("]") + 1]) if m["key"] != KEY]
    lst.append({"key": KEY, "name": STATE_NAME, "svgId": SVG_ID, "viewBox": vb, "scale": 20.0,
                "counties": sorted([[i, d] for i, d in NAMES.values()], key=lambda c: c[1])})
    lst.sort(key=lambda m: m["name"])
    open(mpath, "w", encoding="utf-8").write("window.__stateManifest = " + json.dumps(lst, separators=(",", ":")) + ";\n")
    print(f"wrote {a.out}/{SVG_ID}.js and updated {mpath} ({len(lst)} state(s) in it)")
    for u in units:
        for n in u["names"]:
            tx, ty = u["true"][n]; bx, by = u["c"][0] + u["off"][n][0], u["c"][1] + u["off"][n][1]
            print(f"   {n:<16} bubble moved {math.hypot(bx - tx, by - ty) / R * 100:4.1f}% of the globe radius from its true spot")
    if a.preview:
        open("usmoi_preview.html", "w", encoding="utf-8").write(
            f'<!doctype html><meta charset="utf-8"><body style="margin:0;background:#fff;color:#223"><style>.county{{fill:#f4efe2;stroke:#333;stroke-width:14}}'
            f'.va-callout{{fill:#fff;stroke:#b5651d;stroke-width:26}}.county:hover{{fill:#9fd}}</style><div style="width:min(96vw,96vh);margin:auto">{svg}</div>')
        print("wrote usmoi_preview.html")


if __name__ == "__main__":
    main()