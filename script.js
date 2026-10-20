document.addEventListener('DOMContentLoaded', () => {
const stateData = {
  arizona: {
    name: "Arizona",
    svgId: "svg-arizona",
    counties: [
      { id: "mohave", name: "Mohave", stateKey: "arizona" },
      { id: "coconino", name: "Coconino", stateKey: "arizona" },
      { id: "gila", name: "Gila", stateKey: "arizona" },
      { id: "yavapai", name: "Yavapai", stateKey: "arizona" },
      { id: "yuma", name: "Yuma", stateKey: "arizona" },
      { id: "pinal", name: "Pinal", stateKey: "arizona" },
      { id: "graham", name: "Graham", stateKey: "arizona" },
      { id: "maricopa", name: "Maricopa", stateKey: "arizona" },
      { id: "apache", name: "Apache", stateKey: "arizona" },
      { id: "la-paz", name: "La Paz", stateKey: "arizona" },
      { id: "navajo", name: "Navajo", stateKey: "arizona" },
      { id: "greenlee", name: "Greenlee", stateKey: "arizona" },
      { id: "santa-cruz-az", name: "Santa Cruz", stateKey: "arizona" },
      { id: "pima", name: "Pima", stateKey: "arizona" },
      { id: "cochise", name: "Cochise", stateKey: "arizona" }
    ]
  },
  alabama: {
    name: "Alabama",
    svgId: "svg-alabama",
    counties: [
      { id: "autauga", name: "Autauga", stateKey: "alabama" },
      { id: "baldwin", name: "Baldwin", stateKey: "alabama" },
      { id: "barbour", name: "Barbour", stateKey: "alabama" },
      { id: "bibb", name: "Bibb", stateKey: "alabama" },
      { id: "blount", name: "Blount", stateKey: "alabama" },
      { id: "bullock", name: "Bullock", stateKey: "alabama" },
      { id: "butler", name: "Butler", stateKey: "alabama" },
      { id: "calhoun", name: "Calhoun", stateKey: "alabama" },
      { id: "chambers", name: "Chambers", stateKey: "alabama" },
      { id: "cherokee", name: "Cherokee", stateKey: "alabama" },
      { id: "chilton", name: "Chilton", stateKey: "alabama" },
      { id: "choctaw", name: "Choctaw", stateKey: "alabama" },
      { id: "clarke", name: "Clarke", stateKey: "alabama" },
      { id: "clay", name: "Clay", stateKey: "alabama" },
      { id: "cleburne", name: "Cleburne", stateKey: "alabama" },
      { id: "coffee", name: "Coffee", stateKey: "alabama" },
      { id: "colbert", name: "Colbert", stateKey: "alabama" },
      { id: "conecuh", name: "Conecuh", stateKey: "alabama" },
      { id: "coosa", name: "Coosa", stateKey: "alabama" },
      { id: "covington", name: "Covington", stateKey: "alabama" },
      { id: "crenshaw", name: "Crenshaw", stateKey: "alabama" },
      { id: "cullman", name: "Cullman", stateKey: "alabama" },
      { id: "dale", name: "Dale", stateKey: "alabama" },
      { id: "dallas", name: "Dallas", stateKey: "alabama" },
      { id: "dekalb", name: "DeKalb", stateKey: "alabama" },
      { id: "elmore", name: "Elmore", stateKey: "alabama" },
      { id: "escambia", name: "Escambia", stateKey: "alabama" },
      { id: "etowah", name: "Etowah", stateKey: "alabama" },
      { id: "fayette", name: "Fayette", stateKey: "alabama" },
      { id: "franklin", name: "Franklin", stateKey: "alabama" },
      { id: "geneva", name: "Geneva", stateKey: "alabama" },
      { id: "greene", name: "Greene", stateKey: "alabama" },
      { id: "hale", name: "Hale", stateKey: "alabama" },
      { id: "henry", name: "Henry", stateKey: "alabama" },
      { id: "houston", name: "Houston", stateKey: "alabama" },
      { id: "jackson", name: "Jackson", stateKey: "alabama" },
      { id: "jefferson", name: "Jefferson", stateKey: "alabama" },
      { id: "lamar", name: "Lamar", stateKey: "alabama" },
      { id: "lauderdale", name: "Lauderdale", stateKey: "alabama" },
      { id: "lawrence", name: "Lawrence", stateKey: "alabama" },
      { id: "lee", name: "Lee", stateKey: "alabama" },
      { id: "limestone", name: "Limestone", stateKey: "alabama" },
      { id: "lowndes", name: "Lowndes", stateKey: "alabama" },
      { id: "macon", name: "Macon", stateKey: "alabama" },
      { id: "madison", name: "Madison", stateKey: "alabama" },
      { id: "marengo", name: "Marengo", stateKey: "alabama" },
      { id: "marion", name: "Marion", stateKey: "alabama" },
      { id: "marshall", name: "Marshall", stateKey: "alabama" },
      { id: "mobile", name: "Mobile", stateKey: "alabama" },
      { id: "monroe", name: "Monroe", stateKey: "alabama" },
      { id: "montgomery", name: "Montgomery", stateKey: "alabama" },
      { id: "morgan", name: "Morgan", stateKey: "alabama" },
      { id: "perry", name: "Perry", stateKey: "alabama" },
      { id: "pickens", name: "Pickens", stateKey: "alabama" },
      { id: "pike", name: "Pike", stateKey: "alabama" },
      { id: "randolph", name: "Randolph", stateKey: "alabama" },
      { id: "russell", name: "Russell", stateKey: "alabama" },
      { id: "saint-clair", name: "Saint Clair", stateKey: "alabama" },
      { id: "shelby", name: "Shelby", stateKey: "alabama" },
      { id: "sumter", name: "Sumter", stateKey: "alabama" },
      { id: "talladega", name: "Talladega", stateKey: "alabama" },
      { id: "tallapoosa", name: "Tallapoosa", stateKey: "alabama" },
      { id: "tuscaloosa", name: "Tuscaloosa", stateKey: "alabama" },
      { id: "walker", name: "Walker", stateKey: "alabama" },
      { id: "washington-al", name: "Washington", stateKey: "alabama" },
      { id: "wilcox", name: "Wilcox", stateKey: "alabama" },
      { id: "winston", name: "Winston", stateKey: "alabama" }
    ]
  },
  alaska: {
    name: "Alaska",
    svgId: "svg-alaska",
    counties: [
      { id: "aleutians-east", name: "Aleutians East", stateKey: "alaska" },
      { id: "aleutians-west", name: "Aleutians West", stateKey: "alaska" },
      { id: "anchorage", name: "Anchorage", stateKey: "alaska" },
      { id: "bethel", name: "Bethel", stateKey: "alaska" },
      { id: "bristol-bay", name: "Bristol Bay", stateKey: "alaska" },
      { id: "chugach", name: "Chugach", stateKey: "alaska" },
      { id: "copper-river", name: "Copper River", stateKey: "alaska" },
      { id: "denali", name: "Denali", stateKey: "alaska" },
      { id: "dillingham", name: "Dillingham", stateKey: "alaska" },
      { id: "fairbanks-north-star", name: "Fairbanks North Star", stateKey: "alaska" },
      { id: "haines", name: "Haines", stateKey: "alaska" },
      { id: "hoonah-angoon", name: "Hoonah-Angoon", stateKey: "alaska" },
      { id: "juneau", name: "Juneau", stateKey: "alaska" },
      { id: "kenai-peninsula", name: "Kenai Peninsula", stateKey: "alaska" },
      { id: "ketchikan-gateway", name: "Ketchikan Gateway", stateKey: "alaska" },
      { id: "kodiak-island", name: "Kodiak Island", stateKey: "alaska" },
      { id: "kusilvak", name: "Kusilvak", stateKey: "alaska" },
      { id: "lake-and-peninsula", name: "Lake and Peninsula", stateKey: "alaska" },
      { id: "matanuska-susitna", name: "Matanuska-Susitna", stateKey: "alaska" },
      { id: "nome", name: "Nome", stateKey: "alaska" },
      { id: "north-slope", name: "North Slope", stateKey: "alaska" },
      { id: "northwest-arctic", name: "Northwest Arctic", stateKey: "alaska" },
      { id: "petersburg", name: "Petersburg", stateKey: "alaska" },
      { id: "prince-of-wales-hyder", name: "Prince of Wales-Hyder", stateKey: "alaska" },
      { id: "sitka", name: "Sitka", stateKey: "alaska" },
      { id: "skagway", name: "Skagway", stateKey: "alaska" },
      { id: "southeast-fairbanks", name: "Southeast Fairbanks", stateKey: "alaska" },
      { id: "wrangell", name: "Wrangell", stateKey: "alaska" },
      { id: "yakutat", name: "Yakutat", stateKey: "alaska" },
      { id: "yukon-koyukuk", name: "Yukon-Koyukuk", stateKey: "alaska" }
    ]
  },
  delaware: {
    name: "Delaware",
    svgId: "map-delaware",
    counties: [
      { id: "new-castle", name: "New Castle", stateKey: "delaware" },
      { id: "kent", name: "Kent", stateKey: "delaware" },
      { id: "sussex", name: "Sussex", stateKey: "delaware" }
    ]
  },
  florida: {
    name: "Florida",
    svgId: "svg-florida",
    counties: [
      { id: "gulf", name: "Gulf", stateKey: "florida" },
      { id: "polk-fl", name: "Polk", stateKey: "florida" },
      { id: "madison-fl", name: "Madison", stateKey: "florida" },
      { id: "dixie", name: "Dixie", stateKey: "florida" },
      { id: "osceola", name: "Osceola", stateKey: "florida" },
      { id: "levy", name: "Levy", stateKey: "florida" },
      { id: "suwannee", name: "Suwannee", stateKey: "florida" },
      { id: "franklin-fl", name: "Franklin", stateKey: "florida" },
      { id: "bay", name: "Bay", stateKey: "florida" },
      { id: "jackson-fl", name: "Jackson", stateKey: "florida" },
      { id: "indian-river", name: "Indian River", stateKey: "florida" },
      { id: "palm-beach", name: "Palm Beach", stateKey: "florida" },
      { id: "duval-fl", name: "Duval", stateKey: "florida" },
      { id: "gilchrist", name: "Gilchrist", stateKey: "florida" },
      { id: "miami-dade", name: "Miami-Dade", stateKey: "florida" },
      { id: "lafayette-fl", name: "Lafayette", stateKey: "florida" },
      { id: "broward", name: "Broward", stateKey: "florida" },
      { id: "lake-fl", name: "Lake", stateKey: "florida" },
      { id: "desoto", name: "DeSoto", stateKey: "florida" },
      { id: "glades", name: "Glades", stateKey: "florida" },
      { id: "hendry", name: "Hendry", stateKey: "florida" },
      { id: "collier", name: "Collier", stateKey: "florida" },
      { id: "baker", name: "Baker", stateKey: "florida" },
      { id: "pasco", name: "Pasco", stateKey: "florida" },
      { id: "sumter-fl", name: "Sumter", stateKey: "florida" },
      { id: "gadsden", name: "Gadsden", stateKey: "florida" },
      { id: "monroe-fl", name: "Monroe", stateKey: "florida" },
      { id: "okaloosa", name: "Okaloosa", stateKey: "florida" },
      { id: "volusia", name: "Volusia", stateKey: "florida" },
      { id: "st-lucie", name: "Saint Lucie", stateKey: "florida" },
      { id: "lee-fl", name: "Lee", stateKey: "florida" },
      { id: "clay-fl", name: "Clay", stateKey: "florida" },
      { id: "brevard", name: "Brevard", stateKey: "florida" },
      { id: "taylor-fl", name: "Taylor", stateKey: "florida" },
      { id: "union-fl", name: "Union", stateKey: "florida" },
      { id: "hillsborough-fl", name: "Hillsborough", stateKey: "florida" },
      { id: "charlotte", name: "Charlotte", stateKey: "florida" },
      { id: "leon-fl", name: "Leon", stateKey: "florida" },
      { id: "santa-rosa", name: "Santa Rosa", stateKey: "florida" },
      { id: "sarasota", name: "Sarasota", stateKey: "florida" },
      { id: "highlands", name: "Highlands", stateKey: "florida" },
      { id: "citrus", name: "Citrus", stateKey: "florida" },
      { id: "bradford", name: "Bradford", stateKey: "florida" },
      { id: "hamilton-fl", name: "Hamilton", stateKey: "florida" },
      { id: "liberty-fl", name: "Liberty", stateKey: "florida" },
      { id: "manatee", name: "Manatee", stateKey: "florida" },
      { id: "calhoun-fl", name: "Calhoun", stateKey: "florida" },
      { id: "columbia-fl", name: "Columbia", stateKey: "florida" },
      { id: "holmes-fl", name: "Holmes", stateKey: "florida" },
      { id: "st-johns", name: "Saint Johns", stateKey: "florida" },
      { id: "martin-fl", name: "Martin", stateKey: "florida" },
      { id: "jefferson-fl", name: "Jefferson", stateKey: "florida" },
      { id: "seminole", name: "Seminole", stateKey: "florida" },
      { id: "hardee", name: "Hardee", stateKey: "florida" },
      { id: "flagler", name: "Flagler", stateKey: "florida" },
      { id: "pinellas", name: "Pinellas", stateKey: "florida" },
      { id: "marion-fl", name: "Marion", stateKey: "florida" },
      { id: "nassau", name: "Nassau", stateKey: "florida" },
      { id: "washington-fl", name: "Washington", stateKey: "florida" },
      { id: "hernando", name: "Hernando", stateKey: "florida" },
      { id: "wakulla", name: "Wakulla", stateKey: "florida" },
      { id: "walton", name: "Walton", stateKey: "florida" },
      { id: "putnam-fl", name: "Putnam", stateKey: "florida" },
      { id: "alachua", name: "Alachua", stateKey: "florida" },
      { id: "orange-fl", name: "Orange", stateKey: "florida" },
      { id: "okeechobee", name: "Okeechobee", stateKey: "florida" },
      { id: "escambia-fl", name: "Escambia", stateKey: "florida" }
    ]
  },
  new_hampshire: {
    name: "New Hampshire",
    svgId: "svg-new-hampshire",
    counties: [
      { id: "belknap", name: "Belknap", stateKey: "new_hampshire" },
      { id: "carroll", name: "Carroll", stateKey: "new_hampshire" },
      { id: "cheshire", name: "Cheshire", stateKey: "new_hampshire" },
      { id: "coos", name: "Coös", stateKey: "new_hampshire" },
      { id: "grafton", name: "Grafton", stateKey: "new_hampshire" },
      { id: "hillsborough", name: "Hillsborough", stateKey: "new_hampshire" },
      { id: "merrimack", name: "Merrimack", stateKey: "new_hampshire" },
      { id: "rockingham", name: "Rockingham", stateKey: "new_hampshire" },
      { id: "strafford", name: "Strafford", stateKey: "new_hampshire" },
      { id: "sullivan", name: "Sullivan", stateKey: "new_hampshire" }
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
      { id: "hawaii-county", name: "Hawaiʻi", stateKey: "hawaii" },
      { id: "honolulu", name: "Honolulu", stateKey: "hawaii" },
      { id: "kalawao", name: "Kalawao", stateKey: "hawaii" },
      { id: "kauai", name: "Kauaʻi", stateKey: "hawaii" },
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
      { id: "calhoun-tx", name: "Calhoun", stateKey: "texas" },
      { id: "callahan", name: "Callahan", stateKey: "texas" },
      { id: "cameron", name: "Cameron", stateKey: "texas" },
      { id: "camp", name: "Camp", stateKey: "texas" },
      { id: "carson", name: "Carson", stateKey: "texas" },
      { id: "cass", name: "Cass", stateKey: "texas" },
      { id: "castro", name: "Castro", stateKey: "texas" },
      { id: "chambers-tx", name: "Chambers", stateKey: "texas" },
      { id: "cherokee-tx", name: "Cherokee", stateKey: "texas" },
      { id: "childress", name: "Childress", stateKey: "texas" },
      { id: "clay-tx", name: "Clay", stateKey: "texas" },
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
      { id: "dallas-tx", name: "Dallas", stateKey: "texas" },
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
      { id: "fayette-tx", name: "Fayette", stateKey: "texas" },
      { id: "fisher", name: "Fisher", stateKey: "texas" },
      { id: "floyd", name: "Floyd", stateKey: "texas" },
      { id: "foard", name: "Foard", stateKey: "texas" },
      { id: "fort-bend", name: "Fort Bend", stateKey: "texas" },
      { id: "franklin-tx", name: "Franklin", stateKey: "texas" },
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
      { id: "hale-tx", name: "Hale", stateKey: "texas" },
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
      { id: "houston-tx", name: "Houston", stateKey: "texas" },
      { id: "howard", name: "Howard", stateKey: "texas" },
      { id: "hudspeth", name: "Hudspeth", stateKey: "texas" },
      { id: "hunt", name: "Hunt", stateKey: "texas" },
      { id: "hutchinson", name: "Hutchinson", stateKey: "texas" },
      { id: "irion", name: "Irion", stateKey: "texas" },
      { id: "jack", name: "Jack", stateKey: "texas" },
      { id: "jackson-tx", name: "Jackson", stateKey: "texas" },
      { id: "jasper", name: "Jasper", stateKey: "texas" },
      { id: "jeff-davis", name: "Jeff Davis", stateKey: "texas" },
      { id: "jefferson-tx", name: "Jefferson", stateKey: "texas" },
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
      { id: "lamar-tx", name: "Lamar", stateKey: "texas" },
      { id: "lamb", name: "Lamb", stateKey: "texas" },
      { id: "lampasas", name: "Lampasas", stateKey: "texas" },
      { id: "lavaca", name: "Lavaca", stateKey: "texas" },
      { id: "lee-tx", name: "Lee", stateKey: "texas" },
      { id: "leon", name: "Leon", stateKey: "texas" },
      { id: "liberty", name: "Liberty", stateKey: "texas" },
      { id: "limestone-tx", name: "Limestone", stateKey: "texas" },
      { id: "lipscomb", name: "Lipscomb", stateKey: "texas" },
      { id: "live-oak", name: "Live Oak", stateKey: "texas" },
      { id: "llano", name: "Llano", stateKey: "texas" },
      { id: "loving", name: "Loving", stateKey: "texas" },
      { id: "lubbock", name: "Lubbock", stateKey: "texas" },
      { id: "lynn", name: "Lynn", stateKey: "texas" },
      { id: "madison-tx", name: "Madison", stateKey: "texas" },
      { id: "marion-tx", name: "Marion", stateKey: "texas" },
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
      { id: "montgomery-tx", name: "Montgomery", stateKey: "texas" },
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
      { id: "shelby-tx", name: "Shelby", stateKey: "texas" },
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
      { id: "walker-tx", name: "Walker", stateKey: "texas" },
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
  },
  ohio: {
    name: "Ohio",
    svgId: "svg-ohio",
    counties: [
      { id: "adams-oh", name: "Adams", stateKey: "ohio" },
      { id: "allen", name: "Allen", stateKey: "ohio" },
      { id: "ashland-oh", name: "Ashland", stateKey: "ohio" },
      { id: "ashtabula", name: "Ashtabula", stateKey: "ohio" },
      { id: "athens", name: "Athens", stateKey: "ohio" },
      { id: "auglaize", name: "Auglaize", stateKey: "ohio" },
      { id: "belmont", name: "Belmont", stateKey: "ohio" },
      { id: "brown-oh", name: "Brown", stateKey: "ohio" },
      { id: "butler-oh", name: "Butler", stateKey: "ohio" },
      { id: "carroll-oh", name: "Carroll", stateKey: "ohio" },
      { id: "champaign", name: "Champaign", stateKey: "ohio" },
      { id: "clark-oh", name: "Clark", stateKey: "ohio" },
      { id: "clermont", name: "Clermont", stateKey: "ohio" },
      { id: "clinton", name: "Clinton", stateKey: "ohio" },
      { id: "columbiana", name: "Columbiana", stateKey: "ohio" },
      { id: "coshocton", name: "Coshocton", stateKey: "ohio" },
      { id: "crawford-oh", name: "Crawford", stateKey: "ohio" },
      { id: "cuyahoga", name: "Cuyahoga", stateKey: "ohio" },
      { id: "darke", name: "Darke", stateKey: "ohio" },
      { id: "defiance", name: "Defiance", stateKey: "ohio" },
      { id: "delaware", name: "Delaware", stateKey: "ohio" },
      { id: "erie", name: "Erie", stateKey: "ohio" },
      { id: "fairfield", name: "Fairfield", stateKey: "ohio" },
      { id: "fayette-oh", name: "Fayette", stateKey: "ohio" },
      { id: "franklin-oh", name: "Franklin", stateKey: "ohio" },
      { id: "fulton", name: "Fulton", stateKey: "ohio" },
      { id: "gallia", name: "Gallia", stateKey: "ohio" },
      { id: "geauga", name: "Geauga", stateKey: "ohio" },
      { id: "greene-oh", name: "Greene", stateKey: "ohio" },
      { id: "guernsey", name: "Guernsey", stateKey: "ohio" },
      { id: "hamilton-oh", name: "Hamilton", stateKey: "ohio" },
      { id: "hancock", name: "Hancock", stateKey: "ohio" },
      { id: "hardin-oh", name: "Hardin", stateKey: "ohio" },
      { id: "harrison-oh", name: "Harrison", stateKey: "ohio" },
      { id: "henry-oh", name: "Henry", stateKey: "ohio" },
      { id: "highland", name: "Highland", stateKey: "ohio" },
      { id: "hocking", name: "Hocking", stateKey: "ohio" },
      { id: "holmes", name: "Holmes", stateKey: "ohio" },
      { id: "huron", name: "Huron", stateKey: "ohio" },
      { id: "jackson-oh", name: "Jackson", stateKey: "ohio" },
      { id: "jefferson-oh", name: "Jefferson", stateKey: "ohio" },
      { id: "knox-oh", name: "Knox", stateKey: "ohio" },
      { id: "lake-oh", name: "Lake", stateKey: "ohio" },
      { id: "lawrence-oh", name: "Lawrence", stateKey: "ohio" },
      { id: "licking", name: "Licking", stateKey: "ohio" },
      { id: "logan", name: "Logan", stateKey: "ohio" },
      { id: "lorain", name: "Lorain", stateKey: "ohio" },
      { id: "lucas", name: "Lucas", stateKey: "ohio" },
      { id: "madison-oh", name: "Madison", stateKey: "ohio" },
      { id: "mahoning", name: "Mahoning", stateKey: "ohio" },
      { id: "marion-oh", name: "Marion", stateKey: "ohio" },
      { id: "medina-oh", name: "Medina", stateKey: "ohio" },
      { id: "meigs", name: "Meigs", stateKey: "ohio" },
      { id: "mercer", name: "Mercer", stateKey: "ohio" },
      { id: "miami", name: "Miami", stateKey: "ohio" },
      { id: "monroe-oh", name: "Monroe", stateKey: "ohio" },
      { id: "montgomery-oh", name: "Montgomery", stateKey: "ohio" },
      { id: "morgan-oh", name: "Morgan", stateKey: "ohio" },
      { id: "morrow", name: "Morrow", stateKey: "ohio" },
      { id: "muskingum", name: "Muskingum", stateKey: "ohio" },
      { id: "noble", name: "Noble", stateKey: "ohio" },
      { id: "ottawa", name: "Ottawa", stateKey: "ohio" },
      { id: "paulding", name: "Paulding", stateKey: "ohio" },
      { id: "perry-oh", name: "Perry", stateKey: "ohio" },
      { id: "pickaway", name: "Pickaway", stateKey: "ohio" },
      { id: "pike-oh", name: "Pike", stateKey: "ohio" },
      { id: "portage-oh", name: "Portage", stateKey: "ohio" },
      { id: "preble", name: "Preble", stateKey: "ohio" },
      { id: "putnam", name: "Putnam", stateKey: "ohio" },
      { id: "richland-oh", name: "Richland", stateKey: "ohio" },
      { id: "ross", name: "Ross", stateKey: "ohio" },
      { id: "sandusky", name: "Sandusky", stateKey: "ohio" },
      { id: "scioto", name: "Scioto", stateKey: "ohio" },
      { id: "seneca", name: "Seneca", stateKey: "ohio" },
      { id: "shelby-oh", name: "Shelby", stateKey: "ohio" },
      { id: "stark", name: "Stark", stateKey: "ohio" },
      { id: "summit", name: "Summit", stateKey: "ohio" },
      { id: "trumbull", name: "Trumbull", stateKey: "ohio" },
      { id: "tuscarawas", name: "Tuscarawas", stateKey: "ohio" },
      { id: "union", name: "Union", stateKey: "ohio" },
      { id: "van-wert", name: "Van Wert", stateKey: "ohio" },
      { id: "vinton", name: "Vinton", stateKey: "ohio" },
      { id: "warren", name: "Warren", stateKey: "ohio" },
      { id: "washington-oh", name: "Washington", stateKey: "ohio" },
      { id: "wayne", name: "Wayne", stateKey: "ohio" },
      { id: "williams", name: "Williams", stateKey: "ohio" },
      { id: "wood-oh", name: "Wood", stateKey: "ohio" },
      { id: "wyandot", name: "Wyandot", stateKey: "ohio" }
    ]
  },
  wisconsin: {
    name: "Wisconsin",
    svgId: "svg-wisconsin",
    counties: [
      { id: "adams", name: "Adams", stateKey: "wisconsin" },
      { id: "ashland", name: "Ashland", stateKey: "wisconsin" },
      { id: "barron", name: "Barron", stateKey: "wisconsin" },
      { id: "bayfield", name: "Bayfield", stateKey: "wisconsin" },
      { id: "brown-wi", name: "Brown", stateKey: "wisconsin" },
      { id: "buffalo", name: "Buffalo", stateKey: "wisconsin" },
      { id: "burnett", name: "Burnett", stateKey: "wisconsin" },
      { id: "calumet", name: "Calumet", stateKey: "wisconsin" },
      { id: "chippewa", name: "Chippewa", stateKey: "wisconsin" },
      { id: "clark", name: "Clark", stateKey: "wisconsin" },
      { id: "columbia", name: "Columbia", stateKey: "wisconsin" },
      { id: "crawford", name: "Crawford", stateKey: "wisconsin" },
      { id: "dane", name: "Dane", stateKey: "wisconsin" },
      { id: "dodge", name: "Dodge", stateKey: "wisconsin" },
      { id: "door", name: "Door", stateKey: "wisconsin" },
      { id: "douglas", name: "Douglas", stateKey: "wisconsin" },
      { id: "dunn", name: "Dunn", stateKey: "wisconsin" },
      { id: "eau-claire", name: "Eau Claire", stateKey: "wisconsin" },
      { id: "florence", name: "Florence", stateKey: "wisconsin" },
      { id: "fond-du-lac", name: "Fond du Lac", stateKey: "wisconsin" },
      { id: "forest", name: "Forest", stateKey: "wisconsin" },
      { id: "grant", name: "Grant", stateKey: "wisconsin" },
      { id: "green", name: "Green", stateKey: "wisconsin" },
      { id: "green-lake", name: "Green Lake", stateKey: "wisconsin" },
      { id: "iowa", name: "Iowa", stateKey: "wisconsin" },
      { id: "iron", name: "Iron", stateKey: "wisconsin" },
      { id: "jackson-wi", name: "Jackson", stateKey: "wisconsin" },
      { id: "jefferson-wi", name: "Jefferson", stateKey: "wisconsin" },
      { id: "juneau-wi", name: "Juneau", stateKey: "wisconsin" },
      { id: "kenosha", name: "Kenosha", stateKey: "wisconsin" },
      { id: "kewaunee", name: "Kewaunee", stateKey: "wisconsin" },
      { id: "la-crosse", name: "La Crosse", stateKey: "wisconsin" },
      { id: "lafayette", name: "Lafayette", stateKey: "wisconsin" },
      { id: "langlade", name: "Langlade", stateKey: "wisconsin" },
      { id: "lincoln", name: "Lincoln", stateKey: "wisconsin" },
      { id: "manitowoc", name: "Manitowoc", stateKey: "wisconsin" },
      { id: "marathon", name: "Marathon", stateKey: "wisconsin" },
      { id: "marinette", name: "Marinette", stateKey: "wisconsin" },
      { id: "marquette", name: "Marquette", stateKey: "wisconsin" },
      { id: "menominee", name: "Menominee", stateKey: "wisconsin" },
      { id: "milwaukee", name: "Milwaukee", stateKey: "wisconsin" },
      { id: "monroe-wi", name: "Monroe", stateKey: "wisconsin" },
      { id: "oconto", name: "Oconto", stateKey: "wisconsin" },
      { id: "oneida", name: "Oneida", stateKey: "wisconsin" },
      { id: "outagamie", name: "Outagamie", stateKey: "wisconsin" },
      { id: "ozaukee", name: "Ozaukee", stateKey: "wisconsin" },
      { id: "pepin", name: "Pepin", stateKey: "wisconsin" },
      { id: "pierce", name: "Pierce", stateKey: "wisconsin" },
      { id: "polk-wi", name: "Polk", stateKey: "wisconsin" },
      { id: "portage", name: "Portage", stateKey: "wisconsin" },
      { id: "price", name: "Price", stateKey: "wisconsin" },
      { id: "racine", name: "Racine", stateKey: "wisconsin" },
      { id: "richland", name: "Richland", stateKey: "wisconsin" },
      { id: "rock", name: "Rock", stateKey: "wisconsin" },
      { id: "rusk-wi", name: "Rusk", stateKey: "wisconsin" },
      { id: "st-croix", name: "Saint Croix", stateKey: "wisconsin" },
      { id: "sauk", name: "Sauk", stateKey: "wisconsin" },
      { id: "sawyer", name: "Sawyer", stateKey: "wisconsin" },
      { id: "shawano", name: "Shawano", stateKey: "wisconsin" },
      { id: "sheboygan", name: "Sheboygan", stateKey: "wisconsin" },
      { id: "taylor-wi", name: "Taylor", stateKey: "wisconsin" },
      { id: "trempealeau", name: "Trempealeau", stateKey: "wisconsin" },
      { id: "vernon", name: "Vernon", stateKey: "wisconsin" },
      { id: "vilas", name: "Vilas", stateKey: "wisconsin" },
      { id: "walworth", name: "Walworth", stateKey: "wisconsin" },
      { id: "washburn", name: "Washburn", stateKey: "wisconsin" },
      { id: "washington-wi", name: "Washington", stateKey: "wisconsin" },
      { id: "waukesha", name: "Waukesha", stateKey: "wisconsin" },
      { id: "waupaca", name: "Waupaca", stateKey: "wisconsin" },
      { id: "waushara", name: "Waushara", stateKey: "wisconsin" },
      { id: "winnebago", name: "Winnebago", stateKey: "wisconsin" },
      { id: "wood-wi", name: "Wood", stateKey: "wisconsin" }
    ]
  }
};

function usesCountyEquivalents(stateKey) {
  return ["alaska", "louisiana", "connecticut", "virginia", "district_of_columbia", "puerto_rico", "nevada", "maryland", "missouri",
          "guam", "american_samoa", "northern_mariana_islands", "united_states_virgin_islands"].includes(stateKey);
}
function countyWord(stateKey, n) {
  const one = n === 1;
  return usesCountyEquivalents(stateKey) ? (one ? "county equivalent" : "county equivalents") : (one ? "county" : "counties");
}

function unitWord(plural) {
  const keys = [...activeStateKeys];
  const eq = keys.some(usesCountyEquivalents);
  return eq ? (plural ? "county equivalents" : "county equivalent") : (plural ? "counties" : "county");
}

function applyUnitWords() {
  document.querySelectorAll("[data-unit]").forEach(el => { el.textContent = unitWord(el.dataset.unit === "plural"); });
  const s = document.getElementById("county-search");
  if (s) s.placeholder = `Search ${unitWord(true)}…`;
}

const CALLOUT_ROOM = { virginia: { top: 800, bottom: 800, right: 160 } };
function withCalloutRoom(key, viewBox) {
  const room = CALLOUT_ROOM[key];
  const v = String(viewBox).trim().split(/[\s,]+/).map(Number);
  if (!room || v.length !== 4 || v.some(n => !isFinite(n)) || v[1] < 0) return viewBox;
  const [x, y, w, h] = v;
  return `${x} ${y - room.top} ${w + room.right} ${h + room.top + room.bottom}`;
}

(function registerManifestStates() {
  const list = window.__stateManifest;
  if (!Array.isArray(list) || !list.length) return;
  const esc = t => String(t).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const wrapper = document.querySelector(".map-wrapper");
  const rowsHolder = document.querySelector("#screen-setup .states-list");
  list.forEach(m => {
    if (!m || !m.key || !m.svgId || !Array.isArray(m.counties) || stateData[m.key]) return;
    stateData[m.key] = {
      name: m.name,
      svgId: m.svgId,
      counties: m.counties.map(([id, name]) => ({ id, name, stateKey: m.key }))
    };
    if (wrapper && !document.getElementById(m.svgId)) {
      const w = Math.round(Math.min(580, Math.max(330, 330 + 1.5 * (m.counties.length - 20))));
      wrapper.insertAdjacentHTML("beforeend",
        `<div class="map-box hidden" data-state="${esc(m.key)}">` +
        `<svg id="${esc(m.svgId)}" class="state-map hidden" viewBox="${esc(withCalloutRoom(m.key, m.viewBox))}" data-unit-scale="${esc(m.scale || 20)}" ` +
        `width="100%" xmlns="http://www.w3.org/2000/svg" aria-label="Map of ${esc(m.name)} Counties" style="--w:${w}px"></svg></div>`);
    }
    if (rowsHolder && !document.getElementById("state-" + m.key)) {
      const looseName = t => String(t).toLowerCase().replace(/united states/g, "us").replace(/[^a-z]/g, "");
      rowsHolder.querySelectorAll(".state-row.disabled").forEach(r => {
        if (looseName(r.querySelector(".state-name")?.textContent || "") === looseName(m.name)) r.remove();
      });
      const row = document.createElement("div");
      row.className = "state-row";
      row.id = "state-" + m.key;
      row.dataset.state = m.key;
      row.innerHTML = `<span class="state-name">${esc(m.name)}</span> <span class="state-count">${m.counties.length} ${countyWord(m.key, m.counties.length)}</span>`;
      const playable = [...rowsHolder.querySelectorAll(".state-row:not(.disabled)")];
      const next = playable.find(r => (r.querySelector(".state-name")?.textContent || "").localeCompare(m.name) > 0);
      if (next) rowsHolder.insertBefore(row, next);
      else if (playable.length) playable[playable.length - 1].after(row);
      else rowsHolder.appendChild(row);
    }
  });
})();

(function addMapStateLabels() {
  document.querySelectorAll(".map-box[data-state]").forEach(box => {
    const st = stateData[box.dataset.state];
    if (!st || box.querySelector(".map-state-label")) return;
    const label = document.createElement("span");
    label.className = "map-state-label";
    label.textContent = st.name;
    label.setAttribute("aria-hidden", "true");
    box.classList.add("has-state-label");
    box.prepend(label);
  });
})();


let selectedMode = "pin";
const TYPE_MODES = new Set(["type", "type-hard", "type-strict", "mc"]);
const SINGLE_TARGET_TYPE_MODES = new Set(["type-hard", "type-strict", "mc"]);
const REVEAL_ANSWER_AFTER_MISTAKES = 3;
const MODE_LIST = ["pin", "pin-hard", "mc", "type", "type-strict", "type-hard"];
const MODE_LABELS = {
  pin: "Pin",
  "pin-hard": "Flash",
  mc: "Multiple-Choice",
  type: "List",
  "type-hard": "Identify",
  "type-strict": "Type",
};
let activeStateKeys = [];
let selectedCounties = [];
let currentGameRunId = null;
let targetPool = [];
let currentTarget = null;
let scoreRight = 0;
let scoreWrong = 0;
let isGameActive = false;
let startTime = 0;
let lastRunWasNewBest = false;
let updateHandle = null;
let finalTime = 0;
let pausedByTab = false;
let missedCounties = new Set();
let forfeitedCount = 0;
let currentRunIsRetryMissed = false;
let currentRunHadMistake = false;
let currentAttemptMistakes = 0;
let totalTargetsCount = 0;
let originalTargetList = [];
let countyListViaZoom = false;   // true when the list was opened by a state's "List" button (which also zooms)
let kalawaoCalloutCreated = false;
let sfCalloutCreated = false;
let skagwayCalloutCreated = false;
let bristolBayCalloutCreated = false;

      
const VIRGINIA_CALLOUTS = [
  ["norton-va", 0, 74],
  ["bristol-va", 0, 37],
  ["galax", -4, 38],
  ["radford", -16, 92],
  ["salem-va", -39, 112],
  ["covington-va", -24, 170],
  ["martinsville", 11, 40],
  ["lexington-va", -7, 170],
  ["buena-vista-va", 31, 164],
  ["emporia", -65, 43],
  ["colonial-heights", -31, 111],
  ["petersburg-va", -9, 104],
  ["hopewell", 5, 114],
  ["williamsburg-va", -5, 114],
  ["poquoson", 30, 98],
  ["staunton", -13, -179],
  ["waynesboro", -5, -190],
  ["harrisonburg", 16, -145],
  ["charlottesville", 2, -193],
  ["winchester", -2, -58],
  ["manassas", -43, -108],
  ["fredericksburg", -21, -160],
  ["manassas-park", 0, -104],
  ["fairfax-city", 9, -94],
  ["falls-church", 20, -90],
  ["alexandria", 36, -98],
  ["franklin-city", 0, 100],
  ["arlington", 30, -90],
];
const virginiaCalloutsDone = {};
// ---- Virginia callouts: every circle goes to the nearest empty spot ----
let virginiaLayout = null;

function vaShapeCenter(svg, el) {
  try {
    let b = el.getBBox();
    const d = el.getAttribute("d");
    if (d && d.indexOf("M", 1) > 0) {                         // several pieces: use the biggest one, like the callouts do
      const tmp = document.createElementNS("http://www.w3.org/2000/svg", "path");
      tmp.style.visibility = "hidden";
      svg.appendChild(tmp);
      let best = null;
      (d.match(/M[^M]*/g) || []).forEach(piece => {
        tmp.setAttribute("d", piece);
        const pb = tmp.getBBox();
        if (!best || pb.width * pb.height > best.width * best.height) best = pb;
      });
      svg.removeChild(tmp);
      if (best) b = best;
    }
    return (b.width || b.height) ? [b.x + b.width / 2, b.y + b.height / 2] : null;
  } catch (e) { return null; }
}

// returns [[id, offsetX, offsetY], ...] in the same units VIRGINIA_CALLOUTS used
function layoutVirginiaCallouts(svg) {
  if (virginiaLayout) return virginiaLayout;
  const us = parseFloat(svg.dataset && svg.dataset.unitScale) || 1;
  const R = 9 * us;                                           // circle radius (matches the 9 in the setupCountyCallout call)
  const vbs = svg.viewBox && svg.viewBox.baseVal;
  const vb = vbs && vbs.width ? vbs : svg.getBBox();
  const W = 700, cell = vb.width / W, H = Math.ceil(vb.height / cell);

  // 1. paint every county onto a small hidden canvas, so we know where the land is
  const cv = document.createElement("canvas");
  cv.width = W; cv.height = H;
  const ctx = cv.getContext("2d", { willReadFrequently: true });
  ctx.setTransform(1 / cell, 0, 0, 1 / cell, -vb.x / cell, -vb.y / cell);
  ctx.fillStyle = "#000";
  svg.querySelectorAll("path").forEach(p => {
    if (p.closest("defs")) return;
    const d = p.getAttribute("d");
    if (d) ctx.fill(new Path2D(d), "evenodd");
  });
  const px = ctx.getImageData(0, 0, W, H).data;
    // running totals of land, so "how much land is around this spot?" is instant
  const sat = new Int32Array((W + 1) * (H + 1));
  for (let y = 0; y < H; y++) {
    let rowSum = 0;
    for (let x = 0; x < W; x++) {
      rowSum += px[(y * W + x) * 4 + 3] > 40 ? 1 : 0;
      sat[(y + 1) * (W + 1) + x + 1] = sat[y * (W + 1) + x + 1] + rowSum;
    }
  }
  const landFrac = (x, y, h) => {
    const x0 = Math.max(0, x - h), x1 = Math.min(W, x + h + 1), y0 = Math.max(0, y - h), y1 = Math.min(H, y + h + 1);
    const s = sat[y1 * (W + 1) + x1] - sat[y0 * (W + 1) + x1] - sat[y1 * (W + 1) + x0] + sat[y0 * (W + 1) + x0];
    return s / ((2 * h + 1) * (2 * h + 1));
  };

  // 2. for every cell, how far is it from the nearest land? (two-pass distance map)
  const dist = new Float32Array(W * H);
  for (let i = 0; i < W * H; i++) dist[i] = px[i * 4 + 3] > 40 ? 0 : 1e9;
  const D = 1.414;
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const i = y * W + x; let d = dist[i];
    if (x > 0) d = Math.min(d, dist[i - 1] + 1);
    if (y > 0) {
      d = Math.min(d, dist[i - W] + 1);
      if (x > 0) d = Math.min(d, dist[i - W - 1] + D);
      if (x < W - 1) d = Math.min(d, dist[i - W + 1] + D);
    }
    dist[i] = d;
  }
  for (let y = H - 1; y >= 0; y--) for (let x = W - 1; x >= 0; x--) {
    const i = y * W + x; let d = dist[i];
    if (x < W - 1) d = Math.min(d, dist[i + 1] + 1);
    if (y < H - 1) {
      d = Math.min(d, dist[i + W] + 1);
      if (x < W - 1) d = Math.min(d, dist[i + W + 1] + D);
      if (x > 0) d = Math.min(d, dist[i + W - 1] + D);
    }
    dist[i] = d;
  }

  // 3. the cities, shallowest (nearest the coast / border) first so they get their ideal spot
  const items = [];
  VIRGINIA_CALLOUTS.forEach(([id, ox, oy]) => {
    const el = document.getElementById(id);
    const c = el && vaShapeCenter(svg, el);
    if (!c) return;
    const col = Math.min(W - 1, Math.max(0, Math.floor((c[0] - vb.x) / cell)));
    const row = Math.min(H - 1, Math.max(0, Math.floor((c[1] - vb.y) / cell)));
    items.push({ id, ox, oy, cx: c[0], cy: c[1], col, row, depth: dist[row * W + col] });
  });
  items.sort((a, b) => a.depth - b.depth);

  // 4. each one takes a nearby empty spot with room for the circle, leaves room for a visible arrow, isn't
  //    wedged into a corner of the coast, and whose arrow crosses as little land as possible and doesn't
  //    cross other arrows, other circles or other cities
  const Rc = R / cell;
  const clear = Rc + 1.5;                                     // distance a circle's centre must keep from land
  const sep = 2 * Rc + 3;                                     // distance between two circle centres
  const minArrow = Rc * 3.2;                                  // circle centre to its city: leaves a visible arrow
  const half = Math.ceil(2 * Rc);                             // "how crowded is it here" is measured in a box this big
  const m = Math.ceil(Rc) + 1;                                // stay inside the picture
  const lineGap = Rc + 2;                                     // arrows keep this far from other circles
  const nearCity = Rc * 0.8;                                  // arrows keep this far from other cities' centres
  const LAND_COST = 2;     
  const CROWD_COST = 80;                                   // extra cost per cell of land an arrow crosses (higher = avoids land harder)
  const WANT = 2500;                                          // how many nearby spots to compare for each city

  const segDist2 = (px, py, ax, ay, bx, by) => {              // squared distance from a point to a line segment
    const dx = bx - ax, dy = by - ay, l2 = dx * dx + dy * dy;
    let t = l2 ? ((px - ax) * dx + (py - ay) * dy) / l2 : 0;
    t = Math.max(0, Math.min(1, t));
    const qx = ax + t * dx - px, qy = ay + t * dy - py;
    return qx * qx + qy * qy;
  };
  const orient = (ax, ay, bx, by, cx, cy) => (bx - ax) * (cy - ay) - (by - ay) * (cx - ax);
  const crosses = (ax, ay, bx, by, cx, cy, dx, dy) =>
    orient(ax, ay, bx, by, cx, cy) * orient(ax, ay, bx, by, dx, dy) < 0 &&
    orient(cx, cy, dx, dy, ax, ay) * orient(cx, cy, dx, dy, bx, by) < 0;
  const landLen = (x, y, tx, ty) => {                         // how many cells of land the arrow passes over
    const n = Math.max(1, Math.ceil(Math.hypot(tx - x, ty - y)));
    let c = 0;
    for (let s = 0; s <= n; s++) {
      const qx = Math.round(x + (tx - x) * s / n), qy = Math.round(y + (ty - y) * s / n);
      if (qx >= 0 && qy >= 0 && qx < W && qy < H && dist[qy * W + qx] === 0) c++;
    }
    return c;
  };

  items.forEach(it => { it.tx = (it.cx - vb.x) / cell; it.ty = (it.cy - vb.y) / cell; });   // each city, in canvas cells

  // strictest rules first; relax only if a city has nowhere to go: [max land nearby, avoid arrows/circles, avoid other cities]
  const passes = [[0.4, true, true], [0.6, true, true], [1.01, true, true], [1.01, true, false], [1.01, false, false]];
  const placed = [], out = [];
  items.forEach(it => {
    const tx = it.tx, ty = it.ty;
    const ok = (x, y, maxLand, lines, avoidCities) => {
      if (x < m || y < m || x >= W - m || y >= H - m) return false;
      if (dist[y * W + x] < clear) return false;
      if ((x - tx) * (x - tx) + (y - ty) * (y - ty) < minArrow * minArrow) return false;
      if (landFrac(x, y, half) > maxLand) return false;
      for (const p of placed) {
        if ((p.x - x) * (p.x - x) + (p.y - y) * (p.y - y) < sep * sep) return false;
        if (!lines) continue;
        if (segDist2(p.x, p.y, x, y, tx, ty) < lineGap * lineGap) return false;           // my arrow through their circle
        if (segDist2(x, y, p.x, p.y, p.tx, p.ty) < lineGap * lineGap) return false;       // their arrow through my circle
        if (crosses(x, y, tx, ty, p.x, p.y, p.tx, p.ty)) return false;                    // arrows crossing
      }
      if (avoidCities) {
        for (const o of items) {
          if (o === it) continue;
          if (segDist2(o.tx, o.ty, x, y, tx, ty) < nearCity * nearCity) return false;     // my arrow over another city
        }
      }
      return true;
    };

    let best = null;
    const x0 = Math.round(tx), y0 = Math.round(ty), limit = Math.max(W, H);
    for (const [maxLand, lines, avoidCities] of passes) {
      const cands = [];
      const test = (x, y) => { if (ok(x, y, maxLand, lines, avoidCities)) cands.push([x, y]); };
      for (let k = 0; k <= limit && cands.length < WANT; k++) {   // collect the nearest valid spots, ring by ring
        if (k === 0) { test(x0, y0); continue; }
        for (let d = -k; d <= k; d++) { test(x0 + d, y0 - k); test(x0 + d, y0 + k); }
        for (let d = -k + 1; d <= k - 1; d++) { test(x0 - k, y0 + d); test(x0 + k, y0 + d); }
      }
      let bestCost = Infinity;
      cands.forEach(([x, y]) => {                               // pick the cheapest: short arrow, little land crossed
         const cost = Math.hypot(x - tx, y - ty) + LAND_COST * landLen(x, y, tx, ty) + CROWD_COST * landFrac(x, y, half);
        if (cost < bestCost) { bestCost = cost; best = { x, y }; }
      });
      if (best) break;
    }

    if (best) {
      placed.push({ x: best.x, y: best.y, tx, ty });
      out.push([it.id, (vb.x + (best.x + 0.5) * cell - it.cx) / us, (vb.y + (best.y + 0.5) * cell - it.cy) / us]);
    } else {
      out.push([it.id, it.ox, it.oy]);                        // no room found: keep the old hand-made offset
    }
  });

  if (out.length) virginiaLayout = out;
  return out;

}


let virginiaCitiesRaised = false;
// extra callouts: [countyId, offsetX, offsetY]  (offsets are in the same units as VIRGINIA_CALLOUTS)
const EXTRA_CALLOUTS = {
  american_samoa: [
    ["swains-island", 90, 90, null, 30],
    ["rose-island", -90, -90, null, 30]
  ],
  texas: [
    ["aransas", 65, 35, [0.6, 1.4]]
  ],
  alaska: [
    ["haines", 40, -20, [0.8, 0.3], 14],
    ["aleutians-west", 0, -55, null, 18],
  ],
};

const RAISE_ON_TOP = {
  colorado: ["adams-co", "weld", "arapahoe", "jefferson-co"]
};

const extraCalloutsDone = {};


let ambiguousCountyNames = new Set();


function computeAmbiguousNames(counties) {
  const nameCounts = {};
  counties.forEach(c => {
    nameCounts[c.name] = (nameCounts[c.name] || 0) + 1;
  });
  return new Set(Object.keys(nameCounts).filter(name => nameCounts[name] > 1));
}


function getDisplayName(county) {
  if (!county) return "";
  if (ambiguousCountyNames.has(county.name)) {
    const stateName = stateData[county.stateKey]?.name || county.stateKey;
    return `${county.name}, ${stateName}`;
  }
  return county.name;
}


function getPlainName(county) {
  return county ? county.name : "";
}

const AUDIO_PUBLIC = true;
const AUDIO_DIR = "audio/";
(function readAudioSwitch() {
  try {
    const q = new URLSearchParams(location.search).get("audio");
    if (q === "1") localStorage.setItem("audioBeta", "1");
    else if (q === "0") localStorage.removeItem("audioBeta");
  } catch (e) {  }
})();
function audioBetaOn() { try { return localStorage.getItem("audioBeta") === "1"; } catch (e) { return false; } }
function audioFeatureOn() { return AUDIO_PUBLIC || audioBetaOn(); }

function audioSlug(name) {
  return String(name).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
    .replace(/['\u2019\u02BB]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

let audioShared = null, audioByState = {}, audioExt = "mp3";
function indexAudioManifest() {
  const m = window.__audioManifest;
  if (!m) return;
  audioExt = m.ext || "mp3";
  audioShared = new Set(m.shared || []);
  audioByState = {};
  for (const [k, v] of Object.entries(m.state || {})) audioByState[k] = new Set(v);
}
(function loadAudioManifest() {
  if (!audioFeatureOn()) return;
  if (window.__audioManifest) { indexAudioManifest(); return; }
  const tag = document.createElement("script");
  tag.src = AUDIO_DIR + "manifest.js";
  tag.onload = () => { indexAudioManifest(); tag.remove(); };
  tag.onerror = () => tag.remove();
  document.head.appendChild(tag);
})();

function audioSrcFor(county) {
  if (!audioShared || !county) return null;
  const slug = audioSlug(county.name);
  const swap = s => /^saint(e?)-/.test(s) ? s.replace(/^saint(e?)-/, "st$1-") : s.replace(/^st(e?)-/, "saint$1-");
  for (const s of [slug, swap(slug)]) {
    if (audioByState[county.stateKey] && audioByState[county.stateKey].has(s)) return `${AUDIO_DIR}${county.stateKey}/${s}.${audioExt}`;
    if (audioShared.has(s)) return `${AUDIO_DIR}${s}.${audioExt}`;
  }
  return null;
}
function speakerKind(county) {
  if (!audioFeatureOn() || !county) return null;
  if (audioSrcFor(county)) return "recording";
  return null;
}
const SPEAKER_ICON = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path fill="currentColor" d="M3 9v6h4l5 4V5L7 9H3z"/><path fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13"/></svg>';
function createSpeakerButton(county) {
  const kind = speakerKind(county);
  if (!kind) return null;
  const b = document.createElement("button");
  b.type = "button";
  b.className = "speak-btn" + (kind === "test" ? " speak-test" : "");
  b.dataset.speakName = county.name;
  b.dataset.speakState = county.stateKey || "";
  b.setAttribute("aria-label", `Hear ${county.name}`);
  b.title = kind === "test" ? `Hear ${county.name} (test voice, not the real recording)` : `Hear ${county.name}`;
  b.innerHTML = SPEAKER_ICON;
  return b;
}
function speakerHTML(county) {
  const b = createSpeakerButton(county);
  return b ? b.outerHTML : "";
}
function appendSpeaker(el, county) {
  const b = el && createSpeakerButton(county);
  if (b) el.append(" ", b);
}

let audioPlayer = null, audioBusyBtn = null;
function stopCountyAudio() {
  if (audioPlayer) { audioPlayer.pause(); audioPlayer = null; }
  if (window.speechSynthesis) window.speechSynthesis.cancel();
  if (audioBusyBtn) { audioBusyBtn.classList.remove("speaking"); audioBusyBtn = null; }
}
function playCountyAudio(btn) {
  const county = { name: btn.dataset.speakName, stateKey: btn.dataset.speakState };
  stopCountyAudio();
  audioBusyBtn = btn;
  const done = () => { if (audioBusyBtn === btn) { btn.classList.remove("speaking"); audioBusyBtn = null; } };
  const failed = () => { done(); btn.classList.add("speak-failed"); setTimeout(() => btn.classList.remove("speak-failed"), 1500); };
  const src = audioSrcFor(county);
  btn.classList.add("speaking");
  if (src) {
    const a = new Audio(src);
    audioPlayer = a;
    a.addEventListener("ended", done);
    a.addEventListener("error", failed);
    const p = a.play();
    if (p && p.catch) p.catch(failed);
  } else if (audioBetaOn() && window.speechSynthesis) {
    const u = new SpeechSynthesisUtterance(county.name);
    u.lang = "en-US"; u.rate = 0.9;
    u.onend = done; u.onerror = done;
    window.speechSynthesis.speak(u);
  } else {
    failed();
  }
}
function playCountyAudioFor(county) {
  if (!audioFeatureOn() || !county || !audioSrcFor(county)) return;
  const stub = document.createElement("button");           // playCountyAudio wants a button to read the name from
  stub.dataset.speakName = county.name;
  stub.dataset.speakState = county.stateKey || "";
  playCountyAudio(stub);
}
document.addEventListener("mousedown", e => { if (e.target.closest && e.target.closest(".speak-btn")) e.preventDefault(); });
document.addEventListener("click", e => {
  const b = e.target.closest && e.target.closest(".speak-btn");
  if (b) { e.preventDefault(); playCountyAudio(b); }
});



function getDisplayParts(county) {
  if (!county) return { name: "", state: null };
  if (ambiguousCountyNames.has(county.name)) {
    const stateName = stateData[county.stateKey]?.name || county.stateKey;
    return { name: county.name, state: stateName };
  }
  return { name: county.name, state: null };
}

function getStateNameForCounty(county) {
  if (!county) return "";
  return stateData[county.stateKey]?.name || county.stateKey || "";
}


function foldDiacriticsForComparison(str) {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}


function normalizeTypedName(str) {
  let result = str
    .normalize("NFC")
    .toLowerCase()
    .replace(/[\u2018\u2019'`´]/g, "'")
    .trim()
    .replace(/\s+/g, " ");
  if (!gameSettings.requireDiacritics) {
    result = foldDiacriticsForComparison(result).replace(/[\u02BB']/g, "");
  }
  if (!gameSettings.requireDiacritics || gameSettings.acceptStAbbrev !== false) {
    result = result
      .replace(/\bste\b\.?\s*/g, "sainte ")
      .replace(/\bst\b\.?\s*/g, "saint ")
      .replace(/\s+/g, " ")
      .trim();
  }
  return result;
}


function findAllPoolMatchesByName(normalized) {
  return targetPool.filter(c => normalizeTypedName(c.name) === normalized);
}


function getTypedGuessMatches(normalized) {
  if (SINGLE_TARGET_TYPE_MODES.has(selectedMode)) {
    return (currentTarget && normalizeTypedName(currentTarget.name) === normalized)
      ? [currentTarget]
      : [];
  }
  return findAllPoolMatchesByName(normalized);
}


function findCountyById(id) {
  for (const key in stateData) {
    const found = stateData[key].counties.find(c => c.id === id);
    if (found) return found;
  }
  return null;
}

window.findCountyForAccount = findCountyById;
window.countyCountForAccount = key => (stateData[key] ? stateData[key].counties.length : null);

function getCountyElements(id) {
  const elements = [];
  const mainEl = document.getElementById(id);
  if (mainEl) elements.push(mainEl);
  document.querySelectorAll(`[data-county-id="${id}"]`).forEach(el => {
    if (el.id !== id) elements.push(el);
  });
  return elements;
}


function readStoredJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    const value = JSON.parse(raw);
    return value && typeof value === "object" ? value : fallback;
  } catch (e) {
    return fallback;
  }
}

let countyProgress = readStoredJson("countyProgress", {});
let countyMistakes = readStoredJson("countyMistakes", {});
let perfectTimes = readStoredJson("perfectTimes", {});
const DEFAULT_SETTINGS = {
  darkMode: false,
  highContrast: false,
  soundVolume: 50,
  speedrunMode: false,
  instantTypeCheck: true,
  hideStatsByDefault: true,
  listByState: true,
  sortStatesAlphabetically: true,
  showCountyList: true,
  scaleStatesBySize: false,
  useDividersForFewStates: true,
  statesPerRow: 2,
  requireDiacritics: false,
  acceptStAbbrev: true,
  showStateInPrompt: true,
  revealAnswerAfterMistakes: true,
  showStopwatch: true,
  bestKnownCount: 5,
  learnCount: 5,
  showHoverNames: true,
  autoScrollToState: true,
  autoZoom: true,
  reviewArrowsOn: false
};
let gameSettings = { ...DEFAULT_SETTINGS, ...readStoredJson("gameSettings", {}) };
function saveSettings() { localStorage.setItem("gameSettings", JSON.stringify(gameSettings)); }

// One row per simple setting control: which element, which gameSettings key,
// and what extra work to do after it changes. Used both to fill the controls
// from saved settings (applySettings) and to wire up their change handlers.
const asCheckbox = { read: el => el.checked, write: (el, v) => { el.checked = v; } };
const asNumber   = { read: el => Number(el.value), write: (el, v) => { el.value = v; } };
const asSelect   = { read: el => parseInt(el.value, 10) || 2, write: (el, v) => { el.value = String(v); } };
const SETTING_CONTROLS = [
  { id: "toggle-dark", key: "darkMode", ...asCheckbox, after: () => {
      localStorage.setItem("darkMode", JSON.stringify(gameSettings.darkMode));
      applySettings();
  } },
  { id: "toggle-contrast", key: "highContrast", ...asCheckbox, after: () => applySettings() },
  { id: "slider-sound", key: "soundVolume", event: "input", ...asNumber },
  { id: "toggle-speedrun", key: "speedrunMode", ...asCheckbox },
  { id: "toggle-stopwatch", key: "showStopwatch", ...asCheckbox },
  { id: "toggle-instant-check", key: "instantTypeCheck", ...asCheckbox },
  { id: "toggle-hide-stats-default", key: "hideStatsByDefault", ...asCheckbox, after: () => renderStatsPanel() },
  { id: "toggle-list-by-state", key: "listByState", ...asCheckbox, after: () => renderCountyListPanel() },
  { id: "toggle-show-county-list", key: "showCountyList", ...asCheckbox, after: () => applyCountyListSetting() },
  { id: "toggle-sort-states-alpha", key: "sortStatesAlphabetically", ...asCheckbox, after: () => {
      renderCountyCheckboxes(); renderStatsPanel(); applyMapDomOrder();
  } },
  { id: "toggle-scale-states-by-size", key: "scaleStatesBySize", ...asCheckbox, after: () => updateMapLayoutMode() },
  { id: "toggle-dividers-for-few-states", key: "useDividersForFewStates", ...asCheckbox, after: () => updateMapLayoutMode() },
  { id: "select-states-per-row", key: "statesPerRow", ...asSelect, after: () => updateMapGridColumns() },
  { id: "toggle-require-diacritics", key: "requireDiacritics", ...asCheckbox, after: () => {
      syncStAbbrevSettingUI(); refreshSpecialCharsBar();
  } },
  { id: "toggle-accept-st-abbrev", key: "acceptStAbbrev", ...asCheckbox },
  { id: "toggle-show-state-in-prompt", key: "showStateInPrompt", ...asCheckbox, after: () => { if (isGameActive) refreshTargetPrompt(false); } },
  { id: "toggle-reveal-answer", key: "revealAnswerAfterMistakes", ...asCheckbox },
  { id: "select-learn-count", key: "learnCount", ...asSelect, after: () => {
      const r = document.getElementById("home-learn-count"), o = document.getElementById("home-learn-count-out");
      if (r) r.value = gameSettings.learnCount; if (o) o.textContent = gameSettings.learnCount;
  } },
  { id: "toggle-hover-names", key: "showHoverNames", ...asCheckbox },
  { id: "toggle-auto-scroll", key: "autoScrollToState", ...asCheckbox },
  { id: "toggle-auto-zoom", key: "autoZoom", ...asCheckbox },
];
if (gameSettings.revealAnswerAfterMistakes === undefined) gameSettings.revealAnswerAfterMistakes = true;
if (gameSettings.scaleStatesBySize === undefined) gameSettings.scaleStatesBySize = false;
if (gameSettings.useDividersForFewStates === undefined) gameSettings.useDividersForFewStates = true;
if (gameSettings.statesPerRow === undefined) gameSettings.statesPerRow = 2;
if (gameSettings.requireDiacritics === undefined) gameSettings.requireDiacritics = false;
if (gameSettings.acceptStAbbrev === undefined) gameSettings.acceptStAbbrev = true;
if (!Number.isInteger(gameSettings.bestKnownCount) || gameSettings.bestKnownCount < 1) gameSettings.bestKnownCount = 5;


let statsHiddenOverride = {};

const STUDY_KEY = "studyLearnedByMode";
const STUDY_MODE_LIST = ["pin", "mc", "type"];
const STUDY_MODE_LABELS = { pin: "Pin", mc: "Multiple-Choice", type: "Type" };
let statsLearnMode = "all";
let statsView = "play";
function loadStudyLearned() { try { return JSON.parse(localStorage.getItem(STUDY_KEY)) || {}; } catch (e) { return {}; } }
function isStudyLearned(id, mode) { const r = loadStudyLearned()[id]; return !!(r && r[mode]); }
function setStudyLearned(id, mode, yes) {
  const all = loadStudyLearned(), rec = all[id] || {};
  if (yes) rec[mode] = true; else delete rec[mode];
  if (Object.keys(rec).length) all[id] = rec; else delete all[id];
  localStorage.setItem(STUDY_KEY, JSON.stringify(all));
}


function isStatsHidden(stateKey) {
  return Object.prototype.hasOwnProperty.call(statsHiddenOverride, stateKey)
    ? statsHiddenOverride[stateKey]
    : gameSettings.hideStatsByDefault;
}


function getOrderedStateKeys() {
  if (!gameSettings.sortStatesAlphabetically) return [...activeStateKeys];
  return [...activeStateKeys].sort((a, b) => {
    const nameA = stateData[a]?.name || a;
    const nameB = stateData[b]?.name || b;
    return nameA.localeCompare(nameB);
  });
}


const screens = document.querySelectorAll(".screen");
const btnGotoModes = document.getElementById("btn-goto-modes");
const btnGotoSettings = document.getElementById("btn-goto-settings");
const btnGotoRecords = document.getElementById("btn-goto-records");
const recordsList = document.getElementById("records-list");
const recordsEmpty = document.getElementById("records-empty");
const recordsSort = document.getElementById("records-sort");
const recordsTimesSort = document.getElementById("records-times-sort");
const backButtons = document.querySelectorAll(".btn-back");
const modeButtons = document.querySelectorAll(".btn-mode[data-mode]");


const countyPanel = document.getElementById("county-options-panel");
const statsPanel = document.getElementById("state-stats-panel");
const statsSections = document.getElementById("state-stats-sections");
const statsDivider = document.querySelector("#screen-setup .soft-divider");
const radioSpecific = document.querySelectorAll('input[name="specific-counties"]');
const checkboxContainer = document.getElementById("checkbox-container");
const setupModeIndicator = document.getElementById("setup-mode-indicator");
const btnStartGame = document.getElementById("btn-start-game");
const suggestionBox = document.getElementById("suggestion-box");
const btnSelectSuggested = document.getElementById("btn-select-suggested");
const btnDeselectAll = document.getElementById("btn-deselect-all");
const btnSelectAllStates = document.getElementById("btn-select-all-states");
const btnDeselectAllStates = document.getElementById("btn-deselect-all-states");


const toggleDark = document.getElementById("toggle-dark");
const toggleContrast = document.getElementById("toggle-contrast");
const sliderSound = document.getElementById("slider-sound");
const toggleSpeedrun = document.getElementById("toggle-speedrun");
const toggleStopwatch = document.getElementById("toggle-stopwatch");
const toggleInstantCheck = document.getElementById("toggle-instant-check");
const toggleHideStatsDefault = document.getElementById("toggle-hide-stats-default");
const toggleListByState = document.getElementById("toggle-list-by-state");
const toggleSortStatesAlpha = document.getElementById("toggle-sort-states-alpha");
const toggleScaleStatesBySize = document.getElementById("toggle-scale-states-by-size");
const toggleDividersForFewStates = document.getElementById("toggle-dividers-for-few-states");
const selectStatesPerRow = document.getElementById("select-states-per-row");
const toggleRequireDiacritics = document.getElementById("toggle-require-diacritics");
const toggleAcceptStAbbrev = document.getElementById("toggle-accept-st-abbrev");
const settingAcceptStAbbrev = document.getElementById("setting-accept-st-abbrev");
const toggleShowStateInPrompt = document.getElementById("toggle-show-state-in-prompt");
const toggleRevealAnswerAfterMistakes = document.getElementById("toggle-reveal-answer");
const btnResetProgress = document.getElementById("btn-reset-progress");
const inputBestKnownCount = document.getElementById("input-best-known-count");


const progressCounter = document.getElementById("progress-counter");
const gameStopwatch = document.getElementById("game-stopwatch");
const targetPrompt = document.getElementById("target-prompt");
const feedbackEl = document.getElementById("feedback");
const typeInputBox = document.getElementById("type-input-box");
const mcOptions = document.getElementById("mc-options");
const typeInput = document.getElementById("type-input");
const DESIGNATIONS = ["County", "Parish", "Borough", "Census Area", "Planning Region", "Independent City", "Municipality", "Island", "District", "Atoll", "District of Columbia", "Guam", "United States Minor Outlying Island"];
// The Ultimate Challenge designation picker: a triangle that opens a list drawn by the game itself.
// Behaves like a form field: .value, .disabled, .classList, .focus()
const tucDesig = (() => {
  const wrap = document.getElementById("tuc-desig");
  const btn = document.getElementById("tuc-desig-btn");
  const label = document.getElementById("tuc-desig-label");
  const list = document.getElementById("tuc-desig-list");
  if (!wrap || !btn || !label || !list) return null;
  let value = "", disabled = false, active = -1;
  const opts = DESIGNATIONS.map((d, i) => {
    const li = document.createElement("li");
    li.className = "desig-opt"; li.setAttribute("role", "option"); li.textContent = d;
    li.addEventListener("pointerdown", e => e.preventDefault());          // keep focus where it is
    li.addEventListener("click", () => choose(d));
    list.append(li);
    return li;
  });
  const isOpen = () => !list.classList.contains("hidden");
  const mark = i => {
    active = i;
    opts.forEach((o, j) => o.classList.toggle("active", j === i));
    if (i >= 0) opts[i].scrollIntoView({ block: "nearest" });
  };
  function open() {
    if (disabled) return;
    list.classList.remove("hidden");
    btn.setAttribute("aria-expanded", "true");
    mark(Math.max(0, DESIGNATIONS.indexOf(value)));
  }
  function close() {
    list.classList.add("hidden");
    btn.setAttribute("aria-expanded", "false");
    mark(-1);
  }
  function setValue(v) {
    value = v || "";
    label.textContent = value;
    btn.classList.toggle("has-value", !!value);
    opts.forEach((o, j) => o.classList.toggle("chosen", DESIGNATIONS[j] === value));
  }
  function choose(d) {
    setValue(d);
    close();
    if (typeInput && !typeInput.disabled) typeInput.focus({ preventScroll: true });   // straight back to typing; Enter submits
  }
  btn.addEventListener("click", () => { if (isOpen()) close(); else open(); });
  btn.addEventListener("keydown", e => {
    if (disabled) return;
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (!isOpen()) { open(); return; }
      mark((active + (e.key === "ArrowDown" ? 1 : -1) + opts.length) % opts.length);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      if (isOpen() && active >= 0) choose(DESIGNATIONS[active]); else open();
    } else if (e.key === "Escape") {
      if (isOpen()) { e.preventDefault(); close(); }
    } else if (e.key === "Tab") {
      close();
    } else if (e.key.length === 1 && /\S/.test(e.key)) {              // type a letter to jump
      const k = e.key.toLowerCase();
      const from = isOpen() ? active + 1 : 0;
      const hit = DESIGNATIONS.findIndex((d, i) => i >= from && d.toLowerCase().startsWith(k));
      const any = hit >= 0 ? hit : DESIGNATIONS.findIndex(d => d.toLowerCase().startsWith(k));
      if (any >= 0) { if (!isOpen()) open(); mark(any); }
    }
  });
  document.addEventListener("pointerdown", e => { if (isOpen() && !wrap.contains(e.target)) close(); });
  return {
    get value() { return value; },
    set value(v) { setValue(v); },
    get disabled() { return disabled; },
    set disabled(b) { disabled = !!b; btn.disabled = disabled; if (disabled) close(); },
    classList: wrap.classList,
    focus() { btn.focus(); },
    open
  };
})();
const btnQuitGame = document.getElementById("btn-quit-game");
const btnGiveUp = document.getElementById("btn-give-up");
const btnForfeitTarget = document.getElementById("btn-forfeit-target");
const btnGameSettings = document.getElementById("btn-game-settings");
const btnNewGame = document.getElementById("btn-new-game");
const btnToggleCountyList = document.getElementById("btn-toggle-county-list");
const countyListPanel = document.getElementById("county-list-panel");
const countyListItems = document.getElementById("county-list-items");
const hoverTooltip = document.getElementById("county-hover-tooltip");
let countyPaths = document.querySelectorAll(".county");
const svgMaps = document.querySelectorAll(".state-map");


const STATE_MAP_DIR = "maps/";
const stateMapLoads = {};
let mapsLoadingCount = 0;

function stateMapLoaded(key) {
  const svg = document.getElementById(stateData[key]?.svgId);
  return !svg || !!svg.querySelector(".county");
}

function fetchMapText(name) {
  return new Promise((resolve, reject) => {
    const tag = document.createElement("script");
    tag.src = `${STATE_MAP_DIR}${name}.js`;
    tag.onload = () => { tag.remove(); resolve(); };
    tag.onerror = () => { tag.remove(); reject(new Error(`couldn't load ${tag.src}`)); };
    document.head.appendChild(tag);
  }).then(() => {
    const text = (window.__stateMaps || {})[name];
    if (!text) throw new Error(`${name}.js loaded but had no map data`);
    delete window.__stateMaps[name];
    const open = text.indexOf("<svg");
    const start = text.indexOf(">", open) + 1;
    const end = text.lastIndexOf("</svg>");
    if (open < 0 || end < start) throw new Error(`${name}: unexpected file format`);
    return text.slice(start, end);
  });
}

function loadStateMap(key) {
  if (stateMapLoaded(key)) return Promise.resolve();
  if (stateMapLoads[key]) return stateMapLoads[key];
  const svg = document.getElementById(stateData[key].svgId);
  const mapId = stateData[key].svgId;
  stateMapLoads[key] = fetchMapText(mapId + ".lo")
    .then(markup => ({ markup, detail: "lo" }), () => fetchMapText(mapId).then(markup => ({ markup, detail: "full" })))
    .then(({ markup, detail }) => {
      svg.dataset.detail = detail;
      svg.insertAdjacentHTML("beforeend", markup);
      countyPaths = document.querySelectorAll(".state-map .county");
      svg.querySelectorAll(".county").forEach(bindCountyInteractivity);
    })
    .catch(err => { delete stateMapLoads[key]; throw new Error(`map ${key}: ${err.message}`); });
  return stateMapLoads[key];
}

const fullDetailLoads = new WeakMap();
function upgradeToFullDetail(svg) {
  if (!svg || svg.dataset.detail !== "lo") return Promise.resolve();
  if (fullDetailLoads.has(svg)) return fullDetailLoads.get(svg);
  const p = fetchMapText(svg.id).then(markup => {
    const tmp = document.createElement("div");
    tmp.innerHTML = `<svg>${markup}</svg>`;
    const byId = new Map([...svg.querySelectorAll(".county")].map(el => [el.id, el]));
    tmp.querySelectorAll("path").forEach(full => {
      const el = byId.get(full.id);
      if (el) el.setAttribute("d", full.getAttribute("d"));
    });
    svg.dataset.detail = "full";
  }).catch(() => { fullDetailLoads.delete(svg); });
  fullDetailLoads.set(svg, p);
  return p;
}

function ensureStateMaps(keys) {
  const pending = [...new Set(keys)].filter(k => stateData[k] && !stateMapLoaded(k));
  if (!pending.length) return Promise.resolve();
  mapsLoadingCount++;
  document.body.classList.add("maps-loading");
  return Promise.all(pending.map(loadStateMap)).finally(() => {
    if (--mapsLoadingCount === 0) document.body.classList.remove("maps-loading");
  });
}

let svgRefreshQueued = false;
function queueSvgRefresh() {
  if (svgRefreshQueued) return;
  svgRefreshQueued = true;
  requestAnimationFrame(() => { svgRefreshQueued = false; switchVisibleSvgMap(); });
}
function prefetchStateMaps(keys) {
  keys.forEach(key => {
    if (!stateData[key] || stateMapLoaded(key)) return;
    loadStateMap(key).then(queueSvgRefresh).catch(() => {  });
  });
}


const zoomBackdrop = document.createElement("div");
zoomBackdrop.className = "zoom-backdrop";
document.body.appendChild(zoomBackdrop);
let zoomedMap = null;
let zoomLevel = 1;
const ZOOM_MAX = 20;

const ZOOM_MIN_FACTOR = 1.3;
const ZOOM_GOOD_ENOUGH = 1.15;
const zoomScroller = document.createElement("div");
zoomScroller.className = "zoom-scroller";
zoomScroller.addEventListener("click", (e) => { if (e.target === zoomScroller) exitMapZoom(); });
let zoomPlaceholder = null;
let zoomNormalWidth = 0;
let zoomBannerWatch = null;

function visibleBanner() {
  return Array.from(document.querySelectorAll(".prompt-box"))
    .find(el => el.getClientRects().length > 0) || null;
}

function layoutZoom() {
  if (!zoomedMap) return;
  const banner = visibleBanner();
  const top = Math.ceil((banner ? banner.getBoundingClientRect().bottom : 0) + 8);
  zoomScroller.style.top = top + "px";
  const cs = getComputedStyle(zoomedMap);
  const pad = (parseFloat(cs.paddingTop) || 0) + (parseFloat(cs.paddingBottom) || 0);
  const padX = (parseFloat(cs.paddingLeft) || 0) + (parseFloat(cs.paddingRight) || 0);
  const vb = zoomedMap.viewBox && zoomedMap.viewBox.baseVal;
  const ratio = vb && vb.width && vb.height ? vb.width / vb.height : 1;
  const availH = Math.max(window.innerHeight - top - 8, 160);
  const reserve = document.body.classList.contains("list-docked") && window.innerWidth >= 700 ? 236 : 0;   // room for the list on the right
  zoomScroller.style.right = reserve + "px";
  const maxW = window.innerWidth - 16 - reserve;
  const fitW = (availH - pad) * ratio + padX;
  const clearStepUp = zoomNormalWidth * ZOOM_GOOD_ENOUGH + padX;
  const wantW0 = fitW >= clearStepUp ? fitW : Math.max(fitW, zoomNormalWidth * ZOOM_MIN_FACTOR + padX);
  const wantW = ratio < 0.6 ? fitW : wantW0;      // tall, narrow maps (CNMI): fit the screen height so there's no scrolling
  const w = Math.round(Math.max(Math.min(wantW, maxW), 120));
  const set = (k, v) => zoomedMap.style.setProperty(k, v, "important");
  set("box-sizing", "border-box");
  set("width", Math.round(w * zoomLevel) + "px");
  set("max-width", "none");
  set("height", "auto");
  set("max-height", "none");
  set("flex", "none");
}

function releaseZoomedMap() {
  if (!zoomedMap) return;
  const svg = zoomedMap;
  svg.classList.remove("zoomed");
  ["box-sizing", "width", "max-width", "height", "max-height", "flex"].forEach(k => svg.style.removeProperty(k));
  if (zoomPlaceholder && zoomPlaceholder.parentNode) {
    zoomPlaceholder.parentNode.insertBefore(svg, zoomPlaceholder);
    zoomPlaceholder.remove();
  }
  zoomPlaceholder = null;
  zoomedMap = null;
}

function exitMapZoom() {
  if (countyListViaZoom) {
    const p = document.getElementById("county-list-panel"), b = document.getElementById("btn-toggle-county-list");
    if (p) p.classList.add("hidden");
    if (b) b.textContent = "Show List";
    countyListViaZoom = false;
  }
  if (zoomBannerWatch) { zoomBannerWatch.disconnect(); zoomBannerWatch = null; }
  releaseZoomedMap();
  zoomScroller.remove();
  zoomScroller.scrollTop = 0;
  zoomScroller.scrollLeft = 0;
  zoomLevel = 1;
  zoomControls.remove();
  zoomArrowsBtn.remove();
  zoomBackdrop.classList.remove("active");
  document.body.classList.remove("map-zoomed");
}

function enterMapZoom(svg) {
  if (zoomedMap === svg) return;
  upgradeToFullDetail(svg);
  if (zoomedMap) {
    if (zoomBannerWatch) { zoomBannerWatch.disconnect(); zoomBannerWatch = null; }
    releaseZoomedMap();
  }
  {
    const r = svg.getBoundingClientRect();
    const cs = getComputedStyle(svg);
    const px = (parseFloat(cs.paddingLeft) || 0) + (parseFloat(cs.paddingRight) || 0);
    const py = (parseFloat(cs.paddingTop) || 0) + (parseFloat(cs.paddingBottom) || 0);
    const vb = svg.viewBox && svg.viewBox.baseVal;
    const ratio = vb && vb.width && vb.height ? vb.width / vb.height : 1;
    zoomNormalWidth = Math.max(Math.min(r.width - px, (r.height - py) * ratio), 40);
  }
  zoomPlaceholder = document.createComment("zoomed map");
  svg.parentNode.insertBefore(zoomPlaceholder, svg);
  zoomScroller.scrollTop = 0;
  document.body.appendChild(zoomScroller);
  zoomScroller.appendChild(svg);
  svg.classList.add("zoomed");
  zoomedMap = svg;
  zoomLevel = 1;
  zoomScroller.scrollLeft = 0;
  zoomBackdrop.classList.add("active");
  document.body.classList.add("map-zoomed");
  layoutZoom();
  document.body.appendChild(zoomControls);
  document.body.appendChild(zoomArrowsBtn);
  updateZoomControls();
  const banner = visibleBanner();
  if (banner && window.ResizeObserver) {
    zoomBannerWatch = new ResizeObserver(layoutZoom);
    zoomBannerWatch.observe(banner);
  }
}
window.addEventListener("resize", layoutZoom);

function toggleMapZoom(svg) {
  if (svg.classList.contains("zoomed")) {
    exitMapZoom();
  } else {
    enterMapZoom(svg);
  }
}

const zoomControls = document.createElement("div");
zoomControls.className = "zoom-controls";
zoomControls.innerHTML =
  '<button type="button" data-z="out" aria-label="Zoom out" title="Zoom out (-)">\u2212</button>' +
  '<span class="zoom-level" aria-live="polite">1\u00D7</span>' +
  '<button type="button" data-z="in" aria-label="Zoom in" title="Zoom in (+). Ctrl/\u2318+scroll or pinch also zooms; scroll or hold Space and drag to pan.">+</button>' +
  '<button type="button" data-z="reset" aria-label="Reset zoom" title="Reset zoom (0)">Reset</button>';
const zoomLevelLabel = zoomControls.querySelector(".zoom-level");

const zoomArrowsBtn = document.createElement("button");
zoomArrowsBtn.type = "button";
zoomArrowsBtn.className = "zoom-arrows-top";
zoomArrowsBtn.setAttribute("aria-label", "Arrows from labels to counties");
zoomArrowsBtn.title = "Show or hide the arrows from dragged labels to their counties";
zoomArrowsBtn.textContent = "\u2197 Arrows";
zoomArrowsBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  gameSettings.reviewArrowsOn = gameSettings.reviewArrowsOn !== true;
  saveSettings();
  const cb = document.getElementById("toggle-review-arrows"); if (cb) cb.checked = gameSettings.reviewArrows;
  updateZoomControls();
  if (typeof reviewReposition === "function") reviewReposition();
});

function updateZoomControls() {
  const shown = zoomLevel < 10 ? zoomLevel.toFixed(1).replace(/\.0$/, "") : String(Math.round(zoomLevel));
  zoomLevelLabel.textContent = shown + "\u00D7";
  zoomControls.querySelector('[data-z="out"]').disabled = zoomLevel <= 1.001;
  zoomControls.querySelector('[data-z="in"]').disabled = zoomLevel >= ZOOM_MAX - 0.001;
  zoomControls.querySelector('[data-z="reset"]').disabled = zoomLevel <= 1.001;
  zoomArrowsBtn.hidden = !reviewMode;      // only while reviewing: it's about the dragged name labels
  zoomArrowsBtn.setAttribute("aria-pressed", String(gameSettings.reviewArrowsOn === true));
  zoomScroller.classList.toggle("zoom-deep", zoomLevel > 1.001);
}

function setZoomLevel(next, ax, ay) {
  if (!zoomedMap) return;
  next = Math.min(ZOOM_MAX, Math.max(1, next));
  if (Math.abs(next - zoomLevel) < 0.001) return;
  const r = zoomedMap.getBoundingClientRect();
  if (ax == null) { const s = zoomScroller.getBoundingClientRect(); ax = s.left + s.width / 2; ay = s.top + s.height / 2; }
  const fx = r.width ? (ax - r.left) / r.width : 0.5;
  const fy = r.height ? (ay - r.top) / r.height : 0.5;
  zoomLevel = next;
  layoutZoom();
  const r2 = zoomedMap.getBoundingClientRect();
  zoomScroller.scrollLeft += (r2.left + fx * r2.width) - ax;
  zoomScroller.scrollTop += (r2.top + fy * r2.height) - ay;
  updateZoomControls();
}

zoomControls.addEventListener("click", (e) => {
  const b = e.target.closest("button[data-z]");
  if (!b) return;
  e.stopPropagation();
  if (b.dataset.z === "in") setZoomLevel(zoomLevel * 1.6);
  else if (b.dataset.z === "out") setZoomLevel(zoomLevel / 1.6);
  else setZoomLevel(1);
});

zoomScroller.addEventListener("wheel", (e) => {
  if (!zoomedMap || !(e.ctrlKey || e.metaKey)) return;
  e.preventDefault();
  setZoomLevel(zoomLevel * Math.exp(-e.deltaY * (e.deltaMode === 1 ? 0.05 : 0.0025)), e.clientX, e.clientY);
}, { passive: false });

let zoomSpaceDown = false;
document.addEventListener("keydown", (e) => {
  if (!zoomedMap || e.ctrlKey || e.metaKey || e.altKey) return;
  const t = e.target;
  if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
  if (e.key === "+" || e.key === "=") { setZoomLevel(zoomLevel * 1.6); e.preventDefault(); }
  else if (e.key === "-" || e.key === "_") { setZoomLevel(zoomLevel / 1.6); e.preventDefault(); }
  else if (e.key === "0") { setZoomLevel(1); e.preventDefault(); }
  else if (e.key === " ") { zoomSpaceDown = true; e.preventDefault(); }
});
document.addEventListener("keyup", (e) => { if (e.key === " ") zoomSpaceDown = false; });
window.addEventListener("blur", () => { zoomSpaceDown = false; });

let zoomPan = null;
["pointerdown", "mousedown"].forEach(type => zoomScroller.addEventListener(type, (e) => {
  if (!zoomedMap || e.pointerType === "touch") return;
  if (e.button === 1 || (zoomSpaceDown && e.button === 0)) {
    e.preventDefault();
    e.stopPropagation();
    if (type === "pointerdown") {
      zoomPan = { x: e.clientX, y: e.clientY, sl: zoomScroller.scrollLeft, st: zoomScroller.scrollTop };
      zoomScroller.classList.add("zoom-panning");
    }
  }
}, true));
window.addEventListener("pointermove", (e) => {
  if (!zoomPan) return;
  zoomScroller.scrollLeft = zoomPan.sl - (e.clientX - zoomPan.x);
  zoomScroller.scrollTop = zoomPan.st - (e.clientY - zoomPan.y);
});
window.addEventListener("pointerup", () => {
  if (!zoomPan) return;
  zoomPan = null;
  zoomScroller.classList.remove("zoom-panning");
  suppressClickUntil = Date.now() + 300;
});
zoomScroller.addEventListener("click", (e) => {
  if (Date.now() < suppressClickUntil && (zoomSpaceDown || e.button === 1)) { e.stopImmediatePropagation(); e.preventDefault(); }
}, true);

const zoomTouches = new Map();
let pinchStart = null;
zoomScroller.addEventListener("pointerdown", (e) => {
  if (e.pointerType !== "touch") return;
  zoomTouches.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (zoomTouches.size === 2) {
    const [a, b] = [...zoomTouches.values()];
    pinchStart = { d: Math.hypot(a.x - b.x, a.y - b.y) || 1, level: zoomLevel };
  }
});
zoomScroller.addEventListener("pointermove", (e) => {
  if (e.pointerType !== "touch" || !zoomTouches.has(e.pointerId)) return;
  zoomTouches.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (zoomTouches.size === 2 && pinchStart) {
    const [a, b] = [...zoomTouches.values()];
    const d = Math.hypot(a.x - b.x, a.y - b.y) || 1;
    setZoomLevel(pinchStart.level * d / pinchStart.d, (a.x + b.x) / 2, (a.y + b.y) / 2);
  }
});
["pointerup", "pointercancel", "pointerleave"].forEach(t => zoomScroller.addEventListener(t, (e) => {
  zoomTouches.delete(e.pointerId);
  if (zoomTouches.size < 2) pinchStart = null;
}));

const LONG_PRESS_MS = 500;
const LONG_PRESS_GUARD_MS = 800;
let touchLongPressFiredAt = 0;

const IS_MAC = /Mac|iPhone|iPad/i.test(navigator.platform || navigator.userAgent || "");
let touchGestureWasLongPress = false;
let suppressClickUntil = 0;
function isZoomGestureStart(e) {
  return e.button > 0 || (IS_MAC && e.ctrlKey);
}

svgMaps.forEach(svg => {
  const magnifyBox = svg.closest(".map-box");
  if (magnifyBox) {
    const magnifyBtn = document.createElement("button");
    magnifyBtn.type = "button";
    magnifyBtn.className = "map-magnify-btn";
    magnifyBtn.setAttribute("aria-label", "Zoom in on this map");
    magnifyBtn.textContent = "🔍";
    magnifyBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleMapZoom(svg);
    });
    magnifyBox.appendChild(magnifyBtn);
   const listBtn = document.createElement("button");
    listBtn.type = "button";
    listBtn.className = "map-list-btn";
    listBtn.textContent = "List";
    listBtn.setAttribute("aria-label", "Show the county list for this state");
    listBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleCountyListFor(Object.keys(stateData).find(k => stateData[k].svgId === svg.id));
    });
    magnifyBox.appendChild(listBtn);
  }

  let pressTimer = null;
  let moved = false;

  svg.addEventListener("touchstart", (e) => {
    moved = false;
    touchGestureWasLongPress = false;
    clearTimeout(pressTimer);
    pressTimer = setTimeout(() => {
      if (moved) return;
      touchLongPressFiredAt = Date.now();
      touchGestureWasLongPress = true;
      toggleMapZoom(svg);
    }, LONG_PRESS_MS);
  }, { passive: true });

  const cancelPressTimer = () => clearTimeout(pressTimer);
  svg.addEventListener("touchmove", () => {
    moved = true;
    cancelPressTimer();
  }, { passive: true });
  svg.addEventListener("touchend", () => {
    cancelPressTimer();
    if (touchGestureWasLongPress) suppressClickUntil = Date.now() + 600;
  });
  svg.addEventListener("touchcancel", cancelPressTimer);

  const onCardContext = (e) => {
    e.preventDefault();
    e.stopPropagation();                                  // the map and the card both listen; only one of them should toggle
    if (Date.now() - touchLongPressFiredAt < LONG_PRESS_GUARD_MS) return;
    toggleMapZoom(svg);
  };
  svg.addEventListener("contextmenu", onCardContext);     // still needed once the map has moved out of its card into the zoom view
  if (magnifyBox) magnifyBox.addEventListener("contextmenu", onCardContext);   // the whole card: title, padding, buttons
});

