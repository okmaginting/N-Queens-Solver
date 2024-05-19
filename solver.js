let solutions = [];
let currentSolution = 0;

$(document).ready(function () {
    $('#solveButton').click(function () {
        const n = parseInt($('#queenNumber').val());
        if (n && n > 0) {
            solveNQueens(n);
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
    if (solutions.length === 0) {
        alert('No solutions found.');
        return;
    }
    displaySolution();
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

function displaySolution() {
    const n = solutions[0].length;
    const solution = solutions[currentSolution];
    const boardContainer = $('#boardContainer');
    boardContainer.empty();
    const board = $('<div>').addClass('board').css({
        'grid-template-columns': `repeat(${n}, 50px)`,
        'grid-template-rows': `repeat(${n}, 50px)`
    });

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            const cell = $('<div>').addClass('cell').addClass((i + j) % 2 === 0 ? 'white' : 'black');
            if (solution[i] === j) {
                cell.addClass('queen').text('♛');
            }
            board.append(cell);
        }
    }

    boardContainer.append(board);
    $('#solutionNumber').text(`Solution number ${currentSolution + 1} of ${solutions.length}`);
}

function prevSolution() {
    if (currentSolution > 0) {
        currentSolution--;
        displaySolution();
    }
}

function nextSolution() {
    if (currentSolution < solutions.length - 1) {
        currentSolution++;
        displaySolution();
    }
}
