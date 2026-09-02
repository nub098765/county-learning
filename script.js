document.addEventListener("DOMContentLoaded", () => {
  // --- STATE & DATA SETUP ---
  const STATE_DATA = {
    delaware: {
      name: "Delaware",
      svgId: "map-delaware",
      counties: ["New Castle", "Kent", "Sussex"]
    },
    rhode_island: {
      name: "Rhode Island",
      svgId: "map-rhode_island",
      counties: ["Bristol", "Kent", "Newport", "Providence", "Washington"]
    }
  };

  // --- APP STATE ---
  let selectedStateKey = "delaware";
  let gameMode = "pin"; // "pin" or "pin-hard"
  let selectedCounties = []; // list of target county names for the game
  let remainingCounties = [];
  let currentTarget = null;
  let totalGameCount = 0;
  let correctCount = 0;
  let missedCounties = [];
  let isChecking = false;
  let previousScreenBeforeSettings = "home";

  // Persistent storage for wrong guesses across sessions
  let struggleData = JSON.parse(localStorage.getItem("county_struggles") || "{}");

  // --- DOM ELEMENTS ---
  const screens = {
    home: document.getElementById("screen-home"),
    settings: document.getElementById("screen-settings"),
    modes: document.getElementById("screen-modes"),
    setup: document.getElementById("screen-setup"),
    game: document.getElementById("screen-game")
  };

  const toggleDark = document.getElementById("toggle-dark");
  const toggleContrast = document.getElementById("toggle-contrast");
  const btnResetProgress = document.getElementById("btn-reset-progress");

  const stateRows = document.querySelectorAll(".state-row:not(.disabled)");
  const countyOptionsPanel = document.getElementById("county-options-panel");
  const checkboxContainer = document.getElementById("checkbox-container");
  const suggestionBox = document.getElementById("suggestion-box");
  const btnSelectSuggested = document.getElementById("btn-select-suggested");
  const specificRadios = document.querySelectorAll('input[name="specific-counties"]');
  const btnStartGame = document.getElementById("btn-start-game");

  const targetPrompt = document.getElementById("target-prompt");
  const feedback = document.getElementById("feedback");
  const stateMaps = document.querySelectorAll(".state-map");

  const modalSummary = document.getElementById("modal-summary");
  const summaryGradeTitle = document.getElementById("summary-grade-title");
  const summaryPercentage = document.getElementById("summary-percentage");
  const summaryMessage = document.getElementById("summary-message");
  const btnModalAdmire = document.getElementById("btn-modal-admire");
  const btnModalRetry = document.getElementById("btn-modal-retry");
  const btnModalReplay = document.getElementById("btn-modal-replay");
  const btnModalSettings = document.getElementById("btn-modal-settings");
  const btnModalHome = document.getElementById("btn-modal-home");

  const admireBar = document.getElementById("admire-bar");
  const admirePercentage = document.getElementById("admire-percentage");
  const btnAdmireRetry = document.getElementById("btn-admire-retry");
  const btnAdmireReplay = document.getElementById("btn-admire-replay");
  const btnAdmireSettings = document.getElementById("btn-admire-settings");
  const btnAdmireHome = document.getElementById("btn-admire-home");

  const btnGameSettings = document.getElementById("btn-game-settings");

  // --- NAVIGATION FUNCTIONS ---
  function showScreen(screenKey) {
    Object.values(screens).forEach(screen => screen.classList.remove("active"));
    if (screens[screenKey]) {
      screens[screenKey].classList.add("active");
    }
  }

  function openSettings(fromScreen) {
    previousScreenBeforeSettings = fromScreen;
    showScreen("settings");
  }

  // Handle generic back buttons
  document.querySelectorAll(".btn-back").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.target.replace("screen-", "");
      // Return to previous screen if coming back from settings
      if (screens.settings.classList.contains("active") && previousScreenBeforeSettings) {
        showScreen(previousScreenBeforeSettings);
      } else {
        showScreen(target);
      }
    });
  });

  document.getElementById("btn-goto-modes").addEventListener("click", () => showScreen("modes"));
  document.getElementById("btn-goto-settings").addEventListener("click", () => openSettings("home"));

  // Mode Selection
  document.querySelectorAll(".btn-mode").forEach(btn => {
    btn.addEventListener("click", () => {
      gameMode = btn.dataset.mode;
      showScreen("setup");
    });
  });

  // --- SETTINGS CONTROLS ---
  toggleDark.addEventListener("change", (e) => {
    document.body.classList.toggle("dark-mode", e.target.checked);
  });

  toggleContrast.addEventListener("change", (e) => {
    document.body.classList.toggle("high-contrast", e.target.checked);
  });

  btnResetProgress.addEventListener("click", () => {
    if (confirm("Are you sure you want to reset your saved progress and struggle history?")) {
      struggleData = {};
      localStorage.removeItem("county_struggles");
      alert("Progress reset!");
      if (screens.setup.classList.contains("active")) {
        renderCountyCheckboxes();
      }
    }
  });

  // --- SETUP & STATE SELECTION ---
  stateRows.forEach(row => {
    row.addEventListener("click", () => {
      stateRows.forEach(r => r.classList.remove("selected"));
      row.classList.add("selected");
      selectedStateKey = row.dataset.state;

      // Reset radio toggle to "No"
      document.querySelector('input[name="specific-counties"][value="no"]').checked = true;
      checkboxContainer.classList.add("hidden");

      renderCountyCheckboxes();
      countyOptionsPanel.classList.remove("hidden");
      btnStartGame.classList.remove("hidden");
    });
  });

  // Specific counties radio handler
  specificRadios.forEach(radio => {
    radio.addEventListener("change", (e) => {
      if (e.target.value === "yes") {
        checkboxContainer.classList.remove("hidden");
      } else {
        checkboxContainer.classList.add("hidden");
      }
    });
  });

  // Render Checkboxes dynamically for selected state
  function renderCountyCheckboxes() {
    const counties = STATE_DATA[selectedStateKey].counties;
    
    // Clear dynamic checkboxes (preserve suggestion box)
    const existingLabels = checkboxContainer.querySelectorAll(".dynamic-county-label");
    existingLabels.forEach(el => el.remove());

    const hasStruggles = counties.some(c => (struggleData[`${selectedStateKey}_${c}`] || 0) > 0);
    if (hasStruggles) {
      suggestionBox.classList.remove("hidden");
    } else {
      suggestionBox.classList.add("hidden");
    }

    counties.forEach(county => {
      const label = document.createElement("label");
      label.className = "dynamic-county-label";
      
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = county;
      checkbox.className = "county-checkbox";

      label.appendChild(checkbox);
      label.appendChild(document.createTextNode(` ${county}`));
      checkboxContainer.appendChild(label);
    });
  }

  // Handle "Select suggested" button
  btnSelectSuggested.addEventListener("click", () => {
    const checkboxes = checkboxContainer.querySelectorAll(".county-checkbox");
    checkboxes.forEach(cb => {
      const key = `${selectedStateKey}_${cb.value}`;
      cb.checked = (struggleData[key] || 0) > 0;
    });
  });

  // --- GAME LOGIC ---
  btnStartGame.addEventListener("click", () => {
    const isSpecific = document.querySelector('input[name="specific-counties"]:checked').value === "yes";
    const stateCounties = STATE_DATA[selectedStateKey].counties;

    if (isSpecific) {
      const checkedBoxes = checkboxContainer.querySelectorAll(".county-checkbox:checked");
      selectedCounties = Array.from(checkedBoxes).map(cb => cb.value);
      if (selectedCounties.length === 0) {
        alert("Please select at least one county to play!");
        return;
      }
    } else {
      selectedCounties = [...stateCounties];
    }

    initGame();
  });

  function initGame() {
    remainingCounties = [...selectedCounties];
    totalGameCount = selectedCounties.length;
    correctCount = 0;
    missedCounties = [];
    isChecking = false;

    // Show correct SVG map
    stateMaps.forEach(map => map.classList.add("hidden"));
    const activeMap = document.getElementById(STATE_DATA[selectedStateKey].svgId);
    activeMap.classList.remove("hidden");

    // Clean SVG paths
    const paths = activeMap.querySelectorAll(".county");
    paths.forEach(path => {
      path.classList.remove("found", "flash-correct", "flash-wrong");
    });

    // Attach path click listeners
    paths.forEach(path => {
      path.removeEventListener("click", handleCountyClick);
      path.addEventListener("click", handleCountyClick);
    });

    modalSummary.classList.add("hidden");
    admireBar.classList.add("hidden");
    showScreen("game");

    nextTurn();
  }

  function nextTurn() {
    if (remainingCounties.length === 0) {
      endGame();
      return;
    }

    // Pick random target
    const randomIndex = Math.floor(Math.random() * remainingCounties.length);
    currentTarget = remainingCounties[randomIndex];

    targetPrompt.textContent = `Find: ${currentTarget}`;
    feedback.textContent = "";
    feedback.className = "";
  }

  function handleCountyClick(e) {
    if (isChecking || !currentTarget) return;

    const clickedPath = e.currentTarget;
    const clickedName = clickedPath.getAttribute("data-name");

    if (clickedPath.classList.contains("found") && gameMode === "pin") return;

    isChecking = true;

    if (clickedName === currentTarget) {
      correctCount++;
      feedback.textContent = "Correct!";
      feedback.className = "feedback-correct";

      if (gameMode === "pin") {
        clickedPath.classList.add("found");
      } else {
        clickedPath.classList.add("flash-correct");
        setTimeout(() => clickedPath.classList.remove("flash-correct"), 800);
      }

      remainingCounties = remainingCounties.filter(c => c !== currentTarget);

      setTimeout(() => {
        isChecking = false;
        nextTurn();
      }, 700);

    } else {
      if (!missedCounties.includes(currentTarget)) {
        missedCounties.push(currentTarget);
      }

      const key = `${selectedStateKey}_${currentTarget}`;
      struggleData[key] = (struggleData[key] || 0) + 1;
      localStorage.setItem("county_struggles", JSON.stringify(struggleData));

      feedback.textContent = `Oops! That's ${clickedName}`;
      feedback.className = "feedback-wrong";

      clickedPath.classList.add("flash-wrong");
      setTimeout(() => {
        clickedPath.classList.remove("flash-wrong");
        isChecking = false;
      }, 800);
    }
  }

  // --- END GAME & MODALS ---
  function endGame() {
    currentTarget = null;
    const scorePct = Math.round((correctCount / totalGameCount) * 100) || 0;

    summaryPercentage.textContent = `${scorePct}%`;
    admirePercentage.textContent = `${scorePct}%`;

    if (scorePct === 100) {
      summaryGradeTitle.textContent = "Perfect Score!";
      summaryMessage.textContent = "You've mastered all selected counties!";
    } else if (scorePct >= 70) {
      summaryGradeTitle.textContent = "Great job!";
      summaryMessage.textContent = "You're building solid state geography knowledge!";
    } else {
      summaryGradeTitle.textContent = "Keep Practicing!";
      summaryMessage.textContent = "Review missed counties to improve your score next time.";
    }

    if (missedCounties.length > 0) {
      btnModalRetry.classList.remove("hidden");
      btnAdmireRetry.classList.remove("hidden");
    } else {
      btnModalRetry.classList.add("hidden");
      btnAdmireRetry.classList.add("hidden");
    }

    modalSummary.classList.remove("hidden");
  }

  function retryMissed() {
    selectedCounties = [...missedCounties];
    initGame();
  }

  // Navigation handlers for modals and gameplay settings
  btnGameSettings.addEventListener("click", () => openSettings("game"));
  btnModalSettings.addEventListener("click", () => openSettings("game"));
  btnAdmireSettings.addEventListener("click", () => openSettings("game"));

  btnModalRetry.addEventListener("click", retryMissed);
  btnAdmireRetry.addEventListener("click", retryMissed);

  btnModalReplay.addEventListener("click", initGame);
  btnAdmireReplay.addEventListener("click", initGame);

  btnModalHome.addEventListener("click", () => {
    modalSummary.classList.add("hidden");
    showScreen("home");
  });

  btnAdmireHome.addEventListener("click", () => {
    admireBar.classList.add("hidden");
    showScreen("home");
  });

  btnModalAdmire.addEventListener("click", () => {
    modalSummary.classList.add("hidden");
    admireBar.classList.remove("hidden");
  });

  document.getElementById("btn-quit-game").addEventListener("click", () => {
    if (confirm("Are you sure you want to quit this game?")) {
      showScreen("home");
    }
  });
});