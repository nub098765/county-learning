/* Records: every run you've played, in the Records layout (a tab per mode, a fold-out row per set of states),
   each run a link to its game page. */
document.addEventListener("DOMContentLoaded", () => {
  const scr = document.getElementById("screen-records");
  const host = document.getElementById("records-all");
  if (!scr || !host) return;

  const MODE_LABEL = { pin: "Pin", "pin-hard": "Flash", mc: "Multiple Choice", type: "List", "type-strict": "Type", "type-hard": "Identify", tuc: "Ultimate Challenge" };
  const MODE_CLASS = { pin: "pin", "pin-hard": "pin", mc: "mc", "type-hard": "type", "type-strict": "type", type: "list", tuc: "tuc" };
  const MODE_ORDER = Object.keys(MODE_LABEL);
  const OUTCOME = { perfect: "Perfect", complete: "Finished with mistakes", gave_up: "Gave up", failed: "Challenge failed" };

  const api = () => window.countellect || {};
  const names = keys => keys.map(k => (api().stateData && api().stateData[k] ? api().stateData[k].name : k)).join(", ");
  const word = (n, keys) => (api().unitWord ? api().unitWord(n !== 1, keys) : (n === 1 ? "county" : "counties"));
  function fmtTime(ms) {
    const t = Math.max(0, Math.round(ms)), m = Math.floor(t / 60000), s = Math.floor((t % 60000) / 1000), r = t % 1000;
    return `${m}:${String(s).padStart(2, "0")}.${String(r).padStart(3, "0")}`;
  }
  const fmtShort = iso => new Date(iso).toLocaleString([], { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });
  const fmtDate = iso => new Date(iso).toLocaleString([], { dateStyle: "medium", timeStyle: "medium" });
  const el = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };

  let games = [], status = "", openKeys = new Set();
  const ui = { sortStates: "state", sortTimes: "newest", show: "all" };

  function toolbar() {
    const bar = el("div", "records-toolbar");
    const mk = (label, key, opts) => {
      const l = el("label", null, label), s = el("select");
      opts.forEach(([v, t]) => { const o = el("option", null, t); o.value = v; s.append(o); });
      s.value = ui[key];
      s.addEventListener("change", () => { ui[key] = s.value; render(); });
      bar.append(l, s);
    };
    mk("Show", "show", [["all", "All runs"], ["perfect", "Perfect runs only"]]);
    mk("Sort states", "sortStates", [["state", "Name (A–Z)"], ["recent", "Recently played"], ["runs", "Most played"]]);
    mk("Sort times", "sortTimes", [["newest", "Newest first"], ["oldest", "Oldest first"], ["fastest", "Fastest first"]]);
    return bar;
  }

  let modeTab = null;

  function render() {
    openKeys = new Set([...host.querySelectorAll("details[open]")].map(d => d.dataset.key));
    host.replaceChildren();
    host.append(toolbar());
    // run numbers: the nth game of this mode on this set of states, counting every game (not just the ones the filter shows)
    const runNo = new Map(), seen = new Map();
    [...games].sort((a, b) => new Date(a.played_at) - new Date(b.played_at)).forEach(g => {
      const k = [...(g.state_keys || [])].sort().join(",") + "|" + g.mode;
      seen.set(k, (seen.get(k) || 0) + 1); runNo.set(g.id, seen.get(k));
    });
    const shown = games.filter(g => ui.show === "all" || (g.outcome === "perfect" && !g.is_retry));
    if (status) { host.append(el("p", "records-empty", status)); return; }
    if (!shown.length) { host.append(el("p", "records-empty", ui.show === "perfect" ? "No perfect runs yet." : "No runs yet. Finish a game and it will show up here.")); return; }

    // sorted into the mode it was played in; one row per set of states
    const byMode = new Map();
    for (const g of shown) {
      if (!byMode.has(g.mode)) byMode.set(g.mode, new Map());
      const rows = byMode.get(g.mode), sk = (g.state_keys || []).join(",");
      if (!rows.has(sk)) rows.set(sk, { key: sk + "|" + g.mode, sk, keys: g.state_keys, name: names(g.state_keys), runs: [], last: 0 });
      const row = rows.get(sk);
      row.runs.push(g);
      row.last = Math.max(row.last, +new Date(g.played_at));
    }
    const modes = MODE_ORDER.filter(m => byMode.has(m));
    for (const m of byMode.keys()) if (!modes.includes(m)) modes.push(m);
    if (!modes.includes(modeTab)) modeTab = modes[0];

    const tabs = el("div", "rec-tabs");
    for (const m of modes) {
      const b = el("button", "rec-tab" + (m === modeTab ? " on" : ""), MODE_LABEL[m] || m);
      b.type = "button";
      b.addEventListener("click", () => { modeTab = m; render(); });
      tabs.append(b);
    }
    host.append(tabs);

    const rows = [...byMode.get(modeTab).values()].sort((a, b) => {
      if (ui.sortStates === "state") return a.name.localeCompare(b.name);
      if (ui.sortStates === "runs") return b.runs.length - a.runs.length || a.name.localeCompare(b.name);
      return b.last - a.last;
    });
    const singles = rows.filter(r => !r.sk.includes(",")), combos = rows.filter(r => r.sk.includes(","));

    const addRows = (list, heading) => {
      if (!list.length) return;
      if (heading) host.append(el("h3", "rec-heading", heading));
      const box = el("div", "rec-list");
      for (const r of list) {
        const stateTotal = r.keys.length;
        const det = el("details", "rec-row"); det.dataset.key = r.key; det.open = openKeys.has(r.key);
        const counts = new Set(r.runs.map(x => x.total));
        const perfect = r.runs.filter(x => x.outcome === "perfect" && !x.is_retry);
        const best = perfect.length ? Math.min(...perfect.map(x => x.time_ms)) : null;

        const sum = el("summary");
        const name = el("span", "rec-name", stateTotal > 3 ? `${stateTotal} states` : r.name);
        if (counts.size === 1) { const n = [...counts][0]; name.append(el("span", "rec-count", `${n} ${word(n, r.keys)}`)); }
        sum.append(name, el("span", "rec-best", best != null ? fmtTime(best) : "–"), el("span", "rec-runs", `${r.runs.length} run${r.runs.length === 1 ? "" : "s"}`));
        det.append(sum);
        if (stateTotal > 3) det.append(el("p", "rec-states-full", r.name));

        const ul = el("ul", "record-runs");
        const runs = [...r.runs];
        if (ui.sortTimes === "fastest") runs.sort((a, b) => a.time_ms - b.time_ms);
        else runs.sort((a, b) => (new Date(a.played_at) - new Date(b.played_at)) * (ui.sortTimes === "oldest" ? 1 : -1));
        for (const x of runs) {
          const li = el("li"); if (best != null && x.outcome === "perfect" && !x.is_retry && x.time_ms === best) li.classList.add("is-best");
          const a = el("a", "record-run-link"); a.href = "#game-" + x.id;
          a.title = (OUTCOME[x.outcome] || x.outcome) + (x.is_retry ? " (Retry Missed)" : "") + ` · ${x.accuracy}% · ${x.total} ${word(x.total, x.state_keys)}` + (x.pending ? " · not uploaded yet" : "");
          if (x.outcome !== "perfect" || x.is_retry) li.classList.add("not-perfect");
          const right = el("span", "record-run-right"); right.append(el("span", "record-run-time", fmtTime(x.time_ms)));
          const label = el("span", "record-run-name");
          label.append(el("span", "record-run-title", (x.title && x.title.trim()) || `Run #${runNo.get(x.id)}`), el("span", "record-run-date", fmtShort(x.played_at)));
          a.append(label, right); li.append(a); ul.append(li);
        }
        det.append(ul); box.append(det);
      }
      host.append(box);
    };
    const both = singles.length && combos.length;
    addRows(singles, both ? "Single State Runs" : "");
    addRows(combos, both ? "Combinations" : "");
  }

  let loading = false;
  async function load() {
    if (loading) return; loading = true;
    status = "Loading…"; render();
    const rows = []; let signedIn = false, error = "";
    try {
      let offset = 0, total = Infinity;
      while (offset < total) {
        const res = await window.loadGameHistory({ offset, limit: 200 });
        signedIn = !!res.signedIn; if (res.error) { error = res.error; break; }
        const got = res.rows || []; rows.push(...got); total = res.total || 0; offset += got.length;
        if (!got.length) break;
      }
    } catch (e) { error = e.message || String(e); }
    const have = new Set(rows.map(r => r.id));
    const pend = (window.getPendingGames ? window.getPendingGames() : []).filter(g => !have.has(g.id)).map(g => ({ ...g, pending: true }));
    games = [...pend, ...rows];
    status = error ? "Couldn't load your runs: " + error : (!signedIn && !games.length ? "Sign in to see your runs. Every game you play is kept." : "");
    loading = false; render();
  }

  /* Records has its own address (#records), so a refresh lands you back here instead of on the home screen.
     replaceState, not location.hash: it changes the address without adding a back-button step or firing hashchange. */
  const setHash = h => { try { history.replaceState(null, "", location.pathname + location.search + h); } catch (e) { /* file:// and the like: the address just doesn't change */ } };
  let wasActive = false;
  new MutationObserver(() => {
    const on = scr.classList.contains("active");
    if (on && !wasActive) { load(); setHash("#records"); }
    if (!on && wasActive && location.hash === "#records") setHash("");
    wasActive = on;
  }).observe(scr, { attributes: true, attributeFilter: ["class"] });
  wasActive = scr.classList.contains("active");
  if (wasActive) { load(); setHash("#records"); }
  else if (location.hash === "#records" && window.countellect && window.countellect.showScreen) window.countellect.showScreen("screen-records");   // opened or refreshed on this address
  // coming back from a game page: refresh in place
  window.addEventListener("hashchange", () => { if (scr.classList.contains("active")) load(); });
});