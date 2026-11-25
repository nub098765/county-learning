#!/usr/bin/env python3
"""Remove specific stray shapes from a per-state map file (e.g. 12.v4.json).

Usage:  python3 patch_florida.py path/to/12.v4.json
Keeps a .orig backup the first time it runs. Safe to run twice.
"""
import json, re, shutil, sys, os

# (county name, (min_x, max_x, min_y, max_y)) -- a shape is removed only if it
# sits entirely inside the box, so nothing else can be hit by accident.
REMOVE = [
    ("Okeechobee", (14205, 14265,  9150,  9242)),  # thin strip along the NW shore
    ("Glades",     (13910, 13945,  9810,  9895)),  # the jagged sliver on the west side (2 pieces)
]

def rings(d):
    return re.findall(r"M[^M]*", d)

def bbox(sub):
    m = re.match(r"M(-?[\d.]+)[ ,](-?[\d.]+)", sub)
    x, y = float(m.group(1)), float(m.group(2))
    xs, ys = [x], [y]
    nums = list(map(float, re.findall(r"-?\d+\.?\d*", sub[m.end():])))
    for i in range(0, len(nums) - 1, 2):
        x += nums[i]; y += nums[i + 1]
        xs.append(x); ys.append(y)
    return min(xs), max(xs), min(ys), max(ys)

def inside(b, box):
    return b[0] >= box[0] and b[1] <= box[1] and b[2] >= box[2] and b[3] <= box[3]

path = sys.argv[1]
if not os.path.exists(path + ".orig"):
    shutil.copy(path, path + ".orig")

data = json.load(open(path))
removed = 0
for c in data["counties"]:
    for name, box in REMOVE:
        if c["name"] != name:
            continue
        keep = []
        for sub in rings(c["d"]):
            if inside(bbox(sub), box):
                removed += 1
                print("removed a shape from", name)
            else:
                keep.append(sub)
        c["d"] = "".join(keep)

json.dump(data, open(path, "w"), separators=(",", ":"))
print("done,", removed, "shape(s) removed")
