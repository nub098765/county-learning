// Bug report feature. Sends reports to Formspree with fetch(), attaching
// the reporter's settings and device info automatically.
//
// Self-contained on purpose: script.js keeps everything inside its own
// DOMContentLoaded closure, so this file reads what it needs from
// localStorage and the DOM instead of reaching into that code.

(function () {
  const FORMSPREE_URL = "https://formspree.io/f/mkjgkrdo";

  const modal = document.getElementById("modal-report");
  const form = document.getElementById("report-form");
  if (!modal || !form) return;

  const messageInput = document.getElementById("report-message");
  const emailInput = document.getElementById("report-email");
  const statusEl = document.getElementById("report-status");
  const submitBtn = document.getElementById("btn-report-submit");
  const cancelBtn = document.getElementById("btn-report-cancel");

  let closeTimer = null;

  function setStatus(text, kind) {
    statusEl.textContent = text || "";
    statusEl.classList.toggle("is-error", kind === "error");
    statusEl.classList.toggle("is-success", kind === "success");
  }

  function openReport() {
    // If opened from the "How to Play" popup, close that first by using
    // its own Close button, so script.js also stops its demo animation.
    const info = document.getElementById("modal-info");
    if (info && !info.classList.contains("hidden")) {
      const closeInfo = document.getElementById("btn-modal-info-close");
      if (closeInfo) closeInfo.click();
      else info.classList.add("hidden");
    }
    clearTimeout(closeTimer);
    setStatus("");
    submitBtn.disabled = false;
    modal.classList.remove("hidden");
    messageInput.focus();
  }

  function closeReport() {
    clearTimeout(closeTimer);
    modal.classList.add("hidden");
  }

  // Everything that helps reproduce a bug, without the person having to
  // describe it. Nothing here is personal beyond what the browser reports.
  function collectContext() {
    let settings = {};
    try {
      settings = JSON.parse(localStorage.getItem("gameSettings")) || {};
    } catch (e) {
      settings = { error: "could not read saved settings" };
    }
    const activeScreen = document.querySelector(".screen.active");
    return {
      settings: JSON.stringify(settings),
      screen: activeScreen ? activeScreen.id : "unknown",
      body_classes: document.body.className || "(none)",
      page_url: location.href,
      browser: navigator.userAgent,
      viewport: window.innerWidth + "x" + window.innerHeight,
      screen_size: screen.width + "x" + screen.height,
      pixel_ratio: String(window.devicePixelRatio || 1),
      language: navigator.language || "",
      reported_at: new Date().toISOString(),
    };
  }

  async function submitReport(e) {
    e.preventDefault();

    const message = messageInput.value.trim();
    if (!message) {
      setStatus("Please describe what went wrong.", "error");
      messageInput.focus();
      return;
    }
    if (emailInput.value && !emailInput.checkValidity()) {
      setStatus("That email address doesn't look right. You can also leave it blank.", "error");
      emailInput.focus();
      return;
    }

    const data = new FormData(form); // message, email, _gotcha (honeypot)
    data.set("message", message);
    data.set("_subject", "Learn Your Counties bug report");
    const ctx = collectContext();
    Object.keys(ctx).forEach((k) => data.set(k, ctx[k]));

    submitBtn.disabled = true;
    setStatus("Sending…");

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("Thanks! Your report was sent.", "success");
        form.reset();
        closeTimer = setTimeout(closeReport, 1800);
        return;
      }

      let detail = "";
      try {
        const body = await res.json();
        if (body && body.errors && body.errors.length) {
          detail = body.errors.map((er) => er.message).join(" ");
        }
      } catch (_) {
        /* response wasn't JSON; fall through to the generic message */
      }
      setStatus(detail || "Something went wrong sending your report. Please try again.", "error");
    } catch (err) {
      setStatus("Couldn't reach the server. Check your connection and try again.", "error");
    }
    submitBtn.disabled = false;
  }

  // Any element with data-open-report opens the modal (event delegation,
  // so it works for buttons added later too).
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-open-report]");
    if (trigger) {
      e.preventDefault();
      openReport();
    }
  });

  form.addEventListener("submit", submitReport);
  cancelBtn.addEventListener("click", closeReport);

  // Clicking the dimmed backdrop closes it, like the other modals.
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeReport();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) closeReport();
  });
})();