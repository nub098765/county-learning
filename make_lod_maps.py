#!/usr/bin/env python3
"""
make_lod_maps.py - make a light "twin" of every state map file so the game loads and draws fast.

For each  maps/svg-xxx.js  (the full-detail map the game already uses) this writes
          maps/svg-xxx.lo.js  (the same counties, same ids, simplified).

The light version is meant to be used while a map is shown SMALL, and the full file whenever it is
shown large or zoomed, so nothing visible is lost: the light version stays within --tolerance-px
screen pixels of the full one when the map is --ref-px wide (default 0.15 px at 700 px).
The full-detail files are never touched; only new *.lo.js files are written.

THIS VERSION understands every path format the maps use:
    M x y l dx dy ...        plain relative lines
    M x y h dx v dy l ...    the compact form (h = horizontal, v = vertical, "-" can follow a number)
    M x yL x y ... Z         absolute lines (the old 800-wide maps)
(An earlier version of this script only understood the first one and scrambled the compact form.)
Because of that it also CHECKS its own work: every simplified outline is compared with the original
(bounding box, size, direction). An outline that doesn't pass is left at full detail and counted in
the "kept full" column. Anything other than straight lines (curves) is left untouched.

RUN (from your site folder, the one that contains maps/):
    python make_lod_maps.py
    python make_lod_maps.py --maps maps --tolerance-px 0.15 --ref-px 700
    python make_lod_maps.py --only svg-delaware          # just one map, to try it out

No extra packages needed (plain Python 3). Re-run it any time you change a map file.
"""
import argparse, glob, json, os, re, sys

TOKEN = re.compile(r"[A-Za-z]|-?(?:\d+\.?\d*|\.\d+)")
STRAIGHT = set("MmLlHhVvZz")


# ---------- geometry ----------
def _dp(pts, tol):
    """Douglas-Peucker on an open polyline; always keeps both ends."""
    n = len(pts)
    if n < 3:
        return pts
    keep = [False] * n
    keep[0] = keep[-1] = True
    stack = [(0, n - 1)]
    while stack:
        a, b = stack.pop()
        x1, y1 = pts[a]
        x2, y2 = pts[b]
        dx, dy = x2 - x1, y2 - y1
        L2 = dx * dx + dy * dy
        L = L2 ** 0.5 or 1e-9
        mx, mi = -1.0, a
        for i in range(a + 1, b):
            px, py = pts[i]
            t = ((px - x1) * dx + (py - y1) * dy) / L2 if L2 else 0.0
            if t <= 0:
                d = ((px - x1) ** 2 + (py - y1) ** 2) ** 0.5          # nearest point is the start
            elif t >= 1:
                d = ((px - x2) ** 2 + (py - y2) ** 2) ** 0.5          # nearest point is the end
            else:
                d = abs(dy * (px - x1) - dx * (py - y1)) / L          # nearest point is on the segment
            if d > mx:
                mx, mi = d, i
        if mx > tol:
            keep[mi] = True
            stack.append((a, mi))
            stack.append((mi, b))
    return [p for p, k in zip(pts, keep) if k]


def simplify_ring(pts, tol):
    """Simplify a closed ring (no repeated closing point). Always keeps at least 3 points."""
    if len(pts) <= 4:
        return pts
    m = max(range(len(pts)), key=lambda i: (pts[i][0] - pts[0][0]) ** 2 + (pts[i][1] - pts[0][1]) ** 2)
    out = _dp(pts[: m + 1], tol)[:-1] + _dp(pts[m:] + [pts[0]], tol)[:-1]
    if len(out) < 3:  # a tiny island: keep a little triangle so it still shows as a dot
        far = max(range(len(pts)), key=lambda i: (pts[i][0] - pts[m][0]) ** 2 + (pts[i][1] - pts[m][1]) ** 2)
        out = [pts[0], pts[m], pts[far]]
    return out


def area2(pts):
    return sum(a[0] * b[1] - b[0] * a[1] for a, b in zip(pts, pts[1:] + pts[:1]))


