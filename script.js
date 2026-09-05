document.addEventListener('DOMContentLoaded', () => {
// --- Data Registry for States and Counties ---
const stateData = {
  delaware: {
    name: "Delaware",
    svgId: "map-delaware", // FIX #2: was "svg-delaware", didn't match the <svg id="map-delaware"> in index.html
    counties: [
      { id: "new-castle", name: "New Castle", stateKey: "delaware" },
      { id: "kent", name: "Kent", stateKey: "delaware" }, // FIX #3: was "kent-de", didn't match <path id="kent"> in the SVG
      { id: "sussex", name: "Sussex", stateKey: "delaware" }
    ]
  },
  rhode_island: {
    name: "Rhode Island",
    svgId: "svg-rhode-island",
    counties: [
      { id: "bristol", name: "Bristol", stateKey: "rhode_island" },
      { id: "kent-ri", name: "Kent", stateKey: "rhode_island" },
      { id: "newport", name: "Newport", stateKey: "rhode_island" },
      { id: "providence", name: "Providence", stateKey: "rhode_island" },
      { id: "washington", name: "Washington", stateKey: "rhode_island" }
    ]
  },
  hawaii: {
    name: "Hawaii",
    svgId: "svg-hawaii",
    counties: [
      { id: "hawaii-county", name: "Hawai\u02BBi", stateKey: "hawaii" },
      { id: "honolulu", name: "Honolulu", stateKey: "hawaii" },
      { id: "kalawao", name: "Kalawao", stateKey: "hawaii" },
      { id: "kauai", name: "Kaua\u02BBi", stateKey: "hawaii" },
      { id: "maui-county", name: "Maui", stateKey: "hawaii" }
    ]
  }
};


// --- Game Configuration & State Variables ---
let selectedMode = "pin"; // "pin" | "pin-hard" | "type" | "type-hard"
// Modes where the player types the county name instead of clicking the
// map — checked in a few places (input box visibility, disabling
// click-to-solve, resetting classes between games) so it's kept as one
// Set rather than repeating the string comparisons everywhere.
const TYPE_MODES = new Set(["type", "type-hard"]);
// All four modes, in the order they should appear as stats-panel columns.
const MODE_LIST = ["pin", "pin-hard", "type", "type-hard"];
const MODE_LABELS = {
  pin: "Pin",
  "pin-hard": "Pin (Hard)",
  type: "Type",
  "type-hard": "Type (Hard)"
};
let activeStateKeys = [];
let selectedCounties = [];
let targetPool = [];
let currentTarget = null;
let scoreRight = 0;
let scoreWrong = 0;
let isGameActive = false;
let missedCounties = new Set();
let currentAttemptMistakes = 0;

// Whether the Kalawao "click here" callout (circle + line, added because
// the real Kalawao shape is tiny on the Hawaii map) has been built yet.
// It's created lazily the first time the Hawaii map is actually shown,
// since SVG getBBox() needs the element to be rendered (not display:none)
// to return real numbers.
let kalawaoCalloutCreated = false;


// Names that are ambiguous *within the counties currently being played*
// (e.g. "Kent" exists in both Delaware and Rhode Island). Recomputed at
// the start of every game/retry/replay via computeAmbiguousNames().
let ambiguousCountyNames = new Set();


// Given a list of counties, returns the set of county names that appear
// more than once in that list.
function computeAmbiguousNames(counties) {
  const nameCounts = {};
  counties.forEach(c => {
    nameCounts[c.name] = (nameCounts[c.name] || 0) + 1;
  });
  return new Set(Object.keys(nameCounts).filter(name => nameCounts[name] > 1));
}


// Returns "Kent" normally, or "Kent, Rhode Island" if that name is
// ambiguous in the current context.
function getDisplayName(county) {
  if (!county) return "";
  if (ambiguousCountyNames.has(county.name)) {
    const stateName = stateData[county.stateKey]?.name || county.stateKey;
    return `${county.name}, ${stateName}`;
  }
  return county.name;
}


// Same disambiguation logic as getDisplayName, but split into parts so
// the county name and the state qualifier can be styled differently
// (used by the "Find:" prompt).
function getDisplayParts(county) {
  if (!county) return { name: "", state: null };
  if (ambiguousCountyNames.has(county.name)) {
    const stateName = stateData[county.stateKey]?.name || county.stateKey;
    return { name: county.name, state: stateName };
  }
  return { name: county.name, state: null };
}


// Normalizes a typed guess for comparison: lowercase, trims, strips the
// Hawaiian 'okina and other curly/straight apostrophe variants (so
// players don't need to hunt down a special character to type "Hawaiʻi"
// or "Kauaʻi"), and collapses repeated whitespace.
function normalizeTypedName(str) {
  return str
    .toLowerCase()
    .replace(/[\u02BB\u2018\u2019'`´]/g, "")
    .trim()
    .replace(/\s+/g, " ");
}


// "Type" mode match: EVERY county still left in the pool whose name
// matches, regardless of which state it's in. If two different
// counties in play happen to share a bare name (e.g. two "Kent"s from
// two active states), typing "Kent" resolves both of them at once —
// requiring the state too was deliberately left out (see the mode's
// design) so players aren't stuck typing "Washington, Rhode Island" for
// the dozens of Washington counties nationwide.
function findAllPoolMatchesByName(normalized) {
  return targetPool.filter(c => normalizeTypedName(c.name) === normalized);
}


// Returns every county the current typed guess should resolve, as an
// array (empty if it doesn't match anything). "Type (Hard)" can only
// ever resolve the single highlighted county; plain "Type" can resolve
// several counties at once if their bare names are identical.
function getTypedGuessMatches(normalized) {
  if (selectedMode === "type-hard") {
    return (currentTarget && normalizeTypedName(currentTarget.name) === normalized)
      ? [currentTarget]
      : [];
  }
  return findAllPoolMatchesByName(normalized);
}


// Looks up a county object by its path id across ALL states (not just the
// active ones), so feedback text is always correct even mid-game.
function findCountyById(id) {
  for (const key in stateData) {
    const found = stateData[key].counties.find(c => c.id === id);
    if (found) return found;
  }
  return null;
}


// Returns every clickable DOM element that represents a given county id:
// the real map shape itself, plus any stand-in "callout" click targets
// (like the Kalawao circle) that were tagged with data-county-id pointing
// at it. Used so that a correct/wrong guess updates every representation
// of that county in sync, no matter which one was actually clicked.
function getCountyElements(id) {
  const elements = [];
  const mainEl = document.getElementById(id);
  if (mainEl) elements.push(mainEl);
  document.querySelectorAll(`[data-county-id="${id}"]`).forEach(el => {
    if (el.id !== id) elements.push(el);
  });
  return elements;
}


// --- Persistent Data Storage ---
// Per-county, per-mode "learned" flags — e.g. countyProgress["kent"].pin
// is true once Kent has been correctly guessed at least once in Pin
// mode. Drives the per-state stats panel (see below); replaces the old
// single whole-state "completed" flag so progress can be shown mode by
// mode instead of one all-or-nothing badge.
let countyProgress = JSON.parse(localStorage.getItem("countyProgress")) || {};
let countyMistakes = JSON.parse(localStorage.getItem("countyMistakes")) || {};
let gameSettings = JSON.parse(localStorage.getItem("gameSettings")) || {
  darkMode: false,
  highContrast: false,
  soundVolume: 50,
  speedrunMode: false,
  instantTypeCheck: true,
  hideStatsByDefault: false
};
// Backfills the new setting for anyone with an existing saved
// gameSettings blob from before Type mode existed.
if (gameSettings.instantTypeCheck === undefined) gameSettings.instantTypeCheck = true;
// Backfills the new setting for anyone with an existing saved
// gameSettings blob from before per-state progress tables could be
// collapsed.
if (gameSettings.hideStatsByDefault === undefined) gameSettings.hideStatsByDefault = false;


// Per-state "collapsed" choice for the setup screen's progress tables.
// Keyed by stateKey; only holds an entry once the player has explicitly
// clicked that state's Hide/Show button (or Hide All) — until then,
// isStatsHidden() falls back to gameSettings.hideStatsByDefault, so
// flipping that setting immediately affects any state the player hasn't
// manually overridden yet.
let statsHiddenOverride = {};


function isStatsHidden(stateKey) {
  return Object.prototype.hasOwnProperty.call(statsHiddenOverride, stateKey)
    ? statsHiddenOverride[stateKey]
    : gameSettings.hideStatsByDefault;
}


// --- Navigation & Screen DOM Elements ---
const screens = document.querySelectorAll(".screen");
const btnGotoModes = document.getElementById("btn-goto-modes");
const btnGotoSettings = document.getElementById("btn-goto-settings");
const backButtons = document.querySelectorAll(".btn-back");
const modeButtons = document.querySelectorAll(".btn-mode");


// --- Setup Screen DOM Elements ---
const countyPanel = document.getElementById("county-options-panel");
const statsPanel = document.getElementById("state-stats-panel");
const radioSpecific = document.querySelectorAll('input[name="specific-counties"]');
const checkboxContainer = document.getElementById("checkbox-container");
const btnStartGame = document.getElementById("btn-start-game");
const suggestionBox = document.getElementById("suggestion-box");
const btnSelectSuggested = document.getElementById("btn-select-suggested");
const btnDeselectAll = document.getElementById("btn-deselect-all");
// FIX #1: there is no #state-list container in index.html — the state rows
// (#state-delaware, #state-rhode_island, ...) are already
// hardcoded in the markup. renderStateListUI() now wires up the existing rows
// instead of trying to rebuild a container that was never there.


// --- Settings DOM Elements ---
const toggleDark = document.getElementById("toggle-dark");
const toggleContrast = document.getElementById("toggle-contrast");
const sliderSound = document.getElementById("slider-sound");
const toggleSpeedrun = document.getElementById("toggle-speedrun");
const toggleInstantCheck = document.getElementById("toggle-instant-check");
const toggleHideStatsDefault = document.getElementById("toggle-hide-stats-default");
const btnResetProgress = document.getElementById("btn-reset-progress");


// --- Game Screen DOM Elements ---
const targetPrompt = document.getElementById("target-prompt");
const feedbackEl = document.getElementById("feedback");
const typeInputBox = document.getElementById("type-input-box");
const typeInput = document.getElementById("type-input");
const btnQuitGame = document.getElementById("btn-quit-game");
const btnGiveUp = document.getElementById("btn-give-up");
const btnGameSettings = document.getElementById("btn-game-settings");
const btnNewGame = document.getElementById("btn-new-game");
const hoverTooltip = document.getElementById("county-hover-tooltip");
// NOTE: countyPaths is a `let` (not `const`) because the Kalawao callout
// circle is added to the DOM after this first query runs — once it's
// built we re-run querySelectorAll(".county") so the callout gets the
// same reset-between-games and win-state handling as every other county.
let countyPaths = document.querySelectorAll(".county");
const svgMaps = document.querySelectorAll(".state-map");


// Which screen (and, if relevant, which finished-game overlay) the
// Settings "Back" button should return to. Defaults to Home, but is set
// to "screen-game" whenever Settings is opened from mid-game (the header
// button, the summary modal, or the Admire bar) so adjusting a toggle
// doesn't quietly abandon the running game. settingsReturnOverlay tracks
// whether the summary modal or the Admire bar needs to be re-shown once
// Settings closes, since those are hidden (not screens) and would
// otherwise vanish for good — leaving the player stuck with no way to
// start a new game. FIX: settingsBackButton previously wasn't declared
// anywhere, which made every openSettings() call throw and silently
// abort before showScreen("screen-settings") ever ran.
let settingsReturnScreen = "screen-home";
let settingsReturnOverlay = null; // "modal" | "admire" | null
const settingsBackButton = document.querySelector("#screen-settings .btn-back");


function openSettings(returnScreen, returnOverlay = null) {
  settingsReturnScreen = returnScreen;
  settingsReturnOverlay = returnOverlay;
  if (settingsBackButton) {
    settingsBackButton.textContent = returnScreen === "screen-game" ? "Back to Game" : "Back to Home";
  }
  showScreen("screen-settings");
}


// --- Modal Summary DOM Elements ---
const modalSummary = document.getElementById("modal-summary");
const summaryPercentage = document.getElementById("summary-percentage");
const summaryGradeTitle = document.getElementById("summary-grade-title");
const summaryMessage = document.getElementById("summary-message");
const modalActions = document.querySelector(".modal-actions");


// --- Bottom Admire Bar DOM Elements ---
const admireBar = document.getElementById("admire-bar");
const admirePercentage = document.getElementById("admire-percentage");
const admireText = document.getElementById("admire-text");
const btnAdmireRetry = document.getElementById("btn-admire-retry");
const btnAdmireReplay = document.getElementById("btn-admire-replay");
const btnAdmireSettings = document.getElementById("btn-admire-settings");
const btnAdmireHome = document.getElementById("btn-admire-home");


// --- Audio Synthesis Helper (No external assets required) ---
function playSound(type) {
  if (!gameSettings.soundVolume || gameSettings.soundVolume <= 0) return;
  const vol = gameSettings.soundVolume / 100; // 0–1 scale applied to gain
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);


    if (type === "correct") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.1); // A5
      gain.gain.setValueAtTime(0.1 * vol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);
      osc.start();
      osc.stop(ctx.currentTime + 0.3);
    } else if (type === "wrong") {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(220, ctx.currentTime); // A3
      osc.frequency.setValueAtTime(164.81, ctx.currentTime + 0.1); // E3
      gain.gain.setValueAtTime(0.12 * vol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.4);
      osc.start();
      osc.stop(ctx.currentTime + 0.4);
    }
  } catch (e) {
    console.warn("Web Audio API not supported or blocked by user gesture.", e);
  }
}


