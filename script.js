document.addEventListener('DOMContentLoaded', () => {
  // --- Data Registry for States and Counties ---
  const stateData = {
    delaware: {
      name: "Delaware",
      svgId: "svg-delaware",
      counties: [
        { id: "new-castle", name: "New Castle", stateKey: "delaware" },
        { id: "kent-de", name: "Kent", stateKey: "delaware" },
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
  let activeStateKeys = ["rhode_island"];
  let selectedCounties = [];
  let targetPool = [];
  let currentTarget = null;
  let scoreRight = 0;
  let scoreWrong = 0;
  let isGameActive = false;
  let missedCounties = new Set();
  let currentAttemptMistakes = 0;

  // --- Persistent Data Storage ---
  let completedStates = JSON.parse(localStorage.getItem("completedStates")) || [];
  let countyMistakes = JSON.parse(localStorage.getItem("countyMistakes")) || {};
  let gameSettings = JSON.parse(localStorage.getItem("gameSettings")) || {
    darkMode: false,
    highContrast: false,
    soundEnabled: true
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
  const stateListContainer = document.getElementById("state-list");

  // --- Settings DOM Elements ---
  const toggleDark = document.getElementById("toggle-dark");
  const toggleContrast = document.getElementById("toggle-contrast");
  const toggleSound = document.getElementById("toggle-sound");
  const btnResetProgress = document.getElementById("btn-reset-progress");

  // --- Game Screen DOM Elements ---
  const targetPrompt = document.getElementById("target-prompt");
  const feedbackEl = document.getElementById("feedback");
  const btnQuitGame = document.getElementById("btn-quit-game");
  const btnNewGame = document.getElementById("btn-new-game");
  const countyPaths = document.querySelectorAll(".county");
  const svgMaps = document.querySelectorAll(".state-map");

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
  const btnAdmireHome = document.getElementById("btn-admire-home");

  // --- Audio Synthesis Helper (No external assets required) ---
  function playSound(type) {
    if (!gameSettings.soundEnabled) return;
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
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === "wrong") {
        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(220, ctx.currentTime); // A3
        osc.frequency.setValueAtTime(164.81, ctx.currentTime + 0.1); // E3
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
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
    if (toggleSound) toggleSound.checked = gameSettings.soundEnabled;

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
  if (btnGotoSettings) btnGotoSettings.addEventListener("click", () => showScreen("screen-settings"));

  backButtons.forEach(btn => {
    btn.addEventListener("click", () => showScreen(btn.dataset.target));
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

  if (toggleSound) {
    toggleSound.addEventListener("change", (e) => {
      gameSettings.soundEnabled = e.target.checked;
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
        alert("Progress and mistake history reset successfully!");
      }
    });
  }

  // --- Dynamic State Selector UI ---
  function renderStateListUI() {
    if (!stateListContainer) return;

    stateListContainer.innerHTML = "";

    Object.keys(stateData).forEach(stateKey => {
      const state = stateData[stateKey];
      const isCompleted = completedStates.includes(stateKey);
      const isSelected = activeStateKeys.includes(stateKey);

      const stateRow = document.createElement("div");
      stateRow.className = `state-row ${isSelected ? 'selected' : ''} ${isCompleted ? 'completed' : ''}`;
      stateRow.id = `state-${stateKey}`;
      stateRow.setAttribute("tabindex", "0");
      stateRow.setAttribute("role", "button");
      stateRow.setAttribute("aria-pressed", isSelected);

      stateRow.innerHTML = `
        <span class="state-name">${state.name}</span>
        ${isCompleted ? '<span class="completed-tag">✓ COMPLETED</span>' : `<span class="state-count">${state.counties.length} counties</span>`}
      `;

      const selectState = () => {
        activeStateKeys = [stateKey];
        document.querySelectorAll(".state-row").forEach(r => {
          r.classList.remove("selected");
          r.setAttribute("aria-pressed", "false");
        });
        stateRow.classList.add("selected");
        stateRow.setAttribute("aria-pressed", "true");

        renderCountyCheckboxes();
        if (countyPanel) countyPanel.classList.remove("hidden");
        updateSetupPlayButton();
        switchVisibleSvgMap();
      };

      stateRow.addEventListener("click", selectState);
      stateRow.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          selectState();
        }
      });

      stateListContainer.appendChild(stateRow);
    });
  }

  function switchVisibleSvgMap() {
    svgMaps.forEach(map => {
      map.style.display = "none";
      map.classList.add("hidden");
    });

    activeStateKeys.forEach(key => {
      const targetSvg = document.getElementById(stateData[key]?.svgId);
      if (targetSvg) {
        targetSvg.style.display = "block";
        targetSvg.classList.remove("hidden");
      }
    });
  }

  // --- State & County Setup Logic ---
  function renderCountyCheckboxes() {
    if (!checkboxContainer) return;

    const activeCounties = [...getActiveCountiesPool()].sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    const existingLabels = checkboxContainer.querySelectorAll("label");
    existingLabels.forEach(label => label.remove());

    activeCounties.forEach(c => {
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

    document.querySelectorAll(".county-checkbox").forEach(cb => {
      cb.addEventListener("change", updateSetupPlayButton);
    });
  }

  function getActiveCountiesPool() {
    return activeStateKeys.flatMap(key => (stateData[key] ? stateData[key].counties : []));
  }

  radioSpecific.forEach(radio => {
    radio.addEventListener("change", (e) => {
      const countyCheckboxes = document.querySelectorAll(".county-checkbox");
      if (e.target.value === "yes") {
        if (checkboxContainer) checkboxContainer.classList.remove("hidden");

        let suggestedCount = 0;
        countyCheckboxes.forEach(cb => {
          const mistakeCount = countyMistakes[cb.value] || 0;
          if (mistakeCount > 0) {
            cb.checked = true;
            suggestedCount++;
          } else {
            cb.checked = false;
          }
        });

        if (suggestionBox) {
          if (suggestedCount > 0) {
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
      document.querySelectorAll(".county-checkbox").forEach(cb => {
        cb.checked = (countyMistakes[cb.value] || 0) > 0;
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

    if (modalSummary) modalSummary.classList.add("hidden");
    if (admireBar) admireBar.classList.add("hidden");
    if (feedbackEl) {
      feedbackEl.textContent = "";
      feedbackEl.className = "feedback-message";
    }

    countyPaths.forEach(path => {
      path.classList.remove("correct", "wrong", "flash-correct", "found");
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
      targetPrompt.innerHTML = `Find: <strong>${currentTarget.name}</strong>`;
    }
  }

  function handleCountyClick(pathEl) {
    if (!isGameActive || !currentTarget) return;

    const clickedId = pathEl.id;
    const clickedName = pathEl.getAttribute("data-name") || pathEl.id;

    if (clickedId === currentTarget.id) {
      scoreRight++;
      playSound("correct");

      if (feedbackEl) {
        feedbackEl.textContent = `Correct! That's ${currentTarget.name}.`;
        feedbackEl.className = "feedback-message success";
      }

      if (selectedMode === "pin") {
        pathEl.classList.add("correct", "found");
        pathEl.style.pointerEvents = "none";
      } else if (selectedMode === "pin-hard") {
        pathEl.classList.add("flash-correct");
        setTimeout(() => pathEl.classList.remove("flash-correct"), 600);
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
  countyPaths.forEach(path => {
    path.addEventListener("click", (e) => {
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
      appendModalButton("Home", "btn-secondary", () => {
        modalSummary.classList.add("hidden");
        showScreen("screen-home");
      });

    } else {
      // Mistakes Flow
      const missedNames = missedArray.slice(0, 3).map(c => c.name);
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

  if (btnAdmireHome) {
    btnAdmireHome.addEventListener("click", () => {
      admireBar.classList.add("hidden");
      showScreen("screen-home");
    });
  }
});