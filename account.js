/* The game page's side of accounts: it only reports what you find. Signing in and profiles live on profile.html. */
(function () {
  "use strict";
  const SUPABASE_URL = "https://jgwhnidtjnuufdjcmqdv.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impnd2huaWR0am51dWZkamNtcWR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIxOTE4MDgsImV4cCI6MjEwNzc2NzgwOH0.SsIHfT9TFvAYthQbwcD_Ee6W9T9a8yqlD2HfiAbcgCk";
  const MODES = ["pin", "pin-hard", "mc", "type", "type-hard", "type-strict"];

  window.reportCompletion = () => {};
  window.reportTucComplete = () => {};
  window.accountIsSignedIn = () => false;
  window.resetAccountProgress = async () => ({ ok: true, signedIn: false });

  const openBtn = document.getElementById("btn-account");
  if (openBtn) openBtn.addEventListener("click", () => { location.href = "profile.html"; });
  const lbBtn = document.getElementById("btn-leaderboard");
  const whoBtn = document.getElementById("home-who");
  if (whoBtn) whoBtn.addEventListener("click", () => { location.href = "profile.html"; });
  if (lbBtn) lbBtn.addEventListener("click", () => { location.href = "leaderboard.html"; });
  if (!window.supabase) return;

  const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  let session = null, profile = null, queue = [], timer = 0;

  async function syncLocal() {
    const flag = "accountSynced:" + session.user.id;
    if (localStorage.getItem(flag)) return;
    const lookup = window.findCountyForAccount;
    if (!lookup) return;
    let progress = {};
    try { progress = JSON.parse(localStorage.getItem("countyProgress") || "{}") || {}; } catch (e) {}
    const rows = [];
    for (const [cid, modes] of Object.entries(progress)) {
      const c = lookup(cid);
      if (!c) continue;
      for (const [m, status] of Object.entries(modes || {})) {
        if ((status === true || status === "clean") && MODES.includes(m)) {
          rows.push({ user_id: session.user.id, county_id: cid, state_key: c.stateKey, mode: m });
        }
      }
    }
    for (let i = 0; i < rows.length; i += 500) {
      const { error } = await sb.from("completions").upsert(rows.slice(i, i + 500), { onConflict: "user_id,county_id,mode", ignoreDuplicates: true });
      if (error) { console.warn("Couldn't upload your saved progress:", error.message); return; }
    }
    localStorage.setItem(flag, "1");
  }

    async function syncRuns() {
    const flag = "runsSynced:" + session.user.id;
    if (localStorage.getItem(flag)) return;
    if (!window.countyCountForAccount) return;
    let times = {};
    try { times = JSON.parse(localStorage.getItem("perfectTimes") || "{}") || {}; } catch (e) {}
    const rows = [];
    for (const [key, list] of Object.entries(times)) {
      const [states, mode, count] = key.split("|");
      if (!states || states.includes(",") || !MODES.includes(mode)) continue;          // one state, a real mode
      if (Number(count) !== window.countyCountForAccount(states)) continue;            // the whole state only
      const best = Math.min(...(list || []).map(r => Number(r.time)).filter(t => t > 0));
      if (!isFinite(best)) continue;
      rows.push({ user_id: session.user.id, state_key: states, mode, time_ms: Math.round(best) });
    }
    if (rows.length) {
      const { error } = await sb.from("state_runs").insert(rows);
      if (error) { console.warn("Couldn't upload your past runs:", error.message); return; }
    }
    localStorage.setItem(flag, "1");
  }

  async function refresh() {
    if (!window.findCountyForAccount) { setTimeout(refresh, 300); return; }   // wait for the game script to load
    const { data } = await sb.auth.getSession();
    session = data.session;
    profile = null;
    if (session) {
      const r = await sb.from("profiles").select("id, username").eq("id", session.user.id).maybeSingle();
      profile = r.data;
    }
    if (session && profile) {
      await syncLocal();
      await syncRuns();
      if (openBtn) openBtn.title = "Signed in as " + profile.username;
    } else if (openBtn) {
      openBtn.title = "Account";
    }
    updateWho();
  }

  async function flush() {
    if (!queue.length || !session) return;
    const rows = queue.splice(0, queue.length);
    const { error } = await sb.from("completions").upsert(rows, { onConflict: "user_id,county_id,mode", ignoreDuplicates: true });
    if (error) { console.warn("completion upload failed:", error.message); if (error.code !== "23503") queue.unshift(...rows); }
    else updateWho();
  }

    async function updateWho() {
    if (!whoBtn) return;
    if (!session || !profile) { whoBtn.classList.add("hidden"); return; }
    const r = await sb.from("leaderboard").select("points").eq("id", session.user.id).maybeSingle();
    const pts = r.data ? Math.round(Number(r.data.points) || 0) : 0;
    document.getElementById("home-who-name").textContent = profile.username;
    document.getElementById("home-who-pts").textContent = pts.toLocaleString() + " pts";
    whoBtn.classList.remove("hidden");
  }

  window.reportCompletion = (countyId, mode) => {
    if (!session || !profile || !MODES.includes(mode)) return;
    const c = window.findCountyForAccount && window.findCountyForAccount(countyId);
    if (!c) return;
    queue.push({ user_id: session.user.id, county_id: countyId, state_key: c.stateKey, mode });
    clearTimeout(timer);
    timer = setTimeout(flush, 1500);
  };
  window.reportTucComplete = async () => {
    if (!session || !profile) return;
    await sb.from("tuc_completions").upsert({ user_id: session.user.id }, { onConflict: "user_id", ignoreDuplicates: true });
  };

  window.reportStateRun = async (stateKey, mode, ms) => {
    if (!session || !profile || !MODES.includes(mode) || !(ms > 0)) return;
    const { error } = await sb.from("state_runs").insert({ user_id: session.user.id, state_key: stateKey, mode, time_ms: Math.round(ms) });
    if (error) console.warn("run upload failed:", error.message);
  };
    // Reset progress: wipe this account's saved completions. Points, badges and the leaderboard are all worked out from them.
  window.accountIsSignedIn = () => !!(session && profile);
  window.resetAccountProgress = async () => {
    if (!session || !profile) return { ok: true, signedIn: false };
    clearTimeout(timer);
    queue = [];                                   // anything still waiting to upload would otherwise come straight back
    const uid = session.user.id;
    const a = await sb.from("completions").delete().eq("user_id", uid);
    const b = await sb.from("tuc_completions").delete().eq("user_id", uid);
    await sb.from("state_runs").delete().eq("user_id", uid);
    if (a.error || b.error) return { ok: false, signedIn: true, message: (a.error || b.error).message };
    // the server can refuse a delete without raising an error, so check that the rows are really gone
    const left = await sb.from("completions").select("county_id", { count: "exact", head: true }).eq("user_id", uid);
    const leftTuc = await sb.from("tuc_completions").select("user_id", { count: "exact", head: true }).eq("user_id", uid);
    if (left.error || leftTuc.error) return { ok: false, signedIn: true, message: (left.error || leftTuc.error).message };
    if (left.count || leftTuc.count) return { ok: false, signedIn: true, message: "The server wouldn't delete your saved progress (a delete permission is missing)." };
    return { ok: true, signedIn: true };
  };

  sb.auth.onAuthStateChange(evt => { if (evt === "SIGNED_IN" || evt === "SIGNED_OUT") { if (evt === "SIGNED_OUT") queue = []; refresh(); } });
  window.addEventListener("load", refresh);
})();