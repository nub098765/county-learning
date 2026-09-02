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
  // Additional states (e.g. maryland, hawaii) fit directly into this object structure
};

// Game Configuration & State
let selectedMode = "pin";
let activeStateKeys = ["delaware"]; // Array of currently selected state keys
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

// DOM Elements
const screens = document.querySelectorAll(".screen");
const btnGotoModes = document.getElementById("btn-goto-modes");
const btnGotoSettings = document.getElementById("btn-goto-settings");
const backButtons = document.querySelectorAll(".btn-back");
const modeButtons = document.querySelectorAll(".btn-mode");

const countyPanel = document.getElementById("county-options-panel");
const radioSpecific = document.querySelectorAll('input[name="specific-counties"]');
const checkboxContainer = document.getElementById("checkbox-container");
const btnStartGame = document.getElementById("btn-start-game");

const suggestionBox = document.getElementById("suggestion-box");
const btnSelectSuggested = document.getElementById("btn-select-suggested");

const toggleDark = document.getElementById("toggle-dark");
const toggleContrast = document.getElementById("toggle-contrast");
const btnResetProgress = document.getElementById("btn-reset-progress");

const targetPrompt = document.getElementById("target-prompt");
const feedbackEl = document.getElementById("feedback");
const scoreRightEl = document.getElementById("score-right");
const scoreWrongEl = document.getElementById("score-wrong");
const btnQuitGame = document.getElementById("btn-quit-game");
const countyPaths = document.querySelectorAll(".county");

// Modal Elements
const modalSummary = document.getElementById("modal-summary");
const summaryPercentage = document.getElementById("summary-percentage");
const summaryGradeTitle = document.getElementById("summary-grade-title");
const summaryMessage = document.getElementById("summary-message");
const btnModalYes = document.getElementById("btn-modal-action-yes");
const btnModalNo = document.getElementById("btn-modal-action-no");

// Initialization
updateStateListUI();

function showScreen(screenId) {
  screens.forEach(s => s.classList.remove("active"));
  document.getElementById(screenId).classList.add("active");
}

btnGotoModes.addEventListener("click", () => showScreen("screen-modes"));
btnGotoSettings.addEventListener("click", () => showScreen("screen-settings"));

backButtons.forEach(btn => {
  btn.addEventListener("click", () => showScreen(btn.dataset.target));
});

modeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    selectedMode = btn.dataset.mode;
    showScreen("screen-setup");
  });
});

toggleDark.addEventListener("change", (e) => {
  document.body.classList.toggle("dark-mode", e.target.checked);
});

toggleContrast.addEventListener("change", (e) => {
  document.body.classList.toggle("high-contrast", e.target.checked);
});

// Reset Saved Progress
btnResetProgress.addEventListener("click", () => {
  completedStates = [];
  countyMistakes = {};
  localStorage.removeItem("completedStates");
  localStorage.removeItem("countyMistakes");
  updateStateListUI();
  alert("Progress and mistake history reset!");
});

// State Selection (Supports Single or Multi-State Selection)
document.getElementById("state-delaware").addEventListener("click", () => {
  activeStateKeys = ["delaware"];
  renderCountyCheckboxes();
  countyPanel.classList.remove("hidden");
  updateSetupPlayButton();
});

// Helper: Dynamically Render Checkboxes for Active States
function renderCountyCheckboxes() {
  const activeCounties = activeStateKeys.flatMap(key => stateData[key].counties);
  
  checkboxContainer.innerHTML = activeCounties.map(c => `
    <label>
      <input type="checkbox" class="county-checkbox" value="${c.id}" data-state="${c.stateKey}"> ${c.name}
    </label>
  `).join('');

  document.querySelectorAll(".county-checkbox").forEach(cb => {
    cb.addEventListener("change", updateSetupPlayButton);
  });
}

// Helper: Get all county objects belonging to active states
function getActiveCountiesPool() {
  return activeStateKeys.flatMap(key => stateData[key].counties);
}

// Handle "Specific Counties" Selection & Auto-Suggestions
radioSpecific.forEach(radio => {
  radio.addEventListener("change", (e) => {
    const countyCheckboxes = document.querySelectorAll(".county-checkbox");
    if (e.target.value === "yes") {
      checkboxContainer.classList.remove("hidden");
      
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

      if (suggestedCount > 0) {
        suggestionBox.classList.remove("hidden");
      } else {
        suggestionBox.classList.add("hidden");
      }

    } else {
      checkboxContainer.classList.add("hidden");
      suggestionBox.classList.add("hidden");
      countyCheckboxes.forEach(cb => cb.checked = false);
    }
    updateSetupPlayButton();
  });
});

btnSelectSuggested.addEventListener("click", () => {
  document.querySelectorAll(".county-checkbox").forEach(cb => {
    cb.checked = (countyMistakes[cb.value] || 0) > 0;
  });
  updateSetupPlayButton();
});

