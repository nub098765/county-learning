  /* ---------- progress charts ---------- */
  const dayKey = iso => { const d = new Date(iso); return d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0") + "-" + String(d.getDate()).padStart(2, "0"); };
  const dayLabel = k => { const [y, m, d] = k.split("-").map(Number); return new Date(y, m - 1, d).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }); };
  const svgEl = (tag, attrs) => { const n = document.createElementNS(SVGNS, tag); for (const k in attrs) n.setAttribute(k, attrs[k]); return n; };

  async function fetchCompletions(userId) {
    const rows = [];
    for (let from = 0; ; from += 1000) {
      const { data, error } = await sb.from("completions").select("county_id, completed_at").eq("user_id", userId).order("completed_at").range(from, from + 999);
      if (error) return null;
      rows.push(...data);
      if (data.length < 1000) break;
    }
    return rows;
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

  function lineChart(days) {      // days: [{key, n}] cumulative, sorted
    const W = 600, H = 190, L = 40, R = 14, T = 12, B = 26;
    const wrap = mk("div", "pc-line");
    const svg = svgEl("svg", { viewBox: `0 0 ${W} ${H}`, class: "pc-svg", role: "img" });
    const max = days[days.length - 1].n;
    const niceMax = Math.max(10, Math.ceil(max / 50) * 50 > max * 1.6 ? Math.ceil(max / 10) * 10 : Math.ceil(max / 50) * 50);
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
      tip.textContent = `${dayLabel(days[best].key)} · ${days[best].n.toLocaleString()} counties`;
      tip.classList.remove("hidden");
      tip.style.left = Math.min(Math.max(x(best) / W * 100, 18), 82) + "%";
    };
    const leave = () => {
      cross.setAttribute("visibility", "hidden"); tip.classList.add("hidden");
      dot.setAttribute("cx", x(days.length - 1)); dot.setAttribute("cy", y(max));
    };
    svg.addEventListener("pointermove", move);
    svg.addEventListener("pointerleave", leave);
    svg.setAttribute("aria-label", `Counties found over time, ${max} so far`);
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

  function buildCharts(userId, tiles) {
    const box = mk("div", "pc");
    const bars = mk("section", "pc-sec");
    bars.append(mk("h3", "pc-title", "Counties by mode"), modeBars(tiles));
    box.append(bars);
    const hist = mk("section", "pc-sec");
    box.append(hist);
    fetchCompletions(userId).then(rows => {
      if (!rows || !rows.length) { hist.remove(); return; }
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
      hist.append(mk("h3", "pc-title", "Counties found over time"), lineChart(days),
        mk("p", "pc-note", "Anything you'd found before tracking began is counted on the first day shown."),
        mk("h3", "pc-title", "Recent activity"), activityGrid(perDay));
    });
    return box;
  }
