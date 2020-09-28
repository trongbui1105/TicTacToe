const X_CLASS = 'x';
const O_CLASS = 'o';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4 ,7],
    [2, 4, 6],
    [2, 5, 8]
]
const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const winningMessageText = document.querySelector('[data-winning-message-text]');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
let O_Turn;
const xScore = document.getElementById('xScore');
const oScore = document.getElementById('oScore');
const resetButton = document.getElementById('resetButton');
var scoreOfX = 0;
var scoreOfO = 0;


startGame();
scoreDefault();

restartButton.addEventListener('click', () => {
    getScore();
    startGame();
});
resetButton.addEventListener('click', resetMatch);

function startGame(){
    // getScore();
    O_Turn = false;
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(O_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once : true })
    });
    setBoardHoverClass();
    winningMessageElement.classList.remove('show');
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = O_Turn ? O_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    }
    else if(isDraw()){
        endGame(true);
    }
    else {
        swapTurn();
        setBoardHoverClass();
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurn(){
    O_Turn = !O_Turn;
}

function setBoardHoverClass() {
    board.classList.remove(X_CLASS);
    board.classList.remove(O_CLASS);
    if (O_Turn) {
        board.classList.add(O_CLASS);
    } else {
        board.classList.add(X_CLASS);
    }
    
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })
    })
}

function endGame(draw) {
    var text;
    if (draw) {
        text = "DRAW !!!";
    } else {
        if (O_Turn) {
            text = "Player O WINS! ";
        } else {
            text = "Player X WINS! ";
        }
        // winningMessageText.innerText = `${O_Turn ? "O" : "X"} Wins!`;
    }
    winningMessageText.innerHTML = text;
    winningMessageElement.classList.add('show');
}


function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
    })
}


function resetMatch() {
    startGame();
    scoreDefault();
}

// function getScore() {
//     if (O_Turn) {
//         scoreOfO++;
//     }
//     else if(isDraw()){
//         scoreOfO++;
//         scoreOfX++;
//     } else {
//         scoreOfX++;
//     }
//     xScore.innerHTML = scoreOfX;
//     oScore.innerHTML = scoreOfO;
// }
function getScore() {
    const currentClass = O_Turn ? O_CLASS : X_CLASS;
    if (checkWin(currentClass)) {
        score(false);
    }
    else if(isDraw()){
        score(true);
    }
}


function score(draw) {
    if (draw) {
        scoreOfO++;
        scoreOfX++;
    } else {
        if (O_Turn) {
            scoreOfO++;
        } else {
            scoreOfX++;
        }
    }
    xScore.innerHTML = scoreOfX;
    oScore.innerHTML = scoreOfO;
}

function scoreDefault() {
    // const score = 0;
    // xScore.innerHTML = 0;
    // oScore.innerHTML = 0;
    scoreOfX = 0;
    scoreOfO = 0;
    xScore.innerHTML = scoreOfX;
    oScore.innerHTML = scoreOfO;
}