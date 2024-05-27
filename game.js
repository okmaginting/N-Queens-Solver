let queensPlaced = 0;
let totalQueens = 0;
let solutions = [];
let currentSolutionIndex = 0;

$(document).ready(function () {
    const urlParams = new URLSearchParams(window.location.search);
    const sizeParamExists = urlParams.has('size');

    $('#startButton').click(function () {
        const size = parseInt($('#sizeInput').val());
        if (size && size > 0) {
            window.location.href = `game.html?size=${size}`;
        } else {
            alert('Please enter a valid number');
        }
    });
    if (sizeParamExists) {
        const size = parseInt(urlParams.get('size'));
        if (size && size > 0) {
            queensPlaced = 0;
            totalQueens = size;
            drawBoard(size);
            updateQueenCounter();
        } else {
            alert('Invalid number of queens');
        }
    }

    $('#resetButton').click(function () {
        queensPlaced = 0;
        drawBoard(totalQueens);
        updateQueenCounter();
    });

    $('#giveUpButton').click(function () {
        solveGame();
    });
});

function drawBoard(size) {
    const boardContainer = $('#boardContainer');
    boardContainer.empty();
    const board = $('<div>').addClass('board').css({
        'grid-template-columns': `repeat(${size}, 50px)`,
        'grid-template-rows': `repeat(${size}, 50px)`
    });

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const cell = $('<div>').addClass('cell').addClass((i + j) % 2 === 0 ? 'white' : 'black');
            cell.attr('data-row', i);
            cell.attr('data-col', j);
            cell.click(() => placeQueen(cell, size));
            board.append(cell);
        }
    }

    boardContainer.append(board);
}

function placeQueen(cell, size) {
    if (cell.hasClass('queen')) {
        cell.removeClass('queen').text('');
        queensPlaced--;
        resetInvalidCells(size);
    } else {
        const row = parseInt(cell.attr('data-row'));
        const col = parseInt(cell.attr('data-col'));

        if (isValidMove(row, col, size)) {
            cell.addClass('queen').text('♛');
            queensPlaced++;
            highlightInvalidCells(row, col, size);
        } else {
            alert('Invalid move');
        }
    }
    updateQueenCounter();
    checkWin();
}

function isValidMove(row, col, size) {
    const cells = $('.cell.queen');
    for (let i = 0; i < cells.length; i++) {
        const queenRow = parseInt($(cells[i]).attr('data-row'));
        const queenCol = parseInt($(cells[i]).attr('data-col'));

        if (queenRow === row || queenCol === col || Math.abs(queenRow - row) === Math.abs(queenCol - col)) {
            return false;
        }
    }
    return true;
}

function highlightInvalidCells(row, col, size) {
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const cell = $(`.cell[data-row=${i}][data-col=${j}]`);
            if (!cell.hasClass('queen') && !isValidMove(i, j, size)) {
                cell.addClass('invalid');
            } else {
                cell.removeClass('invalid');
            }
        }
    }
}

function resetInvalidCells(size) {
    $('.cell').removeClass('invalid');
    $('.queen').each(function () {
        const row = parseInt($(this).attr('data-row'));
        const col = parseInt($(this).attr('data-col'));
        highlightInvalidCells(row, col, size);
    });
}

function updateQueenCounter() {
    const counterText = `${queensPlaced} queens have been placed from ${totalQueens} queens`;
    $('#queenCounter').text(counterText);
}

function checkWin() {
    if (queensPlaced === totalQueens) {
        setTimeout(() => {
            alert('You win!');
        }, 300);
    }
}

function solveGame() {
    const size = totalQueens;
    const initialQueens = getInitialQueens(size);
    solveNQueens(size, initialQueens);
}

function getInitialQueens(size) {
    const initialQueens = new Array(size).fill(-1);
    $('.cell.queen').each(function () {
        const row = parseInt($(this).attr('data-row'));
        const col = parseInt($(this).attr('data-col'));
        initialQueens[row] = col;
    });
    return initialQueens;
}

function solveNQueens(n, initialQueens) {
    solutions = [];
    currentSolutionIndex = 0;
    placeQueens(initialQueens, 0, n);
    if (solutions.length > 0) {
        showSolution();
    } else {
        alert('No solution found with the current placement. Please reset and try again.');
    }
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

function showSolution() {
    const solution = solutions[currentSolutionIndex];
    animateSolution(solution);
    currentSolutionIndex = (currentSolutionIndex + 1) % solutions.length;
}

function animateSolution(solution) {
    const size = solution.length;
    let delay = 0;
    $('.cell').removeClass('queen').text('');
    for (let i = 0; i < size; i++) {
        const col = solution[i];
        setTimeout(() => {
            $(`.cell[data-row=${i}][data-col=${col}]`).addClass('queen').text('♛').css('background-color', 'orange');
            queensPlaced = i + 1;
            updateQueenCounter();
        }, delay);
        delay += 500;
    }
}
