/* Shared look for runs: the 7-segment time, the state name in its own colours, the mode colours.
   Used by the Records page (records-list.js) and the game page (history.js). Needs badge-art.js loaded first (for the state colours). */
(function () {
  "use strict";
  const SVGNS = "http://www.w3.org/2000/svg";
  const MODE_COLOR = { pin: "#3b82f6", "pin-hard": "#8b5cf6", mc: "#f59e0b", type: "#14b8a6", "type-hard": "#ec4899", "type-strict": "#ef4444" };      // same as the main menu

  function sevenSeg(text) {
    const SEGS = { 0: "abcdef", 1: "bc", 2: "abdeg", 3: "abcdg", 4: "bcfg", 5: "acdfg", 6: "acdefg", 7: "abc", 8: "abcdefg", 9: "abcdfg" };
    const H = y => `1.6,${y} 2.6,${y - 1} 7.4,${y - 1} 8.4,${y} 7.4,${y + 1} 2.6,${y + 1}`;
    const V = (x, y1, y2) => `${x},${y1} ${x + 1},${y1 + 1} ${x + 1},${y2 - 1} ${x},${y2} ${x - 1},${y2 - 1} ${x - 1},${y1 + 1}`;
    const SHAPE = { a: H(1), b: V(9, 1.6, 8.4), c: V(9, 9.6, 16.4), d: H(17), e: V(1, 9.6, 16.4), f: V(1, 1.6, 8.4), g: H(9) };
    const svg = document.createElementNS(SVGNS, "svg");
    svg.setAttribute("class", "seg7");
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", text);
    const g = document.createElementNS(SVGNS, "g");
    g.setAttribute("transform", "skewX(-7)");
    const poly = (points, on) => { const e = document.createElementNS(SVGNS, "polygon"); e.setAttribute("points", points); e.setAttribute("fill", "currentColor"); e.setAttribute("opacity", on ? "1" : "0.12"); g.append(e); };
    const sq = (x, y, on) => poly(`${x},${y} ${x + 2},${y} ${x + 2},${y + 2} ${x},${y + 2}`, on);
    let x = 3;      // leaves room for the slant
    for (const ch of text) {
      const cell = document.createElementNS(SVGNS, "g");
      cell.setAttribute("transform", `translate(${x} 0)`);
      g.append(cell);
      const start = g.childNodes.length;
      if (ch === ":") { sq(1.5, 5, true); sq(1.5, 11, true); x += 5; }
      else if (ch === ".") { sq(1.5, 15, true); x += 5; }
      else if (SEGS[ch]) { for (const k of "abcdefg") poly(SHAPE[k], SEGS[ch].includes(k)); x += 12; }
      // move what this character drew into its own translated cell
      while (g.childNodes.length > start) cell.append(g.childNodes[start]);
    }
    svg.setAttribute("viewBox", `0 0 ${x + 2} 18`);
    svg.append(g);
    return svg;
  }

  /* a state's name: its colour is the outline, the letters are black or white, whichever reads better on that colour */
  function stateName(name) {
    const span = document.createElement("span");
    span.textContent = name;
    const st = window.CountellectBadge && window.CountellectBadge.STATE_STYLE && window.CountellectBadge.STATE_STYLE[name];
    const hex = st && String(st[0]).replace(/^#/, "");
    if (!hex || hex.length < 6) return span;
    const ch = i => { const v = parseInt(hex.substr(i * 2, 2), 16) / 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
    span.className = "st-name";
    span.style.setProperty("--sc", "#" + hex.slice(0, 6));
    span.style.color = 0.2126 * ch(0) + 0.7152 * ch(1) + 0.0722 * ch(2) > 0.179 ? "#000" : "#fff";
    return span;
  }

  /* several state names in a row, each in its own colours */
  function stateNames(names) {
    const frag = document.createDocumentFragment();
    names.forEach((n, i) => { if (i) frag.append(", "); frag.append(stateName(n)); });
    return frag;
  }

  window.CountellectRunStyle = { MODE_COLOR, sevenSeg, stateName, stateNames };
})();