// --- Theme Initialization & Preference Sync ---
const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");


function applySettings() {
  if (toggleDark) toggleDark.checked = gameSettings.darkMode;
  if (toggleContrast) toggleContrast.checked = gameSettings.highContrast;
  if (sliderSound) sliderSound.value = gameSettings.soundVolume;
  if (toggleSpeedrun) toggleSpeedrun.checked = gameSettings.speedrunMode;
  if (toggleInstantCheck) toggleInstantCheck.checked = gameSettings.instantTypeCheck;
  if (toggleHideStatsDefault) toggleHideStatsDefault.checked = gameSettings.hideStatsByDefault;


  document.body.classList.toggle("dark-mode", gameSettings.darkMode);
  document.body.classList.toggle("high-contrast", gameSettings.highContrast);
}


function initTheme() {
  const savedDark = localStorage.getItem("darkMode");
  if (savedDark !== null) {
    gameSettings.darkMode = JSON.parse(savedDark);
  } else {
    gameSettings.darkMode = systemPrefersDark.matches;
  }
  applySettings();
}


initTheme();
renderStateListUI();


if (systemPrefersDark) {
  systemPrefersDark.addEventListener("change", (e) => {
    if (localStorage.getItem("darkMode") === null) {
      gameSettings.darkMode = e.matches;
      applySettings();
    }
  });
}


