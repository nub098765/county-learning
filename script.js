document.addEventListener('DOMContentLoaded', () => {
// --- Data Registry for States and Counties ---
const stateData = {
  delaware: {
    name: "Delaware",
    svgId: "map-delaware", // FIX #2: was "svg-delaware", didn't match the <svg id="map-delaware"> in index.html
    counties: [
      { id: "new-castle", name: "New Castle", stateKey: "delaware" },
      { id: "kent", name: "Kent", stateKey: "delaware" }, // FIX #3: was "kent-de", didn't match <path id="kent"> in the SVG
      { id: "sussex", name: "Sussex", stateKey: "delaware" }
    ]
  },
  rhode_island: {
    name: "Rhode Island",
    svgId: "svg-rhode-island",
    counties: [
      { id: "bristol", name: "Bristol", stateKey: "rhode_island" },
      { id: "kent-ri", name: "Kent", stateKey: "rhode_island" },
      { id: "newport", name: "Newport", stateKey: "rhode_island" },
      { id: "providence", name: "Providence", stateKey: "rhode_island" },
      { id: "washington", name: "Washington", stateKey: "rhode_island" }
    ]
  },
  hawaii: {
    name: "Hawaii",
    svgId: "svg-hawaii",
    counties: [
      { id: "hawaii-county", name: "Hawai'i", stateKey: "hawaii" },
      { id: "honolulu", name: "Honolulu", stateKey: "hawaii" },
      { id: "kalawao", name: "Kalawao", stateKey: "hawaii" },
      { id: "kauai", name: "Kaua'i", stateKey: "hawaii" },
      { id: "maui-county", name: "Maui", stateKey: "hawaii" }
    ]
  },
  california: {
    name: "California",
    svgId: "svg-california",
    counties: [
      { id: "alameda", name: "Alameda", stateKey: "california" },
      { id: "alpine", name: "Alpine", stateKey: "california" },
      { id: "amador", name: "Amador", stateKey: "california" },
      { id: "butte", name: "Butte", stateKey: "california" },
      { id: "calaveras", name: "Calaveras", stateKey: "california" },
      { id: "colusa", name: "Colusa", stateKey: "california" },
      { id: "contra-costa", name: "Contra Costa", stateKey: "california" },
      { id: "del-norte", name: "Del Norte", stateKey: "california" },
      { id: "el-dorado", name: "El Dorado", stateKey: "california" },
      { id: "fresno", name: "Fresno", stateKey: "california" },
      { id: "glenn", name: "Glenn", stateKey: "california" },
      { id: "humboldt", name: "Humboldt", stateKey: "california" },
      { id: "imperial", name: "Imperial", stateKey: "california" },
      { id: "inyo", name: "Inyo", stateKey: "california" },
      { id: "kern", name: "Kern", stateKey: "california" },
      { id: "kings", name: "Kings", stateKey: "california" },
      { id: "lake", name: "Lake", stateKey: "california" },
      { id: "lassen", name: "Lassen", stateKey: "california" },
      { id: "los-angeles", name: "Los Angeles", stateKey: "california" },
      { id: "madera", name: "Madera", stateKey: "california" },
      { id: "marin", name: "Marin", stateKey: "california" },
      { id: "mariposa", name: "Mariposa", stateKey: "california" },
      { id: "mendocino", name: "Mendocino", stateKey: "california" },
      { id: "merced", name: "Merced", stateKey: "california" },
      { id: "modoc", name: "Modoc", stateKey: "california" },
      { id: "mono", name: "Mono", stateKey: "california" },
      { id: "monterey", name: "Monterey", stateKey: "california" },
      { id: "napa", name: "Napa", stateKey: "california" },
      { id: "nevada", name: "Nevada", stateKey: "california" },
      { id: "orange", name: "Orange", stateKey: "california" },
      { id: "placer", name: "Placer", stateKey: "california" },
      { id: "plumas", name: "Plumas", stateKey: "california" },
      { id: "riverside", name: "Riverside", stateKey: "california" },
      { id: "sacramento", name: "Sacramento", stateKey: "california" },
      { id: "san-benito", name: "San Benito", stateKey: "california" },
      { id: "san-bernardino", name: "San Bernardino", stateKey: "california" },
      { id: "san-diego", name: "San Diego", stateKey: "california" },
      { id: "san-francisco", name: "San Francisco", stateKey: "california" },
      { id: "san-joaquin", name: "San Joaquin", stateKey: "california" },
      { id: "san-luis-obispo", name: "San Luis Obispo", stateKey: "california" },
      { id: "san-mateo", name: "San Mateo", stateKey: "california" },
      { id: "santa-barbara", name: "Santa Barbara", stateKey: "california" },
      { id: "santa-clara", name: "Santa Clara", stateKey: "california" },
      { id: "santa-cruz", name: "Santa Cruz", stateKey: "california" },
      { id: "shasta", name: "Shasta", stateKey: "california" },
      { id: "sierra", name: "Sierra", stateKey: "california" },
      { id: "siskiyou", name: "Siskiyou", stateKey: "california" },
      { id: "solano", name: "Solano", stateKey: "california" },
      { id: "sonoma", name: "Sonoma", stateKey: "california" },
      { id: "stanislaus", name: "Stanislaus", stateKey: "california" },
      { id: "sutter", name: "Sutter", stateKey: "california" },
      { id: "tehama", name: "Tehama", stateKey: "california" },
      { id: "trinity", name: "Trinity", stateKey: "california" },
      { id: "tulare", name: "Tulare", stateKey: "california" },
      { id: "tuolumne", name: "Tuolumne", stateKey: "california" },
      { id: "ventura", name: "Ventura", stateKey: "california" },
      { id: "yolo", name: "Yolo", stateKey: "california" },
      { id: "yuba", name: "Yuba", stateKey: "california" }
    ]
  },
  texas: {
    name: "Texas",
    svgId: "svg-texas",
    counties: [
      { id: "anderson", name: "Anderson", stateKey: "texas" },
      { id: "andrews", name: "Andrews", stateKey: "texas" },
      { id: "angelina", name: "Angelina", stateKey: "texas" },
      { id: "aransas", name: "Aransas", stateKey: "texas" },
      { id: "archer", name: "Archer", stateKey: "texas" },
      { id: "armstrong", name: "Armstrong", stateKey: "texas" },
      { id: "atascosa", name: "Atascosa", stateKey: "texas" },
      { id: "austin", name: "Austin", stateKey: "texas" },
      { id: "bailey", name: "Bailey", stateKey: "texas" },
      { id: "bandera", name: "Bandera", stateKey: "texas" },
      { id: "bastrop", name: "Bastrop", stateKey: "texas" },
      { id: "baylor", name: "Baylor", stateKey: "texas" },
      { id: "bee", name: "Bee", stateKey: "texas" },
      { id: "bell", name: "Bell", stateKey: "texas" },
      { id: "bexar", name: "Bexar", stateKey: "texas" },
      { id: "blanco", name: "Blanco", stateKey: "texas" },
      { id: "borden", name: "Borden", stateKey: "texas" },
      { id: "bosque", name: "Bosque", stateKey: "texas" },
      { id: "bowie", name: "Bowie", stateKey: "texas" },
      { id: "brazoria", name: "Brazoria", stateKey: "texas" },
      { id: "brazos", name: "Brazos", stateKey: "texas" },
      { id: "brewster", name: "Brewster", stateKey: "texas" },
      { id: "briscoe", name: "Briscoe", stateKey: "texas" },
      { id: "brooks", name: "Brooks", stateKey: "texas" },
      { id: "brown", name: "Brown", stateKey: "texas" },
      { id: "burleson", name: "Burleson", stateKey: "texas" },
      { id: "burnet", name: "Burnet", stateKey: "texas" },
      { id: "caldwell", name: "Caldwell", stateKey: "texas" },
      { id: "calhoun", name: "Calhoun", stateKey: "texas" },
      { id: "callahan", name: "Callahan", stateKey: "texas" },
      { id: "cameron", name: "Cameron", stateKey: "texas" },
      { id: "camp", name: "Camp", stateKey: "texas" },
      { id: "carson", name: "Carson", stateKey: "texas" },
      { id: "cass", name: "Cass", stateKey: "texas" },
      { id: "castro", name: "Castro", stateKey: "texas" },
      { id: "chambers", name: "Chambers", stateKey: "texas" },
      { id: "cherokee", name: "Cherokee", stateKey: "texas" },
      { id: "childress", name: "Childress", stateKey: "texas" },
      { id: "clay", name: "Clay", stateKey: "texas" },
      { id: "cochran", name: "Cochran", stateKey: "texas" },
      { id: "coke", name: "Coke", stateKey: "texas" },
      { id: "coleman", name: "Coleman", stateKey: "texas" },
      { id: "collin", name: "Collin", stateKey: "texas" },
      { id: "collingsworth", name: "Collingsworth", stateKey: "texas" },
      { id: "colorado", name: "Colorado", stateKey: "texas" },
      { id: "comal", name: "Comal", stateKey: "texas" },
      { id: "comanche", name: "Comanche", stateKey: "texas" },
      { id: "concho", name: "Concho", stateKey: "texas" },
      { id: "cooke", name: "Cooke", stateKey: "texas" },
      { id: "coryell", name: "Coryell", stateKey: "texas" },
      { id: "cottle", name: "Cottle", stateKey: "texas" },
      { id: "crane", name: "Crane", stateKey: "texas" },
      { id: "crockett", name: "Crockett", stateKey: "texas" },
      { id: "crosby", name: "Crosby", stateKey: "texas" },
      { id: "culberson", name: "Culberson", stateKey: "texas" },
      { id: "dallam", name: "Dallam", stateKey: "texas" },
      { id: "dallas", name: "Dallas", stateKey: "texas" },
      { id: "dawson", name: "Dawson", stateKey: "texas" },
      { id: "dewitt", name: "DeWitt", stateKey: "texas" },
      { id: "deaf-smith", name: "Deaf Smith", stateKey: "texas" },
      { id: "delta", name: "Delta", stateKey: "texas" },
      { id: "denton", name: "Denton", stateKey: "texas" },
      { id: "dickens", name: "Dickens", stateKey: "texas" },
      { id: "dimmit", name: "Dimmit", stateKey: "texas" },
      { id: "donley", name: "Donley", stateKey: "texas" },
      { id: "duval", name: "Duval", stateKey: "texas" },
      { id: "eastland", name: "Eastland", stateKey: "texas" },
      { id: "ector", name: "Ector", stateKey: "texas" },
      { id: "edwards", name: "Edwards", stateKey: "texas" },
      { id: "el-paso", name: "El Paso", stateKey: "texas" },
      { id: "ellis", name: "Ellis", stateKey: "texas" },
      { id: "erath", name: "Erath", stateKey: "texas" },
      { id: "falls", name: "Falls", stateKey: "texas" },
      { id: "fannin", name: "Fannin", stateKey: "texas" },
      { id: "fayette", name: "Fayette", stateKey: "texas" },
      { id: "fisher", name: "Fisher", stateKey: "texas" },
      { id: "floyd", name: "Floyd", stateKey: "texas" },
      { id: "foard", name: "Foard", stateKey: "texas" },
      { id: "fort-bend", name: "Fort Bend", stateKey: "texas" },
      { id: "franklin", name: "Franklin", stateKey: "texas" },
      { id: "freestone", name: "Freestone", stateKey: "texas" },
      { id: "frio", name: "Frio", stateKey: "texas" },
      { id: "gaines", name: "Gaines", stateKey: "texas" },
      { id: "galveston", name: "Galveston", stateKey: "texas" },
      { id: "garza", name: "Garza", stateKey: "texas" },
      { id: "gillespie", name: "Gillespie", stateKey: "texas" },
      { id: "glasscock", name: "Glasscock", stateKey: "texas" },
      { id: "goliad", name: "Goliad", stateKey: "texas" },
      { id: "gonzales", name: "Gonzales", stateKey: "texas" },
      { id: "gray", name: "Gray", stateKey: "texas" },
      { id: "grayson", name: "Grayson", stateKey: "texas" },
      { id: "gregg", name: "Gregg", stateKey: "texas" },
      { id: "grimes", name: "Grimes", stateKey: "texas" },
      { id: "guadalupe", name: "Guadalupe", stateKey: "texas" },
      { id: "hale", name: "Hale", stateKey: "texas" },
      { id: "hall", name: "Hall", stateKey: "texas" },
      { id: "hamilton", name: "Hamilton", stateKey: "texas" },
      { id: "hansford", name: "Hansford", stateKey: "texas" },
      { id: "hardeman", name: "Hardeman", stateKey: "texas" },
      { id: "hardin", name: "Hardin", stateKey: "texas" },
      { id: "harris", name: "Harris", stateKey: "texas" },
      { id: "harrison", name: "Harrison", stateKey: "texas" },
      { id: "hartley", name: "Hartley", stateKey: "texas" },
      { id: "haskell", name: "Haskell", stateKey: "texas" },
      { id: "hays", name: "Hays", stateKey: "texas" },
      { id: "hemphill", name: "Hemphill", stateKey: "texas" },
      { id: "henderson", name: "Henderson", stateKey: "texas" },
      { id: "hidalgo", name: "Hidalgo", stateKey: "texas" },
      { id: "hill", name: "Hill", stateKey: "texas" },
      { id: "hockley", name: "Hockley", stateKey: "texas" },
      { id: "hood", name: "Hood", stateKey: "texas" },
      { id: "hopkins", name: "Hopkins", stateKey: "texas" },
      { id: "houston", name: "Houston", stateKey: "texas" },
      { id: "howard", name: "Howard", stateKey: "texas" },
      { id: "hudspeth", name: "Hudspeth", stateKey: "texas" },
      { id: "hunt", name: "Hunt", stateKey: "texas" },
      { id: "hutchinson", name: "Hutchinson", stateKey: "texas" },
      { id: "irion", name: "Irion", stateKey: "texas" },
      { id: "jack", name: "Jack", stateKey: "texas" },
      { id: "jackson", name: "Jackson", stateKey: "texas" },
      { id: "jasper", name: "Jasper", stateKey: "texas" },
      { id: "jeff-davis", name: "Jeff Davis", stateKey: "texas" },
      { id: "jefferson", name: "Jefferson", stateKey: "texas" },
      { id: "jim-hogg", name: "Jim Hogg", stateKey: "texas" },
      { id: "jim-wells", name: "Jim Wells", stateKey: "texas" },
      { id: "johnson", name: "Johnson", stateKey: "texas" },
      { id: "jones", name: "Jones", stateKey: "texas" },
      { id: "karnes", name: "Karnes", stateKey: "texas" },
      { id: "kaufman", name: "Kaufman", stateKey: "texas" },
      { id: "kendall", name: "Kendall", stateKey: "texas" },
      { id: "kenedy", name: "Kenedy", stateKey: "texas" },
      { id: "kent-tx", name: "Kent", stateKey: "texas" },
      { id: "kerr", name: "Kerr", stateKey: "texas" },
      { id: "kimble", name: "Kimble", stateKey: "texas" },
      { id: "king", name: "King", stateKey: "texas" },
      { id: "kinney", name: "Kinney", stateKey: "texas" },
      { id: "kleberg", name: "Kleberg", stateKey: "texas" },
      { id: "knox", name: "Knox", stateKey: "texas" },
      { id: "la-salle", name: "La Salle", stateKey: "texas" },
      { id: "lamar", name: "Lamar", stateKey: "texas" },
      { id: "lamb", name: "Lamb", stateKey: "texas" },
      { id: "lampasas", name: "Lampasas", stateKey: "texas" },
      { id: "lavaca", name: "Lavaca", stateKey: "texas" },
      { id: "lee", name: "Lee", stateKey: "texas" },
      { id: "leon", name: "Leon", stateKey: "texas" },
      { id: "liberty", name: "Liberty", stateKey: "texas" },
      { id: "limestone", name: "Limestone", stateKey: "texas" },
      { id: "lipscomb", name: "Lipscomb", stateKey: "texas" },
      { id: "live-oak", name: "Live Oak", stateKey: "texas" },
      { id: "llano", name: "Llano", stateKey: "texas" },
      { id: "loving", name: "Loving", stateKey: "texas" },
      { id: "lubbock", name: "Lubbock", stateKey: "texas" },
      { id: "lynn", name: "Lynn", stateKey: "texas" },
      { id: "madison", name: "Madison", stateKey: "texas" },
      { id: "marion", name: "Marion", stateKey: "texas" },
      { id: "martin", name: "Martin", stateKey: "texas" },
      { id: "mason", name: "Mason", stateKey: "texas" },
      { id: "matagorda", name: "Matagorda", stateKey: "texas" },
      { id: "maverick", name: "Maverick", stateKey: "texas" },
      { id: "mcculloch", name: "McCulloch", stateKey: "texas" },
      { id: "mclennan", name: "McLennan", stateKey: "texas" },
      { id: "mcmullen", name: "McMullen", stateKey: "texas" },
      { id: "medina", name: "Medina", stateKey: "texas" },
      { id: "menard", name: "Menard", stateKey: "texas" },
      { id: "midland", name: "Midland", stateKey: "texas" },
      { id: "milam", name: "Milam", stateKey: "texas" },
      { id: "mills", name: "Mills", stateKey: "texas" },
      { id: "mitchell", name: "Mitchell", stateKey: "texas" },
      { id: "montague", name: "Montague", stateKey: "texas" },
      { id: "montgomery", name: "Montgomery", stateKey: "texas" },
      { id: "moore", name: "Moore", stateKey: "texas" },
      { id: "morris", name: "Morris", stateKey: "texas" },
      { id: "motley", name: "Motley", stateKey: "texas" },
      { id: "nacogdoches", name: "Nacogdoches", stateKey: "texas" },
      { id: "navarro", name: "Navarro", stateKey: "texas" },
      { id: "newton", name: "Newton", stateKey: "texas" },
      { id: "nolan", name: "Nolan", stateKey: "texas" },
      { id: "nueces", name: "Nueces", stateKey: "texas" },
      { id: "ochiltree", name: "Ochiltree", stateKey: "texas" },
      { id: "oldham", name: "Oldham", stateKey: "texas" },
      { id: "orange-tx", name: "Orange", stateKey: "texas" },
      { id: "palo-pinto", name: "Palo Pinto", stateKey: "texas" },
      { id: "panola", name: "Panola", stateKey: "texas" },
      { id: "parker", name: "Parker", stateKey: "texas" },
      { id: "parmer", name: "Parmer", stateKey: "texas" },
      { id: "pecos", name: "Pecos", stateKey: "texas" },
      { id: "polk", name: "Polk", stateKey: "texas" },
      { id: "potter", name: "Potter", stateKey: "texas" },
      { id: "presidio", name: "Presidio", stateKey: "texas" },
      { id: "rains", name: "Rains", stateKey: "texas" },
      { id: "randall", name: "Randall", stateKey: "texas" },
      { id: "reagan", name: "Reagan", stateKey: "texas" },
      { id: "real", name: "Real", stateKey: "texas" },
      { id: "red-river", name: "Red River", stateKey: "texas" },
      { id: "reeves", name: "Reeves", stateKey: "texas" },
      { id: "refugio", name: "Refugio", stateKey: "texas" },
      { id: "roberts", name: "Roberts", stateKey: "texas" },
      { id: "robertson", name: "Robertson", stateKey: "texas" },
      { id: "rockwall", name: "Rockwall", stateKey: "texas" },
      { id: "runnels", name: "Runnels", stateKey: "texas" },
      { id: "rusk", name: "Rusk", stateKey: "texas" },
      { id: "sabine", name: "Sabine", stateKey: "texas" },
      { id: "san-augustine", name: "San Augustine", stateKey: "texas" },
      { id: "san-jacinto", name: "San Jacinto", stateKey: "texas" },
      { id: "san-patricio", name: "San Patricio", stateKey: "texas" },
      { id: "san-saba", name: "San Saba", stateKey: "texas" },
      { id: "schleicher", name: "Schleicher", stateKey: "texas" },
      { id: "scurry", name: "Scurry", stateKey: "texas" },
      { id: "shackelford", name: "Shackelford", stateKey: "texas" },
      { id: "shelby", name: "Shelby", stateKey: "texas" },
      { id: "sherman", name: "Sherman", stateKey: "texas" },
      { id: "smith", name: "Smith", stateKey: "texas" },
      { id: "somervell", name: "Somervell", stateKey: "texas" },
      { id: "starr", name: "Starr", stateKey: "texas" },
      { id: "stephens", name: "Stephens", stateKey: "texas" },
      { id: "sterling", name: "Sterling", stateKey: "texas" },
      { id: "stonewall", name: "Stonewall", stateKey: "texas" },
      { id: "sutton", name: "Sutton", stateKey: "texas" },
      { id: "swisher", name: "Swisher", stateKey: "texas" },
      { id: "tarrant", name: "Tarrant", stateKey: "texas" },
      { id: "taylor", name: "Taylor", stateKey: "texas" },
      { id: "terrell", name: "Terrell", stateKey: "texas" },
      { id: "terry", name: "Terry", stateKey: "texas" },
      { id: "throckmorton", name: "Throckmorton", stateKey: "texas" },
      { id: "titus", name: "Titus", stateKey: "texas" },
      { id: "tom-green", name: "Tom Green", stateKey: "texas" },
      { id: "travis", name: "Travis", stateKey: "texas" },
      { id: "trinity-tx", name: "Trinity", stateKey: "texas" },
      { id: "tyler", name: "Tyler", stateKey: "texas" },
      { id: "upshur", name: "Upshur", stateKey: "texas" },
      { id: "upton", name: "Upton", stateKey: "texas" },
      { id: "uvalde", name: "Uvalde", stateKey: "texas" },
      { id: "val-verde", name: "Val Verde", stateKey: "texas" },
      { id: "van-zandt", name: "Van Zandt", stateKey: "texas" },
      { id: "victoria", name: "Victoria", stateKey: "texas" },
      { id: "walker", name: "Walker", stateKey: "texas" },
      { id: "waller", name: "Waller", stateKey: "texas" },
      { id: "ward", name: "Ward", stateKey: "texas" },
      { id: "washington-tx", name: "Washington", stateKey: "texas" },
      { id: "webb", name: "Webb", stateKey: "texas" },
      { id: "wharton", name: "Wharton", stateKey: "texas" },
      { id: "wheeler", name: "Wheeler", stateKey: "texas" },
      { id: "wichita", name: "Wichita", stateKey: "texas" },
      { id: "wilbarger", name: "Wilbarger", stateKey: "texas" },
      { id: "willacy", name: "Willacy", stateKey: "texas" },
      { id: "williamson", name: "Williamson", stateKey: "texas" },
      { id: "wilson", name: "Wilson", stateKey: "texas" },
      { id: "winkler", name: "Winkler", stateKey: "texas" },
      { id: "wise", name: "Wise", stateKey: "texas" },
      { id: "wood", name: "Wood", stateKey: "texas" },
      { id: "yoakum", name: "Yoakum", stateKey: "texas" },
      { id: "young", name: "Young", stateKey: "texas" },
      { id: "zapata", name: "Zapata", stateKey: "texas" },
      { id: "zavala", name: "Zavala", stateKey: "texas" }
    ]
  }
};


// --- Game Configuration & State Variables ---
let selectedMode = "pin"; // "pin" | "pin-hard" | "type" | "type-hard" | "type-strict"
// Modes where the player types the county name instead of clicking the
// map — checked in a few places (input box visibility, disabling
// click-to-solve, resetting classes between games) so it's kept as one
// Set rather than repeating the string comparisons everywhere.
const TYPE_MODES = new Set(["type", "type-hard", "type-strict"]);
// Typing modes where only the single highlighted county counts as a
// match — as opposed to "type" (List), where typing any remaining
// county's name resolves it. Both "type-hard" (Type) and "type-strict"
// (Verbatim) work this way; they differ in submission behavior (see
// the Instant Check listener) and in how unforgivingly they treat a
// wrong guess.
const SINGLE_TARGET_TYPE_MODES = new Set(["type-hard", "type-strict"]);
// All five modes, in the order they should appear as stats-panel columns.
const MODE_LIST = ["pin", "pin-hard", "type", "type-hard", "type-strict"];
// NOTE: the "type" / "type-hard" mode ids are unchanged from before so
// saved progress/localStorage keeps working — only the display labels
// swapped: "type" (free, any-order typing) is now shown as "List",
// and "type-hard" (single highlighted target) is now shown as "Type".
// "type-strict" is a brand-new mode, separate from "type-hard": same
// single-target typing, but it always requires pressing Enter (no
// Instant Check) and treats a wrong guess as a real miss.
// Later renamed for clarity: "pin-hard" displays as "Flash" (it already
// flashes the found county instead of filling it in), and "type-strict"
// displays as "Verbatim" (it demands an exact, deliberate Enter-submitted
// guess). The underlying ids ("pin-hard", "type-strict") are untouched —
// same reason as above, so saved progress keeps working.
const MODE_LABELS = {
  pin: "Pin",
  "pin-hard": "Flash",
  type: "List",
  "type-hard": "Type",
  "type-strict": "Verbatim"
};
let activeStateKeys = [];
let selectedCounties = [];
let targetPool = [];
let currentTarget = null;
let scoreRight = 0;
let scoreWrong = 0;
let isGameActive = false;
let missedCounties = new Set();
let currentAttemptMistakes = 0;
// Total counties in play for the current game, fixed at initGame() time,
// so the "found/total" progress counter has a stable denominator even as
// targetPool shrinks.
let totalTargetsCount = 0;
// The full set of counties in play for the current game, fixed at
// initGame() time — used to render the optional List Mode sidebar
// (targetPool itself shrinks as counties are found, so it can't double
// as the "everything in this game" list on its own).
let originalTargetList = [];

// Whether the Kalawao "click here" callout (circle + line, added because
// the real Kalawao shape is tiny on the Hawaii map) has been built yet.
// It's created lazily the first time the Hawaii map is actually shown,
// since SVG getBBox() needs the element to be rendered (not display:none)
// to return real numbers.
let kalawaoCalloutCreated = false;

// Same idea as kalawaoCalloutCreated, but for the San Francisco "click
// here" callout on the California map — San Francisco's real shape is
// tiny (and boxed in by Marin, San Mateo, and Alameda) so it's just as
// hard to click at normal zoom as Kalawao is.
let sfCalloutCreated = false;


// Names that are ambiguous *within the counties currently being played*
// (e.g. "Kent" exists in both Delaware and Rhode Island). Recomputed at
// the start of every game/retry/replay via computeAmbiguousNames().
let ambiguousCountyNames = new Set();


// Given a list of counties, returns the set of county names that appear
// more than once in that list.
function computeAmbiguousNames(counties) {
  const nameCounts = {};
  counties.forEach(c => {
    nameCounts[c.name] = (nameCounts[c.name] || 0) + 1;
  });
  return new Set(Object.keys(nameCounts).filter(name => nameCounts[name] > 1));
}


// Returns "Kent" normally, or "Kent, Rhode Island" if that name is
// ambiguous in the current context.
function getDisplayName(county) {
  if (!county) return "";
  if (ambiguousCountyNames.has(county.name)) {
    const stateName = stateData[county.stateKey]?.name || county.stateKey;
    return `${county.name}, ${stateName}`;
  }
  return county.name;
}


// Same disambiguation logic as getDisplayName, but split into parts so
// the county name and the state qualifier can be styled differently
// (used by the "Find:" prompt).
function getDisplayParts(county) {
  if (!county) return { name: "", state: null };
  if (ambiguousCountyNames.has(county.name)) {
    const stateName = stateData[county.stateKey]?.name || county.stateKey;
    return { name: county.name, state: stateName };
  }
  return { name: county.name, state: null };
}


// Normalizes a typed guess for comparison: lowercase, trims, collapses
// repeated whitespace, and folds apostrophe-*like* characters (okina,
// curly quotes, backtick, acute accent) down to a single plain
// apostrophe — so it doesn't matter which mark you actually type, but
// the mark itself is still required. Kaua'i's official name (per the
// Census) uses a plain apostrophe, not an okina, but typing "kauai"
// with nothing there is still wrong.
function normalizeTypedName(str) {
  return str
    .toLowerCase()
    .replace(/[\u02BB\u2018\u2019'`´]/g, "'")
    .trim()
    .replace(/\s+/g, " ");
}


// "Type" mode match: EVERY county still left in the pool whose name
// matches, regardless of which state it's in. If two different
// counties in play happen to share a bare name (e.g. two "Kent"s from
// two active states), typing "Kent" resolves both of them at once —
// requiring the state too was deliberately left out (see the mode's
// design) so players aren't stuck typing "Washington, Rhode Island" for
// the dozens of Washington counties nationwide.
function findAllPoolMatchesByName(normalized) {
  return targetPool.filter(c => normalizeTypedName(c.name) === normalized);
}


// Returns every county the current typed guess should resolve, as an
// array (empty if it doesn't match anything). Single-target modes
// ("Type" / type-hard and "Verbatim" / type-strict) can only ever
// resolve the one highlighted county; "List" can resolve several
// counties at once if their bare names are identical.
function getTypedGuessMatches(normalized) {
  if (SINGLE_TARGET_TYPE_MODES.has(selectedMode)) {
    return (currentTarget && normalizeTypedName(currentTarget.name) === normalized)
      ? [currentTarget]
      : [];
  }
  return findAllPoolMatchesByName(normalized);
}


// Looks up a county object by its path id across ALL states (not just the
// active ones), so feedback text is always correct even mid-game.
function findCountyById(id) {
  for (const key in stateData) {
    const found = stateData[key].counties.find(c => c.id === id);
    if (found) return found;
  }
  return null;
}


// Returns every clickable DOM element that represents a given county id:
// the real map shape itself, plus any stand-in "callout" click targets
// (like the Kalawao circle) that were tagged with data-county-id pointing
// at it. Used so that a correct/wrong guess updates every representation
// of that county in sync, no matter which one was actually clicked.
function getCountyElements(id) {
  const elements = [];
  const mainEl = document.getElementById(id);
  if (mainEl) elements.push(mainEl);
  document.querySelectorAll(`[data-county-id="${id}"]`).forEach(el => {
    if (el.id !== id) elements.push(el);
  });
  return elements;
}


// --- Persistent Data Storage ---
// Per-county, per-mode "learned" flags — e.g. countyProgress["kent"].pin
// is true once Kent has been correctly guessed at least once in Pin
// mode. Drives the per-state stats panel (see below); replaces the old
// single whole-state "completed" flag so progress can be shown mode by
// mode instead of one all-or-nothing badge.
let countyProgress = JSON.parse(localStorage.getItem("countyProgress")) || {};
let countyMistakes = JSON.parse(localStorage.getItem("countyMistakes")) || {};
let gameSettings = JSON.parse(localStorage.getItem("gameSettings")) || {
  darkMode: false,
  highContrast: false,
  soundVolume: 50,
  speedrunMode: false,
  instantTypeCheck: true,
  hideStatsByDefault: true,
  listByState: true,
  sortStatesAlphabetically: false,
  scaleStatesBySize: false,
  useDividersForFewStates: true,
  statesPerRow: 2
};
// Backfills the new setting for anyone with an existing saved
// gameSettings blob from before Type mode existed.
if (gameSettings.instantTypeCheck === undefined) gameSettings.instantTypeCheck = true;
// Backfills the new setting for anyone with an existing saved
// gameSettings blob from before per-state progress tables could be
// collapsed. Defaults to ON (collapsed by default).
if (gameSettings.hideStatsByDefault === undefined) gameSettings.hideStatsByDefault = true;
// Backfills the new setting for anyone with an existing saved
// gameSettings blob from before the List Mode checklist could be
// grouped by state. Defaults to ON.
if (gameSettings.listByState === undefined) gameSettings.listByState = true;
// Backfills the new setting for anyone with an existing saved
// gameSettings blob from before states could be sorted alphabetically.
// Defaults to OFF, i.e. states keep showing in the order they were
// clicked on the setup screen, same as before this setting existed.
if (gameSettings.sortStatesAlphabetically === undefined) gameSettings.sortStatesAlphabetically = false;
// Backfills the new setting for anyone with an existing saved
// gameSettings blob from before the in-game maps could switch between
// uniform boxes and the original size-by-complexity layout. Defaults to
// OFF, i.e. every state now shows in the same-size box by default —
// the original variable-sized-with-dividers layout is opt-in.
if (gameSettings.scaleStatesBySize === undefined) gameSettings.scaleStatesBySize = false;
// Backfills the new setting for anyone with an existing saved
// gameSettings blob from before this offshoot of Scale States by Size
// existed. Defaults to ON — 3-or-fewer-state games automatically get the
// divided layout even with the main setting off, since a couple of boxes
// in a uniform grid looks sparse.
if (gameSettings.useDividersForFewStates === undefined) gameSettings.useDividersForFewStates = true;
// Backfills the new setting for anyone with an existing saved
// gameSettings blob from before the uniform grid's column count was
// configurable. Defaults to 2, matching the bigger default boxes.
if (gameSettings.statesPerRow === undefined) gameSettings.statesPerRow = 2;


// Per-state "collapsed" choice for the setup screen's progress tables.
// Keyed by stateKey; only holds an entry once the player has explicitly
// clicked that state's Hide/Show button (or Hide All) — until then,
// isStatsHidden() falls back to gameSettings.hideStatsByDefault, so
// flipping that setting immediately affects any state the player hasn't
// manually overridden yet.
let statsHiddenOverride = {};


function isStatsHidden(stateKey) {
  return Object.prototype.hasOwnProperty.call(statsHiddenOverride, stateKey)
    ? statsHiddenOverride[stateKey]
    : gameSettings.hideStatsByDefault;
}


// Returns the state keys that should currently be selected, in the order
// they should be displayed/grouped by (county checkboxes, progress
// tables, etc). By default this is just activeStateKeys as-is — i.e. the
// order the player clicked the states in on the setup screen. When
// gameSettings.sortStatesAlphabetically is on, a sorted copy is returned
// instead, so every grouped-by-state list on the setup screen shows
// states A-Z regardless of click order. Always returns a new array —
// callers are free to sort/mutate it without touching activeStateKeys.
function getOrderedStateKeys() {
  if (!gameSettings.sortStatesAlphabetically) return [...activeStateKeys];
  return [...activeStateKeys].sort((a, b) => {
    const nameA = stateData[a]?.name || a;
    const nameB = stateData[b]?.name || b;
    return nameA.localeCompare(nameB);
  });
}


// --- Navigation & Screen DOM Elements ---
const screens = document.querySelectorAll(".screen");
const btnGotoModes = document.getElementById("btn-goto-modes");
const btnGotoSettings = document.getElementById("btn-goto-settings");
const backButtons = document.querySelectorAll(".btn-back");
const modeButtons = document.querySelectorAll(".btn-mode");


// --- Setup Screen DOM Elements ---
const countyPanel = document.getElementById("county-options-panel");
const statsPanel = document.getElementById("state-stats-panel");
const statsSections = document.getElementById("state-stats-sections");
const statsDivider = document.querySelector("#screen-setup .soft-divider");
const radioSpecific = document.querySelectorAll('input[name="specific-counties"]');
const checkboxContainer = document.getElementById("checkbox-container");
const btnStartGame = document.getElementById("btn-start-game");
const suggestionBox = document.getElementById("suggestion-box");
const btnSelectSuggested = document.getElementById("btn-select-suggested");
const btnDeselectAll = document.getElementById("btn-deselect-all");
// FIX #1: there is no #state-list container in index.html — the state rows
// (#state-delaware, #state-rhode_island, ...) are already
// hardcoded in the markup. renderStateListUI() now wires up the existing rows
// instead of trying to rebuild a container that was never there.


// --- Settings DOM Elements ---
const toggleDark = document.getElementById("toggle-dark");
const toggleContrast = document.getElementById("toggle-contrast");
const sliderSound = document.getElementById("slider-sound");
const toggleSpeedrun = document.getElementById("toggle-speedrun");
const toggleInstantCheck = document.getElementById("toggle-instant-check");
const toggleHideStatsDefault = document.getElementById("toggle-hide-stats-default");
const toggleListByState = document.getElementById("toggle-list-by-state");
const toggleSortStatesAlpha = document.getElementById("toggle-sort-states-alpha");
const toggleScaleStatesBySize = document.getElementById("toggle-scale-states-by-size");
const toggleDividersForFewStates = document.getElementById("toggle-dividers-for-few-states");
const selectStatesPerRow = document.getElementById("select-states-per-row");
const btnResetProgress = document.getElementById("btn-reset-progress");


// --- Game Screen DOM Elements ---
const progressCounter = document.getElementById("progress-counter");
const targetPrompt = document.getElementById("target-prompt");
const feedbackEl = document.getElementById("feedback");
const typeInputBox = document.getElementById("type-input-box");
const typeInput = document.getElementById("type-input");
const btnQuitGame = document.getElementById("btn-quit-game");
const btnGiveUp = document.getElementById("btn-give-up");
const btnGameSettings = document.getElementById("btn-game-settings");
const btnNewGame = document.getElementById("btn-new-game");
const btnToggleCountyList = document.getElementById("btn-toggle-county-list");
const countyListPanel = document.getElementById("county-list-panel");
const countyListItems = document.getElementById("county-list-items");
const hoverTooltip = document.getElementById("county-hover-tooltip");
// NOTE: countyPaths is a `let` (not `const`) because the Kalawao callout
// circle is added to the DOM after this first query runs — once it's
// built we re-run querySelectorAll(".county") so the callout gets the
// same reset-between-games and win-state handling as every other county.
let countyPaths = document.querySelectorAll(".county");
const svgMaps = document.querySelectorAll(".state-map");


// --- Right-click / long-press-to-zoom on state maps ---
// Small counties (Kalawao, San Francisco, etc.) are hard to click
// precisely at the map's normal on-screen size, so right-clicking (or, on
// touch devices, long-pressing) any state map blows it up to a large,
// centered overlay — like a lightbox — so individual counties are easier
// to see and click. Doing the same gesture again, clicking the dimmed
// backdrop, or pressing Escape restores the normal layout. The backdrop
// element is created once here (rather than living in index.html) since
// it's purely a JS-driven UI, not meaningful markup.
const zoomBackdrop = document.createElement("div");
zoomBackdrop.className = "zoom-backdrop";
document.body.appendChild(zoomBackdrop);
let zoomedMap = null;

function exitMapZoom() {
  if (zoomedMap) {
    zoomedMap.classList.remove("zoomed");
    zoomedMap = null;
  }
  zoomBackdrop.classList.remove("active");
  // See enterMapZoom below for what this class does.
  document.body.classList.remove("map-zoomed");
}

function enterMapZoom(svg) {
  // Only one map can be zoomed at a time — swap instead of stacking.
  if (zoomedMap && zoomedMap !== svg) {
    zoomedMap.classList.remove("zoomed");
  }
  svg.classList.add("zoomed");
  zoomedMap = svg;
  zoomBackdrop.classList.add("active");
  // The zoom backdrop and the enlarged map both sit at a z-index well
  // above .prompt-box's normal one, so without this the target banner
  // gets dimmed behind the backdrop (or covered outright by the
  // enlarged map) right when you need it most — while zoomed in and
  // hunting for a specific county. This class lets style.css lift
  // .prompt-box above both of them for as long as any map is zoomed.
  document.body.classList.add("map-zoomed");
}

function toggleMapZoom(svg) {
  if (svg.classList.contains("zoomed")) {
    exitMapZoom();
  } else {
    enterMapZoom(svg);
  }
}

// How long a touch has to be held before it counts as a long press,
// matching roughly what iOS/Android treat as a "long" press themselves.
const LONG_PRESS_MS = 500;
// After our own touchstart timer above has already toggled the zoom for a
// touch, Android still goes on to fire its own native "contextmenu" event
// for that same long press a moment later. Without this guard, the
// contextmenu listener below would see that event and toggle the zoom
// straight back off again — so any contextmenu arriving shortly after our
// timer already fired for the same gesture is ignored.
const LONG_PRESS_GUARD_MS = 800;
let touchLongPressFiredAt = 0;

svgMaps.forEach(svg => {
  // --- Touch: manual long-press detection ---
  // iOS Safari has no native long-press event for a plain, non-link,
  // non-image element like this SVG — left alone, a long press on it
  // does nothing of ours at all, and the touch just falls through to the
  // browser's own default long-press handling (text selection / the
  // "callout" menu), which is what was landing on whatever nearby text
  // happened to be selectable (e.g. the "i" info button) instead of
  // zooming the map. Timing the press ourselves and calling
  // preventDefault() on the triggering touchstart (see below) sidesteps
  // both problems: it works the same on iOS and Android, and it stops
  // the browser's own long-press gesture from ever getting a chance to
  // start.
  let pressTimer = null;
  let moved = false;

  svg.addEventListener("touchstart", (e) => {
    moved = false;
    clearTimeout(pressTimer);
    pressTimer = setTimeout(() => {
      if (moved) return;
      touchLongPressFiredAt = Date.now();
      toggleMapZoom(svg);
    }, LONG_PRESS_MS);
  }, { passive: true });

  const cancelPressTimer = () => clearTimeout(pressTimer);
  // A finger sliding around (panning, or just an imprecise tap) shouldn't
  // count as holding still for a long press.
  svg.addEventListener("touchmove", () => {
    moved = true;
    cancelPressTimer();
  }, { passive: true });
  svg.addEventListener("touchend", cancelPressTimer);
  svg.addEventListener("touchcancel", cancelPressTimer);

  // --- Mouse: right-click (desktop), or Android's native long-press ---
  // Android automatically fires a synthetic "contextmenu" event on
  // long-press for most elements, which is what already made this work
  // there even before the manual touch handling above existed.
  svg.addEventListener("contextmenu", (e) => {
    e.preventDefault();
    if (Date.now() - touchLongPressFiredAt < LONG_PRESS_GUARD_MS) return;
    toggleMapZoom(svg);
  });
});

zoomBackdrop.addEventListener("click", exitMapZoom);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && zoomedMap) exitMapZoom();
});


// --- "How to Play" info button/modal (bottom-right of the play area) ---
// Content is no longer one static wall of text: the title, the intro
// paragraph, and the little "you'll see / you'll do" example all get
// swapped in based on selectedMode right when the modal opens.
const btnGameInfo = document.getElementById("btn-game-info");
const modalInfo = document.getElementById("modal-info");
const btnModalInfoClose = document.getElementById("btn-modal-info-close");

const infoModalTitle = document.getElementById("info-modal-title");
const infoModalIntro = document.getElementById("info-modal-intro");
const infoExample = document.getElementById("info-example");
const infoDemoLabel = document.getElementById("info-demo-label");
const infoDemoTarget = document.getElementById("info-demo-target");
const infoDemoTyped = document.getElementById("info-demo-typed");
const infoDemoEnter = document.getElementById("info-demo-enter");
const infoDemoCheck = document.getElementById("info-demo-check");

const INFO_MODE_CONFIG = {
  pin: {
    title: "How to Play: Pin",
    intro: "Click (or tap) the county you're asked to find. Once you find it, it stays filled in on the map.",
    demo: "pin",
    word: "Sonoma",
  },
  "pin-hard": {
    title: "How to Play: Flash",
    intro: "Click (or tap) the county you're asked to find. It flashes briefly, then goes back to blank.",
    demo: "pin-hard",
    word: "Sonoma",
  },
  type: {
    title: "How to Play: List",
    intro: "Type any county's name, in any order, and see how many you can list.",
    demo: "list",
    word: "Sonoma",
  },
  "type-hard": {
    title: "How to Play: Type",
    intro: "A county lights up on the map. Type its name to guess it.",
    demo: "type-hard",
    word: "Sonoma",
  },
  "type-strict": {
    title: "How to Play: Verbatim",
    intro: "A county lights up on the map. Type its name, then press Enter to submit. Wrong guesses count against you.",
    demo: "type-strict",
    word: "Sonoma",
  },
};

// Drives the looping typed-word demo used by List/Type/Verbatim. Not a
// CSS animation like the click demo, since the word (and, for
// Verbatim, an extra "press Enter" beat) has to be spelled out one
// character at a time.
let infoTypeTimer = null;
function stopInfoTypeDemo() {
  if (infoTypeTimer) {
    clearTimeout(infoTypeTimer);
    infoTypeTimer = null;
  }
}
function runInfoTypeDemo(word, demo) {
  stopInfoTypeDemo();
  if (!infoDemoTyped) return;
  let i = 0;

  function typeNext() {
    infoDemoTyped.textContent = word.slice(0, i);
    if (infoDemoEnter) infoDemoEnter.classList.remove("show");
    if (infoDemoCheck) infoDemoCheck.classList.remove("show");
    if (i < word.length) {
      i++;
      infoTypeTimer = setTimeout(typeNext, 140);
      return;
    }
    // Word fully typed. Verbatim needs an extra "press Enter" beat
    // before it counts; the other typing modes check instantly.
    if (demo === "type-strict") {
      infoTypeTimer = setTimeout(() => {
        if (infoDemoEnter) infoDemoEnter.classList.add("show");
        infoTypeTimer = setTimeout(showCheckThenReset, 550);
      }, 350);
    } else {
      infoTypeTimer = setTimeout(showCheckThenReset, 300);
    }
  }
  function showCheckThenReset() {
    if (infoDemoCheck) infoDemoCheck.classList.add("show");
    infoTypeTimer = setTimeout(() => {
      infoDemoTyped.textContent = "";
      if (infoDemoEnter) infoDemoEnter.classList.remove("show");
      if (infoDemoCheck) infoDemoCheck.classList.remove("show");
      i = 0;
      infoTypeTimer = setTimeout(typeNext, 500);
    }, 850);
  }

  typeNext();
}

function openInfoModalForMode(mode) {
  const cfg = INFO_MODE_CONFIG[mode] || INFO_MODE_CONFIG.pin;

  if (infoModalTitle) infoModalTitle.textContent = cfg.title;
  if (infoModalIntro) infoModalIntro.textContent = cfg.intro;
  if (infoExample) infoExample.setAttribute("data-demo", cfg.demo);

  if (infoDemoLabel) {
    infoDemoLabel.textContent = cfg.demo === "list" ? "Find any county" : "Find:";
  }
  if (infoDemoTarget) {
    infoDemoTarget.textContent = cfg.word;
    infoDemoTarget.classList.toggle("hidden", cfg.demo === "list");
  }

  // Click-based modes (Pin/Flash) animate purely via CSS on an infinite
  // loop, restarting naturally each time the modal goes from
  // display:none back to visible. Typing-based modes (List/Type/
  // Verbatim) need the JS-driven loop above instead.
  if (cfg.demo === "type-hard" || cfg.demo === "type-strict" || cfg.demo === "list") {
    runInfoTypeDemo(cfg.word, cfg.demo);
  } else {
    stopInfoTypeDemo();
  }
}

function closeInfoModal() {
  if (modalInfo) modalInfo.classList.add("hidden");
  stopInfoTypeDemo();
}

if (btnGameInfo && modalInfo) {
  btnGameInfo.addEventListener("click", () => {
    openInfoModalForMode(selectedMode);
    modalInfo.classList.remove("hidden");
  });
}
if (btnModalInfoClose && modalInfo) {
  btnModalInfoClose.addEventListener("click", closeInfoModal);
}
// Clicking the dimmed backdrop closes it too, same as the other modals —
// .modal already stretches to fill the viewport, so a click anywhere
// outside .modal-content is a click on the modal itself.
if (modalInfo) {
  modalInfo.addEventListener("click", (e) => {
    if (e.target === modalInfo) closeInfoModal();
  });
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modalInfo && !modalInfo.classList.contains("hidden")) {
    closeInfoModal();
  }
});


