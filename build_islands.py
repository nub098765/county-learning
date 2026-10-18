#!/usr/bin/env python3
"""
build_islands.py - builds the "U.S. Minor Outlying Islands" globe map for the county game.

Run it from your game folder (the one that contains maps/ and index.html):
    python build_islands.py

The first run needs internet (OpenStreetMap for the island outlines, Natural Earth for the
gray continents). Downloads are saved in ./islands_cache/ so later runs work offline and are
instant. Delete that folder to download fresh. Standard library only, nothing to install.
"""
import json
import math
import os
import time
import urllib.parse
import urllib.request

# ---------------------------------------------------------------- settings you can tweak
KEY = "us_minor_outlying_islands"
NAME = "U.S. Minor Outlying Islands"
SVG_ID = "svg-us-minor-outlying-islands"
MAPS_DIR = "maps"
CACHE_DIR = "islands_cache"

VB = 16000                      # the map is a VB x VB square, like your other maps are 16000 wide
CX = CY = VB / 2                # globe center
R = 7200                        # globe radius
CENTER_LAT, CENTER_LON = 10.0, -135.0   # what the globe is facing (all nine islands are on the near side)
BUBBLE_R = 900                  # radius of each island bubble
GAP = 160                       # minimum space between two bubbles
DISPLAY_WIDTH = 580             # how wide the map is drawn on screen, in pixels

# id, name, latitude, longitude, search box (south, west, north, east)
ISLANDS = [
    ("wake-island",    "Wake Island",    19.295,  166.630, (19.23,  166.55, 19.37,  166.73)),
    ("midway-atoll",   "Midway Atoll",   28.205, -177.365, (28.12, -177.48, 28.30, -177.24)),
    ("johnston-atoll", "Johnston Atoll", 16.735, -169.525, (16.66, -169.62, 16.80, -169.44)),
    ("palmyra-atoll",  "Palmyra Atoll",   5.885, -162.080, ( 5.82, -162.16,  5.95, -162.00)),
    ("kingman-reef",   "Kingman Reef",    6.390, -162.410, ( 6.31, -162.50,  6.47, -162.33)),
    ("jarvis-island",  "Jarvis Island",  -0.373, -159.998, (-0.42, -160.05, -0.33, -159.95)),
    ("howland-island", "Howland Island",  0.810, -176.617, ( 0.77, -176.66,  0.85, -176.57)),
    ("baker-island",   "Baker Island",    0.194, -176.480, ( 0.15, -176.53,  0.24, -176.43)),
    ("navassa-island", "Navassa Island", 18.410,  -75.010, (18.35,  -75.07, 18.47,  -74.95)),
]

OVERPASS = ["https://overpass-api.de/api/interpreter", "https://overpass.kumi.systems/api/interpreter",
            "https://overpass.private.coffee/api/interpreter"]
LAND_URL = "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.geojson"


# ---------------------------------------------------------------- downloading (cached)
def http(url, data=None, tries=3):
    req = urllib.request.Request(url, data=data, headers={"User-Agent": "county-game-island-builder/1.0"})
    last = None
    for n in range(tries):
        try:
            with urllib.request.urlopen(req, timeout=90) as r:
                return r.read().decode("utf-8")
        except Exception as e:                      # network hiccup: wait and try again
            last = e
            time.sleep(2 * (n + 1))
    raise last


def cached(name, fetch):
    os.makedirs(CACHE_DIR, exist_ok=True)
    path = os.path.join(CACHE_DIR, name)
    if os.path.exists(path):
        with open(path, encoding="utf-8") as f:
            return json.load(f)
    data = fetch()
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f)
    return data


def fetch_overpass(bbox):
    s, w, n, e = bbox
    box = f"({s},{w},{n},{e})"
    query = ('[out:json][timeout:60];('
             f'way["natural"~"^(coastline|reef)$"]{box};'
             f'way["place"~"^(island|islet)$"]{box};'
             f'relation["place"~"^(island|islet)$"]{box};'
             ');out geom;')
    body = urllib.parse.urlencode({"data": query}).encode()
    last = None
    for url in OVERPASS:
        try:
            return json.loads(http(url, body))
        except Exception as e:
            last = e
    raise last


