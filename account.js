/* The game page's side of accounts: it only reports what you find. Signing in and profiles live on profile.html. */
(function () {
  "use strict";
  const SUPABASE_URL = "https://jgwhnidtjnuufdjcmqdv.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impnd2huaWR0am51dWZkamNtcWR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIxOTE4MDgsImV4cCI6MjEwNzc2NzgwOH0.SsIHfT9TFvAYthQbwcD_Ee6W9T9a8yqlD2HfiAbcgCk";
  const MODES = ["pin", "pin-hard", "mc", "type", "type-hard", "type-strict"];

  window.reportCompletion = () => {};
  window.reportTucComplete = () => {};

  const openBtn = document.getElementById("btn-account");
  if (openBtn) openBtn.addEventListener("click", () => { location.href = "profile.html"; });
  const lbBtn = document.getElementById("btn-leaderboard");
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
      if (openBtn) openBtn.title = "Signed in as " + profile.username;
    } else if (openBtn) {
      openBtn.title = "Account";
    }
  }

  async function flush() {
    if (!queue.length || !session) return;
    const rows = queue.splice(0, queue.length);
    const { error } = await sb.from("completions").upsert(rows, { onConflict: "user_id,county_id,mode", ignoreDuplicates: true });
    if (error) { console.warn("completion upload failed:", error.message); if (error.code !== "23503") queue.unshift(...rows); }
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

  sb.auth.onAuthStateChange(evt => { if (evt === "SIGNED_IN" || evt === "SIGNED_OUT") { if (evt === "SIGNED_OUT") queue = []; refresh(); } });
  window.addEventListener("load", refresh);
})();