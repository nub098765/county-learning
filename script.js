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
    }
  };

  // --- Game Configuration & State Variables ---
  let selectedMode = "pin"; // "pin" or "pin-hard"
  let activeStateKeys = [];
  let selectedCounties = [];
  let targetPool = [];
  let currentTarget = null;
  let scoreRight = 0;
  let scoreWrong = 0;
  let isGameActive = false;
  let missedCounties = new Set();
  let currentAttemptMistakes = 0;

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

  // Looks up a county object by its path id across ALL states (not just the
  // active ones), so feedback text is always correct even mid-game.
  function findCountyById(id) {
    for (const key in stateData) {
      const found = stateData[key].counties.find(c => c.id === id);
      if (found) return found;
    }
    return null;
  }

  // --- Persistent Data Storage ---
  let completedStates = JSON.parse(localStorage.getItem("completedStates")) || [];
  let countyMistakes = JSON.parse(localStorage.getItem("countyMistakes")) || {};
  let gameSettings = JSON.parse(localStorage.getItem("gameSettings")) || {
    darkMode: false,
    highContrast: false,
    soundVolume: 50,
    speedrunMode: false
  };

  // --- Navigation & Screen DOM Elements ---
  const screens = document.querySelectorAll(".screen");
  const btnGotoModes = document.getElementById("btn-goto-modes");
  const btnGotoSettings = document.getElementById("btn-goto-settings");
  const backButtons = document.querySelectorAll(".btn-back");
  const modeButtons = document.querySelectorAll(".btn-mode");

  // --- Setup Screen DOM Elements ---
  const countyPanel = document.getElementById("county-options-panel");
  const radioSpecific = document.querySelectorAll('input[name="specific-counties"]');
  const checkboxContainer = document.getElementById("checkbox-container");
  const btnStartGame = document.getElementById("btn-start-game");
  const suggestionBox = document.getElementById("suggestion-box");
  const btnSelectSuggested = document.getElementById("btn-select-suggested");
  // FIX #1: there is no #state-list container in index.html — the state rows
  // (#state-delaware, #state-rhode_island, plus the static WIP rows) are already
  // hardcoded in the markup. renderStateListUI() now wires up the existing rows
  // instead of trying to rebuild a container that was never there.

  // --- Settings DOM Elements ---
  const toggleDark = document.getElementById("toggle-dark");
  const toggleContrast = document.getElementById("toggle-contrast");
  const sliderSound = document.getElementById("slider-sound");
  const toggleSpeedrun = document.getElementById("toggle-speedrun");
  const btnResetProgress = document.getElementById("btn-reset-progress");

  // --- Game Screen DOM Elements ---
  const targetPrompt = document.getElementById("target-prompt");
  const feedbackEl = document.getElementById("feedback");
  const btnQuitGame = document.getElementById("btn-quit-game");
  const btnGameSettings = document.getElementById("btn-game-settings");
  const btnNewGame = document.getElementById("btn-new-game");
  const countyPaths = document.querySelectorAll(".county");
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

  if (btnResetProgress) {
  btnResetProgress.addEventListener("click", () => {
    if (confirm("Are you sure you want to reset all saved progress and mistakes?")) {
      completedStates = [];
      countyMistakes = {};
      localStorage.removeItem("completedStates");
      localStorage.removeItem("countyMistakes");
      renderStateListUI();
      renderCountyCheckboxes(); // redraw checkboxes so mistake badges clear too
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

      const isCompleted = completedStates.includes(stateKey);
      const isSelected = activeStateKeys.includes(stateKey);

      stateRow.classList.toggle("selected", isSelected);
      stateRow.classList.toggle("completed", isCompleted);
      stateRow.setAttribute("tabindex", "0");
      stateRow.setAttribute("role", "button");
      stateRow.setAttribute("aria-pressed", isSelected);

      // Swap the "N counties" label for a "COMPLETED" tag and back, without
      // touching the rest of the row's markup.
      const countSpan = stateRow.querySelector(".state-count");
      const completedTag = stateRow.querySelector(".completed-tag");
      if (isCompleted && countSpan) {
        countSpan.outerHTML = '<span class="completed-tag">✓ COMPLETED</span>';
      } else if (!isCompleted && completedTag) {
        completedTag.outerHTML = `<span class="state-count">${state.counties.length} counties</span>`;
      }

      // Only attach listeners once per row, even though this function can
      // run again later (e.g. after a progress reset).
      if (stateRow.dataset.listenerAttached === "true") return;
      stateRow.dataset.listenerAttached = "true";

      // Toggle this state in/out of the active set — lets more than one
      // state be selected at once, so both maps can show and both counties
      // pools get combined.
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

  function switchVisibleSvgMap() {
    svgMaps.forEach(map => {
      map.style.display = "none";
      map.classList.add("hidden");
      map.classList.remove("map-divider");
    });

    const visibleMaps = [];
    activeStateKeys.forEach(key => {
      const targetSvg = document.getElementById(stateData[key]?.svgId);
      if (targetSvg) {
        targetSvg.style.display = "block";
        targetSvg.classList.remove("hidden");
        visibleMaps.push(targetSvg);
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

    domOrderedVisibleMaps.forEach((map, index) => {
      if (index < domOrderedVisibleMaps.length - 1) {
        map.classList.add("map-divider");
      }
    });
  }

  // --- State & County Setup Logic ---
  function renderCountyCheckboxes() {
    if (!checkboxContainer) return;

    const activeCounties = [...getActiveCountiesPool()].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    // If more than one active state is selected, disambiguate any county
    // name shared between them (e.g. "Kent" in both Delaware and Rhode
    // Island) so the list isn't showing two identical-looking options.
    const checkboxAmbiguousNames = computeAmbiguousNames(activeCounties);

    const existingLabels = checkboxContainer.querySelectorAll("label");
    existingLabels.forEach(label => label.remove());

    activeCounties.forEach(c => {
      const label = document.createElement("label");
      label.className = "checkbox-label";
      const mistakes = countyMistakes[c.id] || 0;
      const mistakeBadge = mistakes > 0 ? `<span class="badge-mistake">${mistakes} miss${mistakes > 1 ? 'es' : ''}</span>` : '';
      const displayName = checkboxAmbiguousNames.has(c.name)
        ? `${c.name}, ${stateData[c.stateKey]?.name || c.stateKey}`
        : c.name;

      label.innerHTML = `
        <input type="checkbox" class="county-checkbox" value="${c.id}" data-state="${c.stateKey}">
        <span class="checkbox-custom"></span>
        <span class="county-label-text">${displayName}</span>
        ${mistakeBadge}
      `;
      checkboxContainer.appendChild(label);
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
  function getTopMistakeCountyIds(limit) {
    return Array.from(document.querySelectorAll(".county-checkbox"))
      .map(cb => ({ id: cb.value, mistakes: countyMistakes[cb.value] || 0 }))
      .filter(c => c.mistakes > 0)
      .sort((a, b) => b.mistakes - a.mistakes)
      .slice(0, limit)
      .map(c => c.id);
  }

  radioSpecific.forEach(radio => {
    radio.addEventListener("change", (e) => {
      const countyCheckboxes = document.querySelectorAll(".county-checkbox");
      if (e.target.value === "yes") {
        if (checkboxContainer) checkboxContainer.classList.remove("hidden");

        const topMistakeIds = getTopMistakeCountyIds(SUGGESTION_LIMIT);
        countyCheckboxes.forEach(cb => {
          cb.checked = topMistakeIds.includes(cb.value);
        });

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
      const topMistakeIds = getTopMistakeCountyIds(SUGGESTION_LIMIT);
      document.querySelectorAll(".county-checkbox").forEach(cb => {
        cb.checked = topMistakeIds.includes(cb.value);
      });
      updateSetupPlayButton();
    });
  }

  function updateSetupPlayButton() {
    if (!btnStartGame) return;
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
        selectedCounties = allActiveCounties.filter(c => checkedIds.includes(c.id));
      } else {
        selectedCounties = [...allActiveCounties];
      }

      if (selectedCounties.length === 0) return;

      switchVisibleSvgMap();
      showScreen("screen-game");
      initGame(selectedCounties);
    });
  }

  if (btnQuitGame) {
    btnQuitGame.addEventListener("click", () => {
      isGameActive = false;
      if (modalSummary) modalSummary.classList.add("hidden");
      if (admireBar) admireBar.classList.add("hidden");
      showScreen("screen-home");
    });
  }

  if (btnNewGame) {
    btnNewGame.addEventListener("click", () => {
      initGame(selectedCounties);
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
    ambiguousCountyNames = computeAmbiguousNames(countiesToPlay);

    if (modalSummary) modalSummary.classList.add("hidden");
    if (admireBar) admireBar.classList.add("hidden");
    if (feedbackEl) {
      feedbackEl.textContent = "";
      feedbackEl.className = "feedback-message";
    }

    countyPaths.forEach(path => {
      path.classList.remove("correct", "wrong", "flash-correct", "found", "correct-recovered", "flash-correct-recovered");
      path.style.pointerEvents = "auto";
      path.setAttribute("tabindex", "0");
      path.setAttribute("role", "button");
      path.setAttribute("aria-label", "County path");
    });

    pickNextTarget();
  }

  function pickNextTarget() {
    currentAttemptMistakes = 0;
    if (targetPool.length === 0) {
      isGameActive = false;
      showSummaryModal();
      return;
    }

    const randomIndex = Math.floor(Math.random() * targetPool.length);
    currentTarget = targetPool[randomIndex];

    if (targetPrompt) {
      targetPrompt.innerHTML = `Find: <strong>${getDisplayName(currentTarget)}</strong>`;
    }
  }

  function handleCountyClick(pathEl) {
    if (!isGameActive || !currentTarget) return;

    const clickedId = pathEl.id;
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

      if (feedbackEl) {
        feedbackEl.textContent = `Correct! That's ${getDisplayName(currentTarget)}.`;
        feedbackEl.className = "feedback-message success";
      }

      if (selectedMode === "pin") {
        pathEl.classList.add(recoveredFromMistake ? "correct-recovered" : "correct", "found");
        pathEl.style.pointerEvents = "none";
      } else if (selectedMode === "pin-hard") {
        const flashClass = recoveredFromMistake ? "flash-correct-recovered" : "flash-correct";
        pathEl.classList.add(flashClass);
        setTimeout(() => pathEl.classList.remove(flashClass), 600);
      }

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

  // --- County Map Mouse & Accessibility Keyboard Interactivity ---
  // Normal mode responds on "click", which only fires once the mouse
  // button (or finger) is released over the same element it was pressed
  // on. Speedrun mode instead responds on "pointerdown" — the instant the
  // press begins — so there's no need to lift off before the guess
  // registers. Both listeners stay attached at all times; each one just
  // checks gameSettings.speedrunMode and no-ops if it isn't the active mode,
  // so toggling the setting mid-game takes effect immediately without
  // re-binding anything.
  countyPaths.forEach(path => {
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
  });

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

      // Save completion state
      activeStateKeys.forEach(stateKey => {
        const totalStateCounties = stateData[stateKey].counties.length;
        const playedStateCounties = selectedCounties.filter(c => c.stateKey === stateKey).length;

        if (playedStateCounties === totalStateCounties && !completedStates.includes(stateKey)) {
          completedStates.push(stateKey);
        }
      });

      localStorage.setItem("completedStates", JSON.stringify(completedStates));
      renderStateListUI();

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