def fetch_reefs(bbox):
    """The reef / atoll relations: their outer rings are the reef outline, their inner rings are the islands."""
    s, w, n, e = bbox
    query = f'[out:json][timeout:90];relation({s},{w},{n},{e})["natural"~"^(reef|atoll)$"];out geom;'
    body = urllib.parse.urlencode({"data": query}).encode()
    last = None
    for attempt in range(3):
        for url in OVERPASS:
            try:
                return json.loads(http(url, body, tries=1))
            except Exception as e:
                last = e
        time.sleep(8 * (attempt + 1))
    raise last


def fetch_land():
    return json.loads(http(LAND_URL))


# ---------------------------------------------------------------- turning OSM data into rings
def polylines(osm):
    lines = []
    for el in osm.get("elements", []):
        if el.get("type") == "way" and el.get("geometry"):
            lines.append([(p["lon"], p["lat"]) for p in el["geometry"]])
        elif el.get("type") == "relation":
            for m in el.get("members", []):
                if m.get("role") == "outer" and m.get("geometry"):
                    lines.append([(p["lon"], p["lat"]) for p in m["geometry"]])
    return lines


def join_open(pieces):
    """Glue open line pieces together end to end."""
    pieces = [list(p) for p in pieces]
    out = []
    while pieces:
        cur = pieces.pop()
        grew = True
        while grew:
            grew = False
            for i, b in enumerate(pieces):
                if cur[-1] == b[0]:
                    cur = cur + b[1:]
                elif cur[-1] == b[-1]:
                    cur = cur + b[::-1][1:]
                elif cur[0] == b[-1]:
                    cur = b + cur[1:]
                elif cur[0] == b[0]:
                    cur = b[::-1] + cur[1:]
                else:
                    continue
                pieces.pop(i)
                grew = True
                break
        out.append(cur)
    return out


def signed_area(ring):
    return 0.5 * sum(x1 * y2 - x2 * y1 for (x1, y1), (x2, y2) in zip(ring, ring[1:] + ring[:1]))


def relation_lines(osm, role):
    """Line pieces from reef/atoll relation members with the given role ('outer' or 'inner')."""
    lines = []
    for el in osm.get("elements", []):
        if el.get("type") == "relation":
            for m in el.get("members", []):
                if m.get("role") == role and m.get("geometry"):
                    lines.append([(p["lon"], p["lat"]) for p in m["geometry"]])
    return lines


def build_rings(osm):
    return rings_from_lines(polylines(osm))


def rings_from_lines(lines, max_span=1.2):
    closed = [l for l in lines if len(l) > 3 and l[0] == l[-1]]
    opened = join_open([l for l in lines if not (len(l) > 3 and l[0] == l[-1])])
    rings, seen = [], set()
    for ring in closed + opened:
        if ring[0] == ring[-1]:
            ring = ring[:-1]
        if len(ring) < 3 or abs(signed_area(ring)) < 1e-11:          # a scrap or a flat line is not an outline
            continue
        xs, ys = [p[0] for p in ring], [p[1] for p in ring]
        if max(xs) - min(xs) > max_span or max(ys) - min(ys) > max_span:   # a giant outline that isn't this island
            continue
        sig = frozenset((round(x, 6), round(y, 6)) for x, y in ring)
        if sig in seen:                                             # same outline listed twice
            continue
        seen.add(sig)
        if signed_area(ring) < 0:                                   # one winding direction, so pieces merge instead of cutting holes
            ring.reverse()
        rings.append(ring)
    return rings


def placeholder_ring(lon, lat):
    return [(lon + 0.012 * math.cos(a * math.pi / 12), lat + 0.008 * math.sin(a * math.pi / 12)) for a in range(24)]


# ---------------------------------------------------------------- the globe
def project(lat, lon):
    phi, lam, phi0 = math.radians(lat), math.radians(lon - CENTER_LON), math.radians(CENTER_LAT)
    x = math.cos(phi) * math.sin(lam)
    y = math.cos(phi0) * math.sin(phi) - math.sin(phi0) * math.cos(phi) * math.cos(lam)
    c = math.sin(phi0) * math.sin(phi) + math.cos(phi0) * math.cos(phi) * math.cos(lam)   # > 0 means facing us
    return CX + R * x, CY - R * y, c