// --- Screen Navigation ---
function showScreen(screenId) {
  screens.forEach(s => s.classList.remove("active"));
  const activeScreen = document.getElementById(screenId);
  if (activeScreen) {
    activeScreen.classList.add("active");
    activeScreen.focus();
  }
}


if (btnGotoModes) btnGotoModes.addEventListener("click", () => showScreen("screen-modes"));
if (btnGotoSettings) {
  btnGotoSettings.addEventListener("click", () => openSettings("screen-home"));
}


// Opens Settings from mid-game without losing the running game — the
// Settings screen's back button (below) will say "Back to Game" and
// send the player back to screen-game instead of screen-home here.
if (btnGameSettings) {
  btnGameSettings.addEventListener("click", () => openSettings("screen-game"));
}


backButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const parentScreen = btn.closest(".screen");
    if (parentScreen && parentScreen.id === "screen-settings") {
      showScreen(settingsReturnScreen);


      // Re-show whichever overlay was open when Settings was launched,
      // so the player still has Play Again / Retry / Home available
      // instead of being stranded with only Quit in the header.
      if (settingsReturnOverlay === "modal" && modalSummary) {
        modalSummary.classList.remove("hidden");
      } else if (settingsReturnOverlay === "admire" && admireBar) {
        admireBar.classList.remove("hidden");
      }


      settingsReturnScreen = "screen-home";
      settingsReturnOverlay = null;
      if (settingsBackButton) settingsBackButton.textContent = "Back to Home";
    } else {
      showScreen(btn.dataset.target);
    }
  });
});


modeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    selectedMode = btn.dataset.mode || "pin";
    showScreen("screen-setup");
  });
});


// --- Settings Screen Handlers ---
if (toggleDark) {
  toggleDark.addEventListener("change", (e) => {
    gameSettings.darkMode = e.target.checked;
    localStorage.setItem("darkMode", JSON.stringify(gameSettings.darkMode));
    localStorage.setItem("gameSettings", JSON.stringify(gameSettings));
    applySettings();
  });
}


if (toggleContrast) {
  toggleContrast.addEventListener("change", (e) => {
    gameSettings.highContrast = e.target.checked;
    localStorage.setItem("gameSettings", JSON.stringify(gameSettings));
    applySettings();
  });
}


if (sliderSound) {
  sliderSound.addEventListener("input", (e) => {
    gameSettings.soundVolume = Number(e.target.value);
    localStorage.setItem("gameSettings", JSON.stringify(gameSettings));
  });
}


if (toggleSpeedrun) {
  toggleSpeedrun.addEventListener("change", (e) => {
    gameSettings.speedrunMode = e.target.checked;
    localStorage.setItem("gameSettings", JSON.stringify(gameSettings));
  });
}


if (toggleInstantCheck) {
  toggleInstantCheck.addEventListener("change", (e) => {
    gameSettings.instantTypeCheck = e.target.checked;
    localStorage.setItem("gameSettings", JSON.stringify(gameSettings));
  });
}


if (toggleHideStatsDefault) {
  toggleHideStatsDefault.addEventListener("change", (e) => {
    gameSettings.hideStatsByDefault = e.target.checked;
    localStorage.setItem("gameSettings", JSON.stringify(gameSettings));
    renderStatsPanel(); // re-render so states without a manual override pick up the new default right away
  });
}


if (btnResetProgress) {
btnResetProgress.addEventListener("click", () => {
  if (confirm("Are you sure you want to reset all saved progress and mistakes?")) {
    countyProgress = {};
    countyMistakes = {};
    statsHiddenOverride = {};
    localStorage.removeItem("countyProgress");
    localStorage.removeItem("countyMistakes");
    renderStateListUI();
    renderCountyCheckboxes(); // redraw checkboxes so mistake badges clear too
    renderStatsPanel();
    if (suggestionBox) suggestionBox.classList.add("hidden"); // stale "top 5 missed" no longer applies
    alert("Progress and mistake history reset successfully!");
  }
});
}


// --- Dynamic State Selector UI ---
// FIX #1: previously this function bailed out immediately because
// document.getElementById("state-list") returned null (no such element
// exists in index.html), so none of the click/keydown handlers below it
// were ever attached anywhere. Now it looks up each *existing* state row
// (#state-delaware, #state-rhode_island, ...) by id and wires it up in
// place, leaving the static WIP rows untouched.
function renderStateListUI() {
  Object.keys(stateData).forEach(stateKey => {
    const state = stateData[stateKey];
    const stateRow = document.getElementById(`state-${stateKey}`);
    if (!stateRow) return;


    const isSelected = activeStateKeys.includes(stateKey);

    stateRow.classList.toggle("selected", isSelected);
    stateRow.setAttribute("tabindex", "0");
    stateRow.setAttribute("role", "button");
    stateRow.setAttribute("aria-pressed", isSelected);


    // Only attach listeners once per row, even though this function can
    // run again later (e.g. after a progress reset).
    if (stateRow.dataset.listenerAttached === "true") return;
    stateRow.dataset.listenerAttached = "true";


    // Toggle this state in/out of the active set — lets more than one
    // state be selected at once, so both maps can show and both counties
    // pools get combined. Also refreshes the stats panel, which always
    // shows every currently-selected state.
    const toggleState = () => {
      const idx = activeStateKeys.indexOf(stateKey);
      if (idx === -1) {
        activeStateKeys.push(stateKey);
        stateRow.classList.add("selected");
        stateRow.setAttribute("aria-pressed", "true");
      } else {
        activeStateKeys.splice(idx, 1);
        stateRow.classList.remove("selected");
        stateRow.setAttribute("aria-pressed", "false");
      }


      renderCountyCheckboxes();
      if (countyPanel) {
        countyPanel.classList.toggle("hidden", activeStateKeys.length === 0);
      }
      updateSetupPlayButton();
      switchVisibleSvgMap();
      renderStatsPanel();
    };


    stateRow.addEventListener("click", toggleState);
    stateRow.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggleState();
      }
    });
  });
}


// --- Per-County, Per-Mode Learning Stats ---
function isCountyLearned(countyId, mode) {
  return !!(countyProgress[countyId] && countyProgress[countyId][mode]);
}


// Marks a county learned for whichever mode it was just correctly
// guessed in. Idempotent (re-marking an already-learned county/mode
// pair is a no-op) so it's safe to call on every correct guess without
// spamming localStorage writes.
function markCountyLearned(countyId, mode) {
  if (isCountyLearned(countyId, mode)) return;
  if (!countyProgress[countyId]) countyProgress[countyId] = {};
  countyProgress[countyId][mode] = true;
  localStorage.setItem("countyProgress", JSON.stringify(countyProgress));
  renderStatsPanel();
}


