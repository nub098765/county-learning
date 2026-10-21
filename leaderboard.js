(function () {
  "use strict";
  const SUPABASE_URL = "https://jgwhnidtjnuufdjcmqdv.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impnd2huaWR0am51dWZkamNtcWR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIxOTE4MDgsImV4cCI6MjEwNzc2NzgwOH0.SsIHfT9TFvAYthQbwcD_Ee6W9T9a8yqlD2HfiAbcgCk";
  const TOP = 100;                       // rows shown when the search box is empty

  const $ = id => document.getElementById(id);
  const mk = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text !== undefined) n.textContent = text; return n; };
  if (!window.supabase) { $("lb-msg").textContent = "Couldn't load the service. Check your connection and reload."; return; }
  const sb = window.countellectSupabase || window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  let rows = [], myName = null;
  const focusName = new URLSearchParams(location.search).get("u");

  // scroll to a player's row; if they're outside the top list, search for them so the row exists
  function focusRow(name) {
    if (!name) return;
    const want = name.toLowerCase();
    const r = rows.find(x => x.username.toLowerCase() === want);
    if (r && r.rank > 0 && rows.indexOf(r) >= TOP) { $("lb-search").value = r.username; render(); }
    const tr = [...document.querySelectorAll("#lb-table tbody tr")].find(t => t.dataset.name.toLowerCase() === want);
    if (tr) { tr.scrollIntoView({ block: "center", behavior: "smooth" }); tr.classList.add("lb-me"); }
  }

  function markMe() {
    document.querySelectorAll("#lb-table tbody tr").forEach(tr => tr.classList.toggle("lb-me", (!!myName && tr.dataset.name === myName) || (!!focusName && tr.dataset.name.toLowerCase() === focusName.toLowerCase())));
  }

  const matches = () => {
    const q = $("lb-search").value.trim().toLowerCase();
    return q ? rows.filter(r => r.username.toLowerCase().includes(q)) : rows.slice(0, TOP);
  };

  function render() {
    const q = $("lb-search").value.trim();
    const shown = matches();
    $("lb-table").classList.toggle("hidden", !shown.length);
    $("lb-msg").textContent = shown.length ? "" : (q ? `No players match "${q}".` : "Nobody has any points yet. Be the first!");
    $("lb-table").querySelector("tbody").replaceChildren(...shown.map(r => {
      const tr = document.createElement("tr");
      tr.dataset.name = r.username;
      const a = mk("a", "profile-link", r.username);
      a.href = "profile.html?u=" + encodeURIComponent(r.username);
      const who = document.createElement("td");
      if (window.countellectIsOnline?.(r.username)) {
        const dot = mk("span", "online-dot", "");
        dot.setAttribute("aria-label", "Online");
        dot.title = "Online";
        who.append(dot);
      }
      who.append(a);
      if (r.has_tuc) who.append(" 🏆");
      tr.append(mk("td", "", r.rank <= 3 ? ["🥇", "🥈", "🥉"][r.rank - 1] : String(r.rank)), who, mk("td", "", Number(r.points).toLocaleString()));
      return tr;
    }));
    markMe();
  }

  $("lb-search").addEventListener("input", render);
  $("lb-search").addEventListener("keydown", e => {
    if (e.key !== "Enter") return;
    const m = matches();
    if (m.length === 1) location.href = "profile.html?u=" + encodeURIComponent(m[0].username);
  });

  function renderOnlineCount() {
    const status = $("lb-online-count");
    const count = window.countellectOnlineUsers?.size || 0;
    const text = window.countellectPresenceAvailable === null
      ? "Checking online status…"
      : window.countellectPresenceAvailable
        ? `${count} ${count === 1 ? "player" : "players"} online`
        : "Online status unavailable";
    status.lastElementChild.textContent = text;
    status.classList.toggle("presence-unavailable", !window.countellectPresenceAvailable);
    render();
  }

  window.addEventListener("countellect-presence-change", renderOnlineCount);
  renderOnlineCount();

  async function yourRank() {
    const { data } = await sb.auth.getSession();
    if (!data.session) { $("lb-note").textContent = "Sign in to see your own rank."; return; }
    const me = await sb.from("leaderboard_with_badges").select("username, points").eq("id", data.session.user.id).maybeSingle();
    if (!me.data) { $("lb-note").textContent = "Pick a username on your profile page to join the leaderboard."; return; }
    myName = me.data.username; markMe();
    const ahead = await sb.from("leaderboard_with_badges").select("id", { count: "exact", head: true }).gt("points", me.data.points);
    if (ahead.error) return;
    const rank = (ahead.count || 0) + 1, pts = Number(me.data.points).toLocaleString();
    $("lb-note").innerHTML = me.data.points > 0
      ? `<a href="#" id="lb-find-me" class="profile-link">You're <span class="lb-big">#${rank}</span></a> with <span class="lb-big">${pts}</span> points!`
      : "Find a county in any mode to get on the board.";
    const fm = $("lb-find-me");
    if (fm) fm.addEventListener("click", e => { e.preventDefault(); focusRow(myName); });
  }

  async function load() {
    const { data, error } = await sb.from("leaderboard_with_badges")
      .select("username, points, has_tuc").gt("points", 0).order("points", { ascending: false }).limit(1000);
    if (error) { $("lb-msg").textContent = "Couldn't load the leaderboard: " + error.message; return; }
    let rank = 0, last = null;
    rows = data.map((r, i) => { if (r.points !== last) { rank = i + 1; last = r.points; } return { ...r, rank }; });   // ties share a rank
    render();
    focusRow(focusName);
  }

  yourRank();
  load();
})();