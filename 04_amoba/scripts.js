// konstansok
let GRIDSIZE = 9;

// változók
let cursorRow = 0,
    cursorCol = 0,
    setpCount = 0,
    finished = false;

// elemek összegyűjtése
let tableGrid = document.getElementById('grid');
let spanStepCount = document.getElementById('stepCount');
let spanCurrentMark = document.getElementById('currentMark');

// feliratkozás
window.addEventListener('keydown', OnKeyDown);
window.addEventListener('gameFinished', OnGameFinished);

// init
RenderGrid();
MoveCursor();


// renderelés
function RenderGrid() {
    tableGrid.innerHTML = '';

    for (let rowIndex = 0; rowIndex < GRIDSIZE; rowIndex++) {
        let newRow = document.createElement('tr');

        for (let colIndex = 0; colIndex < GRIDSIZE; colIndex++) {
            let newCell = document.createElement('td');
            newRow.appendChild(newCell);
        }
        tableGrid.appendChild(newRow);
    }
}

function MoveCursor(direction) {
    switch (direction) {
        case 'Up':
            cursorRow = Math.max(0, cursorRow - 1);
            break;
        case 'Right':
            cursorCol = Math.min(GRIDSIZE - 1, cursorCol + 1);
            break;
        case 'Down':
            cursorRow = Math.min(GRIDSIZE - 1, cursorRow + 1);
            break;
        case 'Left':
            cursorCol = Math.max(0, cursorCol - 1);
            break;
    }
    SetCursor(cursorRow, cursorCol);
}

function PlaceMark() {

}

function SetCellValue(rowIndex, colIndex, value) {
    // cella összeszedése
    let rowCollection = tableGrid.children,
        cellCollection = rowCollection[rowIndex].children,
        cell = cellCollection[colIndex];

        cell.innerText = value;
}
function GetCellValue(rowIndex, colIndex) {
    // cella összeszedése
    let rowCollection = tableGrid.children,
        cellCollection = rowCollection[rowIndex].children,
        cell = cellCollection[colIndex];

        return cell.innerText;
}

function SetCursor(rowIndex, colIndex) {
    if (finished) {
        return;
    }

    let rows = tableGrid.childNodes;
    let cells = rows[rowIndex].childNodes;
    let selectedCell = cells[colIndex];

    // todo: validálni a mezőről kilépést

    // előzőről class 'cursor' levétele
    let prevCursorCollection = document.getElementsByClassName('cursor');
    for (let cursorIndex = 0; cursorIndex < prevCursorCollection.length; cursorIndex++) {
        let prevCursor = prevCursorCollection[cursorIndex];
        prevCursor.className = '';
    }

    // class 'cursor' beállítása
    selectedCell.className = 'cursor';

}


// eseményekre reagálás
function OnKeyDown(event) {
    switch (event.code) {
        case 'ArrowUp':
        case 'ArrowRight':
        case 'ArrowDown':
        case 'ArrowLeft':
            let direction = event.key;
            direction = direction.replace('Arrow', '');
            MoveCursor(direction);
            break;
        case 'Space':
            PlaceMark();
            break;
    }
}

function OnGameFinished() {

}