zoomBackdrop.addEventListener("click", exitMapZoom);

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && zoomedMap) exitMapZoom();
});


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
  mc: {
    title: "How to Play: Multiple-Choice",
    intro: "A county lights up on the map. Pick its name from the options (or press 1-4). Wrong picks count against you.",
    demo: "mc",
    word: "Sonoma",
  },
  type: {
    title: "How to Play: List",
    intro: "Type any county's name, in any order, and see how many you can list.",
    demo: "list",
    word: "Sonoma",
  },
  "type-hard": {
    title: "How to Play: Identify",
    intro: "Click any county on the map, then type its name. Wrong guesses don't cost you, but you only get credit once you name it.",
    demo: "type-hard",
    word: "Sonoma",
  },
  "type-strict": {
    title: "How to Play: Type",
    intro: "A county lights up on the map. Type its name, then press Enter to submit. Wrong guesses count against you.",
    demo: "type-strict",
    word: "Sonoma",
  },
  "tuc": { title: "The Ultimate Challenge", intro: "Every county equivalent in the country, from memory. You choose the county and type its full name, like Hoonah-Angoon Census Area. Spelling counts. Accents count. Correct answers stay dark green, with the most recent in light green. There are no hints and no second chances: one wrong answer ends the run.", demo: "pin", word: "", noDemo: true },
};

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
  if (infoExample) { infoExample.setAttribute("data-demo", cfg.demo); infoExample.classList.toggle("hidden", !!cfg.noDemo); }

  if (infoDemoLabel) {
    infoDemoLabel.textContent = cfg.demo === "list" ? "Find any county" : "Find:";
  }
  if (infoDemoTarget) {
    infoDemoTarget.textContent = cfg.word;
    infoDemoTarget.classList.toggle("hidden", cfg.demo === "list");
  }

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