// Which screen (and, if relevant, which finished-game overlay) the
// Settings "Back" button should return to. Defaults to Home, but is set
// to "screen-game" whenever Settings is opened from mid-game (the header
// button, the summary modal, or the Admire bar) so adjusting a toggle
// doesn't quietly abandon the running game. settingsReturnOverlay tracks
// whether the summary modal or the Admire bar needs to be re-shown once
// Settings closes, since those are hidden (not screens) and would
// otherwise vanish for good — leaving the player stuck with no way to
// start a new game. FIX: settingsBackButton previously wasn't declared
// anywhere, which made every openSettings() call throw and silently
// abort before showScreen("screen-settings") ever ran.
let settingsReturnScreen = "screen-home";
let settingsReturnOverlay = null; // "modal" | "admire" | null
const settingsBackButton = document.querySelector("#screen-settings .btn-back");


function openSettings(returnScreen, returnOverlay = null) {
  settingsReturnScreen = returnScreen;
  settingsReturnOverlay = returnOverlay;
  if (settingsBackButton) {
    settingsBackButton.textContent = returnScreen === "screen-game" ? "Back to Game" : "Back to Home";
  }
  showScreen("screen-settings");
}


// --- Modal Summary DOM Elements ---
const modalSummary = document.getElementById("modal-summary");
const summaryPercentage = document.getElementById("summary-percentage");
const summaryGradeTitle = document.getElementById("summary-grade-title");
const summaryMessage = document.getElementById("summary-message");
const summaryMissedSection = document.getElementById("summary-missed-section");
const summaryMissedList = document.getElementById("summary-missed-list");
// FIX: was document.querySelector(".modal-actions"), which grabs the
// FIRST .modal-actions in the whole document — that's modal-info's (the
// "How to Play" popup), not this one. showSummaryModal() was building
// its buttons into the wrong modal, leaving the actual summary popup's
// buttons dead with no click handlers at all.
const modalActions = document.getElementById("modal-summary-actions");