def to_limb(px, py):
    dx, dy = px - CX, py - CY
    d = math.hypot(dx, dy)
    return (CX + dx / d * R, CY + dy / d * R) if d > 1e-6 else (px, py)


def land_path(geo):
    parts = []
    for feat in geo.get("features", []):
        g = feat.get("geometry") or {}
        polys = g.get("coordinates", []) if g.get("type") == "MultiPolygon" else [g.get("coordinates", [])]
        if g.get("type") not in ("Polygon", "MultiPolygon"):
            continue
        for poly in polys:
            if not poly:
                continue
            ring = poly[0]
            if min(p[1] for p in ring) < -60:                       # Antarctica sits off the bottom edge anyway
                continue
            pts = [project(lat, lon) for lon, lat in ring]
            if all(c <= 0 for _, _, c in pts):                      # whole landmass is on the far side
                continue
            xy = [(x, y) if c > 0 else to_limb(x, y) for x, y, c in pts]
            parts.append("M" + "L".join(f"{x:.0f} {y:.0f}" for x, y in xy) + "Z")
    return "".join(parts)


def grid_path():
    parts = []

    def line(points):
        run = []
        for lat, lon in points:
            x, y, c = project(lat, lon)
            if c > 0:
                run.append((x, y))
            else:
                if len(run) > 1:
                    parts.append("M" + "L".join(f"{a:.0f} {b:.0f}" for a, b in run))
                run = []
        if len(run) > 1:
            parts.append("M" + "L".join(f"{a:.0f} {b:.0f}" for a, b in run))

    for lat in range(-60, 90, 30):
        line([(lat, lon) for lon in range(-180, 181, 3)])
    for lon in range(-180, 180, 30):
        line([(lat, lon) for lat in range(-90, 91, 3)])
    return "".join(parts)


# ---------------------------------------------------------------- bubble placement
def layout(anchors):
    """Start each bubble on its island, then push overlapping bubbles apart."""
    n = len(anchors)
    pos = [list(a) for a in anchors]
    need = 2 * BUBBLE_R + GAP
    limit = R - BUBBLE_R - 80

    def separate():
        for i in range(n):
            for j in range(i + 1, n):
                dx, dy = pos[j][0] - pos[i][0], pos[j][1] - pos[i][1]
                d = math.hypot(dx, dy)
                if d < need:
                    if d < 1e-6:
                        dx, dy, d = math.cos(i * 2.4), math.sin(i * 2.4), 1.0
                    push = (need - d) / 2
                    ux, uy = dx / d, dy / d
                    pos[i][0] -= ux * push
                    pos[i][1] -= uy * push
                    pos[j][0] += ux * push
                    pos[j][1] += uy * push

    def keep_inside(i):
        dx, dy = pos[i][0] - CX, pos[i][1] - CY
        d = math.hypot(dx, dy)
        if d > limit:
            pos[i][0], pos[i][1] = CX + dx / d * limit, CY + dy / d * limit

    steps = 1500
    for it in range(steps):
        separate()
        pull = 0.02 * (1 - it / steps)                             # gentle tug back toward each real location
        for i in range(n):
            pos[i][0] += (anchors[i][0] - pos[i][0]) * pull
            pos[i][1] += (anchors[i][1] - pos[i][1]) * pull
            keep_inside(i)
    for _ in range(400):                                           # final pass so nothing is left touching
        separate()
        for i in range(n):
            keep_inside(i)
    return pos


def make_fit(rings, bx, by):
    """Returns a function that draws any rings big enough to fill the bubble, undistorted."""
    pts_all = [p for r in rings for p in r]
    lat0 = sum(p[1] for p in pts_all) / len(pts_all)
    k = math.cos(math.radians(lat0))
    xs, ys = [p[0] * k for p in pts_all], [-p[1] for p in pts_all]
    cx, cy = (min(xs) + max(xs)) / 2, (min(ys) + max(ys)) / 2
    s = BUBBLE_R * 1.62 / max(max(xs) - min(xs), max(ys) - min(ys), 1e-9)

    def path(rs):
        return "".join("M" + "L".join(f"{bx + (x * k - cx) * s:.1f} {by + (-y - cy) * s:.1f}" for x, y in r) + "Z" for r in rs)
    return path


