const counties = [
  { id: "new-castle", name: "New Castle" },
  { id: "kent", name: "Kent" },
  { id: "sussex", name: "Sussex" }
];

let remainingCounties = [];
let currentTarget = null;
let scoreRight = 0;
let scoreWrong = 0;
let isGameActive = false;

// DOM Elements
const targetPrompt = document.getElementById("target-prompt");
const feedbackEl = document.getElementById("feedback");
const scoreRightEl = document.getElementById("score-right");
const scoreWrongEl = document.getElementById("score-wrong");
const modeSelect = document.getElementById("mode-select");
const restartBtn = document.getElementById("restart-btn");
const countyPaths = document.querySelectorAll(".county");

function initGame() {
  remainingCounties = [...counties];
  scoreRight = 0;
  scoreWrong = 0;
  isGameActive = true;
  
  scoreRightEl.textContent = "0";
  scoreWrongEl.textContent = "0";
  feedbackEl.textContent = "";

  countyPaths.forEach(path => {
    path.classList.remove("correct", "wrong", "flash-correct");
  });

  pickNextTarget();
}

function pickNextTarget() {
  if (remainingCounties.length === 0) {
    isGameActive = false;
    targetPrompt.textContent = "🎉 Quiz Complete!";
    feedbackEl.textContent = "Great job! Click Restart to play again.";
    feedbackEl.style.color = "#1b5e20";
    return;
  }

  const randomIndex = Math.floor(Math.random() * remainingCounties.length);
  currentTarget = remainingCounties[randomIndex];
  targetPrompt.textContent = `Click: ${currentTarget.name}`;
}

function handleCountyClick(e) {
  if (!isGameActive) return;

  const clickedId = e.target.id;
  const mode = modeSelect.value;

  if (clickedId === currentTarget.id) {
    // Correct Choice
    scoreRight++;
    scoreRightEl.textContent = scoreRight;
    feedbackEl.textContent = "Correct!";
    feedbackEl.style.color = "#1b5e20";

    if (mode === "pin") {
      e.target.classList.add("correct");
    } else if (mode === "pin-hard") {
      e.target.classList.add("flash-correct");
      setTimeout(() => e.target.classList.remove("flash-correct"), 600);
    }

    // Remove solved county from queue & advance
    remainingCounties = remainingCounties.filter(c => c.id !== currentTarget.id);
    pickNextTarget();

  } else {
    // Incorrect Choice
    scoreWrong++;
    scoreWrongEl.textContent = scoreWrong;
    feedbackEl.textContent = "Try again!";
    feedbackEl.style.color = "#1a237e";

    e.target.classList.add("wrong");
    setTimeout(() => e.target.classList.remove("wrong"), 500);
  }
}

// Event Listeners
countyPaths.forEach(path => path.addEventListener("click", handleCountyClick));
restartBtn.addEventListener("click", initGame);
modeSelect.addEventListener("change", initGame);

// Start game on load
initGame();