// Renders one stats section (state name header + per-mode/per-county
// table) for every currently-selected state, back to back — the same
// "grouped by state, in selection order" layout renderCountyCheckboxes()
// uses. Hidden entirely when nothing is selected. Each state's table can
// be individually collapsed via its Hide/Show button (or all at once via
// Hide All) — see isStatsHidden()/statsHiddenOverride above.
function renderStatsPanel() {
  if (!statsPanel) return;

  if (activeStateKeys.length === 0) {
    statsPanel.classList.add("hidden");
    statsPanel.innerHTML = "";
    return;
  }

  const headerCells = MODE_LIST.map(mode => `<th>${MODE_LABELS[mode]}</th>`).join("");

  const stateSections = activeStateKeys.map(stateKey => {
    const state = stateData[stateKey];
    if (!state) return "";

    const sortedCounties = [...state.counties].sort((a, b) => a.name.localeCompare(b.name));
    const total = sortedCounties.length;
    const hidden = isStatsHidden(stateKey);

    const summaryCells = MODE_LIST.map(mode => {
      const learnedCount = sortedCounties.filter(c => isCountyLearned(c.id, mode)).length;
      const complete = learnedCount === total;
      const label = complete ? "Completed" : `${learnedCount}/${total} learned`;
      return `<td class="stats-summary-cell${complete ? " stats-complete" : ""}">${label}</td>`;
    }).join("");

    const countyRows = sortedCounties.map(c => {
      const cells = MODE_LIST.map(mode => {
        const learned = isCountyLearned(c.id, mode);
        return `<td class="stats-check-cell ${learned ? "stats-yes" : "stats-no"}" aria-label="${learned ? "Learned" : "Not learned"}">${learned ? "✓" : "✗"}</td>`;
      }).join("");
      return `<tr><td class="stats-county-name">${c.name}</td>${cells}</tr>`;
    }).join("");

    return `
      <div class="stats-state-header">
        <span class="stats-state-name">${state.name}</span>
        <button type="button" class="btn-secondary btn-stats-toggle" data-state-key="${stateKey}" aria-expanded="${!hidden}">${hidden ? "Show" : "Hide"}</button>
      </div>
      ${hidden ? "" : `
      <div class="stats-table-wrap">
        <table class="stats-table">
          <thead>
            <tr><th></th>${headerCells}</tr>
          </thead>
          <tbody>
            <tr class="stats-summary-row"><td></td>${summaryCells}</tr>
            ${countyRows}
          </tbody>
        </table>
      </div>
      `}
    `;
  }).join("");

  statsPanel.innerHTML = `
    <div class="stats-panel-actions">
      <button type="button" id="btn-hide-all-stats" class="btn-secondary">Hide All</button>
    </div>
    ${stateSections}
  `;

  statsPanel.classList.remove("hidden");
}


// Single delegated listener for the Hide/Show buttons rendered inside
// the stats panel — attached once here (rather than re-bound on every
// renderStatsPanel() call) since the buttons themselves are recreated
// each time statsPanel.innerHTML is replaced.
if (statsPanel) {
  statsPanel.addEventListener("click", (e) => {
    const hideAllBtn = e.target.closest("#btn-hide-all-stats");
    if (hideAllBtn) {
      activeStateKeys.forEach(stateKey => { statsHiddenOverride[stateKey] = true; });
      renderStatsPanel();
      return;
    }

    const toggleBtn = e.target.closest(".btn-stats-toggle");
    if (toggleBtn) {
      const stateKey = toggleBtn.dataset.stateKey;
      statsHiddenOverride[stateKey] = !isStatsHidden(stateKey);
      renderStatsPanel();
    }
  });
}


// Builds the "click here" stand-in for Kalawao County: a circle placed
// out in open water plus a line pointing at the real (tiny) shape, so
// the county is actually clickable at normal zoom levels. Uses getBBox()
// to find Kalawao's real position/size, so it's positioned correctly no
// matter the exact path geometry — this only runs once the Hawaii SVG is
// actually visible in the DOM (getBBox needs a rendered element).
function setupKalawaoCallout(hawaiiSvg) {
  const kalawaoPath = document.getElementById("kalawao");
  if (!kalawaoPath || !hawaiiSvg) return false;

  let bbox;
  try {
    bbox = kalawaoPath.getBBox();
  } catch (e) {
    return false; // Bail quietly if the browser can't compute it yet.
  }
  if (!bbox || (bbox.width === 0 && bbox.height === 0)) return false;

  const cx = bbox.x + bbox.width / 2;
  const cy = bbox.y + bbox.height / 2;

  // Open ocean between Moloka'i and O'ahu, north (negative-y) of the
  // real shape — clear of every other county's path.
  const calloutX = cx - 1400;
  const calloutY = cy - 3200;
  const calloutRadius = Math.max(bbox.width, bbox.height) * 1.6 + 350;

  // Stop the shaft just shy of Kalawao's actual center — close enough that
  // the arrowhead reads as touching the shape, not just gesturing vaguely
  // toward the middle of the strait.
  const dx = cx - calloutX;
  const dy = cy - calloutY;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const ux = dx / dist;
  const uy = dy / dist;
  const stopShort = 150;
  const tipX = cx - ux * stopShort;
  const tipY = cy - uy * stopShort;

  // Start the shaft at the circle's EDGE, not its center — the circle's
  // radius is large enough relative to the total distance to Kalawao that
  // starting from dead-center would leave the circle covering almost the
  // entire line, hiding the shaft with only the arrowhead poking out (or
  // not even that).
  const startX = calloutX + ux * calloutRadius;
  const startY = calloutY + uy * calloutRadius;

  const svgNS = "http://www.w3.org/2000/svg";
  const targetGroup = hawaiiSvg.querySelector("g") || hawaiiSvg;

  // Arrowhead marker, defined once and referenced by the line below via
  // marker-end. markerUnits="strokeWidth" (the default) means its size
  // automatically scales with the line's own stroke-width, so it stays
  // proportional to the shaft without needing separate tuning per state.
  let defs = hawaiiSvg.querySelector("defs");
  if (!defs) {
    defs = document.createElementNS(svgNS, "defs");
    hawaiiSvg.insertBefore(defs, hawaiiSvg.firstChild);
  }
  if (!document.getElementById("kalawao-arrowhead")) {
    const marker = document.createElementNS(svgNS, "marker");
    marker.setAttribute("id", "kalawao-arrowhead");
    marker.setAttribute("markerWidth", "8");
    marker.setAttribute("markerHeight", "8");
    marker.setAttribute("refX", "6.5");
    marker.setAttribute("refY", "4");
    marker.setAttribute("orient", "auto-start-reverse");
    const arrowHead = document.createElementNS(svgNS, "path");
    arrowHead.setAttribute("d", "M0,0 L8,4 L0,8 Z");
    arrowHead.setAttribute("class", "kalawao-arrowhead-fill");
    marker.appendChild(arrowHead);
    defs.appendChild(marker);
  }

  const line = document.createElementNS(svgNS, "line");
  line.setAttribute("x1", startX);
  line.setAttribute("y1", startY);
  line.setAttribute("x2", tipX);
  line.setAttribute("y2", tipY);
  line.setAttribute("class", "kalawao-callout-line");
  line.setAttribute("marker-end", "url(#kalawao-arrowhead)");
  line.setAttribute("pointer-events", "none");
  targetGroup.appendChild(line);

  const circle = document.createElementNS(svgNS, "circle");
  circle.setAttribute("cx", calloutX);
  circle.setAttribute("cy", calloutY);
  circle.setAttribute("r", calloutRadius);
  circle.setAttribute("id", "kalawao-callout");
  circle.setAttribute("class", "county kalawao-callout");
  circle.setAttribute("data-county-id", "kalawao");
  circle.setAttribute("data-name", "Kalawao");
  circle.setAttribute("tabindex", "0");
  circle.setAttribute("role", "button");
  circle.setAttribute("aria-label", "Kalawao County (click here — the real county outline is very small)");
  targetGroup.appendChild(circle);

  // Re-collect every ".county" element so the new circle gets reset
  // between games and included in the "all correct" win state exactly
  // like every other county, then wire up its click/tap/keyboard handling.
  countyPaths = document.querySelectorAll(".county");
  bindCountyInteractivity(circle);
  return true;
}


