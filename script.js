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
      row.innerHTML = `<span class="state-name">${esc(m.name)}</span> <span class="state-count">${m.counties.length} counties</span>`;
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
const MODE_LIST = ["pin", "pin-hard", "mc", "type", "type-hard", "type-strict"];
const MODE_LABELS = {
  pin: "Pin",
  "pin-hard": "Flash",
  mc: "Multiple-Choice",
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
let startTime = 0;
let updateHandle = null;
let finalTime = 0;
let pausedByTab = false;
let missedCounties = new Set();
let forfeitedCount = 0;
let currentRunIsRetryMissed = false;
let currentAttemptMistakes = 0;
let totalTargetsCount = 0;
let originalTargetList = [];

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
  ["roanoke-va", -4, 110],
  ["martinsville", 11, 40],
  ["lexington-va", -7, 170],
  ["danville", 14, 29],
  ["buena-vista-va", 31, 164],
  ["lynchburg", 37, 125],
  ["emporia", -65, 43],
  ["richmond-va-county", -44, 142],
  ["colonial-heights", -31, 111],
  ["petersburg-va", -9, 104],
  ["hopewell", 5, 114],
  ["franklin-va", -7, 42],
  ["williamsburg-va", -5, 114],
  ["newport-news", -2, 91],
  ["hampton-va", 8, 88],
  ["poquoson", 30, 98],
  ["portsmouth", 52, 67],
  ["norfolk-va", 67, 70],
  ["staunton", -13, -179],
  ["waynesboro", -5, -190],
  ["harrisonburg", 16, -145],
  ["charlottesville", 2, -193],
  ["winchester", -2, -58],
  ["manassas", -43, -108],
  ["fredericksburg", -21, -160],
  ["manassas-park", 0, -104],
  ["fairfax", 9, -94],
  ["falls-church", 20, -90],
  ["alexandria", 36, -98],
];
const virginiaCalloutsDone = {};


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
  if (audioByState[county.stateKey] && audioByState[county.stateKey].has(slug)) return `${AUDIO_DIR}${county.stateKey}/${slug}.${audioExt}`;
  if (audioShared.has(slug)) return `${AUDIO_DIR}${slug}.${audioExt}`;
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
    result = foldDiacriticsForComparison(result).replace(/\u02BB/g, "");
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
const DEFAULT_SETTINGS = {
  darkMode: false,
  highContrast: false,
  soundVolume: 50,
  speedrunMode: false,
  instantTypeCheck: true,
  hideStatsByDefault: true,
  listByState: true,
  sortStatesAlphabetically: true,
  scaleStatesBySize: false,
  useDividersForFewStates: true,
  statesPerRow: 2,
  requireDiacritics: false,
  acceptStAbbrev: true,
  showStateInPrompt: true,
  revealAnswerAfterMistakes: true,
  bestKnownCount: 5
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
  { id: "toggle-instant-check", key: "instantTypeCheck", ...asCheckbox },
  { id: "toggle-hide-stats-default", key: "hideStatsByDefault", ...asCheckbox, after: () => renderStatsPanel() },
  { id: "toggle-list-by-state", key: "listByState", ...asCheckbox, after: () => renderCountyListPanel() },
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
  const maxW = window.innerWidth - 16;
  const fitW = (availH - pad) * ratio + padX;
  const clearStepUp = zoomNormalWidth * ZOOM_GOOD_ENOUGH + padX;
  const wantW = fitW >= clearStepUp ? fitW : Math.max(fitW, zoomNormalWidth * ZOOM_MIN_FACTOR + padX);
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
  if (zoomBannerWatch) { zoomBannerWatch.disconnect(); zoomBannerWatch = null; }
  releaseZoomedMap();
  zoomScroller.remove();
  zoomScroller.scrollTop = 0;
  zoomScroller.scrollLeft = 0;
  zoomLevel = 1;
  zoomControls.remove();
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

function updateZoomControls() {
  const shown = zoomLevel < 10 ? zoomLevel.toFixed(1).replace(/\.0$/, "") : String(Math.round(zoomLevel));
  zoomLevelLabel.textContent = shown + "\u00D7";
  zoomControls.querySelector('[data-z="out"]').disabled = zoomLevel <= 1.001;
  zoomControls.querySelector('[data-z="in"]').disabled = zoomLevel >= ZOOM_MAX - 0.001;
  zoomControls.querySelector('[data-z="reset"]').disabled = zoomLevel <= 1.001;
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
  setSettingsBackLabel(returnScreen === "screen-game" ? "Back to Game" : "Back to Home");
  showScreen("screen-settings");
}


const modalSummary = document.getElementById("modal-summary");
const summaryPercentage = document.getElementById("summary-percentage");
const finalTimeElement = document.getElementById("final-time");
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


function applySettings() {
  SETTING_CONTROLS.forEach(c => {
    const el = document.getElementById(c.id);
    if (el) c.write(el, gameSettings[c.key]);
  });
  syncStAbbrevSettingUI();
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
  };
  const list = document.querySelector("#screen-setup .states-list");
  if (list) new MutationObserver(refresh).observe(list, { subtree: true, attributes: true, attributeFilter: ["class"] });
  refresh();
}, 0);


