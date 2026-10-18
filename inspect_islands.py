import glob, json, os

for path in sorted(glob.glob(os.path.join("islands_cache", "*.json"))):
    name = os.path.basename(path)
    if name == "land.json":
        continue
    with open(path, encoding="utf-8") as f:
        data = json.load(f)
    print(f"\n== {name[:-5]} ==")
    for el in data.get("elements", []):
        tags = el.get("tags", {})
        shown = {k: v for k, v in tags.items() if k in ("natural", "place", "name", "landuse", "water")}
        if el["type"] == "way":
            g = el.get("geometry", [])
            xs = [p["lon"] for p in g]
            ys = [p["lat"] for p in g]
            closed = len(g) > 3 and g[0] == g[-1]
            size = f"{(max(xs) - min(xs)) * 111:.1f} x {(max(ys) - min(ys)) * 111:.1f} km" if g else "?"
            print(f"  way {el['id']}: {len(g)} pts, {'closed' if closed else 'open'}, {size}, {shown}")
        elif el["type"] == "relation":
            roles = {}
            for m in el.get("members", []):
                roles[m.get("role", "")] = roles.get(m.get("role", ""), 0) + 1
            print(f"  relation {el['id']}: members {roles}, {shown}")