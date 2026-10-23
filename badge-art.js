/* Shared state-badge art: the round medal with the tier ring and the state's own shape.
   Used by profile.js (the badge shelf) and by the unlock toasts on the game page, so both draw the same badge.
   Needs the outline files us-map.js, dc-shape.js and as-shape.js; CountellectBadge.ready() loads them if the page didn't. */
(function () {
  "use strict";
  const SVGNS = "http://www.w3.org/2000/svg";
  const MODE_COUNT = 6;
  const svgEl = (tag, attrs) => { const n = document.createElementNS(SVGNS, tag); for (const k in attrs) n.setAttribute(k, attrs[k]); return n; };

  const TIER = n => n >= MODE_COUNT ? "gold" : n >= 3 ? "silver" : n >= 1 ? "bronze" : "locked";
  const TIER_RING = { gold: "#d4a017", silver: "#b8c0cc", bronze: "#b0703c", locked: "rgba(128,128,128,.55)" };

  // each state's colours from the points sheet: [background, text]
  const STATE_STYLE = {"Alabama":["00491C","D9EAD3"],"Alaska":["6DFEFE","674EA7"],"American Samoa":["767576","E6CCE6"],"Arizona":["8A9CC6","E3E9FC"],"Arkansas":["BEC86F","990000"],"California":["FB85FD","351C75"],"Colorado":["00856D","D0E0E3"],"Connecticut":["FFC0C1","4C1130"],"Delaware":["0000A1","FFE599"],"District of Columbia":["670011","9FC5E8"],"Florida":["E4F73A","38761D"],"Georgia":["FF553D","FFF8ED"],"Guam":["5050F5","C9DAF8"],"Hawaii":["4FEEA5","674EA7"],"Idaho":["F7CE00","7F6000"],"Illinois":["FFF281","1155CC"],"Indiana":["D4AA77","990000"],"Iowa":["E7FFA9","7F6000"],"Kansas":["B0E8B5","85200C"],"Kentucky":["1897B4","CFE2F3"],"Louisiana":["803499","EAD1DC"],"Maine":["FB9163","FFF2CC"],"Maryland":["FC2E5B","FFF2CC"],"Massachusetts":["CD70FF","F0D4FF"],"Michigan":["95DF15","274E13"],"Minnesota":["FFC294","434343"],"Mississippi":["7F0E54","D5A6BD"],"Missouri":["17C5E4","0000A1"],"Montana":["C6DBE8","A61C00"],"Nebraska":["C11A36","CFE2F3"],"Nevada":["FFE7BC","666666"],"New Hampshire":["FF3DA8","420027"],"New Jersey":["5D4033","F9CB9C"],"New Mexico":["F1AB13","990000"],"New York":["FF8181","783F04"],"North Carolina":["006597","F4CCCC"],"North Dakota":["6C5BCA","FFE599"],"Northern Mariana Islands":["44FF00","7F6000"],"Ohio":["FFA33B","FFF2CC"],"Oklahoma":["A15F39","F4CCCC"],"Oregon":["BD6E63","FCD7D0"],"Pennsylvania":["D6C040","1C4587"],"Puerto Rico":["FBD573","CC0000"],"Rhode Island":["008A28","CFE2F3"],"South Carolina":["68CAD5","134F5C"],"South Dakota":["87CAF3","1155CC"],"Tennessee":["F05400","FCE5CD"],"Texas":["798830","FFF2CC"],"United States Minor Outlying Islands":["C3C3C3","666666"],"United States Virgin Islands":["C62FD0","EAD1DC"],"Utah":["F0781D","FFDBB7"],"Vermont":["0089F1","D9EAD3"],"Virginia":["B390DB","EFE8FF"],"Washington":["87B9A3","1C4587"],"West Virginia":["355850","FCE5CD"],"Wisconsin":["E9BAF5","741B47"],"Wyoming":["8C607E","FCE5CD"]};

  // American Samoa is drawn as islands far apart, so its badge shows just Tutuila (plus little Aunu'u beside it).
  // The rule keeps only shapes that sit left of x = 750 on the map, which is Tutuila; Manu'a, Swains and Rose are farther right.
  const BADGE_ONLY = {
    "American Samoa": shape => {
      const nums = shape.match(/-?\d+\.?\d*/g).map(Number);
      let maxX = -Infinity;
      for (let i = 0; i < nums.length; i += 2) maxX = Math.max(maxX, nums[i]);
      return maxX < 750;
    }
  };

  // Hand-picked, high-detail outlines (dc-shape.js etc.) win over the home map's coarse ones. Read at call time because they can load late.
  const overrides = () => window.SHAPE_EXTRA || {};
  let stateShapes = null;
  function shapeFor(name) {
    const over = overrides();
    if (over[name]) return over[name];
    if (!stateShapes) {
      if (!window.US_MAP_SVG) return null;          // outlines not loaded yet; don't cache the miss
      stateShapes = {};
      const t = document.createElement("div");
      t.innerHTML = window.US_MAP_SVG;
      t.querySelectorAll("path.us-st").forEach(p => {
        const n = p.dataset.name;
        let d = p.getAttribute("d");
        const keep = BADGE_ONLY[n];
        if (keep) d = (d.match(/M[^M]*/g) || []).filter(keep).join("");
        stateShapes[n] = (stateShapes[n] || "") + d;   // joins a state's pieces; BADGE_ONLY trims the ones listed above
      });
    }
    return stateShapes[name] || null;
  }

  // the home map is a conic projection, so every state is drawn tilted. This turns each one back upright.
  const STATE_LON = {Alabama:-86.8, Arizona:-111.7, Arkansas:-92.4, California:-119.5, Colorado:-105.5, Connecticut:-72.7,
    Delaware:-75.5, "District of Columbia":-77.0, Florida:-82.4, Georgia:-83.4, Idaho:-114.6, Illinois:-89.2, Indiana:-86.3,
    Iowa:-93.5, Kansas:-98.4, Kentucky:-85.3, Louisiana:-92.0, Maine:-69.2, Maryland:-76.8, Massachusetts:-71.8,
    Michigan:-84.5, Minnesota:-94.3, Mississippi:-89.7, Missouri:-92.5, Montana:-110.0, Nebraska:-99.8, Nevada:-116.6,
    "New Hampshire":-71.6, "New Jersey":-74.5, "New Mexico":-106.1, "New York":-75.5, "North Carolina":-79.4,
    "North Dakota":-100.5, Ohio:-82.8, Oklahoma:-97.5, Oregon:-120.6, Pennsylvania:-77.8, "Rhode Island":-71.5,
    "South Carolina":-80.9, "South Dakota":-100.2, Tennessee:-86.3, Texas:-99.3, Utah:-111.7, Vermont:-72.7, Virginia:-78.8,
    Washington:-120.5, "West Virginia":-80.6, Wisconsin:-89.9, Wyoming:-107.5};
  const tiltOf = name => (name in STATE_LON && !overrides()[name]) ? 0.6029 * (STATE_LON[name] + 96) : 0;

  function discSvg(ringColor, locked) {
    const svg = svgEl("svg", { viewBox: "0 0 100 100", class: "medal-disc" });
    svg.append(
      svgEl("circle", { cx: 50, cy: 50, r: 46, class: "medal-face" }),
      svgEl("circle", locked
        ? { cx: 50, cy: 50, r: 46, class: "medal-ring", fill: "none", stroke: ringColor, "stroke-width": 3, "stroke-dasharray": "3 5" }
        : { cx: 50, cy: 50, r: 46, class: "medal-ring", fill: "none", stroke: ringColor, "stroke-width": 5 }));
    return svg;
  }

  // the state's shape, upright and coloured, sized to sit inside a 100x100 medal. Returns null if there's no outline for it.
  function stateShape(name, locked, extraClass) {
    const d = shapeFor(name);
    if (!d) return null;
    const st = STATE_STYLE[name];
    const inner = svgEl("svg", { x: 0, y: 0, width: 100, height: 100, viewBox: "0 0 100 100", preserveAspectRatio: "xMidYMid meet", class: "medal-shape" + (extraClass ? " " + extraClass : "") });
    const tilt = tiltOf(name);
    const g = svgEl("g", {});
    g.append(svgEl("path", {
      d, "fill-rule": "evenodd", "vector-effect": "non-scaling-stroke", "stroke-width": 1,
      fill: locked ? "none" : "#" + (st ? st[0] : "888888"),
      stroke: locked ? "currentColor" : "none",                 // no outline once it's coloured (locked ones keep a faint one so you can see them)
      ...(tilt ? { transform: `rotate(${tilt})` } : {})
    }));
    inner.append(g);
    return inner;
  }

  // the round badge: tier ring with the state's shape inside. modesDone = how many modes are done in that state (0-6)
  function badgeSvg(name, modesDone) {
    const tier = TIER(modesDone), locked = tier === "locked";
    const svg = discSvg(TIER_RING[tier], locked);
    const inner = stateShape(name, locked);
    if (inner) svg.append(inner);
    return svg;
  }

  // Zooms each state so its farthest point just touches a circle inside the medal ring: every state fills its badge as much as it can.
  // Needs the shape on the page already (getBBox / getPointAtLength), so call it after appending.
  const FIT_RADIUS = 35;           // of the medal's 100-unit width; the ring's inner edge is about 43, so this leaves a small gap
  function fit(root) {
    const shapes = root.matches && root.matches("svg.medal-shape") ? [root] : [...root.querySelectorAll("svg.medal-shape")];
    shapes.forEach(s => {
      try {
        const g = s.querySelector("g"), path = g.querySelector("path");
        const bb = g.getBBox();
        if (!(bb.width > 0 && bb.height > 0)) return;
        const m = /rotate\(([-\d.eE]+)\)/.exec(path.getAttribute("transform") || "");
        const a = m ? parseFloat(m[1]) * Math.PI / 180 : 0, cos = Math.cos(a), sin = Math.sin(a);
        const total = path.getTotalLength(), steps = Math.min(600, Math.max(120, Math.round(total / 2)));
        const pts = [];
        for (let i = 0; i <= steps; i++) {
          const p = path.getPointAtLength(total * i / steps);
          pts.push([p.x * cos - p.y * sin, p.x * sin + p.y * cos]);     // where the point lands after the upright rotation
        }
        const cx = bb.x + bb.width / 2, cy = bb.y + bb.height / 2;
        let r = 0;
        for (const [x, y] of pts) r = Math.max(r, Math.hypot(x - cx, y - cy));
        r = Math.max(r, Math.hypot(bb.width, bb.height) / 8);           // never zoom a tiny or odd shape absurdly far
        const half = r * 50 / (parseFloat(s.getAttribute("data-fit")) || FIT_RADIUS);
        s.setAttribute("viewBox", `${cx - half} ${cy - half} ${half * 2} ${half * 2}`);
      } catch (e) { /* not drawn yet */ }
    });
  }

  // loads the outline files if this page doesn't have them yet (the game page loads them only when a state badge is first needed)
  let loading = null;
  function ready() {
    if (window.US_MAP_SVG) return Promise.resolve(true);
    if (!loading) {
      const load = src => new Promise(res => {
        const s = document.createElement("script");
        s.src = src; s.onload = () => res(true); s.onerror = () => res(false);
        document.head.append(s);
      });
      loading = ["dc-shape.js", "as-shape.js", "us-map.js"].reduce((p, src) => p.then(() => load(src)), Promise.resolve()).then(() => !!window.US_MAP_SVG);
    }
    return loading;
  }

  window.CountellectBadge = { TIER, TIER_RING, STATE_STYLE, svgEl, discSvg, shapeFor, stateShape, badgeSvg, fit, ready };
})();