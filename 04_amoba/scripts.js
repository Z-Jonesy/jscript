// konstansok
let GRIDSIZE = 9;

// változók
let cursorRow = 0,
    cursorCol = 0,
    stepCount = 0,
    finished = false;

// elemek összegyűjtése
let tableGrid = document.getElementById('grid');
let spanStepCount = document.getElementById('stepCount');
let spanCurrentMark = document.getElementById('currentMark');
let spanErrorMark = document.getElementById('errorMark');

// feliratkozás
window.addEventListener('keydown', OnKeyDown);
window.addEventListener('gameFinished', OnGameFinished);

// init
RenderGrid();
MoveCursor();
UpdateCurrentMarkSpan();

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
    spanErrorMark.className = '';
    spanErrorMark.innerText = '';
}

function PlaceMark() {

    // csak ha a cella üres
    if (GetCellValue(cursorRow, cursorCol) == '') {


        SetCellValue(cursorRow, cursorCol, GetCurrentMark());
        if (IsGameFinished()) {
            finished = true;
            TriggerGameFinished();
        }
        if (finished) {
            return;
        }
        IncrementStepCount();
    } else {
    spanErrorMark.className = 'errorText';
    spanErrorMark.innerText = 'Ott már van jelölés';
    }
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

function IncrementStepCount() {
    stepCount++;
    spanStepCount.innerText = stepCount;
    UpdateCurrentMarkSpan();
}

function GetCurrentMark() {
    return stepCount % 2 == 0 ? 'X' : 'O';
}

function UpdateCurrentMarkSpan() {
    spanCurrentMark.innerText = GetCurrentMark();
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
    const MESSAGE = "Játék vége, nyertes: " + GetCurrentMark();
    alert(MESSAGE);
}

function IsGameFinished() {
    //függőleges ellenőrzés
    for (let rowIndex = 2; rowIndex < GRIDSIZE - 2; rowIndex++) {
        for (let colIndex = 0; colIndex < GRIDSIZE - 2; colIndex++) {

            //összeszedjük az értékekek
            let cellValues = [
                GetCellValue(rowIndex - 2, colIndex),
                GetCellValue(rowIndex - 1, colIndex),
                GetCellValue(rowIndex, colIndex),
                GetCellValue(rowIndex + 1, colIndex),
                GetCellValue(rowIndex + 2, colIndex),
            ];
            // X vizsgálata
            if (CountValues(cellValues, 'X') == 5) {
                return true;
            }
            // O vizsgálata
            if (CountValues(cellValues, 'O') == 5) {
                return true;
            }
            // vízszintes ellenőrzés

        }

    }

    for (let colIndex = 2; colIndex < GRIDSIZE - 2; colIndex++) {
        for (let rowIndex = 0; rowIndex < GRIDSIZE - 2; rowIndex++) {
            let cellValues = [
                GetCellValue(rowIndex, colIndex - 2),
                GetCellValue(rowIndex, colIndex - 1),
                GetCellValue(rowIndex, colIndex),
                GetCellValue(rowIndex, colIndex + 1),
                GetCellValue(rowIndex, colIndex + 2),
            ]
            
            if (CountValues(cellValues, 'X') == 5) {
                return true;
            }
            if (CountValues(cellValues, 'O') == 5) {
                return true;
            }

        }

    }

    // átlós ellenőrzés balról jobbra
    for (let rowIndex = 2; rowIndex < GRIDSIZE-2; rowIndex++) {
        for (let colIndex = 2; colIndex < GRIDSIZE-2; colIndex++) {
            let cellValues = [
                GetCellValue(rowIndex-2,colIndex-2),
                GetCellValue(rowIndex-1,colIndex-1),
                GetCellValue(rowIndex,colIndex),
                GetCellValue(rowIndex+1,colIndex+1),
                GetCellValue(rowIndex+2,colIndex+2),
            ]
            
            if (CountValues(cellValues, 'X') == 5) {
                return true;
            }
            if (CountValues(cellValues, 'O') == 5) {
                return true;
            }
        }
        
    }
    // átlós ellenőrzés jobbról balra
    for (let rowIndex = 2; rowIndex < GRIDSIZE-2; rowIndex++) {
        for (let colIndex = 2; colIndex < GRIDSIZE-2; colIndex++) {
            let cellValues = [
                GetCellValue(rowIndex-2,colIndex+2),
                GetCellValue(rowIndex-1,colIndex+1),
                GetCellValue(rowIndex,colIndex),
                GetCellValue(rowIndex+1,colIndex-1),
                GetCellValue(rowIndex+2,colIndex-2),
            ]
            
            if (CountValues(cellValues, 'X') == 5) {
                return true;
            }
            if (CountValues(cellValues, 'O') == 5) {
                return true;
            }
        }
        
    }

    return false;
}

function CountValues(valueCollection, valueToCount) {
    return valueCollection.filter(function (value) {
        return value == valueToCount;
    }).length;
}

function TriggerGameFinished() {
    let event = new Event('gameFinished');
    window.dispatchEvent(event);
}