let settingsReturnScreen = "screen-home";
let settingsReturnOverlay = null;
const settingsBackButtons = [...document.querySelectorAll("#screen-settings .btn-back")];
const setSettingsBackLabel = text => settingsBackButtons.forEach(b => { b.textContent = text; });


function openSettings(returnScreen, returnOverlay = null) {
  settingsReturnScreen = returnScreen;
  settingsReturnOverlay = returnOverlay;
  tucSettingsLocked = returnScreen === "screen-game" && selectedMode === "tuc";
  applyTucSettingsLock();
  setSettingsBackLabel(returnScreen === "screen-game" ? "Back to Game" : "Back to Home");
  showScreen("screen-settings");
}


const modalSummary = document.getElementById("modal-summary");
const summaryPercentage = document.getElementById("summary-percentage");
const finalTimeElement = document.getElementById("final-time");
const bestTimeElement = document.getElementById("best-time");
const recentTimesElement = document.getElementById("recent-times");
const summaryGradeTitle = document.getElementById("summary-grade-title");
const summaryMessage = document.getElementById("summary-message");
const summaryMissedSection = document.getElementById("summary-missed-section");
const summaryMissedList = document.getElementById("summary-missed-list");
const modalActions = document.getElementById("modal-summary-actions");


const admireBar = document.getElementById("admire-bar");
const admirePercentage = document.getElementById("admire-percentage");
const admireText = document.getElementById("admire-text");
const btnAdmireRetry = document.getElementById("btn-admire-retry");
const btnAdmireReplay = document.getElementById("btn-admire-replay");
const btnAdmireSettings = document.getElementById("btn-admire-settings");
const btnAdmireHome = document.getElementById("btn-admire-home");


function playSound(type) {
  if (!gameSettings.soundVolume || gameSettings.soundVolume <= 0) return;
  const vol = gameSettings.soundVolume / 100;
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
      osc.frequency.setValueAtTime(587.33, ctx.currentTime);
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.1 * vol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } else if (type === "wrong") {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.setValueAtTime(164.81, ctx.currentTime + 0.1);
      gain.gain.setValueAtTime(0.12 * vol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    }
  } catch (e) {
    console.warn("Web Audio API not supported or blocked by user gesture.", e);
  }
}


const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");


/* ===== The Ultimate Challenge: settings it controls. They show as locked while you're in a TUC run. ===== */
/* Only how they're DISPLAYED changes. Your saved settings (gameSettings) are never touched. */
const TUC_LOCKS = [
  { id: "toggle-require-diacritics",   key: "requireDiacritics",         value: true,  note: "spelling and accents always count." },
  { id: "toggle-accept-st-abbrev",     key: "acceptStAbbrev",            value: false, note: "you must always type Saint or Sainte out." },
  { id: "toggle-instant-check",        key: "instantTypeCheck",          value: false, note: "you press Enter to submit, and you only get one try." },
  { id: "toggle-reveal-answer",        key: "revealAnswerAfterMistakes", value: false, note: "one wrong answer ends the run." },
  { id: "toggle-show-state-in-prompt", key: "showStateInPrompt",         value: false, note: "there is no prompt; you choose the county yourself." },
  { id: "toggle-show-county-list",    key: "showCountyList",            value: false, note: "you have to know them all." }
];
let tucSettingsLocked = false;

function applyTucSettingsLock() {
  const banner = document.getElementById("tuc-settings-banner");
  if (banner) banner.classList.toggle("hidden", !tucSettingsLocked);

  TUC_LOCKS.forEach(lock => {
    const el = document.getElementById(lock.id);
    if (!el) return;
    const row = el.closest(".setting-item");
    const text = row && row.querySelector(".setting-text");
    let note = row && row.querySelector(".tuc-lock-note");
    if (row) row.classList.toggle("tuc-locked", tucSettingsLocked);

    if (tucSettingsLocked) {
      if (row) row.classList.remove("is-inactive");   // the lock's own dimming replaces it; syncStAbbrevSettingUI() restores it on unlock
      el.checked = lock.value;
      el.disabled = true;
      if (text && !note) {
        note = document.createElement("p");
        note.className = "tuc-lock-note";
        text.append(note);
      }
      if (note) note.textContent = `Locked by The Ultimate Challenge: ${lock.note}`;
    } else {
      el.checked = !!gameSettings[lock.key];
      el.disabled = false;
      if (note) note.remove();
    }
  });
  if (!tucSettingsLocked) syncStAbbrevSettingUI();   // that one depends on "Require accents"
}


function applySettings() {
  SETTING_CONTROLS.forEach(c => {
    const el = document.getElementById(c.id);
    if (el) c.write(el, gameSettings[c.key]);
  });
  syncStAbbrevSettingUI();
  applyTucSettingsLock();
  if (inputBestKnownCount) inputBestKnownCount.value = String(gameSettings.bestKnownCount);
  updateBestKnownButtonLabel();


  document.body.classList.toggle("dark-mode", gameSettings.darkMode);
  document.body.classList.toggle("high-contrast", gameSettings.highContrast);
  updateMapLayoutMode();
  updateMapGridColumns();
}


