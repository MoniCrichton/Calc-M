// Seleccionar elementos del DOM
const calculator = document.querySelector('.calculator');
const keys = calculator.querySelector('.calculator__keys');
const display = calculator.querySelector('.calculator__display');

// Variables para el cálculo
let firstValue = null;
let operator = null;
let awaitingNextOperand = false;

// Función para realizar cálculos
const calculate = (n1, operator, n2) => {
    let result = '';

    const num1 = parseFloat(n1);
    const num2 = parseFloat(n2);

    if (operator === 'add') {
        result = num1 + num2;
    } else if (operator === 'subtract') {
        result = num1 - num2;
    } else if (operator === 'multiply') {
        result = num1 * num2;
    } else if (operator === 'divide') {
        if (num2 === 0) {
            return 'Error';
        }
        result = num1 / num2;
    }

    return result.toString();
}

// Event listener para los botones
keys.addEventListener('click', (e) => {
    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;
        const keyContent = key.textContent;
        const displayedNum = display.textContent;

        if (!action) {
            // Manejar la entrada de dígitos numéricos
            if (awaitingNextOperand) {
                display.textContent = keyContent;
                awaitingNextOperand = false;
            } else {
                display.textContent =
                    displayedNum === '0' ? keyContent : displayedNum + keyContent;
            }
        } else {
            // Manejar las acciones (operadores y otros)
            if (
                action === 'add' || 
                action === 'subtract' ||
                action === 'multiply' ||
                action === 'divide' 
            ) {
                // Realizar cálculos si ya hay un primer valor y un operador
                if (firstValue === null) {
                    firstValue = displayedNum;
                } else if (operator) {
                    const result = calculate(firstValue, operator, displayedNum);
                    display.textContent = result;
                    firstValue = result;
                }
                operator = action;
                awaitingNextOperand = true;
            } else if (action === 'decimal') {
                // Manejar la entrada de punto decimal
                display.textContent = displayedNum + '.';
            } else if (action === 'clear') {
                // Lógica para el botón "C" (Limpiar)
                display.textContent = '0'; // Restablecer el valor a cero
                firstValue = null;
                operator = null;
                awaitingNextOperand = false;
            } else if (action === 'calculate') {
                // Realizar el cálculo final
                if (firstValue !== null && operator) {
                    display.textContent = calculate(firstValue, operator, displayedNum);
                    firstValue = null;
                    operator = null;
                    awaitingNextOperand = true;
                }
            } else if (action === 'squareRoot') {
                // Lógica para el botón "√" (Raíz cuadrada)
                const result = Math.sqrt(parseFloat(displayedNum));
                display.textContent = result;
            } else if (action === 'percentage') {
                // Lógica para el botón "%" (Porcentaje)
                const result = (parseFloat(displayedNum) / 100).toString();
                display.textContent = result;
            }
        }

        // Quitar la clase .is-depressed de todos los botones
        Array.from(key.parentNode.children).forEach(k =>
            k.classList.remove('is-depressed'))
    }
});
