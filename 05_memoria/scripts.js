// konstansok
const GRIDSIZE = 4;

// elemek összegyűjtése
let tableGrid = document.getElementById('grid');


//feliratkoás
window.addEventListener('cardClick', function(){
    let clickedCard = event.detail;
    setTimeout(clickedCard.ToggleColor, 2000);
    console.log(clickedCard);
});


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
    console.log(cardValues);
    shuffle(cardValues);
    

    // sorok
    let cardValueIndex = 0;
    for (let rowIndex = 0; rowIndex < GRIDSIZE; rowIndex++) {

        let newRow = document.createElement('tr');

        for (let colIndex = 0; colIndex < GRIDSIZE; colIndex++) {
            let newCell = document.createElement('td');
            newCell.innerText = cardValues[cardValueIndex];
            newCell.innerText = rowIndex + ':' + colIndex;
            newRow.appendChild(newCell);
            new Card(cardValues[cardValueIndex], newCell);
            cardValueIndex++;
        }
        tableGrid.appendChild(newRow);

    }


    function shuffle(collection) {
        for (let index = collection.length - 1; index >= 0; index--) {
            let randomIndex = Math.round(Math.random() * index);
            console.log(index);

            let temp = collection[index];
            collection[index] = collection[randomIndex];
            collection[randomIndex] = temp;

        }
        return collection;
    }

}