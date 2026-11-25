#!/usr/bin/env python3
"""
build_county_table.py - makes county-data.js (population, area, where in the state, county-or-not) for counties.html.

HOW TO RUN (from the jameson folder):
  1. pip install geopandas pandas           (once)
  2. have tl_YYYY_us_county.zip in this folder (use 2023 or newer, so Connecticut shows its planning regions)
       https://www2.census.gov/geo/tiger/TIGER2024/COUNTY/tl_2024_us_county.zip
  3. python3 build_county_table.py
  4. copy the new county-data.js next to counties.html

Population comes from the Census file co-est2025-alldata.csv (Vintage 2025; the 2024 one also works). If neither is in this
folder the script tries to download it; if that fails, get it by hand from the "County Population Totals" page on census.gov
(search: "County Population Totals and Components of Change 2020-2025") and put the CSV next to this script. (No population file at all = the Population column just shows dashes.)

That file only covers the 50 states + DC. Guam, American Samoa, the Northern Mariana Islands and the U.S. Virgin Islands use
the 2020 Census counts, which are built into this script (no yearly estimates exist for them). For Puerto Rico, put the Census municipio file (prm-est2025-pop.xlsx) in this folder
(needs: pip install openpyxl). Anything else can be added with an optional
file called extra-population.csv with two columns, GEOID and pop, e.g.
  GEOID,pop
  72001,17000
"""
import glob, json, os, re, sys, unicodedata, urllib.request
import geopandas as gpd, pandas as pd

FIPS = {"01":"Alabama","02":"Alaska","04":"Arizona","05":"Arkansas","06":"California","08":"Colorado","09":"Connecticut","10":"Delaware","11":"District of Columbia","12":"Florida","13":"Georgia","15":"Hawaii","16":"Idaho","17":"Illinois","18":"Indiana","19":"Iowa","20":"Kansas","21":"Kentucky","22":"Louisiana","23":"Maine","24":"Maryland","25":"Massachusetts","26":"Michigan","27":"Minnesota","28":"Mississippi","29":"Missouri","30":"Montana","31":"Nebraska","32":"Nevada","33":"New Hampshire","34":"New Jersey","35":"New Mexico","36":"New York","37":"North Carolina","38":"North Dakota","39":"Ohio","40":"Oklahoma","41":"Oregon","42":"Pennsylvania","44":"Rhode Island","45":"South Carolina","46":"South Dakota","47":"Tennessee","48":"Texas","49":"Utah","50":"Vermont","51":"Virginia","53":"Washington","54":"West Virginia","55":"Wisconsin","56":"Wyoming","60":"American Samoa","66":"Guam","69":"Northern Mariana Islands","72":"Puerto Rico","78":"U.S. Virgin Islands"}
M2_PER_SQMI = 2589988.11
# The Census Bureau publishes no yearly estimates for these territories, so these are the April 1, 2020 Census counts
# (2020 Island Areas Censuses, population and housing unit counts, released Oct 28, 2021). Keyed by normalised NAME / NAMELSAD.
TERRITORY_2020 = {
    "60": {"eastern": 17059, "easterndistrict": 17059, "manua": 832, "manuadistrict": 832, "roseisland": 0, "swainsisland": 0,
           "western": 31819, "westerndistrict": 31819},                                           # American Samoa (total 49,710)
    "66": {"guam": 153836},                                                                        # Guam
    "69": {"northernislands": 7, "northernislandsmunicipality": 7, "rota": 1893, "rotamunicipality": 1893,
           "saipan": 43385, "saipanmunicipality": 43385, "tinian": 2044, "tinianmunicipality": 2044},   # Northern Mariana Islands (total 47,329)
    "78": {"saintcroix": 41004, "saintcroixisland": 41004, "saintjohn": 3881, "saintjohnisland": 3881,
           "saintthomas": 42261, "saintthomasisland": 42261},                                      # U.S. Virgin Islands (total 87,146)
}
NO_POP_EXPECTED = {"72"}   # Puerto Rico needs its own file (dropped from this once prm-est*-pop.xlsx is found)

def sq(m2):
    """square metres -> sq mi, 1 decimal normally, more for tiny places (Rose Atoll would round to 0.0)"""
    v = m2 / M2_PER_SQMI
    return round(v, 1) if v >= 10 else round(v, 4)