# ---------------------------------------------------------------- styles and output files
CSS = """/* The U.S. Minor Outlying Islands globe. Everything with an isl- class is decoration; the islands themselves use your normal .county styles. */
.isl-ocean  { fill: #cfe3ee; stroke: #8fb1c4; stroke-width: 1.5px; vector-effect: non-scaling-stroke; }
.isl-grid   { fill: none; stroke: #ffffff; stroke-opacity: 0.6; stroke-width: 0.8px; vector-effect: non-scaling-stroke; }
.isl-land   { fill: #bdb8a6; stroke: none; }
.isl-leader { fill: none; stroke: #2b4c32; stroke-width: 1.25px; vector-effect: non-scaling-stroke; }
.isl-dot    { fill: #2b4c32; }
.isl-bubble { fill: #f1f7fa; stroke: #2b4c32; stroke-width: 1.5px; vector-effect: non-scaling-stroke; }
.isl-islet  { fill: #8f9a6e; stroke: #2b4c32; stroke-width: 0.5px; vector-effect: non-scaling-stroke; }
#svg-us-minor-outlying-islands .county { stroke-width: 0.6px; }

body.dark-mode .isl-ocean  { fill: #1b2a33; stroke: #3e5a6a; }
body.dark-mode .isl-grid   { stroke: #ffffff; stroke-opacity: 0.1; }
body.dark-mode .isl-land   { fill: #35352f; }
body.dark-mode .isl-leader { stroke: #8fbf8a; }
body.dark-mode .isl-dot    { fill: #8fbf8a; }
body.dark-mode .isl-bubble { fill: #22333d; stroke: #8fbf8a; }
body.dark-mode .isl-islet  { fill: #7c8a5c; stroke: #bfe0b8; }
"""

PREVIEW = """<!doctype html>
<html><head><meta charset="utf-8"><title>Islands preview</title>
<link rel="stylesheet" href="maps/islands.css">
<style>
 body { font-family: system-ui, sans-serif; margin: 1rem; background: #f6f4ec; }
 body.dark-mode { background: #161614; color: #eee; }
 svg { display: block; width: %(w)spx; max-width: 100%%; margin: 1rem auto; }
 .county { fill: #e8e4d9; stroke: #2b4c32; stroke-width: 1.25px; vector-effect: non-scaling-stroke; cursor: pointer; }
 .county:hover { fill: #f2c94c; }
 body.dark-mode .county { fill: #4a4a42; stroke: #bfe0b8; }
 label { cursor: pointer; }
</style></head>
<body><label><input type="checkbox" onchange="document.body.classList.toggle('dark-mode', this.checked)"> dark mode</label>
%(svg)s
</body></html>
"""