// --- Bottom Admire Bar DOM Elements ---
const admireBar = document.getElementById("admire-bar");
const admirePercentage = document.getElementById("admire-percentage");
const admireText = document.getElementById("admire-text");
const btnAdmireRetry = document.getElementById("btn-admire-retry");
const btnAdmireReplay = document.getElementById("btn-admire-replay");
const btnAdmireSettings = document.getElementById("btn-admire-settings");
const btnAdmireHome = document.getElementById("btn-admire-home");


// --- Audio Synthesis Helper (No external assets required) ---
function playSound(type) {
  if (!gameSettings.soundVolume || gameSettings.soundVolume <= 0) return;
  const vol = gameSettings.soundVolume / 100; // 0–1 scale applied to gain
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);


    if (type === "correct") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1); // A5
      gain.gain.setValueAtTime(0.1 * vol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } else if (type === "wrong") {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(220, ctx.currentTime); // A3
      osc.frequency.setValueAtTime(164.81, ctx.currentTime + 0.1); // E3
      gain.gain.setValueAtTime(0.12 * vol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    }
  } catch (e) {
    console.warn("Web Audio API not supported or blocked by user gesture.", e);
  }
}


// --- Theme Initialization & Preference Sync ---
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");


function applySettings() {
  if (toggleDark) toggleDark.checked = gameSettings.darkMode;
  if (toggleContrast) toggleContrast.checked = gameSettings.highContrast;
  if (sliderSound) sliderSound.value = gameSettings.soundVolume;
  if (toggleSpeedrun) toggleSpeedrun.checked = gameSettings.speedrunMode;
  if (toggleInstantCheck) toggleInstantCheck.checked = gameSettings.instantTypeCheck;
  if (toggleHideStatsDefault) toggleHideStatsDefault.checked = gameSettings.hideStatsByDefault;
  if (toggleListByState) toggleListByState.checked = gameSettings.listByState;
  if (toggleSortStatesAlpha) toggleSortStatesAlpha.checked = gameSettings.sortStatesAlphabetically;
  if (toggleScaleStatesBySize) toggleScaleStatesBySize.checked = gameSettings.scaleStatesBySize;
  if (toggleDividersForFewStates) toggleDividersForFewStates.checked = gameSettings.useDividersForFewStates;
  if (selectStatesPerRow) selectStatesPerRow.value = String(gameSettings.statesPerRow);


  document.body.classList.toggle("dark-mode", gameSettings.darkMode);
  document.body.classList.toggle("high-contrast", gameSettings.highContrast);
  updateMapLayoutMode();
  updateMapGridColumns();
}