def norm(s):
    s = unicodedata.normalize("NFKD", s).encode("ascii", "ignore").decode().lower()
    s = s.replace("st.", "saint").replace("ste.", "sainte")
    return re.sub(r"[^a-z0-9]+", "", s)

def slug(name):
    """Same keys the game uses for states (new_hampshire, puerto_rico, united_states_virgin_islands ...)."""
    if name == "U.S. Virgin Islands": return "united_states_virgin_islands"
    return re.sub(r"[^a-z0-9]+", "_", name.lower()).strip("_")

print("build_county_table.py version 2026-11-25d")
tl = sorted(glob.glob("tl_*_us_county.zip")) or sorted(glob.glob("tl_*_us_county"))
if not tl: sys.exit("Can't find tl_YYYY_us_county.zip in this folder.")
print("using", tl[-1])
c = gpd.read_file(tl[-1])
c = c[c.STATEFP.isin(FIPS)].copy()

pop = {}
# newest population file wins: a co-estYYYY-alldata.csv already in this folder, else try to download 2025, then 2024
csv = (sorted(glob.glob("co-est20*-alldata.csv")) or [None])[-1]
if not csv:
    for yr, span in (("2025", "2020-2025"), ("2024", "2020-2024")):
        name = "co-est%s-alldata.csv" % yr
        try:
            print("downloading", name, "...")
            urllib.request.urlretrieve("https://www2.census.gov/programs-surveys/popest/datasets/%s/counties/totals/%s" % (span, name), name)
            csv = name; break
        except Exception as e:
            print("  couldn't download it (%s)" % e)
    if not csv: print("  continuing without population")
if os.path.exists(csv):
    d = pd.read_csv(csv, encoding="latin-1", dtype={"STATE": str, "COUNTY": str})
    col = sorted(x for x in d.columns if x.startswith("POPESTIMATE"))[-1]
    d = d[d.SUMLEV == 50]
    pop = {r.STATE.zfill(2) + r.COUNTY.zfill(3): int(getattr(r, col)) for r in d.itertuples()}
    print("population column:", col, "-", len(pop), "counties")
if os.path.exists("extra-population.csv"):
    x = pd.read_csv("extra-population.csv", dtype={"GEOID": str})
    for g, p in zip(x["GEOID"], x["pop"]): pop[g.zfill(5)] = int(p)
    print("extra-population.csv:", len(x), "rows")

pr_n = 0
pr_pop = {}   # Puerto Rico municipio file has names, not FIPS codes: "Adjuntas Municipio, Puerto Rico"
prf = (sorted(glob.glob("prm-est*-pop.xlsx")) + sorted(glob.glob("prm-est*-pop.csv")) or [None])[-1]
if prf:
    try:
        t = pd.read_excel(prf, header=None) if prf.endswith(".xlsx") else pd.read_csv(prf, header=None, encoding="latin-1")
        for _, row in t.iterrows():
            nm = str(row.iloc[0]).lstrip(".")
            if nm.endswith(", Puerto Rico") and nm != "Puerto Rico":
                v = [x for x in row.iloc[1:] if pd.notna(x)]
                base = nm[:-len(", Puerto Rico")]
                pr_pop[norm(base)] = pr_pop[norm(re.sub(r"\s*Municipio$", "", base))] = int(v[-1])      # last column = newest year
                pr_n += 1
        print(prf + ":", pr_n, "municipios")
    except Exception as e:
        print("couldn't read %s (%s)" % (prf, e))
if pr_pop: NO_POP_EXPECTED.discard("72")

# where in the state: centroid vs the state's bounding box, split into thirds
proj = c.to_crs(5070)
cen = proj.geometry.centroid
c["cx"], c["cy"] = cen.x, cen.y
bb = c.groupby("STATEFP").agg(x0=("cx", "min"), x1=("cx", "max"), y0=("cy", "min"), y1=("cy", "max"))
def where(r):
    b = bb.loc[r.STATEFP]
    if b.x1 - b.x0 < 1 or b.y1 - b.y0 < 1: return "Whole state"
    fx = (r.cx - b.x0) / (b.x1 - b.x0); fy = (r.cy - b.y0) / (b.y1 - b.y0)
    ns_ = fy < 1/3 or fy > 2/3
    ew = ("west" if ns_ else "West") if fx < 1/3 else ("east" if ns_ else "East") if fx > 2/3 else ""
    ns = "South" if fy < 1/3 else "North" if fy > 2/3 else ""
    return (ns + ew) or "Central"