def main():
    os.makedirs(MAPS_DIR, exist_ok=True)

    print("Downloading island outlines (OpenStreetMap)...")
    shapes = []          # (land rings, reef rings) for each island
    for iid, name, lat, lon, bbox in ISLANDS:
        try:
            osm = cached(f"{iid}.json", lambda b=bbox: fetch_overpass(b))
            land = build_rings(osm)
        except Exception as e:
            print(f"  {name}: download failed ({e})")
            land = []
        reef = []
        try:
            reef_osm = cached(f"{iid}_reef.json", lambda b=bbox: fetch_reefs(b))
            reef = rings_from_lines(relation_lines(reef_osm, "outer"), max_span=0.6)
            land = land + rings_from_lines(relation_lines(reef_osm, "inner"), max_span=0.6)
            land = rings_from_lines([r + [r[0]] for r in land])         # drop duplicates between the two sources
        except Exception as e:
            print(f"  {name}: couldn't get the reef outline ({e}); just try again in a few minutes")
        if not (land or reef):
            print(f"  {name}: NOTHING FOUND, drawing a placeholder blob instead. Tell Claude which island this was.")
            land = [placeholder_ring(lon, lat)]
        print(f"  {name}: {len(land)} land piece(s)" + (f", reef outline of {len(reef)} piece(s)" if reef else ", no reef outline"))
        shapes.append((land, reef))

    print("Downloading the continents (Natural Earth)...")
    try:
        land = land_path(cached("land.json", fetch_land))
    except Exception as e:
        print(f"  failed ({e}); the globe will have no continents")
        land = ""

    anchors = []
    for _, _, lat, lon, _ in ISLANDS:
        x, y, c = project(lat, lon)
        if c <= 0:
            print("WARNING: an island is on the far side of the globe. Change CENTER_LAT / CENTER_LON.")
        anchors.append((x, y))
    spots = layout(anchors)

    svg = [f'<svg id="{SVG_ID}" class="state-map" viewBox="0 0 {VB} {VB}" data-unit-scale="20" width="100%" '
           f'xmlns="http://www.w3.org/2000/svg" aria-label="Globe of the {NAME}">']
    svg.append(f'<circle class="isl-ocean" cx="{CX:.0f}" cy="{CY:.0f}" r="{R}" pointer-events="none" />')
    svg.append(f'<path class="isl-grid" d="{grid_path()}" pointer-events="none" />')
    svg.append(f'<path class="isl-land" d="{land}" pointer-events="none" />')

    for (iid, name, _, _, _), (ax, ay), (bx, by) in zip(ISLANDS, anchors, spots):
        d = math.hypot(bx - ax, by - ay)
        if d > BUBBLE_R * 0.6:                                      # bubble had to move: draw a line back to the real spot
            ex, ey = bx + (ax - bx) / d * BUBBLE_R, by + (ay - by) / d * BUBBLE_R
            svg.append(f'<path class="isl-leader" d="M{ax:.0f} {ay:.0f}L{ex:.0f} {ey:.0f}" pointer-events="none" />')
            svg.append(f'<circle class="isl-dot" cx="{ax:.0f}" cy="{ay:.0f}" r="55" pointer-events="none" />')

    for (iid, name, _, _, _), (land, reef), (bx, by) in zip(ISLANDS, shapes, spots):
        fit = make_fit(reef + land if reef else land, bx, by)
        svg.append(f'<circle class="isl-bubble" cx="{bx:.0f}" cy="{by:.0f}" r="{BUBBLE_R}" pointer-events="none" />')
        # the clickable shape: the whole reef (or the island itself when there is no reef)
        svg.append(f'<path id="{iid}" data-name="{name}" class="county" tabindex="0" role="button" aria-label="{name}" '
                   f'fill-rule="nonzero" d="{fit(reef + land)}" />')
        if reef and land:                                           # the islets sit on top of the reef, in a land color
            svg.append(f'<path class="isl-islet" d="{fit(land)}" pointer-events="none" />')
    svg.append("</svg>")
    svg = "\n".join(svg)

    with open(os.path.join(MAPS_DIR, SVG_ID + ".js"), "w", encoding="utf-8") as f:
        f.write(f'(window.__stateMaps = window.__stateMaps || {{}})["{SVG_ID}"] = {json.dumps(svg)};\n')

    entry = {"key": KEY, "name": NAME, "svgId": SVG_ID, "viewBox": f"0 0 {VB} {VB}", "scale": 20.0,
             "width": DISPLAY_WIDTH, "counties": [[i[0], i[1]] for i in ISLANDS]}
    with open(os.path.join(MAPS_DIR, "manifest-islands.js"), "w", encoding="utf-8") as f:
        f.write("(window.__stateManifest = window.__stateManifest || []).push(" + json.dumps(entry) + ");\n")

    with open(os.path.join(MAPS_DIR, "islands.css"), "w", encoding="utf-8") as f:
        f.write(CSS)

    with open("islands-preview.html", "w", encoding="utf-8") as f:
        f.write(PREVIEW % {"svg": svg, "w": DISPLAY_WIDTH})

    print("\nDone. Wrote:")
    print(f"  {MAPS_DIR}/{SVG_ID}.js")
    print(f"  {MAPS_DIR}/manifest-islands.js")
    print(f"  {MAPS_DIR}/islands.css")
    print("  islands-preview.html   <- open this in your browser to see the globe")


if __name__ == "__main__":
    main()