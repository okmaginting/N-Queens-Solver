function printSolution(board) {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';

    board.forEach((row, i) => {
        const rowElement = document.createElement('div');
        rowElement.classList.add('row');

        row.forEach((cell, j) => {
            const cellElement = document.createElement('div');
            cellElement.classList.add('cell');
            cellElement.classList.add((i + j) % 2 === 0 ? 'white' : 'black');

            if (cell === 1) {
                cellElement.classList.add('queen');
            }

            rowElement.appendChild(cellElement);
        });

        boardElement.appendChild(rowElement);
    });
}

function isSafe(board, row, col) {
    for (let i = 0; i < col; i++) {
        if (board[row][i] === 1) return false;
    }

    for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] === 1) return false;
    }

    for (let i = row, j = col; j >= 0 && i < board.length; i++, j--) {
        if (board[i][j] === 1) return false;
    }

    return true;
}

function solveNQUtil(board, col, solutions) {
    if (col === board.length) {
        solutions.push(board.map(row => row.slice()));
        return;
    }

    for (let i = 0; i < board.length; i++) {
        if (isSafe(board, i, col)) {
            board[i][col] = 1;
            solveNQUtil(board, col + 1, solutions);
            board[i][col] = 0;
        }
    }
}

function solveNQueens(n) {
    const board = Array.from({ length: n }, () => Array(n).fill(0));
    const solutions = [];
    solveNQUtil(board, 0, solutions);
    return solutions;
}