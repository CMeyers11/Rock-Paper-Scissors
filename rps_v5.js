// ---------- DOM references ----------
const choicesDiv   = document.querySelector("#user_choice");
const outputBlock  = document.querySelector("#output");
const resultText   = document.querySelector("#result_text");

// ---------- Game state ----------
const BEST_OF = 5;

const state = {
  gameNumber: 0,
  userScore: 0,
  compScore: 0,
  seriesOver: false,
};

// ---------- UI elements created once ----------
const gameLog        = document.createElement("ol");
const scoreCard      = document.createElement("div");
const compScoreDiv   = document.createElement("div");
const userScoreDiv   = document.createElement("div");
const seriesMessage  = document.createElement("div");
const resetButton    = document.createElement("button");

// ---------- Initial setup ----------
function initUI() {
  // Game log
  outputBlock.appendChild(gameLog);

  // Score card styling + structure
  scoreCard.style.color = "white";
  scoreCard.style.background = "black";
  scoreCard.style.display = "flex";
  scoreCard.style.flexDirection = "column";
  scoreCard.style.padding = "0.5rem";
  scoreCard.style.marginTop = "0.5rem";

  scoreCard.appendChild(compScoreDiv);
  scoreCard.appendChild(userScoreDiv);
  outputBlock.appendChild(scoreCard);

  // Initial score text
  updateScoreUI();

  // Series message
  seriesMessage.style.marginTop = "0.5rem";
  outputBlock.appendChild(seriesMessage);

  // Reset button
  resetButton.textContent = "Reset game";
  resetButton.style.marginTop = "0.5rem";
  outputBlock.appendChild(resetButton);
}

function updateScoreUI() {
  compScoreDiv.textContent = `Computer: ${state.compScore}`;
  userScoreDiv.textContent = `User: ${state.userScore}`;
}

// ---------- Core game logic ----------
function getComputerChoice() {
  const r = Math.random();
  if (r <= 1 / 3) return "Rock";
  if (r <= 2 / 3) return "Paper";
  return "Scissors";
}

// outcome is "win" | "loss" | "tie"
function playRound(userChoice) {
  const compChoice = getComputerChoice();

  let outcome;
  if (userChoice === compChoice) {
    outcome = "tie";
  } else if (
    (userChoice === "Rock"     && compChoice === "Scissors") ||
    (userChoice === "Paper"    && compChoice === "Rock")     ||
    (userChoice === "Scissors" && compChoice === "Paper")
  ) {
    outcome = "win";
  } else {
    outcome = "loss";
  }

  return { userChoice, compChoice, outcome };
}

function applyRoundResult({ compChoice, outcome }) {
  if (outcome === "win") {
    state.userScore += 1;
  } else if (outcome === "loss") {
    state.compScore += 1;
  }
  state.gameNumber += 1;

  updateScoreUI();

  if (Math.max(state.userScore, state.compScore) === BEST_OF) {
    state.seriesOver = true;
    showSeriesResult();
    disableChoiceButtons(true);
    resetButton.textContent = "Play again";
  }
}

function outcomeToText(outcome) {
  if (outcome === "win")  return "You Win!";
  if (outcome === "loss") return "You Lose!";
  return "Tie!";
}

function showSeriesResult() {
  if (state.userScore > state.compScore) {
    seriesMessage.textContent =
      `You win the series ${state.userScore}:${state.compScore}!`;
  } else if (state.compScore > state.userScore) {
    seriesMessage.textContent =
      `You lose the series ${state.compScore}:${state.userScore}.`;
  } else {
    seriesMessage.textContent = "The series is a tie.";
  }
}

// ---------- Event handlers ----------
function onChoiceClick(event) {
  if (!event.target.matches("button.choice")) return;
  if (state.seriesOver) return; // ignore clicks after series ends

  const userChoice = event.target.textContent;
  const { userChoice: u, compChoice, outcome } = playRound(userChoice);

  const resultStr = outcomeToText(outcome);

  // Update main result line
  resultText.textContent =
    `You chose ${u}. Computer chose ${compChoice}. ${resultStr}`;

  // Log this game
  const li = document.createElement("li");
  li.textContent =
    `Game ${state.gameNumber + 1}: You chose ${u}, computer chose ${compChoice}. ${resultStr}`;
  gameLog.appendChild(li);

  // Update scores and maybe finish series
  applyRoundResult({ compChoice, outcome });
}

function disableChoiceButtons(disabled) {
  choicesDiv.querySelectorAll("button.choice").forEach(btn => {
    btn.disabled = disabled;
  });
}

function resetGame() {
  // Reset state
  state.gameNumber  = 0;
  state.userScore   = 0;
  state.compScore   = 0;
  state.seriesOver  = false;

  // Clear UI
  gameLog.innerHTML       = "";
  resultText.textContent  = "";
  seriesMessage.textContent = "";
  updateScoreUI();
  disableChoiceButtons(false);
  resetButton.textContent = "Reset game";
}

// ---------- Wire everything up ----------
initUI();
choicesDiv.addEventListener("click", onChoiceClick);
resetButton.addEventListener("click", resetGame);
