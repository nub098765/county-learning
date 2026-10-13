#!/usr/bin/env python3
"""
apply_lake_allowlist.py - make build_maps_hires.py cut out ONLY the inland lakes you list.

Run it from the folder that has build_maps_hires.py:
    python3 apply_lake_allowlist.py
It saves build_maps_hires.py.bak first, then edits build_maps_hires.py in place. Coastal water (bays, sounds,
the Great Lakes) is handled by tiger_water() and is not touched.
To change the list later, edit INCLUDE_LAKES in build_maps_hires.py (names without "Lk"/"Lake", lowercase).
"""
import re, shutil, sys

PATH = "build_maps_hires.py"
src = open(PATH, encoding="utf-8").read()

if "is_wanted_lake" in src:
    sys.exit("Already applied (is_wanted_lake is already in build_maps_hires.py). Nothing changed.")

BLOCK = '''INCLUDE_LAKES = {
    "iliamna", "okeechobee", "pontchartrain", "maurepas", "salvador",
    "of the woods", "mille lacs", "leech", "winnibigoshish", "red", "upper red", "lower red", "rainy",
    "champlain", "oneida", "cayuga", "seneca", "mattamuskeet", "great salt", "winnebago",
}


def is_wanted_lake(name):
    """True only for the inland lakes in INCLUDE_LAKES ("Lk"/"Lake" and word order are ignored)."""
    if not re.search(r"\\b(Lk|Lake)\\b", name, re.I):
        return False
    core = re.sub(r"\\b(Lk|Lake)\\b", "", name, flags=re.I)
    return " ".join(core.lower().split()) in INCLUDE_LAKES


'''

marker = "def tiger_lakes("
if marker not in src:
    sys.exit("Could not find 'def tiger_lakes(' - is this the right build_maps_hires.py? Nothing changed.")
head, tail = src.split(marker, 1)

# 1) the tag/name filter inside tiger_lakes (handles both the original line and the 'lakeish' version)
pat = re.compile(r'(?:^[ \t]*lakeish = .*\n)?^([ \t]*)d = d\[d\["MTFCC"\]\.isin\(.*\n', re.M)
new_filter = r'\1d = d[d["MTFCC"].isin(["H2030", "H2040", "H2051", "H3010", "H3020"]) & d["FULLNAME"].fillna("").map(is_wanted_lake)]   # only the lakes in INCLUDE_LAKES, under any Census tag\n'
tail, n = pat.subn(new_filter, tail, count=1)
if n != 1:
    sys.exit("Could not find the MTFCC filter line inside tiger_lakes(). Nothing changed.")

# 2) undo the earlier SKIP_LAKES edit, if it is there
tail = tail.replace(" and nm.strip() not in SKIP_LAKES", "").replace(" and nm not in SKIP_LAKES", "")
head = re.sub(r'^SKIP_LAKES = .*\n', '', head, flags=re.M)

if not re.search(r'^import .*\bre\b|^import re\b', head, re.M):
    sys.exit("build_maps_hires.py doesn't import re (expected). Nothing changed.")

shutil.copy(PATH, PATH + ".bak")
open(PATH, "w", encoding="utf-8").write(head + BLOCK + marker + tail)
print(f"Done. Backup: {PATH}.bak")
print("Only the lakes in INCLUDE_LAKES are cut now. Alaska needs --water-alaska for Iliamna.")