function initTheme() {
  const savedDark = localStorage.getItem("darkMode");
  if (savedDark !== null) {
    gameSettings.darkMode = JSON.parse(savedDark);
  } else {
    gameSettings.darkMode = systemPrefersDark.matches;
  }
  applySettings();
}


initTheme();
renderStateListUI();


if (systemPrefersDark) {
  systemPrefersDark.addEventListener("change", (e) => {
    if (localStorage.getItem("darkMode") === null) {
      gameSettings.darkMode = e.matches;
      applySettings();
    }
  });
}


// --- Screen Navigation ---
const appContainer = document.querySelector(".app-container");
function showScreen(screenId) {
  screens.forEach(s => s.classList.remove("active"));
  const activeScreen = document.getElementById(screenId);
  if (activeScreen) {
    activeScreen.classList.add("active");
    activeScreen.focus();
  }
  // Leaving the game screen (or restarting within it) should never leave
  // a map stuck zoomed-in with its backdrop still covering everything.
  exitMapZoom();
  // The county-list sidebar now lives outside .app-container as its own
  // card, so it's no longer a descendant of screen-game and doesn't get
  // hidden automatically when another screen becomes active — force it
  // closed any time we're not on the game screen.
  if (countyListPanel && screenId !== "screen-game") {
    countyListPanel.classList.add("hidden");
  }
  // Give the app-container extra horizontal room on the game screen when
  // more than one state's map is in play, so the maps spread out sideways
  // before wrapping to a new row instead of always stacking straight down.
  // Only applies on screen-game itself — every other screen (setup,
  // settings, etc.) keeps the normal narrow card width.
  // FIX: California alone was staying in the default narrow card (no
  // "> 1" states selected), which caps out well under #svg-california's
  // own max-width — so it rendered smaller than intended instead of
  // bigger. California needs the wide card even solo, since it's sized
  // for far more room than the other three states.
  if (appContainer) {
    appContainer.classList.toggle(
      "wide-map",
      screenId === "screen-game" &&
        (activeStateKeys.length > 1 ||
          activeStateKeys.includes("california") ||
          activeStateKeys.includes("texas"))
    );
    // A separate, narrower flag from "wide-map" above: California's extra-
    // large sizing (see #svg-california in style.css) is only meant for
    // when it's the ONLY map on screen. With other states also in play it
    // was ballooning past the room the other maps need, so that bigger
    // sizing now only applies under this class.
    appContainer.classList.toggle(
      "solo-california",
      screenId === "screen-game" &&
        activeStateKeys.length === 1 &&
        activeStateKeys[0] === "california"
    );
    // Same idea for Texas — 254 counties packed in tight, so it needs at
    // least as much solo room as California, if not more.
    appContainer.classList.toggle(
      "solo-texas",
      screenId === "screen-game" &&
        activeStateKeys.length === 1 &&
        activeStateKeys[0] === "texas"
    );
    // Same pattern as the three toggles above, but for the settings
    // screen's own two-column layout (see .settings-layout in style.css) —
    // it needs more horizontal room than the normal narrow card to fit
    // the table-of-contents sidebar beside the settings list.
    appContainer.classList.toggle("wide-settings", screenId === "screen-settings");
  }
}


if (btnGotoModes) btnGotoModes.addEventListener("click", () => showScreen("screen-modes"));
if (btnGotoSettings) {
  btnGotoSettings.addEventListener("click", () => openSettings("screen-home"));
}


// Opens Settings from mid-game without losing the running game — the
// Settings screen's back button (below) will say "Back to Game" and
// send the player back to screen-game instead of screen-home here.
if (btnGameSettings) {
  btnGameSettings.addEventListener("click", () => openSettings("screen-game"));
}


backButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const parentScreen = btn.closest(".screen");
    if (parentScreen && parentScreen.id === "screen-settings") {
      showScreen(settingsReturnScreen);


      // Re-show whichever overlay was open when Settings was launched,
      // so the player still has Play Again / Retry / Home available
      // instead of being stranded with only Quit in the header.
      if (settingsReturnOverlay === "modal" && modalSummary) {
        modalSummary.classList.remove("hidden");
      } else if (settingsReturnOverlay === "admire" && admireBar) {
        admireBar.classList.remove("hidden");
      }


      settingsReturnScreen = "screen-home";
      settingsReturnOverlay = null;
      if (settingsBackButton) settingsBackButton.textContent = "Back to Home";
    } else {
      showScreen(btn.dataset.target);
    }
  });
});


modeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    selectedMode = btn.dataset.mode || "pin";
    showScreen("screen-setup");
  });
});


// --- Settings Screen Handlers ---
if (toggleDark) {
  toggleDark.addEventListener("change", (e) => {
    gameSettings.darkMode = e.target.checked;
    localStorage.setItem("darkMode", JSON.stringify(gameSettings.darkMode));
    localStorage.setItem("gameSettings", JSON.stringify(gameSettings));
    applySettings();
  });
}


if (toggleContrast) {
  toggleContrast.addEventListener("change", (e) => {
    gameSettings.highContrast = e.target.checked;
    localStorage.setItem("gameSettings", JSON.stringify(gameSettings));
    applySettings();
  });
}


if (sliderSound) {
  sliderSound.addEventListener("input", (e) => {
    gameSettings.soundVolume = Number(e.target.value);
    localStorage.setItem("gameSettings", JSON.stringify(gameSettings));
  });
}


if (toggleSpeedrun) {
  toggleSpeedrun.addEventListener("change", (e) => {
    gameSettings.speedrunMode = e.target.checked;
    localStorage.setItem("gameSettings", JSON.stringify(gameSettings));
  });
}


if (toggleInstantCheck) {
  toggleInstantCheck.addEventListener("change", (e) => {
    gameSettings.instantTypeCheck = e.target.checked;
    localStorage.setItem("gameSettings", JSON.stringify(gameSettings));
  });
}


if (toggleHideStatsDefault) {
  toggleHideStatsDefault.addEventListener("change", (e) => {
    gameSettings.hideStatsByDefault = e.target.checked;
    localStorage.setItem("gameSettings", JSON.stringify(gameSettings));
    renderStatsPanel(); // re-render so states without a manual override pick up the new default right away
  });
}