function switchVisibleSvgMap() {
  svgMaps.forEach(map => {
    map.style.display = "none";
    map.classList.add("hidden");
    map.classList.remove("map-divider", "map-divider-top");
  });


  const visibleMaps = [];
  activeStateKeys.forEach(key => {
    const targetSvg = document.getElementById(stateData[key]?.svgId);
    if (targetSvg) {
      targetSvg.style.display = "block";
      targetSvg.classList.remove("hidden");
      visibleMaps.push(targetSvg);


      // setupKalawaoCallout() needs the Hawaii SVG to actually be
      // rendered (getBBox() only works on visible elements), but this
      // can run while we're still on the setup screen — before
      // #screen-game (and this SVG) is actually shown. If it bails out
      // early for that reason, only its own return value tells us so;
      // kalawaoCalloutCreated must stay false so the very next call
      // (once the screen is genuinely visible) tries again instead of
      // silently giving up forever.
      if (key === "hawaii" && !kalawaoCalloutCreated) {
        kalawaoCalloutCreated = setupKalawaoCallout(targetSvg);
      }
    }
  });


  // Add the subtle divider line between maps, but never after the last
  // one — so a single map shown alone has no stray border.
  //
  // Important: this has to be based on the maps' actual DOM order, not
  // the order the user selected the states in. .map-wrapper is a flex
  // row, so visual left-to-right position always follows DOM order —
  // if we instead used activeStateKeys' order (selection order), the
  // divider could land on the wrong map whenever the user picked the
  // states in a different order than they appear in the markup, making
  // it show up outside the pair instead of between them.
  const domOrderedVisibleMaps = Array.from(svgMaps).filter(map => visibleMaps.includes(map));


  // Group the visible maps into their actual visual rows by comparing
  // offsetTop (reading it here forces the browser to lay things out, so
  // this reflects where .map-wrapper's flex-wrap really put each map —
  // not just DOM order). Two maps on the same row get a vertical divider
  // between them; a map that wrapped onto a new row instead gets a
  // horizontal divider along its top, separating it from the row above.
  const rows = [];
  domOrderedVisibleMaps.forEach(map => {
    // NOTE: map is an <svg> element (SVGElement), and SVGElement does not
    // have an .offsetTop property the way HTMLElement does — it's always
    // undefined, which made every comparison below resolve to NaN < 2
    // (always false), so every map was treated as starting a new row no
    // matter where it actually rendered. getBoundingClientRect().top works
    // on any element type and reflects the real on-screen position.
    const top = map.getBoundingClientRect().top;
    const lastRow = rows[rows.length - 1];
    if (lastRow && Math.abs(lastRow.top - top) < 2) {
      lastRow.maps.push(map);
    } else {
      rows.push({ top, maps: [map] });
    }
  });


  rows.forEach((row, rowIndex) => {
    row.maps.forEach((map, mapIndex) => {
      if (mapIndex < row.maps.length - 1) {
        map.classList.add("map-divider");
      }
    });
    if (rowIndex > 0) {
      row.maps[0].classList.add("map-divider-top");
    }
  });
}


// --- State & County Setup Logic ---
  function renderCountyCheckboxes() {
  if (!checkboxContainer) return;


  // Remove both the county labels AND any state-header dividers from
  // the previous render.
  const existingChildren = checkboxContainer.querySelectorAll("label, .county-group-header");
  existingChildren.forEach(el => el.remove());


  // Grouped by state (in the order the states were selected), with
  // each state's own counties sorted alphabetically underneath its
  // header. The header itself is what disambiguates two counties that
  // share a name (e.g. "Kent" in Delaware vs Rhode Island), so the
  // label text no longer needs a ", State" suffix the way the flat
  // combined list did.
  activeStateKeys.forEach(stateKey => {
    const state = stateData[stateKey];
    if (!state) return;


    const header = document.createElement("div");
    header.className = "county-group-header";
    header.textContent = state.name;
    checkboxContainer.appendChild(header);


    const sortedCounties = [...state.counties].sort((a, b) => a.name.localeCompare(b.name));


    sortedCounties.forEach(c => {
      const label = document.createElement("label");
      label.className = "checkbox-label";
      const mistakes = countyMistakes[c.id] || 0;
      const mistakeBadge = mistakes > 0 ? `<span class="badge-mistake">${mistakes} miss${mistakes > 1 ? 'es' : ''}</span>` : '';


      label.innerHTML = `
        <input type="checkbox" class="county-checkbox" value="${c.id}" data-state="${c.stateKey}">
        <span class="checkbox-custom"></span>
        <span class="county-label-text">${c.name}</span>
        ${mistakeBadge}
      `;
      checkboxContainer.appendChild(label);
    });
  });


  document.querySelectorAll(".county-checkbox").forEach(cb => {
    cb.addEventListener("change", updateSetupPlayButton);
  });
}


function getActiveCountiesPool() {
  return activeStateKeys.flatMap(key => (stateData[key] ? stateData[key].counties : []));
}


// How many of the most-missed counties get auto-selected by "Select the
// ones you struggled with" / the initial suggestion. Capped rather than
// selecting every county with any mistake at all, since that list grows
// unhelpfully long once more states/counties have been played.
const SUGGESTION_LIMIT = 5;


// Returns the ids of up to `limit` currently-rendered counties with the
// highest mistake counts, highest first. Counties with zero mistakes are
// never included, so this can return fewer than `limit` ids.
function getLowestMistakeCountyIds(limit) {
  return Array.from(document.querySelectorAll(".county-checkbox"))
    .map(cb => ({ id: cb.value, mistakes: countyMistakes[cb.value] || 0 }))
    .filter(c => c.mistakes >= 0) // Change to c.mistakes >= 0 if you want to include 0-mistake counties
    .sort((a, b) => a.mistakes - b.mistakes) // Sorts lowest to highest
    .slice(0, limit)
    .map(c => c.id);
}


radioSpecific.forEach(radio => {
  radio.addEventListener("change", (e) => {
    const countyCheckboxes = document.querySelectorAll(".county-checkbox");
    if (e.target.value === "yes") {
      if (checkboxContainer) checkboxContainer.classList.remove("hidden");


      // Start with nothing selected — the user can check counties
      // manually, or use the "Select your 5 best-known" button.
      countyCheckboxes.forEach(cb => {
        cb.checked = false;
      });


      const topMistakeIds = getLowestMistakeCountyIds(SUGGESTION_LIMIT);
      if (suggestionBox) {
        if (topMistakeIds.length > 0) {
          suggestionBox.classList.remove("hidden");
        } else {
          suggestionBox.classList.add("hidden");
        }
      }
    } else {
      if (checkboxContainer) checkboxContainer.classList.add("hidden");
      if (suggestionBox) suggestionBox.classList.add("hidden");
      countyCheckboxes.forEach(cb => cb.checked = false);
    }
    updateSetupPlayButton();
  });
});


