(function () {
  "use strict";
  if (!window.supabase) return;

  const SUPABASE_URL = "https://jgwhnidtjnuufdjcmqdv.supabase.co";
  const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impnd2huaWR0am51dWZkamNtcWR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIxOTE4MDgsImV4cCI6MjEwNzc2NzgwOH0.SsIHfT9TFvAYthQbwcD_Ee6W9T9a8yqlD2HfiAbcgCk";
  const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  window.countellectSupabase = sb;
  const key = `visitor-${globalThis.crypto?.randomUUID?.() || Math.random().toString(36).slice(2)}`;
  const channel = sb.channel("online-users", { config: { presence: { key } } });
  window.countellectOnlineUsers = new Map();
  window.countellectPresenceAvailable = null;
  let currentUserId = null, username = null, setupVersion = 0, subscribed = false;

  function publishPresence() {
    const users = new Map();
    Object.values(channel.presenceState()).flat().forEach(presence => {
      if (typeof presence.user_id === "string" && typeof presence.username === "string") {
        users.set(presence.user_id, presence.username);
      }
    });
    window.countellectOnlineUsers = users;
    window.countellectPresenceAvailable = true;
    window.dispatchEvent(new CustomEvent("countellect-presence-change"));
  }

  window.countellectIsOnline = username => {
    const wanted = String(username || "").toLocaleLowerCase();
    return [...window.countellectOnlineUsers.values()].some(name => name.toLocaleLowerCase() === wanted);
  };

  channel
    .on("presence", { event: "sync" }, publishPresence)
    .on("presence", { event: "join" }, publishPresence)
    .on("presence", { event: "leave" }, publishPresence);

  async function trackCurrentUser(version) {
    if (!subscribed || version !== setupVersion || !currentUserId || !username) return;
    try {
      const result = await channel.track({ user_id: currentUserId, username });
      if (result !== "ok") console.warn("Couldn't announce online presence:", result);
    } catch (error) {
      console.warn("Couldn't announce online presence:", error.message);
    }
  }

  async function updatePresence(session) {
    const userId = session?.user?.id || null;
    if (userId === currentUserId) return;
    const hadPresence = !!(currentUserId && username && subscribed);
    currentUserId = userId;
    const version = ++setupVersion;
    username = null;
    if (hadPresence) {
      try {
        const result = await channel.untrack();
        if (result !== "ok") console.warn("Couldn't remove your online presence:", result);
      } catch (error) {
        console.warn("Couldn't remove your online presence:", error.message);
      }
    }
    if (version !== setupVersion) return;

    if (userId) {
      const profile = await sb.from("profiles").select("username").eq("id", userId).maybeSingle();
      if (version !== setupVersion) return;
      if (profile.error) {
        console.warn("Couldn't load your name for online presence:", profile.error.message);
      } else if (profile.data?.username) {
        username = profile.data.username;
      }
    }
    await trackCurrentUser(version);
  }

  channel.subscribe(status => {
    if (status === "SUBSCRIBED") {
      subscribed = true;
      void trackCurrentUser(setupVersion);
    } else if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
      subscribed = false;
      window.countellectPresenceAvailable = false;
      window.dispatchEvent(new CustomEvent("countellect-presence-change"));
      console.warn("Online presence channel status:", status);
    }
  });

  sb.auth.onAuthStateChange((event, session) => {
    if (event === "INITIAL_SESSION" || event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "TOKEN_REFRESHED") {
      setTimeout(() => { void updatePresence(session); }, 0);
    }
  });
})();