if (toggleListByState) {
  toggleListByState.addEventListener("change", (e) => {
    gameSettings.listByState = e.target.checked;
    localStorage.setItem("gameSettings", JSON.stringify(gameSettings));
    // Re-render immediately if the checklist happens to be open right now.
    renderCountyListPanel();
  });
}


if (toggleSortStatesAlpha) {
  toggleSortStatesAlpha.addEventListener("change", (e) => {
    gameSettings.sortStatesAlphabetically = e.target.checked;
    localStorage.setItem("gameSettings", JSON.stringify(gameSettings));
    // Re-render both setup-screen lists immediately so the new order
    // shows up right away instead of waiting for the next state click.
    renderCountyCheckboxes();
    renderStatsPanel();
    // Also reorder the in-game maps right away — in case this was
    // toggled from the game screen's own Settings button mid-game.
    applyMapDomOrder();
  });
}


if (toggleScaleStatesBySize) {
  toggleScaleStatesBySize.addEventListener("change", (e) => {
    gameSettings.scaleStatesBySize = e.target.checked;
    localStorage.setItem("gameSettings", JSON.stringify(gameSettings));
    // Flip the body class immediately so the switch between uniform
    // boxes and the original size-by-complexity layout shows up right
    // away, even if this was toggled mid-game from the in-game Settings
    // button rather than before a game starts. Routed through
    // updateMapLayoutMode() rather than toggling the class directly here,
    // since "Use Dividers for Few States" can also demand the divided
    // layout even while this setting is off.
    updateMapLayoutMode();
  });
}


if (toggleDividersForFewStates) {
  toggleDividersForFewStates.addEventListener("change", (e) => {
    gameSettings.useDividersForFewStates = e.target.checked;
    localStorage.setItem("gameSettings", JSON.stringify(gameSettings));
    // Same live-update reasoning as the "Scale States by Size" listener
    // above — this setting can flip the divided-vs-uniform layout on its
    // own, independent of that one.
    updateMapLayoutMode();
  });
}


if (selectStatesPerRow) {
  selectStatesPerRow.addEventListener("change", (e) => {
    gameSettings.statesPerRow = parseInt(e.target.value, 10) || 2;
    localStorage.setItem("gameSettings", JSON.stringify(gameSettings));
    // Re-apply immediately so the grid re-flows right away if this was
    // changed mid-game from the in-game Settings button.
    updateMapGridColumns();
  });
}


if (btnResetProgress) {
btnResetProgress.addEventListener("click", () => {
  if (confirm("Are you sure you want to reset all saved progress and mistakes?")) {
    countyProgress = {};
    countyMistakes = {};
    statsHiddenOverride = {};
    localStorage.removeItem("countyProgress");
    localStorage.removeItem("countyMistakes");
    renderStateListUI();
    renderCountyCheckboxes(); // redraw checkboxes so mistake badges clear too
    renderStatsPanel();
    if (suggestionBox) suggestionBox.classList.add("hidden"); // stale "top 5 missed" no longer applies
    alert("Progress and mistake history reset successfully!");
  }
});
}


// --- Settings Table of Contents ---
// Each caret button only expands/collapses its section's sub-list (see
// .toc-items in style.css) — it's a separate element from the section
// name link right beside it specifically so a click on one never also
// triggers the other; a link nested inside a native <summary>-style
// disclosure widget would make "navigate" and "expand" the same click,
// which isn't what's wanted here.
document.querySelectorAll(".toc-caret").forEach(caret => {
  caret.addEventListener("click", () => {
    const list = document.getElementById(caret.getAttribute("aria-controls"));
    if (!list) return;
    const nowExpanded = caret.getAttribute("aria-expanded") !== "true";
    caret.setAttribute("aria-expanded", String(nowExpanded));
    list.classList.toggle("collapsed", !nowExpanded);
  });
});


// Section names and individual setting names both just scroll the target
// into view — smoothly, and clear of the sticky top edge — rather than
// jumping straight there the way a plain #anchor link would. preventDefault()
// here also stops a section-name click from being misread as a click on its
// enclosing .toc-section-row that should toggle the caret; the two are
// wired independently (see above), so this only ever does the scroll.
document.querySelectorAll(".toc-section-link, .toc-item-link").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").slice(1);
    const target = document.getElementById(targetId);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    // Only individual settings (not whole sections) get the brief
    // highlight flash — a whole section landing at the top of the
    // viewport is already obvious without one.
    if (target.classList.contains("setting-item")) {
      target.classList.remove("toc-highlight");
      // Force a reflow so re-adding the class restarts the animation even
      // if the same setting was just clicked again a moment ago.
      void target.offsetWidth;
      target.classList.add("toc-highlight");
    }
  });
});


// --- Dynamic State Selector UI ---
// FIX #1: previously this function bailed out immediately because
// document.getElementById("state-list") returned null (no such element
// exists in index.html), so none of the click/keydown handlers below it
// were ever attached anywhere. Now it looks up each *existing* state row
// (#state-delaware, #state-rhode_island, ...) by id and wires it up in
// place, leaving the static WIP rows untouched.
function renderStateListUI() {
  Object.keys(stateData).forEach(stateKey => {
    const state = stateData[stateKey];
    const stateRow = document.getElementById(`state-${stateKey}`);
    if (!stateRow) return;


    const isSelected = activeStateKeys.includes(stateKey);

    stateRow.classList.toggle("selected", isSelected);
    stateRow.setAttribute("tabindex", "0");
    stateRow.setAttribute("role", "button");
    stateRow.setAttribute("aria-pressed", isSelected);


    // Only attach listeners once per row, even though this function can
    // run again later (e.g. after a progress reset).
    if (stateRow.dataset.listenerAttached === "true") return;
    stateRow.dataset.listenerAttached = "true";


    // Toggle this state in/out of the active set — lets more than one
    // state be selected at once, so both maps can show and both counties
    // pools get combined. Also refreshes the stats panel, which always
    // shows every currently-selected state.
    const toggleState = () => {
      const idx = activeStateKeys.indexOf(stateKey);
      if (idx === -1) {
        activeStateKeys.push(stateKey);
        stateRow.classList.add("selected");
        stateRow.setAttribute("aria-pressed", "true");
      } else {
        activeStateKeys.splice(idx, 1);
        stateRow.classList.remove("selected");
        stateRow.setAttribute("aria-pressed", "false");
      }


      renderCountyCheckboxes();
      if (countyPanel) {
        countyPanel.classList.toggle("hidden", activeStateKeys.length === 0);
      }
      updateSetupPlayButton();
      switchVisibleSvgMap();
      renderStatsPanel();
    };


    stateRow.addEventListener("click", toggleState);
    stateRow.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleState();
      }
    });
  });
}


// --- Per-County, Per-Mode Learning Stats ---
function isCountyLearned(countyId, mode) {
  return !!(countyProgress[countyId] && countyProgress[countyId][mode]);
}


// Marks a county learned for whichever mode it was just correctly
// guessed in. Idempotent (re-marking an already-learned county/mode
// pair is a no-op) so it's safe to call on every correct guess without
// spamming localStorage writes.
function markCountyLearned(countyId, mode) {
  if (isCountyLearned(countyId, mode)) return;
  if (!countyProgress[countyId]) countyProgress[countyId] = {};
  countyProgress[countyId][mode] = true;
  localStorage.setItem("countyProgress", JSON.stringify(countyProgress));
  renderStatsPanel();
}


// Renders one stats section (state name header + per-mode/per-county
// table) for every currently-selected state, back to back — the same
// grouping order renderCountyCheckboxes() uses (click order, or
// alphabetical if gameSettings.sortStatesAlphabetically is on — see
// getOrderedStateKeys()). Hidden entirely when nothing is selected. Each
// state's table can be individually collapsed via its Hide/Show button
// (or all at once via Hide All) — see isStatsHidden()/statsHiddenOverride
// above.
function renderStatsPanel() {
  if (!statsPanel || !statsSections) return;

  if (activeStateKeys.length === 0) {
    statsPanel.classList.add("hidden");
    if (statsDivider) statsDivider.classList.add("hidden");
    statsSections.innerHTML = "";
    return;
  }

  const headerCells = MODE_LIST.map(mode => `<th>${MODE_LABELS[mode]}</th>`).join("");

  const stateSections = getOrderedStateKeys().map(stateKey => {
    const state = stateData[stateKey];
    if (!state) return "";

    const sortedCounties = [...state.counties].sort((a, b) => a.name.localeCompare(b.name));
    const total = sortedCounties.length;
    const hidden = isStatsHidden(stateKey);

    const summaryCells = MODE_LIST.map(mode => {
      const learnedCount = sortedCounties.filter(c => isCountyLearned(c.id, mode)).length;
      const complete = learnedCount === total;
      const label = complete ? "Completed" : `${learnedCount}/${total} learned`;
      return `<td class="stats-summary-cell${complete ? " stats-complete" : ""}">${label}</td>`;
    }).join("");

    const countyRows = sortedCounties.map(c => {
      const cells = MODE_LIST.map(mode => {
        const learned = isCountyLearned(c.id, mode);
        return `<td class="stats-check-cell ${learned ? "stats-yes" : "stats-no"}" aria-label="${learned ? "Learned" : "Not learned"}">${learned ? "✓" : "✗"}</td>`;
      }).join("");
      return `<tr><td class="stats-county-name">${c.name}</td>${cells}</tr>`;
    }).join("");

    return `
      <div class="stats-state-header">
        <span class="stats-state-name">${state.name}</span>
        <button type="button" class="btn-secondary btn-stats-toggle" data-state-key="${stateKey}" aria-expanded="${!hidden}">${hidden ? "Show" : "Hide"}</button>
      </div>
      ${hidden ? "" : `
      <div class="stats-table-wrap">
        <table class="stats-table">
          <thead>
            <tr><th></th>${headerCells}</tr>
          </thead>
          <tbody>
            <tr class="stats-summary-row"><td></td>${summaryCells}</tr>
            ${countyRows}
          </tbody>
        </table>
      </div>
      `}
    `;
  }).join("");

  statsSections.innerHTML = stateSections;

  statsPanel.classList.remove("hidden");
  if (statsDivider) statsDivider.classList.remove("hidden");
}


// Single delegated listener for the Hide/Show buttons rendered inside
// the stats panel — attached once here (rather than re-bound on every
// renderStatsPanel() call) since the buttons themselves are recreated
// each time statsPanel.innerHTML is replaced.
if (statsPanel) {
  statsPanel.addEventListener("click", (e) => {
    const hideAllBtn = e.target.closest("#btn-hide-all-stats");
    if (hideAllBtn) {
      activeStateKeys.forEach(stateKey => { statsHiddenOverride[stateKey] = true; });
      renderStatsPanel();
      return;
    }

    const toggleBtn = e.target.closest(".btn-stats-toggle");
    if (toggleBtn) {
      const stateKey = toggleBtn.dataset.stateKey;
      statsHiddenOverride[stateKey] = !isStatsHidden(stateKey);
      renderStatsPanel();
    }
  });
}


// Builds a "click here" stand-in for a county whose real shape is too
// tiny to click reliably at normal zoom: a circle placed out in open
// water plus a line pointing at the real shape. Uses getBBox() to find
// the real position/size, so it's positioned correctly no matter the
// exact path geometry — this only runs once the target SVG is actually
// visible in the DOM (getBBox needs a rendered element).
//
// `key` is a short identifier (e.g. "kalawao", "sf") used to namespace
// the generated element ids/classes so multiple callouts on different
// maps don't collide. `offsetX`/`offsetY` place the callout circle
// relative to the real shape's center, in the target SVG's own
// coordinate system (i.e. viewBox units, not screen pixels) — pick a
// spot that's open water/blank space on that particular map.
// `radiusPadding` is added on top of the real shape's own size to get
// the callout circle's radius; how much "extra" room it needs depends
// on that map's own coordinate scale, so it's passed in per-county
// rather than derived from the offset.
function setupCountyCallout(targetSvg, countyId, key, offsetX, offsetY, radiusPadding, stopShort) {
  const countyPath = document.getElementById(countyId);
  if (!countyPath || !targetSvg) return false;

  let bbox;
  try {
    bbox = countyPath.getBBox();
  } catch (e) {
    return false; // Bail quietly if the browser can't compute it yet.
  }
  if (!bbox || (bbox.width === 0 && bbox.height === 0)) return false;

  const cx = bbox.x + bbox.width / 2;
  const cy = bbox.y + bbox.height / 2;

  const calloutX = cx + offsetX;
  const calloutY = cy + offsetY;
  const calloutRadius = Math.max(bbox.width, bbox.height) * 1.6 + radiusPadding;

  // Stop the shaft just shy of the real county's actual center — close
  // enough that the arrowhead reads as touching the shape, not just
  // gesturing vaguely toward the middle of the strait.
  const dx = cx - calloutX;
  const dy = cy - calloutY;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const ux = dx / dist;
  const uy = dy / dist;
  const tipX = cx - ux * stopShort;
  const tipY = cy - uy * stopShort;

  // Start the shaft at the circle's EDGE, not its center — the circle's
  // radius is large enough relative to the total distance to the real
  // shape that starting from dead-center would leave the circle covering
  // almost the entire line, hiding the shaft with only the arrowhead
  // poking out (or not even that).
  const startX = calloutX + ux * calloutRadius;
  const startY = calloutY + uy * calloutRadius;

  const svgNS = "http://www.w3.org/2000/svg";
  const targetGroup = targetSvg.querySelector("g") || targetSvg;

  // Arrowhead marker, defined once and referenced by the line below via
  // marker-end. markerUnits="strokeWidth" (the default) means its size
  // automatically scales with the line's own stroke-width, so it stays
  // proportional to the shaft without needing separate tuning per state.
  let defs = targetSvg.querySelector("defs");
  if (!defs) {
    defs = document.createElementNS(svgNS, "defs");
    targetSvg.insertBefore(defs, targetSvg.firstChild);
  }
  const arrowheadId = `${key}-arrowhead`;
  if (!document.getElementById(arrowheadId)) {
    const marker = document.createElementNS(svgNS, "marker");
    marker.setAttribute("id", arrowheadId);
    marker.setAttribute("markerWidth", "8");
    marker.setAttribute("markerHeight", "8");
    marker.setAttribute("refX", "6.5");
    marker.setAttribute("refY", "4");
    marker.setAttribute("orient", "auto-start-reverse");
    const arrowHead = document.createElementNS(svgNS, "path");
    arrowHead.setAttribute("d", "M0,0 L8,4 L0,8 Z");
    arrowHead.setAttribute("class", `${key}-arrowhead-fill`);
    marker.appendChild(arrowHead);
    defs.appendChild(marker);
  }

  const line = document.createElementNS(svgNS, "line");
  line.setAttribute("x1", startX);
  line.setAttribute("y1", startY);
  line.setAttribute("x2", tipX);
  line.setAttribute("y2", tipY);
  line.setAttribute("class", `${key}-callout-line`);
  line.setAttribute("marker-end", `url(#${arrowheadId})`);
  line.setAttribute("pointer-events", "none");
  targetGroup.appendChild(line);

  const countyName = countyPath.getAttribute("data-name") || countyId;
  const circle = document.createElementNS(svgNS, "circle");
  circle.setAttribute("cx", calloutX);
  circle.setAttribute("cy", calloutY);
  circle.setAttribute("r", calloutRadius);
  circle.setAttribute("id", `${key}-callout`);
  circle.setAttribute("class", `county ${key}-callout`);
  circle.setAttribute("data-county-id", countyId);
  circle.setAttribute("data-name", countyName);
  circle.setAttribute("tabindex", "0");
  circle.setAttribute("role", "button");
  circle.setAttribute("aria-label", `${countyName} County (click here — the real county outline is very small)`);
  targetGroup.appendChild(circle);

  // Re-collect every ".county" element so the new circle gets reset
  // between games and included in the "all correct" win state exactly
  // like every other county, then wire up its click/tap/keyboard handling.
  countyPaths = document.querySelectorAll(".county");
  bindCountyInteractivity(circle);
  return true;
}


