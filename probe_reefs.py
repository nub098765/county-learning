import json, os, time, urllib.parse, urllib.request

ATOLLS = {
    "wake-island":    (19.23, 166.55, 19.37, 166.73),
    "midway-atoll":   (28.12, -177.48, 28.30, -177.24),
    "johnston-atoll": (16.66, -169.62, 16.80, -169.44),
    "palmyra-atoll":  (5.82, -162.16, 5.95, -162.00),
    "kingman-reef":   (6.31, -162.50, 6.47, -162.33),
}
OVERPASS = ["https://overpass-api.de/api/interpreter", "https://overpass.kumi.systems/api/interpreter"]
NE_REEFS = "https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_reefs.geojson"
os.makedirs("islands_cache", exist_ok=True)


def http(url, data=None):
    req = urllib.request.Request(url, data=data, headers={"User-Agent": "county-game-island-builder/1.0"})
    last = None
    for n in range(3):
        try:
            with urllib.request.urlopen(req, timeout=90) as r:
                return r.read().decode("utf-8")
        except Exception as e:
            last = e
            time.sleep(2 * (n + 1))
    raise last


def points(el):
    if el.get("geometry"):
        return [(p["lon"], p["lat"]) for p in el["geometry"]]
    pts = []
    for m in el.get("members", []):
        pts += [(p["lon"], p["lat"]) for p in m.get("geometry", [])]
    return pts


print("PART 1: everything OpenStreetMap has in each box, except the plain islet coastlines we already know about\n")
for name, (s, w, n, e) in ATOLLS.items():
    print(f"== {name} ==")
    query = f"[out:json][timeout:90];nwr({s},{w},{n},{e});out tags geom;"
    data = None
    for url in OVERPASS:
        try:
            data = json.loads(http(url, urllib.parse.urlencode({"data": query}).encode()))
            break
        except Exception as ex:
            print("  (server failed:", ex, ")")
    if data is None:
        continue
    with open(f"islands_cache/probe_{name}.json", "w", encoding="utf-8") as f:
        json.dump(data, f)
    shown = 0
    for el in data.get("elements", []):
        tags = el.get("tags", {})
        if el["type"] == "node" and not tags:
            continue
        if tags.get("natural") == "coastline" and set(tags) <= {"natural", "place", "name"}:
            continue
        pts = points(el)
        size = ""
        if pts:
            xs, ys = [p[0] for p in pts], [p[1] for p in pts]
            size = f", {(max(xs) - min(xs)) * 111:.1f} x {(max(ys) - min(ys)) * 111:.1f} km, {len(pts)} pts"
        keep = {k: v for k, v in tags.items() if k in ("name", "natural", "place", "water", "landuse", "boundary", "leisure", "reef", "seamark:type", "protect_class")}
        print(f"  {el['type']} {el['id']}{size} {keep}")
        shown += 1
    if not shown:
        print("  (nothing else there)")

print("\nPART 2: Natural Earth reefs near each atoll\n")
try:
    reefs = json.loads(http(NE_REEFS))

    def flat(c):
        if c and isinstance(c[0], (int, float)):
            yield c
        else:
            for x in c:
                yield from flat(x)

    for name, (s, w, n, e) in ATOLLS.items():
        hits = []
        for f in reefs["features"]:
            coords = list(flat(f["geometry"]["coordinates"]))
            if any(w - 0.5 <= x <= e + 0.5 and s - 0.5 <= y <= n + 0.5 for x, y in coords):
                hits.append((f.get("properties", {}), f["geometry"]["type"], len(coords)))
        print(f"== {name} ==")
        for props, kind, count in hits:
            print(f"  {kind}, {count} pts, {props}")
        if not hits:
            print("  (none)")
except Exception as ex:
    print("couldn't get the Natural Earth reefs:", ex)