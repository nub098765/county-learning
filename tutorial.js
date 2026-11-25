// /* Tutorial, step 1: the "?" button, the greeting, and the Tutorial item in the More menu.
//    Right now the tutorial itself is a placeholder; the Delaware walkthrough replaces openTutorial() in the next steps. */
// (function () {
//   "use strict";

//   // Counties in the whole country. Typed in on purpose: the site only has data for the states built so far,
//   // so counting its own data would give a much smaller number. Change it here if the total ever changes.
//   var TOTAL_COUNTIES = 3244;
//     var GREETING = "First time here, eh? Don't worry. There are " + TOTAL_COUNTIES.toLocaleString("en-US") +
//     " counties, and I'm here to help you learn every single one.";

//   var home = document.getElementById("screen-home");
//   var menu = document.getElementById("more-menu");
//   if (!home) return;

//   // "Has this person done a run yet?" The site keeps no single flag for that, so look at the three things a run
//   // leaves behind in localStorage: learned counties, mistakes, and perfect-run times. Any of them filled in = played.
//   function hasContent(key) {
//     try {
//       var v = JSON.parse(localStorage.getItem(key) || "null");
//       return !!v && Object.keys(v).length > 0;
//     } catch (e) { return false; }
//   }
//   function hasPlayed() {
//     return hasContent("countyProgress") || hasContent("countyMistakes") || hasContent("perfectTimes");
//   }

//   /* ---------- the placeholder tutorial (replaced in the next steps) ---------- */
//   var modal = document.createElement("div");
//   modal.id = "modal-tutorial";
//   modal.className = "modal hidden";
//   modal.setAttribute("role", "dialog");
//   modal.setAttribute("aria-modal", "true");
//   modal.setAttribute("aria-labelledby", "tutorial-title");
//   modal.innerHTML =
//     '<div class="modal-content info-modal-content">' +
//       '<h2 id="tutorial-title">Tutorial</h2>' +
//       '<p class="info-intro">The Delaware walkthrough will go here. This is just a placeholder for now.</p>' +
//       '<div class="modal-actions"><button type="button" class="btn-primary" id="btn-tutorial-close">Close</button></div>' +
//     '</div>';
//   document.body.appendChild(modal);

//   function closeTutorial() { modal.classList.add("hidden"); }
//   function openTutorial() {
//     hideIntro();
//     modal.classList.remove("hidden");
//     document.getElementById("btn-tutorial-close").focus();
//   }
//   window.startTutorial = openTutorial;
//   document.getElementById("btn-tutorial-close").addEventListener("click", closeTutorial);
//   modal.addEventListener("click", function (e) { if (e.target === modal) closeTutorial(); });
//   document.addEventListener("keydown", function (e) {
//     if (e.key === "Escape" && !modal.classList.contains("hidden")) closeTutorial();
//   });

//   /* ---------- the "?" tab peeking in from the top-left of the window ---------- */
//   // Fixed to the window, half hidden above the top edge and wiggling. Hovering (or tabbing to) it
//   // slides it down and shows the greeting bubble. Only on the main menu, and only until the person has done a run.
//   var peek = document.createElement("div");
//   peek.id = "tut-peek";
//   peek.className = "tut-peek hidden";

//   var help = document.createElement("button");
//   help.type = "button";
//   help.id = "btn-tut-help";
//   help.className = "tut-peek-btn";
//   help.setAttribute("aria-label", "New here? Start the tutorial");
//   help.textContent = "?";

//   var bubble = document.createElement("div");
//   bubble.className = "tut-bubble";
//   bubble.textContent = GREETING;

//   peek.append(help, bubble);
//   document.body.appendChild(peek);

//   var dismissed = false;     // clicking the "?" hides it until the next page load
//   function syncIntro() {
//     var show = !dismissed && !hasPlayed() && home.classList.contains("active");
//     peek.classList.toggle("hidden", !show);
//   }
//   function hideIntro() { dismissed = true; syncIntro(); }
//   help.addEventListener("click", openTutorial);

//   // Shown for anyone who hasn't done a run yet, on every load, so it's re-checked whenever the main menu comes back.
//   new MutationObserver(syncIntro).observe(home, { attributes: true, attributeFilter: ["class"] });
//   syncIntro();

//   /* ---------- the Tutorial item in the More menu ---------- */
//   if (menu) {
//     var item = document.createElement("button");
//     item.type = "button";
//     item.id = "btn-tutorial";
//     item.className = "more-item";
//     item.innerHTML =
//       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' +
//       '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.3a2.5 2.5 0 1 1 3.5 2.3c-.7.4-1 .9-1 1.6"/><path d="M12 16.8v.1"/></svg>' +
//       '<span>Tutorial</span>';
//     item.addEventListener("click", openTutorial);
//     var report = menu.querySelector("[data-open-report]");
//     if (report) menu.insertBefore(item, report); else menu.appendChild(item);
//   }
// })();