// Physically reorders the .map-box elements (each one wrapping a single
// state's <svg class="state-map">) inside .map-wrapper so the maps
// you're actually playing with line up the same way the rest of the app
// orders states: click order (the order you selected states in on the
// setup screen — activeStateKeys, as-is) by default, or alphabetically
// if gameSettings.sortStatesAlphabetically is on. States that aren't
// currently selected are appended after, in no particular order —
// they're hidden, so their relative order doesn't affect anything on
// screen.
//
// This is a real DOM reorder (via appendChild, which moves rather than
// clones a node) rather than a CSS "order" trick, because
// switchVisibleSvgMap()'s divider logic below reads actual DOM order to
// figure out which maps sit side by side (relevant when the "Scale
// States by Size" setting is on) — a CSS-only reorder would desync the
// two and put dividers in the wrong place. Moving the .map-box (rather
// than the <svg> directly) keeps each map inside its own box wrapper
// intact — moving the svg alone would rip it out of its box.
function applyMapDomOrder() {
  const wrapper = document.querySelector(".map-wrapper");
  if (!wrapper) return;
  const activeOrdered = gameSettings.sortStatesAlphabetically
    ? [...activeStateKeys].sort((a, b) =>
        (stateData[a]?.name || a).localeCompare(stateData[b]?.name || b)
      )
    : [...activeStateKeys];
  const inactive = Object.keys(stateData).filter(key => !activeStateKeys.includes(key));
  [...activeOrdered, ...inactive].forEach(key => {
    const svg = document.getElementById(stateData[key]?.svgId);
    const box = svg?.closest(".map-box") || svg;
    if (box) wrapper.appendChild(box);
  });
}


// True if the in-game maps should use the original variable-sized,
// divided layout (body.scale-states-by-size) instead of the default
// uniform-box grid. This is the case either because "Scale States by
// Size" itself is on, or — when that's off — because "Use Dividers for
// Few States" is on (its default) and there are 3 or fewer active
// states, where a barely-populated uniform grid tends to look sparser
// than the divided layout. Zero active states (nothing selected yet)
// doesn't count as "few states" here, since there's nothing to lay out
// either way.
function shouldUseDividerLayout() {
  if (gameSettings.scaleStatesBySize) return true;
  return (
    gameSettings.useDividersForFewStates &&
    activeStateKeys.length > 0 &&
    activeStateKeys.length <= 3
  );
}


// Keeps body.scale-states-by-size in sync with shouldUseDividerLayout().
// Called any time either of the two settings it depends on changes, or
// the active state selection changes (see switchVisibleSvgMap()), so
// e.g. selecting a 4th state while "Use Dividers for Few States" is on
// switches the game screen from the divided layout to the uniform grid
// live, without needing a page reload.
function updateMapLayoutMode() {
  document.body.classList.toggle("scale-states-by-size", shouldUseDividerLayout());
}


// Keeps .map-wrapper's --states-per-row custom property (see .map-wrapper
// in style.css) in sync with the "States Per Row" setting, capped at the
// number of states actually active — e.g. a "2 per row" setting with only
// 1 state selected collapses to a single column so that one box grows to
// fill the row, instead of sitting at half width beside an empty track.
// Only meaningful for the uniform grid layout; harmless to keep updated
// even while the divided layout (see updateMapLayoutMode()) is showing,
// since that layout doesn't use CSS grid at all.
function updateMapGridColumns() {
  const wrapper = document.querySelector(".map-wrapper");
  if (!wrapper) return;
  const cappedByActiveCount = activeStateKeys.length > 0
    ? Math.min(gameSettings.statesPerRow, activeStateKeys.length)
    : gameSettings.statesPerRow;
  wrapper.style.setProperty("--states-per-row", Math.max(1, cappedByActiveCount));
}


function switchVisibleSvgMap() {
  // The active state selection is what both of these depend on, and this
  // is the one function guaranteed to run any time that selection changes
  // (a state gets toggled on the setup screen, or a game is started) —
  // see its call sites.
  updateMapLayoutMode();
  updateMapGridColumns();
  applyMapDomOrder();

  // Re-query rather than reuse the module-level svgMaps NodeList: that
  // NodeList is a snapshot taken once at load, so its internal order
  // wouldn't reflect any reordering applyMapDomOrder() just did.
  const currentSvgMaps = document.querySelectorAll(".state-map");

  currentSvgMaps.forEach(map => {
    map.style.display = "none";
    map.classList.add("hidden");
    map.classList.remove("map-divider", "map-divider-top");
    // The .map-box wrapper (see index.html) needs to be hidden along
    // with its svg — otherwise an inactive state would still render as
    // an empty box/tile in the uniform grid layout, since the box's own
    // border/shadow/aspect-ratio don't depend on whether its child svg
    // is visible.
    const box = map.closest(".map-box");
    if (box) box.classList.add("hidden");
  });


  const visibleMaps = [];
  activeStateKeys.forEach(key => {
    const targetSvg = document.getElementById(stateData[key]?.svgId);
    if (targetSvg) {
      targetSvg.style.display = "block";
      targetSvg.classList.remove("hidden");
      const box = targetSvg.closest(".map-box");
      if (box) box.classList.remove("hidden");
      visibleMaps.push(targetSvg);


      // setupCountyCallout() needs the target SVG to actually be
      // rendered (getBBox() only works on visible elements), but this
      // can run while we're still on the setup screen — before
      // #screen-game (and this SVG) is actually shown. If it bails out
      // early for that reason, only its own return value tells us so;
      // kalawaoCalloutCreated/sfCalloutCreated must stay false so the
      // very next call (once the screen is genuinely visible) tries
      // again instead of silently giving up forever.
      if (key === "hawaii" && !kalawaoCalloutCreated) {
        // Open ocean north of Moloka'i, clear of every other island —
        // pulled out further from the real shape than a first pass so
        // the leader line actually reads as a line pointing to a
        // distant marker, rather than a circle sitting right on top of
        // the coastline with the arrowhead barely poking out.
        kalawaoCalloutCreated = setupCountyCallout(targetSvg, "kalawao", "kalawao", -3000, -6800, 350, 150);
      }
      if (key === "california" && !sfCalloutCreated) {
        // Open Pacific water just west of the city, clear of Marin
        // (north), San Mateo (south), and Alameda (east) — the three
        // counties boxing San Francisco in and making its real shape
        // easy to miss at normal zoom.
        sfCalloutCreated = setupCountyCallout(targetSvg, "san-francisco", "sf", -90, -10, 6, 9);
      }
    }
  });


  // Add the subtle divider line between maps, but never after the last
  // one — so a single map shown alone has no stray border.
  //
  // Important: this has to be based on the maps' actual DOM order, not
  // the order the user selected the states in. .map-wrapper is a flex
  // row, so visual left-to-right position always follows DOM order —
  // if we instead used activeStateKeys' order (selection order), the
  // divider could land on the wrong map whenever the user picked the
  // states in a different order than they appear in the markup, making
  // it show up outside the pair instead of between them.
  const domOrderedVisibleMaps = Array.from(currentSvgMaps).filter(map => visibleMaps.includes(map));


  // Group the visible maps into their actual visual rows by checking
  // whether their vertical spans overlap, not by comparing top edges.
  // Reading getBoundingClientRect here forces the browser to lay things
  // out, so this reflects where .map-wrapper's flex-wrap really put each
  // map — not just DOM order. Two maps on the same row get a vertical
  // divider between them; a map that wrapped onto a new row instead gets
  // a horizontal divider along its top, separating it from the row above.
  //
  // NOTE: .map-wrapper uses align-items: center, so maps of different
  // heights (e.g. Delaware next to the shorter Rhode Island, or Hawaii
  // next to Rhode Island) still overlap heavily in their vertical span
  // when on the same row, even though their centers can land a few
  // pixels apart due to sub-pixel rounding — comparing centers with a
  // tight 2px tolerance was enough to misclassify Hawaii (a much wider,
  // shorter map) as its own row even when it was genuinely beside Rhode
  // Island, giving it the wrong (horizontal) divider style. Checking for
  // real overlap between vertical spans is a much more forgiving, more
  // accurate test for "these are actually on the same row" — comparing
  // top here would wrongly treat every map as its own row.
  const rows = [];
  domOrderedVisibleMaps.forEach(map => {
    // NOTE: map is an <svg> element (SVGElement), and SVGElement does not
    // have an .offsetTop property the way HTMLElement does — it's always
    // undefined, which made every comparison below resolve to NaN < 2
    // (always false), so every map was treated as starting a new row no
    // matter where it actually rendered. getBoundingClientRect() works
    // on any element type and reflects the real on-screen position.
    const rect = map.getBoundingClientRect();
    const lastRow = rows[rows.length - 1];
    if (lastRow) {
      const overlap = Math.min(lastRow.bottom, rect.bottom) - Math.max(lastRow.top, rect.top);
      const smallerHeight = Math.min(lastRow.bottom - lastRow.top, rect.height);
      if (overlap > smallerHeight * 0.5) {
        lastRow.maps.push(map);
        lastRow.top = Math.min(lastRow.top, rect.top);
        lastRow.bottom = Math.max(lastRow.bottom, rect.bottom);
        return;
      }
    }
    rows.push({ top: rect.top, bottom: rect.bottom, maps: [map] });
  });


  rows.forEach((row, rowIndex) => {
    row.maps.forEach((map, mapIndex) => {
      if (mapIndex < row.maps.length - 1) {
        map.classList.add("map-divider");
      }
    });
    if (rowIndex > 0) {
      row.maps[0].classList.add("map-divider-top");
    }
  });
}


// --- State & County Setup Logic ---
  function renderCountyCheckboxes() {
  if (!checkboxContainer) return;


  // Remove both the county labels AND any state-header dividers from
  // the previous render.
  const existingChildren = checkboxContainer.querySelectorAll("label, .county-group-header");
  existingChildren.forEach(el => el.remove());


  // Grouped by state — in click order by default, or alphabetically if
  // gameSettings.sortStatesAlphabetically is on (see getOrderedStateKeys())
  // — with each state's own counties sorted alphabetically underneath its
  // header. The header itself is what disambiguates two counties that
  // share a name (e.g. "Kent" in Delaware vs Rhode Island), so the
  // label text no longer needs a ", State" suffix the way the flat
  // combined list did.
  getOrderedStateKeys().forEach(stateKey => {
    const state = stateData[stateKey];
    if (!state) return;


    const header = document.createElement("div");
    header.className = "county-group-header";
    header.textContent = state.name;
    checkboxContainer.appendChild(header);


    const sortedCounties = [...state.counties].sort((a, b) => a.name.localeCompare(b.name));


    sortedCounties.forEach(c => {
      const label = document.createElement("label");
      label.className = "checkbox-label";
      const mistakes = countyMistakes[c.id] || 0;
      const mistakeBadge = mistakes > 0 ? `<span class="badge-mistake">${mistakes} miss${mistakes > 1 ? 'es' : ''}</span>` : '';


      label.innerHTML = `
        <input type="checkbox" class="county-checkbox" value="${c.id}" data-state="${c.stateKey}">
        <span class="checkbox-custom"></span>
        <span class="county-label-text">${c.name}</span>
        ${mistakeBadge}
      `;
      checkboxContainer.appendChild(label);
    });
  });


  document.querySelectorAll(".county-checkbox").forEach(cb => {
    cb.addEventListener("change", updateSetupPlayButton);
  });
}


function getActiveCountiesPool() {
  return activeStateKeys.flatMap(key => (stateData[key] ? stateData[key].counties : []));
}


// How many of the most-missed counties get auto-selected by "Select the
// ones you struggled with" / the initial suggestion. Capped rather than
// selecting every county with any mistake at all, since that list grows
// unhelpfully long once more states/counties have been played.
const SUGGESTION_LIMIT = 5;


// Returns the ids of up to `limit` currently-rendered counties with the
// highest mistake counts, highest first. Counties with zero mistakes are
// never included, so this can return fewer than `limit` ids.
function getLowestMistakeCountyIds(limit) {
  return Array.from(document.querySelectorAll(".county-checkbox"))
    .map(cb => ({ id: cb.value, mistakes: countyMistakes[cb.value] || 0 }))
    .filter(c => c.mistakes >= 0) // Change to c.mistakes >= 0 if you want to include 0-mistake counties
    .sort((a, b) => a.mistakes - b.mistakes) // Sorts lowest to highest
    .slice(0, limit)
    .map(c => c.id);
}


radioSpecific.forEach(radio => {
  radio.addEventListener("change", (e) => {
    const countyCheckboxes = document.querySelectorAll(".county-checkbox");
    if (e.target.value === "yes") {
      if (checkboxContainer) checkboxContainer.classList.remove("hidden");


      // Start with nothing selected — the user can check counties
      // manually, or use the "Select your 5 best-known" button.
      countyCheckboxes.forEach(cb => {
        cb.checked = false;
      });


      const topMistakeIds = getLowestMistakeCountyIds(SUGGESTION_LIMIT);
      if (suggestionBox) {
        if (topMistakeIds.length > 0) {
          suggestionBox.classList.remove("hidden");
        } else {
          suggestionBox.classList.add("hidden");
        }
      }
    } else {
      if (checkboxContainer) checkboxContainer.classList.add("hidden");
      if (suggestionBox) suggestionBox.classList.add("hidden");
      countyCheckboxes.forEach(cb => cb.checked = false);
    }
    updateSetupPlayButton();
  });
});


