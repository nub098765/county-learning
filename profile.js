(function () {
  "use strict";
  const SUPABASE_URL = "https://jgwhnidtjnuufdjcmqdv.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impnd2huaWR0am51dWZkamNtcWR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIxOTE4MDgsImV4cCI6MjEwNzc2NzgwOH0.SsIHfT9TFvAYthQbwcD_Ee6W9T9a8yqlD2HfiAbcgCk";
  const A = window.ACHIEVEMENTS || {};
  const BA = window.CountellectBadge;
  const MODES = ["pin", "pin-hard", "mc", "type", "type-strict", "type-hard"];
  const MODE_LABEL = { pin: "Pin", "pin-hard": "Flash", mc: "Multiple-Choice", type: "List", "type-strict": "Type", "type-hard": "Identify" };
  const MODE_LETTER = { pin: "P", "pin-hard": "F", mc: "MC", type: "L", "type-strict": "T", "type-hard": "I" };
  const MAX_POINTS = 500000;
  const ULTIMATE_CHALLENGE_POINTS = 266260;
  const BADGE_WEIGHTS = { bronze: 2, silver: 3, gold: 5 };

  const $ = id => document.getElementById(id);
  const mk = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text !== undefined) n.textContent = text; return n; };
  const say = t => { $("p-msg").textContent = t || ""; };
  const show = (id, on) => $(id).classList.toggle("hidden", !on);
  let profilePresence = null;
  function renderProfilePresence() {
    if (!profilePresence) return;
    const online = window.countellectIsOnline?.(profilePresence.username) || false;
    profilePresence.status.classList.toggle("is-online", online);
    profilePresence.status.classList.toggle("presence-unavailable", window.countellectPresenceAvailable === false);
    profilePresence.status.lastElementChild.textContent = window.countellectPresenceAvailable === null
      ? "Checking status…"
      : !window.countellectPresenceAvailable ? "Status unavailable" : online ? "Online now" : "Offline";
  }
  window.addEventListener("countellect-presence-change", renderProfilePresence);

  if (!window.supabase) { say("Couldn't load the sign-in service. Check your connection and reload."); return; }
  const sb = window.countellectSupabase || window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  // Special badges shown at the bottom right of a player's profile picture. Add a line per player: lowercase username -> badge.
  // Example:  "somename": { src: "special-badge.png", label: "What this badge is" },
  const CHANNEL_OWNER = { src: "special-badge.png", label: "Channel Owner" };
  const WRENCH = { src: "wrench-special-badge.svg", label: "Playtester" };
  const SPECIAL_BADGES = {
    "mellohihellohi": CHANNEL_OWNER,
    "stalgoodman": CHANNEL_OWNER,
    "nub098765": CHANNEL_OWNER,
    "sponge99fvuj": CHANNEL_OWNER,
    "phil": WRENCH,
    "daydownerrr": WRENCH,
    "macheese": WRENCH,
    "gamergirljimmy": WRENCH,
    "goducks": WRENCH,
    "niceshirtbro": WRENCH
  };

  const wantedName = new URLSearchParams(location.search).get("u");   // profile.html?u=name shows that player
  let session = null, me = null;

  /* ---------- the map ---------- */
  const MODE_COLOR = { pin: "#3b82f6", "pin-hard": "#8b5cf6", mc: "#f59e0b", type: "#14b8a6", "type-hard": "#ec4899", "type-strict": "#ef4444" };
  const SVGNS = "http://www.w3.org/2000/svg";

  function buildMap(tiles) {
    const byName = {};
    tiles.forEach(t => { byName[t.name] = t; });
    const fills = [];
    let pinned = null;
    let capFill = true;
    try { capFill = localStorage.getItem("pmapCapFill") !== "0"; } catch (e) {}

    const wrap = mk("div", "pmap");
    const holder = mk("div", "pmap-holder");
    holder.innerHTML = window.US_MAP_SVG || "";
    const svg = holder.querySelector("svg");
    if (!svg) return mk("p", "info-intro", "Map file missing (us-map.js).");
    svg.classList.add("us-map");

       // the map's own state labels: keep the abbreviation, add the count next to it
    const labels = [...svg.querySelectorAll(".us-labels text")];
    // Hawaii's label sits on the Big Island by default: move it to the empty lower-left of its box and make it bigger
       // the not-to-scale boxes: bigger labels (Hawaii also moves to the empty lower-left of its box)
    const LABEL_OVERRIDE = { hi: { x: 303, y: 614, size: 18 }, ak: { size: 20 } };
    labels.forEach(l => {
      l.dataset.abbr = l.textContent;
      const o = LABEL_OVERRIDE[l.dataset.code];
      if (o) {
        if (o.x != null) { l.setAttribute("x", o.x); l.setAttribute("y", o.y); }
        l.style.fontSize = o.size + "px";
      }
    });
    const boxes = [...svg.querySelectorAll(".us-box")];
    const centerOf = path => {
      const coordinates = (path.getAttribute("d").match(/-?\d+\.?\d*/g) || []).map(Number);
      let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity;
      for (let i = 0; i + 1 < coordinates.length; i += 2) {
        minX = Math.min(minX, coordinates[i]);
        maxX = Math.max(maxX, coordinates[i]);
        minY = Math.min(minY, coordinates[i + 1]);
        maxY = Math.max(maxY, coordinates[i + 1]);
      }
      return [(minX + maxX) / 2, (minY + maxY) / 2];
    };
    const statePaths = [...svg.querySelectorAll("path.us-st")];
    boxes.forEach(box => {
      const x = parseFloat(box.getAttribute("x")), y = parseFloat(box.getAttribute("y"));
      const width = parseFloat(box.getAttribute("width")), height = parseFloat(box.getAttribute("height"));
      const statePath = statePaths.find(path => {
        const [centerX, centerY] = centerOf(path);
        return centerX >= x && centerX <= x + width && centerY >= y && centerY <= y + height;
      });
      const territoryLabel = labels.find(label => {
        if (label.style.textAnchor !== "start") return false;
        const labelX = parseFloat(label.getAttribute("x")), labelY = parseFloat(label.getAttribute("y"));
        return Math.abs(x - (labelX - 3.1)) < 1 && Math.abs(y - (labelY - 4.5)) < 1.5;
      });
      const stateName = statePath?.dataset.name || territoryLabel?.dataset.name;
      if (!stateName) return;
      const title = document.createElementNS(SVGNS, "title");
      title.textContent = stateName;
      box.prepend(title);
      box.style.pointerEvents = "all";
      box.style.cursor = "default";
    });

    const showMode = mode => {
      fills.forEach(({ t, r }) => {
        const x = mode ? t.per.find(q => q.m === mode) : null;
        r.style.fill = mode ? MODE_COLOR[mode] : "";
        const frac = x && t.total ? x.d / t.total : 0;
        const shown = (frac >= 1 || !capFill) ? frac : Math.min(frac, 0.8);   // 80% is the ceiling until every county is done
        r.style.transform = x ? `scaleY(${shown})` : "";
      });
      labels.forEach(l => {
        const t = byName[l.dataset.name];
        const x = mode && t ? t.per.find(q => q.m === mode) : null;
        l.textContent = l.dataset.abbr;       
        l.removeAttribute("transform");                // back to just "TX"
        if (!x) return;
        const b = parseFloat(l.style.fontSize) || 12;         // the abbreviation's size
        const count = `${x.d}/${t.total}`;
        const isCallout = l.classList.contains("callout");
        const isTerr = l.style.textAnchor === "start";        // PR, VI, MP, AS, GU sit in the corner of their box

        // where the pair is centered: the label itself, or the middle of the territory's box
         let cx = l.getAttribute("x");
         let boxW = 100;                                       // how wide the territory's box is: the count has to fit inside it
        if (isTerr) {
          const lx = parseFloat(cx), ly = parseFloat(l.getAttribute("y"));
          const box = boxes.find(r => Math.abs(parseFloat(r.getAttribute("x")) - (lx - 3.1)) < 1 &&
                                      Math.abs(parseFloat(r.getAttribute("y")) - (ly - 4.5)) < 1.5);
          if (box) { cx = parseFloat(box.getAttribute("x")) + parseFloat(box.getAttribute("width")) / 2; boxW = parseFloat(box.getAttribute("width")); }
        }

        const mkSpan = (txt, size, dy) => {
          const s = document.createElementNS(SVGNS, "tspan");
          s.textContent = txt;
          s.style.fontSize = size + "px";
          if (isTerr) s.style.textAnchor = "middle";
          if (dy !== null) { s.setAttribute("x", cx); s.setAttribute("dy", dy); }
          return s;
        };

        l.textContent = "";
        if (isCallout) {
          // the small states on the right have no room below, so the count goes beside the name
          l.append(mkSpan(l.dataset.abbr, b, null), mkSpan(" " + count, b * 0.75, null));
        } else {
          const ab = isTerr ? b * 1.4 : b;                       // territories get a bigger abbreviation
          const c = isTerr ? Math.min(b * 1.2, (boxW - 4) / (count.length * 0.62)) : Math.max(b * 0.6, 8);   // and a bigger count, but never wider than their box
          const first = isTerr ? ab * 0.72 - 1 : -c * 0.55;             // territories drop below their border line
             l.append(mkSpan(l.dataset.abbr, ab, first), mkSpan(count, c, ab * 0.15 + c * 0.85 + 1));
             if (!isTerr) {
               // measure the two lines together and center that block on the label's original spot
               const bb = l.getBBox();
               const ox = parseFloat(l.getAttribute("x")), oy = parseFloat(l.getAttribute("y"));
               l.setAttribute("transform", `translate(${ox - (bb.x + bb.width / 2)}, ${oy - (bb.y + bb.height / 2)})`);
             }
        }
      });
      svg.classList.toggle("by-mode", !!mode);
    };

    // getBBox needs the svg to be on the page, so set the overlays up a frame later
    requestAnimationFrame(() => {
      svg.querySelectorAll("path.us-st").forEach((p, i) => {
        const t = byName[p.dataset.name];
        if (!t) { console.warn("profile map: no data for", p.dataset.name); return; }
        p.classList.toggle("gold", t.badgeFull === MODES.length);
        const b = p.getBBox();
        let defs = svg.querySelector("defs");
        if (!defs) { defs = document.createElementNS(SVGNS, "defs"); svg.insertBefore(defs, svg.firstChild); }
        const cp = document.createElementNS(SVGNS, "clipPath");
        cp.id = "pm-clip-" + i;
        const c = p.cloneNode(false);
        ["id", "class", "transform"].forEach(a => c.removeAttribute(a));
        cp.appendChild(c);
        defs.appendChild(cp);

        const g = document.createElementNS(SVGNS, "g");
        const tr = p.getAttribute("transform");
        if (tr) g.setAttribute("transform", tr);
        g.setAttribute("clip-path", `url(#${cp.id})`);
        g.setAttribute("pointer-events", "none");
        const r = document.createElementNS(SVGNS, "rect");
        r.setAttribute("x", b.x); r.setAttribute("y", b.y);
        r.setAttribute("width", b.width); r.setAttribute("height", b.height);
        r.setAttribute("class", "pmap-fill");
        g.appendChild(r);
        p.after(g);
        fills.push({ t, r });
      });
      showMode(pinned);
    });

    const key = mk("div", "pmap-key");
    const staticItem = (color, label) => {
      const s = mk("span", "pmap-key-item static");
      const sw = mk("span", "pmap-swatch"); sw.style.background = color;
      s.append(sw, label); return s;
    };
    const legendRow = mk("div", "pmap-key-row");
    legendRow.append(staticItem("var(--pm-done)", "All 6 modes done"), staticItem("var(--pm-track)", "Not yet"));    const buttons = MODES.map(m => {
      const b = mk("button", "pmap-key-item"); b.type = "button";
      const sw = mk("span", "pmap-swatch"); sw.style.background = MODE_COLOR[m];
      b.append(sw, MODE_LABEL[m]);
      b.addEventListener("mouseenter", () => showMode(m));
      b.addEventListener("focus", () => showMode(m));
      b.addEventListener("mouseleave", () => showMode(pinned));
      b.addEventListener("blur", () => showMode(pinned));
      b.addEventListener("click", () => {            // click/tap pins it (needed on phones)
        pinned = pinned === m ? null : m;
        buttons.forEach((x, i) => x.setAttribute("aria-pressed", String(MODES[i] === pinned)));
        showMode(pinned);
      });
      return b;
    });
    const modeRow = mk("div", "pmap-key-row");
    modeRow.append(...buttons);
    const capLabel = mk("label", "pmap-cap");
    const capBox = document.createElement("input"); capBox.type = "checkbox"; capBox.checked = capFill;
    capBox.addEventListener("change", () => {
      capFill = capBox.checked;
      try { localStorage.setItem("pmapCapFill", capFill ? "1" : "0"); } catch (e) {}
      showMode(pinned);
    });
    capLabel.append(capBox, " Stop at 80% until a state is fully done");
    key.append(legendRow, modeRow, capLabel);

    wrap.append(key, holder);
    return wrap;
  }

     /* ---------- how points work (opens from the button in the top corner) ---------- */
  // each state's name colours from the points sheet: [background, text]
  const STATE_STYLE = BA.STATE_STYLE;
  const MULT_BG = { 0: "#F4CCCC", 1: "#FFF2CC", 2: "#D9EAD3", 3: "#CFE2F3", 4: "#D9D2E9" };
  const POINT_HEAD = Object.fromEntries(MODES.map(mode => [mode, [MODE_COLOR[mode], "#fff"]]));

  let pointsData = null;
  async function loadPointsData() {
    if (pointsData) return pointsData;
    const [s, wt] = await Promise.all([
      sb.from("state_multipliers").select("state_key, name, multiplier, county_count").order("name"),
      sb.from("mode_weights").select("mode, weight")
    ]);
    const err = s.error || wt.error;
    if (err) throw new Error(err.message);
    const w = {};
    (wt.data || []).forEach(r => { w[r.mode] = r.weight; });
    pointsData = { rows: s.data || [], w };
    return pointsData;
  }

  function pointsTable({ rows, w }) {
    const cell = (tag, text, bg, fg, cls) => {
      const n = mk(tag, cls || "", String(text));
      if (bg) n.style.background = bg;
      if (fg) n.style.color = fg;
      return n;
    };
    const fmt = n => n.toLocaleString();
    const dark = "#1c1c1a";

    const hr = mk("tr");
    hr.append(
      cell("th", "STATE", "#D9D2E9", dark, "pp-state"),
      cell("th", "# OF COUNTIES", "#EFEFEF", dark),
      cell("th", "STATE SPECIFIC MULTIPLIER", "#EFEFEF", dark),
      ...MODES.map(m => cell("th", `${MODE_LABEL[m].toUpperCase()} (${w[m] || 0})`, POINT_HEAD[m][0], POINT_HEAD[m][1])),
      cell("th", "BRONZE BADGE (100% RUN IN 1–2 GAME MODES) (2)", "#b0703c", "#fff"),
      cell("th", "SILVER BADGE (100% RUN IN 3–5 GAME MODES) (3)", "#b8c0cc", dark),
      cell("th", "GOLD BADGE (100% RUN IN 6 GAME MODES) (5)", "#d4a017", dark),
      cell("th", "HIGHEST POSSIBLE SCORE", "#081B39", "#fff"));
    const thead = mk("thead");
    thead.append(hr);

    const totals = MODES.map(() => 0);
    const badgeTotals = Object.fromEntries(Object.keys(BADGE_WEIGHTS).map(tier => [tier, 0]));
    let totalCounties = 0, countyGrand = 0, badgeGrand = 0;
    const tbody = mk("tbody");
    rows.forEach(s => {
      const st = STATE_STYLE[s.name];
      const per = MODES.map(m => s.county_count * s.multiplier * (w[m] || 0));
      const badge = Object.fromEntries(Object.entries(BADGE_WEIGHTS).map(([tier, weight]) =>
        [tier, s.county_count * s.multiplier * weight]));
      const max = per.reduce((a, b) => a + b, 0) + Object.values(badge).reduce((a, b) => a + b, 0);
      per.forEach((v, i) => { totals[i] += v; });
      Object.keys(badgeTotals).forEach(tier => { badgeTotals[tier] += badge[tier]; });
      totalCounties += s.county_count;
      countyGrand += per.reduce((a, b) => a + b, 0);
      badgeGrand += Object.values(badge).reduce((a, b) => a + b, 0);
      const tr = mk("tr");
      tr.append(
        cell("td", s.name, st && "#" + st[0], st && "#" + st[1], "pp-state"),
        cell("td", s.county_count),
        cell("td", s.multiplier, MULT_BG[s.multiplier], dark),
        ...per.map(v => cell("td", fmt(v))),
        ...Object.values(badge).map(v => cell("td", fmt(v))),
        cell("td", fmt(max)));
      tbody.append(tr);
    });

    const tuc = ULTIMATE_CHALLENGE_POINTS;
    const footRow = (label, amount, labelBg, labelFg, amountBg, amountFg) => {
      const tr = mk("tr", "pp-total");
      tr.append(cell("td", label, labelBg, labelFg, "pp-state"));
      for (let i = 0; i < MODES.length + 5; i++) tr.append(cell("td", ""));
      tr.append(cell("td", amount, amountBg, amountFg));
      return tr;
    };
    const tfoot = mk("tfoot");
    const totalRow = mk("tr", "pp-total");
    totalRow.append(
      cell("td", "Total", "#081B39", "#fff", "pp-state"),
      cell("td", fmt(totalCounties)),
      cell("td", ""),
      ...totals.map(v => cell("td", fmt(v))),
      ...Object.values(badgeTotals).map(v => cell("td", fmt(v))),
      cell("td", fmt(countyGrand + badgeGrand)));
    tfoot.append(
      totalRow,
      footRow("THE ULTIMATE CHALLENGE", fmt(tuc), "#CE4E2C", "#fff"),
      footRow("HIGHEST POSSIBLE SCORE", fmt(countyGrand + badgeGrand + tuc), "#081B39", "#fff", "#2d5a27", "#fff"));

    const table = mk("table", "pp-table");
    table.append(thead, tbody, tfoot);

    return table;
  }

  async function openPoints(returnToLeaderboard) {
    if ($("pp-overlay")) return;
    const overlay = mk("div", "pp-overlay");
    overlay.id = "pp-overlay";
    const card = mk("div", "pp-card");
    const top = mk("div", "pp-top");
    const close = mk("button", "pp-close", "Close");
    close.type = "button";
    top.append(mk("p", "pp-note", "When you find a county in a state, you earn points for that county. Perfect full-state runs earn stacking badge bonuses: Bronze (1–2 modes), Silver (3–5), and Gold (all 6). Beat the Ultimate Challenge for 266,260 points."), close);
    const body = mk("div", "pp-body", "Loading…");
    card.append(top, body);
    overlay.append(card);
    document.body.append(overlay);
    const onKey = e => { if (e.key === "Escape") shut(); };
    const shut = () => { overlay.remove(); document.removeEventListener("keydown", onKey); if (returnToLeaderboard === true) location.href = "leaderboard.html"; };
    document.addEventListener("keydown", onKey);
    close.addEventListener("click", shut);
    overlay.addEventListener("click", e => { if (e.target === overlay) shut(); });
    try { body.replaceChildren(pointsTable(await loadPointsData())); }
    catch (e) { body.textContent = "Couldn't load the points table: " + e.message; }
  }

    // shrink long state names until they fit on two lines
   /* ---------- medals ---------- */
  const { TIER, TIER_RING, discSvg, shapeFor } = BA;
  const badgeSvg = t => BA.badgeSvg(t.name, t.badgeFull);

  function stateMedal(t) {
    const tier = TIER(t.badgeFull);
    const el = mk("div", "medal clickable " + tier);
    el.tabIndex = 0;
    el.setAttribute("role", "button");
    el.setAttribute("aria-label", `${t.name}: see details`);
    const pips = mk("div", "medal-pips");
    t.per.forEach(x => { const p = mk("span", "medal-pip" + (x.badgeEarned ? " on" : "")); p.style.setProperty("--c", MODE_COLOR[x.m]); pips.append(p); });
    el.append(badgeSvg(t), mk("div", "medal-name", t.name), pips);
    el.addEventListener("click", () => openStateDetail(t));
    el.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); openStateDetail(t); } });
    return el;
  }

  // the screen that opens when you click a state's badge
  function openStateDetail(t) {
    const tier = TIER(t.badgeFull);
    const TIER_LABEL = { gold: "Gold", silver: "Silver", bronze: "Bronze", locked: "Not started" };
    const doneAll = t.per.reduce((a, x) => a + x.d, 0), totalAll = t.total * MODES.length;
    const pct = totalAll ? Math.round((doneAll / totalAll) * 100) : 0;

    const overlay = mk("div", "modal");
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", t.name + " details");
    const card = mk("div", "modal-content sd-card");

    const onKey = e => { if (e.key === "Escape") close(); };
    const close = () => { overlay.remove(); document.removeEventListener("keydown", onKey); };
    document.addEventListener("keydown", onKey);
    overlay.addEventListener("click", e => { if (e.target === overlay) close(); });

    const x = mk("button", "sd-close", "×");
    x.type = "button";
    x.setAttribute("aria-label", "Close");
    x.addEventListener("click", close);

    const badge = badgeSvg(t);
    badge.classList.add("sd-badge");

    const rows = mk("div", "sd-rows");
    t.per.forEach(r => {
      const row = mk("div", "sd-row" + (r.badgeEarned ? " full" : ""));
      const label = mk("span", "sd-mode");
      const dot = mk("span", "sd-dot");
      dot.style.background = MODE_COLOR[r.m];
      label.append(dot, MODE_LABEL[r.m]);
      const bar = mk("div", "sd-bar"), fill = mk("div", "sd-bar-fill");
      fill.style.width = (t.total ? (r.d / t.total) * 100 : 0) + "%";
      fill.style.background = MODE_COLOR[r.m];
      bar.append(fill);
      row.append(label, bar, mk("span", "sd-count", (r.badgeEarned ? "\u2713 " : "") + r.d + "/" + t.total));
      rows.append(row);
    });

    const foot = mk("div", "sd-foot",
      `${Math.round(t.pts).toLocaleString()} of ${Math.round(t.maxPts).toLocaleString()} points from this state` +
      ` \u00b7 \u00d7${Number(t.mult)} multiplier`);

    card.append(
      x, badge,
      mk("h2", "sd-title", t.name),
      mk("div", "sd-sub", `${TIER_LABEL[tier]} \u00b7 ${t.badgeFull} of ${MODES.length} modes mastered`),
      mk("p", "sd-foot", "A mode badge requires a perfect full-state run."),
      mk("div", "sd-pct", pct + "%"),
      mk("div", "sd-pct-label", `${doneAll} of ${totalAll} done`),
      rows, foot);
    overlay.append(card);
    document.body.append(overlay);
    fitShapes(overlay);
    x.focus();
  }

  function badgeMedal(a) {
    const el = mk("div", "medal achievement " + (a.earned ? "gold" : "locked"));
    el.title = a.label + (a.sub ? " — " + a.sub : "") +
      (a.earnedAt ? " — Earned " + new Date(a.earnedAt).toLocaleDateString() : "");
    const svg = discSvg(a.earned ? a.color : TIER_RING.locked, !a.earned);
    const fillColor = a.earned ? a.color : "currentColor";
    if (a.splitStates) {
      const [first, second] = a.splitStates;
      svg.querySelector(".medal-face").style.fill = "transparent";
      const gradientId = "medal-split-" + a.label.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const defs = svgEl("defs", {});
      const clipId = gradientId + "-inside";
      const clip = svgEl("clipPath", { id: clipId });
      clip.append(svgEl("circle", { cx: 50, cy: 50, r: 43.5 }));
      defs.append(clip);
      svg.insertBefore(defs, svg.firstChild);
      svg.querySelector(".medal-ring").setAttribute("stroke", "none");
      const details = svgEl("g", { "clip-path": `url(#${clipId})` });
      svg.append(details);
      const divider = { x1: 10, y1: 90, x2: 90, y2: 10 };
      details.append(
        svgEl("line", {
          ...divider, transform: "translate(-1.05 -1.05)",
          stroke: "#" + STATE_STYLE[first][0], "stroke-width": 3
        }),
        svgEl("line", {
          ...divider, transform: "translate(1.05 1.05)",
          stroke: "#" + STATE_STYLE[second][0], "stroke-width": 3
        })
      );

      [
        { name: first, x: 15, y: 15 },
        { name: second, x: 45, y: 45 }
      ].forEach(({ name, x, y }) => {
        const d = shapeFor(name);
        if (!d) return;
        const icon = svgEl("svg", {
          x, y, width: 40, height: 40, viewBox: "0 0 100 100",
          preserveAspectRatio: "xMidYMid meet", class: "medal-shape", "data-fit": 50     // small icon: fill its own box
        });
        const group = svgEl("g", {});
        group.append(svgEl("path", {
          d, "fill-rule": "evenodd", "vector-effect": "non-scaling-stroke",
          fill: "none",
          stroke: "#" + STATE_STYLE[name][0],
          "stroke-width": 1.5,
          "stroke-linejoin": "round",
          "stroke-linecap": "round"
        }));
        icon.append(group);
        details.append(icon);
      });
      const halfCircumference = 144.513;
      [
        [second, 0],
        [first, halfCircumference]
      ].forEach(([name, offset]) => {
        svg.append(svgEl("circle", {
          cx: 50, cy: 50, r: 46,
          stroke: "#" + STATE_STYLE[name][0],
          "stroke-width": 5,
          "stroke-dasharray": a.earned ? `${halfCircumference} ${halfCircumference}` : "3 5",
          "stroke-dashoffset": offset,
          transform: "rotate(-45 50 50)",
          fill: "none"
        }));
      });
    } else if (a.icon === "flame") {
      svg.append(svgEl("path", { d: "M50 22 C58 34 71 41 67 58 C65 69 58 76 50 76 C42 76 35 69 33 58 C31 50 37 45 41 39 C43 45 46 47 50 45 C53 39 51 31 50 22 Z", fill: fillColor }));
    } else {
      const g = String(a.glyph);
      const t = svgEl("text", { x: 50, y: 50, "text-anchor": "middle", "dominant-baseline": "central", class: "medal-glyph", fill: fillColor, "font-size": g.length >= 4 ? 20 : g.length === 3 ? 24 : 30 });
      t.textContent = g;
      svg.append(t);
    }
    el.append(svg, mk("div", "medal-name", a.label), mk("div", "medal-sub", a.sub || ""));
    return el;
  }

  // size each state's silhouette to its own outline (needs the medals to be on the page)
  const fitShapes = root => BA.fit(root);

  // shrink long names until they fit on two lines
  function fitNames(root) {
    root.querySelectorAll(".medal-name").forEach(el => {
      el.style.fontSize = "";
      let size = parseFloat(getComputedStyle(el).fontSize);
      const lines = () => el.offsetHeight / (parseFloat(getComputedStyle(el).lineHeight) || size * 1.2);
      while (lines() > 2.2 && size > 8) { size -= 0.5; el.style.fontSize = size + "px"; }
    });
  }
  
  /* ---------- progress charts ---------- */
  const dayKey = iso => { const d = new Date(iso); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); };
  const dayLabel = k => { const [y, m, d] = k.split("-").map(Number); return new Date(y, m - 1, d).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }); };
  const svgEl = (tag, attrs) => { const n = document.createElementNS(SVGNS, tag); for (const k in attrs) n.setAttribute(k, attrs[k]); return n; };

  async function fetchCompletions(userId) {
    const rows = [];
    for (let from = 0; ; from += 1000) {
      const result = await sb.from("completions").select("county_id, state_key, mode, completed_at, game_run_id").eq("user_id", userId).order("completed_at").range(from, from + 999);
      if (result.error) return result;
      rows.push(...(result.data || []));
      if (!result.data || result.data.length < 1000) return { data: rows, error: null };
    }
  }

  async function fetchStateRuns(userId) {
    const rows = [];
    for (let from = 0; ; from += 1000) {
      const result = await sb.from("state_runs").select("id, state_key, mode, time_ms, completed_at, game_run_id").eq("user_id", userId).order("completed_at").order("state_key").order("mode").order("id").range(from, from + 999);
      if (result.error) return result;
      rows.push(...(result.data || []));
      if (!result.data || result.data.length < 1000) return { data: rows, error: null };
    }
  }

  function modeBars(tiles) {
    const total = tiles.reduce((a, t) => a + t.total, 0);
    const wrap = mk("div", "pc-bars");
    MODES.forEach(m => {
      const found = tiles.reduce((a, t) => a + t.per.find(x => x.m === m).d, 0);
      const row = mk("div", "pc-bar-row");
      const track = mk("div", "pc-bar-track"), fill = mk("div", "pc-bar-fill");
      fill.style.width = (found ? Math.max(0.6, found / total * 100) : 0) + "%";
      fill.style.background = MODE_COLOR[m];
      track.append(fill);
      row.append(mk("span", "pc-bar-label", MODE_LABEL[m]), track, mk("span", "pc-bar-num", found.toLocaleString()));
      row.title = `${MODE_LABEL[m]}: ${found.toLocaleString()} of ${total.toLocaleString()} counties`;
      wrap.append(row);
    });
    return wrap;
  }

  function modeOverlap(rows, tiles) {
    const countyModes = new Map();
    rows.forEach(row => {
      if (!MODES.includes(row.mode)) return;
      const key = `${row.state_key}:${row.county_id}`;
      if (!countyModes.has(key)) countyModes.set(key, new Set());
      countyModes.get(key).add(row.mode);
    });

    const counts = Array(MODES.length).fill(0);
    countyModes.forEach(modes => { counts[modes.size - 1] += 1; });
    const total = tiles.reduce((sum, tile) => sum + tile.total, 0);
    const wrap = mk("section", "pc-sec");
    wrap.append(mk("h3", "pc-title", "Counties by number of modes learned in"));

    const bars = mk("div", "pc-bars");
    counts.forEach((count, index) => {
      const row = mk("div", "pc-bar-row");
      const track = mk("div", "pc-bar-track"), fill = mk("div", "pc-bar-fill");
      fill.style.width = (total ? count / total * 100 : 0) + "%";
      fill.style.background = "#6FA3D8";
      track.append(fill);
      row.append(mk("span", "pc-bar-label", `${index + 1} mode${index ? "s" : ""}`), track, mk("span", "pc-bar-num", count.toLocaleString()));
      row.title = `${count.toLocaleString()} of ${total.toLocaleString()} counties learned in exactly ${index + 1} mode${index ? "s" : ""}`;
      bars.append(row);
    });
    wrap.append(bars);
    return wrap;
  }

    function niceCeil(v) {       // a tidy top for the axis, a little above the highest value
    const target = Math.max(v, 1) * 1.05, mag = Math.pow(10, Math.floor(Math.log10(target)));
    return mag * ([1, 1.2, 1.6, 2, 2.4, 3, 4, 5, 6, 8, 10].find(s => s * mag >= target));
  }

  function pointsDays(rows, tiles, w, who, tucDay, stateRuns) {
    const info = {};
    tiles.forEach(t => { info[t.key] = t; });
    const counted = {}, add = {};
    rows.forEach(r => {      // rows come back in time order
      const t = info[r.state_key], wt = w[r.mode] || 0;
      if (!t || !wt || !t.mult) return;
      const k = r.state_key + "|" + r.mode;
      counted[k] = (counted[k] || 0) + 1;
      if (counted[k] > t.total) return;     // the database stops counting at the state's county count
      const d = dayKey(r.completed_at);
      add[d] = (add[d] || 0) + t.mult * wt;
    });
    const modesByState = new Map();
    (stateRuns || []).forEach(run => {
      const tile = info[run.state_key];
      if (!tile || !MODES.includes(run.mode)) return;
      const modes = modesByState.get(run.state_key) || new Map();
      if (!modes.has(run.mode)) modes.set(run.mode, run.completed_at);
      else if (run.completed_at < modes.get(run.mode)) modes.set(run.mode, run.completed_at);
      modesByState.set(run.state_key, modes);
    });
    modesByState.forEach((modeDates, stateKey) => {
      const tile = info[stateKey];
      const earned = [...modeDates.values()].sort();
      [[1, BADGE_WEIGHTS.bronze], [3, BADGE_WEIGHTS.silver], [6, BADGE_WEIGHTS.gold]].forEach(([threshold, weight]) => {
        if (earned.length < threshold) return;
        const date = earned[threshold - 1];
        const day = dayKey(date);
        add[day] = (add[day] || 0) + tile.total * tile.mult * weight;
      });
    });
    let note = "Progress from before tracking began is counted on the first day shown.";
    if (who.has_tuc) {
      const keys = Object.keys(add).sort();
      const d = tucDay || keys[keys.length - 1] || dayKey(new Date());
      add[d] = (add[d] || 0) + ULTIMATE_CHALLENGE_POINTS;
      if (!tucDay) note += " The Ultimate Challenge bonus is shown on the last day, since its date isn't visible on other profiles.";
    }
    let n = 0;
    const days = Object.keys(add).sort().map(k => ({ key: k, n: (n += add[k]) }));
    return { days, note };
  }

  function lineChart(days, unit = "counties", compact = false) {      // days: [{key, n}] cumulative, sorted
    if (days.length === 1) {                 // one active day would draw as a lone dot, so start the line the day before at 0
      const before = new Date(days[0].key + "T00:00:00");
      before.setDate(before.getDate() - 1);
      days = [{ key: dayKey(before), n: 0 }, days[0]];
    }
    const W = compact ? 420 : 600, H = compact ? 210 : 190, L = unit === "points" ? 54 : 40, R = 14, T = 12, B = 26;
    const wrap = mk("div", "pc-line");
    const svg = svgEl("svg", { viewBox: `0 0 ${W} ${H}`, class: "pc-svg", role: "img" });
    const max = days[days.length - 1].n;
    const niceMax = unit === "points"
      ? Math.min(MAX_POINTS, niceCeil(max))
      : Math.max(10, Math.ceil(max / 50) * 50 > max * 1.6 ? Math.ceil(max / 10) * 10 : Math.ceil(max / 50) * 50);
    const x = i => days.length === 1 ? (L + W - R) / 2 : L + (W - L - R) * i / (days.length - 1);
    const y = n => T + (H - T - B) * (1 - n / niceMax);
    [0, 0.5, 1].forEach(f => {
      const yy = y(niceMax * f);
      svg.append(svgEl("line", { x1: L, x2: W - R, y1: yy, y2: yy, class: "pc-grid" }));
      const t = svgEl("text", { x: L - 6, y: yy + 4, class: "pc-tick", "text-anchor": "end" });
      t.textContent = Math.round(niceMax * f).toLocaleString();
      svg.append(t);
    });
    [0, days.length - 1].forEach((i, k) => {
      if (k === 1 && days.length === 1) return;
      const t = svgEl("text", { x: x(i), y: H - 6, class: "pc-tick", "text-anchor": days.length === 1 ? "middle" : (k ? "end" : "start") });
      t.textContent = dayLabel(days[i].key);
      svg.append(t);
    });
    if (days.length > 1) {
      const d = days.map((p, i) => (i ? "L" : "M") + x(i).toFixed(1) + " " + y(p.n).toFixed(1)).join(" ");
      svg.append(svgEl("path", { d: `${d} L${x(days.length - 1)} ${y(0)} L${x(0)} ${y(0)} Z`, class: "pc-area" }));
      svg.append(svgEl("path", { d, class: "pc-path" }));
    }
    const dot = svgEl("circle", { r: 4.5, class: "pc-dot", cx: x(days.length - 1), cy: y(max) });
    const cross = svgEl("line", { y1: T, y2: H - B, class: "pc-cross", visibility: "hidden" });
    svg.append(cross, dot);
    const tip = mk("div", "pc-tip hidden");
    const move = e => {
      const r = svg.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width * W;
      let best = 0;
      days.forEach((p, i) => { if (Math.abs(x(i) - px) < Math.abs(x(best) - px)) best = i; });
      cross.setAttribute("x1", x(best)); cross.setAttribute("x2", x(best)); cross.setAttribute("visibility", "visible");
      dot.setAttribute("cx", x(best)); dot.setAttribute("cy", y(days[best].n));
     tip.textContent = `${dayLabel(days[best].key)} · ${days[best].n.toLocaleString()} ${unit}`;
      tip.classList.remove("hidden");
      tip.style.left = Math.min(Math.max(x(best) / W * 100, 18), 82) + "%";
    };
    const leave = () => {
      cross.setAttribute("visibility", "hidden"); tip.classList.add("hidden");
      dot.setAttribute("cx", x(days.length - 1)); dot.setAttribute("cy", y(max));
    };
    svg.addEventListener("pointermove", move);
    svg.addEventListener("pointerleave", leave);
    svg.setAttribute("aria-label", `${unit === "points" ? "Points" : "Counties found"} over time, ${max.toLocaleString()} so far`);
    wrap.append(svg, tip);
    return wrap;
  }

  function activityGrid(perDay) {     // perDay: { "YYYY-MM-DD": rows }
    const WEEKS = 14;
    const today = new Date(); today.setHours(0, 0, 0, 0);
    const start = new Date(today); start.setDate(start.getDate() - (WEEKS * 7 - 1) - today.getDay());
    const grid = mk("div", "pc-act");
    for (let d = new Date(start); d <= today; d.setDate(d.getDate() + 1)) {
      const k = dayKey(d), n = perDay[k] || 0;
      const lvl = n === 0 ? 0 : n <= 5 ? 1 : n <= 25 ? 2 : n <= 100 ? 3 : 4;
      const c = mk("span", "pc-cell l" + lvl);
      c.title = `${dayLabel(k)}: ${n ? n + " answers" : "no activity"}`;
      grid.append(c);
    }
    return grid;
  }

  function buildCharts(tiles, w, who, stateRuns, rows, tucCompletedAt) {
    const box = mk("div", "pc");
    const bars = mk("section", "pc-sec");
    bars.append(mk("h3", "pc-title", "Counties by mode"), modeBars(tiles));
    const overlap = mk("section", "pc-sec");
    box.append(bars, overlap);
    const hist = mk("section", "pc-sec");
    box.append(hist);
    overlap.replaceChildren(modeOverlap(rows, tiles));
    if (!rows.length) { hist.remove(); return box; }
    const first = {}, perDay = {};
    rows.forEach(r => {
      const k = dayKey(r.completed_at);
      perDay[k] = (perDay[k] || 0) + 1;
      if (!first[r.county_id] || k < first[r.county_id]) first[r.county_id] = k;
    });
    const newPerDay = {};
    Object.values(first).forEach(k => { newPerDay[k] = (newPerDay[k] || 0) + 1; });
    let n = 0;
    const days = Object.keys(newPerDay).sort().map(k => ({ key: k, n: (n += newPerDay[k]) }));

    const pair = mk("div", "pc-pair");
    const left = mk("div", "pc-half");
    left.append(mk("h3", "pc-title", "Counties found over time"), lineChart(days, "counties", true));
    pair.append(left);
    hist.append(pair);

    const tucDay = tucCompletedAt ? dayKey(tucCompletedAt) : null;
    const pts = pointsDays(rows, tiles, w, who, tucDay, stateRuns);
    let note = "Progress from before tracking began is counted on the first day shown.";
    if (pts.days.length) {
      const right = mk("div", "pc-half");
      right.append(mk("h3", "pc-title", "Points over time"), lineChart(pts.days, "points", true));
      pair.append(right);
      note = pts.note;
    }
    hist.append(mk("p", "pc-note", note), mk("h3", "pc-title", "Recent activity"), activityGrid(perDay));
    return box;
  }

  function achievementUnlockDates(tiles, stateRuns, completions, weights, tucCompletedAt) {
    const compareDates = (a, b) => Date.parse(a) - Date.parse(b);
    const minDate = dates => dates.filter(Boolean).sort(compareDates)[0] || null;
    const maxDate = dates => {
      const valid = dates.filter(Boolean).sort(compareDates);
      return valid.length ? valid[valid.length - 1] : null;
    };
    const tileByState = new Map(tiles.map(tile => [tile.key, tile]));
    const firstRunByState = new Map();
    const firstRunByMode = new Map();
    const fastRunByState = new Map();

    stateRuns.forEach(run => {
      if (!MODES.includes(run.mode) || !run.completed_at || !tileByState.has(run.state_key)) return;
      const stateRunsByMode = firstRunByState.get(run.state_key) || new Map();
      const previous = stateRunsByMode.get(run.mode);
      if (!previous || compareDates(run.completed_at, previous) < 0) stateRunsByMode.set(run.mode, run.completed_at);
      firstRunByState.set(run.state_key, stateRunsByMode);

      const modeRuns = firstRunByMode.get(run.mode) || new Map();
      const firstForState = modeRuns.get(run.state_key);
      if (!firstForState || compareDates(run.completed_at, firstForState) < 0) modeRuns.set(run.state_key, run.completed_at);
      firstRunByMode.set(run.mode, modeRuns);

      const tile = tileByState.get(run.state_key);
      if (Number(run.time_ms) <= tile.total * 3000) {
        const fastDate = fastRunByState.get(run.state_key);
        if (!fastDate || compareDates(run.completed_at, fastDate) < 0) fastRunByState.set(run.state_key, run.completed_at);
      }
    });

    const goldDateByState = new Map();
    const firstModeDateByState = new Map();
    tiles.forEach(tile => {
      const modeDates = [...(firstRunByState.get(tile.key) || new Map()).values()];
      if (modeDates.length === MODES.length) goldDateByState.set(tile.key, maxDate(modeDates));
      if (modeDates.length) firstModeDateByState.set(tile.key, minDate(modeDates));
    });
    const goldDates = [...goldDateByState.values()].sort(compareDates);
    const dates = {
      "Participation Trophy": minDate([...firstRunByState.values()].flatMap(runs => [...runs.values()])),
      "Gold Star": goldDates[0] || null,
      "Getting Them Over With": maxDate(["district_of_columbia", "guam"].map(key => goldDateByState.get(key))),
      "Gold Ring": goldDates[4] || null,
      "Gold Necklace": goldDates[9] || null,
      "Gold Rush": goldDates[24] || null,
      "County Master": goldDates[56] || null,
      "Jack of All Trades": maxDate(tiles.map(tile => firstModeDateByState.get(tile.key))),
      "No Time to Waste": maxDate(tiles.map(tile => fastRunByState.get(tile.key))),
      "County God": tucCompletedAt || null
    };

    const allModeDates = {};
    MODES.forEach(mode => {
      const modeDates = firstRunByMode.get(mode);
      allModeDates[mode] = maxDate(tiles.map(tile => modeDates?.get(tile.key)));
    });
    dates["Put Your Finger On It"] = allModeDates.pin;
    dates["Know It in a Flash"] = allModeDates["pin-hard"];
    dates["Made The Right Choice"] = allModeDates.mc;
    dates["Checking It Twice"] = allModeDates.type;
    dates["Infinite Monkey Theorem"] = allModeDates["type-strict"];
    dates["This One Is Washington"] = allModeDates["type-hard"];

    const pointEvents = [];
    const countyCounts = new Map();
    const concentratedEffortEvents = [];
    completions.forEach(row => {
      const tile = tileByState.get(row.state_key);
      const weight = weights[row.mode] || 0;
      if (!tile || !weight || !row.completed_at) return;
      const countyKey = `${row.state_key}|${row.mode}`;
      const count = (countyCounts.get(countyKey) || 0) + 1;
      countyCounts.set(countyKey, count);
      if (count <= tile.total) pointEvents.push({ at: row.completed_at, points: tile.mult * weight });
      if (row.game_run_id) {
        concentratedEffortEvents.push({ at: row.completed_at, runId: row.game_run_id, points: tile.mult * weight });
      }
    });

    const firstRunRowByStateMode = new Map();
    stateRuns.forEach(run => {
      const key = `${run.state_key}|${run.mode}`;
      if (!run.completed_at || !MODES.includes(run.mode) || !tileByState.has(run.state_key)) return;
      if (!firstRunRowByStateMode.has(key)) firstRunRowByStateMode.set(key, run);
    });
    const badgeRunsByState = new Map();
    firstRunRowByStateMode.forEach(run => {
      const runs = badgeRunsByState.get(run.state_key) || [];
      runs.push(run);
      badgeRunsByState.set(run.state_key, runs);
    });
    badgeRunsByState.forEach((runs, stateKey) => {
      const tile = tileByState.get(stateKey);
      runs.sort((a, b) => compareDates(a.completed_at, b.completed_at) || a.mode.localeCompare(b.mode));
      [[1, BADGE_WEIGHTS.bronze], [3, BADGE_WEIGHTS.silver], [6, BADGE_WEIGHTS.gold]].forEach(([threshold, weight]) => {
        const run = runs[threshold - 1];
        if (!run) return;
        pointEvents.push({ at: run.completed_at, points: tile.total * tile.mult * weight });
        if (!run.game_run_id) return;
        concentratedEffortEvents.push({
          at: run.completed_at,
          runId: run.game_run_id,
          points: tile.total * tile.mult * weight
        });
      });
    });
    concentratedEffortEvents.sort((a, b) => compareDates(a.at, b.at));
    const concentratedEffortTotals = new Map();
    concentratedEffortEvents.forEach(event => {
      const total = (concentratedEffortTotals.get(event.runId) || 0) + event.points;
      concentratedEffortTotals.set(event.runId, total);
      if (total >= 1000 && !dates["Concentrated Effort"]) dates["Concentrated Effort"] = event.at;
    });
    if (tucCompletedAt) pointEvents.push({ at: tucCompletedAt, points: ULTIMATE_CHALLENGE_POINTS });
    pointEvents.sort((a, b) => compareDates(a.at, b.at));

    let totalPoints = 0;
    const pointThresholds = [
      [1000, A.pts1000.label],
      [2500, A.pts2500.label],
      [5000, A.pts5000.label],
      [10000, A.pts10000.label],
      [25000, A.pts25000.label],
      [50000, A.pts50000.label],
      [100000, A.pts100000.label],
      [150000, A.pts150000.label],
      [200000, A.pts200000.label],
      [MAX_POINTS - ULTIMATE_CHALLENGE_POINTS, A.ptsNoTuc.label],
      [MAX_POINTS, A.pointGod.label]
    ];
    pointEvents.forEach(event => {
      totalPoints += event.points;
      pointThresholds.forEach(([threshold, label]) => {
        if (!dates[label] && totalPoints >= threshold) dates[label] = event.at;
      });
    });
    return dates;
  }

  /* ---------- the profile itself ---------- */
  async function showProfile(userId) {
    const view = $("p-view");
    view.replaceChildren(mk("p", "info-intro", "Loading…"));
    show("p-view", true);
    const [who, prog, states, weights, speedRun, stateRuns, concentratedEffort, completions, tucCompletion] = await Promise.all([
      sb.from("leaderboard_with_badges").select("id, username, points, has_tuc").eq("id", userId).maybeSingle(),
      sb.from("user_state_mode").select("state_key, mode, done").eq("user_id", userId),
      sb.from("state_multipliers").select("state_key, name, multiplier, county_count").order("name"),
      sb.from("mode_weights").select("mode, weight"),
      sb.from("state_runs").select("time_ms").eq("user_id", userId).lt("time_ms", 5000).limit(1).maybeSingle(),
      fetchStateRuns(userId),
      sb.from("concentrated_effort_achievements").select("user_id").eq("user_id", userId).maybeSingle(),
      fetchCompletions(userId),
      sb.from("tuc_completions").select("completed_at").eq("user_id", userId).maybeSingle()
    ]);
    const err = who.error || prog.error || states.error || weights.error || speedRun.error || stateRuns.error || concentratedEffort.error || completions.error || tucCompletion.error;
    if (err || !who.data) {
      view.replaceChildren(mk("p", "info-intro", err ? "Couldn't load the profile: " + err.message : "That profile wasn't found."));
      return;
    }
    document.title = who.data.username;

    const w = {};
    (weights.data || []).forEach(r => { w[r.mode] = r.weight; });
    const done = {};
    (prog.data || []).forEach(r => { (done[r.state_key] = done[r.state_key] || {})[r.mode] = r.done; });
    const stateRunModes = new Map();
    (stateRuns.data || []).forEach(run => {
      if (!MODES.includes(run.mode)) return;
      if (!stateRunModes.has(run.state_key)) stateRunModes.set(run.state_key, new Set());
      stateRunModes.get(run.state_key).add(run.mode);
    });
    const tiles = (states.data || []).map(s => {
      const total = s.county_count;
      const per = MODES.map(m => {
        const d = Math.min((done[s.state_key] || {})[m] || 0, total);
        const badgeEarned = stateRunModes.get(s.state_key)?.has(m) || false;
        return { m, d, full: d >= total, badgeEarned, pts: d * s.multiplier * (w[m] || 0) };
      });
      const badgeFull = per.filter(x => x.badgeEarned).length;
      const badgePts = total * s.multiplier * (
        (badgeFull >= 1 ? BADGE_WEIGHTS.bronze : 0) +
        (badgeFull >= 3 ? BADGE_WEIGHTS.silver : 0) +
        (badgeFull >= MODES.length ? BADGE_WEIGHTS.gold : 0)
      );
      return {
        key: s.state_key,
        name: s.name, total, per, full: per.filter(x => x.full).length, badgeFull, pts: per.reduce((a, x) => a + x.pts, 0) + badgePts,
        mult: s.multiplier, maxPts: total * s.multiplier * (MODES.reduce((a, m) => a + (w[m] || 0), 0) + Object.values(BADGE_WEIGHTS).reduce((a, b) => a + b, 0))
      };
    });
    const pts = Number(who.data.points) || 0;

    const head = mk("div", "profile-head");
    const bar = mk("div", "profile-bar"), fill = mk("div", "profile-bar-fill");
    fill.style.width = Math.max(1.5, Math.min(100, (pts / MAX_POINTS) * 100)) + "%";
    bar.append(fill);
    const pct = (pts / MAX_POINTS) * 100;
    const pctText = pts > 0 && pct < 0.1 ? "<0.1%" : pct.toFixed(1).replace(/\.0$/, "") + "%";
    const ptsEl = mk("div", "profile-points", pts.toLocaleString());
    ptsEl.append(mk("span", "profile-points-max", " / " + MAX_POINTS.toLocaleString()));
    head.append(mk("div", "profile-avatar", who.data.username.slice(0, 1).toUpperCase()),
                mk("h2", "profile-name", who.data.username), ptsEl, bar,
                mk("div", "profile-pct", pctText));
    const onlineStatus = mk("div", "profile-online-status");
    const onlineDot = mk("span", "online-dot", "");
    onlineDot.setAttribute("aria-hidden", "true");
    onlineStatus.append(onlineDot, mk("span", "", ""));
    profilePresence = { username: who.data.username, status: onlineStatus };
    renderProfilePresence();
    head.insertBefore(onlineStatus, ptsEl);
    if (who.data.has_tuc) head.querySelector(".profile-avatar").classList.add("tuc");
    const special = SPECIAL_BADGES[String(who.data.username).toLowerCase()];
    if (special) {
      const img = mk("img", "profile-avatar-badge");
      img.src = special.src; img.alt = special.label || "Special badge"; img.title = special.label || "Special badge";
      head.querySelector(".profile-avatar").append(img);
    }

    {
      let rankText = "Leaderboard →";
      if (pts > 0) {
        const ahead = await sb.from("leaderboard_with_badges").select("id", { count: "exact", head: true }).gt("points", who.data.points);
        if (!ahead.error) rankText = "#" + ((ahead.count || 0) + 1) + " on the leaderboard →";
      }
      const rankLink = mk("a", "profile-link profile-rank", rankText);
      rankLink.href = "leaderboard.html?u=" + encodeURIComponent(who.data.username);
      head.append(rankLink);
    }
    const gold = tiles.filter(t => t.badgeFull === MODES.length).length;
    const modeDone = m => tiles.every(t => t.per.find(x => x.m === m).badgeEarned);
    const stateRunRows = stateRuns.data || [];
    const completionRows = completions.data || [];
    const tucCompletedAt = tucCompletion.data?.completed_at || null;
    const fastStateRuns = new Set(stateRunRows
      .filter(run => tiles.some(tile => tile.key === run.state_key && Number(run.time_ms) <= tile.total * 3000))
      .map(run => run.state_key));
    const noTimeToWaste = tiles.length > 0 && tiles.every(tile => fastStateRuns.has(tile.key));
    const badgeDates = achievementUnlockDates(tiles, stateRunRows, completionRows, w, tucCompletedAt);
    const achievements = [
      { ...A.participation, color: "#b0703c", earned: tiles.some(t => t.badgeFull >= 1) },
      { ...A.goldStar, color: "#d4a017", earned: gold >= 1 },
      { ...A.overWith, color: "#d4a017", splitStates: ["District of Columbia", "Guam"], earned: ["district_of_columbia", "guam"].every(key => tiles.some(t => t.key === key && t.badgeFull === MODES.length)) },
      { ...A.goldRing, color: "#d4a017", earned: gold >= 5 },
      { ...A.goldNecklace, color: "#d4a017", earned: gold >= 10 },
      { ...A.goldRush, color: "#d4a017", earned: gold >= 25 },
      { ...A.countyMaster, color: "#d4a017", earned: gold >= 57 },
      { ...A.pts1000, color: "#6FA3D8", earned: pts >= 1000 },
      { ...A.pts2500, color: "#6FA3D8", earned: pts >= 2500 },
      { ...A.pts5000, color: "#6FA3D8", earned: pts >= 5000 },
      { ...A.pts10000, color: "#6FA3D8", earned: pts >= 10000 },
      { ...A.pts25000, color: "#6FA3D8", earned: pts >= 25000 },
      { ...A.pts50000, color: "#6FA3D8", earned: pts >= 50000 },
      { ...A.pts100000, color: "#6FA3D8", earned: pts >= 100000 },
      { ...A.pts150000, color: "#6FA3D8", earned: pts >= 150000 },
      { ...A.pts200000, color: "#6FA3D8", earned: pts >= 200000 },
      { ...A.ptsNoTuc, color: "#6FA3D8", earned: pts >= MAX_POINTS - ULTIMATE_CHALLENGE_POINTS },
      { ...A.countyGod,icon: "flame", color: "#CE4E2C", earned: !!who.data.has_tuc },
      { ...A.pointGod, color: "#6FA3D8", earned: pts >= MAX_POINTS },
      { ...A.jack, color: "#6FA3D8", earned: tiles.every(t => t.badgeFull > 0) },
      { ...A.effort, color: "#6FA3D8", earned: !!concentratedEffort.data },
      { ...A.noTime, color: "#6FA3D8", earned: noTimeToWaste },
     { ...A.mode_pin, color: MODE_COLOR.pin, earned: modeDone("pin") },
    { ...A["mode_pin-hard"], color: MODE_COLOR["pin-hard"], earned: modeDone("pin-hard") },
    { ...A.mode_mc, color: MODE_COLOR.mc, earned: modeDone("mc") },
    { ...A.mode_type, color: MODE_COLOR.type, earned: modeDone("type") },
    { ...A["mode_type-strict"], color: MODE_COLOR["type-strict"], earned: modeDone("type-strict") },
    { ...A["mode_type-hard"], color: MODE_COLOR["type-hard"], earned: modeDone("type-hard") },
    ].map((badge, index) => ({ ...badge, earnedAt: badgeDates[badge.label] || null, originalOrder: index }))
      .sort((a, b) => {
        if (a.earned !== b.earned) return a.earned ? -1 : 1;
        if (a.earnedAt && b.earnedAt) return Date.parse(a.earnedAt) - Date.parse(b.earnedAt) || a.originalOrder - b.originalOrder;
        if (a.earnedAt) return -1;
        if (b.earnedAt) return 1;
        return a.originalOrder - b.originalOrder;
      });

    const byPts = (a, b) => b.badgeFull - a.badgeFull || b.pts - a.pts || a.name.localeCompare(b.name);
    const stateOrder = [
      ...tiles.filter(t => t.badgeFull > 0).sort(byPts),
      ...tiles.filter(t => t.badgeFull === 0).sort((a, b) => a.name.localeCompare(b.name))
    ];

    const shelf = (title, items) => {
      const s = mk("section");
      const g = mk("div", "medal-grid");
      g.append(...items);
      s.append(mk("h3", "profile-section-title", title), g);
      return s;
    };
    const sections = mk("div", "profile-sections");
    sections.append(
      shelf(`Achievements · ${achievements.filter(a => a.earned).length} of ${achievements.length}`, achievements.map(badgeMedal)),
      shelf(`States · ${tiles.filter(t => t.badgeFull > 0).length} of ${tiles.length}`, stateOrder.map(stateMedal)));

   view.replaceChildren(head, buildMap(tiles), buildCharts(tiles, w, who.data, stateRunRows, completionRows, tucCompletedAt), sections);
    fitShapes(view);
    fitNames(view);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { fitShapes(view); fitNames(view); });
  }

  async function showProfileByName(name) {
    const r = await sb.from("profiles").select("id, username").eq("username", name).maybeSingle();
    if (r.error || !r.data) { say(r.error ? "Couldn't look that player up: " + r.error.message : `There's no player named "${name}".`); return; }
    await showProfile(r.data.id);
  }

  function openChangePassword() {
    if ($("pw-overlay")) return;
    const overlay = mk("div", "pp-overlay");
    overlay.id = "pw-overlay";
    const card = mk("div", "pw-card");
    const field = (label, id) => {
      const l = mk("label", "pw-field", label), i = mk("input");
      i.type = "password"; i.id = id; i.autocomplete = id === "pw-old" ? "current-password" : "new-password";
      l.append(i);
      return l;
    };
    const msg = mk("p", "pw-msg", "");
    const save = mk("button", "btn-primary", "Change password"); save.type = "button";
    const cancel = mk("button", "btn-secondary", "Cancel"); cancel.type = "button";
    const row = mk("div", "pw-buttons"); row.append(save, cancel);
    card.append(
      mk("h3", "", "Change password"),
      field("Current password", "pw-old"),
      field("New password (6+ characters)", "pw-new"),
      field("New password again", "pw-new2"),
      mk("p", "pw-note", "Your account has no email, so a forgotten password can't be reset. Pick one you'll remember."),
      msg, row);
    overlay.append(card);
    document.body.append(overlay);
    const onKey = e => { if (e.key === "Escape") shut(); };
    const shut = () => { overlay.remove(); document.removeEventListener("keydown", onKey); };
    document.addEventListener("keydown", onKey);
    cancel.addEventListener("click", shut);
    overlay.addEventListener("click", e => { if (e.target === overlay) shut(); });
    ["pw-old", "pw-new", "pw-new2"].forEach(id => $(id).addEventListener("keydown", e => { if (e.key === "Enter") save.click(); }));
    $("pw-old").focus();

    save.addEventListener("click", async () => {
      const oldPw = $("pw-old").value, pw = $("pw-new").value, pw2 = $("pw-new2").value;
      const fail = t => { msg.textContent = t; };
      if (!oldPw) return fail("Enter your current password.");
      if (pw.length < 6) return fail("The new password must be at least 6 characters.");
      if (pw !== pw2) return fail("The two new passwords don't match.");
      if (pw === oldPw) return fail("Pick a password that's different from your current one.");
      save.disabled = true; fail("Checking…");
      const check = await sb.auth.signInWithPassword({ email: session.user.email, password: oldPw });
      if (check.error) { save.disabled = false; return fail("Your current password is wrong."); }
      const { error } = await sb.auth.updateUser({ password: pw });
      save.disabled = false;
      if (error) return fail(error.message);
      shut();
      say("Password changed.");
    });
  }

  /* ---------- the buttons in the top corner ---------- */
  function renderActions() {
    const box = $("p-actions");
    const btn = (label, fn, secondary) => { const b = mk("button", secondary ? "btn-secondary" : "", label); b.type = "button"; b.addEventListener("click", fn); return b; };
    const link = (label, href) => { const a = mk("a", "profile-link", label); a.href = href; return a; };
    const items = [];
    items.push(btn("How points work", () => openPoints(), true));
    const viewing = wantedName || (me && me.username);
    if (viewing) {
      items.push(btn("Copy link", async () => {
        const url = new URL("profile.html", location.href); url.search = "?u=" + encodeURIComponent(viewing);
        try { await navigator.clipboard.writeText(url.href); say("Link copied."); } catch (e) { say(url.href); }
      }, true));
    }
    if (!session && wantedName) items.push(link("Sign in", "profile.html"));
    if (session) items.push(btn("Sign out", () => sb.auth.signOut(), true));
    if (session && me && (!wantedName || wantedName === me.username)) items.push(btn("Change password", openChangePassword, true));
    if (session && me && wantedName && wantedName !== me.username) items.push(btn("My profile", "profile.html"));
    box.replaceChildren(...items);
  }

  /* ---------- deciding what to show ---------- */
  let busy = false, again = false;
  async function route() {
    if (busy) { again = true; return; }
    busy = true;
    try {
      document.title = "Profile · Countellect";
      say("");
      const { data } = await sb.auth.getSession();
      session = data.session; me = null;
      if (session) {
        const r = await sb.from("profiles").select("id, username").eq("id", session.user.id).maybeSingle();
        me = r.data;
      }
      show("p-out", false); show("p-name", false); show("p-view", false);
      if (wantedName) await showProfileByName(wantedName);
      else if (!session) show("p-out", true);
      else if (!me) show("p-name", true);
      else await showProfile(me.id);
      renderActions();
    } finally {
      busy = false;
      if (again) { again = false; route(); }
    }
  }

  /* ---------- sign in / create account / username ---------- */
  const FAKE_DOMAIN = "example.com";   // nobody is ever emailed; this only gives Supabase something that looks like an address
  const toEmail = s => (s.includes("@") ? s : s.toLowerCase() + "@" + FAKE_DOMAIN);   // typing a real email still works for older accounts
  let signingUp = false;
  const creds = () => ({ user: $("p-email").value.trim(), password: $("p-password").value });

  $("p-signup").addEventListener("click", async () => {
    const { user, password } = creds();
    if (!/^[A-Za-z0-9_]{3,20}$/.test(user)) { say("Username: 3–20 letters, numbers or underscores."); return; }
    if (password.length < 6) { say("Password must be at least 6 characters."); return; }
    signingUp = true;
    try {
      const { data, error } = await sb.auth.signUp({ email: toEmail(user), password });
      if (error) { say(/already|registered/i.test(error.message) ? "That username is taken." : error.message); return; }
      if (!data.session) { say("Couldn't sign you in. In Supabase, is “Confirm email” turned off?"); return; }
      const ins = await sb.from("profiles").insert({ id: data.user.id, username: user });
      if (ins.error) { say(ins.error.code === "23505" ? "That username is taken." : "Couldn't save the username: " + ins.error.message); return; }
    } finally { signingUp = false; }
    route();
  });

  $("p-signin").addEventListener("click", async () => {
    const { user, password } = creds();
    if (!user || !password) { say("Enter your username and password."); return; }
    const { error } = await sb.auth.signInWithPassword({ email: toEmail(user), password });
    say(error ? (error.message === "Invalid login credentials" ? "Wrong username or password." : error.message) : "");
  });
  ["p-email", "p-password"].forEach(id => $(id).addEventListener("keydown", e => { if (e.key === "Enter") $("p-signin").click(); }));
  $("p-save-name").addEventListener("click", async () => {
    const username = $("p-username").value.trim();
    const { error } = await sb.from("profiles").insert({ id: session.user.id, username });
    if (error) { say(error.code === "23505" ? "That username is taken." : "Use 3–20 letters, numbers or underscores."); return; }
    route();
  });
  $("p-username").addEventListener("keydown", e => { if (e.key === "Enter") $("p-save-name").click(); });

  let ready = false;     // the first load has finished
  sb.auth.onAuthStateChange((evt, sess) => {
    if (!ready || signingUp || (evt !== "SIGNED_IN" && evt !== "SIGNED_OUT")) return;
    const uid = sess && sess.user ? sess.user.id : null;
    if (uid === (session && session.user ? session.user.id : null)) return;   // same account: just a repeat announcement
    route();
  });
  route().then(() => { ready = true; });
  if (new URLSearchParams(location.search).has("points")) openPoints(true);
})();