let board = [];
let moves = 0;
let time = 0;
let timerInterval;

function initializeBoard() {
  board = Array.from({ length: 15 }, (_, i) => i + 1);
  board.push(null); // The empty slot
}

function shuffleBoard() {
  for (let i = board.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [board[i], board[j]] = [board[j], board[i]];
  }
}

function renderBoard() {
  const boardElement = document.getElementById("board");
  boardElement.innerHTML = "";

  board.forEach((tile, index) => {
    const tileElement = document.createElement("div");
    tileElement.classList.add("tile");
    if (tile === null) {
      tileElement.classList.add("empty");
    } else {
      tileElement.textContent = tile;
      tileElement.onclick = () => handleTileClick(index);
    }
    boardElement.appendChild(tileElement);
  });
}

function handleTileClick(index) {
  const emptyIndex = board.indexOf(null);
  const isAdjacent = 
    [index - 4, index + 4, index - 1, index + 1].includes(emptyIndex) &&
    Math.abs(emptyIndex % 4 - index % 4) !== 3;
  
  if (isAdjacent) {
    [board[emptyIndex], board[index]] = [board[index], board[emptyIndex]];
    moves++;
    document.getElementById("moveCount").textContent = moves;
    renderBoard();

    if (checkWin()) {
      clearInterval(timerInterval);
      alert(`Congratulations! You solved the puzzle in ${moves} moves and ${time} seconds.`);
    }
  }
}

function checkWin() {
  for (let i = 0; i < 15; i++) {
    if (board[i] !== i + 1) return false;
  }
  return true;
}

function newGame() {
  clearInterval(timerInterval);
  moves = 0;
  time = 0;
  document.getElementById("moveCount").textContent = moves;
  document.getElementById("timer").textContent = time;

  initializeBoard();
  shuffleBoard();
  renderBoard();

  timerInterval = setInterval(() => {
    time++;
    document.getElementById("timer").textContent = time;
  }, 1000);
}

function simpleGame() {
  clearInterval(timerInterval);
  moves = 0;
  time = 0;
  document.getElementById("moveCount").textContent = moves;
  document.getElementById("timer").textContent = time;

  initializeBoard();
  board[14] = null;
  board[15] = 15;
  renderBoard();

  timerInterval = setInterval(() => {
    time++;
    document.getElementById("timer").textContent = time;
  }, 1000);
}

newGame();