if (btnSelectSuggested) {
  btnSelectSuggested.addEventListener("click", () => {
    // Deselect everything first so it's obvious the button reset the
    // selection, then check only the suggested 5 — even if some of them
    // happened to already be checked.
    document.querySelectorAll(".county-checkbox").forEach(cb => {
      cb.checked = false;
    });

    const topMistakeIds = getLowestMistakeCountyIds(SUGGESTION_LIMIT);
    document.querySelectorAll(".county-checkbox").forEach(cb => {
      if (topMistakeIds.includes(cb.value)) cb.checked = true;
    });
    updateSetupPlayButton();
  });
}


if (btnDeselectAll) {
  btnDeselectAll.addEventListener("click", () => {
    document.querySelectorAll(".county-checkbox").forEach(cb => {
      cb.checked = false;
    });
    updateSetupPlayButton();
  });
}


function updateSetupPlayButton() {
if (!btnStartGame) return;


if (activeStateKeys.length === 0) {
  btnStartGame.classList.remove("hidden");
  btnStartGame.setAttribute("disabled", "true");
  return;
}


const specificRadio = document.querySelector('input[name="specific-counties"]:checked');
const isSpecificYes = specificRadio ? specificRadio.value === "yes" : false;


if (!isSpecificYes || document.querySelectorAll(".county-checkbox:checked").length >= 1) {
  btnStartGame.classList.remove("hidden");
  btnStartGame.removeAttribute("disabled");
} else {
  btnStartGame.classList.add("hidden");
  btnStartGame.setAttribute("disabled", "true");
}
}


if (btnStartGame) {
  btnStartGame.addEventListener("click", () => {
    const specificRadio = document.querySelector('input[name="specific-counties"]:checked');
    const isSpecificYes = specificRadio ? specificRadio.value === "yes" : false;
    const allActiveCounties = getActiveCountiesPool();


    if (isSpecificYes) {
      const checkedIds = Array.from(document.querySelectorAll(".county-checkbox:checked")).map(cb => cb.value);
      selectedCounties = allActiveCounties.filter(c => !checkedIds.includes(c.id));
    } else {
      selectedCounties = [...allActiveCounties];
    }


    if (selectedCounties.length === 0) return;


    // NOTE: showScreen() has to run BEFORE switchVisibleSvgMap(). The maps
    // live inside #screen-game, which is display:none until it gets the
    // "active" class — and getBoundingClientRect() (used by
    // switchVisibleSvgMap() to detect which maps share a visual row)
    // returns all-zero rects for anything inside a display:none ancestor.
    // Computing row layout first and only THEN revealing the screen meant
    // every map measured as {top:0, left:0}, so they all looked like they
    // were on the same row no matter how they actually wrapped.
    showScreen("screen-game");
    switchVisibleSvgMap();
    initGame(selectedCounties);
  });
}


if (btnQuitGame) {
  btnQuitGame.addEventListener("click", () => {
    isGameActive = false;
    if (modalSummary) modalSummary.classList.add("hidden");
    if (admireBar) admireBar.classList.add("hidden");
    showScreen("screen-modes");
  });
}


if (btnToggleCountyList) {
  btnToggleCountyList.addEventListener("click", () => {
    if (!countyListPanel) return;
    const nowHidden = countyListPanel.classList.toggle("hidden");
    btnToggleCountyList.textContent = nowHidden ? "Show List" : "Hide List";
  });
}


if (btnNewGame) {
  btnNewGame.addEventListener("click", () => {
    initGame(selectedCounties);
  });
}


// --- Give Up ---
// Reveals every county still left in the pool as missed (in red), then
// shows the same end-of-game summary (percentage + options) the player
// would get from finishing normally. Works the same way in every mode,
// including the Type modes where counties normally aren't clickable —
// each revealed county gets its pointer-events force-enabled so hovering
// it still pops out its name, even though isGameActive being false means
// clicking or typing can no longer register a guess.
function giveUp() {
  if (!isGameActive) return;

  document.querySelectorAll(".county.typing-highlight").forEach(el => {
    el.classList.remove("typing-highlight");
  });

  targetPool.forEach(c => {
    missedCounties.add(c);
    scoreWrong++;
    countyMistakes[c.id] = (countyMistakes[c.id] || 0) + 1;
    getCountyElements(c.id).forEach(el => {
      el.classList.add("given-up-missed");
      el.style.pointerEvents = "auto";
    });
  });
  localStorage.setItem("countyMistakes", JSON.stringify(countyMistakes));

  targetPool = [];
  currentTarget = null;
  isGameActive = false;

  if (typeInputBox) typeInputBox.classList.add("hidden");
  if (feedbackEl) {
    feedbackEl.textContent = "";
    feedbackEl.className = "feedback-message";
  }
  if (targetPrompt) targetPrompt.textContent = "Game over.";

  showSummaryModal();
}

if (btnGiveUp) {
  btnGiveUp.addEventListener("click", () => {
    if (!isGameActive) return;
    if (confirm("Give up? Every remaining county will be revealed as missed.")) {
      giveUp();
    }
  });
}


// --- Game Loop Functions ---
function initGame(countiesToPlay) {
  targetPool = [...countiesToPlay];
  totalTargetsCount = targetPool.length;
  originalTargetList = [...targetPool];
  scoreRight = 0;
  scoreWrong = 0;
  isGameActive = true;
  missedCounties.clear();
  currentAttemptMistakes = 0;
  // Recompute per-game: e.g. retrying only Delaware's missed counties
  // means "Kent" is no longer ambiguous even if it was during the full
  // multi-state round.
      ambiguousCountyNames = computeAmbiguousNames(getActiveCountiesPool());


  if (modalSummary) modalSummary.classList.add("hidden");
  if (admireBar) admireBar.classList.add("hidden");
  if (feedbackEl) {
    feedbackEl.textContent = "";
    feedbackEl.className = "feedback-message";
  }
  hideHoverTooltip();


  // The optional county-list sidebar only makes sense in List Mode
  // (every other mode either shows the answer up front or hides it on
  // purpose) — hide the toggle button entirely outside it, and always
  // start a fresh game with the sidebar itself collapsed.
  if (btnToggleCountyList) {
    btnToggleCountyList.classList.toggle("hidden", selectedMode !== "type");
    btnToggleCountyList.textContent = "Show List";
  }
  if (countyListPanel) countyListPanel.classList.add("hidden");


  countyPaths.forEach(path => {
    path.classList.remove("correct", "wrong", "flash-correct", "found", "correct-recovered", "flash-correct-recovered", "typing-highlight", "given-up-missed");
    // Typing modes are solved by typing, not clicking — disabling
    // pointer events also removes the hover highlight so the map
    // doesn't look clickable when it isn't.
    path.style.pointerEvents = TYPE_MODES.has(selectedMode) ? "none" : "auto";
    path.setAttribute("tabindex", "0");
    path.setAttribute("role", "button");
    path.setAttribute("aria-label", "County path");
  });


  pickNextTarget();
}


// Shows how many counties have been found so far out of the total in
// this game (e.g. "1/3"), regardless of mode.
function updateProgressCounter() {
  if (!progressCounter) return;
  const found = totalTargetsCount - targetPool.length;
  progressCounter.textContent = `${found}/${totalTargetsCount}`;
}

// Refreshes the optional List Mode sidebar: one blank cell per county in
// this game. A cell stays blank (no name shown) until that county has
// actually been typed correctly (i.e. it's no longer in targetPool) —
// only then does its cell fill in with the name. Nothing about an
// unfound county (which letter, how long the name is) leaks out early;
// filling in a cell is the reward for the guess, not a running spoiler.
// When gameSettings.listByState is on (the default), counties are
// grouped into a labeled section per state instead of one mixed
// alphabetical list. Cheap enough to just re-render in full each time
// rather than diffing.
function renderCountyListPanel() {
  if (!countyListItems) return;
  const tbody = countyListItems.querySelector("tbody") || countyListItems;
  const remainingIds = new Set(targetPool.map(c => c.id));

  const cellRow = (c) => {
    const found = !remainingIds.has(c.id);
    return `<tr><td class="${found ? "found" : "blank"}">${found ? getDisplayName(c) : ""}</td></tr>`;
  };

  if (gameSettings.listByState) {
    const byState = {};
    originalTargetList.forEach(c => {
      (byState[c.stateKey] = byState[c.stateKey] || []).push(c);
    });
    const stateKeys = Object.keys(byState).sort((a, b) => {
      const nameA = stateData[a]?.name || a;
      const nameB = stateData[b]?.name || b;
      return nameA.localeCompare(nameB);
    });
    // Within a grouped-by-state section the header already gives the
    // state, so cells use the plain county name rather than
    // getDisplayName's "Kent, Rhode Island" disambiguation.
    const groupedCellRow = (c) => {
      const found = !remainingIds.has(c.id);
      return `<tr><td class="${found ? "found" : "blank"}">${found ? c.name : ""}</td></tr>`;
    };
    tbody.innerHTML = stateKeys
      .map(stateKey => {
        const stateName = stateData[stateKey]?.name || stateKey;
        const sorted = byState[stateKey].sort((a, b) => a.name.localeCompare(b.name));
        const header = `<tr class="county-list-state-row"><th colspan="1">${stateName}</th></tr>`;
        return header + sorted.map(groupedCellRow).join("");
      })
      .join("");
  } else {
    const sorted = [...originalTargetList].sort((a, b) =>
      getDisplayName(a).localeCompare(getDisplayName(b))
    );
    tbody.innerHTML = sorted.map(cellRow).join("");
  }
}

function pickNextTarget() {
  currentAttemptMistakes = 0;
  updateProgressCounter();
  renderCountyListPanel();

  // Clear any leftover "Type" (type-hard) highlight before picking the next
  // target — otherwise the previous target would stay pulsing blue.
  document.querySelectorAll(".county.typing-highlight").forEach(el => {
    el.classList.remove("typing-highlight");
  });

  if (targetPool.length === 0) {
    isGameActive = false;
    showSummaryModal();
    return;
  }


  const randomIndex = Math.floor(Math.random() * targetPool.length);
  currentTarget = targetPool[randomIndex];


  if (targetPrompt) {
    if (selectedMode === "type") {
      // Open-ended: any remaining county counts, so there's no single
      // name to reveal here — the prompt just explains what to do.
      targetPrompt.innerHTML = `<span class="find-label">Find any county</span>`;
    } else if (selectedMode === "type-hard") {
      targetPrompt.innerHTML = `<span class="find-label">Type the highlighted county</span>`;
    } else if (selectedMode === "type-strict") {
      targetPrompt.innerHTML = `<span class="find-label">Type the highlighted county</span>`;
    } else {
      const { name, state } = getDisplayParts(currentTarget);
      targetPrompt.innerHTML = `
        <span class="find-label">Find:</span>
        <span class="target-name">${name}</span>
        ${state ? `<span class="target-state">(${state})</span>` : ""}
      `;
    }
  }

  if (SINGLE_TARGET_TYPE_MODES.has(selectedMode)) {
    getCountyElements(currentTarget.id).forEach(el => el.classList.add("typing-highlight"));
  }

  if (typeInputBox) {
    typeInputBox.classList.toggle("hidden", !TYPE_MODES.has(selectedMode));
  }
  if (TYPE_MODES.has(selectedMode) && typeInput) {
    typeInput.value = "";
    typeInput.focus();
  }
}


function handleCountyClick(pathEl) {
  if (!isGameActive || !currentTarget) return;
  if (TYPE_MODES.has(selectedMode)) return; // clicking doesn't solve typing modes


  // The Kalawao callout circle carries data-county-id="kalawao" so it
  // resolves to the real county's id; every other element just falls
  // back to its own id, unchanged from before.
  const clickedId = pathEl.dataset.countyId || pathEl.id;
  const clickedCounty = findCountyById(clickedId);
  const clickedName = clickedCounty
    ? getDisplayName(clickedCounty)
    : (pathEl.getAttribute("data-name") || pathEl.id);


  if (clickedId === currentTarget.id) {
    scoreRight++;
    playSound("correct");
    // currentAttemptMistakes counts wrong guesses made on THIS target
    // before it was finally found. pickNextTarget() (called below)
    // resets it to 0, so it has to be read here first.
    const recoveredFromMistake = currentAttemptMistakes > 0;
    // Only counts as "learned" if it was found with zero mistakes on
    // this attempt — i.e. first try (or, during Retry Missed, first
    // try within that retry). Getting it right only after guessing
    // wrong first doesn't earn the checkmark.
    if (!recoveredFromMistake) markCountyLearned(currentTarget.id, selectedMode);


    if (feedbackEl) {
      feedbackEl.textContent = `Correct! That's ${getDisplayName(currentTarget)}.`;
      feedbackEl.className = "feedback-message success";
    }


    // Apply the "found" state to every element representing this county
    // (the real shape AND its callout circle, if it has one) so they
    // stay in sync no matter which one was actually clicked.
    getCountyElements(currentTarget.id).forEach(el => {
      if (selectedMode === "pin") {
        el.classList.add(recoveredFromMistake ? "correct-recovered" : "correct", "found");
        el.style.pointerEvents = "none";
      } else if (selectedMode === "pin-hard") {
        const flashClass = recoveredFromMistake ? "flash-correct-recovered" : "flash-correct";
        el.classList.add(flashClass);
        setTimeout(() => el.classList.remove(flashClass), 600);
      }
    });


    targetPool = targetPool.filter(c => c.id !== currentTarget.id);
    pickNextTarget();
  } else {
    scoreWrong++;
    currentAttemptMistakes++;
    playSound("wrong");


    if (feedbackEl) {
      feedbackEl.textContent = `Oops! That's ${clickedName}.`;
      feedbackEl.className = "feedback-message error";
    }


    missedCounties.add(currentTarget);


    // Save mistake persistence
    countyMistakes[currentTarget.id] = (countyMistakes[currentTarget.id] || 0) + 1;
    localStorage.setItem("countyMistakes", JSON.stringify(countyMistakes));


    pathEl.classList.add("wrong");
    setTimeout(() => pathEl.classList.remove("wrong"), 600);
  }
}


