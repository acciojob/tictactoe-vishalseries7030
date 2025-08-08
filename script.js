//your JS code here. If required.
document.body.innerHTML = `
<div class="container">
    <!-- Initial Player Input View -->
    <div id="player-input">
        <h2>Enter Player Names</h2>
        <input type="text" id="player-1" placeholder="Player 1 Name" required>
        <input type="text" id="player-2" placeholder="Player 2 Name" required>
        <button id="submit">Submit</button>
    </div>

    <!-- Game View -->
    <div id="game" style="display:none;">
        <h1>Tic Tac Toe</h1>
        <div class="message" id="message"></div>
        <div class="board" id="board">
            <div class="cell" id="1"></div>
            <div class="cell" id="2"></div>
            <div class="cell" id="3"></div>
            <div class="cell" id="4"></div>
            <div class="cell" id="5"></div>
            <div class="cell" id="6"></div>
            <div class="cell" id="7"></div>
            <div class="cell" id="8"></div>
            <div class="cell" id="9"></div>
        </div>
    </div>
</div>
`;

const submitBtn = document.getElementById('submit');
const playerInputDiv = document.getElementById('player-input');
const gameDiv = document.getElementById('game');
const messageDiv = document.getElementById('message');
const board = document.getElementById('board');

let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentSymbol = "X";
let gameActive = true;
let boardState = ["", "", "", "", "", "", "", "", ""];

const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

submitBtn.addEventListener('click', () => {
    player1 = document.getElementById('player-1').value.trim();
    player2 = document.getElementById('player-2').value.trim();

    if(player1 === "" || player2 === ""){
        alert("Please enter names for both players!");
        return;
    }

    currentPlayer = player1;
    playerInputDiv.style.display = "none";
    gameDiv.style.display = "block";
    updateMessage();
});

board.addEventListener('click', (e) => {
    const cell = e.target;
    const cellIndex = parseInt(cell.id) - 1;

    if(cell.classList.contains('cell') && boardState[cellIndex] === "" && gameActive){
        boardState[cellIndex] = currentSymbol;
        cell.textContent = currentSymbol;

        if(checkWinner()){
            messageDiv.textContent = `${currentPlayer}, congratulations you won!`;
            gameActive = false;
        } 
        else if(!boardState.includes("")){
            messageDiv.textContent = "It's a draw!";
            gameActive = false;
        }
        else {
            switchPlayer();
            updateMessage();
        }
    }
});

function updateMessage(){
    messageDiv.textContent = `${currentPlayer}, you're up`;
}

function switchPlayer(){
    if(currentPlayer === player1){
        currentPlayer = player2;
        currentSymbol = "O";
    } else {
        currentPlayer = player1;
        currentSymbol = "X";
    }
}

function checkWinner(){
    return winningCombinations.some(combination => {
        const [a,b,c] = combination;
        return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
    });
}
