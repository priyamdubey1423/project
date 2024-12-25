const display = document.getElementById('display');
const buttons = document.querySelectorAll('.calculator button');

let currentInput = '';
let previousInput = '';
let operator = null;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (value === 'RESET') {
            currentInput = '';
            previousInput = '';
            operator = null;
            display.textContent = '0';
        } else if (value === 'DEL') {
            currentInput = currentInput.slice(0, -1);
            display.textContent = currentInput || '0';
        } else if (['+', '-', 'x', '/'].includes(value)) {
            operator = value === 'x' ? '*' : value;
            if (currentInput !== '') {
                previousInput += currentInput + ' ' + operator + ' ';
                display.textContent = previousInput;
                currentInput = '';
            }
        } else if (value === '=') {
            if (operator && previousInput !== '' && currentInput !== '') {
                previousInput += currentInput;
                currentInput = eval(previousInput.replace(/x/g, '*'));
                display.textContent = currentInput;
                operator = null;
                previousInput = '';
            }
        } else {
            currentInput += value;
            display.textContent = previousInput + currentInput;
        }
    });
});
