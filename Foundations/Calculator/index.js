function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    if (num2 === 0) {
        return "Can't divide by 0";
    }
    return num1 / num2;
}

function operate(operator, num1, num2) {
    switch (operator) {
        case '+': return add(num1, num2);
        case '-': return subtract(num1, num2);
        case '*': return multiply(num1, num2);
        case '/': return divide(num1, num2);
        default: return "Invalid operation";
    }
}

let currentInput = '';
let previousInput = '';
let operation = null;
const display = document.getElementById('display');

function updateDisplay() {
    display.textContent = currentInput || '0';
}

document.querySelectorAll('div > button').forEach(button => {
    button.addEventListener('click', () => {
        const btnValue = button.textContent;
        if ('0123456789'.includes(btnValue)) {
            currentInput += btnValue;
        } else if (btnValue === '.') {
            if (!currentInput.includes('.')) {
                currentInput += currentInput.length ? '.' : '0.';
            }
        } else if ('+-*/'.includes(btnValue)) {
            if (previousInput && currentInput && operation) {
                currentInput = String(operate(operation, parseFloat(previousInput), parseFloat(currentInput)));
            }
            previousInput = currentInput;
            operation = btnValue;
            currentInput = '';
        } else if (btnValue === '=') {
            if (previousInput && operation && currentInput) {
                currentInput = String(operate(operation, parseFloat(previousInput), parseFloat(currentInput)));
                previousInput = '';
                operation = null;
            }
        } else if (btnValue === 'clear') {
            currentInput = '';
            previousInput = '';
            operation = null;
        } else if (btnValue === '⌫') {
            currentInput = currentInput.slice(0, -1);
        }
        updateDisplay();
    });
});

// Keyboard support
document.addEventListener('keydown', (e) => {
    const keyMap = {
        '.': 'decimal',
        '+': 'add',
        '-': 'subtract',
        '*': 'multiply',
        '/': 'divide',
        'Enter': 'equal',
        'Backspace': 'backspace',
        'Escape': 'clear'
    };
    const key = e.key === 'Enter' ? '=' : e.key;
    const buttonId = keyMap[key] || key;
    const button = document.getElementById(buttonId);
    if (button) {
        button.click();
    }
});