def lsad_type(r):
    """'Parish', 'Borough', 'city', 'County' ... = whatever follows the plain name in NAMELSAD ('' for DC, Guam, Carson City)."""
    return r.NAMELSAD[len(r.NAME):].strip() if r.NAMELSAD.startswith(r.NAME) else ""

# a plain name shared by two records in one state (Richmond county + Richmond city) can't be a safe key
dupes = {}
for r in c.itertuples():
    dupes[(r.STATEFP, norm(r.NAME))] = dupes.get((r.STATEFP, norm(r.NAME)), 0) + 1

out, no_pop = [], []
for r in c.itertuples():
    s = slug(FIPS[r.STATEFP])
    t = lsad_type(r)
    p = pop.get(r.GEOID)
    if p is None and r.STATEFP == "72": p = pr_pop.get(norm(r.NAMELSAD)) or pr_pop.get(norm(r.NAME))
    from_2020 = False
    if p is None and r.STATEFP in TERRITORY_2020:
        tt = TERRITORY_2020[r.STATEFP]
        p = tt.get(norm(r.NAME), tt.get(norm(r.NAMELSAD)))
        from_2020 = p is not None
    if p is None and r.STATEFP not in NO_POP_EXPECTED: no_pop.append(FIPS[r.STATEFP] + ": " + r.NAMELSAD)
    out.append({"k": (s + "|" + norm(r.NAME)) if dupes[(r.STATEFP, norm(r.NAME))] == 1 else None,
                "k2": s + "|" + norm(r.NAMELSAD),
                "pop": p, "area": sq(r.ALAND + r.AWATER), "land": sq(r.ALAND),
                "where": where(r), "type": t, "county": t.lower() == "county", **({"popNote": "2020 Census"} if from_2020 else {})})

pr_rows = [(r, o) for r, o in zip(c.itertuples(), out) if r.STATEFP == "72"]
if pr_rows:
    hit = sum(1 for r, o in pr_rows if o["pop"] is not None)
    print("\nPuerto Rico: %d of %d municipios have a population%s" % (hit, len(pr_rows), "" if pr_pop else "  (no prm-est*-pop.xlsx/csv found in this folder)"))
    if pr_pop and hit < len(pr_rows):
        print("   no match for:", [r.NAMELSAD for r, o in pr_rows if o["pop"] is None][:6])
        print("   names in the file look like:", list(pr_pop)[:6])
ter = [(r, o) for r, o in zip(c.itertuples(), out) if r.STATEFP in TERRITORY_2020]
if ter:
    got = sum(1 for r, o in ter if o["pop"] is not None)
    print("\nGuam / American Samoa / Northern Marianas / Virgin Islands: %d of %d have a 2020 Census count" % (got, len(ter)))
    for r, o in ter:
        if o["pop"] is None: print("   no match for:", FIPS[r.STATEFP] + ": " + r.NAMELSAD, " (NAME=%r)" % r.NAME)
ct = [r for r in c.itertuples() if r.STATEFP == "09"]
if ct and not any("Planning Region" in r.NAMELSAD for r in ct):
    print("\nWARNING: this TIGER file still has Connecticut's 8 old counties. The game uses the 9 planning regions,")
    print("         so use tl_2023_us_county.zip or newer.")
if no_pop:
    print("\n%d state/DC counties with no population match (population will show a dash):" % len(no_pop))
    for n in no_pop[:40]: print("   ", n)
    if len(no_pop) > 40: print("    ...and %d more" % (len(no_pop) - 40))
with open("county-data.js", "w") as f:
    import datetime
    info = {"script": "2026-11-25d", "built": datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"), "rows": len(out),
            "withPopulation": sum(1 for o in out if o["pop"] is not None), "puertoRicoWithPopulation": sum(1 for r, o in pr_rows if o["pop"] is not None)}
    f.write("/* made by build_county_table.py */\nwindow.__countyDataInfo = " + json.dumps(info) + ";\nwindow.__countyData = " + json.dumps(out, separators=(",", ":")) + ";\n")
print("\nwrote county-data.js:", len(out), "counties, %d with population" % sum(1 for o in out if o["pop"] is not None))
print("Now open counties.html, press F12, and look at the Console: it lists any rows that still didn't match.")