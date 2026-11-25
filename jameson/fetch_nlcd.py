#!/usr/bin/env python3
"""
fetch_nlcd.py - download the NLCD land-cover GeoTIFF for a lake from the USGS/MRLC web service
into ./nlcd/<lake>.tif, where build_maps_hires.py picks it up.

    python3 fetch_nlcd.py                      # Lake Okeechobee
    python3 fetch_nlcd.py okeechobee -81.20 26.60 -80.50 27.30     # name, then min_lon min_lat max_lon max_lat
    python3 fetch_nlcd.py okeechobee --id <coverage id>            # force one coverage from the list it prints

The MRLC web service changes names now and then, so this asks the server which land-cover
coverages exist, tries them newest first, and checks that the file it got really contains
open water. If every attempt fails it prints how to download the same window by hand
(save it as nlcd/okeechobee.tif - the file name is what ties it to the lake).

Needs internet. No extra packages, except `pip install rasterio` for the check at the end
(and later for build_maps_hires.py).
"""
import os, re, sys, urllib.parse, urllib.request

OWS = "https://www.mrlc.gov/geoserver/ows"
LAKES = {"okeechobee": (-81.20, 26.60, -80.50, 27.30)}
UA = "county-map-builder/1.0 (personal hobby project)"


def get(url, timeout=180):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read()


def list_coverages():
    q = urllib.parse.urlencode({"service": "WCS", "version": "2.0.1", "request": "GetCapabilities"})
    xml = get(OWS + "?" + q, timeout=120).decode("utf-8", "replace")
    return re.findall(r"<(?:\w+:)?CoverageId>([^<]+)</(?:\w+:)?CoverageId>", xml)


def candidates(ids):
    """Land-cover coverages for the lower 48, newest year first."""
    out = []
    for i in ids:
        low = i.lower()
        if (("land" in low and "cov" in low) or "lndcov" in low) and not any(w in low for w in ("change", "confidence", "impervious", "canopy", "fractional")):
            if "l48" in low or "cu_" in low or "conus" in low:
                m = re.findall(r"(?:19|20)\d\d", i)
                out.append((int(m[-1]) if m else 0, i))
    return [i for _, i in sorted(out, reverse=True)]


def coverage_url(cid, bbox):
    x0, y0, x1, y1 = bbox
    q = [("service", "WCS"), ("version", "2.0.1"), ("request", "GetCoverage"), ("coverageId", cid),
         ("format", "image/tiff"),
         ("subsettingcrs", "http://www.opengis.net/def/crs/EPSG/0/4326"),
         ("subset", f"Lat({y0},{y1})"), ("subset", f"Long({x0},{x1})")]
    return OWS + "?" + urllib.parse.urlencode(q)


def has_water(path):
    try:
        import rasterio
    except ImportError:
        print("   (rasterio not installed, so I can't check the file - run: pip install rasterio)")
        return True
    with rasterio.open(path) as ds:
        a = ds.read(1)
    n = int((a == 11).sum())
    print(f"   {a.shape[1]} x {a.shape[0]} pixels, {n:,} open-water pixels ({n * 900 / 1e6:,.0f} km2 at 30 m)")
    return n > 1000


def main():
    args = sys.argv[1:]
    forced = None
    if "--id" in args:
        k = args.index("--id"); forced = args[k + 1]; del args[k:k + 2]
    name = args[0] if args else "okeechobee"
    bbox = tuple(map(float, args[1:5])) if len(args) >= 5 else LAKES.get(name)
    if bbox is None:
        sys.exit(f"don't know a window for '{name}' - give it: {name} min_lon min_lat max_lon max_lat")
    os.makedirs("nlcd", exist_ok=True)
    dest = os.path.join("nlcd", name + ".tif")

    try:
        ids = [forced] if forced else candidates(list_coverages())
    except Exception as e:
        ids = []
        print("could not read the service's coverage list:", e)
    print("coverages to try:", ids or "none found")

    for cid in ids:
        print(f"\ntrying {cid}")
        try:
            data = get(coverage_url(cid, bbox))
        except Exception as e:
            print("   failed:", e)
            continue
        if data[:4] not in (b"II*\x00", b"MM\x00*", b"II+\x00", b"MM\x00+"):
            print("   the server did not return a GeoTIFF:", data[:200].decode("utf-8", "replace").replace("\n", " "))
            continue
        with open(dest, "wb") as f:
            f.write(data)
        if has_water(dest):
            print(f"   saved {dest}")
            return
        print("   no open water in it - trying the next one")
        os.remove(dest)

    print(f"""
Could not download it automatically. By hand:
  1. Open https://www.mrlc.gov/viewer/ (the NLCD viewer) and pick the newest Land Cover layer.
  2. Use its download tool to select a rectangle around the lake (about lon {bbox[0]} to {bbox[2]}, lat {bbox[1]} to {bbox[3]}).
  3. Save the GeoTIFF in this folder as {dest}
Tell me what went wrong and I'll adjust the script.""")


if __name__ == "__main__":
    main()