function initTheme() {
  const savedDark = localStorage.getItem("darkMode");
  if (savedDark !== null) {
    try {
      gameSettings.darkMode = !!JSON.parse(savedDark);
    } catch (e) {
      gameSettings.darkMode = systemPrefersDark.matches;
    }
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


const appContainer = document.querySelector(".app-container");
function showScreen(screenId) {
  screens.forEach(s => s.classList.remove("active"));
  const activeScreen = document.getElementById(screenId);
  if (activeScreen) {
    activeScreen.classList.add("active");
    activeScreen.focus();
  }
  exitMapZoom();
  if (screenId !== "screen-game") clearReviewPins();
  if (countyListPanel && screenId !== "screen-game") {
    countyListPanel.classList.add("hidden");
  }
  if (appContainer) {
    appContainer.classList.toggle(
      "wide-map",
      screenId === "screen-game" && activeStateKeys.length >= 1
    );
    appContainer.classList.toggle(
      "solo-map",
      screenId === "screen-game" && activeStateKeys.length === 1
    );
    appContainer.classList.toggle("wide-settings", screenId === "screen-settings");
    appContainer.classList.toggle("wide-picker", screenId === "screen-home" || screenId === "screen-setup" || screenId === "screen-study");
    appContainer.classList.remove("wide-study");
  }
}


if (btnGotoModes) btnGotoModes.addEventListener("click", () => showScreen("screen-modes"));

function initUsMap(holder, { isSelected, toggle }) {
  const tpl = document.getElementById("us-map-template");
  if (!tpl || !holder) return { sync() {} };
  holder.replaceChildren(tpl.content.cloneNode(true));
  const keyByName = {};
  Object.entries(stateData).forEach(([k, s]) => { keyByName[s.name.toLowerCase()] = k; });
  const centerOf = d => {
    const n = (d.match(/-?\d+\.?\d*/g) || []).map(Number); let x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
    for (let i = 0; i + 1 < n.length; i += 2) { x0 = Math.min(x0, n[i]); x1 = Math.max(x1, n[i]); y0 = Math.min(y0, n[i + 1]); y1 = Math.max(y1, n[i + 1]); }
    return [(x0 + x1) / 2, (y0 + y1) / 2];
  };
  const statePaths = [...holder.querySelectorAll("path.us-st")].map(p => ({ p, c: centerOf(p.getAttribute("d") || "") }));
  holder.querySelectorAll(".us-box").forEach(box => {
    if (box.dataset.code) return;
    const x = +box.getAttribute("x"), y = +box.getAttribute("y"), w = +box.getAttribute("width"), h = +box.getAttribute("height");
    const hit = statePaths.find(({ c }) => c[0] >= x && c[0] <= x + w && c[1] >= y && c[1] <= y + h);
    if (hit) { box.dataset.code = hit.p.dataset.code; box.dataset.name = hit.p.dataset.name; }
  });
  const els = [...holder.querySelectorAll("[data-code]")];
  els.forEach(el => {
    const key = keyByName[(el.dataset.name || "").toLowerCase()];
    const built = !!(key && document.getElementById(stateData[key].svgId));
    el.classList.add(built ? "built" : "unbuilt");
    if (!built) return;
    el.dataset.key = key;
    if (el.tagName.toLowerCase() === "path") {
      el.setAttribute("tabindex", "0");
      el.setAttribute("role", "button");
      el.setAttribute("aria-label", el.dataset.name);
    }
  });
    const dcPath = holder.querySelector('path.us-st[data-code="dc"]');
  if (dcPath) dcPath.parentNode.appendChild(dcPath);
  const svg = holder.querySelector("svg");
  holder.querySelectorAll(".us-box[data-key]").forEach(box => {
    const path = holder.querySelector(`path.us-st[data-key="${box.dataset.key}"]`);
    box.addEventListener("mouseenter", () => path && path.classList.add("hover"));
    box.addEventListener("mouseleave", () => path && path.classList.remove("hover"));
  });
  svg.addEventListener("click", e => { const el = e.target.closest("[data-key]"); if (el) toggle(el.dataset.key); });
  svg.addEventListener("keydown", e => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const el = e.target.closest("[data-key]");
    if (el) { e.preventDefault(); toggle(el.dataset.key); }
  });
  return {
    sync() {
      els.forEach(el => {
        if (!el.dataset.key) return;
        const on = !!isSelected(el.dataset.key);
        el.classList.toggle("selected", on);
        if (el.getAttribute("role")) el.setAttribute("aria-pressed", on);
      });
    }
  };
}

function renderPicked(el, entries) {
  if (!el) return;
  el.replaceChildren();
  if (!entries.length) {
    el.textContent = "No states selected yet. Click a state on the map to select it; click it again to deselect.";
    return;
  }
  const total = entries.reduce((sum, e) => sum + e.n, 0);
  const head = document.createElement("div");
  head.className = "us-picked-head";
  head.textContent = `Selected: ${entries.length} state${entries.length === 1 ? "" : "s"}, ${total} in total`;
  const chips = document.createElement("div");
  chips.className = "us-picked-chips";
  entries.forEach(e => {
    const c = document.createElement("span");
    c.className = "us-chip";
    c.textContent = `${e.name}: ${e.text}`;
    chips.appendChild(c);
  });
  el.append(head, chips);
}

setTimeout(() => {
  const holder = document.getElementById("setup-map");
  const picked = document.getElementById("setup-picked");
  if (!holder) return;
  const map = initUsMap(holder, {
    isSelected: key => activeStateKeys.includes(key),
    toggle: key => { const row = document.getElementById(`state-${key}`); if (row) row.click(); }
  });
  const refresh = () => {
    map.sync();
    const entries = activeStateKeys.filter(k => stateData[k]).map(k => {
      const cnt = document.querySelector(`#state-${k} .state-count`);
      const n = stateData[k].counties.length;
      return { name: stateData[k].name, text: cnt ? cnt.textContent : `${n} counties`, n };
    }).sort((a, b) => a.name.localeCompare(b.name));
    renderPicked(picked, entries);
    document.getElementById("screen-setup").classList.toggle("no-selection", activeStateKeys.length === 0);
    applyUnitWords();
  };
  const list = document.querySelector("#screen-setup .states-list");
  if (list) new MutationObserver(refresh).observe(list, { subtree: true, attributes: true, attributeFilter: ["class"] });
  refresh();
}, 0);


(function initStudy() {
  const $ = id => document.getElementById(id);
  const KEY = "studyLearned";
  const batchSize = () => Math.min(8, Math.max(4, parseInt(gameSettings.learnCount, 10) || 5));
  const selected = new Set();
  let counties = [], start = 0, batch = [], quizSet = [], typeSet = [], pinSet = [], i = 0, phase = "learn", score = 0, typeScore = 0, pinScore = 0, answered = false;
  const unit = plural => counties.some(c => usesCountyEquivalents(c.stateKey))
  ? (plural ? "county equivalents" : "county equivalent") : (plural ? "counties" : "county");
  let studyMode = "all";
  let homeExcluded = new Set();
  const roundLog = { quiz: [], type: [], pin: [] };
  const PHASE_TITLE = { quiz: "Multiple-Choice", type: "Type", pin: "Pin" };
  const sumEl = document.createElement("div");
  sumEl.id = "study-summary";
  sumEl.className = "study-summary hidden";
  $("study-map").after(sumEl);
  const MODE_SEQ = { all: ["pin", "quiz", "type"], mc: ["quiz"], type: ["type"], pin: ["pin"] };
  const MODE_NAME = { all: "All", mc: "Multiple-Choice", type: "Type", pin: "Pin" };
  const seq = () => MODE_SEQ[studyMode];
  const nextPhaseAfter = p => seq()[seq().indexOf(p) + 1] || null;
  const firstPhase = () => seq()[0];
  const afterLabel = p => {
    const n = p === "learn" ? firstPhase() : (replayOnly ? null : nextPhaseAfter(p));
    if (!n) return "See results";
    return (p === "learn" ? "Start " : "Continue to ") + PHASE_TITLE[n];
  };

  const shuffle = a => { a = a.slice(); for (let k = a.length - 1; k > 0; k--) { const j = Math.floor(Math.random() * (k + 1)); [a[k], a[j]] = [a[j], a[k]]; } return a; };
  const loadLearned = () => {
    const all = loadStudyLearned(), need = studyMode === "all" ? STUDY_MODE_LIST : [studyMode], out = {};
    Object.keys(all).forEach(id => { if (need.every(m => all[id] && all[id][m])) out[id] = true; });
    return out;
  };
  const PHASE_ROW = { quiz: "mc", type: "type", pin: "pin" };
  const studyStates = () => Object.entries(stateData)
    .filter(([, s]) => document.getElementById(s.svgId))
    .sort((a, b) => a[1].name.localeCompare(b[1].name));


  let pickMap = null;
  function renderPick() {
    if (!pickMap) pickMap = initUsMap($("study-pick-map"), {
      isSelected: k => selected.has(k),
      toggle: k => { selected.has(k) ? selected.delete(k) : selected.add(k); renderPick(); }
    });
    pickMap.sync();
    const learned = loadLearned();
    const panel = $("study-learned-panel");
    panel.innerHTML = "";
    const chosen = studyStates().filter(([k]) => selected.has(k));
    renderPicked($("study-picked"), chosen.map(([k, s]) => ({
      name: s.name,
      text: `${s.counties.length} ${countyWord(k, s.counties.length)}`,
      n: s.counties.length
    })).sort((a, b) => a.name.localeCompare(b.name)));
    const openLists = (renderPick.openLists = renderPick.openLists || new Set());
    chosen.forEach(([key, s]) => {
      const done = s.counties.filter(c => learned[c.id]).length;
      const block = document.createElement("div");
      block.className = "study-learned-state";
      const h = document.createElement("h3");
      h.textContent = s.name;
      block.appendChild(h);
      const count = document.createElement("p");
      count.className = "study-learned-count";
      count.textContent = `${done} of ${s.counties.length} learned`;
      block.appendChild(count);
      const map = miniMap(s, learned);
      if (map) block.appendChild(map);
      const chips = document.createElement("div");
      chips.className = "study-chips";
      s.counties.forEach(c => {
        const chip = document.createElement("span");
        const ok = !!learned[c.id];
        chip.className = "study-chip" + (ok ? " learned" : "");
        chip.textContent = (ok ? "\u2713 " : "") + c.name;
        chips.appendChild(chip);
      });
      const list = document.createElement("details");
      list.className = "study-list-toggle";
      if (openLists.has(key)) list.open = true;
      list.addEventListener("toggle", () => { list.open ? openLists.add(key) : openLists.delete(key); });
      const summary = document.createElement("summary");
      summary.textContent = "County list";
      list.appendChild(summary);
      list.appendChild(chips);
      block.appendChild(list);
      panel.appendChild(block);
    });
    $("study-pick").classList.toggle("no-selection", selected.size === 0);
    updateStudyStart();
  }

  function studyPool() {
    const learned = loadLearned();
    const skip = $("study-skip-learned").checked;
    const pool = [];
    studyStates().forEach(([k, s]) => { if (selected.has(k)) s.counties.forEach(c => { if (!(skip && learned[c.id]) && !homeExcluded.has(c.id)) pool.push(c); }); });
    return pool;
  }

  function updateStudyStart() {
    const btn = $("study-start"), msg = $("study-pick-msg");
    let reason = "", note = "";
    if (selected.size === 0) {
      reason = "Select at least one state to study.";
    } else if (!studyPool().length) {
      reason = note = `You've already learned every ${unitWord(false)} in your selection ${studyMode === "all" ? "in all three Learn modes" : "in " + MODE_NAME[studyMode]}. Untick \"Skip ${unitWord(true)} I've already learned\" to review them.`;
    }
    btn.disabled = !!reason;
    if (reason) btn.title = reason; else btn.removeAttribute("title");
    msg.textContent = note;
  }

  const toFront = el => { if (el.parentNode) el.parentNode.appendChild(el); };

  const studyTip = document.createElement("div");
  studyTip.className = "study-hover-tip hidden";
  studyTip.setAttribute("aria-hidden", "true");
  document.body.appendChild(studyTip);
  const hideStudyTip = () => studyTip.classList.add("hidden");

  function enableHoverNames(svg, stateKey) {
    const NS = "http://www.w3.org/2000/svg";
    const layer = document.createElementNS(NS, "g");
    layer.setAttribute("class", "study-hover-layer");
    layer.setAttribute("pointer-events", "none");
    svg.appendChild(layer);
    const names = new Map((stateData[stateKey]?.counties || []).map(c => [c.id, c]));
    let current = "", touchTimer = 0;
    const clear = () => { current = ""; layer.replaceChildren(); hideStudyTip(); };
    const show = e => {
      const el = e.target.closest && e.target.closest(".county");
      const cid = el && svg.contains(el) ? el.dataset.cid : "";
      const county = cid && names.get(cid);
      if (!county) { clear(); return; }
      if (cid !== current) {
        current = cid;
        layer.replaceChildren(...[...svg.querySelectorAll(".county")].filter(x => x.dataset.cid === cid).map(x => {
          const c = x.cloneNode(true);
          ["id", "tabindex", "role", "aria-label"].forEach(a => c.removeAttribute(a));
          c.querySelectorAll("[id]").forEach(n => n.removeAttribute("id"));
          c.setAttribute("class", "study-hover-clone");
          return c;
        }));
        studyTip.textContent = getPlainName(county);
      }
      if (gameSettings.showHoverNames !== false) studyTip.classList.remove("hidden"); else hideStudyTip();
      const w = studyTip.offsetWidth, h = studyTip.offsetHeight, pad = 14;
      let x = e.clientX + pad, y = e.clientY + pad + 4;
      if (x + w > window.innerWidth - 8) x = e.clientX - w - pad;
      if (y + h > window.innerHeight - 8) y = e.clientY - h - pad;
      studyTip.style.left = Math.max(8, x) + "px";
      studyTip.style.top = Math.max(8, y) + "px";
      if (e.pointerType === "touch") { clearTimeout(touchTimer); touchTimer = setTimeout(clear, 2500); }
    };
    svg.addEventListener("pointermove", show);
    svg.addEventListener("pointerdown", show);
    svg.addEventListener("pointerleave", e => { if (e.pointerType !== "touch") clear(); });
  }

  function fitStudyName() {
    const n = $("study-name");
    n.style.fontSize = "";
    n.style.whiteSpace = "";
    const avail = n.clientWidth, need = n.scrollWidth;
    if (!n.textContent || avail <= 0 || need <= avail) return;
    const base = parseFloat(getComputedStyle(n).fontSize);
    const size = Math.max(base * (avail / need) * 0.97, base * 0.6);
    n.style.fontSize = size + "px";
    if (n.scrollWidth > n.clientWidth) n.style.whiteSpace = "normal";
  }
  window.addEventListener("resize", () => { if ($("study-run") && !$("study-run").classList.contains("hidden")) fitStudyName(); });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitStudyName);

  function drawMap(county, pin, hover) {
    hideStudyTip();
    const holder = $("study-map");
    const src = document.getElementById(stateData[county.stateKey]?.svgId);
    holder.innerHTML = "";
    if (!src) return;
    const svg = src.cloneNode(true);
    const srcCounty = src.querySelector(".county");
    const outlineW = srcCounty ? getComputedStyle(srcCounty).strokeWidth : "";
    svg.querySelectorAll(".county").forEach(el => {
      el.removeAttribute("style");
      if (outlineW) el.style.strokeWidth = outlineW;
    });
    const targets = [];
    svg.querySelectorAll("[id]").forEach(el => { if (el.id === county.id) targets.push(el); });
    svg.querySelectorAll(`[data-county-id="${county.id}"]`).forEach(el => { if (!targets.includes(el)) targets.push(el); });
    svg.querySelectorAll(".county").forEach(el => { el.setAttribute("class", "county"); el.style.removeProperty("fill"); el.style.removeProperty("stroke"); });
    if (pin || hover) svg.querySelectorAll(".county").forEach(el => { el.dataset.cid = el.dataset.countyId || el.id; });
    if (!pin) targets.forEach(el => { el.classList.add("locator-target"); toFront(el); });
    svg.removeAttribute("id");
    svg.querySelectorAll("[id]").forEach(el => el.removeAttribute("id"));
    if (pin) {
      svg.querySelectorAll(".county").forEach(el => { el.setAttribute("tabindex", "0"); el.setAttribute("role", "button"); el.setAttribute("aria-label", "County"); });
    } else {
      svg.querySelectorAll("[tabindex]").forEach(el => el.removeAttribute("tabindex"));
      svg.querySelectorAll("[role]").forEach(el => el.removeAttribute("role"));
    }
    svg.setAttribute("class", "locator-map" + (pin ? " pin-mode" : "") + (hover ? " study-hover" : ""));
    ["width", "height", "style"].forEach(a => svg.removeAttribute(a));
    svg.setAttribute("aria-label", pin ? `Map of ${stateData[county.stateKey].name}` : `Map of ${stateData[county.stateKey].name} with a ${unitWord(false)} highlighted`);
    holder.appendChild(svg);
    if (pin) {
      svg.querySelectorAll(".county").forEach(el => {
        const pick = () => pinAnswer(svg, el, county);
        el.addEventListener("click", pick);
        el.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); pick(); } });
      });
      return;
    }
    if (hover) enableHoverNames(svg, county.stateKey);
    addRing(svg, targets);
  }

  function addRing(svg, targets) {
    requestAnimationFrame(() => {
      try {
        const t = targets.find(x => x.getBoundingClientRect().width > 0) || targets[0];
        if (!t) return;
        const r = t.getBoundingClientRect(), sr = svg.getBoundingClientRect();
        if (!sr.width || Math.max(r.width, r.height) > sr.width * 0.03) return;
        const inv = svg.getScreenCTM().inverse(), p = svg.createSVGPoint();
        p.x = r.left; p.y = r.top; const a = p.matrixTransform(inv);
        p.x = r.right; p.y = r.bottom; const b = p.matrixTransform(inv);
        const vb = svg.viewBox.baseVal && svg.viewBox.baseVal.width ? svg.viewBox.baseVal.width : 800;
        const ring = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        ring.setAttribute("class", "locator-ring");
        ring.setAttribute("cx", (a.x + b.x) / 2);
        ring.setAttribute("cy", (a.y + b.y) / 2);
        ring.setAttribute("r", Math.max(Math.abs(b.x - a.x), Math.abs(b.y - a.y)) / 2 + vb * 0.02);
        svg.appendChild(ring);
      } catch (err) {  }
    });
  }

  const OK = "\u02BB";
  const lastIn = list => i === list.length - 1;

  function buildChars() {
    const found = new Set();
    batch.forEach(c => { for (const ch of c.name.normalize("NFC").toLowerCase()) if (/[^\x00-\x7F]/.test(ch)) found.add(ch); });
    const chars = [...found].filter(() => gameSettings.requireDiacritics)
      .sort((a, b) => (b === OK) - (a === OK) || a.localeCompare(b));
    $("study-chars").replaceChildren(...chars.map(ch => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "special-char-btn";
      b.textContent = ch;
      b.title = ch === OK ? "ʻokina (Hawaiian glottal stop)" : ch;
      b.addEventListener("mousedown", e => e.preventDefault());
      b.addEventListener("click", () => {
        const inp = $("study-input");
        const s = inp.selectionStart ?? inp.value.length, e = inp.selectionEnd ?? s;
        inp.setRangeText(ch, s, e, "end");
        inp.focus();
      });
      return b;
    }));
  }

  function render() {
    sumEl.classList.add("hidden");
    const learn = phase === "learn", typing = phase === "type", pinning = phase === "pin";
    const list = learn ? batch : typing ? typeSet : pinning ? pinSet : quizSet;
    const c = list[i];
    $("study-progress").textContent = `${learn ? "Study" : typing ? "Type" : pinning ? "Pin" : "Quiz"}: ${i + 1} of ${list.length} (${unit(true)} ${start + 1}-${start + batch.length} of ${counties.length})`;
    drawMap(c, pinning, learn);
    const studyStateEl = $("study-state");
    if (studyStateEl) studyStateEl.textContent = stateData[c.stateKey]?.name || "";
    $("study-name").textContent = learn ? getPlainName(c) : typing ? `Type the name of the highlighted ${unitWord(false)}.` : pinning ? `Click ${getPlainName(c)} on the map.` : `Which ${unitWord(false)} is highlighted?`;
    if (learn || pinning) appendSpeaker($("study-name"), c);
    $("study-feedback").textContent = "";
    const ch = $("study-choices");
    ch.innerHTML = "";
    answered = false;
    $("study-type").classList.toggle("hidden", !typing);
    if (typing) {
      const inp = $("study-input");
      inp.value = "";
      inp.disabled = false;
      $("study-submit").classList.remove("hidden", "study-pending");
      buildChars();
      inp.focus({ preventScroll: true });
    } else if (!learn && !pinning) {
      const picks = pickMcDistractors(c, counties, 3, null, new Set(batch));
      shuffle([c, ...picks]).forEach(o => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "btn-secondary";
        b.textContent = getPlainName(o);
        b.dataset.correct = o === c ? "1" : "";
        b.addEventListener("click", () => answer(b, o === c, c, o));
        ch.appendChild(b);
      });
    }
    $("study-prev").classList.toggle("hidden", !learn || i === 0);
    $("study-next").classList.remove("hidden");
    $("study-next").classList.toggle("study-pending", !learn);
    $("study-next").textContent = learn ? (lastIn(list) ? afterLabel("learn") : "Next") : "Next";
    replayBackBtn.classList.toggle("hidden", !replayFrom);
    fitStudyName();
    requestAnimationFrame(fitStudyName);
  }

  function answer(btn, ok, c, chosen) {
    if (answered) return;
    answered = true;
    if (ok) score++;
    roundLog.quiz.push({ c, ok, chosen });
    if (!ok) recordConfusion(c.id, chosen && chosen.id);
    btn.classList.add(ok ? "study-correct" : "study-wrong");
    $("study-choices").querySelectorAll("button").forEach(b => { if (b.dataset.correct) b.classList.add("study-correct"); });
    setStudyLearned(c.id, PHASE_ROW.quiz, ok);
    $("study-feedback").textContent = ok ? "Correct!" : `That one is ${getPlainName(c)}.`;
    appendSpeaker($("study-feedback"), c);
    $("study-next").textContent = lastIn(quizSet) ? afterLabel("quiz") : "Next";
    replayBackBtn.classList.toggle("hidden", !replayFrom || (replayOnly && lastIn(quizSet)));
    $("study-next").classList.remove("hidden", "study-pending");
  }

  function submitType() {
    const inp = $("study-input"), c = typeSet[i];
    if (answered || !inp.value.trim()) return;
    answered = true;
    const ok = normalizeTypedName(inp.value) === normalizeTypedName(c.name);
    if (ok) typeScore++;
    roundLog.type.push({ c, ok, typed: inp.value.trim() });
    if (!ok) recordConfusionByTypedName(c.id, inp.value, counties);
    setStudyLearned(c.id, PHASE_ROW.type, ok);
    inp.disabled = true;
    $("study-submit").classList.add("study-pending");
    $("study-feedback").textContent = ok ? "Correct!" : `That one is ${getPlainName(c)}.`;
    appendSpeaker($("study-feedback"), c);
    $("study-next").textContent = lastIn(typeSet) ? afterLabel("type") : "Next";
    replayBackBtn.classList.toggle("hidden", !replayFrom || (replayOnly && lastIn(typeSet)));
    $("study-next").classList.remove("hidden", "study-pending");
    $("study-next").focus();
  }

  function pinAnswer(svg, el, c) {
    if (answered) return;
    answered = true;
    const ok = el.dataset.cid === c.id;
    if (ok) pinScore++;
    roundLog.pin.push({ c, ok, chosen: ok ? c : findCounty(el.dataset.cid) });
    if (!ok) recordConfusion(c.id, el.dataset.cid);
    setStudyLearned(c.id, PHASE_ROW.pin, ok);
    svg.classList.add("pin-done");
    const targets = [...svg.querySelectorAll(".county")].filter(x => x.dataset.cid === c.id);
    if (!ok) { el.classList.add("locator-wrong"); toFront(el); }
    targets.forEach(x => { x.classList.add("locator-target"); toFront(x); });
    if (!ok) addRing(svg, targets);
    $("study-feedback").textContent = ok ? "Correct!" : `Not quite. That one is ${el.dataset.cid ? (findCounty(el.dataset.cid) || {}).name || "another county" : "another county"}; ${getPlainName(c)} is highlighted.`;
    $("study-next").textContent = lastIn(pinSet) ? afterLabel("pin") : "Next";
    replayBackBtn.classList.toggle("hidden", !replayFrom || (replayOnly && lastIn(pinSet)));
    $("study-next").classList.remove("hidden", "study-pending");
    $("study-next").focus();
  }
  const findCounty = id => { for (const s of Object.values(stateData)) { const f = s.counties.find(x => x.id === id); if (f) return f; } return null; };

  function roundMap(c, wrong) {
    const src = document.getElementById(stateData[c.stateKey]?.svgId);
    if (!src) return null;
    const svg = src.cloneNode(true);
    const sc = src.querySelector(".county");
    const outlineW = sc ? getComputedStyle(sc).strokeWidth : "";
    const find = id => [...svg.querySelectorAll("[id]")].filter(el => el.id === id)
      .concat([...svg.querySelectorAll(`[data-county-id="${id}"]`)]);
    const targets = find(c.id);
    const wrongEls = wrong && wrong.id !== c.id && wrong.stateKey === c.stateKey ? find(wrong.id) : [];
    svg.querySelectorAll(".county").forEach(el => {
      el.setAttribute("class", "county");
      el.style.removeProperty("fill"); el.style.removeProperty("stroke");
      if (outlineW) el.style.strokeWidth = outlineW;
    });
    wrongEls.forEach(el => { el.classList.add("locator-wrong"); toFront(el); });
    targets.forEach(el => { el.classList.add("locator-target"); toFront(el); });
    svg.removeAttribute("id");
    svg.querySelectorAll("[id]").forEach(el => el.removeAttribute("id"));
    svg.querySelectorAll("[tabindex]").forEach(el => el.removeAttribute("tabindex"));
    svg.querySelectorAll("[role]").forEach(el => el.removeAttribute("role"));
    ["width", "height", "style"].forEach(a => svg.removeAttribute(a));
    svg.setAttribute("class", "locator-map");
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", `Map of ${stateData[c.stateKey].name}, ${getPlainName(c)} highlighted`);
    return { svg, targets };
  }

  const youLine = (p, e) => {
    if (p === "type") return `You typed: \u201C${e.typed}\u201D`;
    const who = e.chosen ? getPlainName(e.chosen) : "another county";
    return `${p === "pin" ? "You clicked" : "You chose"}: ${who}`;
  };
  const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text !== undefined) n.textContent = text; return n; };
  const addBtn = (label, fn, cls) => {
    const b = el("button", cls || "btn-secondary", label);
    b.type = "button"; b.addEventListener("click", fn); $("study-choices").appendChild(b); return b;
  };

  let replayFrom = null, replayOnly = false;
  const snapshotRound = () => ({ quiz: roundLog.quiz.slice(), type: roundLog.type.slice(), pin: roundLog.pin.slice(), score, typeScore, pinScore, start, batch: batch.slice() });
  const replay = fn => () => { replayFrom = snapshotRound(); replayOnly = true; fn(); };
  const replayBackBtn = el("button", "study-replay-back hidden", "Back to results");
  replayBackBtn.type = "button";
  replayBackBtn.addEventListener("click", () => {
    if (!replayFrom) return;
    const r = replayFrom;
    roundLog.quiz = r.quiz; roundLog.type = r.type; roundLog.pin = r.pin;
    score = r.score; typeScore = r.typeScore; pinScore = r.pinScore;
    start = r.start; batch = r.batch;
    showSummary();
  });
  document.querySelector("#study-run .study-nav").after(replayBackBtn);

  const inSession = () => !$("study-run").classList.contains("hidden") && sumEl.classList.contains("hidden");
  const resumeModal = el("div", "modal hidden");
  resumeModal.id = "modal-study-resume";
  resumeModal.setAttribute("role", "dialog");
  resumeModal.setAttribute("aria-modal", "true");
  resumeModal.setAttribute("aria-labelledby", "study-resume-title");
  resumeModal.innerHTML =
    '<div class="modal-content">' +
      '<h2 id="study-resume-title">Leave session?</h2>' +
      '<p>You\u2019re in the middle of a learning session. Are you sure you want to leave?</p>' +
      '<div class="modal-actions">' +
        '<button type="button" class="btn-secondary" data-leave="yes">Yes</button>' +
        '<button type="button" class="btn-primary" data-leave="no">No</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(resumeModal);
  const closeResume = () => resumeModal.classList.add("hidden");
  resumeModal.addEventListener("click", e => {
    if (e.target === resumeModal) closeResume();
    const b = e.target.closest("[data-leave]");
    if (!b) return;
    closeResume();
    if (b.dataset.leave === "yes") showScreen("screen-home");
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape" && !resumeModal.classList.contains("hidden")) closeResume();
  });
  $("screen-study").addEventListener("click", e => {
    if (!e.target.closest(".study-back-run") || !inSession()) return;
    e.stopPropagation();
    resumeModal.classList.remove("hidden");
    resumeModal.querySelector('[data-leave="no"]').focus();
  }, true);

  function clearRun() {
    hideStudyTip();
    replayBackBtn.classList.add("hidden");
    $("study-map").innerHTML = "";
    $("study-type").classList.add("hidden");
    $("study-feedback").textContent = "";
    $("study-prev").classList.add("hidden");
    $("study-next").classList.add("hidden");
    $("study-choices").innerHTML = "";
  }

  function buildTrack(cards) {
    const track = el("div", "rs-track");
    track.append(...cards);
    const mk = (dir, label) => {
      const b = el("button", "rs-arrow " + (dir < 0 ? "left" : "right"), dir < 0 ? "\u2039" : "\u203A");
      b.type = "button"; b.setAttribute("aria-label", label);
      b.addEventListener("click", () => track.scrollBy({ left: dir * track.clientWidth * 0.8, behavior: "smooth" }));
      return b;
    };
    const l = mk(-1, "Scroll left"), r = mk(1, "Scroll right");
    const upd = () => { l.disabled = track.scrollLeft <= 2; r.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2; };
    track.addEventListener("scroll", upd);
    const wrap = el("div", "rs-carousel");
    wrap.append(track, l, r);
    requestAnimationFrame(() => { track.scrollLeft = 0; upd(); });
    return wrap;
  }

  function showSummary() {
    replayFrom = null, replayOnly = false;
    clearRun();
    $("study-progress").textContent = "Round complete";
    $("study-name").textContent = "";
    sumEl.className = "study-summary rs-grid";
    const rings = [];
    sumEl.replaceChildren(...seq().map(p => {
      const list = roundLog[p], right = list.filter(e => e.ok).length;
      const sec = el("div", "rs-section");
      const head = el("div", "rs-head");
      const score = el("div", "rs-score");
      score.append(el("span", "rs-big", String(right)), el("span", "rs-of", `/${list.length}`));
      head.append(el("div", "rs-label", PHASE_TITLE[p]), score);
      sec.append(head);
      const cards = list.map(e => {
        const card = el("div", "rs-card " + (e.ok ? "ok" : "bad"));
        const holder = el("div", "rs-map");
        const m = roundMap(e.c, p === "type" ? null : e.chosen);
        if (m) { holder.appendChild(m.svg); rings.push(m); }
        const cap = el("div", "rs-cap");
        if (e.ok) cap.append(el("div", "rs-right", `\u2713 ${getPlainName(e.c)}`));
        else cap.append(el("div", "rs-you", `\u2717 ${youLine(p, e)}`), el("div", "rs-answer", `Answer: ${getPlainName(e.c)}`));
        card.append(holder, cap);
        return card;
      });
      sec.append(buildTrack(cards));
      return sec;
    }));
    rings.forEach(m => addRing(m.svg, m.targets));
    if (start + batchSize() < counties.length) addBtn(`Next ${Math.min(batchSize(), counties.length - start - batchSize())} counties`, () => { replayFrom = snapshotRound(); start += batchSize(); beginBatch(true); }, "btn-primary");
    if (seq().includes("pin")) addBtn("Pin again", replay(startPin));
    if (seq().includes("quiz")) addBtn("Quiz again", replay(startQuiz));
    if (seq().includes("type")) addBtn("Type again", replay(startType));
  }
  function results() { showSummary(); }

  const lastOfPhase = () => {
    const set = ({ quiz: quizSet, type: typeSet, pin: pinSet })[phase];
    return set && set.length ? set[set.length - 1] : batch[batch.length - 1];
  };
  function practiceOrder(prev) {
    const order = shuffle(batch);
    if (order.length > 1 && order[0] === prev) {
      const j = 1 + Math.floor(Math.random() * (order.length - 1));
      [order[0], order[j]] = [order[j], order[0]];
    }
    return order;
  }
  function startQuiz() { const prev = lastOfPhase(); phase = "quiz"; quizSet = practiceOrder(prev); i = 0; score = 0; roundLog.quiz = []; render(); }
  function startPin() { const prev = lastOfPhase(); phase = "pin"; pinSet = practiceOrder(prev); i = 0; pinScore = 0; roundLog.pin = []; render(); }
  function startType() { const prev = lastOfPhase(); phase = "type"; typeSet = practiceOrder(prev); i = 0; typeScore = 0; roundLog.type = []; render(); }

  function beginBatch(keepBackToResults) {
    replayOnly = false;
    if (!keepBackToResults) replayFrom = null;
    batch = counties.slice(start, start + batchSize());
    i = 0; phase = "learn";
    render();
  }
  function startPhase(p) { ({ quiz: startQuiz, type: startType, pin: startPin })[p](); }

  window.startStudyFromHome = (mode, keys, skipLearned, excluded) => {
    studyMode = mode;
    selected.clear(); keys.forEach(k => selected.add(k));
    homeExcluded = excluded || new Set();
    $("study-skip-learned").checked = !!skipLearned;
    if (!selected.size || !studyPool().length) return false;
    $("study-mode-indicator").textContent = `Mode: ${MODE_NAME[studyMode]}`;
    sumEl.classList.add("hidden");
    $("study-pick").classList.remove("hidden");
    $("study-run").classList.add("hidden");
    showScreen("screen-study");
    updateStudyStart();
    $("study-start").click();
    return true;
  };

  function recordWord(stateKeyList, n) {
  const eq = String(stateKeyList).split(",").some(usesCountyEquivalents);
  return eq ? (n === 1 ? "county equivalent" : "county equivalents") : (n === 1 ? "county" : "counties");
}

  function openStudy() {
    sumEl.classList.add("hidden");
    $("study-pick").classList.remove("hidden");
    $("study-run").classList.add("hidden");
    $("study-mode-indicator").textContent = `Mode: ${MODE_NAME[studyMode]}`;
    renderPick();
    showScreen("screen-study");
  }

  document.querySelectorAll("[data-study-mode]").forEach(b => b.addEventListener("click", () => { studyMode = b.dataset.studyMode; openStudy(); }));
  $("study-select-all").addEventListener("click", () => { studyStates().forEach(([k]) => selected.add(k)); renderPick(); });
  $("study-deselect-all").addEventListener("click", () => { selected.clear(); renderPick(); });
  $("study-skip-learned").addEventListener("change", updateStudyStart);
  $("study-start").addEventListener("click", async () => {
    const pool = studyPool();
    if (!pool.length) { updateStudyStart(); return; }
    try { await ensureStateMaps(pool.map(c => c.stateKey)); }
    catch (err) { $("study-pick-msg").textContent = "Couldn't load the map data. Make sure the maps folder is next to index.html, then try again."; return; }
    counties = shuffle(pool);
    start = 0;
    $("study-pick").classList.add("hidden");
    $("study-run").classList.remove("hidden");
    const app = document.querySelector(".app-container");
    app.classList.remove("wide-picker");
    const aspect = Math.max(...[...new Set(counties.map(c => c.stateKey))].map(k => {
      const vb = document.getElementById(stateData[k].svgId)?.viewBox?.baseVal;
      return vb && vb.height ? vb.width / vb.height : 1;
    }));
    app.style.setProperty("--study-aspect", aspect);
    app.classList.add("wide-study");
    beginBatch();
  });
  $("study-prev").addEventListener("click", () => { if (i > 0) { i--; render(); } });
  $("study-next").addEventListener("click", () => {
    if (phase === "learn") {
      if (i < batch.length - 1) { i++; render(); } else startPhase(firstPhase());
    } else if (answered) {
      const list = phase === "quiz" ? quizSet : phase === "pin" ? pinSet : typeSet;
      if (i < list.length - 1) { i++; render(); }
      else if (!replayOnly && nextPhaseAfter(phase)) startPhase(nextPhaseAfter(phase));
      else showSummary();
    }
  });
  $("study-submit").addEventListener("click", submitType);
  $("study-input").addEventListener("keydown", e => { if (e.key === "Enter") { e.preventDefault(); submitType(); } });

  document.addEventListener("keydown", e => {
    if (e.key !== "Enter" || e.repeat || e.defaultPrevented || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;
    if (!$("screen-study").classList.contains("active") || $("study-run").classList.contains("hidden")) return;
    if (!sumEl.classList.contains("hidden") || !resumeModal.classList.contains("hidden")) return;
    const t = e.target;
    if (t && t.closest && t.closest("button, a, input, select, textarea, [role='button']") && !(answered && t.closest("#study-choices"))) return;
    const next = $("study-next");
    if (next.classList.contains("hidden") || next.classList.contains("study-pending")) return;
    e.preventDefault();
    next.click();
  });
})();
if (btnGotoSettings) {
  btnGotoSettings.addEventListener("click", () => openSettings("screen-home"));
}


