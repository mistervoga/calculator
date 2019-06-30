const add = (a, b) => a + b;
const substract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate(operator, a, b) {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
    }
}
const display = document.querySelector("input");
const numbers = document.querySelectorAll(".num");
const equals = document.querySelector(".equals");
const clear = document.querySelector(".delete-all");
const operators = document.querySelectorAll(".operator");
const decimal = document.querySelector(".decimal");

const operands = [];
const operator = [];
const firstOperand = undefined;
const onlyoperator = false;

numbers.forEach(number =>
    number.addEventListener("click", e => {
        if (operator.length > 0) {
            display.value += e.target.value;
            operands.splice(1, display.value.length - 1, display.value);
        }
        display.value += e.target.value;
        operands.splice(0, display.value.length - 1, display.value);
    })
);

operators.forEach(operator =>
    operator.addEventListener("click", e => {
        if (!isNaN(display.value)) {
            display.value += e.target.value;
            onlyoperator = true;
            operator.push(display.value);
        }

        if (onlyoperator == true) {
            return;
        }
        alert(operands.length);
        alert(operator)
    })
);

equals.addEventListener("click", e => {
    if (operands.length == 2 && operator.length == 1) {}
});