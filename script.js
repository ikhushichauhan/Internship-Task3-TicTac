const board = document.getElementById('board');
const statusDiv = document.getElementById('status');
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let currentPlayer = 'X';
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function createBoard() {
  board.innerHTML = '';
  gameState.forEach((cell, i) => {
    const cellDiv = document.createElement('div');
    cellDiv.className = 'cell';
    cellDiv.dataset.index = i;
    cellDiv.textContent = cell;
    cellDiv.addEventListener('click', handleClick);
    board.appendChild(cellDiv);
  });
  updateStatus();
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (gameState[index] || !gameActive) return;

  gameState[index] = currentPlayer;
  createBoard();
  checkWinner();
}

function checkWinner() {
  let winner = null;

  winConditions.forEach(([a, b, c]) => {
    if (
      gameState[a] &&
      gameState[a] === gameState[b] &&
      gameState[b] === gameState[c]
    ) {
      winner = gameState[a];
    }
  });

  if (winner) {
    gameActive = false;

    // Start fireworks
    startFireworks();

    // Hide status temporarily
    statusDiv.innerHTML = "";

    // After 2s, stop fireworks and show winner + reset
    setTimeout(() => {
      stopFireworks();

      statusDiv.innerHTML = `
        <div style="font-size: 2.5rem; color: gold; text-shadow: 2px 2px black;">
          🎉 Player ${winner} Wins! 🎉
        </div>
        <button onclick="resetGame()" style="
          margin-top: 20px;
          padding: 12px 24px;
          font-size: 1.2rem;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 10px;
          cursor: pointer;
        ">
          🔁 Play Again
        </button>
      `;
    }, 2000);

    return;
  }

  if (!gameState.includes("")) {
    gameActive = false;
    statusDiv.innerHTML = `
  <div style="font-size: 2rem;">🤝 It's a Draw!</div>
  <button onclick="resetGame()" style="
    margin-top: 20px;
    padding: 12px 24px;
    font-size: 1.2rem;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
  ">
    🔁 Play Again
  </button>
`;


  currentPlayer = currentPlayer === "X" ? "O" : "X";
  updateStatus();
}


if (winner) {
  gameActive = false;
  statusDiv.innerHTML = "";
  startFireworks();

  setTimeout(() => {
    statusDiv.innerHTML = `<span style="font-size:2.5rem; color: gold;">🎆 Player ${winner} Wins! 🎆</span>`;
  }, 2000); // Show winner after fireworks start
  return;
}

  if (!gameState.includes("")) {
    gameActive = false;
    statusDiv.innerHTML = `<span style="font-size:1.8rem;">It's a Draw 🤝</span>`;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  updateStatus();
}

function updateStatus() {
  statusDiv.innerText = `Player ${currentPlayer}'s Turn`;
}

function resetGame() {
  stopFireworks();
  gameState = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = 'X';
  gameActive = true;
  createBoard();
}

createBoard();