if (btnSelectSuggested) {
  btnSelectSuggested.addEventListener("click", () => {
    // Deselect everything first so it's obvious the button reset the
    // selection, then check only the suggested 5 — even if some of them
    // happened to already be checked.
    document.querySelectorAll(".county-checkbox").forEach(cb => {
      cb.checked = false;
    });

    const topMistakeIds = getLowestMistakeCountyIds(SUGGESTION_LIMIT);
    document.querySelectorAll(".county-checkbox").forEach(cb => {
      if (topMistakeIds.includes(cb.value)) cb.checked = true;
    });
    updateSetupPlayButton();
  });
}


if (btnDeselectAll) {
  btnDeselectAll.addEventListener("click", () => {
    document.querySelectorAll(".county-checkbox").forEach(cb => {
      cb.checked = false;
    });
    updateSetupPlayButton();
  });
}


function updateSetupPlayButton() {
if (!btnStartGame) return;


if (activeStateKeys.length === 0) {
  btnStartGame.classList.remove("hidden");
  btnStartGame.setAttribute("disabled", "true");
  return;
}


const specificRadio = document.querySelector('input[name="specific-counties"]:checked');
const isSpecificYes = specificRadio ? specificRadio.value === "yes" : false;


if (!isSpecificYes || document.querySelectorAll(".county-checkbox:checked").length >= 1) {
  btnStartGame.classList.remove("hidden");
  btnStartGame.removeAttribute("disabled");
} else {
  btnStartGame.classList.add("hidden");
  btnStartGame.setAttribute("disabled", "true");
}
}


if (btnStartGame) {
  btnStartGame.addEventListener("click", () => {
    const specificRadio = document.querySelector('input[name="specific-counties"]:checked');
    const isSpecificYes = specificRadio ? specificRadio.value === "yes" : false;
    const allActiveCounties = getActiveCountiesPool();


    if (isSpecificYes) {
      const checkedIds = Array.from(document.querySelectorAll(".county-checkbox:checked")).map(cb => cb.value);
      selectedCounties = allActiveCounties.filter(c => !checkedIds.includes(c.id));
    } else {
      selectedCounties = [...allActiveCounties];
    }


    if (selectedCounties.length === 0) return;


    // NOTE: showScreen() has to run BEFORE switchVisibleSvgMap(). The maps
    // live inside #screen-game, which is display:none until it gets the
    // "active" class — and getBoundingClientRect() (used by
    // switchVisibleSvgMap() to detect which maps share a visual row)
    // returns all-zero rects for anything inside a display:none ancestor.
    // Computing row layout first and only THEN revealing the screen meant
    // every map measured as {top:0, left:0}, so they all looked like they
    // were on the same row no matter how they actually wrapped.
    showScreen("screen-game");
    switchVisibleSvgMap();
    initGame(selectedCounties);
  });
}


if (btnQuitGame) {
  btnQuitGame.addEventListener("click", () => {
    isGameActive = false;
    if (modalSummary) modalSummary.classList.add("hidden");
    if (admireBar) admireBar.classList.add("hidden");
    showScreen("screen-modes");
  });
}


if (btnNewGame) {
  btnNewGame.addEventListener("click", () => {
    initGame(selectedCounties);
  });
}


// --- Give Up ---
// Reveals every county still left in the pool as missed (in red), then
// shows the same end-of-game summary (percentage + options) the player
// would get from finishing normally. Works the same way in every mode,
// including the Type modes where counties normally aren't clickable —
// each revealed county gets its pointer-events force-enabled so hovering
// it still pops out its name, even though isGameActive being false means
// clicking or typing can no longer register a guess.
function giveUp() {
  if (!isGameActive) return;

  document.querySelectorAll(".county.typing-highlight").forEach(el => {
    el.classList.remove("typing-highlight");
  });

  targetPool.forEach(c => {
    missedCounties.add(c);
    scoreWrong++;
    countyMistakes[c.id] = (countyMistakes[c.id] || 0) + 1;
    getCountyElements(c.id).forEach(el => {
      el.classList.add("given-up-missed");
      el.style.pointerEvents = "auto";
    });
  });
  localStorage.setItem("countyMistakes", JSON.stringify(countyMistakes));

  targetPool = [];
  currentTarget = null;
  isGameActive = false;

  if (typeInputBox) typeInputBox.classList.add("hidden");
  if (feedbackEl) {
    feedbackEl.textContent = "";
    feedbackEl.className = "feedback-message";
  }
  if (targetPrompt) targetPrompt.textContent = "Game over.";

  showSummaryModal();
}

if (btnGiveUp) {
  btnGiveUp.addEventListener("click", () => {
    if (!isGameActive) return;
    if (confirm("Give up? Every remaining county will be revealed as missed.")) {
      giveUp();
    }
  });
}


// --- Game Loop Functions ---
function initGame(countiesToPlay) {
  targetPool = [...countiesToPlay];
  scoreRight = 0;
  scoreWrong = 0;
  isGameActive = true;
  missedCounties.clear();
  currentAttemptMistakes = 0;
  // Recompute per-game: e.g. retrying only Delaware's missed counties
  // means "Kent" is no longer ambiguous even if it was during the full
  // multi-state round.
      ambiguousCountyNames = computeAmbiguousNames(getActiveCountiesPool());


  if (modalSummary) modalSummary.classList.add("hidden");
  if (admireBar) admireBar.classList.add("hidden");
  if (feedbackEl) {
    feedbackEl.textContent = "";
    feedbackEl.className = "feedback-message";
  }
  hideHoverTooltip();


  countyPaths.forEach(path => {
    path.classList.remove("correct", "wrong", "flash-correct", "found", "correct-recovered", "flash-correct-recovered", "typing-highlight", "given-up-missed");
    // Typing modes are solved by typing, not clicking — disabling
    // pointer events also removes the hover highlight so the map
    // doesn't look clickable when it isn't.
    path.style.pointerEvents = TYPE_MODES.has(selectedMode) ? "none" : "auto";
    path.setAttribute("tabindex", "0");
    path.setAttribute("role", "button");
    path.setAttribute("aria-label", "County path");
  });


  pickNextTarget();
}


function pickNextTarget() {
  currentAttemptMistakes = 0;

  // Clear any leftover "Type (Hard)" highlight before picking the next
  // target — otherwise the previous target would stay pulsing blue.
  document.querySelectorAll(".county.typing-highlight").forEach(el => {
    el.classList.remove("typing-highlight");
  });

  if (targetPool.length === 0) {
    isGameActive = false;
    showSummaryModal();
    return;
  }


  const randomIndex = Math.floor(Math.random() * targetPool.length);
  currentTarget = targetPool[randomIndex];


  if (targetPrompt) {
    if (selectedMode === "type") {
      // Open-ended: any remaining county counts, so there's no single
      // name to reveal here — the prompt just explains what to do.
      targetPrompt.innerHTML = `<span class="find-label">Type any county below</span>`;
    } else if (selectedMode === "type-hard") {
      targetPrompt.innerHTML = `<span class="find-label">Type the highlighted county</span>`;
    } else {
      const { name, state } = getDisplayParts(currentTarget);
      targetPrompt.innerHTML = `
        <span class="find-label">Find:</span>
        <span class="target-name">${name}</span>
        ${state ? `<span class="target-state">(${state})</span>` : ""}
      `;
    }
  }

  if (selectedMode === "type-hard") {
    getCountyElements(currentTarget.id).forEach(el => el.classList.add("typing-highlight"));
  }

  if (typeInputBox) {
    typeInputBox.classList.toggle("hidden", !TYPE_MODES.has(selectedMode));
  }
  if (TYPE_MODES.has(selectedMode) && typeInput) {
    typeInput.value = "";
    typeInput.focus();
  }
}