if (btnGameSettings) {
  btnGameSettings.addEventListener("click", () => openSettings("screen-game"));
}


backButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const parentScreen = btn.closest(".screen");
    if (parentScreen && parentScreen.id === "screen-settings") {
      showScreen(settingsReturnScreen);


      if (settingsReturnOverlay === "modal" && modalSummary) {
        modalSummary.classList.remove("hidden");
      } else if (settingsReturnOverlay === "admire" && admireBar) {
        admireBar.classList.remove("hidden");
      }


      settingsReturnScreen = "screen-home";
      settingsReturnOverlay = null;
      setSettingsBackLabel("Back to Home");
    } else {
      showScreen(btn.dataset.target);
    }
  });
});


modeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    selectedMode = btn.dataset.mode || "pin";
    if (setupModeIndicator) setupModeIndicator.textContent = `Mode: ${MODE_LABELS[selectedMode] || selectedMode}`;
    showScreen("screen-setup");
  });
});


SETTING_CONTROLS.forEach(c => {
  const el = document.getElementById(c.id);
  if (!el) return;
  el.addEventListener(c.event || "change", () => {
    gameSettings[c.key] = c.read(el);
    saveSettings();
    if (c.after) c.after();
  });
});


function updateBestKnownButtonLabel() {
  if (btnSelectSuggested) btnSelectSuggested.textContent = `Select your ${gameSettings.bestKnownCount} best-known`;
}

if (inputBestKnownCount) {
  const commitBestKnownCount = (final) => {
    const n = parseInt(inputBestKnownCount.value, 10);
    if (Number.isInteger(n) && n >= 1) {
      gameSettings.bestKnownCount = n;
      saveSettings();
      updateBestKnownButtonLabel();
      if (final) inputBestKnownCount.value = String(n);
    } else if (final) {
      inputBestKnownCount.value = String(gameSettings.bestKnownCount);
    }
  };
  inputBestKnownCount.addEventListener("input", () => commitBestKnownCount(false));
  inputBestKnownCount.addEventListener("change", () => commitBestKnownCount(true));
  inputBestKnownCount.addEventListener("blur", () => commitBestKnownCount(true));
}



function syncStAbbrevSettingUI() {
  if (toggleAcceptStAbbrev) toggleAcceptStAbbrev.disabled = !gameSettings.requireDiacritics;
  if (settingAcceptStAbbrev) settingAcceptStAbbrev.classList.toggle("is-inactive", !gameSettings.requireDiacritics);
}






if (btnResetProgress) {
btnResetProgress.addEventListener("click", async () => {
  const signedIn = !!(window.accountIsSignedIn && window.accountIsSignedIn());
  const ask = signedIn
    ? "Are you sure you want to reset all saved progress and mistakes?\n\nYou're signed in, so this also deletes your points, badges and leaderboard standing. It can't be undone."
    : "Are you sure you want to reset all saved progress and mistakes?";
  if (!confirm(ask)) return;

  // clear the account first; if that fails, change nothing so the game and the profile stay in step
  const acct = window.resetAccountProgress ? await window.resetAccountProgress() : { ok: true };
  if (!acct.ok) {
    alert("Couldn't reset your account progress, so nothing was changed. " + (acct.message || "Try again in a moment."));
    return;
  }

  countyProgress = {};
  countyMistakes = {};
  statsHiddenOverride = {};
  localStorage.removeItem("countyProgress");
  localStorage.removeItem("studyLearned");
  localStorage.removeItem(STUDY_KEY);
  localStorage.removeItem("countyMistakes");
  renderStateListUI();
  renderCountyCheckboxes();
  renderStatsPanel();
  if (suggestionBox) suggestionBox.classList.add("hidden");
  alert("Progress and mistake history reset successfully!");
});
}


document.querySelectorAll(".toc-caret").forEach(caret => {
  caret.addEventListener("click", () => {
    const list = document.getElementById(caret.getAttribute("aria-controls"));
    if (!list) return;
    const nowExpanded = caret.getAttribute("aria-expanded") !== "true";
    caret.setAttribute("aria-expanded", String(nowExpanded));
    list.classList.toggle("collapsed", !nowExpanded);
  });
});


document.querySelectorAll(".toc-section-link, .toc-item-link").forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const targetId = link.getAttribute("href").slice(1);
    const target = document.getElementById(targetId);
    if (!target) return;
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    if (target.classList.contains("setting-item")) {
      target.classList.remove("toc-highlight");
      void target.offsetWidth;
      target.classList.add("toc-highlight");
    }
  });
});

/* ===== Settings: search box, folding groups, and the sidebar opening a folded group when you jump into it ===== */
(function () {
  const main = document.querySelector(".settings-main");
  const search = document.getElementById("settings-search");
  const none = document.getElementById("settings-no-results");
  const groups = [...document.querySelectorAll(".settings-group")];
  if (!main || !search) return;

  const setOpen = (g, open) => {
    g.classList.toggle("collapsed", !open);
    g.querySelector(".settings-group-toggle").setAttribute("aria-expanded", String(open));
  };
  groups.forEach(g => g.querySelector(".settings-group-toggle").addEventListener("click", () => setOpen(g, g.classList.contains("collapsed"))));

  // runs before the sidebar's own scroll handler, so the target is visible by the time it scrolls
  const toc = document.querySelector(".settings-toc");
  if (toc) toc.addEventListener("click", e => {
    const a = e.target.closest("a[href^='#']");
    if (!a) return;
    const target = document.getElementById(a.getAttribute("href").slice(1));
    const g = target && target.closest(".settings-group");
    if (g) setOpen(g, true);
  }, true);

  function runSearch() {
    const q = search.value.trim().toLowerCase();
    main.classList.toggle("searching", !!q);
    let total = 0;
    groups.forEach(g => {
      const rows = [...g.querySelectorAll(".setting-item")];
      const hit = rows.map(r => !q || r.textContent.toLowerCase().includes(q));
      rows.forEach((r, i) => { if (hit[i] && r.classList.contains("setting-sub") && i > 0) hit[i - 1] = true; });   // a sub-setting brings its parent along
      rows.forEach((r, i) => r.classList.toggle("search-hidden", !hit[i]));
      const shown = hit.filter(Boolean).length;
      total += shown;
      g.classList.toggle("search-empty", !!q && shown === 0);
    });
    if (none) none.classList.toggle("hidden", !q || total > 0);
  }
  search.addEventListener("input", runSearch);
  search.addEventListener("keydown", e => { if (e.key === "Escape" && search.value) { search.value = ""; runSearch(); } });
})();

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


    if (stateRow.dataset.listenerAttached === "true") return;
    stateRow.dataset.listenerAttached = "true";


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


function getCountyLearnedStatus(countyId, mode) {
  const status = countyProgress[countyId] && countyProgress[countyId][mode];
  if (status === true) return "clean";
  return status || null;
}


function isCountyLearned(countyId, mode) {
  return !!getCountyLearnedStatus(countyId, mode);
}

const UNLOCK_SVG_NS = "http://www.w3.org/2000/svg";

function createUnlockMedal(badge) {
  const svg = document.createElementNS(UNLOCK_SVG_NS, "svg");
  svg.setAttribute("viewBox", "0 0 100 100");
  svg.setAttribute("class", "unlock-toast-medal");
  svg.setAttribute("aria-hidden", "true");
  const face = document.createElementNS(UNLOCK_SVG_NS, "circle");
  face.setAttribute("cx", "50");
  face.setAttribute("cy", "50");
  face.setAttribute("r", "45");
  face.setAttribute("class", "unlock-medal-face");
  const lockedRing = document.createElementNS(UNLOCK_SVG_NS, "circle");
  lockedRing.setAttribute("cx", "50");
  lockedRing.setAttribute("cy", "50");
  lockedRing.setAttribute("r", "45");
  lockedRing.setAttribute("class", "unlock-medal-locked-ring");
  const earnedRing = document.createElementNS(UNLOCK_SVG_NS, "circle");
  earnedRing.setAttribute("cx", "50");
  earnedRing.setAttribute("cy", "50");
  earnedRing.setAttribute("r", "45");
  earnedRing.setAttribute("class", "unlock-medal-earned-ring");
  svg.append(face, lockedRing, earnedRing);

  if (badge.stateKey) {
    renderStateUnlockShape(svg, badge.stateKey);
  } else if (badge.flame) {
    const flame = document.createElementNS(UNLOCK_SVG_NS, "path");
    flame.setAttribute("d", "M50 22 C58 34 71 41 67 58 C65 69 58 76 50 76 C42 76 35 69 33 58 C31 50 37 45 41 39 C43 45 46 47 50 45 C53 39 51 31 50 22 Z");
    flame.setAttribute("class", "unlock-medal-glyph");
    svg.append(flame);
  } else {
    const glyph = document.createElementNS(UNLOCK_SVG_NS, "text");
    glyph.setAttribute("x", "50");
    glyph.setAttribute("y", "51");
    glyph.setAttribute("text-anchor", "middle");
    glyph.setAttribute("dominant-baseline", "central");
    glyph.setAttribute("class", "unlock-medal-glyph");
    glyph.setAttribute("font-size", String(String(badge.glyph || "★").length >= 4 ? 20 : String(badge.glyph || "★").length === 3 ? 24 : 30));
    glyph.textContent = badge.glyph || "★";
    svg.append(glyph);
  }
  return svg;
}

async function renderStateUnlockShape(medal, stateKey) {
  const state = stateData[stateKey];
  if (!state) return;
  try {
    let paths;
    let sourceBox;
    if (stateKey === "american_samoa") {
      const outlines = [...document.querySelectorAll('.us-st[data-name="American Samoa"]')];
      if (!outlines.length) throw new Error("The profile map has no American Samoa outline");
      sourceBox = outlines[0].ownerSVGElement.viewBox.baseVal;
      paths = outlines.map(path => {
        const d = path.getAttribute("d") || "";
        const tutuilaAndAunuU = (d.match(/M[^M]*/g) || []).filter(part => {
          const coordinates = part.match(/-?\d+\.?\d*/g);
          if (!coordinates) return false;
          let maxX = -Infinity;
          for (let i = 0; i < coordinates.length; i += 2) maxX = Math.max(maxX, Number(coordinates[i]));
          return maxX < 750;
        });
        return { path, d: tutuilaAndAunuU.join("") };
      }).filter(item => item.d);
    } else {
      await ensureStateMaps([stateKey]);
      const source = document.getElementById(state.svgId);
      if (!source) throw new Error(`No county map found for ${state.name}`);
      sourceBox = source.viewBox.baseVal;
      paths = [...source.querySelectorAll(".county")].map(path => ({ path }));
    }
    if (!paths.length) throw new Error(`No badge outline found for ${state.name}`);

    const group = document.createElementNS(UNLOCK_SVG_NS, "g");
    group.setAttribute("class", "unlock-medal-state-shape");
    paths.forEach(({ path, d }) => {
      const shape = path.cloneNode(false);
      shape.removeAttribute("id");
      shape.removeAttribute("class");
      if (d !== undefined) shape.setAttribute("d", d);
      shape.style.cssText = "fill:var(--unlock-color);stroke:none";
      group.append(shape);
    });
    const measureSvg = document.createElementNS(UNLOCK_SVG_NS, "svg");
    measureSvg.setAttribute("viewBox", `${sourceBox.x} ${sourceBox.y} ${sourceBox.width} ${sourceBox.height}`);
    measureSvg.setAttribute("width", "1000");
    measureSvg.setAttribute("height", "1000");
    measureSvg.style.cssText = "position:fixed;left:-10000px;top:-10000px;visibility:hidden";
    measureSvg.append(group);
    let bounds;
    try {
      document.body.append(measureSvg);
      bounds = group.getBBox();
    } finally {
      measureSvg.remove();
      group.remove();
    }
    const shapeView = document.createElementNS(UNLOCK_SVG_NS, "svg");
    shapeView.setAttribute("x", "17");
    shapeView.setAttribute("y", "17");
    shapeView.setAttribute("width", "66");
    shapeView.setAttribute("height", "66");
    shapeView.setAttribute("viewBox", `${sourceBox.x} ${sourceBox.y} ${sourceBox.width} ${sourceBox.height}`);
    shapeView.setAttribute("preserveAspectRatio", "xMidYMid meet");
    if (bounds.width > 0 && bounds.height > 0) {
      const padding = Math.max(bounds.width, bounds.height) * 0.04;
      const fittedViewBox = `${bounds.x - padding} ${bounds.y - padding} ${bounds.width + padding * 2} ${bounds.height + padding * 2}`;
      shapeView.setAttribute("viewBox", fittedViewBox);
    }
    shapeView.append(group);
    medal.append(shapeView);
  } catch (error) {
    console.warn("Couldn't draw the state badge in its unlock notification:", error);
    const fallback = document.createElementNS(UNLOCK_SVG_NS, "text");
    fallback.setAttribute("x", "50");
    fallback.setAttribute("y", "51");
    fallback.setAttribute("text-anchor", "middle");
    fallback.setAttribute("dominant-baseline", "central");
    fallback.setAttribute("class", "unlock-medal-glyph");
    fallback.setAttribute("font-size", "24");
    fallback.textContent = state.name.slice(0, 2).toUpperCase();
    medal.append(fallback);
  }
}

function showUnlockToast(title, detail, badge = {}) {
  let region = document.getElementById("unlock-toasts");
  if (!region) {
    region = document.createElement("div");
    region.id = "unlock-toasts";
    region.className = "unlock-toasts";
    region.setAttribute("aria-live", "polite");
    region.setAttribute("aria-relevant", "additions");
    document.body.append(region);
  }

  const toast = document.createElement("article");
  toast.className = `unlock-toast${badge.stateKey ? " unlock-toast-state" : ""}`;
  toast.setAttribute("role", "status");
  toast.style.setProperty("--unlock-color", badge.color || "#d4a017");
  const medal = createUnlockMedal(badge);
  const eyebrow = document.createElement("span");
  eyebrow.className = "unlock-toast-eyebrow";
  eyebrow.textContent = "Badge Unlocked!";
  const copy = document.createElement("span");
  copy.className = "unlock-toast-copy";
  const heading = document.createElement("strong");
  heading.textContent = title;
  const description = document.createElement("span");
  description.textContent = detail;
  copy.append(heading, description);
  const close = document.createElement("button");
  close.className = "unlock-toast-close";
  close.type = "button";
  close.setAttribute("aria-label", "Dismiss notification");
  close.textContent = "×";
  toast.append(eyebrow, medal, copy, close);
  region.append(toast);
  requestAnimationFrame(() => toast.classList.add("unlock-toast-earned"));

  let removeTimer;
  const dismiss = () => {
    clearTimeout(removeTimer);
    toast.classList.add("unlock-toast-exit");
    setTimeout(() => toast.remove(), 220);
  };
  close.addEventListener("click", dismiss);
  removeTimer = setTimeout(dismiss, 7500);
}

window.showUnlockToast = showUnlockToast;

function markCountyLearned(countyId, mode, viaRetryMissed) {
  const newStatus = viaRetryMissed ? "retry" : "clean";
  const current = getCountyLearnedStatus(countyId, mode);
  if (current === "clean" || current === newStatus) return;
  if (!countyProgress[countyId]) countyProgress[countyId] = {};
  countyProgress[countyId][mode] = newStatus;
  localStorage.setItem("countyProgress", JSON.stringify(countyProgress));
  if (window.reportCompletion) window.reportCompletion(countyId, mode, currentGameRunId);
  renderStatsPanel();
}

let mostRecentCorrectVersion = 0;

function clearMostRecentCorrect() {
  mostRecentCorrectVersion++;
  document.querySelectorAll(".county.just-found").forEach(el => el.classList.remove("just-found"));
  document.querySelectorAll(".county.correct-recovered").forEach(el => {
    el.classList.remove("correct-recovered");
    el.classList.add("correct", "found");
  });
  return mostRecentCorrectVersion;
}

function markMostRecentCorrect(counties, version = clearMostRecentCorrect()) {
  if (version !== mostRecentCorrectVersion) return;
  counties.forEach(county => {
    getCountyElements(county.id).forEach(el => el.classList.add("just-found"));
  });
}


function miniMap(s, learned) {
  const src = document.getElementById(s.svgId);
  if (!src || !src.querySelector(".county")) return null;
  const svg = src.cloneNode(true);
  svg.querySelectorAll('[class*="callout"], [class*="arrowhead"], defs').forEach(el => el.remove());
  const done = new Set(s.counties.filter(c => learned[c.id]).map(c => c.id));
  svg.querySelectorAll(".county").forEach(el => {
    const cid = el.dataset.countyId || el.id;
    el.setAttribute("class", done.has(cid) ? "county mini-learned" : "county");
    el.style.removeProperty("fill");
    el.style.removeProperty("stroke");
    el.removeAttribute("tabindex");
    el.removeAttribute("role");
  });
  svg.removeAttribute("id");
  svg.querySelectorAll("[id]").forEach(el => el.removeAttribute("id"));
  ["width", "height", "style"].forEach(a => svg.removeAttribute(a));
  svg.setAttribute("class", "locator-map study-mini-map");
  svg.setAttribute("role", "img");
  svg.setAttribute("aria-label", `Map of ${s.name}: ${done.size} of ${s.counties.length} learned`);
  return svg;
}

const nameCollator = new Intl.Collator();
const sortedCountiesCache = {};
function sortedCountiesOf(stateKey) {
  const list = stateData[stateKey].counties;
  const hit = sortedCountiesCache[stateKey];
  if (hit && hit.n === list.length) return hit.sorted;
  const sorted = [...list].sort((a, b) => nameCollator.compare(a.name, b.name));
  sortedCountiesCache[stateKey] = { n: list.length, sorted };
  return sorted;
}

