// ==========================
// SELECT ELEMENTS
// ==========================

const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");

const restartBtn = document.getElementById("restartBtn");
const resetScoreBtn = document.getElementById("resetScoreBtn");

const popup = document.getElementById("popup");
const popupTitle = document.getElementById("popupTitle");
const popupMessage = document.getElementById("popupMessage");
const popupEmoji = document.getElementById("popupEmoji");

const newGameBtn = document.getElementById("newGameBtn");

const scoreX = document.getElementById("scoreX");
const scoreO = document.getElementById("scoreO");
const scoreDraw = document.getElementById("scoreDraw");

// ==========================
// GAME VARIABLES
// ==========================

let board = ["", "", "", "", "", "", "", "", ""];

let currentPlayer = "X";
let gameActive = true;

let xWins = 0;
let oWins = 0;
let draws = 0;

// ==========================
// WINNING PATTERNS
// ==========================

const winningPatterns = [

    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]

];

// ==========================
// ADD CLICK EVENTS
// ==========================

cells.forEach(cell => {

    cell.addEventListener("click", cellClicked);

});

restartBtn.addEventListener("click", restartGame);

resetScoreBtn.addEventListener("click", resetScores);

newGameBtn.addEventListener("click", () => {

    popup.classList.remove("show");
    restartGame();

});

// ==========================
// CELL CLICK
// ==========================

function cellClicked(e){

    const index = e.target.dataset.index;

    if(board[index] !== "" || !gameActive){

        return;

    }

    board[index] = currentPlayer;

    e.target.textContent = currentPlayer;

    if(currentPlayer === "X"){

        e.target.classList.add("x");

    }else{

        e.target.classList.add("o");

    }

    checkWinner();

}
// ==========================
// CHECK WINNER
// ==========================

function checkWinner() {

    let roundWon = false;

    for (let i = 0; i < winningPatterns.length; i++) {

        const [a, b, c] = winningPatterns[i];

        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {

            roundWon = true;

            // Highlight winning cells
            cells[a].classList.add("win");
            cells[b].classList.add("win");
            cells[c].classList.add("win");

            showWinner(currentPlayer);

            break;
        }
    }

    if (roundWon) {

        gameActive = false;

        if (currentPlayer === "X") {

            xWins++;
            scoreX.textContent = xWins;

        } else {

            oWins++;
            scoreO.textContent = oWins;

        }

        return;
    }

    // Draw

    if (!board.includes("")) {

        draws++;
        scoreDraw.textContent = draws;

        showDraw();

        gameActive = false;

        return;
    }

    // Switch Player

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    statusText.textContent = `Player ${currentPlayer}'s Turn`;

}

// ==========================
// SHOW WINNER POPUP
// ==========================

function showWinner(player) {

    popup.classList.add("show");

    popupEmoji.textContent = "🏆";

    popupTitle.textContent = `Player ${player} Wins!`;

    popupMessage.textContent = "Congratulations! 🎉";

    statusText.textContent = `Player ${player} Wins`;

    launchConfetti();

}

// ==========================
// SHOW DRAW POPUP
// ==========================

function showDraw() {

    popup.classList.add("show");

    popupEmoji.textContent = "🤝";

    popupTitle.textContent = "Match Draw";

    popupMessage.textContent = "Try Again!";

    statusText.textContent = "It's a Draw";

}
// ==========================
// RESTART GAME
// ==========================

function restartGame() {

    board = ["", "", "", "", "", "", "", "", ""];

    currentPlayer = "X";

    gameActive = true;

    statusText.textContent = "Player X's Turn";

    cells.forEach(cell => {

        cell.textContent = "";

        cell.classList.remove("x");
        cell.classList.remove("o");
        cell.classList.remove("win");

    });

}

// ==========================
// RESET SCOREBOARD
// ==========================

function resetScores() {

    xWins = 0;
    oWins = 0;
    draws = 0;

    scoreX.textContent = "0";
    scoreO.textContent = "0";
    scoreDraw.textContent = "0";

    popup.classList.remove("show");

    restartGame();

}

// ==========================
// SIMPLE CONFETTI EFFECT
// ==========================

const canvas = document.getElementById("confettiCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confetti = [];

function launchConfetti() {

    confetti = [];

    for (let i = 0; i < 150; i++) {

        confetti.push({

            x: Math.random() * canvas.width,

            y: Math.random() * canvas.height - canvas.height,

            size: Math.random() * 8 + 4,

            speed: Math.random() * 4 + 2,

            color: `hsl(${Math.random() * 360},100%,50%)`

        });

    }

    animateConfetti();

}

function animateConfetti() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confetti.forEach(piece => {

        ctx.fillStyle = piece.color;

        ctx.fillRect(piece.x, piece.y, piece.size, piece.size);

        piece.y += piece.speed;

    });

    confetti = confetti.filter(piece => piece.y < canvas.height);

    if (confetti.length > 0) {

        requestAnimationFrame(animateConfetti);

    }

}

// ==========================
// WINDOW RESIZE
// ==========================

window.addEventListener("resize", () => {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

});

// ==========================
// START GAME
// ==========================

restartGame();