function handleCountyClick(pathEl) {
  if (!isGameActive || !currentTarget) return;
  if (TYPE_MODES.has(selectedMode)) return; // clicking doesn't solve typing modes


  // The Kalawao callout circle carries data-county-id="kalawao" so it
  // resolves to the real county's id; every other element just falls
  // back to its own id, unchanged from before.
  const clickedId = pathEl.dataset.countyId || pathEl.id;
  const clickedCounty = findCountyById(clickedId);
  const clickedName = clickedCounty
    ? getDisplayName(clickedCounty)
    : (pathEl.getAttribute("data-name") || pathEl.id);


  if (clickedId === currentTarget.id) {
    scoreRight++;
    playSound("correct");
    // currentAttemptMistakes counts wrong guesses made on THIS target
    // before it was finally found. pickNextTarget() (called below)
    // resets it to 0, so it has to be read here first.
    const recoveredFromMistake = currentAttemptMistakes > 0;
    // Only counts as "learned" if it was found with zero mistakes on
    // this attempt — i.e. first try (or, during Retry Missed, first
    // try within that retry). Getting it right only after guessing
    // wrong first doesn't earn the checkmark.
    if (!recoveredFromMistake) markCountyLearned(currentTarget.id, selectedMode);


    if (feedbackEl) {
      feedbackEl.textContent = `Correct! That's ${getDisplayName(currentTarget)}.`;
      feedbackEl.className = "feedback-message success";
    }


    // Apply the "found" state to every element representing this county
    // (the real shape AND its callout circle, if it has one) so they
    // stay in sync no matter which one was actually clicked.
    getCountyElements(currentTarget.id).forEach(el => {
      if (selectedMode === "pin") {
        el.classList.add(recoveredFromMistake ? "correct-recovered" : "correct", "found");
        el.style.pointerEvents = "none";
      } else if (selectedMode === "pin-hard") {
        const flashClass = recoveredFromMistake ? "flash-correct-recovered" : "flash-correct";
        el.classList.add(flashClass);
        setTimeout(() => el.classList.remove(flashClass), 600);
      }
    });


    targetPool = targetPool.filter(c => c.id !== currentTarget.id);
    pickNextTarget();
  } else {
    scoreWrong++;
    currentAttemptMistakes++;
    playSound("wrong");


    if (feedbackEl) {
      feedbackEl.textContent = `Oops! That's ${clickedName}.`;
      feedbackEl.className = "feedback-message error";
    }


    missedCounties.add(currentTarget);


    // Save mistake persistence
    countyMistakes[currentTarget.id] = (countyMistakes[currentTarget.id] || 0) + 1;
    localStorage.setItem("countyMistakes", JSON.stringify(countyMistakes));


    pathEl.classList.add("wrong");
    setTimeout(() => pathEl.classList.remove("wrong"), 600);
  }
}


// --- Typing Modes ("Type" and "Type (Hard)") ---
// A correct guess is shared logic between the two modes; only how the
// match(es) are *found* differs (getTypedGuessMatches, defined earlier).
// matchedCounties is always an array — length 1 for "Type (Hard)" (and
// usually for "Type" too), but "Type" can hand back several counties at
// once when their bare names are identical (e.g. two "Kent"s in play).
function acceptTypedMatches(matchedCounties) {
  scoreRight++;
  playSound("correct");
  const recoveredFromMistake = currentAttemptMistakes > 0;

  if (feedbackEl) {
    if (selectedMode === "type-hard") {
      // There's exactly one specific target here, so naming it is useful
      // confirmation.
      feedbackEl.textContent = `Correct! That's ${getDisplayName(matchedCounties[0])}.`;
    } else {
      // Plain "Type" mode: the player typed the name themselves, so
      // repeating it back as "Correct! That's Kent!" is redundant — just
      // confirm the guess, and note the count if it resolved more than
      // one county at once.
      feedbackEl.textContent = matchedCounties.length > 1
        ? `Correct! That matched ${matchedCounties.length} counties.`
        : "Correct!";
    }
    feedbackEl.className = "feedback-message success";
  }

  matchedCounties.forEach(matchedCounty => {
    // Same "first try only" rule as click mode — see handleCountyClick.
    if (!recoveredFromMistake) markCountyLearned(matchedCounty.id, selectedMode);
    getCountyElements(matchedCounty.id).forEach(el => {
      el.classList.remove("typing-highlight");
      el.classList.add(recoveredFromMistake ? "correct-recovered" : "correct", "found");
      el.style.pointerEvents = "none";
    });
  });

  const matchedIds = new Set(matchedCounties.map(c => c.id));
  targetPool = targetPool.filter(c => !matchedIds.has(c.id));
  pickNextTarget();
}

function registerWrongTypedGuess() {
  scoreWrong++;
  currentAttemptMistakes++;
  playSound("wrong");

  if (feedbackEl) {
    feedbackEl.textContent = "Not quite — try again.";
    feedbackEl.className = "feedback-message error";
  }

  // Attributed to whatever county is currently "in focus" (the
  // highlighted one in Type (Hard), or the arbitrarily pre-picked one
  // in Type) so the mistake still feeds the "5 best-known" suggestions
  // and the missed-counties summary, same as click-based modes.
  if (currentTarget) {
    missedCounties.add(currentTarget);
    countyMistakes[currentTarget.id] = (countyMistakes[currentTarget.id] || 0) + 1;
    localStorage.setItem("countyMistakes", JSON.stringify(countyMistakes));
  }

  if (typeInputBox) {
    typeInputBox.classList.remove("shake");
    // Force a reflow so the animation can re-trigger on consecutive
    // wrong guesses, not just the first one.
    void typeInputBox.offsetWidth;
    typeInputBox.classList.add("shake");
  }
}

// Live-check (as-you-type) path: only ever silently accepts an exact
// match. Never fires the "wrong" buzz/shake for partial input — that's
// reserved for an explicit Enter press, otherwise every half-typed
// word would falsely register as a mistake.
function tryAutoMatchTypedInput() {
  if (!isGameActive || !typeInput) return;
  const normalized = normalizeTypedName(typeInput.value);
  if (!normalized) return;
  const matches = getTypedGuessMatches(normalized);
  if (matches.length > 0) acceptTypedMatches(matches);
}

// Submit path (Enter key, always available regardless of the Instant
// Check setting): checks the full current input and treats a mismatch
// as a real wrong guess.
function submitTypedGuess() {
  if (!isGameActive || !typeInput) return;
  const normalized = normalizeTypedName(typeInput.value);
  if (!normalized) return;
  const matches = getTypedGuessMatches(normalized);
  if (matches.length > 0) {
    acceptTypedMatches(matches);
  } else {
    registerWrongTypedGuess();
  }
}

if (typeInput) {
  typeInput.addEventListener("input", () => {
    if (gameSettings.instantTypeCheck) tryAutoMatchTypedInput();
  });
  typeInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submitTypedGuess();
    }
  });
}


// --- Cursor-Following Tooltip (Give Up-revealed counties) ---
// Only ever shown for counties carrying "given-up-missed" — normal
// unplayed/found/wrong counties never trigger it.
function showHoverTooltip(text, x, y) {
  if (!hoverTooltip) return;
  hoverTooltip.textContent = text;
  hoverTooltip.style.left = `${x}px`;
  hoverTooltip.style.top = `${y}px`;
  hoverTooltip.classList.remove("hidden");
}

