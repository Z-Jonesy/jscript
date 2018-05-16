// konstansok
const GRIDSIZE = 4;

// elemek összegyűjtése
let tableGrid = document.getElementById('grid');
let myElement = document.getElementById('cell1');
let cards = [];
let activeCards = [];


//feliratkoás
window.addEventListener('cardClick', OnCardClick);


// init
RenderGrid();


function RenderGrid() {
    tableGrid.innerHTML = '';

    // kártyaértékek összegyűjtése
    let cardValues = [];
    for (let valueIndex = 1; valueIndex <= GRIDSIZE * GRIDSIZE / 2; valueIndex++) {
        cardValues.push(valueIndex);
        cardValues.push(valueIndex);
    }
    shuffle(cardValues);


    // sorok
    let cardValueIndex = 0;
    for (let rowIndex = 0; rowIndex < GRIDSIZE; rowIndex++) {

        let newRow = document.createElement('tr');
        cards.push([]);

        for (let colIndex = 0; colIndex < GRIDSIZE; colIndex++) {
            let newCell = document.createElement('td');
            newCell.innerText = cardValues[cardValueIndex];
            newRow.appendChild(newCell);
            new Card(cardValues[cardValueIndex], newCell);
            cardValueIndex++;
        }
        tableGrid.appendChild(newRow);

    }
}


function shuffle(collection) {
    for (let index = collection.length - 1; index >= 0; index--) {
        let randomIndex = Math.round(Math.random() * index);


        let temp = collection[index];
        collection[index] = collection[randomIndex];
        collection[randomIndex] = temp;

    }
    return collection;
}

function OnCardClick(event) {
    let clickedCard = event.detail;
    activeCards.push(clickedCard);

    // ha két aktív kártyánk van
    if (activeCards.length > 2) {
        if (activeCards[0].value == activeCards[1]) {
            console.log('egyenlő');
            while (acrd = activeCards.pop()) {
                card.SetResolved();
            }

        } else {
            setTimeout(function () {
                while (card = activeCards.pop()) {
                    card.ToggleColor();
                }
            }, 1000);

        }
    }
}