function updateSetupPlayButton() {
  const isSpecificYes = document.querySelector('input[name="specific-counties"]:checked').value === "yes";
  if (!isSpecificYes || document.querySelectorAll(".county-checkbox:checked").length >= 1) {
    btnStartGame.classList.remove("hidden");
  } else {
    btnStartGame.classList.add("hidden");
  }
}

btnStartGame.addEventListener("click", () => {
  const isSpecificYes = document.querySelector('input[name="specific-counties"]:checked').value === "yes";
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

btnQuitGame.addEventListener("click", () => {
  isGameActive = false;
  showScreen("screen-home");
});

// Game Quiz Logic
function initGame(countiesToPlay) {
  targetPool = [...countiesToPlay];
  scoreRight = 0;
  scoreWrong = 0;
  isGameActive = true;
  missedCounties.clear();

  scoreRightEl.textContent = "0";
  scoreWrongEl.textContent = "0";
  feedbackEl.textContent = "";

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
  
  // Display only the target county name
  targetPrompt.textContent = currentTarget.name;
}

// Interactive Map Click Handler (Any map path triggers a guess response)
countyPaths.forEach(path => {
  path.addEventListener("click", (e) => {
    if (!isGameActive) return;

    const clickedId = e.target.id;

    if (clickedId === currentTarget.id) {
      scoreRight++;
      scoreRightEl.textContent = scoreRight;
      feedbackEl.textContent = "Correct!";
      feedbackEl.style.color = "#2d5a27";

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
      scoreWrongEl.textContent = scoreWrong;
      feedbackEl.textContent = "Try again!";
      feedbackEl.style.color = "#6b2d5c";
      
      // Track session missed county
      missedCounties.add(currentTarget);

      // Save persistent mistakes in localStorage
      countyMistakes[currentTarget.id] = (countyMistakes[currentTarget.id] || 0) + 1;
      localStorage.setItem("countyMistakes", JSON.stringify(countyMistakes));

      e.target.classList.add("wrong");
      setTimeout(() => e.target.classList.remove("wrong"), 500);
    }
  });
});

// End-Game Summary Modal Logic (Generic Multi-State Support)
function showSummaryModal() {
  const totalAttempts = scoreRight + scoreWrong;
  const accuracy = totalAttempts > 0 ? Math.round((scoreRight / totalAttempts) * 100) : 0;
  
  summaryPercentage.textContent = `${accuracy}%`;

  if (accuracy === 100) summaryGradeTitle.textContent = "Good job!";
  else if (accuracy >= 75) summaryGradeTitle.textContent = "Not bad.";
  else if (accuracy >= 50) summaryGradeTitle.textContent = "You could work on that.";
  else summaryGradeTitle.textContent = "Oof.";

  const missedArray = Array.from(missedCounties);

  if (missedArray.length === 0) {
    // Determine dynamic message grammar based on active states count
    const activeStateNames = activeStateKeys.map(key => stateData[key].name);
    
    if (activeStateNames.length === 1) {
      summaryMessage.textContent = `You've learned all the counties in ${activeStateNames[0]}! Good job!`;
    } else if (activeStateNames.length === 2) {
      summaryMessage.textContent = `You've learned all the counties in ${activeStateNames[0]} and ${activeStateNames[1]}! Good job!`;
    } else {
      summaryMessage.textContent = `You've learned all the counties across ${activeStateNames.length} states! Good job!`;
    }

    // Award state completion badges if all counties for a state were played and cleared
    activeStateKeys.forEach(stateKey => {
      const totalStateCounties = stateData[stateKey].counties.length;
      const playedStateCounties = selectedCounties.filter(c => c.stateKey === stateKey).length;

      if (playedStateCounties === totalStateCounties && !completedStates.includes(stateKey)) {
        completedStates.push(stateKey);
      }
    });

    localStorage.setItem("completedStates", JSON.stringify(completedStates));
    updateStateListUI();

    btnModalYes.textContent = "Home";
    btnModalNo.classList.add("hidden");

    btnModalYes.onclick = () => {
      modalSummary.classList.add("hidden");
      showScreen("screen-home");
    };
  } else {
    const missedNames = missedArray.slice(0, 3).map(c => c.name);
    let formattedMissed = "";
    if (missedNames.length === 1) formattedMissed = missedNames[0];
    else if (missedNames.length === 2) formattedMissed = `${missedNames[0]} and ${missedNames[1]}`;
    else formattedMissed = `${missedNames[0]}, ${missedNames[1]}, and ${missedNames[2]}`;

    summaryMessage.textContent = `You should probably work on ${formattedMissed}. Would you like to?`;
    
    btnModalYes.textContent = "Yes";
    btnModalNo.textContent = "No";
    btnModalNo.classList.remove("hidden");

    btnModalYes.onclick = () => {
      modalSummary.classList.add("hidden");
      initGame(missedArray);
    };

    btnModalNo.onclick = () => {
      modalSummary.classList.add("hidden");
      showScreen("screen-home");
    };
  }

  modalSummary.classList.remove("hidden");
}

function updateStateListUI() {
  // Generic update loop across all states registered in stateData
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
        <span class="state-count">${state.counties.length} Counties</span>
      `;
    }
  });
}