def looks_right(old, new, tol):
    """Safety net: the simplified ring must still be the same shape (bbox, size, direction)."""
    if len(old) < 8:
        return True
    ox, oy = [p[0] for p in old], [p[1] for p in old]
    nx, ny = [p[0] for p in new], [p[1] for p in new]
    slack = tol * 1.5 + 1
    if (abs(min(ox) - min(nx)) > slack or abs(max(ox) - max(nx)) > slack
            or abs(min(oy) - min(ny)) > slack or abs(max(oy) - max(ny)) > slack):
        return False
    a0, a1 = area2(old), area2(new)
    if abs(a0) > 2 * (20 * tol) ** 2:                      # skip the size test for specks
        if (a0 > 0) != (a1 > 0) or abs(a1 - a0) > 0.05 * abs(a0):
            return False
    return True


# ---------- path text <-> rings ----------
def parse_d(d):
    """-> (rings, all_ints) with absolute points, or None if the path has anything but straight lines."""
    toks = TOKEN.findall(d)
    rings, cur = [], []
    x = y = sx = sy = 0.0
    i, cmd = 0, None
    ints = "." not in d
    n = len(toks)

    def num(k):
        t = toks[k] if k < n else ""
        if not t or t[0].isalpha():
            raise ValueError
        return float(t)

    try:
        while i < n:
            t = toks[i]
            if t[0].isalpha():
                if t not in STRAIGHT:
                    return None
                cmd = t
                i += 1
                if cmd in "Zz":
                    if cur:
                        rings.append(cur)
                        cur = []
                    x, y = sx, sy
                    continue
                if i >= n or toks[i][0].isalpha():
                    continue
            elif cmd is None:
                return None
            rel, C = cmd.islower(), cmd.upper()
            if C == "M":
                nx, ny = num(i), num(i + 1)
                i += 2
                if rel:
                    nx, ny = nx + x, ny + y
                if cur:
                    rings.append(cur)
                cur = [(nx, ny)]
                x, y = sx, sy = nx, ny
                cmd = "l" if rel else "L"                 # more pairs after M are line-tos
                continue
            if C == "L":
                nx, ny = num(i), num(i + 1)
                i += 2
                if rel:
                    nx, ny = nx + x, ny + y
            elif C == "H":
                nx, ny = num(i), y
                i += 1
                if rel:
                    nx = x + nx
            else:  # "V"
                nx, ny = x, num(i)
                i += 1
                if rel:
                    ny = y + ny
            cur.append((nx, ny))
            x, y = nx, ny
    except ValueError:
        return None
    if cur:
        rings.append(cur)
    out = []
    for r in rings:
        if len(r) > 1 and r[0] == r[-1]:
            r = r[:-1]
        out.append(r)
    if ints:
        out = [[(int(round(px)), int(round(py))) for px, py in r] for r in out]
    return out, ints


def _join(nums):
    s = str(nums[0])
    for v in nums[1:]:
        s += str(v) if v < 0 else " " + str(v)             # a "-" already separates numbers
    return s


def emit_d(rings, ints):
    out = []
    for pts in rings:
        if len(pts) < 3:
            continue
        if ints:
            ded = [pts[0]]
            for p in pts[1:]:
                if p != ded[-1]:
                    ded.append(p)
            if len(ded) < 3:
                continue
            cmds = []
            for a, b in zip(ded, ded[1:]):                 # the closing step is implied by z
                dx, dy = b[0] - a[0], b[1] - a[1]
                c, args = ("v", [dy]) if dx == 0 else (("h", [dx]) if dy == 0 else ("l", [dx, dy]))
                if cmds and cmds[-1][0] == c:
                    cmds[-1][1].extend(args)
                else:
                    cmds.append([c, list(args)])
            out.append(f"M{ded[0][0]} {ded[0][1]}" + "".join(c + _join(a) for c, a in cmds) + "z")
        else:
            out.append("M" + "L".join(f"{px:.1f} {py:.1f}" for px, py in pts) + "Z")
    return "".join(out)


def simplify_d(d, tol, stats):
    parsed = parse_d(d)
    if parsed is None:
        stats["untouched"] += 1
        return d
    rings, ints = parsed
    new = []
    for r in rings:
        s = simplify_ring(r, tol)
        stats["before"] += len(r)
        if len(set(s)) < 3:
            stats["specks"] += 1                      # a speck too small to simplify: kept exactly as it is
            stats["after"] += len(r)
            new.append(r)
        elif looks_right(r, s, tol):
            stats["after"] += len(s)
            new.append(s)
        else:
            stats["kept_full"] += 1                   # failed the safety check: kept at full detail
            stats["after"] += len(r)
            new.append(r)
    return emit_d(new, ints)


