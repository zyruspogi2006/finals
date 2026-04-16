let wins = 0;
let losses = 0;
let draws = 0;
let streak = 0;
let bestStreak = 0;

const choices = ["Rock", "Paper", "Scissors"];

const imgMap = {
  Rock: "rock.jpg",
  Paper: "paper.jpg",
  Scissors: "scissors.jpg",
};

function getComputerChoice() {
  const index = Math.floor(Math.random() * choices.length);
  return choices[index];
}

function playRound(player) {
  if (!choices.includes(player)) {
    console.warn("Invalid player choice:", player);
    return;
  }

  document.querySelectorAll(".choice-btn").forEach((b) =>
    b.classList.remove("selected")
  );
  document.getElementById("btn-" + player).classList.add("selected");

  const computer = getComputerChoice();
  const result = determineResult(player, computer);

  updateStats(result);
  updateDisplay(result, player, computer);
}

function determineResult(player, computer) {
  if (player === computer) return "draw";
  const winConditions = { Rock: "Scissors", Paper: "Rock", Scissors: "Paper" };
  return winConditions[player] === computer ? "win" : "loss";
}

function updateStats(result) {
  switch (result) {
    case "win":
      wins++;
      streak++;
      bestStreak = Math.max(bestStreak, streak);
      break;
    case "loss":
      losses++;
      streak = 0;
      break;
    case "draw":
      draws++;
      break;
  }

  document.getElementById("wins").textContent = wins;
  document.getElementById("losses").textContent = losses;
  document.getElementById("draws").textContent = draws;
  document.getElementById("streak").textContent = streak;
}

function updateDisplay(result, player, computer) {
  const box = document.getElementById("result-box");
  box.className = "result-box " + result;

  let title = result === "win" ? "You Win!" : result === "loss" ? "You Lose" : "Draw";
  let msg =
    result === "win"
      ? `${player} beats ${computer}`
      : result === "loss"
      ? `${computer} beats ${player}`
      : `Both picked ${player}`;

  box.innerHTML = `<div class="result-title">${title}</div><div class="result-msg">${msg}</div>`;

  const pImg = document.getElementById("player-img");
  const cImg = document.getElementById("computer-img");

  pImg.classList.remove("show");
  cImg.classList.remove("show");

  setTimeout(() => {
    pImg.src = imgMap[player];
    pImg.alt = player;
    cImg.src = imgMap[computer];
    cImg.alt = computer;
    pImg.classList.add("show");
    cImg.classList.add("show");
  }, 50);
}

function resetGame() {
  wins = 0;
  losses = 0;
  draws = 0;
  streak = 0;
  bestStreak = 0;

  document.getElementById("wins").textContent = 0;
  document.getElementById("losses").textContent = 0;
  document.getElementById("draws").textContent = 0;
  document.getElementById("streak").textContent = 0;

  const box = document.getElementById("result-box");
  box.className = "result-box";
  box.innerHTML = `<div class="result-title" style="font-size:16px;font-family:'Nunito',sans-serif;font-weight:600;color:rgba(255,255,255,0.5);">Pick a move to begin</div>`;

  document.getElementById("player-img").className = "";
  document.getElementById("computer-img").className = "";
  document.querySelectorAll(".choice-btn").forEach((b) =>
    b.classList.remove("selected")
  );
}

console.log("Rock-Paper-Scissors loaded. Choose a move!");
