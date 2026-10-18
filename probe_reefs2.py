import json, time, urllib.parse, urllib.request

ATOLLS = {
    "wake-island":    (19.23, 166.55, 19.37, 166.73),
    "midway-atoll":   (28.12, -177.48, 28.30, -177.24),
    "johnston-atoll": (16.66, -169.62, 16.80, -169.44),
    "palmyra-atoll":  (5.82, -162.16, 5.95, -162.00),
    "kingman-reef":   (6.31, -162.50, 6.47, -162.33),
}
SERVERS = ["https://overpass-api.de/api/interpreter",
           "https://overpass.kumi.systems/api/interpreter",
           "https://overpass.private.coffee/api/interpreter"]


def ask(query):
    body = urllib.parse.urlencode({"data": query}).encode()
    for attempt in range(4):
        for url in SERVERS:
            try:
                req = urllib.request.Request(url, body, headers={"User-Agent": "county-game-island-builder/1.0"})
                with urllib.request.urlopen(req, timeout=120) as r:
                    return json.loads(r.read().decode("utf-8"))
            except Exception as ex:
                print(f"  (server problem: {ex}; trying again)")
        time.sleep(8 * (attempt + 1))
    return None


def size(geometry):
    xs = [p["lon"] for p in geometry]
    ys = [p["lat"] for p in geometry]
    return f"{(max(xs) - min(xs)) * 111:.1f} x {(max(ys) - min(ys)) * 111:.1f} km"


for name, (s, w, n, e) in ATOLLS.items():
    print(f"\n== {name} ==")
    box = f"({s},{w},{n},{e})"
    data = ask('[out:json][timeout:90];('
               f'relation{box}["natural"~"^(reef|atoll|water|shoal|bay)$"];'
               f'way{box}["natural"~"^(reef|atoll|water|shoal)$"];'
               ');out geom;')
    if data is None:
        print("  could not get data after several tries; try again in a few minutes")
        continue
    for el in data.get("elements", []):
        tags = {k: v for k, v in el.get("tags", {}).items() if k in ("name", "natural", "water", "reef", "place")}
        if el["type"] == "way" and el.get("geometry"):
            print(f"  way {el['id']}: {size(el['geometry'])}, {len(el['geometry'])} pts {tags}")
        elif el["type"] == "relation":
            print(f"  relation {el['id']} {tags}")
            for m in el.get("members", []):
                g = m.get("geometry")
                print(f"      member {m.get('type')} {m.get('ref')} role={m.get('role') or '-'}"
                      + (f": {size(g)}, {len(g)} pts" if g else ""))