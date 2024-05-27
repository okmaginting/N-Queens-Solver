let solutions = [];
let currentSolutionIndex = 0;

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

function solveNQueens(n, initialQueens = []) {
    solutions = [];
    currentSolutionIndex = 0;
    const board = initialQueens.length > 0 ? initialQueens : new Array(n).fill(-1);
    placeQueens(board, 0, n);
    localStorage.setItem('solutions', JSON.stringify(solutions));
}

function placeQueens(board, row, n) {
    if (row === n) {
        solutions.push(board.slice());
        return;
    }
    if (board[row] !== -1) {
        placeQueens(board, row + 1, n);
        return;
    }
    for (let col = 0; col < n; col++) {
        if (isSafe(board, row, col)) {
            board[row] = col;
            placeQueens(board, row + 1, n);
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