# ---------- files ----------
# Matches both:  window.__stateMaps["svg-xxx"] = "...";   and   (window.__stateMaps = window.__stateMaps || {})["svg-xxx"] = "...";
FILE_RE = re.compile(r'\[("(?:[^"\\]|\\.)*")\]\s*=\s*("(?:[^"\\]|\\.)*");', re.S)


def units_per_800(svg):
    """viewBox width / 800: the map's coordinate scale (16000-wide maps -> 20)."""
    vb = re.search(r'viewBox="\s*(-?[\d.]+)[ ,]+(-?[\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)', svg)
    if vb:
        return float(vb.group(3)) / 800.0
    sc = re.search(r'data-unit-scale="([\d.]+)"', svg)
    return float(sc.group(1)) if sc else 1.0


def process_file(path, tol_px, ref_px):
    base = os.path.basename(path)
    if "manifest" in base.lower():
        print(f"  skipped {base}: manifest file")
        return None
    text = open(path, encoding="utf-8").read()
    m = FILE_RE.search(text)
    if not m:
        print(f"  skipped {base}: not in the expected format")
        return None
    map_id = json.loads(m.group(1))
    svg = json.loads(m.group(2))
    tol = 800.0 * units_per_800(svg) * (tol_px / ref_px)
    stats = {"before": 0, "after": 0, "kept_full": 0, "untouched": 0, "specks": 0}

    def fix(tag):
        dm = re.search(r'\sd="([^"]*)"', tag.group(0))
        if not dm:
            return tag.group(0)
        nd = simplify_d(dm.group(1), tol, stats)
        return tag.group(0)[: dm.start(1)] + nd + tag.group(0)[dm.end(1):]

    lo_svg = re.sub(r"<path\b[^>]*>", fix, svg)
    out = path[:-3] + ".lo.js"
    with open(out, "w", encoding="utf-8", newline="\n") as f:
        f.write("window.__stateMaps = window.__stateMaps || {};\n")
        f.write(f"window.__stateMaps[{json.dumps(map_id + '.lo')}] = {json.dumps(lo_svg)};\n")
    return out, os.path.getsize(path), os.path.getsize(out), stats


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--maps", default="maps")
    ap.add_argument("--tolerance-px", type=float, default=0.15, help="allowed error in screen pixels at --ref-px (default 0.15)")
    ap.add_argument("--ref-px", type=float, default=700, help="map width the tolerance refers to (default 700)")
    ap.add_argument("--only", help="only this map, e.g. svg-delaware")
    a = ap.parse_args()
    files = sorted(f for f in glob.glob(os.path.join(a.maps, "*.js")) if not f.endswith(".lo.js"))
    if a.only:
        files = [f for f in files if os.path.basename(f)[:-3] == a.only]
    if not files:
        sys.exit(f"No map files found in {a.maps}/ (run this from your site folder).")
    tot_full = tot_lo = 0
    problems = 0
    print(f"{'file':28} {'full KB':>9} {'light KB':>9} {'points':>22} {'kept full':>10}")
    for f in files:
        r = process_file(f, a.tolerance_px, a.ref_px)
        if not r:
            continue
        out, sf, sl, st = r
        tot_full += sf
        tot_lo += sl
        problems += st["kept_full"] + st["untouched"]
        note = f"  ({st['untouched']} paths not straight lines, left alone)" if st["untouched"] else ""
        print(f"{os.path.basename(f):28} {sf//1000:>9,} {sl//1000:>9,} {st['before']:>10,} -> {st['after']:>8,} {st['kept_full']:>10}{note}")
    print(f"{'TOTAL':28} {tot_full//1000:>9,} {tot_lo//1000:>9,}   ({100*tot_lo/max(tot_full,1):.0f}% of full size)")
    if problems:
        print(f"\n{problems} outline(s) were left at full detail because they failed the safety check or weren't straight lines (see the 'kept full' column).")
    else:
        print("\nEvery outline passed the safety check.")
    print("\nThe full maps are untouched. New *.lo.js files were written next to them in the same folder.")


if __name__ == "__main__":
    main()
