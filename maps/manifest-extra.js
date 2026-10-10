// Hand-built states that don't come from build_maps_hires.py. Loaded right after maps/manifest.js.
// registerManifestStates() skips any key that manifest.js already defined, so when the real pipeline
// builds one of these (e.g. build_maps_hires.py --states 11,66), ITS version wins and this entry is ignored.
window.__stateManifest = (window.__stateManifest || []).concat([
 {
  "key": "district_of_columbia",
  "name": "District of Columbia",
  "svgId": "svg-district-of-columbia",
  "viewBox": "0 0 16000 19160",
  "scale": 20,
  "counties": [
   [
    "district-of-columbia",
    "District of Columbia"
   ]
  ]
 },
 {
  "key": "guam",
  "name": "Guam",
  "svgId": "svg-guam",
  "viewBox": "0 0 16000 20120",
  "scale": 20,
  "counties": [
   [
    "guam",
    "Guam"
   ]
  ]
 }
]);