(function initStudy() {
  const $ = id => document.getElementById(id);
  const BATCH = 5, KEY = "studyLearned";
  const selected = new Set();
  let counties = [], start = 0, batch = [], quizSet = [], typeSet = [], pinSet = [], i = 0, phase = "learn", score = 0, typeScore = 0, pinScore = 0, answered = false;
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
    const n = p === "learn" ? firstPhase() : nextPhaseAfter(p);
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
      text: `${s.counties.length} ${k === "alaska" ? "boroughs & census areas" : "counties"}`,
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
      reason = note = `You've already learned every county in your selection ${studyMode === "all" ? "in all three Learn modes" : "in " + MODE_NAME[studyMode]}. Untick \"Skip counties I've already learned\" to review them.`;
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
      studyTip.classList.remove("hidden");
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
    svg.setAttribute("aria-label", pin ? `Map of ${stateData[county.stateKey].name}` : `Map of ${stateData[county.stateKey].name} with a county highlighted`);
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
        if (!sr.width || Math.max(r.width, r.height) > sr.width * 0.08) return;
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
    $("study-progress").textContent = `${learn ? "Study" : typing ? "Type" : pinning ? "Pin" : "Quiz"}: ${i + 1} of ${list.length} (counties ${start + 1}-${start + batch.length} of ${counties.length})`;
    drawMap(c, pinning, learn);
    const studyStateEl = $("study-state");
    if (studyStateEl) studyStateEl.textContent = stateData[c.stateKey]?.name || "";
    $("study-name").textContent = learn ? getPlainName(c) : typing ? "Type the name of the highlighted county." : pinning ? `Click ${getPlainName(c)} on the map.` : "Which county is highlighted?";
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
      const picks = pickConfusable(c, counties, 3, null, new Set(batch));
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

  let replayFrom = null;
  const snapshotRound = () => ({ quiz: roundLog.quiz.slice(), type: roundLog.type.slice(), pin: roundLog.pin.slice(), score, typeScore, pinScore, start, batch: batch.slice() });
  const replay = fn => () => { replayFrom = snapshotRound(); fn(); };
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
    replayFrom = null;
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
    if (start + BATCH < counties.length) addBtn(`Next ${Math.min(BATCH, counties.length - start - BATCH)} counties`, () => { replayFrom = snapshotRound(); start += BATCH; beginBatch(true); }, "btn-primary");
    if (seq().includes("pin")) addBtn("Pin again", replay(startPin));
    if (seq().includes("quiz")) addBtn("Quiz again", replay(startQuiz));
    if (seq().includes("type")) addBtn("Type again", replay(startType));
  }
  function results() { showSummary(); }

  function practiceOrder() {
    const order = shuffle(batch), lastLearned = batch[batch.length - 1];
    if (order.length > 1 && order[0] === lastLearned) {
      const j = 1 + Math.floor(Math.random() * (order.length - 1));
      [order[0], order[j]] = [order[j], order[0]];
    }
    return order;
  }
  function startQuiz() { phase = "quiz"; quizSet = practiceOrder(); i = 0; score = 0; roundLog.quiz = []; render(); }
  function startPin() { phase = "pin"; pinSet = practiceOrder(); i = 0; pinScore = 0; roundLog.pin = []; render(); }
  function startType() { phase = "type"; typeSet = practiceOrder(); i = 0; typeScore = 0; roundLog.type = []; render(); }

  function beginBatch(keepBackToResults) {
    if (!keepBackToResults) replayFrom = null;
    batch = counties.slice(start, start + BATCH);
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
      else if (nextPhaseAfter(phase)) startPhase(nextPhaseAfter(phase));
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
    if (t && t.closest && t.closest("button, a, input, select, textarea, [role='button']")) return;
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
btnResetProgress.addEventListener("click", () => {
  if (confirm("Are you sure you want to reset all saved progress and mistakes?")) {
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
  }
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


function markCountyLearned(countyId, mode, viaRetryMissed) {
  const newStatus = viaRetryMissed ? "retry" : "clean";
  const current = getCountyLearnedStatus(countyId, mode);
  if (current === "clean" || current === newStatus) return;
  if (!countyProgress[countyId]) countyProgress[countyId] = {};
  countyProgress[countyId][mode] = newStatus;
  localStorage.setItem("countyProgress", JSON.stringify(countyProgress));
  renderStatsPanel();
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


function distanceToShapeEdge(path, cx, cy, vx, vy, maxLen) {
  if (typeof path.isPointInFill !== "function") return null;
  const inside = (t) => path.isPointInFill(new DOMPoint(cx + vx * t, cy + vy * t));
  if (!inside(0)) return null;
  const step = 4;
  let lo = 0;
  for (let t = step; t <= maxLen; t += step) if (inside(t)) lo = t;
  let hi = lo + step;
  for (let i = 0; i < 8; i++) { const mid = (lo + hi) / 2; if (inside(mid)) lo = mid; else hi = mid; }
  return lo;
}

function setupCountyCallout(targetSvg, countyId, key, offsetX, offsetY, radiusPadding, stopShort, radiusOverride, styleKey = key) {
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

  const dx = cx - calloutX;
  const dy = cy - calloutY;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const ux = dx / dist;
  const uy = dy / dist;
  let tipX = cx - ux * stopShort;
  let tipY = cy - uy * stopShort;
  if (styleKey === "va") {
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
  const arrowheadId = `${styleKey}-arrowhead`;
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
    if (us !== 1) {
      const isVa = styleKey === "va";
      const m = (isVa ? 8 : 12) * us;
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
  circle.setAttribute("aria-label", `${countyName} County (click here — the real county outline is very small)`);
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
        skagwayCalloutCreated = setupCountyCallout(targetSvg, "skagway", "skagway", 40, -55, 4, 9, 14);
      }
      if (key === "alaska" && !bristolBayCalloutCreated) {
        bristolBayCalloutCreated = setupCountyCallout(targetSvg, "bristol-bay", "bristol-bay", -85, 15, 4, 8, 14);
      }
      if (key === "virginia") {
        VIRGINIA_CALLOUTS.forEach(([id, ox, oy]) => {
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
      if (!svgRect.width || Math.max(r.width, r.height) > svgRect.width * 0.08) return;
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
    if (isSpecificYes && document.querySelectorAll(".county-checkbox:checked").length < 1) {
      blockedReason = "Select at least one county to play, or choose \"No\" to play them all.";
    }
  }

  btnStartGame.classList.remove("hidden");
  btnStartGame.disabled = !!blockedReason;
  if (blockedReason) btnStartGame.title = blockedReason;
  else btnStartGame.removeAttribute("title");
}


if (btnStartGame) {
  btnStartGame.addEventListener("click", async () => {
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
    if (confirm("Give up? Every remaining county will be revealed as missed.")) {
      giveUp();
    }
  });
}


function forfeitCurrentTarget() {
  if (!isGameActive || !currentTarget || selectedMode === "type") return;

  const forfeited = currentTarget;

  scoreWrong++;
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
        if (TYPE_MODES.has(selectedMode)) el.style.pointerEvents = "none";
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


function initGame(countiesToPlay, isRetryMissedRun = false) {
  targetPool = [...countiesToPlay];
  totalTargetsCount = targetPool.length;
  originalTargetList = [...targetPool];
  scoreRight = 0;
  scoreWrong = 0;
  startStopwatch();
  isGameActive = true;
  missedCounties.clear();
  forfeitedCount = 0;
  currentAttemptMistakes = 0;

  currentRunIsRetryMissed = isRetryMissedRun;
      ambiguousCountyNames = computeAmbiguousNames(getActiveCountiesPool());


  if (modalSummary) modalSummary.classList.add("hidden");
  if (admireBar) admireBar.classList.add("hidden");
  if (feedbackEl) {
    feedbackEl.textContent = "";
    feedbackEl.className = "feedback-message";
  }
  hideHoverTooltip();

  if (btnToggleCountyList) {
    btnToggleCountyList.classList.toggle("hidden", selectedMode !== "type");
    btnToggleCountyList.textContent = "Show List";
  }
  if (countyListPanel) countyListPanel.classList.add("hidden");
  if (btnForfeitTarget) btnForfeitTarget.classList.toggle("hidden", selectedMode === "type");
  if (gameStopwatch) gameStopwatch.classList.toggle("hidden", selectedMode === "type" || !gameSettings.speedrunMode);

  countyPaths.forEach(path => {
    path.classList.remove("correct", "wrong", "flash-correct", "found", "correct-recovered", "flash-correct-recovered", "typing-highlight", "given-up-missed");
    path.style.pointerEvents = TYPE_MODES.has(selectedMode) ? "none" : "auto";
    path.setAttribute("tabindex", "0");
    path.setAttribute("role", "button");
    path.setAttribute("aria-label", "County path");
  });


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
document.addEventListener("visibilitychange", () => {
  if (document.hidden && updateHandle) {
    pausedByTab = true;
    stopStopwatch();
  }
  if (!document.hidden) {
    if (pausedByTab && isGameActive) {
      pausedByTab = false;
      startStopwatch(true);
    }
  }
  else if (pausedByTab) {
    pausedByTab = false;
    startStopwatch(resume);
  }
});

function renderCountyListPanel() {
  if (!countyListItems) return;
  if (countyListPanel && countyListPanel.classList.contains("hidden")) return;
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

function refreshTargetPrompt(forceReveal) {
  if (!targetPrompt || !currentTarget) return;

  if (selectedMode === "type") {
    targetPrompt.innerHTML = `<span class="find-label">Find any county</span>`;
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
        <span class="find-label">${selectedMode === "mc" ? "Which county is highlighted?" : "Type the highlighted county"}</span>
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

/* ---------- Similarity between counties ---------- */
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
function pickConfusable(target, candidates, n, avoid, bonus) {
  const seen = new Set([target.name]), picks = [];
  const scored = candidates
    .filter(c => c.id !== target.id)
    .map(c => ({ c, s: confusabilityScore(target, c) + (bonus && bonus.has(c) ? 1.5 : 0) - (avoid && avoid.has(c.id) ? 100 : 0) }))
    .sort((x, y) => y.s - x.s);
  for (const { c } of scored) { if (picks.length >= n) break; if (seen.has(c.name)) continue; seen.add(c.name); picks.push(c); }
  return picks;
}
let mcRecent = [], mcLastShown = new Set();
const mcRemember = id => { if (id) { mcRecent.push(id); if (mcRecent.length > 8) mcRecent.shift(); } };

function renderMcOptions() {
  if (!mcOptions || !currentTarget) return;
  const target = currentTarget;
  const avoid = new Set([...mcRecent, ...mcLastShown]);
  avoid.delete(target.id);
  const picks = pickConfusable(target, getActiveCountiesPool(), 3, avoid);
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

function pickNextTarget() {
  currentAttemptMistakes = 0;
  updateProgressCounter();
  renderCountyListPanel();

  document.querySelectorAll(".county.typing-highlight").forEach(el => {
    el.classList.remove("typing-highlight");
  });

  if (targetPool.length === 0) {
    isGameActive = false;
    stopStopwatch();
    if (mcOptions) mcOptions.classList.add("hidden");
    showSummaryModal();
    return;
  }


  const lastId = currentTarget && currentTarget.id;
  const cand = targetPool.length > 1 ? targetPool.filter(c => c.id !== lastId) : targetPool;
  const wts = cand.map(c => 1 + Math.min(confTotal(c.id), 5));
  let roll = Math.random() * wts.reduce((a, b) => a + b, 0), randomIndex = 0;
  for (; randomIndex < cand.length - 1; randomIndex++) { roll -= wts[randomIndex]; if (roll <= 0) break; }
  currentTarget = cand[randomIndex];
  if (selectedMode === "mc") mcRemember(currentTarget.id);


  refreshTargetPrompt(false);

  if (SINGLE_TARGET_TYPE_MODES.has(selectedMode)) {
    getCountyElements(currentTarget.id).forEach(el => el.classList.add("typing-highlight"));
  }

  if (typeInputBox) {
    typeInputBox.classList.toggle("hidden", !TYPE_MODES.has(selectedMode) || selectedMode === "mc");
  }
  if (mcOptions) { if (selectedMode === "mc") renderMcOptions(); else mcOptions.classList.add("hidden"); }
  refreshSpecialCharsBar();
  if (TYPE_MODES.has(selectedMode) && selectedMode !== "mc" && typeInput) {
    typeInput.value = "";
    typeInput.focus();
  }
}


function handleCountyClick(pathEl) {
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
    const recoveredFromMistake = currentAttemptMistakes > 0;
    if (!recoveredFromMistake) markCountyLearned(currentTarget.id, selectedMode, currentRunIsRetryMissed);


    if (feedbackEl) {
      feedbackEl.textContent = `Correct! That's ${getPlainName(currentTarget)}.`;
      feedbackEl.className = "feedback-message success";
    }


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
      getCountyElements(currentTarget.id).forEach(el => el.classList.add("typing-highlight"));
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
        ? `Correct! That matched ${matchedCounties.length} counties.`
        : "Correct!";
    }
    feedbackEl.className = "feedback-message success";
  }

  matchedCounties.forEach(matchedCounty => {
    if (!recoveredFromMistake) markCountyLearned(matchedCounty.id, selectedMode, currentRunIsRetryMissed);
    getCountyElements(matchedCounty.id).forEach(el => {
      el.classList.remove("typing-highlight");
      const useRecoveredColor = recoveredFromMistake && (selectedMode === "type-strict" || selectedMode === "mc");
      el.classList.add(useRecoveredColor ? "correct-recovered" : "correct", "found");
      el.style.pointerEvents = "none";
    });
  });

  const matchedIds = new Set(matchedCounties.map(c => c.id));
  targetPool = targetPool.filter(c => !matchedIds.has(c.id));
  pickNextTarget();
}

function registerWrongTypedGuess() {
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

function tryAutoMatchTypedInput() {
  if (!isGameActive || !typeInput) return;
  const normalized = normalizeTypedName(typeInput.value);
  if (!normalized) return;
  const matches = getTypedGuessMatches(normalized);
  if (matches.length > 0) acceptTypedMatches(matches);
}

function submitTypedGuess() {
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

if (typeInput) {
  typeInput.addEventListener("input", () => {
    if (selectedMode !== "type-strict" && gameSettings.instantTypeCheck) tryAutoMatchTypedInput();
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

  const chars = (TYPE_MODES.has(selectedMode) && selectedMode !== "mc" && gameSettings.requireDiacritics)
    ? getNeededSpecialChars()
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


function bindCountyInteractivity(path) {
  path.addEventListener("pointerdown", (e) => {
    if (!gameSettings.speedrunMode) return;
    if (isZoomGestureStart(e)) return;
    if (e.pointerType === "touch") return;
    handleCountyClick(e.currentTarget);
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
  if (!modalSummary) return;


  const totalAttempts = scoreRight + scoreWrong;
  const accuracy = totalAttempts > 0 ? Math.round((scoreRight / totalAttempts) * 100) : 0;


  if (summaryPercentage) summaryPercentage.textContent = `${accuracy}%`;
  if (finalTimeElement) finalTimeElement.textContent = formatTime(finalTime), finalTimeElement.classList.toggle("hidden", selectedMode === "type" || !gameSettings.speedrunMode);


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


(function initHome() {
  const $ = id => document.getElementById(id);
  const layout = $("home-layout");
  if (!layout) return;
  if (appContainer) appContainer.classList.add("wide-picker");
  const start = $("btn-start-game"), msg = $("home-msg"), skipWrap = $("home-skip-wrap"), skip = $("home-skip-learned");
  const playBtns = [...layout.querySelectorAll("[data-home-mode]")];
  const learnBtns = [...layout.querySelectorAll("[data-home-learn]")];
  let chosen = null;

  function updateSkip() {
    skipWrap.classList.toggle("hidden", !(chosen && chosen.kind === "learn" && activeStateKeys.length > 0));
    msg.textContent = "";
  }
  skip.addEventListener("change", () => { msg.textContent = ""; });
  const pickedBox = $("setup-picked");
  if (pickedBox) new MutationObserver(updateSkip).observe(pickedBox, { childList: true, subtree: true, characterData: true });

  function mark() {
    playBtns.forEach(b => { const on = !!chosen && chosen.kind === "play" && b.dataset.homeMode === chosen.mode; b.classList.toggle("selected", on); b.setAttribute("aria-pressed", on); });
    learnBtns.forEach(b => { const on = !!chosen && chosen.kind === "learn" && b.dataset.homeLearn === chosen.mode; b.classList.toggle("selected", on); b.setAttribute("aria-pressed", on); });
  }
  function choose(kind, mode) {
    if (chosen && chosen.kind === kind && chosen.mode === mode) {
      chosen = null;
      layout.classList.add("no-mode");
      start.textContent = "Play";
      updateSkip();
      msg.textContent = "";
      mark();
      return;
    }
    chosen = { kind, mode };
    statsView = kind === "play" ? "play" : "learn";
    if (kind === "learn") statsLearnMode = mode;
    renderStatsPanel();
    if (kind === "play") selectedMode = mode;
    layout.classList.remove("no-mode");
    start.textContent = kind === "play" ? "Play" : "Learn";
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
    catch (err) { msg.textContent = "Couldn't load the map data. Make sure the maps folder is next to index.html, then try again."; return; }
    const ok = window.startStudyFromHome(chosen.mode, activeStateKeys.slice(), skip.checked, excluded);
    if (!ok) msg.textContent = `You've already learned every county here ${chosen.mode === "all" ? "in all three Learn modes" : "in " + ({ pin: "Pin", mc: "Multiple-Choice", type: "Type" })[chosen.mode]}. Untick \u201CSkip counties I've already learned\u201D to review them.`;
  }, true);
})();

});