$(document).ready(function () {
    $('#startButton').click(function () {
        const size = parseInt($('#sizeInput').val());
        if (size && size > 0) {
            drawBoard(size);
        } else {
            alert('Please enter a valid number');
        }
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
        resetInvalidCells(size);
    } else {
        const row = parseInt(cell.attr('data-row'));
        const col = parseInt(cell.attr('data-col'));

        if (isValidMove(row, col, size)) {
            cell.addClass('queen').text('♛');
            highlightInvalidCells(row, col, size);
        } else {
            alert('Invalid move');
        }
    }
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
