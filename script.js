document.addEventListener('DOMContentLoaded', () => {
  // Data Registry for States and Counties
  const stateData = {
    delaware: {
      name: "Delaware",
      counties: [
        { id: "new-castle", name: "New Castle", stateKey: "delaware" },
        { id: "kent", name: "Kent", stateKey: "delaware" },
        { id: "sussex", name: "Sussex", stateKey: "delaware" }
      ]
    }
  };

  // Game Configuration & State Variables
  let selectedMode = "pin";
  let activeStateKeys = ["delaware"];
  let selectedCounties = [];
  let targetPool = [];
  let currentTarget = null;
  let scoreRight = 0;
  let scoreWrong = 0;
  let isGameActive = false;
  let missedCounties = new Set();

  // Persistent Data Storage
  let completedStates = JSON.parse(localStorage.getItem("completedStates")) || [];
  let countyMistakes = JSON.parse(localStorage.getItem("countyMistakes")) || {};

  // Navigation & Screen DOM Elements
  const screens = document.querySelectorAll(".screen");
  const btnGotoModes = document.getElementById("btn-goto-modes");
  const btnGotoSettings = document.getElementById("btn-goto-settings");
  const backButtons = document.querySelectorAll(".btn-back");
  const modeButtons = document.querySelectorAll(".btn-mode");

  // Setup Screen DOM Elements
  const countyPanel = document.getElementById("county-options-panel");
  const radioSpecific = document.querySelectorAll('input[name="specific-counties"]');
  const checkboxContainer = document.getElementById("checkbox-container");
  const btnStartGame = document.getElementById("btn-start-game");
  const suggestionBox = document.getElementById("suggestion-box");
  const btnSelectSuggested = document.getElementById("btn-select-suggested");

  // Settings DOM Elements
  const toggleDark = document.getElementById("toggle-dark");
  const toggleContrast = document.getElementById("toggle-contrast");
  const btnResetProgress = document.getElementById("btn-reset-progress");

  // Game Screen DOM Elements
  const targetPrompt = document.getElementById("target-prompt");
  const feedbackEl = document.getElementById("feedback");
  const btnQuitGame = document.getElementById("btn-quit-game");
  const btnNewGame = document.getElementById("btn-new-game");
  const countyPaths = document.querySelectorAll(".county");

  // Modal Summary DOM Elements
  const modalSummary = document.getElementById("modal-summary");
  const summaryPercentage = document.getElementById("summary-percentage");
  const summaryGradeTitle = document.getElementById("summary-grade-title");
  const summaryMessage = document.getElementById("summary-message");
  const modalActions = document.querySelector(".modal-actions");

  // Bottom Admire Bar DOM Elements
  const admireBar = document.getElementById("admire-bar");
  const admirePercentage = document.getElementById("admire-percentage");
  const admireText = document.getElementById("admire-text");
  const btnAdmireRetry = document.getElementById("btn-admire-retry");
  const btnAdmireReplay = document.getElementById("btn-admire-replay");
  const btnAdmireHome = document.getElementById("btn-admire-home");

  // --- Theme Initialization & System Preference Sync ---
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)");

  function initTheme() {
    if (toggleDark) {
      if (systemPrefersDark.matches) {
        toggleDark.checked = true;
        document.body.classList.add("dark-mode");
      } else {
        toggleDark.checked = false;
        document.body.classList.remove("dark-mode");
      }
    }
  }

  initTheme();
  updateStateListUI();

  if (systemPrefersDark) {
    systemPrefersDark.addEventListener("change", (e) => {
      if (toggleDark) toggleDark.checked = e.matches;
      document.body.classList.toggle("dark-mode", e.matches);
    });
  }

  // --- Screen Navigation ---
  function showScreen(screenId) {
    screens.forEach(s => s.classList.remove("active"));
    const activeScreen = document.getElementById(screenId);
    if (activeScreen) activeScreen.classList.add("active");
  }

  if (btnGotoModes) btnGotoModes.addEventListener("click", () => showScreen("screen-modes"));
  if (btnGotoSettings) btnGotoSettings.addEventListener("click", () => showScreen("screen-settings"));

  backButtons.forEach(btn => {
    btn.addEventListener("click", () => showScreen(btn.dataset.target));
  });

  modeButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      selectedMode = btn.dataset.mode;
      showScreen("screen-setup");
    });
  });

  if (toggleDark) {
    toggleDark.addEventListener("change", (e) => {
      document.body.classList.toggle("dark-mode", e.target.checked);
    });
  }

  if (toggleContrast) {
    toggleContrast.addEventListener("change", (e) => {
      document.body.classList.toggle("high-contrast", e.target.checked);
    });
  }

  // Reset Saved Progress
  if (btnResetProgress) {
    btnResetProgress.addEventListener("click", () => {
      completedStates = [];
      countyMistakes = {};
      localStorage.removeItem("completedStates");
      localStorage.removeItem("countyMistakes");
      updateStateListUI();
      alert("Progress and mistake history reset!");
    });
  }

  // --- State & County Setup Logic ---
  const delawareRow = document.getElementById("state-delaware");
  if (delawareRow) {
    delawareRow.addEventListener("click", () => {
      activeStateKeys = ["delaware"];
      renderCountyCheckboxes();
      if (countyPanel) countyPanel.classList.remove("hidden");
      updateSetupPlayButton();
    });
  }

  function renderCountyCheckboxes() {
    if (!checkboxContainer) return;
    const activeCounties = getActiveCountiesPool();
    
    // Retain suggested box inside container
    const existingSuggestionBox = document.getElementById("suggestion-box");
    checkboxContainer.innerHTML = '';
    if (existingSuggestionBox) checkboxContainer.appendChild(existingSuggestionBox);

    activeCounties.forEach(c => {
      const label = document.createElement("label");
      label.innerHTML = `<input type="checkbox" class="county-checkbox" value="${c.id}" data-state="${c.stateKey}"> ${c.name}`;
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
    } else {
      btnStartGame.classList.add("hidden");
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

    if (modalSummary) modalSummary.classList.add("hidden");
    if (admireBar) admireBar.classList.add("hidden");
    if (feedbackEl) feedbackEl.textContent = "";

    countyPaths.forEach(path => {
      path.classList.remove("correct", "wrong", "flash-correct");
      path.style.pointerEvents = "auto";
    });

    pickNextTarget();
  }

  function pickNextTarget() {
    if (targetPool.length === 0) {
      isGameActive = false;
      showSummaryModal();
      return;
    }

    const randomIndex = Math.floor(Math.random() * targetPool.length);
    currentTarget = targetPool[randomIndex];
    
    if (targetPrompt) targetPrompt.textContent = currentTarget.name;
  }

  // --- County Map Click Handling ---
  countyPaths.forEach(path => {
    path.addEventListener("click", (e) => {
      if (!isGameActive) return;

      const clickedId = e.target.id;
      const isHighContrast = document.body.classList.contains("high-contrast");

      if (clickedId === currentTarget.id) {
        scoreRight++;
        if (feedbackEl) {
          feedbackEl.textContent = "Correct!";
          feedbackEl.style.color = isHighContrast ? "#00ffff" : "#2d5a27";
        }

        if (selectedMode === "pin") {
          e.target.classList.add("correct");
          e.target.style.pointerEvents = "none";
        } else if (selectedMode === "pin-hard") {
          e.target.classList.add("flash-correct");
          setTimeout(() => e.target.classList.remove("flash-correct"), 600);
        }

        targetPool = targetPool.filter(c => c.id !== currentTarget.id);
        pickNextTarget();
      } else {
        scoreWrong++;
        if (feedbackEl) {
          feedbackEl.textContent = "Try again!";
          feedbackEl.style.color = isHighContrast ? "#ff0055" : "#6b2d5c";
        }
        
        missedCounties.add(currentTarget);

        // Record mistake persistent history
        countyMistakes[currentTarget.id] = (countyMistakes[currentTarget.id] || 0) + 1;
        localStorage.setItem("countyMistakes", JSON.stringify(countyMistakes));

        e.target.classList.add("wrong");
        setTimeout(() => e.target.classList.remove("wrong"), 500);
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
    modalActions.innerHTML = ""; // Reset modal buttons dynamically

    if (missedArray.length === 0) {
      // Perfect Score Flow
      const activeStateNames = activeStateKeys.map(key => stateData[key].name);
      
      if (summaryMessage) {
        if (activeStateNames.length === 1) {
          summaryMessage.textContent = `You've learned all the counties in ${activeStateNames[0]}! Good job!`;
        } else if (activeStateNames.length === 2) {
          summaryMessage.textContent = `You've learned all the counties in ${activeStateNames[0]} and ${activeStateNames[1]}! Good job!`;
        } else {
          summaryMessage.textContent = `You've learned all the counties across ${activeStateNames.length} states! Good job!`;
        }
      }

      countyPaths.forEach(path => {
        path.classList.add("correct");
        path.style.pointerEvents = "none";
      });

      if (targetPrompt) targetPrompt.textContent = "Complete!";

      // Mark states completed
      activeStateKeys.forEach(stateKey => {
        const totalStateCounties = stateData[stateKey].counties.length;
        const playedStateCounties = selectedCounties.filter(c => c.stateKey === stateKey).length;

        if (playedStateCounties === totalStateCounties && !completedStates.includes(stateKey)) {
          completedStates.push(stateKey);
        }
      });

      localStorage.setItem("completedStates", JSON.stringify(completedStates));
      updateStateListUI();

      // Modal Buttons
      const admireBtn = document.createElement("button");
      admireBtn.textContent = "Admire Map";
      admireBtn.className = "btn-secondary";
      admireBtn.onclick = enableAdmireBar;
      modalActions.appendChild(admireBtn);

      const playAgainBtn = document.createElement("button");
      playAgainBtn.textContent = "Play Again";
      playAgainBtn.onclick = () => {
        modalSummary.classList.add("hidden");
        initGame(selectedCounties);
      };
      modalActions.appendChild(playAgainBtn);

      const homeBtn = document.createElement("button");
      homeBtn.textContent = "Home";
      homeBtn.className = "btn-secondary";
      homeBtn.onclick = () => {
        modalSummary.classList.add("hidden");
        showScreen("screen-home");
      };
      modalActions.appendChild(homeBtn);

    } else {
      // Mistakes Made Flow
      const missedNames = missedArray.slice(0, 3).map(c => c.name);
      let formattedMissed = "";
      if (missedNames.length === 1) formattedMissed = missedNames[0];
      else if (missedNames.length === 2) formattedMissed = `${missedNames[0]} and ${missedNames[1]}`;
      else formattedMissed = `${missedNames[0]}, ${missedNames[1]}, and ${missedNames[2]}`;

      if (summaryMessage) {
        summaryMessage.textContent = `You missed ${missedArray.length} county target${missedArray.length > 1 ? 's' : ''} (${formattedMissed}). What would you like to do?`;
      }

      // Modal Buttons
      const admireBtn = document.createElement("button");
      admireBtn.textContent = "Admire Map";
      admireBtn.className = "btn-secondary";
      admireBtn.onclick = enableAdmireBar;
      modalActions.appendChild(admireBtn);

      const retryBtn = document.createElement("button");
      retryBtn.textContent = "Retry Missed";
      retryBtn.className = "btn-primary";
      retryBtn.onclick = () => {
        modalSummary.classList.add("hidden");
        initGame(missedArray);
      };
      modalActions.appendChild(retryBtn);

      const playAgainBtn = document.createElement("button");
      playAgainBtn.textContent = "Play Again";
      playAgainBtn.className = "btn-secondary";
      playAgainBtn.onclick = () => {
        modalSummary.classList.add("hidden");
        initGame(selectedCounties);
      };
      modalActions.appendChild(playAgainBtn);

      const homeBtn = document.createElement("button");
      homeBtn.textContent = "Home";
      homeBtn.className = "btn-secondary";
      homeBtn.onclick = () => {
        modalSummary.classList.add("hidden");
        showScreen("screen-home");
      };
      modalActions.appendChild(homeBtn);
    }

    modalSummary.classList.remove("hidden");
  }

  // Activate Bottom Bar for "Admire Map"
  function enableAdmireBar() {
    modalSummary.classList.add("hidden");
    if (admirePercentage) admirePercentage.textContent = summaryPercentage.textContent;
    if (admireText) admireText.textContent = summaryMessage.textContent;

    if (missedCounties.size > 0) {
      btnAdmireRetry.classList.remove("hidden");
    } else {
      btnAdmireRetry.classList.add("hidden");
    }

    admireBar.classList.remove("hidden");
  }

  // Admire Bar Event Actions
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

  // --- UI Update Helper ---
  function updateStateListUI() {
    Object.keys(stateData).forEach(stateKey => {
      const stateRow = document.getElementById(`state-${stateKey}`);
      if (!stateRow) return;

      const state = stateData[stateKey];

      if (completedStates.includes(stateKey)) {
        stateRow.classList.add("completed");
        stateRow.innerHTML = `
          <span class="state-name">${state.name}</span>
          <span class="completed-tag">✓ COMPLETED</span>
        `;
      } else {
        stateRow.classList.remove("completed");
        stateRow.innerHTML = `
          <span class="state-name">${state.name}</span>
          <span class="state-count">${state.counties.length} counties</span>
        `;
      }
    });
  }
});