// --- Typing Modes ("List" / type, "Type" / type-hard, "Verbatim" / type-strict) ---
// A correct guess is shared logic across all three modes; only how the
// match(es) are *found* differs (getTypedGuessMatches, defined earlier)
// and how strictly a wrong guess gets submitted (see the Instant Check
// listener below).
// matchedCounties is always an array — length 1 for the single-target
// modes, but List can hand back several counties at once when their
// bare names are identical (e.g. two "Kent"s in play).
function acceptTypedMatches(matchedCounties) {
  scoreRight++;
  playSound("correct");
  const recoveredFromMistake = currentAttemptMistakes > 0;

  if (feedbackEl) {
    if (SINGLE_TARGET_TYPE_MODES.has(selectedMode)) {
      // There's exactly one specific target here, so naming it is useful
      // confirmation.
      feedbackEl.textContent = `Correct! That's ${getDisplayName(matchedCounties[0])}.`;
    } else {
      // List: the player typed the name themselves, so repeating it
      // back as "Correct! That's Kent!" is redundant — just confirm the
      // guess, and note the count if it resolved more than one county at
      // once.
      feedbackEl.textContent = matchedCounties.length > 1
        ? `Correct! That matched ${matchedCounties.length} counties.`
        : "Correct!";
    }
    feedbackEl.className = "feedback-message success";
  }

  matchedCounties.forEach(matchedCounty => {
    // Same "first try only" rule as click mode — see handleCountyClick.
    if (!recoveredFromMistake) markCountyLearned(matchedCounty.id, selectedMode);
    getCountyElements(matchedCounty.id).forEach(el => {
      el.classList.remove("typing-highlight");
      // Only "Verbatim" (type-strict) gets the yellow "recovered"
      // treatment: it's the one mode where a wrong guess actually
      // penalizes you (counts against you), so the color means
      // something there. "Type" (type-hard) doesn't punish a wrong
      // guess the same way, and List's wrong guesses aren't reliably
      // about whichever county ends up matching — both stay plain green.
      const useRecoveredColor = recoveredFromMistake && selectedMode === "type-strict";
      el.classList.add(useRecoveredColor ? "correct-recovered" : "correct", "found");
      el.style.pointerEvents = "none";
    });
  });

  const matchedIds = new Set(matchedCounties.map(c => c.id));
  targetPool = targetPool.filter(c => !matchedIds.has(c.id));
  pickNextTarget();
}

function registerWrongTypedGuess() {
  // Only "Verbatim" (type-strict) actually penalizes your percentage
  // for a wrong guess — that's the one mode explicitly billed as "wrong
  // guesses count against you". List ("type") and "Type" (type-hard)
  // still track the mistake below (for the shake/sound, the "recovered"
  // state, missed-county suggestions, etc.) but it shouldn't move
  // scoreWrong, since only giving up should knock those modes below 100%.
  if (selectedMode === "type-strict") scoreWrong++;
  currentAttemptMistakes++;
  playSound("wrong");

  if (feedbackEl) {
    feedbackEl.textContent = "Not quite. Try again.";
    feedbackEl.className = "feedback-message error";
  }

  // Attributed to whatever county is currently "in focus" (the
  // highlighted one in "Type" (type-hard), or the arbitrarily pre-picked one
  // in Type) so the persistent countyMistakes counter still feeds the
  // "5 best-known" suggestions, same as click-based modes. missedCounties
  // (the set that drives the end-of-game "You missed X" summary) only
  // gets a wrong guess added in "Verbatim" (type-strict) — that's the
  // one mode where a wrong guess is a real, permanent miss. In List and
  // "Type", a wrong guess is just a retry: if you land on the right
  // answer afterward, nothing should count against you, so we leave
  // missedCounties alone here and let giveUp() be the only way a
  // List/Type county ends up "missed".
  if (currentTarget) {
    if (selectedMode === "type-strict") missedCounties.add(currentTarget);
    countyMistakes[currentTarget.id] = (countyMistakes[currentTarget.id] || 0) + 1;
    localStorage.setItem("countyMistakes", JSON.stringify(countyMistakes));
  }

  if (typeInputBox) {
    typeInputBox.classList.remove("shake");
    // Force a reflow so the animation can re-trigger on consecutive
    // wrong guesses, not just the first one.
    void typeInputBox.offsetWidth;
    typeInputBox.classList.add("shake");
  }

  // Clear the box after a wrong Enter submission so the next attempt
  // starts clean. Without this, leftover text from a mistyped guess
  // (e.g. "keenyt") sticks around and silently gets prepended to
  // whatever's typed next (e.g. "keenytsussex"), so a perfectly good
  // second guess like "sussex" reads as wrong too.
  if (typeInput) {
    typeInput.value = "";
    typeInput.focus();
  }
}

// Live-check (as-you-type) path: only ever silently accepts an exact
// match. Never fires the "wrong" buzz/shake for partial input — that's
// reserved for an explicit Enter press, otherwise every half-typed
// word would falsely register as a mistake.
function tryAutoMatchTypedInput() {
  if (!isGameActive || !typeInput) return;
  const normalized = normalizeTypedName(typeInput.value);
  if (!normalized) return;
  const matches = getTypedGuessMatches(normalized);
  if (matches.length > 0) acceptTypedMatches(matches);
}

// Submit path (Enter key, always available regardless of the Instant
// Check setting): checks the full current input and treats a mismatch
// as a real wrong guess.
function submitTypedGuess() {
  if (!isGameActive || !typeInput) return;
  const normalized = normalizeTypedName(typeInput.value);
  if (!normalized) return;
  const matches = getTypedGuessMatches(normalized);
  if (matches.length > 0) {
    acceptTypedMatches(matches);
  } else {
    registerWrongTypedGuess();
  }
}

if (typeInput) {
  typeInput.addEventListener("input", () => {
    // "Verbatim" (type-strict) always requires an explicit Enter
    // press to submit, so a wrong guess actually registers as wrong
    // (see registerWrongTypedGuess) instead of just sitting there
    // unmatched. The Instant Check setting applies to List and
    // "Type" (type-hard) — both still auto-accept a match as you type,
    // if the setting is on.
    if (selectedMode !== "type-strict" && gameSettings.instantTypeCheck) tryAutoMatchTypedInput();
  });
  typeInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submitTypedGuess();
    }
  });
}


// --- Cursor-Following Tooltip (Give Up-revealed counties) ---
// Only ever shown for counties carrying "given-up-missed" — normal
// unplayed/found/wrong counties never trigger it.
function showHoverTooltip(text, x, y) {
  if (!hoverTooltip) return;
  hoverTooltip.textContent = text;
  hoverTooltip.style.left = `${x}px`;
  hoverTooltip.style.top = `${y}px`;
  hoverTooltip.classList.remove("hidden");
}

function moveHoverTooltip(x, y) {
  if (!hoverTooltip || hoverTooltip.classList.contains("hidden")) return;
  hoverTooltip.style.left = `${x}px`;
  hoverTooltip.style.top = `${y}px`;
}

function hideHoverTooltip() {
  if (hoverTooltip) hoverTooltip.classList.add("hidden");
}


// --- County Map Mouse & Accessibility Keyboard Interactivity ---
// Normal mode responds on "click", which only fires once the mouse
// button (or finger) is released over the same element it was pressed
// on. Speedrun mode instead responds on "pointerdown" — the instant the
// press begins — so there's no need to lift off before the guess
// registers. Both listeners stay attached at all times; each one just
// checks gameSettings.speedrunMode and no-ops if it isn't the active mode,
// so toggling the setting mid-game takes effect immediately without
// re-binding anything.
//
// Factored out into its own function so the Kalawao callout circle
// (created later, after Hawaii's map is first shown) can get the exact
// same handling as every county that already existed at page load.
function bindCountyInteractivity(path) {
  path.addEventListener("pointerdown", (e) => {
    if (!gameSettings.speedrunMode) return;
    handleCountyClick(e.currentTarget);
  });


  path.addEventListener("click", (e) => {
    if (gameSettings.speedrunMode) return;
    handleCountyClick(e.currentTarget);
  });


  path.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCountyClick(e.currentTarget);
    }
  });


  // Cursor-following name popout — only does anything once Give Up has
  // marked this county "given-up-missed"; otherwise these are no-ops.
  path.addEventListener("mouseenter", (e) => {
    const el = e.currentTarget;
    if (!el.classList.contains("given-up-missed")) return;
    const id = el.dataset.countyId || el.id;
    const county = findCountyById(id);
    const name = county ? getDisplayName(county) : (el.getAttribute("data-name") || "");
    showHoverTooltip(name, e.clientX, e.clientY);
  });


  path.addEventListener("mousemove", (e) => {
    moveHoverTooltip(e.clientX, e.clientY);
  });


  path.addEventListener("mouseleave", hideHoverTooltip);
}


countyPaths.forEach(bindCountyInteractivity);


// --- End-Game Summary & Admire Map Logic ---
function showSummaryModal() {
  if (!modalSummary) return;


  const totalAttempts = scoreRight + scoreWrong;
  const accuracy = totalAttempts > 0 ? Math.round((scoreRight / totalAttempts) * 100) : 0;


  if (summaryPercentage) summaryPercentage.textContent = `${accuracy}%`;


  if (summaryGradeTitle) {
    if (accuracy === 100) summaryGradeTitle.textContent = "Good job!";
    else if (accuracy >= 75) summaryGradeTitle.textContent = "Not bad.";
    else if (accuracy >= 50) summaryGradeTitle.textContent = "You could work on that.";
    else summaryGradeTitle.textContent = "Oof.";
  }


  const missedArray = Array.from(missedCounties);
  if (modalActions) modalActions.innerHTML = "";
  if (summaryMissedSection) summaryMissedSection.classList.add("hidden");


  if (missedArray.length === 0) {
    // Perfect Score Flow
    const activeStateNames = activeStateKeys.map(key => stateData[key]?.name || key);


    if (summaryMessage) {
      // List ("type") is a free-recall mode — you're naming counties
      // from memory, not being tested on ones you're shown — so
      // "listed" reads more accurately than "learned" there. Every
      // other mode keeps "learned".
      const verb = selectedMode === "type" ? "listed" : "learned";
      if (activeStateNames.length === 1) {
        summaryMessage.textContent = `You've ${verb} all the counties in ${activeStateNames[0]}! Good job!`;
      } else {
        summaryMessage.textContent = `You've ${verb} all the counties across ${activeStateNames.length} states! Good job!`;
      }
    }


    countyPaths.forEach(path => {
      path.classList.add("correct");
      path.style.pointerEvents = "none";
    });


    if (targetPrompt) targetPrompt.textContent = "Complete!";


    renderStateListUI();
    renderStatsPanel();


    appendModalButton("Admire Map", "btn-secondary", enableAdmireBar);
    appendModalButton("Play Again", "btn-primary", () => {
      modalSummary.classList.add("hidden");
      initGame(selectedCounties);
    });
    appendModalButton("Settings", "btn-secondary", () => {
      modalSummary.classList.add("hidden");
      // FIX: pass "modal" so the summary popup reappears when the
      // player backs out of Settings, instead of staying hidden forever.
      openSettings("screen-game", "modal");
    });
    appendModalButton("Home", "btn-secondary", () => {
      modalSummary.classList.add("hidden");
      showScreen("screen-home");
    });
  } else {
    // Mistakes Flow
    // Full list, not truncated — the whole point is being able to see
    // everything you missed so you know what to study. It lives in its
    // own "What you missed" section under the main message, grouped into
    // an actual per-state list rather than one long comma-separated
    // sentence — same grouping idea as the List Mode checklist.
    if (summaryMessage) {
      summaryMessage.textContent = `You missed ${missedArray.length} county target${missedArray.length > 1 ? 's' : ''}. What would you like to do?`;
    }
    if (summaryMissedSection && summaryMissedList) {
      const byState = {};
      missedArray.forEach(c => {
        (byState[c.stateKey] = byState[c.stateKey] || []).push(c);
      });
      const stateKeys = Object.keys(byState).sort((a, b) => {
        const nameA = stateData[a]?.name || a;
        const nameB = stateData[b]?.name || b;
        return nameA.localeCompare(nameB);
      });
      summaryMissedList.innerHTML = stateKeys
        .map(stateKey => {
          const stateName = stateData[stateKey]?.name || stateKey;
          const sorted = byState[stateKey].sort((a, b) => a.name.localeCompare(b.name));
          const items = sorted.map(c => `<li>${c.name}</li>`).join("");
          return `<div class="summary-missed-state"><h4>${stateName}</h4><ul>${items}</ul></div>`;
        })
        .join("");
      summaryMissedSection.classList.remove("hidden");
    }


    appendModalButton("Admire Map", "btn-secondary", enableAdmireBar);
    appendModalButton("Retry Missed", "btn-primary", () => {
      modalSummary.classList.add("hidden");
      initGame(missedArray);
    });
    appendModalButton("Play Again", "btn-secondary", () => {
      modalSummary.classList.add("hidden");
      initGame(selectedCounties);
    });
    appendModalButton("Settings", "btn-secondary", () => {
      modalSummary.classList.add("hidden");
      // FIX: pass "modal" here too, for the same reason as above.
      openSettings("screen-game", "modal");
    });
    appendModalButton("Home", "btn-secondary", () => {
      modalSummary.classList.add("hidden");
      showScreen("screen-home");
    });
  }


  modalSummary.classList.remove("hidden");
}


function appendModalButton(text, className, onClick) {
  if (!modalActions) return;
  const btn = document.createElement("button");
  btn.textContent = text;
  btn.className = className;
  btn.onclick = onClick;
  modalActions.appendChild(btn);
}


// --- Bottom Bar "Admire Map" Interactivity ---
function enableAdmireBar() {
  modalSummary.classList.add("hidden");
  if (admirePercentage) admirePercentage.textContent = summaryPercentage.textContent;
  if (admireText) admireText.textContent = summaryMessage.textContent;


  if (btnAdmireRetry) {
    if (missedCounties.size > 0) {
      btnAdmireRetry.classList.remove("hidden");
    } else {
      btnAdmireRetry.classList.add("hidden");
    }
  }


  if (admireBar) admireBar.classList.remove("hidden");
}


if (btnAdmireRetry) {
  btnAdmireRetry.addEventListener("click", () => {
    admireBar.classList.add("hidden");
    initGame(Array.from(missedCounties));
  });
}


if (btnAdmireReplay) {
  btnAdmireReplay.addEventListener("click", () => {
    admireBar.classList.add("hidden");
    initGame(selectedCounties);
  });
}


// admire bar's Settings button — already correctly passes "admire" so
// the bar reappears (instead of the summary modal) when Settings closes.
if (btnAdmireSettings) {
  btnAdmireSettings.addEventListener("click", () => {
    admireBar.classList.add("hidden");
    openSettings("screen-game", "admire");
  });
}


if (btnAdmireHome) {
  btnAdmireHome.addEventListener("click", () => {
    admireBar.classList.add("hidden");
    showScreen("screen-home");
  });
}
});