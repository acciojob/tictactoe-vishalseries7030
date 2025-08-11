// script.js - Tic Tac Toe (local 2-player)
// Requirements: inputs with ids player-1 & player-2, submit button id 'submit',
// message div class="message" id="message", board with cells id 1..9.

document.addEventListener('DOMContentLoaded', () => {
  const submitBtn = document.getElementById('submit');
  const playerInputDiv = document.getElementById('player-input');
  const gameDiv = document.getElementById('game');
  const messageDiv = document.getElementById('message');
  const boardElem = document.getElementById('board');
  const restartBtn = document.getElementById('restart');
  const changePlayersBtn = document.getElementById('change-players');

  let player1 = '';
  let player2 = '';
  let currentPlayer = '';
  let currentSymbol = 'X';
  let gameActive = true;
  let boardState = Array(9).fill('');

  const winningCombinations = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  function updateMessage(text) {
    messageDiv.textContent = text;
  }

  function startGame() {
    // reset state
    boardState.fill('');
    gameActive = true;
    currentPlayer = player1;
    currentSymbol = 'X';
    // clear UI cells
    document.querySelectorAll('.cell').forEach(c => {
      c.textContent = '';
      c.classList.remove('x','o');
    });
    updateMessage(`${currentPlayer}, you're up ( ${currentSymbol} )`);
  }

  // Submit players
  submitBtn.addEventListener('click', () => {
    const p1 = document.getElementById('player-1').value.trim();
    const p2 = document.getElementById('player-2').value.trim();
    if (!p1 || !p2) {
      alert('Please enter names for both players.');
      return;
    }
    player1 = p1;
    player2 = p2;
    playerInputDiv.style.display = 'none';
    gameDiv.style.display = 'block';
    startGame();
  });

  // Cell click handler (event delegation)
  boardElem.addEventListener('click', (ev) => {
    const cell = ev.target;
    if (!cell.classList.contains('cell') || !gameActive) return;
    const index = parseInt(cell.id, 10) - 1;
    if (isNaN(index) || boardState[index] !== '') return;

    // place symbol
    boardState[index] = currentSymbol;
    cell.textContent = currentSymbol;
    cell.classList.add(currentSymbol === 'X' ? 'x' : 'o');

    // check winner
    if (checkWinner()) {
      updateMessage(`${currentPlayer}, congratulations — you won!`);
      gameActive = false;
      return;
    }

    // check draw
    if (!boardState.includes('')) {
      updateMessage("It's a draw!");
      gameActive = false;
      return;
    }

    // switch player
    switchPlayer();
    updateMessage(`${currentPlayer}, you're up ( ${currentSymbol} )`);
  });

  function switchPlayer() {
    if (currentPlayer === player1) {
      currentPlayer = player2;
      currentSymbol = 'O';
    } else {
      currentPlayer = player1;
      currentSymbol = 'X';
    }
  }

  function checkWinner() {
    return winningCombinations.some(combo => {
      const [a,b,c] = combo;
      return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
    });
  }

  restartBtn.addEventListener('click', () => {
    startGame();
  });

  changePlayersBtn.addEventListener('click', () => {
    // show input view again
    playerInputDiv.style.display = 'block';
    gameDiv.style.display = 'none';
    // keep previous names in inputs for easy editing
    document.getElementById('player-1').value = player1;
    document.getElementById('player-2').value = player2;
  });

  // Optional: keyboard accessibility (1-9 keys)
  window.addEventListener('keydown', (e) => {
    if (!gameActive) return;
    const key = e.key;
    if (/^[1-9]$/.test(key)) {
      const cell = document.getElementById(key);
      if (cell) cell.click();
    }
  });
});