function moveHoverTooltip(x, y) {
  if (!hoverTooltip || hoverTooltip.classList.contains("hidden")) return;
  hoverTooltip.style.left = `${x}px`;
  hoverTooltip.style.top = `${y}px`;
}

function hideHoverTooltip() {
  if (hoverTooltip) hoverTooltip.classList.add("hidden");
}


// --- County Map Mouse & Accessibility Keyboard Interactivity ---
// Normal mode responds on "click", which only fires once the mouse
// button (or finger) is released over the same element it was pressed
// on. Speedrun mode instead responds on "pointerdown" — the instant the
// press begins — so there's no need to lift off before the guess
// registers. Both listeners stay attached at all times; each one just
// checks gameSettings.speedrunMode and no-ops if it isn't the active mode,
// so toggling the setting mid-game takes effect immediately without
// re-binding anything.
//
// Factored out into its own function so the Kalawao callout circle
// (created later, after Hawaii's map is first shown) can get the exact
// same handling as every county that already existed at page load.
function bindCountyInteractivity(path) {
  path.addEventListener("pointerdown", (e) => {
    if (!gameSettings.speedrunMode) return;
    handleCountyClick(e.currentTarget);
  });


  path.addEventListener("click", (e) => {
    if (gameSettings.speedrunMode) return;
    handleCountyClick(e.currentTarget);
  });


  path.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleCountyClick(e.currentTarget);
    }
  });


  // Cursor-following name popout — only does anything once Give Up has
  // marked this county "given-up-missed"; otherwise these are no-ops.
  path.addEventListener("mouseenter", (e) => {
    const el = e.currentTarget;
    if (!el.classList.contains("given-up-missed")) return;
    const id = el.dataset.countyId || el.id;
    const county = findCountyById(id);
    const name = county ? getDisplayName(county) : (el.getAttribute("data-name") || "");
    showHoverTooltip(name, e.clientX, e.clientY);
  });


  path.addEventListener("mousemove", (e) => {
    moveHoverTooltip(e.clientX, e.clientY);
  });


  path.addEventListener("mouseleave", hideHoverTooltip);
}


countyPaths.forEach(bindCountyInteractivity);


// --- End-Game Summary & Admire Map Logic ---
function showSummaryModal() {
  if (!modalSummary) return;


  const totalAttempts = scoreRight + scoreWrong;
  const accuracy = totalAttempts > 0 ? Math.round((scoreRight / totalAttempts) * 100) : 0;


  if (summaryPercentage) summaryPercentage.textContent = `${accuracy}%`;


  if (summaryGradeTitle) {
    if (accuracy === 100) summaryGradeTitle.textContent = "Good job!";
    else if (accuracy >= 75) summaryGradeTitle.textContent = "Not bad.";
    else if (accuracy >= 50) summaryGradeTitle.textContent = "You could work on that.";
    else summaryGradeTitle.textContent = "Oof.";
  }


  const missedArray = Array.from(missedCounties);
  if (modalActions) modalActions.innerHTML = "";


  if (missedArray.length === 0) {
    // Perfect Score Flow
    const activeStateNames = activeStateKeys.map(key => stateData[key]?.name || key);


    if (summaryMessage) {
      if (activeStateNames.length === 1) {
        summaryMessage.textContent = `You've learned all the counties in ${activeStateNames[0]}! Good job!`;
      } else {
        summaryMessage.textContent = `You've learned all the counties across ${activeStateNames.length} states! Good job!`;
      }
    }


    countyPaths.forEach(path => {
      path.classList.add("correct");
      path.style.pointerEvents = "none";
    });


    if (targetPrompt) targetPrompt.textContent = "Complete!";


    renderStateListUI();
    renderStatsPanel();


    appendModalButton("Admire Map", "btn-secondary", enableAdmireBar);
    appendModalButton("Play Again", "btn-primary", () => {
      modalSummary.classList.add("hidden");
      initGame(selectedCounties);
    });
    appendModalButton("Settings", "btn-secondary", () => {
      modalSummary.classList.add("hidden");
      // FIX: pass "modal" so the summary popup reappears when the
      // player backs out of Settings, instead of staying hidden forever.
      openSettings("screen-game", "modal");
    });
    appendModalButton("Home", "btn-secondary", () => {
      modalSummary.classList.add("hidden");
      showScreen("screen-home");
    });
  } else {
    // Mistakes Flow
    const missedNames = missedArray.slice(0, 3).map(c => getDisplayName(c));
    let formattedMissed = "";
    if (missedNames.length === 1) formattedMissed = missedNames[0];
    else if (missedNames.length === 2) formattedMissed = `${missedNames[0]} and ${missedNames[1]}`;
    else formattedMissed = `${missedNames[0]}, ${missedNames[1]}, and ${missedNames[2]}`;


    if (missedArray.length > 3) {
      formattedMissed += `, and ${missedArray.length - 3} other${missedArray.length - 3 > 1 ? 's' : ''}`;
    }


    if (summaryMessage) {
      summaryMessage.textContent = `You missed ${missedArray.length} county target${missedArray.length > 1 ? 's' : ''} (${formattedMissed}). What would you like to do?`;
    }


    appendModalButton("Admire Map", "btn-secondary", enableAdmireBar);
    appendModalButton("Retry Missed", "btn-primary", () => {
      modalSummary.classList.add("hidden");
      initGame(missedArray);
    });
    appendModalButton("Play Again", "btn-secondary", () => {
      modalSummary.classList.add("hidden");
      initGame(selectedCounties);
    });
    appendModalButton("Settings", "btn-secondary", () => {
      modalSummary.classList.add("hidden");
      // FIX: pass "modal" here too, for the same reason as above.
      openSettings("screen-game", "modal");
    });
    appendModalButton("Home", "btn-secondary", () => {
      modalSummary.classList.add("hidden");
      showScreen("screen-home");
    });
  }


  modalSummary.classList.remove("hidden");
}


function appendModalButton(text, className, onClick) {
  if (!modalActions) return;
  const btn = document.createElement("button");
  btn.textContent = text;
  btn.className = className;
  btn.onclick = onClick;
  modalActions.appendChild(btn);
}


// --- Bottom Bar "Admire Map" Interactivity ---
function enableAdmireBar() {
  modalSummary.classList.add("hidden");
  if (admirePercentage) admirePercentage.textContent = summaryPercentage.textContent;
  if (admireText) admireText.textContent = summaryMessage.textContent;


  if (btnAdmireRetry) {
    if (missedCounties.size > 0) {
      btnAdmireRetry.classList.remove("hidden");
    } else {
      btnAdmireRetry.classList.add("hidden");
    }
  }


  if (admireBar) admireBar.classList.remove("hidden");
}


if (btnAdmireRetry) {
  btnAdmireRetry.addEventListener("click", () => {
    admireBar.classList.add("hidden");
    initGame(Array.from(missedCounties));
  });
}


if (btnAdmireReplay) {
  btnAdmireReplay.addEventListener("click", () => {
    admireBar.classList.add("hidden");
    initGame(selectedCounties);
  });
}


// admire bar's Settings button — already correctly passes "admire" so
// the bar reappears (instead of the summary modal) when Settings closes.
if (btnAdmireSettings) {
  btnAdmireSettings.addEventListener("click", () => {
    admireBar.classList.add("hidden");
    openSettings("screen-game", "admire");
  });
}


if (btnAdmireHome) {
  btnAdmireHome.addEventListener("click", () => {
    admireBar.classList.add("hidden");
    showScreen("screen-home");
  });
}
});