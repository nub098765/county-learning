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
  let session = null, profile = null, queue = [], timer = 0, lastKnownPoints = null;
  let lastKnownConcentratedEffort = null;

  async function loadBadgeProgress() {
    if (!session) return null;
    const [runsResult, statesResult] = await Promise.all([
      loadStateRuns(session.user.id),
      sb.from("state_multipliers").select("state_key, name")
    ]);
    const error = runsResult.error || statesResult.error;
    if (error) {
      console.warn("Couldn't check saved badge progress:", error.message);
      return null;
    }

    const modesByState = {};
    (runsResult.data || []).forEach(row => {
      if (MODES.includes(row.mode)) (modesByState[row.state_key] ||= new Set()).add(row.mode);
    });
    const states = (statesResult.data || []).map(state => ({
      key: state.state_key,
      name: state.name,
      modesDone: [...(modesByState[state.state_key] || [])]
    }));
    return {
      states,
      gold: states.filter(state => state.modesDone.length === MODES.length).length
    };
  }

  async function loadStateRuns(userId) {
    const rows = [];
    for (let from = 0; ; from += 1000) {
      const result = await sb.from("state_runs").select("state_key, mode, time_ms, completed_at").eq("user_id", userId).order("completed_at").order("state_key").range(from, from + 999);
      if (result.error) return result;
      rows.push(...(result.data || []));
      if (!result.data || result.data.length < 1000) return { data: rows, error: null };
    }
  }

  async function checkConcentratedEffort() {
    if (!session || !profile) return;
    const result = await sb.from("concentrated_effort_achievements")
      .select("user_id").eq("user_id", session.user.id).maybeSingle();
    if (result.error) {
      console.warn("Couldn't check Concentrated Effort progress:", result.error.message);
      return;
    }
    const earned = !!result.data;
    if (lastKnownConcentratedEffort === false && earned && window.showUnlockToast) {
      window.showUnlockToast("Concentrated Effort", "Earn 1,000 county points from a single game", {
        glyph: "1K in 1",
        color: "#6FA3D8"
      });
    }
    lastKnownConcentratedEffort = earned;
  }

  function notifyBadgeUnlocks(before, after) {
    if (!before || !after || !window.showUnlockToast) return;
    const tierOf = count => count >= MODES.length ? "Gold" : count >= 3 ? "Silver" : count >= 1 ? "Bronze" : "";
    after.states.forEach(state => {
      const previous = before.states.find(item => item.key === state.key);
      if (!previous) return;
      const previousTier = tierOf(previous.modesDone.length);
      const currentTier = tierOf(state.modesDone.length);
      if (currentTier && currentTier !== previousTier) {
        const tierColor = { Bronze: "#b0703c", Silver: "#b8c0cc", Gold: "#d4a017" }[currentTier];
        window.showUnlockToast(state.name, currentTier, {
          stateKey: state.key,
          color: tierColor
        });
      }
    });

    const achievements = [
      { label: "Gold Star", threshold: 1, detail: "Perfect runs in all 6 modes of one state", glyph: "★" },
      { label: "Gold Ring", threshold: 5, detail: "Perfect runs in all 6 modes of 5 states", glyph: "★5" },
      { label: "Gold Necklace", threshold: 10, detail: "Perfect runs in all 6 modes of 10 states", glyph: "★10" },
      { label: "Gold Rush", threshold: 25, detail: "Perfect runs in all 6 modes of 25 states", glyph: "★25" },
      { label: "County Master", threshold: 57, detail: "Perfect full-state runs in every mode of every state", glyph: "★57" }
    ];
    achievements
      .filter(item => before.gold < item.threshold && after.gold >= item.threshold)
      .forEach(item => window.showUnlockToast(item.label, item.detail, { glyph: item.glyph, color: "#d4a017" }));

    MODES.forEach(mode => {
      const wasComplete = before.states.every(state => state.modesDone.includes(mode));
      const isComplete = after.states.every(state => state.modesDone.includes(mode));
      if (!wasComplete && isComplete) {
        const labels = { pin: "Pin", "pin-hard": "Flash", mc: "Multiple-Choice", type: "List", "type-strict": "Type", "type-hard": "Identify" };
        const colors = { pin: "#3b82f6", "pin-hard": "#8b5cf6", mc: "#f59e0b", type: "#14b8a6", "type-hard": "#ec4899", "type-strict": "#ef4444" };
        const glyphs = { pin: "P", "pin-hard": "F", mc: "MC", type: "L", "type-strict": "T", "type-hard": "I" };
        window.showUnlockToast(`${labels[mode]} Master`, "Every state done", {
          glyph: glyphs[mode],
          color: colors[mode]
        });
      }
    });
  }

  async function syncLocal() {
    const lookup = window.findCountyForAccount;
    if (!lookup) return;
    let progress = {};
    try { progress = JSON.parse(localStorage.getItem("countyProgress") || "{}") || {}; } catch (e) {}
    const rows = [];
    for (const [countyId, modes] of Object.entries(progress)) {
      const county = lookup(countyId);
      if (!county) continue;
      for (const [mode, status] of Object.entries(modes || {})) {
        if ((status === true || status === "clean" || status === "retry") && MODES.includes(mode)) {
          rows.push({ user_id: session.user.id, county_id: countyId, state_key: county.stateKey, mode });
        }
      }
    }
    for (let i = 0; i < rows.length; i += 500) {
      const { error } = await sb.from("completions").upsert(rows.slice(i, i + 500), { onConflict: "user_id,county_id,mode", ignoreDuplicates: true });
      if (error) { console.warn("Couldn't upload your saved progress:", error.message); return; }
    }
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
    lastKnownPoints = null;
    lastKnownConcentratedEffort = null;
    session = data.session;
    profile = null;
    if (session) {
      const r = await sb.from("profiles").select("id, username").eq("id", session.user.id).maybeSingle();
      profile = r.data;
    }
    if (session && profile) {
      await syncLocal();
      await syncRuns();
      await checkConcentratedEffort();
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
    else {
      updateWho();
      await checkConcentratedEffort();
    }
  }

    async function updateWho() {
    if (!whoBtn) return;
    if (!session || !profile) { whoBtn.classList.add("hidden"); return; }
    const r = await sb.from("leaderboard_with_badges").select("points").eq("id", session.user.id).maybeSingle();
    if (r.error) { console.warn("Couldn't refresh your points:", r.error.message); return; }
    const pts = r.data ? Math.round(Number(r.data.points) || 0) : 0;
    if (lastKnownPoints !== null && pts > lastKnownPoints && window.showUnlockToast) {
      const milestones = [
        [1000, "Amateur Countellectual", "Get 1,000 points.", "1K"],
        [10000, "Getting Into It", "Get 10,000 points.", "10K"],
        [25000, "In the Weeds", "Get 25,000 points.", "25K"],
        [50000, "County Connoisseur", "Get 50,000 points.", "50K"],
        [100000, "State Savant", "Get 100,000 points.", "100K"],
        [233740, "Pro Countellectual", "Get all points possible without the Ultimate Challenge.", "234K"],
        [500000, "Point God", "Get all points possible.", "500K"]
      ];
      milestones
        .filter(([threshold]) => lastKnownPoints < threshold && pts >= threshold)
        .forEach(([, label, detail, glyph]) => window.showUnlockToast(label, detail, { glyph, color: "#6FA3D8" }));
    }
    lastKnownPoints = pts;
    document.getElementById("home-who-name").textContent = profile.username;
    document.getElementById("home-who-pts").textContent = pts.toLocaleString() + " pts";
    whoBtn.classList.remove("hidden");
  }

  window.reportCompletion = (countyId, mode, gameRunId) => {
    if (!session || !profile || !MODES.includes(mode)) return;
    const county = window.findCountyForAccount && window.findCountyForAccount(countyId);
    if (!county) return;
    queue.push({ user_id: session.user.id, county_id: countyId, state_key: county.stateKey, mode, game_run_id: gameRunId || null });
    clearTimeout(timer);
    timer = setTimeout(flush, 1500);
  };
  window.reportTucComplete = async () => {
    if (!session || !profile) return;
    const existing = await sb.from("tuc_completions").select("user_id").eq("user_id", session.user.id).maybeSingle();
    if (existing.error) { console.warn("Couldn't check Ultimate Challenge progress:", existing.error.message); return; }
    if (existing.data) return;
    const result = await sb.from("tuc_completions").upsert({ user_id: session.user.id }, { onConflict: "user_id", ignoreDuplicates: true });
    if (result.error) { console.warn("Couldn't save Ultimate Challenge progress:", result.error.message); return; }
    if (window.showUnlockToast) window.showUnlockToast("The Ultimate Challenge", "Beat it.", { flame: true, color: "#CE4E2C" });
  };

  window.reportStateRun = async (stateKey, mode, ms) => {
    if (!session || !profile || !MODES.includes(mode) || !(ms > 0)) return;
    const timeMs = Math.round(ms);
    const badgeProgressBefore = await loadBadgeProgress();
    let firstSpeedRun = false, completesNoTimeToWaste = false;
    const countyCount = window.countyCountForAccount && window.countyCountForAccount(stateKey);
    if (countyCount && timeMs <= countyCount * 3000) {
      const [stateResult, runsResult] = await Promise.all([
        sb.from("state_multipliers").select("state_key, county_count"),
        loadStateRuns(session.user.id)
      ]);
      const error = stateResult.error || runsResult.error;
      if (error) console.warn("Couldn't check No Time to Waste progress:", error.message);
      else {
        const states = stateResult.data || [];
        const countyCounts = new Map(states.map(state => [state.state_key, state.county_count]));
        const qualifyingStates = new Set((runsResult.data || [])
          .filter(run => Number(run.time_ms) <= (countyCounts.get(run.state_key) || 0) * 3000)
          .map(run => run.state_key));
        const wasComplete = states.length > 0 && states.every(state => qualifyingStates.has(state.state_key));
        qualifyingStates.add(stateKey);
        completesNoTimeToWaste = !wasComplete && states.length > 0 && states.every(state => qualifyingStates.has(state.state_key));
      }
    }
    if (timeMs < 10000) {
      const existing = await sb.from("state_runs").select("time_ms").eq("user_id", session.user.id).lt("time_ms", 10000).limit(1).maybeSingle();
      if (existing.error) console.warn("Couldn't check Speed Is Key progress:", existing.error.message);
      else firstSpeedRun = !existing.data;
    }
    const { error } = await sb.from("state_runs").insert({ user_id: session.user.id, state_key: stateKey, mode, time_ms: timeMs });
    if (error) { console.warn("run upload failed:", error.message); return; }
    notifyBadgeUnlocks(badgeProgressBefore, await loadBadgeProgress());
    updateWho();
    if (firstSpeedRun && window.showUnlockToast) {
      window.showUnlockToast("Speed Is Key", "Perfect state run under 10 seconds", { glyph: "⏱", color: "#6FA3D8" });
    }
    if (completesNoTimeToWaste && window.showUnlockToast) {
      window.showUnlockToast("No Time to Waste", "A perfect run for every state at three seconds per county or less", { glyph: "⏱⏱⏱", color: "#6FA3D8" });
    }
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
    const c = await sb.from("state_runs").delete().eq("user_id", uid);
    if (a.error || b.error || c.error) return { ok: false, signedIn: true, message: (a.error || b.error || c.error).message };
    // the server can refuse a delete without raising an error, so check that the rows are really gone
    const left = await sb.from("completions").select("county_id", { count: "exact", head: true }).eq("user_id", uid);
    const leftTuc = await sb.from("tuc_completions").select("user_id", { count: "exact", head: true }).eq("user_id", uid);
    const leftRuns = await sb.from("state_runs").select("state_key", { count: "exact", head: true }).eq("user_id", uid);
    if (left.error || leftTuc.error || leftRuns.error) return { ok: false, signedIn: true, message: (left.error || leftTuc.error || leftRuns.error).message };
    if (left.count || leftTuc.count || leftRuns.count) return { ok: false, signedIn: true, message: "The server wouldn't delete your saved progress (a delete permission is missing)." };
    return { ok: true, signedIn: true };
  };

  sb.auth.onAuthStateChange(evt => { if (evt === "SIGNED_IN" || evt === "SIGNED_OUT") { if (evt === "SIGNED_OUT") queue = []; refresh(); } });
  window.addEventListener("load", refresh);
})();