/* Game history: the "More info" page for a game, the History tab in Records, and sharing.
   Loaded after script.js (it needs window.countellect) and account.js (it needs window.loadGameForView and friends). */
document.addEventListener("DOMContentLoaded", () => {
  "use strict";
  const api = window.countellect;
  const root = document.getElementById("gd-root");
  if (!api || !root) return;
  const NS = "http://www.w3.org/2000/svg";

  /* ---------- tiny helpers ---------- */
  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
  const sv = (tag, attrs, kids) => {
    const e = document.createElementNS(NS, tag);
    for (const k in (attrs || {})) e.setAttribute(k, attrs[k]);
    (kids || []).forEach(c => e.append(c));
    return e;
  };
  const pad2 = n => String(n).padStart(2, "0");
  function fmtMs(ms) {
    ms = Math.max(0, Math.round(ms || 0));
    const h = Math.floor(ms / 3600000), m = Math.floor(ms % 3600000 / 60000), s = Math.floor(ms % 60000 / 1000), r = ms % 1000;
    return h ? `${h}:${pad2(m)}:${pad2(s)}` : `${m}:${pad2(s)}.${String(r).padStart(3, "0")}`;
  }
  function fmtBig(ms) {
    ms = Math.max(0, Math.round(ms || 0));
    const m = Math.floor(ms / 60000), r = ms % 60000;
    const sec = (r / 1000).toFixed(3);
    return m ? `${m}m ${sec.padStart(6, "0")}s` : `${sec}s`;
  }
  const fmtSec = ms => ms >= 10000 ? `${(ms / 1000).toFixed(0)}s` : `${(ms / 1000).toFixed(1)}s`;
  const fmtDate = iso => { const d = new Date(iso); return isNaN(d) ? "" : d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" }) + ", " + d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" }); };
  const MODE_NAME = { ...api.MODE_LABELS, tuc: "Ultimate Challenge" };
  const OUTCOME = { perfect: "Perfect run", complete: "Finished with mistakes", gave_up: "Gave up", failed: "Challenge failed" };
  const stateName = k => (api.stateData[k] && api.stateData[k].name) || k;
  let multiState = true;                                          // set per game: with one state, county names don't need ", State" after them
  const singleCounty = k => typeof window.countyCountForAccount === "function" && window.countyCountForAccount(k) === 1;   // Guam, DC: the state IS the county
  const stSuffix = k => (multiState && k && !singleCounty(k)) ? ", " + stateName(k) : "";   // "Guam, Guam" says nothing twice; "Oklahoma, Oklahoma" is worth keeping
  const statesLabel = keys => {
    const all = Object.keys(api.stateData).length;
    if (keys.length >= all - 2 && keys.length > 8) return "All states";
    if (keys.length <= 3) return keys.map(stateName).join(", ");
    return `${keys.length} states`;
  };
  const unitPlural = rec => api.unitWord(true, rec.state_keys || []);
  const cap = s => s.charAt(0).toUpperCase() + s.slice(1);
  const chip = (text, cls) => el("span", "gh-chip" + (cls ? " " + cls : ""), text);
  function labelChips(rec) {
    const wrap = el("span", "gh-chips");
    wrap.append(chip(MODE_NAME[rec.mode] || rec.mode, "gh-chip-mode"));
    wrap.append(chip(OUTCOME[rec.outcome] || rec.outcome, "gh-out-" + rec.outcome));
    if (rec.is_retry) wrap.append(chip("Retry Missed"));
    if (rec.excluded > 0) wrap.append(chip(`${rec.excluded} excluded`));
    return wrap;
  }

  /* ---------- turning a saved record into numbers ---------- */
  function classify(r) {
    if (r.s === 1) return r.m === 0 ? "first" : r.m === 1 ? "m1" : r.m === 2 ? "m2" : "m3";
    return r.s === 2 ? "forfeit" : r.s === 3 ? "gave" : "none";
  }
  const CLS_LABEL = { first: "Found first try", m1: "1 miss", m2: "2 misses", m3: "3+ misses", forfeit: "Forfeited", gave: "Gave up", none: "Not reached" };
  const CLS_ORDER = ["first", "m1", "m2", "m3", "forfeit", "gave", "none"];

  function analyze(rec) {
    const d = rec.data || {};
    const rows = (d.c || []).map(a => ({ id: a[0], s: a[1], t: a[2], m: a[3], p: a[4] || [] }));
    rows.forEach(r => {
      const c = api.findCounty(r.id);
      r.name = c ? c.name : r.id;
      r.stateKey = c ? c.stateKey : null;
      r.cls = classify(r);
    });
    const timed = rows.filter(r => (r.s === 1 || r.s === 2) && r.t > 0).sort((a, b) => a.t - b.t);
    let prev = 0;
    timed.forEach(r => { r.dt = Math.max(0, r.t - prev); prev = r.t; });
    const found = timed.filter(r => r.s === 1);
    const counts = {}; CLS_ORDER.forEach(k => counts[k] = 0); rows.forEach(r => counts[r.cls]++);
    const perCountyTiming = rec.mode !== "type" && found.length > 1;
    const dts = found.map(r => r.dt).filter(x => x > 0);
    const byState = new Map();
    rows.forEach(r => {
      const k = r.stateKey || "?";
      if (!byState.has(k)) byState.set(k, { key: k, total: 0, found: 0, first: 0, mistakes: 0, dt: 0, dtN: 0 });
      const g = byState.get(k);
      g.total++; if (r.s === 1) g.found++; if (r.cls === "first") g.first++; g.mistakes += r.m;
      if (r.s === 1 && r.dt > 0) { g.dt += r.dt; g.dtN++; }
    });
    const mix = new Map();
    rows.forEach(r => r.p.forEach(pk => {
      const key = r.id + ">" + pk;
      if (!mix.has(key)) mix.set(key, { target: r, pick: pk, n: 0 });
      mix.get(key).n++;
    }));
    return {
      rows, timed, found, counts, perCountyTiming,
      avg: dts.length ? dts.reduce((a, b) => a + b, 0) / dts.length : 0,
      fastest: perCountyTiming ? [...found].filter(r => r.dt > 0).sort((a, b) => a.dt - b.dt).slice(0, 5) : [],
      slowest: perCountyTiming ? [...found].sort((a, b) => b.dt - a.dt).slice(0, 10) : [],
      mostMissed: rows.filter(r => r.m > 0).sort((a, b) => b.m - a.m || a.name.localeCompare(b.name)).slice(0, 10),
      byState: [...byState.values()].sort((a, b) => stateName(a.key).localeCompare(stateName(b.key))),
      mixups: [...mix.values()].sort((a, b) => b.n - a.n).slice(0, 25),
      stray: d.stray || [], missTimes: d.x || [], stateTimes: d.st || {}
    };
  }

  /* ---------- charts (plain SVG, no library) ---------- */
  function chartFrame(W, H, ml, mr, mt, mb) {
    const s = sv("svg", { viewBox: `0 0 ${W} ${H}`, class: "gd-chart", role: "img", preserveAspectRatio: "xMidYMid meet" });
    return { s, iw: W - ml - mr, ih: H - mt - mb, ml, mt, W, H, mb };
  }
  const txt = (x, y, str, anchor, cls) => { const t = sv("text", { x, y, "text-anchor": anchor || "middle", class: "gd-axis " + (cls || "") }); t.textContent = str; return t; };

  function progressChart(rec, a) {
    const f = chartFrame(640, 220, 42, 12, 12, 30);
    const xMax = Math.max(rec.time_ms || 0, ...(a.found.length ? [a.found[a.found.length - 1].t] : [0]), 1);
    const yMax = Math.max(rec.total, 1);
    const X = t => f.ml + (t / xMax) * f.iw, Y = n => f.mt + f.ih - (n / yMax) * f.ih;
    [0, .5, 1].forEach(q => {
      f.s.append(sv("line", { x1: f.ml, x2: f.ml + f.iw, y1: Y(q * yMax), y2: Y(q * yMax), class: "gd-grid" }));
      f.s.append(txt(f.ml - 6, Y(q * yMax) + 4, String(Math.round(q * yMax)), "end"));
      f.s.append(txt(X(q * xMax), f.H - 10, fmtMs(q * xMax).replace(/\.\d+$/, ""), q === 0 ? "start" : q === 1 ? "end" : "middle"));
    });
    const pts = [[0, 0]];
    a.found.forEach((r, i) => pts.push([r.t, i + 1]));
    const line = pts.map(([t, n], i) => (i ? "L" : "M") + X(t).toFixed(1) + " " + Y(n).toFixed(1)).join("");
    f.s.append(sv("path", { d: line + `L${X(pts[pts.length - 1][0]).toFixed(1)} ${Y(0)}L${X(0)} ${Y(0)}Z`, class: "gd-area" }));
    f.s.append(sv("path", { d: line, class: "gd-line" }));
    a.missTimes.forEach(([t]) => f.s.append(sv("line", { x1: X(t), x2: X(t), y1: f.mt + f.ih - 7, y2: f.mt + f.ih, class: "gd-miss-tick" })));
    f.s.append(txt(f.ml + 6, f.mt + 12, "ticks = wrong guesses", "start", "gd-note"));
    return f.s;
  }

  function timeBars(a) {
    const n = a.found.length;
    const f = chartFrame(640, 220, 42, 12, 12, 30);
    const sorted = a.found.map(r => r.dt).sort((x, y) => x - y);
    const capV = Math.max(1000, (sorted[Math.floor(sorted.length * 0.95)] || 1000) * 1.3);
    const Y = v => f.mt + f.ih - (Math.min(v, capV) / capV) * f.ih;
    [0, .5, 1].forEach(q => {
      f.s.append(sv("line", { x1: f.ml, x2: f.ml + f.iw, y1: Y(q * capV), y2: Y(q * capV), class: "gd-grid" }));
      f.s.append(txt(f.ml - 6, Y(q * capV) + 4, fmtSec(q * capV) + (q === 1 ? "+" : ""), "end"));
    });
    const bw = f.iw / n;
    a.found.forEach((r, i) => {
      const x = f.ml + i * bw, y = Y(r.dt);
      const rect = sv("rect", { x: x.toFixed(2), y: y.toFixed(2), width: Math.max(bw - (bw > 3 ? 1 : 0), 0.6).toFixed(2), height: Math.max(0.5, f.mt + f.ih - y).toFixed(2), class: "gd-bar gd-r-" + r.cls });
      const tt = sv("title"); tt.textContent = `${r.name}${stSuffix(r.stateKey, r.name)} - ${fmtSec(r.dt)}${r.m ? `, ${r.m} miss${r.m > 1 ? "es" : ""}` : ""}`;
      rect.append(tt); f.s.append(rect);
    });
    f.s.append(txt(f.ml, f.H - 10, "first found", "start"));
    f.s.append(txt(f.ml + f.iw, f.H - 10, "last found", "end"));
    return f.s;
  }

  function miniLine(values, highlight, fmt, ymin, ymax) {
    const f = chartFrame(300, 130, 36, 8, 10, 18);
    const lo = ymin != null ? ymin : Math.min(...values), hi = ymax != null ? ymax : Math.max(...values);
    const span = Math.max(hi - lo, 1e-9);
    const X = i => f.ml + (values.length === 1 ? f.iw / 2 : (i / (values.length - 1)) * f.iw), Y = v => f.mt + f.ih - ((v - lo) / span) * f.ih;
    [lo, hi].forEach(v => { f.s.append(sv("line", { x1: f.ml, x2: f.ml + f.iw, y1: Y(v), y2: Y(v), class: "gd-grid" })); f.s.append(txt(f.ml - 5, Y(v) + 4, fmt(v), "end")); });
    f.s.append(sv("path", { d: values.map((v, i) => (i ? "L" : "M") + X(i).toFixed(1) + " " + Y(v).toFixed(1)).join(""), class: "gd-line" }));
    values.forEach((v, i) => f.s.append(sv("circle", { cx: X(i), cy: Y(v), r: i === highlight ? 5 : 2.8, class: i === highlight ? "gd-dot gd-dot-now" : "gd-dot" })));
    f.s.append(txt(f.ml, f.H - 4, "oldest", "start", "gd-note"));
    f.s.append(txt(f.ml + f.iw, f.H - 4, "newest", "end", "gd-note"));
    return f.s;
  }

  function stackBar(counts, total) {
    const wrap = el("div", "gd-stack-wrap");
    const bar = el("div", "gd-stack");
    CLS_ORDER.forEach(k => {
      if (!counts[k]) return;
      const seg = el("span", "gd-seg gd-r-" + k);
      seg.style.flexGrow = counts[k];
      seg.title = `${CLS_LABEL[k]}: ${counts[k]}`;
      bar.append(seg);
    });
    const legend = el("div", "gd-legend");
    CLS_ORDER.forEach(k => {
      if (!counts[k]) return;
      const item = el("span", "gd-legend-item");
      item.append(el("i", "gd-swatch gd-r-" + k), document.createTextNode(`${CLS_LABEL[k]} (${counts[k]}, ${Math.round(counts[k] / Math.max(total, 1) * 100)}%)`));
      legend.append(item);
    });
    wrap.append(bar, legend);
    return wrap;
  }

  /* ---------- county-by-county maps ---------- */
  let cloneSerial = 0;
  function countyMap(stateKey, rowById) {
    const src = api.mapSvg(stateKey);
    if (!src) return null;
    const svg = src.cloneNode(true);
    const serial = ++cloneSerial;
    // the game's own map uses these ids, so the copy must not: rename every id, and anything that points at one
    const idMap = new Map();
    svg.querySelectorAll("[id]").forEach(e => { const n = `gd${serial}-${e.id}`; idMap.set(e.id, n); e.dataset.gdOrig = e.id; e.id = n; });
    svg.removeAttribute("id");
    svg.querySelectorAll("*").forEach(e => {
      [...e.attributes].forEach(at => {
        if (!/url\(#|^#/.test(at.value) || at.name === "id") return;
        let v = at.value; idMap.forEach((n, o) => { v = v.split(`url(#${o})`).join(`url(#${n})`); if (v === "#" + o) v = "#" + n; });
        e.setAttribute(at.name, v);
      });
    });
    svg.setAttribute("class", "gd-map");
    svg.removeAttribute("style"); svg.removeAttribute("width"); svg.removeAttribute("height");
    svg.querySelectorAll("*").forEach(e => {
      const isCounty = e.classList.contains("county") || e.hasAttribute("data-county-id");
      const id = e.dataset.countyId || e.dataset.gdOrig;
      if (e.hasAttribute("style")) e.removeAttribute("style");
      if (!isCounty || !id) return;
      e.removeAttribute("tabindex"); e.removeAttribute("role"); e.removeAttribute("aria-label");
      const r = rowById.get(id);
      e.setAttribute("class", "gd-county " + (r ? "gd-r-" + r.cls : "gd-r-out"));
      if (e.tagName.toLowerCase() === "path" || e.tagName.toLowerCase() === "g") {
        e.querySelectorAll(":scope > title").forEach(t => t.remove());     // no browser tooltip: the card does the talking
      }
    });
    return svg;
  }

  function zoomState(rec, a, stateKey, rowById) {
    const back = el("div", "gd-zoom-back");
    const box = el("div", "gd-zoom-box");
    box.append(stateMapCard(rec, a, stateKey, rowById, true));
    back.append(box);
    const done = () => { back.remove(); document.removeEventListener("keydown", onKey); };
    const onKey = e => { if (e.key === "Escape") done(); };
    back.addEventListener("click", done);                       // click anywhere to close
    document.addEventListener("keydown", onKey);
    root.append(back);
  }

  /* ---------- the big hover card on the county tiles ---------- */
  let tipEl = null;
  function countyTip() { if (!tipEl) { tipEl = el("div", "gd-tip"); tipEl.hidden = true; document.body.append(tipEl); } return tipEl; }
  function tipFor(id, r) {
    const c = api.findCounty(id);
    const box = el("div");
    const head = el("div", "gd-tip-head");
    head.append(el("div", "gd-tip-name", c ? c.name : id));
    if (c && c.stateKey && multiState && !singleCounty(c.stateKey)) head.append(el("div", "gd-tip-state", stateName(c.stateKey)));
    box.append(head);
    if (!r) { box.append(el("div", "gd-tip-dim", "Not in this game")); return box; }
    const verdict = el("div", "gd-tip-verdict");
    verdict.append(el("i", "gd-swatch gd-r-" + r.cls), document.createTextNode(CLS_LABEL[r.cls]));
    box.append(verdict);
    const stats = el("div", "gd-tip-stats");
    const stat = (v, l) => { const d = el("div", "gd-tip-stat"); d.append(el("div", "gd-tip-v", v), el("div", "gd-tip-l", l)); stats.append(d); };
    if ((r.s === 1 || r.s === 2) && r.t > 0) stat(fmtBig(r.t), r.s === 1 ? "found at" : "gave up at");
    if (r.s === 1 && r.dt > 0) stat(fmtSec(r.dt), "to find");
    stat(String(r.m), r.m === 1 ? "wrong guess" : "wrong guesses");
    box.append(stats);
    if (r.p && r.p.length) {
      const said = el("div", "gd-tip-said");
      said.append(el("div", "gd-tip-l", "you said"), el("div", "gd-tip-pick", r.p.map(pickText).join(", ")));
      box.append(said);
    }
    return box;
  }
  function bindTip(svg, rowById) {
    const place = e => {
      const t = countyTip(), pad = 16;
      const w = t.offsetWidth, h = t.offsetHeight;
      let x = e.clientX + pad, y = e.clientY + pad;
      if (x + w > window.innerWidth - 8) x = e.clientX - w - pad;
      if (y + h > window.innerHeight - 8) y = e.clientY - h - pad;
      t.style.left = Math.max(8, x) + "px"; t.style.top = Math.max(8, y) + "px";
    };
    svg.querySelectorAll(".gd-county").forEach(p => {
      const id = p.dataset.gdOrig || p.dataset.countyId;
      p.addEventListener("mouseenter", e => { const t = countyTip(); t.replaceChildren(tipFor(id, rowById.get(id))); t.hidden = false; place(e); });
      p.addEventListener("mousemove", place);
      p.addEventListener("mouseleave", () => { countyTip().hidden = true; });
    });
  }

  function stateMapCard(rec, a, stateKey, rowById) {
    const box = el("div", "map-box gd-tile-box");                // the same tile the game uses
    box.dataset.gdState = stateKey;                              // not data-state: the game looks boxes up by that
    const m = countyMap(stateKey, rowById);
    if (m) {
      m.dataset.detail = "full";                                  // otherwise the game's zoom tries to fetch a more detailed copy
      m.setAttribute("class", "gd-map");                          // not .state-map: the game hides and rearranges every .state-map on the page
      box.append(m);
      api.bindTile(m, { tooltip: false });
      bindTip(m, rowById);                                            // hover names, click to pin a name, magnifier, right-click zoom
    } else box.append(el("p", "gd-note-p", "This state's map isn't available."));
    box.append(el("span", "map-state-label", stateName(stateKey)));      // the game's own state label
    return box;
  }

  function usOverview(rec, a, onPick) {
    const tpl = document.getElementById("us-map-template");
    if (!tpl) return null;
    const holder = el("div", "gd-us");
    holder.append(tpl.content.cloneNode(true));
    const keyByName = {}; Object.entries(api.stateData).forEach(([k, s]) => { keyByName[s.name.toLowerCase()] = k; });
    holder.querySelectorAll("[id]").forEach(e => e.removeAttribute("id"));
    holder.querySelectorAll("[style]").forEach(e => e.removeAttribute("style"));
    holder.querySelectorAll("text, line, polyline, .us-leaders, .us-labels").forEach(t => t.remove());
    holder.querySelectorAll(".us-box").forEach(b => b.setAttribute("class", "gd-us-box"));
    holder.querySelectorAll("path.us-st").forEach(p => {
      const key = keyByName[(p.dataset.name || "").toLowerCase()];
      const g = key && a.byState.find(x => x.key === key);
      p.setAttribute("class", "gd-us-st");
      if (!g) return;
      const rate = g.total ? g.first / g.total : 0;
      p.classList.add("in", rate >= 1 ? "q4" : rate >= .85 ? "q3" : rate >= .6 ? "q2" : "q1");
      const tt = sv("title"); tt.textContent = `${stateName(key)}: ${g.first}/${g.total} first try, ${g.found}/${g.total} found`;
      p.prepend(tt);
      p.addEventListener("mouseenter", () => { if (p.parentNode && p.parentNode.lastElementChild !== p) p.parentNode.appendChild(p); });   // so its outline isn't covered by the neighbours
      p.addEventListener("click", () => onPick(key));
    });
    return holder;
  }

  const mapGrid = () => {
    const g = el("div", "gd-map-wrapper");
    g.style.setProperty("--states-per-row", Math.max(1, Math.min(2, api.statesPerRow ? api.statesPerRow() : 2)));
    return g;
  };

  async function renderMaps(rec, a, host) {
    const keys = rec.state_keys.filter(k => api.stateData[k]);
    const rowById = new Map(a.rows.map(r => [r.id, r]));
    host.replaceChildren(el("p", "gd-note-p", "Loading maps…"));
    try { await api.ensureStateMaps(keys.length > 8 ? [] : keys); } catch (e) { host.replaceChildren(el("p", "gd-note-p", "Couldn't load the maps for this game.")); return; }
    host.replaceChildren();
    const legend = el("div", "gd-legend gd-legend-maps");
    [...CLS_ORDER.filter(k => a.counts[k]), "out"].forEach(k => {
      const item = el("span", "gd-legend-item");
      item.append(el("i", "gd-swatch gd-r-" + k), document.createTextNode(k === "out" ? "Not in this game" : CLS_LABEL[k]));
      legend.append(item);
    });
    if (keys.length <= 8) {
      host.append(legend);
      const grid = mapGrid();
      keys.forEach(k => grid.append(stateMapCard(rec, a, k, rowById)));
      host.append(grid);
      return;
    }
    // lots of states: a US overview coloured by how many you got first try; click a state for its counties
    const stash = el("div", "gd-tile-stash");                    // the zoom takes the tile out of here and puts it back
    const tiles = new Map();
    const ov = usOverview(rec, a, async key => {
      let t = tiles.get(key);
      if (!t) {
        try { await api.ensureStateMaps([key]); } catch (e) { return; }
        t = stateMapCard(rec, a, key, rowById);
        stash.append(t); tiles.set(key, t);
      }
      const svg = t.querySelector(".gd-map");
      if (svg) api.zoomMap(svg);
    });
    const key = el("div", "gd-legend");
    [["q4", "All first try"], ["q3", "85%+ first try"], ["q2", "60%+ first try"], ["q1", "Under 60%"], ["off", "Not in this game"]].forEach(([c, t]) => {
      const item = el("span", "gd-legend-item"); item.append(el("i", "gd-swatch gd-us-st " + (c === "off" ? "" : "in " + c)), document.createTextNode(t)); key.append(item);
    });
    host.append(key);
    if (ov) host.append(ov);
    host.append(stash);
    const all = el("button", "btn-secondary gd-small-btn", "Show every state's county map");
    all.addEventListener("click", async () => {
      all.disabled = true; all.textContent = "Loading every map…";
      try { await api.ensureStateMaps(keys); } catch (e) { all.textContent = "Couldn't load them all"; return; }
      const grid = mapGrid();
      keys.slice().sort((x, y) => stateName(x).localeCompare(stateName(y))).forEach(k => grid.append(stateMapCard(rec, a, k, rowById)));
      all.replaceWith(el("div", "gd-legend-wrap")); host.append(legend, grid);
    });
    host.append(all);
  }

    /* ---------- replay: the run played back, counties filling in as you found them, wrong guesses flashing ---------- */
  function replayBar(rec, a) {
    const rowById = new Map(a.rows.map(r => [r.id, r]));
    const lastT = a.rows.filter(r => (r.s === 1 || r.s === 2) && r.t > 0).reduce((m, r) => Math.max(m, r.t), 0);
    const dur = Math.max(rec.time_ms || 0, lastT, 1);
    const misses = (a.missTimes || []).filter(m => m && m[1]).sort((x, y) => x[0] - y[0]);     // [ms, county id]
    const bar = el("div", "gd-replay");
    const play = el("button", "btn-secondary gd-small-btn", "▶ Replay"); play.type = "button";
    const range = el("input", "gd-replay-range");
    range.type = "range"; range.min = 0; range.max = dur; range.step = 1; range.value = dur;
    range.setAttribute("aria-label", "Replay position");
    const clock = el("span", "gd-replay-clock", fmtMs(dur));
    const speed = el("select", "gd-replay-speed"); speed.setAttribute("aria-label", "Replay speed");
    [["auto", "Fit to 30 s"], ["1", "1×"], ["2", "2×"], ["5", "5×"], ["10", "10×"], ["30", "30×"]].forEach(([v, t]) => { const o = el("option", null, t); o.value = v; speed.append(o); });
    bar.append(play, range, clock, speed);

    let pos = dur, playing = false, prevFrame = 0;
    const idOf = p => p.dataset.gdOrig || p.dataset.countyId;

    function paint(from, to, flash) {
      const els = [...document.querySelectorAll(".gd-county")];
      els.forEach(p => {
        const r = rowById.get(idOf(p));
        if (!r) return;                                                       // not in this game
        const reached = to >= dur || ((r.s === 1 || r.s === 2) && r.t <= to);  // gave-up counties stay blank until the end
        const cls = "gd-county gd-r-" + (reached ? r.cls : "none");
        if (p.getAttribute("class") !== cls) p.setAttribute("class", cls);
      });
      if (!flash) return;
      misses.forEach(([t, id]) => {
        if (t <= from || t > to) return;
        els.filter(p => idOf(p) === id).forEach(p => {
          const base = getComputedStyle(p).fill;
          p.animate([{ fill: "#e0463c" }, { fill: "#e0463c", offset: 0.4 }, { fill: base }], { duration: 650 });
        });
      });
    }

    function tick(now) {
      if (!playing) return;
      if (!bar.isConnected) { playing = false; return; }                    // left the page
      const sp = speed.value === "auto" ? Math.max(1, dur / 30000) : +speed.value;
      const next = Math.min(dur, pos + (now - prevFrame) * sp);
      prevFrame = now;
      paint(pos, next, true);
      pos = next; range.value = pos; clock.textContent = fmtMs(pos);
      if (pos >= dur) { playing = false; play.textContent = "▶ Replay"; return; }
      requestAnimationFrame(tick);
    }

    play.addEventListener("click", () => {
      if (playing) { playing = false; play.textContent = "▶ Resume"; return; }
      if (pos >= dur) { pos = 0; range.value = 0; clock.textContent = fmtMs(0); paint(0, 0, false); }
      playing = true; play.textContent = "⏸ Pause"; prevFrame = performance.now();
      requestAnimationFrame(tick);
    });
    range.addEventListener("input", () => {
      playing = false;
      pos = +range.value;
      play.textContent = pos >= dur ? "▶ Replay" : "▶ Resume";
      clock.textContent = fmtMs(pos);
      paint(0, pos, false);
    });
    return bar;
  }

  /* ---------- vs your best: pick what to compare with, then see the gap county by county ---------- */
  const EVEN = 50;                                                   // ms: closer than this counts as "even"
  const fmtT = ms => (ms >= 10000 ? (ms / 1000).toFixed(1) : (ms / 1000).toFixed(2)) + "s";
  const fmtDelta = d => { const s = Math.abs(d) / 1000; return (d > 0 ? "+" : d < 0 ? "−" : "±") + (s >= 10 ? s.toFixed(1) : s.toFixed(2)) + "s"; };
  const fmtGap = ms => (ms < 60000 ? (ms / 1000).toFixed(3) + "s" : fmtMs(ms));
  const fmtN = x => (Number.isInteger(x) ? String(x) : x.toFixed(1));
  const meanOf = xs => xs.reduce((s, x) => s + x, 0) / xs.length;
  const cmpCache = new Map();                                        // game id -> {rec, a}

  async function viewAnalysis(id) {
    if (cmpCache.has(id)) return cmpCache.get(id);
    const view = await window.loadGameForView(id);
    if (!view || !view.record || !view.record.data) return null;
    const out = { rec: view.record, a: analyze(view.record) };
    cmpCache.set(id, out);
    return out;
  }

  /* one run, or the average of several, boiled down to what the table needs */
  function baselineOf(items, title, sub, short) {
    const per = new Map();
    items.forEach(({ a }) => a.rows.forEach(r => {
      if (!per.has(r.id)) per.set(r.id, { dts: [], ms: [], firsts: 0, seen: 0 });
      const p = per.get(r.id);
      p.seen++; p.ms.push(r.m); if (r.cls === "first") p.firsts++;
      if (r.s === 1 && r.dt > 0) p.dts.push(r.dt);
    }));
    const rows = new Map();
    per.forEach((p, id) => rows.set(id, { dt: p.dts.length ? meanOf(p.dts) : null, m: meanOf(p.ms) }));
    const avgs = items.map(i => i.a.avg).filter(x => x > 0);
    return {
      title, sub, short, n: items.length, rows,
      time: meanOf(items.map(i => i.rec.time_ms)),
      wrong: meanOf(items.map(i => i.rec.wrong_count || 0)),
      first: meanOf(items.map(i => i.a.counts.first)),
      avg: avgs.length ? meanOf(avgs) : 0,
      perCounty: items.some(i => i.a.perCountyTiming)
    };
  }

  async function loadCompare(rec, a, host) {
    const say = t => host.replaceChildren(el("p", "gd-note-p", t));
    if (typeof window.loadGameHistory !== "function" || typeof window.loadGameForView !== "function") return say("Comparing isn't available here.");
    if (rec.is_retry) return say("Retry Missed runs aren't compared.");
    if (rec.outcome !== "perfect" && rec.outcome !== "complete") return say("This run wasn't finished, so there's no fair comparison.");
    try {
      const same = k => [...k].sort().join(",");
      const all = []; let offset = 0, total = Infinity;
      while (offset < total) {
        const res = await window.loadGameHistory({ mode: rec.mode, offset, limit: 200, oldestFirst: true });
        if (!res || res.error || !res.rows) break;
        all.push(...res.rows); total = res.total || 0; offset += res.rows.length;
        if (!res.rows.length) break;
      }
      const when = g => +new Date(g.played_at);
      const cands = all.filter(g => g.id !== rec.id && (g.outcome === "perfect" || g.outcome === "complete") && !g.is_retry && g.total === rec.total && same(g.state_keys) === same(rec.state_keys))
        .sort((x, y) => when(y) - when(x));                            // newest first
      if (!cands.length) return say("Nothing to compare yet. Finish another run of this exact set of states and it will show up here.");
      const before = cands.filter(g => when(g) < when(rec));
      const perfects = cands.filter(g => g.outcome === "perfect");
      const bestRec = perfects.length ? perfects.reduce((m, g) => (g.time_ms < m.time_ms ? g : m)) : null;
      const prevRec = before[0] || null;
      const beatBest = bestRec && rec.time_ms < bestRec.time_ms;

      const pick = el("div", "gd-cmp-pick");
      const lab = el("label", null, "Compare with");
      const sel = el("select", "gd-select");
      const add = (parent, v, t) => { const o = el("option", null, t); o.value = v; parent.append(o); };
      if (bestRec) add(sel, "best", `${beatBest ? "Your previous best" : "Your best"} (${fmtMs(bestRec.time_ms)})`);
      if (prevRec) add(sel, "prev", `Previous run (${fmtMs(prevRec.time_ms)})`);
      if (before.length >= 2) add(sel, "avg", `Your average (last ${Math.min(10, before.length)} runs)`);
      const grp = document.createElement("optgroup"); grp.label = "A specific run";
      cands.slice(0, 60).forEach(g => add(grp, "run:" + g.id, `${fmtDate(g.played_at)} · ${fmtMs(g.time_ms)}${g.outcome === "perfect" ? "" : " (with mistakes)"}`));
      sel.append(grp);
      lab.append(sel); pick.append(lab);

      const body = el("div", "gd-cmp-body");
      host.replaceChildren(pick, body);
      let token = 0;
      const show = async () => {
        const v = sel.value, mine = ++token;
        body.replaceChildren(el("p", "gd-note-p", "Loading…"));
        try {
          let base;
          if (v === "avg") {
            const items = (await Promise.all(before.slice(0, 10).map(g => viewAnalysis(g.id)))).filter(Boolean);
            if (!items.length) throw new Error("couldn't open those runs");
            base = baselineOf(items, "Your average", `average of ${items.length} runs`, "average");
          } else {
            const id = v === "best" ? bestRec.id : v === "prev" ? prevRec.id : v.slice(4);
            const it = await viewAnalysis(id);
            if (!it) { if (mine === token) body.replaceChildren(el("p", "gd-note-p", "Couldn't open that run.")); return; }
            const [title, short] = v === "best" ? [beatBest ? "Your previous best" : "Your best", beatBest ? "previous best" : "best"] : v === "prev" ? ["Previous run", "previous run"] : ["That run", "that run"];
            base = baselineOf([it], title, fmtDate(it.rec.played_at), short);
          }
          if (mine === token) drawCompare(rec, a, base, body);
        } catch (e) { if (mine === token) body.replaceChildren(el("p", "gd-note-p", "Couldn't compare: " + (e.message || e))); }
      };
      sel.addEventListener("change", show);
      show();
    } catch (e) { say("Couldn't compare: " + (e.message || e)); }
  }

  /* the running gap: up is ahead of what you're comparing with, down is behind */
  function gapChart(pts) {
    const f = chartFrame(640, 200, 84, 16, 18, 24);
    const n = pts.length;
    const span = Math.max(500, ...pts.map(p => Math.abs(p.cum))) * 1.2;
    const mid = f.mt + f.ih / 2;
    const X = i => f.ml + (i / n) * f.iw, Y = v => mid + (v / span) * (f.ih / 2);
    const id = "gdgap" + (++cloneSerial);
    f.s.append(sv("defs", {}, [
      sv("clipPath", { id: id + "u" }, [sv("rect", { x: f.ml, y: f.mt, width: f.iw, height: mid - f.mt })]),
      sv("clipPath", { id: id + "d" }, [sv("rect", { x: f.ml, y: mid, width: f.iw, height: f.mt + f.ih - mid })])
    ]));
    [-span, 0, span].forEach(v => f.s.append(sv("line", { x1: f.ml, x2: f.ml + f.iw, y1: Y(v), y2: Y(v), class: "gd-grid" })));
    f.s.append(txt(f.ml - 8, Y(-span) + 4, `${fmtGap(span)} ahead`, "end"), txt(f.ml - 8, Y(0) + 4, "even", "end"), txt(f.ml - 8, Y(span) + 4, `${fmtGap(span)} behind`, "end"));
    const all = [{ cum: 0 }, ...pts];
    const line = all.map((p, i) => (i ? "L" : "M") + X(i).toFixed(1) + " " + Y(p.cum).toFixed(1)).join("");
    const area = line + `L${X(n).toFixed(1)} ${mid}L${X(0)} ${mid}Z`;
    f.s.append(sv("path", { d: area, class: "gd-gap-ahead", "clip-path": `url(#${id}u)` }), sv("path", { d: area, class: "gd-gap-behind", "clip-path": `url(#${id}d)` }));
    f.s.append(sv("path", { d: line, class: "gd-line" }));
    const hi = pts.reduce((m, p, i) => (p.cum > pts[m].cum ? i : m), 0), lo = pts.reduce((m, p, i) => (p.cum < pts[m].cum ? i : m), 0);
    const lastI = n - 1;
    pts.forEach((p, i) => {
      const c = sv("circle", { cx: X(i + 1), cy: Y(p.cum), r: i === lastI ? 5 : 3, class: i === lastI ? "gd-dot gd-dot-now" : "gd-dot" });
      const t = sv("title"); t.textContent = `${p.name}: ${fmtDelta(p.d)} on this one, ${fmtGap(Math.abs(p.cum))} ${p.cum > 0 ? "behind" : p.cum < 0 ? "ahead" : "even"} so far`;
      c.append(t); f.s.append(c);
    });
    const tag = (i, text, below) => {
      const x = X(i + 1), y = Y(pts[i].cum) + (below ? 18 : -10);
      f.s.append(txt(x, y, text, x > f.ml + f.iw - 90 ? "end" : x < f.ml + 90 ? "start" : "middle", "gd-note"));
    };
    const done = new Set();
    const label = (i, below) => { if (done.has(i)) return; done.add(i); const c = pts[i].cum; tag(i, `${pts[i].name} · ${fmtGap(Math.abs(c))} ${c > 0 ? "behind" : "ahead"}`, below); };
    if (pts[hi].cum > EVEN) label(hi, true);
    if (pts[lo].cum < -EVEN) label(lo, false);
    if (!done.has(lastI) && Math.abs(pts[lastI].cum) > EVEN) { const c = pts[lastI].cum; tag(lastI, `${fmtGap(Math.abs(c))} ${c > 0 ? "behind" : "ahead"}`, c > 0); }
    f.s.append(txt(f.ml, f.H - 6, "start", "start"), txt(f.ml + f.iw, f.H - 6, "last found", "end"));
    return f.s;
  }

  /* a sortable table: click a heading to sort by it, again to flip. Empty cells always go last. */
  function sortTable(cols, data, tie) {
    let sortCol = 0, sortDir = 1;
    const table = el("table", "gd-table");
    const thead = el("thead"), hr = el("tr"), tb = el("tbody");
    const ths = cols.map((c, i) => {
      const th = el("th", "gd-sortable");
      th.tabIndex = 0;
      th.append(document.createTextNode(c.label), el("span", "gd-sort"));
      const go = () => { if (sortCol === i) sortDir = -sortDir; else { sortCol = i; sortDir = c.dir; } draw(); };
      th.addEventListener("click", go);
      th.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
      hr.append(th);
      return th;
    });
    const draw = () => {
      const c = cols[sortCol];
      const rows = [...data].sort((x, y) => {
        const vx = c.get(x), vy = c.get(y);
        if (vx == null && vy == null) return tie(x, y);
        if (vx == null) return 1;
        if (vy == null) return -1;
        const d = c.text ? vx.localeCompare(vy) : vx - vy;
        return (d * sortDir) || tie(x, y);
      });
      tb.replaceChildren(...rows.map(r => { const tr = el("tr"); cols.forEach(cc => { const td = el("td"); td.append(cc.show(r)); tr.append(td); }); return tr; }));
      ths.forEach((th, i) => {
        th.classList.toggle("asc", i === sortCol && sortDir === 1);
        th.classList.toggle("desc", i === sortCol && sortDir === -1);
        th.setAttribute("aria-sort", i === sortCol ? (sortDir === 1 ? "ascending" : "descending") : "none");
      });
    };
    thead.append(hr); table.append(thead, tb);
    draw();
    const wrap = el("div", "gd-table-wrap"); wrap.append(table);
    return wrap;
  }

  function drawCompare(rec, a, base, body) {
    const unit = api.unitWord(false, rec.state_keys), units = api.unitWord(true, rec.state_keys);
    const diffMs = rec.time_ms - base.time, faster = diffMs < 0;
    const even = Math.round(diffMs) === 0;
    const lc = s => s.charAt(0).toLowerCase() + s.slice(1);
    const pct = base.time ? Math.abs(diffMs) / base.time * 100 : 0;

    const list = [];                                                   // every one you found, in the order you found it
    let cum = 0;
    const perCounty = a.perCountyTiming && base.perCounty;
    if (perCounty) a.found.forEach((r, i) => {
      const o = base.rows.get(r.id);
      const d = r.dt > 0 && o && o.dt ? r.dt - o.dt : null;
      if (d != null) cum += d;
      list.push({ i, r, o, d, cum: d != null ? cum : null });
    });
    const cmp = list.filter(x => x.d != null);

    /* the verdict, big */
    const head = el("div", "gd-cmp-head");
    head.append(
      el("div", "gd-cmp-big" + (even ? "" : faster ? " gd-ahead-t" : " gd-behind-t"), even ? "Dead even" : `${fmtGap(Math.abs(diffMs))} ${faster ? "faster" : "slower"}`),
      el("div", "gd-cmp-sub", `than ${lc(base.title)} (${base.sub})${even ? "" : ` · ${pct.toFixed(1)}%`}`)
    );

    /* this run against the other, a pair of bars per measure */
    const pairs = el("div", "gd-pairs");
    const key = el("div", "gd-legend");
    [["gd-pair-now", "This run"], ["gd-pair-then", cap(base.short)]].forEach(([c, t]) => { const it = el("span", "gd-legend-item"); it.append(el("i", "gd-swatch " + c), document.createTextNode(t)); key.append(it); });
    pairs.append(key);
    const pair = (label, mine, theirs, fmt, scale) => {
      const r = el("div", "gd-pair"), bars = el("div", "gd-pair-bars");
      const max = Math.max(scale || 0, mine, theirs, 1e-9);
      r.append(el("div", "gd-pair-label", label));
      [[mine, "gd-pair-now"], [theirs, "gd-pair-then"]].forEach(([v, c]) => {
        const line = el("div", "gd-pair-line"), track = el("span", "gd-pair-track"), bar = el("i", "gd-pair-bar " + c);
        bar.style.width = (v > 0 ? Math.max(v / max * 100, 1.5) : 0) + "%";
        track.append(bar); line.append(track, el("span", "gd-pair-val", fmt(v))); bars.append(line);
      });
      r.append(bars); pairs.append(r);
    };
    pair("Time", rec.time_ms, base.time, ms => fmtMs(ms));
    if (perCounty && a.avg && base.avg) pair("Average per " + unit, a.avg, base.avg, fmtT);
    const extra = [];                                                   // mistakes and first try: a sentence, and only when they differ
    if ((rec.wrong_count || 0) !== base.wrong) extra.push(`${rec.wrong_count || 0} mistakes (${base.short}: ${fmtN(base.wrong)})`);
    if (a.counts.first !== base.first) extra.push(`${a.counts.first} of ${a.rows.length} first try (${base.short}: ${fmtN(base.first)})`);
    if (cmp.length) {
      const nF = cmp.filter(x => x.d < -EVEN).length, nS = cmp.filter(x => x.d > EVEN).length, nE = cmp.length - nF - nS;
      const r = el("div", "gd-pair"), box = el("div", "gd-pair-bars"), bar = el("div", "gd-stack");
      [[nF, "gd-cmp-f", "faster"], [nE, "gd-cmp-e", "even"], [nS, "gd-cmp-s", "slower"]].forEach(([n, c, w]) => { if (!n) return; const s = el("span", "gd-seg " + c); s.style.flexGrow = n; s.title = `${w} on ${n}`; bar.append(s); });
      box.append(bar, el("div", "gd-pair-sub", `faster on ${nF}${nE ? `, even on ${nE}` : ""}, slower on ${nS}${cmp.length < a.found.length ? ` (${cmp.length} of ${a.found.length} could be compared)` : ""}`));
      r.append(el("div", "gd-pair-label", cap(units)), box); pairs.append(r);
    }
    if (extra.length) pairs.append(el("p", "gd-cmp-extra", extra.join(" \u00B7 ")));
    body.replaceChildren(head, pairs);

    if (!perCounty) { body.append(el("p", "gd-note-p", "This mode has no per-" + unit + " timing, so only the totals can be compared.")); return; }
    if (!cmp.length) { body.append(el("p", "gd-note-p", `No ${units} in common to compare.`)); return; }

    body.append(section("The gap, as the run went", gapChart(cmp.map(x => ({ name: x.r.name, d: x.d, cum: x.cum })))));

    const maxAbs = Math.max(500, ...cmp.map(x => Math.abs(x.d)));
    const diffCell = x => {
      if (x.d == null) return document.createTextNode("–");
      const cell = el("span", "gd-diff");
      cell.append(el("span", "gd-diff-num" + (x.d > EVEN ? " gd-behind-t" : x.d < -EVEN ? " gd-ahead-t" : ""), fmtDelta(x.d)));
      const track = el("span", "gd-diff-track"), fill = el("i", "gd-diff-fill " + (x.d > 0 ? "slower" : "faster"));
      fill.style.width = Math.min(50, Math.abs(x.d) / maxAbs * 50) + "%";
      track.append(fill); cell.append(track);
      return cell;
    };
    const t = s => document.createTextNode(s);
    const cols = [
      { label: "#", dir: 1, get: x => x.i, show: x => t(String(x.i + 1)) },
      { label: cap(unit), text: true, dir: 1, get: x => x.r.name, show: x => t(x.r.name + stSuffix(x.r.stateKey, x.r.name)) },
      { label: "This run", dir: 1, get: x => x.r.dt, show: x => t(fmtT(x.r.dt)) },
      { label: cap(base.short), dir: 1, get: x => (x.o && x.o.dt) || null, show: x => t(x.o && x.o.dt ? fmtT(x.o.dt) : "–") },
      { label: "Difference", dir: -1, get: x => x.d, show: diffCell },
      { label: "Gap", dir: -1, get: x => x.cum, show: x => t(x.cum == null ? "–" : fmtDelta(x.cum)) },
      { label: "Misses", dir: -1, get: x => x.r.m, show: x => t(x.o ? `${x.r.m} vs ${fmtN(x.o.m)}` : String(x.r.m)) }
    ];
    body.append(section(`${cap(unit)} by ${unit}`, sortTable(cols, list, (x, y) => x.i - y.i)));
    body.append(el("p", "gd-cmp-note", `Green means faster than ${base.short === "average" ? "your average" : base.short}, red means slower. Gap adds the differences up in the order you found them. Click a heading to sort.`));
  }

  /* ---------- the detail page ---------- */
  let returnScreen = "screen-home", detailActive = false, openToken = 0;

  function tile(label, value, sub) {
    const t = el("div", "gd-tile");
    t.append(el("div", "gd-tile-v", value), el("div", "gd-tile-l", label));
    if (sub) t.append(el("div", "gd-tile-s", sub));
    return t;
  }
  const section = (title, node, hint) => {
    const s = el("section", "gd-section");
    s.append(el("h3", null, title));
    s.append(node);
    return s;
  };
  function listBlock(rows, fmt, empty) {
    if (!rows.length) return el("p", "gd-note-p", empty);
    const ol = el("ol", "gd-list");
    rows.forEach(r => { const li = el("li"); li.append(el("span", "gd-li-name", r.name + stSuffix(r.stateKey, r.name)), el("span", "gd-li-val", fmt(r))); ol.append(li); });
    return ol;
  }

  function pickText(pk) {
    const c = api.findCounty(pk);
    return c ? `${c.name}${stSuffix(c.stateKey, c.name)}` : `"${pk}"`;
  }

  /* the States row: a few states are listed one per line; a long list is just "6 states ▸", and the triangle opens it */
  function statesList(keys) {
    const LIMIT = 3;
    const names = keys.map(stateName).sort((x, y) => x.localeCompare(y));
    const box = el("div", "gd-states");
    const list = el("ul", "gd-states-list");
    names.forEach(n => list.append(el("li", null, n)));
    if (names.length <= LIMIT) { box.append(list); return box; }
    list.classList.add("collapsed");
    const label = `${names.length} states`;
    const toggle = el("button", "gd-states-toggle", `${label} \u25B8`);
    toggle.type = "button";
    toggle.setAttribute("aria-expanded", "false");
    toggle.addEventListener("click", () => {
      const open = list.classList.toggle("collapsed") === false;
      toggle.textContent = `${label} ${open ? "\u25BE" : "\u25B8"}`;
      toggle.setAttribute("aria-expanded", String(open));
    });
    box.append(toggle, list);
    return box;
  }

  function buildDetail(view) {
    const { record: rec, mine, owner, pending } = view;
    const a = analyze(rec);
    multiState = (rec.state_keys || []).length > 1;
    if (api.clearPins) api.clearPins();
    const frag = document.createDocumentFragment();

    const top = el("div", "gd-top");
    const back = el("button", "btn-back gd-back", "Back");
    back.type = "button";
    back.addEventListener("click", () => { location.hash = ""; });
    top.append(back);
    frag.append(top);

    const page = el("div", "gd-page");
    const side = el("aside", "gd-side");
    const big = (v, l) => { const d = el("div", "gd-big"); d.append(el("div", "gd-big-v", v), el("div", "gd-big-l", l)); return d; };
    side.append(big(rec.accuracy + "%", "accuracy"), big(fmtBig(rec.time_ms), "time"));
    const main = el("div", "gd-main");

    const head = el("div", "gd-head");
    const titleRow = el("div", "gd-title-row");
    const title = el("h2", "gd-title");
    let defaultTitle = `${MODE_NAME[rec.mode] || rec.mode} on ${statesLabel(rec.state_keys)}`;
    const paintTitle = () => { title.textContent = (rec.title && rec.title.trim()) || defaultTitle; };
    paintTitle();
    titleRow.append(title);
    if (mine) {
      const rename = el("button", "gd-rename"); rename.type = "button"; rename.title = "Rename"; rename.setAttribute("aria-label", "Rename this game");
      rename.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M4 20h4L19 9a2.1 2.1 0 0 0-3-3L5 17l-1 3z M14.5 7.5l3 3"/></svg>';
      rename.addEventListener("click", () => {
        const input = el("input", "gd-title-input"); input.type = "text"; input.maxLength = 80;
        input.value = (rec.title && rec.title.trim()) || defaultTitle; input.setAttribute("aria-label", "Game name");
        let done = false;
        const finish = async save => {
          if (done) return; done = true;
          if (save) {
            const v = input.value.trim(), next = (!v || v === defaultTitle) ? null : v;
            if (next !== (rec.title || null)) {
              const res = await window.setGameTitle(rec.id, next);
              if (res && res.ok) rec.title = next; else if (res && res.message) { rename.title = res.message; alert(res.message); }
            }
          }
          input.replaceWith(title); rename.hidden = false; paintTitle();
        };
        input.addEventListener("keydown", e => { if (e.key === "Enter") finish(true); else if (e.key === "Escape") finish(false); });
        input.addEventListener("blur", () => finish(true));
        title.replaceWith(input); rename.hidden = true; input.focus(); input.select();
      });
      titleRow.append(rename);
    }
    head.append(titleRow);
    const sub = [fmtDate(rec.played_at)];
    if (rec.outcome === "gave_up" || rec.outcome === "failed") sub.push(OUTCOME[rec.outcome]);   // a perfect or mistake-filled finish shows in the numbers below
    if (rec.is_retry) sub.push("Retry Missed");
    if (rec.excluded > 0) sub.push(`${rec.excluded} excluded`);
    if (!mine && owner) sub.push(`played by ${owner}`);
    if (pending) sub.push("not uploaded yet");
    head.append(el("p", "gd-when", sub.join(" · ")));
    if (mine) addRunNumber(rec, n => { defaultTitle += `, run #${n}`; if (!title.isConnected) return; paintTitle(); });
    main.append(head);

    const facts = el("dl", "gd-facts");
    const row = (k, v) => { const dd = el("dd"); dd.append(v); facts.append(el("dt", null, k), dd); };
    row("Mode", MODE_NAME[rec.mode] || rec.mode);
    row(rec.state_keys.length === 1 ? "State" : "States", statesList(rec.state_keys));
    row("Found", `${a.found.length} of ${rec.total}`);
    row("First try", String(a.counts.first));
    row("Mistakes", String(rec.wrong_count));
    if (a.perCountyTiming && a.avg) row("Average", fmtSec(a.avg));
    if (a.fastest.length) row("Fastest", `${fmtSec(a.fastest[0].dt)} · ${a.fastest[0].name}`);
    if (a.slowest.length) row("Slowest", `${fmtSec(a.slowest[0].dt)} · ${a.slowest[0].name}`);
    main.append(facts);

    if (mine) main.append(shareBar(rec, !!pending));

    const panels = [];
    let out = main;
    const tab = (id, label) => { const p = el("div", "gd-panel"); p.dataset.tab = id; p.hidden = panels.length > 0; panels.push({ id, label, p }); out = p; };
    tab("overview", "overview");
    out.append(section("How it went", stackBar(a.counts, a.rows.length)));
    const mapsHost = el("div", "gd-maps-host");
    const mapsSection = section("County by county", mapsHost, "Every " + api.unitWord(false, rec.state_keys) + " coloured by how it went. Hover one for details.");
    if (a.found.length > 1) mapsSection.insertBefore(replayBar(rec, a), mapsHost);
    out.append(mapsSection);

    tab("timing", "timing");
    if (a.found.length > 1) out.append(section("Progress over time", progressChart(rec, a), `How fast you found them. Every red tick is a wrong guess.`));
    if (a.perCountyTiming) out.append(section("Time per " + api.unitWord(false, rec.state_keys), timeBars(a), "Each bar is one, in the order you found them. Taller means you took longer. Colours match the map."));
    else if (rec.mode === "type" && a.found.length) out.append(section("Time per county", el("p", "gd-note-p", "List mode has no single target at a time, so per-county timing isn't meaningful here.")));

    tab("misses", "mistakes");
    if (a.perCountyTiming || a.mostMissed.length) {
      const two = el("div", "gd-two");
      if (a.perCountyTiming) {
        const slowBox = el("div");
        const drawSlowest = firstOnly => {
          const rows = a.found.filter(r => !firstOnly || r.cls === "first").sort((x, y) => y.dt - x.dt).slice(0, 10);
          slowBox.replaceChildren(listBlock(rows, r => fmtSec(r.dt), "Nothing to show."));
        };
        const firstTry = el("label", "gd-check");
        const cb = el("input"); cb.type = "checkbox";
        cb.addEventListener("change", () => drawSlowest(cb.checked));
        firstTry.append(cb, document.createTextNode(" Only ones you got on the first try"));
        drawSlowest(false);
        const slowSection = section("Slowest", slowBox);
        slowSection.append(firstTry);
        two.append(slowSection);
      }
      two.append(section("Most missed", listBlock(a.mostMissed, r => `${r.m} wrong`, "No wrong guesses. Nice.")));
      out.append(two);
    }

    if (a.mixups.length || a.stray.length) {
      const ul = el("ul", "gd-mix");
      a.mixups.forEach(m => {
        const li = el("li");
        li.append(el("span", "gd-li-name", `${m.target.name}${stSuffix(m.target.stateKey, m.target.name)}`), el("span", "gd-arrow", "→"), el("span", null, `you said ${pickText(m.pick)}`));
        if (m.n > 1) li.append(el("span", "gd-li-val", `×${m.n}`));
        ul.append(li);
      });
      if (a.stray.length) ul.append(Object.assign(el("li", "gd-note-li"), { textContent: `${a.stray.length} typed guess${a.stray.length > 1 ? "es" : ""} didn't match anything (e.g. "${a.stray[0][1]}").` }));
      out.append(section("Mix-ups", ul, "What you picked instead of the right answer."));
    }

    tab("states", "by state");
    if (a.byState.length > 1) {
      // click a heading to sort by it; click again to flip. Empty cells (no finish time) always go last.
      const pct = g => g.total ? Math.round(g.first / g.total * 100) : 0;
      const cols = [
        { label: "State", text: true, dir: 1, get: g => stateName(g.key), show: g => stateName(g.key) },
        { label: cap(api.unitWord(true, rec.state_keys)), dir: -1, get: g => g.total, show: g => String(g.total) },
        { label: "First try", dir: -1, get: g => (g.total ? g.first / g.total : 0), show: g => `${g.first} (${pct(g)}%)` },
        { label: "Wrong", dir: -1, get: g => g.mistakes, show: g => String(g.mistakes) },
        { label: "Finished at", dir: 1, get: g => a.stateTimes[g.key] || null, show: g => (a.stateTimes[g.key] ? fmtMs(a.stateTimes[g.key]) : "-") }
      ];
      let sortCol = 0, sortDir = 1;
      const table = el("table", "gd-table");
      const thead = el("thead"), hr = el("tr"), tb = el("tbody");
      const ths = cols.map((c, i) => {
        const th = el("th", "gd-sortable");
        th.tabIndex = 0;
        th.append(document.createTextNode(c.label), el("span", "gd-sort"));
        const go = () => { if (sortCol === i) sortDir = -sortDir; else { sortCol = i; sortDir = c.dir; } draw(); };
        th.addEventListener("click", go);
        th.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); } });
        hr.append(th);
        return th;
      });
      const draw = () => {
        const c = cols[sortCol];
        const rows = [...a.byState].sort((x, y) => {
          const vx = c.get(x), vy = c.get(y);
          if (vx == null && vy == null) return stateName(x.key).localeCompare(stateName(y.key));
          if (vx == null) return 1;
          if (vy == null) return -1;
          const d = c.text ? vx.localeCompare(vy) : vx - vy;
          return (d * sortDir) || stateName(x.key).localeCompare(stateName(y.key));
        });
        tb.replaceChildren(...rows.map(g => { const tr = el("tr"); cols.forEach(cc => tr.append(el("td", null, cc.show(g)))); return tr; }));
        ths.forEach((th, i) => {
          th.classList.toggle("asc", i === sortCol && sortDir === 1);
          th.classList.toggle("desc", i === sortCol && sortDir === -1);
          th.setAttribute("aria-sort", i === sortCol ? (sortDir === 1 ? "ascending" : "descending") : "none");
        });
      };
      thead.append(hr); table.append(thead, tb);
      draw();
      const wrap = el("div", "gd-table-wrap"); wrap.append(table);
      out.append(section("By state", wrap));
    }
    if (mine && rec.mode !== "tuc") {
      tab("compare", "compare");
      const cmpHost = el("div", "gd-compare");
      cmpHost.append(el("p", "gd-note-p", "Finding your best run…"));
      out.append(cmpHost);
      loadCompare(rec, a, cmpHost);
    }
    
    const trendHost = el("div", "gd-trend-host");
    if (mine) panels[0].p.append(trendHost);
    const bar = el("div", "gd-tabs");
    const live = panels.filter(x => x.p.childNodes.length || x.id === "overview");
    live.forEach((x, i) => {
      const b = el("button", "gd-tab" + (i ? "" : " on"), x.label); b.type = "button";
      b.addEventListener("click", () => { bar.querySelectorAll(".gd-tab").forEach(t => t.classList.toggle("on", t === b)); live.forEach(y => { y.p.hidden = y !== x; }); });
      bar.append(b);
    });
    main.append(bar);
    live.forEach(x => main.append(x.p));

    page.append(side, main);
    frag.append(page);
    root.replaceChildren(frag);
    renderMaps(rec, a, mapsHost);
    if (mine) renderTrend(rec, trendHost);
  }

  /* "Rhode Island Pin, run #7": how many games of this mode on these states you'd played by then, this one included */
  async function addRunNumber(rec, setRun) {
    if (typeof window.loadGameHistory !== "function") return;
    try {
      const same = k => [...k].sort().join(",");
      const all = [];
      let offset = 0, total = Infinity;
      while (offset < total) {
        const res = await window.loadGameHistory({ mode: rec.mode, offset, limit: 200, oldestFirst: true });
        if (!res || res.error || !res.rows) break;
        all.push(...res.rows); total = res.total || 0; offset += res.rows.length;
        if (!res.rows.length) break;
      }
      const have = new Set(all.map(g => g.id));
      (window.getPendingGames ? window.getPendingGames() : []).forEach(g => { if (!have.has(g.id) && g.mode === rec.mode) all.push(g); });
      const mine = all.filter(g => same(g.state_keys) === same(rec.state_keys));
      if (!mine.some(g => g.id === rec.id)) mine.push(rec);
      const n = mine.filter(g => new Date(g.played_at) <= new Date(rec.played_at)).length;
      if (n) setRun(n);
    } catch (e) { /* the title just stays without a number */ }
  }

  async function renderTrend(rec, host) {
    if (typeof window.loadGameHistory !== "function") return;
    const res = await window.loadGameHistory({ mode: rec.mode, limit: 60, oldestFirst: false });
    if (!res || !res.rows) return;
    const same = k => [...k].sort().join(",");
    const games = res.rows.filter(g => same(g.state_keys) === same(rec.state_keys) && g.is_retry === rec.is_retry).reverse();
    if (games.length < 2) return;
    const now = games.findIndex(g => g.id === rec.id);
    const wrap = el("div", "gd-two");
    const acc = el("div"); acc.append(miniLine(games.map(g => g.accuracy), now, v => Math.round(v) + "%", 0, 100));
    wrap.append(section("Accuracy, game to game", acc));
    const done = games.filter(g => g.outcome === "perfect" || g.outcome === "complete");
    if (done.length >= 2) {
      const tm = el("div"); tm.append(miniLine(done.map(g => g.time_ms), done.findIndex(g => g.id === rec.id), v => fmtMs(v).replace(/\.\d+$/, "")));
      wrap.append(section("Time, game to game", tm));
    }
    host.append(el("h3", "gd-trend-title", `Your progress on ${statesLabel(rec.state_keys)} (${MODE_NAME[rec.mode] || rec.mode})`), wrap);
  }

  function shareBar(rec, pending) {
    const bar = el("div", "gd-share");
    const label = el("label", "gd-share-label");
    const cb = el("input"); cb.type = "checkbox"; cb.checked = !!rec.is_shared;
    label.append(cb, document.createTextNode(" Share this game"));
    const link = location.origin && location.origin !== "null" ? location.href.split("#")[0] + "#game-" + rec.id : "#game-" + rec.id;
    const copy = el("button", "btn-secondary gd-small-btn", "Copy link"); copy.type = "button";
    const msg = el("span", "gd-share-msg", pending ? "Saving this game to your account first…" : "");
    copy.addEventListener("click", async () => {
      try { await navigator.clipboard.writeText(link); msg.textContent = cb.checked ? "Link copied." : "Link copied. It only works for you until you switch sharing on."; }
      catch (e) { msg.textContent = link; }
    });
    cb.addEventListener("change", async () => {
      cb.disabled = true; msg.textContent = "Saving…";
      const res = await window.setGameShared(rec.id, cb.checked);
      cb.disabled = false;
      if (!res.ok) { cb.checked = !cb.checked; msg.textContent = res.message || "Couldn't change sharing."; return; }
      rec.is_shared = cb.checked;
      msg.textContent = cb.checked ? "Sharing is on. Anyone with the link can view it." : "Sharing is off. Only you can see it.";
    });
    bar.append(label, copy, msg);
    return bar;
  }

  async function openDetail(id) {
    const token = ++openToken;
    const active = document.querySelector(".screen.active");
    if (active && active.id !== "screen-game-detail") returnScreen = active.id === "screen-game" ? "screen-home" : active.id;
    detailActive = true;
    root.replaceChildren(el("p", "gd-loading", "Loading game…"));
    api.showScreen("screen-game-detail");
    const app = document.querySelector(".app-container"); if (app) app.classList.add("wide-settings");
    window.scrollTo(0, 0);
    let view = null;
    try {
      const cached = window.__gameCache && window.__gameCache[id];
      if (cached) view = { record: cached, mine: true, owner: "", pending: !!(window.getPendingGame && window.getPendingGame(id)) };   // the game you just played
      else if (window.loadGameForView) view = await window.loadGameForView(id);
    } catch (e) { console.warn("Couldn't open that game:", e); }
    if (token !== openToken) return;
    if (!view || !view.record || !view.record.data) {
      const box = el("div", "gd-missing");
      box.append(el("h2", null, "Game not found"), el("p", null, "It may be private, or the link may be wrong. Only the person who played it can open a game unless they've shared it."));
      const b = el("button", "btn-secondary", "Back"); b.type = "button"; b.addEventListener("click", () => { location.hash = ""; });
      box.append(b);
      root.replaceChildren(box);
      return;
    }
    buildDetail(view);
  }

  function leaveDetail() {
    detailActive = false; openToken++;
    if (api.clearPins) api.clearPins();
    api.showScreen(returnScreen || "screen-home");
  }

  function route() {
    const m = /^#game-([0-9a-f-]{36})$/i.exec(location.hash);
    if (m) openDetail(m[1].toLowerCase());
    else if (detailActive) leaveDetail();
  }
  window.addEventListener("hashchange", route);

  window.gameHistory = { open: id => { location.hash = "#game-" + id; }, analyze, fmtMs };
  route();
});