function renderStatsPanel() {
  if (!statsPanel || !statsSections) return;
  const homeScreen = document.getElementById("screen-home");
  if (homeScreen && !homeScreen.classList.contains("active")) return;

  if (activeStateKeys.length === 0) {
    statsPanel.classList.add("hidden");
    if (statsDivider) statsDivider.classList.add("hidden");
    statsSections.innerHTML = "";
    return;
  }

  const hideAllBtn = statsPanel.querySelector("#btn-hide-all-stats");
  if (hideAllBtn) hideAllBtn.textContent = activeStateKeys.every(isStatsHidden) ? "Show all" : "Hide all";

  const learnView = statsView === "learn";
  const modes = learnView ? STUDY_MODE_LIST : MODE_LIST;
  const labelOf = m => learnView ? STUDY_MODE_LABELS[m] : MODE_LABELS[m];
  const statusOf = (id, m) => learnView ? (isStudyLearned(id, m) ? "clean" : null) : getCountyLearnedStatus(id, m);
  statsPanel.querySelectorAll("[data-stats-view]").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.statsView === statsView)));
  const headerCells = modes.map(mode => `<th>${labelOf(mode)}</th>`).join("");

  const stateSections = getOrderedStateKeys().map(stateKey => {
    const state = stateData[stateKey];
    if (!state) return "";

    const sortedCounties = sortedCountiesOf(stateKey);
    const total = sortedCounties.length;
    const hidden = isStatsHidden(stateKey);

    const summaryCells = modes.map(mode => {
      const learnedCount = sortedCounties.filter(c => !!statusOf(c.id, mode)).length;
      const cleanCount = sortedCounties.filter(c => statusOf(c.id, mode) === "clean").length;
      const allClean = cleanCount === total;
      const allLearned = learnedCount === total;
      let label, cellClass;
      if (allClean) {
        label = "Completed";
        cellClass = " stats-complete";
      } else if (allLearned) {
        label = "Completed (Retry Missed)";
        cellClass = " stats-complete-retry";
      } else {
        label = `${learnedCount}/${total} learned`;
        cellClass = "";
      }
      return `<td class="stats-summary-cell${cellClass}">${label}</td>`;
    }).join("");

    const countyRows = sortedCounties.map(c => {
      const cells = modes.map(mode => {
        const status = statusOf(c.id, mode);
        const symbol = status === "clean" ? "✓" : status === "retry" ? "–" : "✗";
        const statusClass = status === "clean" ? "stats-yes" : status === "retry" ? "stats-retry" : "stats-no";
        const label = status === "clean" ? "Learned" : status === "retry" ? "Learned (Retry Missed)" : "Not learned";
        return `<td class="stats-check-cell ${statusClass}" aria-label="${label}">${symbol}</td>`;
      }).join("");
      return `<tr><td class="stats-county-name">${c.name}</td>${cells}</tr>`;
    }).join("");

    return `
      <div class="stats-state-header">
        <span class="stats-state-name">${state.name}</span>
        <button type="button" class="btn-secondary btn-stats-toggle" data-state-key="${stateKey}" aria-expanded="${!hidden}">${hidden ? "Show" : "Hide"}</button>
      </div>
      ${hidden ? "" : `
      ${learnView ? `<div class="stats-minimap" data-minimap="${stateKey}"></div>` : ""}
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

  if (learnView) {
    const mapModes = statsLearnMode === "all" ? STUDY_MODE_LIST : [statsLearnMode];
    const note = statsLearnMode === "all" ? "Green: learned in all three Learn modes" : `Green: learned in ${STUDY_MODE_LABELS[statsLearnMode]}`;
    statsSections.querySelectorAll("[data-minimap]").forEach(box => {
      const key = box.dataset.minimap, s = stateData[key];
      loadStateMap(key).then(() => {
        if (!box.isConnected) return;
        const learned = {};
        s.counties.forEach(c => { if (mapModes.every(m => isStudyLearned(c.id, m))) learned[c.id] = true; });
        const map = miniMap(s, learned);
        if (!map) return;
        const cap = document.createElement("p");
        cap.className = "stats-minimap-note";
        cap.textContent = note;
        box.append(map, cap);
      }).catch(() => {  });
    });
  }

  statsPanel.classList.remove("hidden");
  if (statsDivider) statsDivider.classList.remove("hidden");
}


if (statsPanel) {
  statsPanel.addEventListener("click", (e) => {
    const viewBtn = e.target.closest("[data-stats-view]");
    if (viewBtn) { statsView = viewBtn.dataset.statsView; renderStatsPanel(); return; }
    const hideAllBtn = e.target.closest("#btn-hide-all-stats");
    if (hideAllBtn) {
      const hide = !activeStateKeys.every(isStatsHidden);
      activeStateKeys.forEach(stateKey => { statsHiddenOverride[stateKey] = hide; });
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


function distanceToShapeEdge(path, cx, cy, vx, vy, maxLen, lenient = false) {
  if (typeof path.isPointInFill !== "function") return null;
  const inside = (t) => path.isPointInFill(new DOMPoint(cx + vx * t, cy + vy * t));
  if (!lenient && !inside(0)) return null;
  const step = 4;
  let lo = inside(0) ? 0 : -1;
  for (let t = step; t <= maxLen; t += step) if (inside(t)) lo = t;
  if (lo < 0) return null;
  let hi = lo + step;
  for (let i = 0; i < 8; i++) { const mid = (lo + hi) / 2; if (inside(mid)) lo = mid; else hi = mid; }
  return lo;
}

function setupCountyCallout(targetSvg, countyId, key, offsetX, offsetY, radiusPadding, stopShort, radiusOverride, styleKey = key, tip = null) {
  const countyPath = document.getElementById(countyId);
  if (!countyPath || !targetSvg) return false;

  const us = parseFloat(targetSvg.dataset && targetSvg.dataset.unitScale) || 1;
  offsetX *= us; offsetY *= us; radiusPadding *= us; stopShort *= us;
  if (radiusOverride !== undefined) radiusOverride *= us;

  let bbox;
  try {
    bbox = countyPath.getBBox();
    const dAttr = countyPath.getAttribute && countyPath.getAttribute("d");
    if (dAttr && dAttr.indexOf("M", 1) > 0) {
      const tmp = document.createElementNS("http://www.w3.org/2000/svg", "path");
      tmp.style.visibility = "hidden";
      targetSvg.appendChild(tmp);
      let best = null;
      (dAttr.match(/M[^M]*/g) || []).forEach(piece => {
        tmp.setAttribute("d", piece);
        const b = tmp.getBBox();
        if (!best || b.width * b.height > best.width * best.height) {
          best = { x: b.x, y: b.y, width: b.width, height: b.height };
        }
      });
      targetSvg.removeChild(tmp);
      if (best && (best.width || best.height)) bbox = best;
    }
  } catch (e) {
    return false;
  }
  if (!bbox || (bbox.width === 0 && bbox.height === 0)) return false;

  const cx = bbox.x + bbox.width / 2;
  const cy = bbox.y + bbox.height / 2;

  const calloutX = cx + offsetX;
  const calloutY = cy + offsetY;
  const calloutRadius = radiusOverride !== undefined
    ? radiusOverride
    : Math.max(bbox.width, bbox.height) * 1.6 + radiusPadding;

  const aimX = tip ? bbox.x + bbox.width * tip[0] : cx;
  const aimY = tip ? bbox.y + bbox.height * tip[1] : cy;
  const dx = aimX - calloutX;
  const dy = aimY - calloutY;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const ux = dx / dist;
  const uy = dy / dist;
  let tipX = aimX - ux * stopShort;
  let tipY = aimY - uy * stopShort;
  if (styleKey === "va" && !tip) {
    const edge = distanceToShapeEdge(countyPath, cx, cy, -ux, -uy, Math.min(dist, 20 * us));
    if (edge !== null) { tipX = cx - ux * edge; tipY = cy - uy * edge; }
  }

  const startX = calloutX + ux * calloutRadius;
  const startY = calloutY + uy * calloutRadius;

  const svgNS = "http://www.w3.org/2000/svg";
  const targetGroup = targetSvg.querySelector("g") || targetSvg;

  let defs = targetSvg.querySelector("defs");
  if (!defs) {
    defs = document.createElementNS(svgNS, "defs");
    targetSvg.insertBefore(defs, targetSvg.firstChild);
  }
  const arrowheadId = `${styleKey}-arrowhead-${targetSvg.id || "m"}`;
  if (!targetSvg.querySelector(`[id="${arrowheadId}"]`)) {
    const marker = document.createElementNS(svgNS, "marker");
    marker.setAttribute("id", arrowheadId);
    marker.setAttribute("markerWidth", "8");
    marker.setAttribute("markerHeight", "8");
    marker.setAttribute("refX", "6.5");
    marker.setAttribute("refY", "4");
    marker.setAttribute("orient", "auto-start-reverse");
    const arrowHead = document.createElementNS(svgNS, "path");
    arrowHead.setAttribute("d", "M0,0 L8,4 L0,8 Z");
    if (us !== 1) {
      const isVa = styleKey === "va";
      const m = (isVa ? (targetSvg.id === "svg-american-samoa" ? 20 : 5) : 12) * us;
      marker.setAttribute("markerUnits", "userSpaceOnUse");
      marker.setAttribute("markerWidth", m);
      marker.setAttribute("markerHeight", m);
      marker.setAttribute("refX", isVa ? m : 9.75 * us);
      marker.setAttribute("refY", m / 2);
      arrowHead.setAttribute("d", `M0,0 L${m},${m / 2} L0,${m} Z`);
    }
    arrowHead.setAttribute("class", `${styleKey}-arrowhead-fill`);
    marker.appendChild(arrowHead);
    defs.appendChild(marker);
  }

  const line = document.createElementNS(svgNS, "line");
  line.setAttribute("x1", startX);
  line.setAttribute("y1", startY);
  line.setAttribute("x2", tipX);
  line.setAttribute("y2", tipY);
  line.setAttribute("class", `${styleKey}-callout-line`);
  line.setAttribute("marker-end", `url(#${arrowheadId})`);
  line.setAttribute("pointer-events", "none");
  targetGroup.appendChild(line);

  const countyName = countyPath.getAttribute("data-name") || countyId;
  const circle = document.createElementNS(svgNS, "circle");
  circle.setAttribute("cx", calloutX);
  circle.setAttribute("cy", calloutY);
  circle.setAttribute("r", calloutRadius);
  circle.setAttribute("id", `${key}-callout`);
  circle.setAttribute("class", `county ${styleKey}-callout`);
  circle.setAttribute("data-county-id", countyId);
  circle.setAttribute("data-name", countyName);
  circle.setAttribute("tabindex", "0");
  circle.setAttribute("role", "button");
  circle.setAttribute("aria-label", `${countyName} ${unitWord(false)} (click here — the real ${unitWord(false)} outline is very small)`);
  targetGroup.appendChild(circle);

  countyPaths = document.querySelectorAll(".county");
  bindCountyInteractivity(circle);
  return true;
}


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


function shouldUseDividerLayout() {
  if (gameSettings.scaleStatesBySize) return true;
  return (
    gameSettings.useDividersForFewStates &&
    activeStateKeys.length > 0 &&
    activeStateKeys.length <= 3
  );
}


function updateMapLayoutMode() {
  document.body.classList.toggle("scale-states-by-size", shouldUseDividerLayout());
}


function updateMapGridColumns() {
  const wrapper = document.querySelector(".map-wrapper");
  if (!wrapper) return;
  const cappedByActiveCount = activeStateKeys.length > 0
    ? Math.min(gameSettings.statesPerRow, activeStateKeys.length)
    : gameSettings.statesPerRow;
  wrapper.style.setProperty("--states-per-row", Math.max(1, cappedByActiveCount));
}


function switchVisibleSvgMap() {
  prefetchStateMaps(activeStateKeys);
  exitMapZoom();
  updateMapLayoutMode();
  updateMapGridColumns();
  applyMapDomOrder();

  const currentSvgMaps = document.querySelectorAll(".state-map");

  currentSvgMaps.forEach(map => {
    map.style.display = "none";
    map.classList.add("hidden");
    map.classList.remove("map-divider", "map-divider-top");
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


      if (key === "hawaii" && !kalawaoCalloutCreated) {
        kalawaoCalloutCreated = setupCountyCallout(targetSvg, "kalawao", "kalawao", -59, -110, 5, 2);
      }
      if (key === "california" && !sfCalloutCreated) {
        sfCalloutCreated = setupCountyCallout(targetSvg, "san-francisco", "sf", -150, -17, 10, 15);
      }
      if (key === "alaska" && !skagwayCalloutCreated) {
        skagwayCalloutCreated = setupCountyCallout(targetSvg, "skagway", "skagway", 40, -55, 4, 5, 14);
      }
      if (key === "alaska" && !bristolBayCalloutCreated) {
        bristolBayCalloutCreated = setupCountyCallout(targetSvg, "bristol-bay", "bristol-bay", -85, 15, 4, 8, 14);
      }
      (EXTRA_CALLOUTS[key] || []).forEach(([id, ox, oy, tip, radius]) => {
        if (!extraCalloutsDone[id]) {
          extraCalloutsDone[id] = setupCountyCallout(targetSvg, id, `x-${id}`, ox, oy, 0, 3, radius || 16, "va", tip);
        }
      });
      (RAISE_ON_TOP[key] || []).forEach(id => {
        const el = targetSvg.querySelector(`[id="${id}"]`);
        if (el && el.parentNode) el.parentNode.appendChild(el);
      });
            if (key === "virginia") {
        if (!virginiaCitiesRaised && targetSvg.querySelector(".county")) {
          try {
            const cityNames = new Set([...VA_TWIN_CITIES, ...VA_CITY_BASES]);
            let moved = 0;
            stateData.virginia.counties.filter(c => cityNames.has(c.name)).forEach(c => {
              const el = targetSvg.querySelector(`[id="${c.id}"]`);
              if (el && el.parentNode) { el.parentNode.appendChild(el); moved++; }   // draw cities on top of the counties around them
            });
            console.log("raised VA cities:", moved);
            if (moved) virginiaCitiesRaised = true;
          } catch (e) { /* the city lists aren't ready yet; try again next time */ }
        }
          layoutVirginiaCallouts(targetSvg).forEach(([id, ox, oy]) => {
          if (!virginiaCalloutsDone[id]) {
            virginiaCalloutsDone[id] = setupCountyCallout(targetSvg, id, `va-${id}`, ox, oy, 0, 3, 9, "va");
          }
        });
      }
    }
  });


  const domOrderedVisibleMaps = Array.from(currentSvgMaps).filter(map => visibleMaps.includes(map));


  updateMapDividers();
}


function updateMapDividers() {
  const domOrderedVisibleMaps = Array.from(document.querySelectorAll(".state-map"))
    .filter(map => !map.classList.contains("hidden") && map.style.display !== "none" && !map.classList.contains("zoomed"));
  domOrderedVisibleMaps.forEach(map => map.classList.remove("map-divider", "map-divider-top"));

  const rows = [];
  domOrderedVisibleMaps.forEach(map => {
    const rect = map.getBoundingClientRect();
    const lastRow = rows[rows.length - 1];
    if (lastRow) {
      const overlap = Math.min(lastRow.bottom, rect.bottom) - Math.max(lastRow.top, rect.top);
      const smallerHeight = Math.min(lastRow.bottom - lastRow.top, rect.height);
      if (overlap > smallerHeight * 0.35) {
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
      row.maps.forEach(map => map.classList.add("map-divider-top"));
    }
  });
}

let dividerResizeFrame = 0;
window.addEventListener("resize", () => {
  cancelAnimationFrame(dividerResizeFrame);
  dividerResizeFrame = requestAnimationFrame(updateMapDividers);
});


  let checkboxesDirty = false;
  function renderCountyCheckboxes() {
  if (!checkboxContainer) return;
  if (checkboxContainer.classList.contains("hidden")) { checkboxesDirty = true; return; }
  checkboxesDirty = false;


  const existingChildren = checkboxContainer.querySelectorAll("label, .county-group-header");
  existingChildren.forEach(el => el.remove());


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
        <button type="button" class="county-locate-btn" data-county-id="${c.id}" aria-label="Which one's that? Show ${c.name} on the map" title="Show on map">?</button>
      `;
      label.dataset.searchName = c.name;
      checkboxContainer.appendChild(label);
    });
  });


  document.querySelectorAll(".county-checkbox").forEach(cb => {
    cb.addEventListener("change", updateSetupPlayButton);
  });

  applyCountySearchFilter();
}


const APOS_LIKE = /[\u02bb\u2018\u2019`']/g;
function searchMode(rawQuery) {
  const q = String(rawQuery);
  if (q.includes("\u02bb")) return "okina";
  if (/[\u2018\u2019`']/.test(q)) return "apostrophe";
  return "plain";
}
function normalizeForSearch(str, mode = "plain") {
  let t = foldDiacriticsForComparison(String(str)).toLowerCase();
  if (mode === "okina") t = t.replace(/[\u2018\u2019`']/g, "");
  else if (mode === "apostrophe") t = t.replace(APOS_LIKE, "'");
  else t = t.replace(APOS_LIKE, "");
  return t.replace(/\s+/g, " ").trim();
}
function searchMatches(text, rawQuery) {
  if (!String(rawQuery).trim()) return true;
  const mode = searchMode(rawQuery);
  return normalizeForSearch(text, mode).includes(normalizeForSearch(rawQuery, mode));
}

function applyStateSearchFilter() {
  const input = document.getElementById("state-search");
  const empty = document.getElementById("state-search-empty");
  const q = input ? input.value : "";
  let shown = 0;
  document.querySelectorAll("#screen-setup .states-list .state-row").forEach(row => {
    const nameEl = row.querySelector(".state-name");
    const match = !q.trim() || (nameEl && searchMatches(nameEl.textContent, q));
    row.classList.toggle("search-hidden", !match);
    if (match) shown++;
  });
  if (empty) empty.classList.toggle("hidden", shown > 0);
}

function applyCountySearchFilter() {
  const input = document.getElementById("county-search");
  const empty = document.getElementById("county-search-empty");
  if (!checkboxContainer) return;
  const q = input ? input.value.trim() : "";
  let anyShown = false;
  let currentHeader = null;
  let headerHasMatch = false;

  const finishGroup = () => {
    if (currentHeader) currentHeader.classList.toggle("search-hidden", !!q && !headerHasMatch);
  };

  Array.from(checkboxContainer.children).forEach(el => {
    if (el.classList.contains("county-group-header")) {
      finishGroup();
      currentHeader = el;
      headerHasMatch = false;
    } else if (el.classList.contains("checkbox-label")) {
      const match = !q || searchMatches(el.dataset.searchName || el.textContent, q);
      el.classList.toggle("search-hidden", !match);
      if (match) { headerHasMatch = true; anyShown = true; }
    }
  });
  finishGroup();

  if (empty) empty.classList.toggle("hidden", !q || anyShown);
}

const stateSearchInput = document.getElementById("state-search");
if (stateSearchInput) {
  stateSearchInput.addEventListener("input", applyStateSearchFilter);
  stateSearchInput.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { stateSearchInput.value = ""; applyStateSearchFilter(); }
  });
}
const countySearchInput = document.getElementById("county-search");
if (countySearchInput) {
  countySearchInput.addEventListener("input", applyCountySearchFilter);
  countySearchInput.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { countySearchInput.value = ""; applyCountySearchFilter(); }
    if (e.key === "Enter") e.preventDefault();
  });
}

const locatorModal = document.getElementById("modal-locator");
const locatorHolder = document.getElementById("locator-map-holder");
const locatorSubtitle = document.getElementById("locator-subtitle");
const btnLocatorClose = document.getElementById("btn-locator-close");

function closeLocator() {
  if (locatorModal) locatorModal.classList.add("hidden");
  if (locatorHolder) locatorHolder.innerHTML = "";
}

function openLocator(countyId) {
  if (!locatorModal || !locatorHolder) return;
  const county = findCountyById(countyId);
  if (!county) return;
  const sourceSvg = document.getElementById(stateData[county.stateKey]?.svgId);
  if (!sourceSvg) return;

  const stateName = stateData[county.stateKey]?.name || county.stateKey;
  if (locatorSubtitle) locatorSubtitle.textContent = `${getPlainName(county)} — ${stateName}`;

  const svg = sourceSvg.cloneNode(true);

  const targets = [];
  svg.querySelectorAll("[id]").forEach(el => {
    if (el.id === countyId) targets.push(el);
  });
  svg.querySelectorAll(`[data-county-id="${countyId}"]`).forEach(el => {
    if (!targets.includes(el)) targets.push(el);
  });

  svg.querySelectorAll(".county").forEach(el => {
    el.setAttribute("class", "county");
    el.style.removeProperty("fill");
    el.style.removeProperty("stroke");
  });
  targets.forEach(el => { el.classList.add("locator-target"); if (el.parentNode) el.parentNode.appendChild(el); });
  svg.removeAttribute("id");
  svg.querySelectorAll("[id]").forEach(el => el.removeAttribute("id"));
  svg.querySelectorAll("[tabindex]").forEach(el => el.removeAttribute("tabindex"));
  svg.querySelectorAll("[role]").forEach(el => el.removeAttribute("role"));
  svg.setAttribute("class", "locator-map");
  svg.removeAttribute("width");
  svg.removeAttribute("height");
  svg.removeAttribute("style");
  svg.setAttribute("aria-label", `Map of ${stateName} with ${county.name} highlighted`);

  locatorHolder.innerHTML = "";
  locatorHolder.appendChild(svg);
  locatorModal.classList.remove("hidden");

  requestAnimationFrame(() => {
    try {
      const target = targets.find(t => t.classList.contains("locator-target") && t.getBoundingClientRect().width > 0)
        || targets[0];
      if (!target) return;
      const r = target.getBoundingClientRect();
      const svgRect = svg.getBoundingClientRect();
      if (!svgRect.width || Math.max(r.width, r.height) > svgRect.width * 0.03) return;
      const inv = svg.getScreenCTM().inverse();
      const pt = svg.createSVGPoint();
      pt.x = r.left; pt.y = r.top;
      const a = pt.matrixTransform(inv);
      pt.x = r.right; pt.y = r.bottom;
      const b = pt.matrixTransform(inv);
      const vbWidth = svg.viewBox.baseVal && svg.viewBox.baseVal.width ? svg.viewBox.baseVal.width : 800;
      const ring = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      ring.setAttribute("class", "locator-ring");
      ring.setAttribute("cx", (a.x + b.x) / 2);
      ring.setAttribute("cy", (a.y + b.y) / 2);
      ring.setAttribute("r", Math.max(Math.abs(b.x - a.x), Math.abs(b.y - a.y)) / 2 + vbWidth * 0.02);
      svg.appendChild(ring);
    } catch (err) {  }
  });

  if (btnLocatorClose) btnLocatorClose.focus();
}

if (checkboxContainer) {
  checkboxContainer.addEventListener("click", (e) => {
    const btn = e.target.closest(".county-locate-btn");
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    openLocator(btn.dataset.countyId);
  });
}
if (btnLocatorClose) btnLocatorClose.addEventListener("click", closeLocator);
if (locatorModal) {
  locatorModal.addEventListener("click", (e) => { if (e.target === locatorModal) closeLocator(); });
}
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && locatorModal && !locatorModal.classList.contains("hidden")) closeLocator();
});


function getActiveCountiesPool() {
  return activeStateKeys.flatMap(key => (stateData[key] ? stateData[key].counties : []));
}


function getSuggestionLimit() {
  return gameSettings.bestKnownCount;
}


function getLowestMistakeCountyIds(limit) {
  return Array.from(document.querySelectorAll(".county-checkbox"))
    .map(cb => ({ id: cb.value, mistakes: countyMistakes[cb.value] || 0 }))
    .filter(c => c.mistakes >= 0)
    .sort((a, b) => a.mistakes - b.mistakes)
    .slice(0, limit)
    .map(c => c.id);
}


radioSpecific.forEach(radio => {
  radio.addEventListener("change", (e) => {
    if (e.target.value === "yes") {
      if (checkboxContainer) checkboxContainer.classList.remove("hidden");
      if (checkboxesDirty) renderCountyCheckboxes();
    }
    const countyCheckboxes = document.querySelectorAll(".county-checkbox");
    if (e.target.value === "yes") {


      countyCheckboxes.forEach(cb => {
        cb.checked = false;
      });


      const topMistakeIds = getLowestMistakeCountyIds(getSuggestionLimit());
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


if (btnSelectAllStates) {
  btnSelectAllStates.addEventListener("click", () => {
    Object.keys(stateData).forEach(stateKey => {
      if (!activeStateKeys.includes(stateKey)) {
        activeStateKeys.push(stateKey);
      }
      const stateRow = document.getElementById(`state-${stateKey}`);
      if (stateRow) {
        stateRow.classList.add("selected");
        stateRow.setAttribute("aria-pressed", "true");
      }
    });

    renderCountyCheckboxes();
    if (countyPanel) {
      countyPanel.classList.toggle("hidden", activeStateKeys.length === 0);
    }
    updateSetupPlayButton();
    switchVisibleSvgMap();
    renderStatsPanel();
  });
}


if (btnDeselectAllStates) {
  btnDeselectAllStates.addEventListener("click", () => {
    if (activeStateKeys.length === 0) return;

    activeStateKeys.length = 0;
    Object.keys(stateData).forEach(stateKey => {
      const stateRow = document.getElementById(`state-${stateKey}`);
      if (stateRow) {
        stateRow.classList.remove("selected");
        stateRow.setAttribute("aria-pressed", "false");
      }
    });

    renderCountyCheckboxes();
    if (countyPanel) {
      countyPanel.classList.toggle("hidden", activeStateKeys.length === 0);
    }
    updateSetupPlayButton();
    switchVisibleSvgMap();
    renderStatsPanel();
  });
}


if (btnSelectSuggested) {
  btnSelectSuggested.addEventListener("click", () => {
    document.querySelectorAll(".county-checkbox").forEach(cb => {
      cb.checked = false;
    });

    const topMistakeIds = getLowestMistakeCountyIds(getSuggestionLimit());
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

  let blockedReason = "";
  if (activeStateKeys.length === 0) {
    blockedReason = "Select at least one state to play.";
  } else {
    const specificRadio = document.querySelector('input[name="specific-counties"]:checked');
    const isSpecificYes = specificRadio ? specificRadio.value === "yes" : false;
    const reviewChosen = !!document.querySelector("#home-layout.review-chosen");
    if (isSpecificYes && !reviewChosen && document.querySelectorAll(".county-checkbox:checked").length < 1) {
     blockedReason = `Select at least one ${unitWord(false)} to play, or choose "No" to play them all.`;
    }
  }

  btnStartGame.classList.remove("hidden");
  btnStartGame.disabled = !!blockedReason;
  if (blockedReason) btnStartGame.title = blockedReason;
  else btnStartGame.removeAttribute("title");
}


if (btnStartGame) {
  btnStartGame.addEventListener("click", async () => {
  if (selectedMode === "tuc") tucLockEverything();
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


    try { await ensureStateMaps(activeStateKeys); }
    catch (err) { alert("Couldn't load the map data. Make sure the maps folder is next to index.html, then try again."); return; }

    showScreen("screen-game");
    switchVisibleSvgMap();
    initGame(selectedCounties);
  });
}


if (btnQuitGame) {
  btnQuitGame.addEventListener("click", () => {
    reviewMode = false;
    isGameActive = false;
    stopStopwatch();
    if (modalSummary) modalSummary.classList.add("hidden");
    if (admireBar) admireBar.classList.add("hidden");
    showScreen("screen-home");
  });
}


if (btnToggleCountyList) {
  btnToggleCountyList.addEventListener("click", () => {
    if (!countyListPanel) return;
    const nowHidden = countyListPanel.classList.toggle("hidden");
    btnToggleCountyList.textContent = nowHidden ? "Show List" : "Hide List";
    if (!nowHidden) renderCountyListPanel();
  });
}


if (btnNewGame) {
  btnNewGame.addEventListener("click", () => {
    initGame(selectedCounties);
  });
}


function giveUp() {
  if (!isGameActive) return;

  document.querySelectorAll(".county.typing-highlight").forEach(el => {
    el.classList.remove("typing-highlight");
  });

  targetPool.forEach(c => {
    missedCounties.add(c);
    scoreWrong++;
    currentRunHadMistake = true;
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
  stopStopwatch();

  if (typeInputBox) typeInputBox.classList.add("hidden");
  if (mcOptions) mcOptions.classList.add("hidden");
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
    if (confirm(`Give up? Every remaining ${unitWord(false)} will be revealed as missed.`)) {
      giveUp();
    }
  });
}


function forfeitCurrentTarget() {
  if (!isGameActive || !currentTarget || selectedMode === "type") return;

  const forfeited = currentTarget;

  scoreWrong++;
  currentRunHadMistake = true;
  missedCounties.add(forfeited);
  forfeitedCount++;
  countyMistakes[forfeited.id] = (countyMistakes[forfeited.id] || 0) + 1;
  localStorage.setItem("countyMistakes", JSON.stringify(countyMistakes));
  playSound("wrong");

  getCountyElements(forfeited.id).forEach(el => {
    el.classList.remove("typing-highlight");
    el.classList.add("given-up-missed");
    el.style.pointerEvents = "auto";
    if (selectedMode !== "pin") {
      setTimeout(() => {
        el.classList.remove("given-up-missed");
        if (TYPE_MODES.has(selectedMode) && selectedMode !== "type-hard") el.style.pointerEvents = "none";
      }, 1800);
    }
  });

  if (feedbackEl) {
    feedbackEl.textContent = `Forfeited. That was ${getPlainName(forfeited)}.`;
    feedbackEl.className = "feedback-message error";
  }

  targetPool = targetPool.filter(c => c.id !== forfeited.id);
  pickNextTarget();
}

if (btnForfeitTarget) {
  btnForfeitTarget.addEventListener("click", forfeitCurrentTarget);
}

let reviewMode = false;

const reviewPinned = new Map();   // county id -> { tip, glow, svg, ax, ay, dx, dy, line }
let reviewRaf = 0;
let reviewArrowLayer = null;

// one see-through layer for all the arrows; each pin gets a line in it
function reviewArrows() {
  if (reviewArrowLayer) return reviewArrowLayer;
  const NS = "http://www.w3.org/2000/svg";
  const s = document.createElementNS(NS, "svg");
  s.setAttribute("class", "review-arrows");
  s.innerHTML = '<defs><marker id="rv-head" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10z" fill="#5b9bd5"/></marker></defs>';
  document.body.appendChild(s);
  reviewArrowLayer = s;
  return s;
}

function removeReviewPin(id) {
  const p = reviewPinned.get(id);
  if (!p) return;
  p.tip.remove(); p.glow.forEach(g => g.remove()); if (p.line) p.line.remove();
  reviewPinned.delete(id);
}

function clearReviewPins() {
  [...reviewPinned.keys()].forEach(removeReviewPin);
  if (reviewArrowLayer) { reviewArrowLayer.remove(); reviewArrowLayer = null; }
}

// keeps every label glued to its county: runs every frame while there are labels, so zooming, panning, scrolling and resizing all just work
function reviewLoop() {
  reviewRaf = 0;
  if (!reviewPinned.size) return;
  reviewReposition();
  reviewRaf = requestAnimationFrame(reviewLoop);
}

function reviewReposition() {
  const NS = "http://www.w3.org/2000/svg";
  const wantArrows = gameSettings.reviewArrowsOn === true;
  reviewPinned.forEach(p => {
    const svg = p.svg;
    const m = svg && svg.isConnected && svg.getClientRects().length && (!zoomedMap || zoomedMap === svg) ? svg.getScreenCTM() : null;
    if (!m) { p.tip.style.visibility = "hidden"; if (p.line) p.line.style.display = "none"; return; }
    const ax = m.a * p.ax + m.c * p.ay + m.e, ay = m.b * p.ax + m.d * p.ay + m.f;     // the spot on the county, in screen pixels
    p.tip.style.visibility = "";
    p.tip.style.left = (ax + p.dx) + "px";
    p.tip.style.top = (ay + p.dy) + "px";

    // arrow: only when the label has been dragged off its county
    const r = p.tip.getBoundingClientRect();
    const near = ax > r.left - 22 && ax < r.right + 22 && ay > r.top - 22 && ay < r.bottom + 22;
    if (!wantArrows || near) { if (p.line) p.line.style.display = "none"; return; }
    if (!p.line) {
      p.line = document.createElementNS(NS, "line");
      p.line.setAttribute("marker-end", "url(#rv-head)");
      reviewArrows().appendChild(p.line);
    }
    const cx = (r.left + r.right) / 2, cy = (r.top + r.bottom) / 2, vx = ax - cx, vy = ay - cy;
    const t = Math.min((r.width / 2 + 2) / (Math.abs(vx) || 1e-6), (r.height / 2 + 2) / (Math.abs(vy) || 1e-6));    // where the line leaves the label's edge
    p.line.style.display = "";
    p.line.setAttribute("x1", cx + vx * t); p.line.setAttribute("y1", cy + vy * t);
    p.line.setAttribute("x2", ax); p.line.setAttribute("y2", ay);
  });
}

function reviewTap(pathEl) {      // click or tap: pin the name; drag it wherever you like; click the county again to remove it
  const id = pathEl.dataset.countyId || pathEl.id;
  const county = findCountyById(id);
  if (!county) return;
  if (reviewPinned.has(id)) { removeReviewPin(id); return; }

  const svg = pathEl.closest("svg");
  if (!svg || !svg.getScreenCTM()) return;
  const tip = document.createElement("div");
  tip.className = "county-hover-tooltip pinned";
  tip.textContent = getPlainName(county);
  let x, y, dy = 0;
  if (hoverTooltip && !hoverTooltip.classList.contains("hidden")) {
    x = parseFloat(hoverTooltip.style.left); y = parseFloat(hoverTooltip.style.top);     // exactly where the live tooltip is
  } else {                                                                              // touch screens have no hover tooltip
    const r = pathEl.getBoundingClientRect(); x = r.left + r.width / 2; y = r.top + r.height / 2; dy = -34;
  }
  const pt = svg.createSVGPoint(); pt.x = x; pt.y = y;
  const a = pt.matrixTransform(svg.getScreenCTM().inverse());       // the spot on the county, in the map's own units, so it follows zooming
  document.body.appendChild(tip);

  const glow = getCountyElements(id).filter(p => p.parentNode).map(part => {
    const c = part.cloneNode(true);
    ["id", "tabindex", "role", "aria-label", "data-county-id", "data-name"].forEach(a => c.removeAttribute(a));
    c.setAttribute("class", "play-glow");
    c.style.pointerEvents = "none";
    part.parentNode.appendChild(c);
    return c;
  });
  const pin = { tip, glow, svg, ax: a.x, ay: a.y, dx: 0, dy, line: null };
  reviewPinned.set(id, pin);

  // drag the label anywhere
  tip.addEventListener("pointerdown", e => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    e.preventDefault(); e.stopPropagation();
    tip.setPointerCapture(e.pointerId);
    tip.classList.add("dragging");
    const sx = e.clientX, sy = e.clientY, dx0 = pin.dx, dy0 = pin.dy;
    const move = ev => { pin.dx = dx0 + ev.clientX - sx; pin.dy = dy0 + ev.clientY - sy; reviewReposition(); };
    const up = () => {
      tip.classList.remove("dragging");
      tip.removeEventListener("pointermove", move); tip.removeEventListener("pointerup", up); tip.removeEventListener("pointercancel", up);
    };
    tip.addEventListener("pointermove", move); tip.addEventListener("pointerup", up); tip.addEventListener("pointercancel", up);
  });
  tip.addEventListener("dblclick", () => removeReviewPin(id));     // double-click a label to remove it

  reviewReposition();
  if (!reviewRaf) reviewRaf = requestAnimationFrame(reviewLoop);
}

function enterReviewMode() {
  clearMostRecentCorrect();
  clearReviewPins();
  reviewMode = true;
  isGameActive = false;
  stopStopwatch();
  targetPool = [];
  currentTarget = null;
  totalTargetsCount = 0;
  document.body.dataset.playMode = "review";
  if (modalSummary) modalSummary.classList.add("hidden");
  if (admireBar) admireBar.classList.add("hidden");
  if (countyListPanel) countyListPanel.classList.add("hidden");
  hideHoverTooltip();
  document.querySelectorAll(".map-box.state-done").forEach(b => b.classList.remove("state-done"));
  countyPaths.forEach(path => {
    path.classList.remove("correct", "wrong", "flash-correct", "found", "correct-recovered", "flash-correct-recovered", "typing-highlight", "given-up-missed", "just-found");
    path.style.pointerEvents = "auto";
    path.setAttribute("tabindex", "0");
    path.setAttribute("role", "button");
    path.setAttribute("aria-label", "County path");
  });
  if (targetPrompt) targetPrompt.innerHTML = `<span class="find-label">Hover over a ${unitWord(false)} to see its name</span>`;
  if (progressCounter) progressCounter.textContent = "";
  if (feedbackEl) { feedbackEl.textContent = ""; feedbackEl.className = "feedback-message"; }
  if (mcOptions) mcOptions.classList.add("hidden");
  if (typeInputBox) typeInputBox.classList.add("hidden");
  if (gameStopwatch) gameStopwatch.classList.add("hidden");
  [btnGiveUp, btnForfeitTarget, btnToggleCountyList].forEach(b => b && b.classList.add("hidden"));
}

function startReview() {
  selectedMode = "pin";
  selectedCounties = [...getActiveCountiesPool()];
  showScreen("screen-game");
  switchVisibleSvgMap();
  enterReviewMode();
}

function initGame(countiesToPlay, isRetryMissedRun = false) {
  clearMostRecentCorrect();
  reviewMode = false;
  if (typeInput) { typeInput.disabled = false; typeInput.placeholder = "Type a county name…"; }
  if (tucDesig) { tucDesig.disabled = false; tucDesig.value = ""; tucDesig.classList.add("hidden"); }
  [btnGiveUp, btnGameSettings].forEach(b => b && b.classList.remove("hidden"));
  targetPool = [...countiesToPlay];
  currentGameRunId = globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  totalTargetsCount = targetPool.length;
  originalTargetList = [...targetPool];
  scoreRight = 0;
  scoreWrong = 0;
  currentRunHadMistake = false;
  lastRunWasNewBest = false;
  startStopwatch(isRetryMissedRun);
  isGameActive = true;
  missedCounties.clear();
  forfeitedCount = 0;
  currentAttemptMistakes = 0;

  currentRunIsRetryMissed = isRetryMissedRun;
  window.ultimateChallengeActive = selectedMode === "tuc"; tucSelected = null;
      ambiguousCountyNames = computeAmbiguousNames(getActiveCountiesPool());


  if (modalSummary) modalSummary.classList.add("hidden");
  if (admireBar) admireBar.classList.add("hidden");
  if (feedbackEl) {
    feedbackEl.textContent = "";
    feedbackEl.className = "feedback-message";
  }
  hideHoverTooltip();

  if (btnToggleCountyList) btnToggleCountyList.textContent = "Show List";
  countyListState = null;
  applyCountyListSetting();
  if (countyListPanel) countyListPanel.classList.add("hidden");
  if (btnForfeitTarget) btnForfeitTarget.classList.toggle("hidden", selectedMode === "type" || selectedMode === "tuc" || selectedMode === "type-hard");
  
  if (gameStopwatch) gameStopwatch.classList.toggle("hidden", selectedMode === "type" || !gameSettings.showStopwatch);
  document.querySelectorAll(".map-box.state-done").forEach(b => b.classList.remove("state-done"));
  document.body.dataset.playMode = selectedMode;

  countyPaths.forEach(path => {
    path.classList.remove("correct", "wrong", "flash-correct", "found", "correct-recovered", "flash-correct-recovered", "typing-highlight", "given-up-missed", "just-found");
    path.style.pointerEvents = (TYPE_MODES.has(selectedMode) && selectedMode !== "type-hard") ? "none" : "auto";
    path.setAttribute("tabindex", "0");
    path.setAttribute("role", "button");
    path.setAttribute("aria-label", "County path");
  });
  currentTarget = null;
  pickNextTarget();
}


function updateProgressCounter() {
  if (!progressCounter) return;
  const found = totalTargetsCount - targetPool.length - forfeitedCount;
  progressCounter.textContent = `${found}/${totalTargetsCount}`;
}

function startStopwatch(resume = false) {
  if (resume) {
    startTime = performance.now() - finalTime;
  } else {
    startTime = performance.now();
    finalTime = 0;
  }
  if (updateHandle) cancelAnimationFrame(updateHandle);
  function update() {
    const elapsed = performance.now() - startTime;
    finalTime = elapsed;
    if (gameStopwatch) {
      const minutes = Math.floor(elapsed / 60000);
      const seconds = Math.floor((elapsed % 60000) / 1000);
      const milliseconds = Math.floor(elapsed % 1000);
      gameStopwatch.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}.${milliseconds.toString().padStart(3, "0")}`;
    }
    updateHandle = requestAnimationFrame(update);
  }
  update();
}

function stopStopwatch() {
  if (updateHandle) {
    finalTime = performance.now() - startTime;
    if (gameStopwatch) {
      const minutes = Math.floor(finalTime / 60000);
      const seconds = Math.floor((finalTime % 60000) / 1000);
      const milliseconds = Math.floor(finalTime % 1000);
      gameStopwatch.textContent = `${minutes}:${seconds.toString().padStart(2, "0")}.${milliseconds.toString().padStart(3, "0")}`;
    }
    cancelAnimationFrame(updateHandle);
    updateHandle = null;
  }
}

function bestTimeKey() {
  return `${[...activeStateKeys].sort().join(",")}|${selectedMode}|${selectedCounties.length}`;
}
document.addEventListener("visibilitychange", () => {
  if (document.hidden && updateHandle) {
    pausedByTab = true;
    stopStopwatch();
  }

  if (!document.hidden) {
    if (pausedByTab && isGameActive) {
      startStopwatch(true);
    }
    pausedByTab = false;
  }
});

const RECORD_MODE_LABELS = {
  pin: "Pin",
  "pin-hard": "Flash",
  mc: "Multiple Choice",
  type: "List",
  "type-strict": "Type",
  "type-hard": "Identify",
  "tuc": "Ultimate Challenge"
};

const RECORD_MODE_CLASS = {
  pin: "pin",
  "pin-hard": "pin",
  mc: "mc",
  "type-hard": "type",
  "type-strict": "type",
  type: "list",
  "tuc": "tuc"
};

function parseRecordKey(key) {
  const [states, mode, count] = key.split("|");
  return {
  mode,
  stateNames: states.split(",").map(k => stateData[k]?.name || k).join(", "),
  modeLabel: RECORD_MODE_LABELS[mode] || mode,
  count: Number(count)
};
}
function sortRuns(runs) {
  const how = recordsTimesSort ? recordsTimesSort.value : "newest";
  const copy = [...runs];
  if (how === "fastest") return copy.sort((a, b) => a.time - b.time);
  if (how === "oldest") return copy;
  return copy.reverse();
}

function renderRecords() {
  if (!recordsList) return;

  const openKeys = new Set(
    [...recordsList.querySelectorAll("details[open]")].map(d => d.dataset.key)
  );
  recordsList.replaceChildren();

  const groups = new Map();
  for (const [key, runs] of Object.entries(perfectTimes)) {
    if (!runs || !runs.length) continue;
    const info = parseRecordKey(key);
    const stateKey = key.split("|")[0];
    if (!groups.has(stateKey)) {
      groups.set(stateKey, { stateKey, stateNames: info.stateNames, sections: [], last: 0, total: 0 });
    }
    const g = groups.get(stateKey);
    g.sections.push({ key, runs, ...info, best: Math.min(...runs.map(r => r.time)) });
    g.last = Math.max(g.last, runs[runs.length - 1].date);
    g.total += runs.length;
  }

  const groupList = [...groups.values()];
  const sortBy = recordsSort ? recordsSort.value : "recent";
  groupList.sort((a, b) => {
    if (sortBy === "state") return a.stateNames.localeCompare(b.stateNames);
    if (sortBy === "runs") return b.total - a.total || a.stateNames.localeCompare(b.stateNames);
    return b.last - a.last;
  });

  if (recordsEmpty) recordsEmpty.classList.toggle("hidden", groupList.length > 0);

  const modeOrder = Object.keys(RECORD_MODE_LABELS);

  const singles = groupList.filter(g => !g.stateKey.includes(","));
  const combos = groupList.filter(g => g.stateKey.includes(","));
  let lastKind = null;
  for (const g of [...singles, ...combos]) {
    const kind = g.stateKey.includes(",") ? "combo" : "single";
    if (kind !== lastKind) {
      const h = document.createElement("h2");
      h.className = "records-section-heading";
      h.textContent = kind === "single" ? "Single State Runs" : "Combinations";
      recordsList.append(h);
      lastKind = kind;
    }
    
    g.sections.sort((a, b) => modeOrder.indexOf(a.mode) - modeOrder.indexOf(b.mode) || b.count - a.count);

    const card = document.createElement("section");
    card.className = "record-state-card";

        const sameCount = new Set(g.sections.map(s => s.count)).size === 1;

    const title = document.createElement("h3");
    title.className = "record-state-title";
    title.textContent = g.stateNames;
    if (sameCount) {
      const n = g.sections[0].count;
      const countEl = document.createElement("span");
      countEl.className = "record-count";
      countEl.textContent = `${n} ${recordWord(g.stateKey, n)}`;
      title.append(countEl);
    }
    card.append(title);

    for (const s of g.sections) {
      const sec = document.createElement("details");
      sec.className = "record-section";
      sec.dataset.key = s.key;
      sec.open = openKeys.has(s.key);

      const summary = document.createElement("summary");

      const meta = document.createElement("div");
      meta.className = "record-meta";
      const mode = document.createElement("span");
      mode.className = "record-mode " + (RECORD_MODE_CLASS[s.mode] || "");
      mode.textContent = s.modeLabel;
      const size = document.createElement("span");
      size.className = "record-count";
      size.textContent = `${s.count} ${recordWord(g.stateKey, s.count)}`;
      meta.append(mode);
      if (!sameCount) meta.append(size);

      const bestEl = document.createElement("span");
      bestEl.className = "record-best";
      bestEl.textContent = formatTime(s.best);

      summary.append(meta, bestEl);

      const list = document.createElement("ul");
      list.className = "record-runs";
      for (const run of sortRuns(s.runs)) {
        const li = document.createElement("li");
        if (run.time === s.best) li.classList.add("is-best");
        const when = document.createElement("span");
        when.textContent = new Date(run.date).toLocaleString([], { dateStyle: "medium", timeStyle: "medium" });
        const time = document.createElement("span");
        time.textContent = formatTime(run.time);
        li.append(when, time);
        list.append(li);
      }

      sec.append(summary, list);
      card.append(sec);
    }

    recordsList.append(card);
  }
}

if (recordsSort) recordsSort.addEventListener("change", renderRecords);
if (recordsTimesSort) recordsTimesSort.addEventListener("change", renderRecords);

if (btnGotoRecords) {
  btnGotoRecords.addEventListener("click", () => {
    renderRecords();
    showScreen("screen-records");
  });
}

function countyListAllowed() {
  return gameSettings.showCountyList !== false && !window.ultimateChallengeActive;
}
function applyCountyListSetting() {
  const btn = document.getElementById("btn-toggle-county-list"), panel = document.getElementById("county-list-panel");
  const on = selectedMode === "type" && countyListAllowed();
  if (btn) btn.classList.toggle("hidden", !on);
  document.body.classList.toggle("list-mode-on", on);
  if (panel && !countyListAllowed()) panel.classList.add("hidden");
}

let countyListState = null;   // which state's list is showing when several states are active
let countyListCache = null;   // sorted lists, built once per game; plus which list is on screen and its cells

function renderCountyListPanel() {
  if (!countyListItems) return;
  if (countyListPanel && countyListPanel.classList.contains("hidden")) return;
  const tbody = countyListItems.querySelector("tbody") || countyListItems;
  const remainingIds = new Set(targetPool.map(c => c.id));
  const sel = document.getElementById("county-list-state-select");
  const title = document.getElementById("county-list-title");

  // build the grouped, sorted lists once per game
  if (!countyListCache || countyListCache.src !== originalTargetList) {
    const byState = {};
    originalTargetList.forEach(c => { (byState[c.stateKey] = byState[c.stateKey] || []).push(c); });
    Object.values(byState).forEach(l => l.sort((a, b) => a.name.localeCompare(b.name)));
    countyListCache = { src: originalTargetList, byState, flat: null, shownKey: null, cells: new Map() };
  }
  const cache = countyListCache;
  const keys = getOrderedStateKeys().filter(k => cache.byState[k]);     // same order as the maps on screen
  const multi = keys.length > 1;
  let list, nameOf;

  if (multi) {
    if (!keys.includes(countyListState)) countyListState = keys[0];
    if (sel) {
      sel.classList.remove("hidden");
      if (sel.dataset.keys !== keys.join()) {
        sel.innerHTML = keys.map(k => `<option value="${k}">${stateData[k]?.name || k}</option>`).join("");
        sel.dataset.keys = keys.join();
      }
      sel.value = countyListState;
    }
    list = cache.byState[countyListState];
    nameOf = c => c.name;
  } else {
    if (sel) sel.classList.add("hidden");
    if (!cache.flat) cache.flat = [...originalTargetList].sort((a, b) => getDisplayName(a).localeCompare(getDisplayName(b)));
    list = cache.flat;
    nameOf = getDisplayName;
  }

  // rebuild the table only when a different list is showing
  const shownKey = multi ? countyListState : "*";
  if (cache.shownKey !== shownKey) {
    tbody.innerHTML = list.map(c => `<tr><td data-id="${c.id}"></td></tr>`).join("");
    cache.cells = new Map();
    tbody.querySelectorAll("td").forEach(td => cache.cells.set(td.dataset.id, td));
    cache.shownKey = shownKey;
  }

  // otherwise touch only the cells whose found state changed
  let done = 0;
  list.forEach(c => {
    const found = !remainingIds.has(c.id);
    if (found) done++;
    const td = cache.cells.get(c.id);
    if (td && td._found !== found) {
      td._found = found;
      td.className = found ? "found" : "blank";
      td.textContent = found ? nameOf(c) : "";
    }
  });
  if (title) title.textContent = multi ? `${done}/${list.length} found` : "Counties";
}

function positionCountyListPanel() {
  if (!countyListPanel || countyListPanel.classList.contains("hidden")) return;
  const banner = visibleBanner();
  const top = Math.ceil((banner ? banner.getBoundingClientRect().bottom : 0) + 8);
  countyListPanel.style.top = top + "px";
  countyListPanel.style.maxHeight = Math.max(window.innerHeight - top - 64, 160) + "px";
}
window.addEventListener("resize", positionCountyListPanel);
window.addEventListener("scroll", positionCountyListPanel, { passive: true });

// Whenever the panel opens or closes (from any code), dock it and re-fit the zoomed map
if (countyListPanel) new MutationObserver(() => {
  document.body.classList.toggle("list-docked", !countyListPanel.classList.contains("hidden"));
  positionCountyListPanel();
  if (zoomedMap) layoutZoom();
   if (countyListPanel.classList.contains("hidden")) countyListViaZoom = false;
}).observe(countyListPanel, { attributes: true, attributeFilter: ["class"] });

function toggleCountyListFor(stateKey) {
  if (!countyListPanel || !countyListAllowed()) return;
  const svg = document.getElementById(stateData[stateKey]?.svgId);
  const showing = !countyListPanel.classList.contains("hidden");
  if (showing && countyListState === stateKey) {
    countyListPanel.classList.add("hidden");
    if (btnToggleCountyList) btnToggleCountyList.textContent = "Show List";
    if (zoomedMap && zoomedMap === svg) exitMapZoom();
    return;
  }
  countyListState = stateKey;
  countyListPanel.classList.remove("hidden");
  if (btnToggleCountyList) btnToggleCountyList.textContent = "Hide List";
  renderCountyListPanel();
  if (svg) { countyListViaZoom = true; enterMapZoom(svg); layoutZoom(); }
}

const countyListStateSelect = document.getElementById("county-list-state-select");
if (countyListStateSelect) countyListStateSelect.addEventListener("change", () => {
  countyListState = countyListStateSelect.value;
  renderCountyListPanel();
  const svg = document.getElementById(stateData[countyListState]?.svgId);
  if (zoomedMap && svg) { enterMapZoom(svg); layoutZoom(); }     // the zoom follows the dropdown
});

const countyListClose = document.getElementById("county-list-close");
if (countyListClose) countyListClose.addEventListener("click", () => {
  countyListPanel.classList.add("hidden");
  if (btnToggleCountyList) btnToggleCountyList.textContent = "Show List";
});

function statePromptHTML(stateName) {
  if (!stateName) return "";
  const key = activeStateKeys.length > 1 ? Object.keys(stateData).find(k => stateData[k].name === stateName) : null;
  return key
    ? `<span class="target-state target-state-link" role="button" tabindex="0" data-state-key="${key}" title="Show ${stateName} on the map">(${stateName})</span>`
    : `<span class="target-state">(${stateName})</span>`;
}

function jumpToStateMap(key) {
  const data = stateData[key];
  const svg = data && document.getElementById(data.svgId);
  if (!svg || !svg.getClientRects().length) return;
  const box = svg.closest(".map-box");
  const target = box && getComputedStyle(box).display !== "contents" ? box : svg;
  const calm = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let barBottom = 0;
  for (let e = targetPrompt; e && e !== document.body; e = e.parentElement) {
    const pos = getComputedStyle(e).position;
    if (pos === "sticky" || pos === "fixed") { barBottom = e.getBoundingClientRect().bottom; break; }
  }
  const gap = 12, rect = target.getBoundingClientRect(), room = window.innerHeight - barBottom - gap * 2;
  const y = window.scrollY + rect.top - barBottom - gap - (rect.height < room ? (room - rect.height) / 2 : 0);
  window.scrollTo({ top: Math.max(0, y), behavior: calm ? "auto" : "smooth" });
  target.classList.remove("map-jump-flash");
  void target.getBoundingClientRect();
  target.classList.add("map-jump-flash");
  setTimeout(() => target.classList.remove("map-jump-flash"), 1900);
}

if (targetPrompt) {
  targetPrompt.addEventListener("click", e => {
    const link = e.target.closest(".target-state-link");
    if (link) jumpToStateMap(link.dataset.stateKey);
  });
  targetPrompt.addEventListener("keydown", e => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const link = e.target.closest(".target-state-link");
    if (link) { e.preventDefault(); jumpToStateMap(link.dataset.stateKey); }
  });
}

function fitTargetName() {
  const nameEl = targetPrompt && targetPrompt.querySelector(".target-name");
  const box = targetPrompt && targetPrompt.closest(".prompt-box");
  if (!nameEl || !box) return;
  nameEl.style.fontSize = "";
  const cs = getComputedStyle(box);
  const pad = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
  const limit = box.clientWidth - pad;
  const need = nameEl.getBoundingClientRect().width;
  if (need > limit) {
    const base = parseFloat(getComputedStyle(nameEl).fontSize);
    nameEl.style.fontSize = Math.max(14, base * (limit / need) * 0.97) + "px";
  }
}
if (targetPrompt) {
  new MutationObserver(fitTargetName).observe(targetPrompt, { childList: true, subtree: true });
  window.addEventListener("resize", fitTargetName);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitTargetName);
}

function refreshTargetPrompt(forceReveal) {
  if (!targetPrompt || !currentTarget) return;

  if (selectedMode === "type") {
    targetPrompt.innerHTML = `<span class="find-label">Find any ${unitWord(false)}</span>`;
    return;
  }

  if (selectedMode === "type-hard" || selectedMode === "type-strict" || selectedMode === "mc") {
    if (forceReveal) {
      const { name, state } = getDisplayParts(currentTarget);
      const stateName = state || getStateNameForCounty(currentTarget);
      targetPrompt.innerHTML = `
        <span class="find-label">It's:</span>
        <span class="target-name">${name}</span>${speakerHTML(currentTarget)}
        ${statePromptHTML(stateName)}
      `;
    } else {
      const stateName = gameSettings.showStateInPrompt ? getStateNameForCounty(currentTarget) : "";
      targetPrompt.innerHTML = `
        <span class="find-label">${selectedMode === "mc" ? `Which ${unitWord(false)} is highlighted?` : `Type the highlighted ${unitWord(false)}`}</span>
        ${statePromptHTML(stateName)}
      `;
    }
    return;
  }

  const { name, state: ambiguousState } = getDisplayParts(currentTarget);
  const stateName = ambiguousState || (gameSettings.showStateInPrompt ? getStateNameForCounty(currentTarget) : "");
  targetPrompt.innerHTML = `
    <span class="find-label">Find:</span>
    <span class="target-name">${name}</span>${speakerHTML(currentTarget)}
    ${statePromptHTML(stateName)}
  `;
}

function mcShuffle(a) { a = a.slice(); for (let k = a.length - 1; k > 0; k--) { const j = Math.floor(Math.random() * (k + 1)); [a[k], a[j]] = [a[j], a[k]]; } return a; }
/* ---------- Confusion tracking (shared by every Play and Learn mode) ---------- */
const CONFUSE_KEY = "countyConfusions";
let confusions = {};
try { confusions = JSON.parse(localStorage.getItem(CONFUSE_KEY) || "{}") || {}; } catch (e) { confusions = {}; }
let confTotals = null;
const confPair = (a, b) => (a < b ? a + "|" + b : b + "|" + a);
function confTotal(id) {
  if (!confTotals) {
    confTotals = {};
    for (const k in confusions) { const [a, b] = k.split("|"); confTotals[a] = (confTotals[a] || 0) + confusions[k]; confTotals[b] = (confTotals[b] || 0) + confusions[k]; }
  }
  return confTotals[id] || 0;
}
function recordConfusion(targetId, pickedId) {
  if (!targetId || !pickedId || targetId === pickedId) return;
  const k = confPair(targetId, pickedId);
  confusions[k] = (confusions[k] || 0) + 1;
  confTotals = null;
  try { localStorage.setItem(CONFUSE_KEY, JSON.stringify(confusions)); } catch (e) {}
}
function recordConfusionByTypedName(targetId, typed, pool) {
  const n = normalizeTypedName(typed);
  if (!n) return;
  const hit = pool.find(c => c.id !== targetId && normalizeTypedName(c.name) === n);
  if (hit) recordConfusion(targetId, hit.id);
}

let nameFreq = null;
function countyNameFreq(name) {
  if (!nameFreq) {
    nameFreq = {};
    Object.values(stateData).forEach(s => (s.counties || []).forEach(c => { const k = c.name.toLowerCase(); nameFreq[k] = (nameFreq[k] || 0) + 1; }));
  }
  return nameFreq[name.toLowerCase()] || 1;
}
function nameLev(a, b) {
  if (a === b) return 0;
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
    prev = cur;
  }
  return prev[b.length];
}
function confusabilityScore(t, c) {
  const a = t.name.toLowerCase(), b = c.name.toLowerCase();
  let s = confusions[confPair(t.id, c.id)] ? 10 + 3 * confusions[confPair(t.id, c.id)] : 0;
  const sim = 1 - nameLev(a, b) / Math.max(a.length, b.length);
  if (sim >= 0.5) s += sim * 5;
  let p = 0; while (p < a.length && p < b.length && a[p] === b[p]) p++;
  if (p >= 3) s += 1.5; else if (p >= 2) s += 0.7;
  if (a.slice(-3) === b.slice(-3)) s += 0.5;
  if (c.stateKey === t.stateKey) s += 1.2;
  if (countyNameFreq(c.name) >= 3) s += 0.8;
  return s + Math.random() * 1.5;
}

let mcRecent = [], mcLastShown = new Set();
const mcRemember = id => { if (id) { mcRecent.push(id); if (mcRecent.length > 8) mcRecent.shift(); } };

// Multiple-Choice wrong answers. Mixes kinds so no single pattern gives the answer away.
function pickMcDistractors(target, pool, n, avoid) {
  const picks = [], seen = new Set([target.name]);
  const all = pool.filter(c => c.id !== target.id);
  const fresh = () => all.filter(c => !seen.has(c.name) && !(avoid && avoid.has(c.id)));
  const take = c => { if (c && picks.length < n && !seen.has(c.name)) { seen.add(c.name); picks.push(c); } };
  const weighted = (list, w) => {
    const ws = list.map(w), sum = ws.reduce((a, b) => a + b, 0);
    if (!list.length || !(sum > 0)) return null;
    let r = Math.random() * sum;
    for (let i = 0; i < list.length; i++) { r -= ws[i]; if (r <= 0) return list[i]; }
    return list[list.length - 1];
  };
  const sim = c => { const a = target.name.toLowerCase(), b = c.name.toLowerCase(); return 1 - nameLev(a, b) / Math.max(a.length, b.length); };
  // 1) sometimes: a county this player has really mixed up with the target before (more often = likelier)
  if (Math.random() < 0.4) take(weighted(fresh().filter(c => confusions[confPair(target.id, c.id)]), c => confusions[confPair(target.id, c.id)]));
  // 2) sometimes: a similar-sounding name (a weighted draw, not always the closest one)
  if (Math.random() < 0.4) take(weighted(fresh(), c => 0.15 + 3 * sim(c) * sim(c)));
  // 3) the rest: plain random counties, so nothing about the wrong answers is predictable
  while (picks.length < n) {
    const f = fresh();
    if (!f.length) break;
    take(f[Math.floor(Math.random() * f.length)]);
  }
  if (picks.length < n) all.filter(c => !seen.has(c.name)).forEach(take);
  return picks;
}

function renderMcOptions() {
  if (!mcOptions || !currentTarget) return;
  const target = currentTarget;
  const avoid = new Set([...mcRecent, ...mcLastShown]);
  avoid.delete(target.id);
  const allActive = getActiveCountiesPool();
  let picks = pickMcDistractors(target, allActive.filter(c => c.stateKey === target.stateKey), 3, avoid);
  if (picks.length < 3) {   // tiny states (DC, Delaware...) borrow the rest from the other selected states
    const used = new Set([target.name, ...picks.map(c => c.name)]);
    const rest = allActive.filter(c => c.stateKey !== target.stateKey && !used.has(c.name));
    picks = picks.concat(pickMcDistractors(target, rest, 3 - picks.length, avoid));
  }
  mcLastShown = new Set([target.id, ...picks.map(c => c.id)]);
  const choices = mcShuffle([target, ...picks]);
  const oneState = choices.every(c => c.stateKey === target.stateKey);
  mcOptions.replaceChildren(...choices.map((c, i) => {
    const b = document.createElement("button");
    b.type = "button"; b.className = "mc-option";
    const key = document.createElement("kbd"); key.textContent = String(i + 1);
    b.append(key, document.createTextNode(oneState ? getPlainName(c) : getDisplayName(c)));
    b.addEventListener("click", () => {
      if (!isGameActive || !currentTarget || b.disabled) return;
      if (c.id === currentTarget.id) { mcRemember(c.id); acceptTypedMatches([currentTarget]); }
      else { recordConfusion(currentTarget.id, c.id); mcRemember(c.id); registerWrongTypedGuess(); b.disabled = true; b.classList.add("wrong"); }
    });
    return b;
  }));
  mcOptions.classList.remove("hidden");
}
document.addEventListener("keydown", (e) => {
  if (selectedMode !== "mc" || !isGameActive || e.ctrlKey || e.metaKey || e.altKey) return;
  const gs = document.getElementById("screen-game");
  if (!gs || !gs.classList.contains("active")) return;
  const tag = (document.activeElement && document.activeElement.tagName) || "";
  if (tag === "INPUT" || tag === "TEXTAREA") return;
  const n = parseInt(e.key, 10);
  if (n >= 1 && n <= 4) { const b = mcOptions.querySelectorAll(".mc-option")[n - 1]; if (b && !b.disabled) b.click(); }
});

let scrollToTargetTimer = 0;
function scrollToTargetState() {
  if (!gameSettings.autoScrollToState || !isGameActive || !currentTarget || selectedMode === "type" || activeStateKeys.length < 2) return;
  const el = getCountyElements(currentTarget.id)[0];
  const box = el && el.closest(".map-box");
  if (!box) return;

  // the prompt box is sticky and covers the top of the page, so measure it instead of guessing
  const prompt = document.querySelector(".prompt-box");
  const clearance = prompt ? Math.ceil(prompt.getBoundingClientRect().height) + 24 : 112;

  const r = box.getBoundingClientRect(), vh = window.innerHeight;
  const visible = Math.min(r.bottom, vh) - Math.max(r.top, clearance);     // the part of the state not hidden behind the prompt
  if (visible >= Math.min(r.height, vh - clearance) * 0.6) return;         // that state is already mostly on screen
  box.style.scrollMarginTop = clearance + "px";
  box.scrollIntoView({ behavior: "smooth", block: "start" });
}

let autoZoomedByGame = false;
function autoZoomToTarget() {
  if (!gameSettings.autoZoom || !isGameActive || !currentTarget) return;
  if (selectedMode !== "mc" && selectedMode !== "type-strict") return;
  const svg = document.getElementById(stateData[currentTarget.stateKey]?.svgId);
  if (!svg || zoomedMap === svg) return;                   // already zoomed on that state
  enterMapZoom(svg); layoutZoom();
  autoZoomedByGame = true;
}

function pickNextTarget() {
  currentAttemptMistakes = 0;
  updateProgressCounter();
  renderCountyListPanel();

  document.querySelectorAll(".county.typing-highlight").forEach(el => {
    el.classList.remove("typing-highlight");
  });

  if (targetPool.length === 0) {
    if (selectedMode === "tuc" && window.reportTucComplete) window.reportTucComplete();
    isGameActive = false;
    stopStopwatch();
    if (mcOptions) mcOptions.classList.add("hidden");
    if (!currentRunHadMistake && !currentRunIsRetryMissed && forfeitedCount === 0) {
  const key = bestTimeKey();
  perfectTimes[key] = perfectTimes[key] || [];
  const previousBest = perfectTimes[key].length
    ? Math.min(...perfectTimes[key].map(r => r.time))
    : null;
  lastRunWasNewBest = previousBest !== null && finalTime < previousBest;
  perfectTimes[key].push({ time: finalTime, date: Date.now() });
  localStorage.setItem("perfectTimes", JSON.stringify(perfectTimes));
  if (activeStateKeys.length === 1 && selectedMode !== "tuc" && selectedCounties.length === getActiveCountiesPool().length && window.reportStateRun) {
    window.reportStateRun(activeStateKeys[0], selectedMode, finalTime);     // a full, perfect, single-state run goes on the board
  }
}
    showSummaryModal();
    return;
  }

  if (selectedMode === "tuc" || selectedMode === "type-hard") { tucWaitForPick(); return; }
  const lastId = currentTarget && currentTarget.id;
  const cand = targetPool.length > 1 ? targetPool.filter(c => c.id !== lastId) : targetPool;
  const wts = cand.map(c => 1 + Math.min(confTotal(c.id), 5));
  let roll = Math.random() * wts.reduce((a, b) => a + b, 0), randomIndex = 0;
  for (; randomIndex < cand.length - 1; randomIndex++) { roll -= wts[randomIndex]; if (roll <= 0) break; }
  currentTarget = cand[randomIndex];
  if (selectedMode === "mc") mcRemember(currentTarget.id);


  refreshTargetPrompt(false);
  clearTimeout(scrollToTargetTimer);
  scrollToTargetTimer = setTimeout(scrollToTargetState, 350);
  autoZoomToTarget();

  if (SINGLE_TARGET_TYPE_MODES.has(selectedMode)) {
    getCountyElements(currentTarget.id).forEach(el => { el.classList.add("typing-highlight"); if (el.parentNode) el.parentNode.appendChild(el); });
  }

  if (typeInputBox) {
    typeInputBox.classList.remove("tuc-waiting");
    typeInputBox.classList.toggle("hidden", !TYPE_MODES.has(selectedMode) || selectedMode === "mc");
  }
  if (mcOptions) { if (selectedMode === "mc") renderMcOptions(); else mcOptions.classList.add("hidden"); }
  refreshSpecialCharsBar();
  if (TYPE_MODES.has(selectedMode) && selectedMode !== "mc" && typeInput) {
    typeInput.value = "";
    typeInput.focus();
  }
}

function markStateIfDone(stateKey) {
  if (activeStateKeys.length < 2 || !stateKey) return;
  if (targetPool.some(c => c.stateKey === stateKey)) return;     // that state still has counties left
  const box = document.querySelector(`.map-box[data-state="${stateKey}"]`);
  if (box) box.classList.add("state-done");
}

function handleCountyClick(pathEl) {
  if (reviewMode) { reviewTap(pathEl); return; }
  if (isGameActive && (selectedMode === "tuc" || selectedMode === "type-hard")) {
    if (tucSelected) {   // finish naming this one first
      if (feedbackEl) { feedbackEl.textContent = "Name this one first."; feedbackEl.className = "feedback-message"; }
      if (typeInput) typeInput.focus({ preventScroll: true });
      return;
    }
    tucPick(pathEl);
    return;
  }
  if (!isGameActive || !currentTarget) return;
  if (TYPE_MODES.has(selectedMode)) return;
  if (pathEl.classList.contains("given-up-missed") || pathEl.classList.contains("found")) return;


  const clickedId = pathEl.dataset.countyId || pathEl.id;
  const clickedCounty = findCountyById(clickedId);
  const clickedName = clickedCounty
    ? (currentTarget && clickedCounty.name === currentTarget.name ? getDisplayName(clickedCounty) : getPlainName(clickedCounty))
    : (pathEl.getAttribute("data-name") || pathEl.id);


  if (clickedId === currentTarget.id) {
    scoreRight++;
    playSound("correct");
    clearHoverGlow();
    const recoveredFromMistake = currentAttemptMistakes > 0;
    if (!recoveredFromMistake) markCountyLearned(currentTarget.id, selectedMode, currentRunIsRetryMissed);


    if (feedbackEl) {
      feedbackEl.textContent = `Correct! That's ${getPlainName(currentTarget)}.`;
      feedbackEl.className = "feedback-message success";
    }


    const countyElements = getCountyElements(currentTarget.id);
    if (selectedMode === "pin-hard") {
      const version = clearMostRecentCorrect();
      const answeredCounty = currentTarget;
      countyElements.forEach(el => {
        el.classList.remove("typing-highlight", "correct-recovered");
        el.getAnimations().forEach(a => a.cancel());
        const dark = document.body.classList.contains("dark-mode");
        const rest = dark ? "#3a3a34" : "#e8e4d9";
        const peak = dark ? "#5fcf5f" : "#2d5a27";
        const animation = el.animate([{ fill: rest, offset: 0 }, { fill: peak, offset: 0.12 }, { fill: rest, offset: 1 }], { duration: 400, easing: "linear" });
        animation.onfinish = () => {
          el.classList.add("correct", "found");
          el.style.pointerEvents = "none";
          markMostRecentCorrect([answeredCounty], version);
        };
      });
    } else {
      countyElements.forEach(el => {
        el.classList.remove("typing-highlight", "correct-recovered");
        el.classList.add("correct", "found");
        el.style.pointerEvents = "none";
      });
      markMostRecentCorrect([currentTarget]);
    }

    targetPool = targetPool.filter(c => c.id !== currentTarget.id);
    markStateIfDone(currentTarget.stateKey);
    pickNextTarget();
  } else {
    scoreWrong++;
    currentRunHadMistake = true;
    currentAttemptMistakes++;
    playSound("wrong");
    recordConfusion(currentTarget.id, clickedId);


    if (feedbackEl) {
      feedbackEl.textContent = `Oops! That's ${clickedName}.`;
      feedbackEl.className = "feedback-message error";
    }


    missedCounties.add(currentTarget);


    countyMistakes[currentTarget.id] = (countyMistakes[currentTarget.id] || 0) + 1;
    localStorage.setItem("countyMistakes", JSON.stringify(countyMistakes));

    if (
      gameSettings.revealAnswerAfterMistakes &&
      (selectedMode === "pin" || selectedMode === "pin-hard") &&
      currentAttemptMistakes >= REVEAL_ANSWER_AFTER_MISTAKES
    ) {
    getCountyElements(currentTarget.id).forEach(el => { el.classList.add("typing-highlight"); if (el.parentNode) el.parentNode.appendChild(el); });
    }


    pathEl.classList.add("wrong");
    setTimeout(() => pathEl.classList.remove("wrong"), 600);
  }
}


function acceptTypedMatches(matchedCounties) {
  scoreRight++;
  playSound("correct");
  const recoveredFromMistake = currentAttemptMistakes > 0;

  if (feedbackEl) {
    if (SINGLE_TARGET_TYPE_MODES.has(selectedMode)) {
      feedbackEl.textContent = `Correct! That's ${getPlainName(matchedCounties[0])}.`;
    } else {
      feedbackEl.textContent = matchedCounties.length > 1
        ? `Correct! That matched ${matchedCounties.length} ${unitWord(true)}.`
        : "Correct!";
    }
    feedbackEl.className = "feedback-message success";
  }

  matchedCounties.forEach(matchedCounty => {
    if (!recoveredFromMistake) markCountyLearned(matchedCounty.id, selectedMode, currentRunIsRetryMissed);
    getCountyElements(matchedCounty.id).forEach(el => {
      el.classList.remove("typing-highlight", "correct-recovered");
      el.classList.add("correct", "found");
      el.style.pointerEvents = "none";
    });
  });
  markMostRecentCorrect(matchedCounties);

  const matchedIds = new Set(matchedCounties.map(c => c.id));
  targetPool = targetPool.filter(c => !matchedIds.has(c.id));
  matchedCounties.forEach(c => markStateIfDone(c.stateKey));
  pickNextTarget();
}

function registerWrongTypedGuess() {
  currentRunHadMistake = true;
  if (selectedMode === "type-strict" || selectedMode === "mc") scoreWrong++;
  currentAttemptMistakes++;
  playSound("wrong");

  if (feedbackEl) {
    feedbackEl.textContent = "Not quite. Try again.";
    feedbackEl.className = "feedback-message error";
  }

  if (currentTarget) {
    if (selectedMode === "type-strict" || selectedMode === "mc") missedCounties.add(currentTarget);
    countyMistakes[currentTarget.id] = (countyMistakes[currentTarget.id] || 0) + 1;
    localStorage.setItem("countyMistakes", JSON.stringify(countyMistakes));
  }

  if (
    gameSettings.revealAnswerAfterMistakes &&
    SINGLE_TARGET_TYPE_MODES.has(selectedMode) &&
    selectedMode !== "mc" &&
    currentAttemptMistakes >= REVEAL_ANSWER_AFTER_MISTAKES
  ) {
    refreshTargetPrompt(true);
  }

  if (typeInputBox) {
    typeInputBox.classList.remove("shake");
    void typeInputBox.offsetWidth;
    typeInputBox.classList.add("shake");
  }

  if (typeInput && selectedMode !== "mc") {
    typeInput.value = "";
    typeInput.focus();
  }
}

if (typeInputBox) typeInputBox.addEventListener("animationend", () => typeInputBox.classList.remove("shake"));

function tryAutoMatchTypedInput() {
  if (selectedMode === "tuc") return;
  if (!isGameActive || !typeInput) return;
  const normalized = normalizeTypedName(typeInput.value);
  if (!normalized) return;
  const matches = getTypedGuessMatches(normalized);
  if (matches.length > 0) acceptTypedMatches(matches);
}

function submitTypedGuess() {
  if (selectedMode === "tuc") { tucSubmit(); return; }
  if (!isGameActive || !typeInput) return;
  const normalized = normalizeTypedName(typeInput.value);
  if (!normalized) return;
  const matches = getTypedGuessMatches(normalized);
  if (matches.length > 0) {
    acceptTypedMatches(matches);
  } else {
    if (currentTarget) recordConfusionByTypedName(currentTarget.id, typeInput.value, getActiveCountiesPool());
    registerWrongTypedGuess();
  }
}

/* ===== THE ULTIMATE CHALLENGE (mode "tuc") ===== */
let tucSelected = null;
const TUC_REQUIRE_COUNTY_WORD = false;   // true = even plain counties need the word "County" typed

const AK_CENSUS_AREAS = new Set(["Aleutians West", "Bethel", "Chugach", "Copper River", "Dillingham", "Hoonah-Angoon",
  "Kusilvak", "Nome", "Prince of Wales-Hyder", "Southeast Fairbanks", "Yukon-Koyukuk"]);
const AK_CITY_BOROUGHS = new Set(["Juneau", "Sitka", "Wrangell", "Yakutat"]);
const VA_TWIN_CITIES = new Set(["Richmond City", "Fairfax City", "Franklin City", "Roanoke City", "Bedford City"]);
const VA_TWIN_BASES = new Set(["Richmond", "Fairfax", "Franklin", "Roanoke", "Bedford"]);
const VA_CITY_BASES = new Set(["Alexandria", "Bristol", "Buena Vista", "Charlottesville", "Chesapeake", "Colonial Heights",
  "Covington", "Danville", "Emporia", "Falls Church", "Fredericksburg", "Galax", "Hampton", "Harrisonburg", "Hopewell",
  "Lexington", "Lynchburg", "Manassas", "Manassas Park", "Martinsville", "Newport News", "Norfolk", "Norton", "Petersburg",
  "Poquoson", "Portsmouth", "Radford", "Salem", "Staunton", "Suffolk", "Virginia Beach", "Waynesboro", "Williamsburg", "Winchester"]);

function tucFullName(c) {
  const n = c.name, s = c.stateKey;
  if (s === "louisiana") return n + " Parish";
  if (s === "connecticut") return n + " Planning Region";
  if (s === "alaska") {
    if (AK_CENSUS_AREAS.has(n)) return n + " Census Area";
    if (AK_CITY_BOROUGHS.has(n)) return n + " City and Borough";
    if (n === "Anchorage" || n === "Skagway") return n + " Municipality";
    return n + " Borough";
  }
  if (s === "virginia") {
    if (VA_TWIN_CITIES.has(n)) return n.replace(/ City$/, " city");
    if (VA_CITY_BASES.has(n)) return n + " city";
    return n + " County";
  }
  if (s === "maryland") return n === "Baltimore City" ? "Baltimore city" : n + " County";
  if (s === "missouri") return /\sCity$/.test(n) ? n.replace(/ City$/, " city") : n + " County";
  if (s === "nevada") return n === "Carson City" ? n : n + " County";
  if (s === "puerto_rico") return n + " Municipio";
  if (s === "american_samoa") return /island|atoll/i.test(n) ? n : n.replace(/\s+District$/i, "") + " District";
  if (s === "united_states_virgin_islands") return /\sIsland$/i.test(n) ? n : n + " Island";
  if (s === "northern_mariana_islands") return /\sMunicipality$/i.test(n) ? n : n + " Municipality";
  if (["district_of_columbia", "guam"].includes(s)) return n;
  return n + " County";
}

// the dropdown choice that goes with each place: one of the 13 options in the select
function tucDesignation(c) {
  const n = c.name, s = c.stateKey, id = c.id || "";
  if (s === "louisiana") return "Parish";
  if (s === "connecticut") return "Planning Region";
  if (s === "alaska") {
    if (AK_CENSUS_AREAS.has(n)) return "Census Area";
    if (n === "Anchorage" || n === "Skagway") return "Municipality";
    return "Borough";                                       // Juneau, Sitka, Wrangell, Yakutat count as Borough
  }
  if (s === "virginia") return (VA_TWIN_CITIES.has(n) || VA_CITY_BASES.has(n)) ? "Independent City" : "County";
  if (s === "maryland") return n === "Baltimore City" ? "Independent City" : "County";
  if (s === "missouri") return /\sCity$/.test(n) ? "Independent City" : "County";
  if (s === "nevada") return n === "Carson City" ? "Independent City" : "County";
  if (s === "puerto_rico" || s === "northern_mariana_islands") return "Municipality";
  if (s === "united_states_virgin_islands") return "Island";
  if (s === "american_samoa") return /swains/i.test(id) ? "Island" : /rose/i.test(id) ? "Atoll" : "District";
  if (s === "guam") return "Guam";
  if (s === "district_of_columbia") return "District of Columbia";
  return "County";
}

// the name you type, without the designation ("Fairfax City" -> "Fairfax", "Eastern District" -> "Eastern")
function tucBase(c) {
  const d = tucDesignation(c);
  if (d === "Independent City") return c.stateKey === "nevada" ? c.name : c.name.replace(/\s+city$/i, "");   // Carson City really is named "Carson City"
  if (["Island", "Atoll", "District", "Municipality"].includes(d)) return c.name.replace(/\s+(District|Island|Atoll|Municipality|Municipio)$/i, "");
  return c.name;
}

function tucNorm(s) {      // keeps accents and the okina on purpose. "St." and "Saint" are NOT interchangeable: type it exactly
  return String(s).normalize("NFC").toLowerCase().replace(/[\u2018\u2019'`´]/g, "'").replace(/\./g, " ")
    .replace(/\s+/g, " ").trim();
}

function tucAccepts(c, typedRaw, chosen) {
  if (chosen !== tucDesignation(c)) return false;                       // the designation always has to be right
  const t = tucNorm(typedRaw);
  if (tucDesignation(c) === "Independent City") return t === tucNorm(tucBase(c));   // "Fairfax", never "Fairfax City"
  return t === tucNorm(tucBase(c)) || t === tucNorm(c.name) || t === tucNorm(tucFullName(c));
}

function tucWaitForPick() {
  tucSelected = null;
  currentTarget = null;
  document.querySelectorAll(".county.typing-highlight").forEach(el => el.classList.remove("typing-highlight"));
  if (typeInput) { typeInput.value = ""; typeInput.disabled = true; typeInput.placeholder = "Click a county first"; }
  if (tucDesig) { tucDesig.value = ""; tucDesig.disabled = true; tucDesig.classList.toggle("hidden", selectedMode !== "tuc"); }
  refreshSpecialCharsBar();
  if (typeInputBox) typeInputBox.classList.remove("hidden");     // keep the box in place (dimmed) so the card never changes height
  if (typeInputBox) typeInputBox.classList.add("tuc-waiting");
  if (targetPrompt) targetPrompt.innerHTML = `<span class="find-label">Click a ${unitWord(false)}, then name it</span>`;
}

function tucPick(pathEl) {
  if (!isGameActive) return;
  currentAttemptMistakes = 0;
  const county = findCountyById(pathEl.dataset.countyId || pathEl.id);
  if (!county) return;
  if (!targetPool.some(c => c.id === county.id)) {      // already named: the map won't show it, so just say so (no penalty)
    if (feedbackEl) { feedbackEl.textContent = "You already named that one."; feedbackEl.className = "feedback-message"; }
    return;
  }
  document.querySelectorAll(".county.typing-highlight").forEach(el => el.classList.remove("typing-highlight"));
  tucSelected = county;
  currentTarget = county;
  getCountyElements(county.id).forEach(el => { el.classList.add("typing-highlight"); if (el.parentNode) el.parentNode.appendChild(el); });
  if (targetPrompt) targetPrompt.innerHTML = `<span class="find-label">${selectedMode === "tuc" ? "Type its name." : "Type its name."}</span>`;
  if (feedbackEl) { feedbackEl.textContent = ""; feedbackEl.className = "feedback-message"; }
  if (typeInputBox) typeInputBox.classList.remove("hidden", "tuc-waiting");
  refreshSpecialCharsBar();
  if (typeInput) {
  if (tucDesig) { tucDesig.disabled = false; tucDesig.value = ""; tucDesig.classList.toggle("hidden", selectedMode !== "tuc"); }
    typeInput.disabled = false;
    typeInput.placeholder = "Type its name";
    typeInput.value = "";
    typeInput.focus({ preventScroll: true });
    setTimeout(() => typeInput.focus({ preventScroll: true }), 0);
  }
}

function tucSubmit() {
  if (!isGameActive || !tucSelected || !typeInput || !tucNorm(typeInput.value)) return;
  const c = tucSelected;
  if (tucDesig && !tucDesig.value) {                       // you have to pick one; this isn't a miss, it just won't submit
    if (feedbackEl) { feedbackEl.textContent = "Pick what it is first."; feedbackEl.className = "feedback-message"; }
    tucDesig.open();
    return;
  }
  if (!tucAccepts(c, typeInput.value, tucDesig ? tucDesig.value : "")) { tucFail(c, typeInput.value); return; }
  if (tucDesig) tucDesig.value = "";
  scoreRight++;
  playSound("correct");
  getCountyElements(c.id).forEach(el => {
    el.classList.remove("typing-highlight", "correct-recovered");
    el.classList.add("correct", "found");
    el.style.pointerEvents = "none";
  });
  markMostRecentCorrect([c]);
  if (feedbackEl) { feedbackEl.textContent = `Correct! ${tucFullName(c)}.`; feedbackEl.className = "feedback-message success"; }
  targetPool = targetPool.filter(x => x.id !== c.id);
  typeInput.value = "";
  markStateIfDone(c.stateKey);   
  pickNextTarget();                                      // no state-done outline either: that would be a progress hint
}

function tucFail(c, typedRaw) {
  recordConfusionByTypedName(c.id, typedRaw, getActiveCountiesPool());
  const named = totalTargetsCount - targetPool.length;
  isGameActive = false;
  stopStopwatch();
  scoreWrong++;
  missedCounties.add(c);
  countyMistakes[c.id] = (countyMistakes[c.id] || 0) + 1;
  localStorage.setItem("countyMistakes", JSON.stringify(countyMistakes));
  playSound("wrong");
  document.querySelectorAll(".county.typing-highlight").forEach(el => el.classList.remove("typing-highlight"));
  targetPool.forEach(x => getCountyElements(x.id).forEach(el => { el.classList.add("given-up-missed"); el.style.pointerEvents = "auto"; }));
  if (typeInputBox) typeInputBox.classList.add("hidden");
  if (targetPrompt) targetPrompt.textContent = "Challenge failed.";
  showSummaryModal();
  if (summaryGradeTitle) summaryGradeTitle.textContent = "Challenge failed.";
  if (summaryMessage) summaryMessage.textContent = `That was ${tucFullName(c)}. You named ${named} of ${totalTargetsCount}.`;
  if (modalActions) modalActions.querySelectorAll("button").forEach(b => { if (b.textContent === "Retry Missed") b.remove(); });
}

function tucLockEverything() {
  if (btnSelectAllStates) btnSelectAllStates.click();     // every state and territory, every time
  const no = document.querySelector('input[name="specific-counties"][value="no"]');
  if (no) no.checked = true;                               // no excluded counties
}

if (typeInput) {
  typeInput.addEventListener("input", () => {
    if (selectedMode !== "type-strict" && selectedMode !== "type-hard" && selectedMode !== "tuc" && gameSettings.instantTypeCheck) tryAutoMatchTypedInput();
  });
  typeInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submitTypedGuess();
    }
  });
}


const specialCharsBar = document.getElementById("special-chars");
const specialCharsButtons = document.getElementById("special-chars-buttons");
const OKINA = "\u02BB";

const COMBINING_MARK_NAMES = {
  "\u0300": "grave accent",
  "\u0301": "acute accent",
  "\u0302": "circumflex",
  "\u0303": "tilde",
  "\u0304": "macron",
  "\u0308": "diaeresis",
  "\u030A": "ring",
  "\u030C": "caron",
  "\u0327": "cedilla",
  "\u0328": "ogonek"
};

function describeSpecialChar(ch) {
  if (ch === OKINA) return "ʻokina (Hawaiian glottal stop)";
  const [base, mark] = Array.from(ch.normalize("NFD"));
  const markName = COMBINING_MARK_NAMES[mark];
  return markName ? `${base} with ${markName}` : ch;
}

function getNeededSpecialChars() {
  const found = new Set();
  (originalTargetList || []).forEach(county => {
    for (const ch of county.name.normalize("NFC").toLowerCase()) {
      if (/[^\x00-\x7F]/.test(ch)) found.add(ch);
    }
  });
  return [...found].sort((a, b) =>
    (b === OKINA) - (a === OKINA) || a.localeCompare(b)
  );
}

function refreshSpecialCharsBar() {
  if (!specialCharsBar || !specialCharsButtons) return;

  const chars = (selectedMode === "tuc" || (TYPE_MODES.has(selectedMode) && selectedMode !== "mc" && gameSettings.requireDiacritics))    ? getNeededSpecialChars()
    : [];
  specialCharsBar.classList.toggle("hidden", chars.length === 0);

  const signature = chars.join("");
  if (specialCharsButtons.dataset.chars === signature) return;
  specialCharsButtons.dataset.chars = signature;

  specialCharsButtons.replaceChildren(...chars.map((ch, i) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "special-char-btn";
    btn.textContent = ch;
    btn.dataset.char = ch;
    btn.title = describeSpecialChar(ch);
    btn.setAttribute("aria-label", `Insert ${describeSpecialChar(ch)}`);
    btn.tabIndex = i === 0 ? 0 : -1;
    return btn;
  }));
}

function insertSpecialChar(ch) {
  if (!typeInput || !isGameActive) return;
  if (selectedMode === "tuc" && !tucSelected) return;      // nothing to type into until a county is picked
  const start = typeInput.selectionStart ?? typeInput.value.length;
  const end = typeInput.selectionEnd ?? start;
  typeInput.setRangeText(ch, start, end, "end");
  typeInput.focus();
  typeInput.dispatchEvent(new Event("input", { bubbles: true }));
}

if (specialCharsButtons) {
  ["mousedown", "pointerdown"].forEach(type => {
    specialCharsButtons.addEventListener(type, (e) => {
      if (e.target.closest(".special-char-btn")) e.preventDefault();
    });
  });

  specialCharsButtons.addEventListener("click", (e) => {
    const btn = e.target.closest(".special-char-btn");
    if (btn) insertSpecialChar(btn.dataset.char);
  });
}

if (specialCharsBar) {
  specialCharsBar.addEventListener("keydown", (e) => {
    const buttons = Array.from(specialCharsButtons.querySelectorAll(".special-char-btn"));
    const current = buttons.indexOf(document.activeElement);
    if (current === -1) return;

    let next = null;
    if (e.key === "ArrowRight") next = (current + 1) % buttons.length;
    else if (e.key === "ArrowLeft") next = (current - 1 + buttons.length) % buttons.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = buttons.length - 1;
    else if (e.key === "Escape") {
      e.preventDefault();
      if (typeInput) typeInput.focus();
      return;
    }
    if (next === null) return;

    e.preventDefault();
    buttons.forEach((b, i) => { b.tabIndex = i === next ? 0 : -1; });
    buttons[next].focus();
  });
}

// Learn-style blue hover for the Play maps: a copy of the hovered county (and its callout copies) drawn on top
let glowClones = [];
function clearHoverGlow() { glowClones.forEach(c => c.remove()); glowClones = []; }
function showHoverGlow(el) {
  clearHoverGlow();
  const id = el.dataset.countyId || el.id;
  getCountyElements(id).forEach(part => {
    if (!part.parentNode) return;
    const c = part.cloneNode(true);
    ["id", "tabindex", "role", "aria-label", "data-county-id", "data-name"].forEach(a => c.removeAttribute(a));
    c.querySelectorAll("[id]").forEach(n => n.removeAttribute("id"));
    c.setAttribute("class", "play-glow");
    c.style.pointerEvents = "none";
    part.parentNode.appendChild(c);
    glowClones.push(c);
  });
}
function hoverGlowAllowed(el) {
  if (!isGameActive) return true;                        // results screen: every county glows
  if (selectedMode !== "pin" && selectedMode !== "pin-hard") return false;
  return !["found", "correct", "correct-recovered", "typing-highlight"].some(k => el.classList.contains(k));
}

function recordWord(stateKeyList, n) {
  const eq = String(stateKeyList).split(",").some(usesCountyEquivalents);
  return eq ? (n === 1 ? "county equivalent" : "county equivalents") : (n === 1 ? "county" : "counties");
}

function showHoverTooltip(text, x, y) {
  if (!hoverTooltip || (gameSettings.showHoverNames === false && !reviewMode)) return;  hoverTooltip.textContent = text;
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
  clearHoverGlow();
}


function bindCountyInteractivity(path) {
  // Identify / Ultimate Challenge: lift the hovered county above its neighbours so its outline isn't covered
  path.addEventListener("mouseenter", () => {
    if (!isGameActive || (selectedMode !== "type-hard" && selectedMode !== "tuc")) return;
    const p = path.parentNode;
    if (p && p.lastElementChild !== path && !path.classList.contains("found")) p.appendChild(path);
  });
  path.addEventListener("pointerdown", (e) => {
    if (!gameSettings.speedrunMode) return;
    if (isZoomGestureStart(e)) return;
    if (e.pointerType === "touch") return;
    handleCountyClick(e.currentTarget);
  });

  // after the game ends, clicking a county plays its voiceline
  path.addEventListener("click", (e) => {
    if (isGameActive || isZoomGestureStart(e) || Date.now() < suppressClickUntil) return;
    playCountyAudioFor(findCountyById(path.dataset.countyId || path.id));
  });

  path.addEventListener("pointerup", (e) => {
    if (!gameSettings.speedrunMode || e.pointerType !== "touch") return;
    if (touchGestureWasLongPress) return;
    handleCountyClick(e.currentTarget);
  });


  path.addEventListener("click", (e) => {
    if (gameSettings.speedrunMode) return;
    if (isZoomGestureStart(e)) return;
    if (Date.now() < suppressClickUntil) return;
    handleCountyClick(e.currentTarget);
  });


  path.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCountyClick(e.currentTarget);
    }
  });


  path.addEventListener("mouseenter", (e) => {
    const el = e.currentTarget;
    if (hoverGlowAllowed(el)) showHoverGlow(el);
    if (isGameActive && !el.classList.contains("given-up-missed") && !el.classList.contains("found")) return;
    const id = el.dataset.countyId || el.id;
    const county = findCountyById(id);
    const name = county ? getPlainName(county) : (el.getAttribute("data-name") || "");
    showHoverTooltip(name, e.clientX, e.clientY);
  });


  path.addEventListener("mousemove", (e) => {
    moveHoverTooltip(e.clientX, e.clientY);
  });


  path.addEventListener("mouseleave", hideHoverTooltip);
}


countyPaths.forEach(bindCountyInteractivity);

function formatTime(ms) {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  const milliseconds = Math.floor(ms % 1000);
  return `${minutes}:${seconds.toString().padStart(2, "0")}.${milliseconds.toString().padStart(3, "0")}`;
}

function showSummaryModal() {
  if (autoZoomedByGame && zoomedMap) exitMapZoom();
  autoZoomedByGame = false;
  if (!modalSummary) return;


    const totalAttempts = scoreRight + scoreWrong;
    const accuracy = selectedMode === "tuc"
    ? (totalTargetsCount > 0 ? Math.round((scoreRight / totalTargetsCount) * 100) : 0)   // TUC: out of every county, not just the ones you tried
    : (totalAttempts > 0 ? Math.round((scoreRight / totalAttempts) * 100) : 0);


  if (summaryPercentage) summaryPercentage.textContent = `${accuracy}%`;
  if (finalTimeElement) finalTimeElement.textContent = formatTime(finalTime), finalTimeElement.classList.toggle("hidden", selectedMode === "type" || !gameSettings.showStopwatch);

  const runs = perfectTimes[bestTimeKey()] || [];
const hideTimes = selectedMode === "type" || !gameSettings.showStopwatch || runs.length === 0;

if (bestTimeElement) {
  bestTimeElement.classList.toggle("hidden", hideTimes);
  if (!hideTimes) {
    const best = Math.min(...runs.map(r => r.time));
    bestTimeElement.textContent = lastRunWasNewBest ? "New best!" : `Best: ${formatTime(best)}`;
  }
}

if (recentTimesElement) {
  recentTimesElement.classList.toggle("hidden", hideTimes);
  if (!hideTimes) {
    recentTimesElement.textContent =
      "Recent: " + runs.slice(-5).reverse().map(r => formatTime(r.time)).join("  ·  ");
  }
}


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
    const activeStateNames = activeStateKeys.map(key => stateData[key]?.name || key);


    if (summaryMessage) {
      const verb = selectedMode === "type" ? "listed" : "learned";
      if (activeStateNames.length === 1) {
      summaryMessage.textContent = `You've ${verb} all the ${unitWord(true)} in ${activeStateNames[0]}! Good job!`;;
      } else {
        summaryMessage.textContent = `You've ${verb} all the ${unitWord(true)} across ${activeStateNames.length} states! Good job!`;
      }
    }


    countyPaths.forEach(path => {
      path.classList.add("correct");
      path.style.pointerEvents = "none";
    });


    if (targetPrompt) targetPrompt.textContent = "Complete!";

    if (targetPrompt) targetPrompt.textContent = "Complete!";

    renderStateListUI();
    renderStatsPanel();


    appendModalButton("See Results", "btn-secondary", enableAdmireBar);
    appendModalButton("Play Again", "btn-primary", () => {
      modalSummary.classList.add("hidden");
      initGame(selectedCounties);
    });
    appendModalButton("Settings", "btn-secondary", () => {
      modalSummary.classList.add("hidden");
      openSettings("screen-game", "modal");
    });
    appendModalButton("Home", "btn-secondary", () => {
      modalSummary.classList.add("hidden");
      showScreen("screen-home");
    });
  } else {
    if (summaryMessage) {
    summaryMessage.textContent = `You missed ${missedArray.length} ${unitWord(false)} target${missedArray.length > 1 ? 's' : ''}. What would you like to do?`;;
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


    appendModalButton("See Results", "btn-secondary", enableAdmireBar);
    appendModalButton("Retry Missed", "btn-primary", () => {
      modalSummary.classList.add("hidden");
      initGame(missedArray, true);
    });
    appendModalButton("Play Again", "btn-secondary", () => {
      modalSummary.classList.add("hidden");
      initGame(selectedCounties);
    });
    appendModalButton("Settings", "btn-secondary", () => {
      modalSummary.classList.add("hidden");
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


function enableAdmireBar() {
  modalSummary.classList.add("hidden");
  if (admirePercentage) admirePercentage.textContent = summaryPercentage.textContent;
  if (admireText) admireText.textContent = summaryMessage.textContent;


  if (btnAdmireRetry) {
    if (missedCounties.size > 0 && selectedMode !== "tuc") {
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
    initGame(Array.from(missedCounties), true);
  });
}


if (btnAdmireReplay) {
  btnAdmireReplay.addEventListener("click", () => {
    admireBar.classList.add("hidden");
    initGame(selectedCounties);
  });
}


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

/* ===== The Ultimate Challenge intro popup (shown when you pick the mode) ===== */
const modalTucIntro = document.getElementById("modal-tuc-intro");
const tucIntroText = document.getElementById("tuc-intro-text");
const btnTucIntroOk = document.getElementById("btn-tuc-intro-ok");
const btnTucIntroNever = document.getElementById("btn-tuc-intro-never");
const TUC_INTRO_KEY = "tucIntroHidden";

function tucIntroWanted() {
  try { return localStorage.getItem(TUC_INTRO_KEY) !== "1"; } catch (e) { return true; }
}

function startTucNow() {
  const play = document.getElementById("btn-start-game");
  if (play && !play.disabled) play.click();
}

function showTucIntro() {
  if (!modalTucIntro || !tucIntroWanted()) { startTucNow(); return; }
  if (tucIntroText) tucIntroText.textContent = INFO_MODE_CONFIG.tuc.intro;
  modalTucIntro.classList.remove("hidden");
  if (btnTucIntroOk) btnTucIntroOk.focus();
}

function closeTucIntro(dontShowAgain, go) {
  if (dontShowAgain) { try { localStorage.setItem(TUC_INTRO_KEY, "1"); } catch (e) {} }
  if (modalTucIntro) modalTucIntro.classList.add("hidden");
  if (go) startTucNow();
}

if (btnTucIntroOk) btnTucIntroOk.addEventListener("click", () => closeTucIntro(false, true));
if (btnTucIntroNever) btnTucIntroNever.addEventListener("click", () => closeTucIntro(true, true));
if (modalTucIntro) modalTucIntro.addEventListener("click", e => { if (e.target === modalTucIntro) closeTucIntro(false); });
document.addEventListener("keydown", e => {
  if (e.key === "Escape" && modalTucIntro && !modalTucIntro.classList.contains("hidden")) closeTucIntro(false);
});

(function initHome() {
  const $ = id => document.getElementById(id);
  const layout = $("home-layout");
  if (!layout) return;
  if (appContainer) appContainer.classList.add("wide-picker");
  const start = $("btn-start-game"), msg = $("home-msg"), skipWrap = $("home-skip-wrap"), skip = $("home-skip-learned");
  const learnWrap = $("home-learn-count-wrap"), learnRange = $("home-learn-count"), learnOut = $("home-learn-count-out");
  const syncLearnSlider = () => {
    const n = Math.min(8, Math.max(4, parseInt(gameSettings.learnCount, 10) || 5));
    learnRange.value = n; learnOut.textContent = n;
  };
  learnRange.addEventListener("input", () => {
    gameSettings.learnCount = parseInt(learnRange.value, 10);
    learnOut.textContent = learnRange.value;
    saveSettings();
    const sel = $("select-learn-count"); if (sel) sel.value = learnRange.value;
  });
  syncLearnSlider();
  const playBtns = [...layout.querySelectorAll("[data-home-mode]")];
  const learnBtns = [...layout.querySelectorAll("[data-home-learn]")];
  let chosen = null;

  function updateSkip() {
    learnWrap.classList.toggle("hidden", !(chosen && chosen.kind === "learn" && chosen.mode !== "review"));
    skipWrap.classList.toggle("hidden", !(chosen && chosen.kind === "learn" && chosen.mode !== "review" && activeStateKeys.length > 0));
    msg.textContent = "";
  }
  skip.addEventListener("change", () => { msg.textContent = ""; });
  const pickedBox = $("setup-picked");
  if (pickedBox) new MutationObserver(updateSkip).observe(pickedBox, { childList: true, subtree: true, characterData: true });

  function mark() {
    playBtns.forEach(b => { const on = !!chosen && chosen.kind === "play" && b.dataset.homeMode === chosen.mode; b.classList.toggle("selected", on); b.setAttribute("aria-pressed", on); });
    learnBtns.forEach(b => { const on = !!chosen && chosen.kind === "learn" && b.dataset.homeLearn === chosen.mode; b.classList.toggle("selected", on); b.setAttribute("aria-pressed", on); });
    const nowTuc = !!chosen && chosen.kind === "play" && chosen.mode === "tuc";
    layout.classList.toggle("tuc-chosen", nowTuc);
    if (nowTuc && !tucOn) {                    // entering the Ultimate Challenge: remember the states, then take them all
      tucSavedStates = activeStateKeys.slice();
      if (btnSelectAllStates) btnSelectAllStates.click();
      showTucIntro();
    } else if (!nowTuc && tucOn) {            // leaving it: put the states back the way they were
      if (btnDeselectAllStates) btnDeselectAllStates.click();
      (tucSavedStates || []).forEach(k => { const r = document.getElementById(`state-${k}`); if (r) r.click(); });
      tucSavedStates = null;
    }
    tucOn = nowTuc;
  }
  let tucOn = false, tucSavedStates = null;
  function choose(kind, mode) {
    if (chosen && chosen.kind === kind && chosen.mode === mode) {
      chosen = null;
      layout.classList.add("no-mode");
      layout.classList.remove("review-chosen");
      updateSetupPlayButton();
      start.textContent = "Play";
      updateSkip();
      msg.textContent = "";
      mark();
      return;
    }
    chosen = { kind, mode };
    if (mode !== "review") {
      statsView = kind === "play" ? "play" : "learn";
      if (kind === "learn") statsLearnMode = mode;
      renderStatsPanel();
    }
    if (kind === "play") selectedMode = mode;
    layout.classList.remove("no-mode");
    layout.classList.toggle("review-chosen", mode === "review");
    updateSetupPlayButton();
    start.textContent = kind === "play" ? "Play" : (mode === "review" ? "Review" : "Learn");
    updateSkip();
    msg.textContent = "";
    mark();
  }
  const homeEl = $("screen-home");
  new MutationObserver(() => { if (homeEl.classList.contains("active")) renderStatsPanel(); }).observe(homeEl, { attributes: true, attributeFilter: ["class"] });
  playBtns.forEach(b => b.addEventListener("click", () => choose("play", b.dataset.homeMode)));
  learnBtns.forEach(b => b.addEventListener("click", () => choose("learn", b.dataset.homeLearn)));

  start.addEventListener("click", async e => {
    if (!chosen) { e.stopImmediatePropagation(); msg.textContent = "Pick a mode first."; return; }
    if (chosen.kind === "play") return;
    e.stopImmediatePropagation();
    const yes = document.querySelector('input[name="specific-counties"]:checked');
    const excluded = new Set(yes && yes.value === "yes" ? [...document.querySelectorAll(".county-checkbox:checked")].map(cb => cb.value) : []);
    try { await ensureStateMaps(activeStateKeys); }
    catch (err) { msg.textContent = "Couldn't load the map data."; return; }
    if (chosen.mode === "review") { startReview(); return; }
    const ok = window.startStudyFromHome(chosen.mode, activeStateKeys.slice(), skip.checked, excluded);
    if (!ok) msg.textContent = `You've already learned every ${unitWord(true)} here ${chosen.mode === "all" ? "in all three Learn modes" : "in " + ({ pin: "Pin", mc: "Multiple-Choice", type: "Type" })[chosen.mode]}. Untick \u201CSkip ${unitWord(true)} I've already learned\u201D to review them.`;
  }, true);
})();

["type-input", "study-input"].forEach(id => {
  const el = document.getElementById(id);
  if (!el) return;
  ["paste", "drop"].forEach(ev => el.addEventListener(ev, e => e.preventDefault()));
});

document.querySelectorAll(".state-row[data-state] .state-count").forEach(el => {
  const n = parseInt(el.textContent, 10);
  if (n) el.textContent = `${n} ${countyWord(el.closest(".state-row").dataset.state, n)}`;
});

(function initAllCountiesList() {
  const modal = document.getElementById("modal-county-list");
  const openBtn = document.getElementById("btn-goto-county-list");
  const closeBtn = document.getElementById("btn-county-list-close");
  const search = document.getElementById("all-counties-search");
  const listEl = document.getElementById("all-counties-list");
  const countEl = document.getElementById("all-counties-count");
  const includeState = document.getElementById("all-counties-include-state");
  if (!modal || !openBtn || !search || !listEl || !countEl || !closeBtn) {
    console.log("county list not set up. found:", { modal: !!modal, openBtn: !!openBtn, closeBtn: !!closeBtn, search: !!search, listEl: !!listEl, countEl: !!countEl });
    return;
  }
  let rows = null;
  const build = () => {
    rows = [];
    Object.values(stateData).forEach(s => (s.counties || []).forEach(c => rows.push({ name: c.name, state: s.name })));
    rows.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }) || a.state.localeCompare(b.state));
  };
  const render = () => {
    const q = search.value.trim().toLowerCase();
    const withState = !includeState || includeState.checked;
    const shown = q ? rows.filter(r => (withState ? r.name + " " + r.state : r.name).toLowerCase().includes(q)) : rows;
    countEl.textContent = q ? `${shown.length} of ${rows.length}` : `${rows.length} total`;
    const items = [];
    let letter = "";
    shown.forEach(r => {
      const first = r.name.charAt(0).toUpperCase();
      if (!q && first !== letter) {
        letter = first;
        const h = document.createElement("li");
        h.className = "acl-letter"; h.textContent = first;
        items.push(h);
      }
      const li = document.createElement("li");
      const n = document.createElement("span"); n.textContent = r.name;
      const s = document.createElement("span"); s.className = "acl-state"; s.textContent = r.state;
      li.append(n, s);
      items.push(li);
    });
    listEl.replaceChildren(...items);
    listEl.scrollTop = 0;
  };
  const open = () => { if (!rows) build(); search.value = ""; render(); modal.classList.remove("hidden"); search.focus(); };
  const close = () => modal.classList.add("hidden");
  openBtn.addEventListener("click", open);
  closeBtn.addEventListener("click", close);
  modal.addEventListener("click", e => { if (e.target === modal) close(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape" && !modal.classList.contains("hidden")) close(); });
  search.addEventListener("input", render);
  if (includeState) includeState.addEventListener("change", render);
})();
});