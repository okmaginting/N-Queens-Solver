let solutions = [];
let currentSolution = 0;

$(document).ready(function () {
    $('#solveButton').click(function () {
        const n = parseInt($('#queenNumber').val());
        if (n && n > 0) {
            solveNQueens(n);
            window.location.href = 'solution.html';
        } else {
            alert('Please enter a valid number');
        }
    });
});


function solveNQueens(n) {
    solutions = [];
    currentSolution = 0;
    const board = new Array(n).fill(-1);
    placeQueens(board, 0);
    localStorage.setItem('solutions', JSON.stringify(solutions));
}

function placeQueens(board, row) {
    const n = board.length;
    if (row === n) {
        solutions.push(board.slice());
        return;
    }
    for (let col = 0; col < n; col++) {
        if (isSafe(board, row, col)) {
            board[row] = col;
            placeQueens(board, row + 1);
            board[row] = -1;
        }
    }
}

function isSafe(board, row, col) {
    for (let i = 0; i < row; i++) {
        const placedCol = board[i];
        if (placedCol === col || placedCol - col === row - i || placedCol - col === i - row) {
            return false;
        }
    }
    return true;
}
