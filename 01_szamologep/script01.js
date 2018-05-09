// álalános változók

let number1 = null;
let number2 = null;
let operand = null;

// konstansok
const STATUS_FIRSTNUM = 'firstnum',
    STATUS_OPERAND = 'operand',
    STATUS_SECONDNUM = 'secondnum',
    STATUS_DONE = 'done';

// elemek összegyűjtése


// kijelzők
let displayNumber1 = document.getElementById('displayNumber1');
let displayNumber2 = document.getElementById('displayNumber2');
let displayOperand = document.getElementById('displayOperand');

console.log(displayNumber1, displayNumber2, displayOperand);


// számok
let button0 = document.getElementById('button0');
let button1 = document.getElementById('button1');
let button2 = document.getElementById('button2');
let button3 = document.getElementById('button3');
let button4 = document.getElementById('button4');
let button5 = document.getElementById('button5');
let button6 = document.getElementById('button6');
let button7 = document.getElementById('button7');
let button8 = document.getElementById('button8');
let button9 = document.getElementById('button9');


// műveletek
let buttonAdd = document.getElementById('buttonAdd');
let buttonMinus = document.getElementById('buttonMinus');
let buttonTimes = document.getElementById('buttonTimes');
let buttonDivide = document.getElementById('buttonDivide');
let buttonEquals = document.getElementById('buttonEquals');

// feliratkozás
button0.addEventListener('click', OnNumberClick);
button1.addEventListener('click', OnNumberClick);
button2.addEventListener('click', OnNumberClick);
button3.addEventListener('click', OnNumberClick);
button4.addEventListener('click', OnNumberClick);
button5.addEventListener('click', OnNumberClick);
button6.addEventListener('click', OnNumberClick);
button7.addEventListener('click', OnNumberClick);
button8.addEventListener('click', OnNumberClick);
button9.addEventListener('click', OnNumberClick);

buttonAdd.addEventListener('click', OnOperandClick);
buttonMinus.addEventListener('click', OnOperandClick);
buttonTimes.addEventListener('click', OnOperandClick);
buttonDivide.addEventListener('click', OnOperandClick);
buttonEquals.addEventListener('click', OnOperandClick);


// gombnyomásra reagálás

function OnNumberClick() {
    let currentButton = this;
    let currentButton = +currentButton.innerText;

    switch (status) {
        case STATUS_FIRSTNUM:
            SetNumber1(number1 * 10 + currentNumber);
            break;

        case STATUS_OPERAND:
            SetNumber2(number2 * 10 + currentNumber);
            status = STATUS_SECONDNUM;
            break;

        case STATUS_SECONDNUM:
            SetNumber2(number2 * 10 + currentNumber);
            break;

        case STATUS_DONE:
            status = STATUS_FIRSTNUM;
            SetNumber1(currentNumber);
    }
}

function OnOperandClick() {
    let currentButton = this;
    let currentOperand = currentButton.innerText;

    switch (status) {
        case STATUS_FIRSTNUM:
            // ha egyenlőségjel,, akkor továbbmegyünk
            if (currentOperand == '=') {
                break;
            }
            SetOperand(currentOperand);
            status = STATUS_OPERAND
            break;
        case STATUS_OPERAND:
            // ha egyenlőségjel,, akkor továbbmegyünk
            if (currentOperand == '=') {
                break;
            }
            SetOperand(currentOperand);
            break;
        case STATUS_SECONDNUM:
            // eddigi művelet elvégzése
            let result = eval(number1 + operand + number2);
            result = Math.round(result * 10000) / 10000;
            SetNumber1(result);
            // új művelet összegyűjtése
            SetNumber2(null);

            if (currentOperand == '=') {
                status = STATUS_DONE;
                SetOperand(null);
            } else {
                status = STATUS_OPERAND
                SetOperand(currentOperand);
            }

            break;

        case STATUS_DONE:
            status = STATUS_OPERAND
            SetOperand(currentOperand);
            break;
    }
}


// értékbeállító függvények
function SetNumber1(value) {
    number1 = value;
    displayNumber1.innerText = value;
}

function SetNumber2(value) {
    number2 = value;
    displayNumber2.innerText = value;
}

function SetOperand(value) {
    operand = value;
    displayOperand.innerText = value;
}