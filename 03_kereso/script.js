// elemek összegyűjtése

let inputNameFilter = document.getElementById('nameFilter');
let resultList = document.getElementById('resultList');

// változók
let nameFilter = '';
let itemList = [
    'Raging bull',
    'Aliens',
    'Reservoir dogs',
    'Wall - e',
    'The tresor of sierra madre',
    'Whiplash',
    'Some like it hot',
    'Double indemnity',
    'Taxi driver',
    'Vertigo',
    'On the waterfront',
    'Saving private ryan',
    'Inception',
    'The lord of the rings',
    'The silence of the lambs',
];

// elemek rendezése
itemList.sort(function (a, b) {
    return a.localeCompare(b);
});

// feliratkozás
inputNameFilter.addEventListener('keyup', OnInputKeyup);

// init
RenderList();

// render list
function RenderList() {
    resultList.innerText = '';
    console.clear();

    let filteredItemList = itemList.filter(function (item, index) {
        let lowerCaseItem = item.toLowerCase();
        let lowerCaseNameFilter = nameFilter.toLowerCase();
        let position = lowerCaseItem.indexOf(lowerCaseNameFilter);

        return !(position == -1);

    });

    filteredItemList.forEach(function (item, index) {
        RenderListItem(item);
        console.log(item, index);
    });
}

function RenderListItem(text) {
    let newListItem = document.createElement('li');
    newListItem.innerText = text;
    resultList.appendChild(newListItem);
}

function OnInputKeyup() {
    nameFilter = inputNameFilter.value;
    RenderList();
}
