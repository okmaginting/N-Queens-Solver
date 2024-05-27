let solutions = JSON.parse(localStorage.getItem('solutions'));
let currentSolution = 0;

$(document).ready(function () {
    displaySolution();
});

function displaySolution() {
    if (solutions.length === 0) {
        $('#solutionNumber').text('No solutions found.');
        return;
    }
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
            cell.attr('data-row', i);
            cell.attr('data-col', j);
            board.append(cell);
        }
    }

    boardContainer.append(board);
    $('#solutionNumber').text(`Solution number ${currentSolution + 1} of ${solutions.length}`);
    animateSolution(solution);
}

function animateSolution(solution) {
    const n = solution.length;
    let delay = 0;
    for (let i = 0; i < n; i++) {
        const col = solution[i];
        setTimeout(() => {
            $(`.cell[data-row=${i}][data-col=${col}]`).addClass('queen').text('♛').css('background-color', 'orange');
        }, delay);
        delay += 500;
    }
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

function goBack() {
    window.location.href = 'index.html';
}
