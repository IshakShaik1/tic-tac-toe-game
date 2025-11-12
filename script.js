const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");
const turnEl = document.getElementById("turn");
const restartBtn = document.getElementById("restartBtn");
const resetScoreBtn = document.getElementById("resetScoreBtn");
const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");

let currentPlayer = "X";
let board = Array(9).fill("");
let scores = { X: 0, O: 0 };
let gameOver = false;

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (cell.textContent === "" && !gameOver) {
      cell.textContent = currentPlayer;
      board[index] = currentPlayer;
      checkWinner();
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      turnEl.textContent = currentPlayer;
    }
  });
});

function checkWinner() {
  for (let pattern of winPatterns) {
    const [a,b,c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      highlightWin(pattern);
      message.textContent = `${board[a]} Wins!`;
      scores[board[a]]++;
      updateScores();
      gameOver = true;
      return;
    }
  }
  if (!board.includes("")) {
    message.textContent = "Draw!";
    gameOver = true;
  }
}

function highlightWin(pattern) {
  pattern.forEach(i => cells[i].classList.add("win"));
}

function updateScores() {
  scoreX.textContent = scores.X;
  scoreO.textContent = scores.O;
}

restartBtn.addEventListener("click", () => {
  board = Array(9).fill("");
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("win");
  });
  message.textContent = `Turn: `;
  turnEl.textContent = "X";
  currentPlayer = "X";
  gameOver = false;
});

resetScoreBtn.addEventListener("click", () => {
  scores = { X: 0, O: 0 };
  updateScores();
});
