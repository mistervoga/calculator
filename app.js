"use strict";

const add = (a, b) => a + b;
const substract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

function operate(operator, a, b) {
    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return substract(a, b);
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

let first = 0;
let second = 0;
let values = [];
let joinedvalues = [];
let onlyoperator = false;

numbers.forEach(number =>
    number.addEventListener("click", function(e) {
        first = e.target.textContent;
        values.push(first);
        console.log(values);
        joinedvalues = values.join("");
        console.log(joinedvalues);
        display.value += e.target.textContent;
    })
);

operators.forEach(operator =>
    operator.addEventListener("click", function(e) {
        if (!isNaN(display.value)) {
            display.value += e.target.value;
            onlyoperator = true;
            values.push(e.target.textContent);
            console.log(values);
        }

        if (onlyoperator == true) {
            return;
        }
    })
);

let result = 0;

equals.addEventListener("click", function(e) {
    console.log(joinedvalues.length);
    for (let i = 0; i < joinedvalues.length; i++) {
        if (joinedvalues[i].includes("-")) {
            let op = joinedvalues[i];
            first = joinedvalues.slice(0, i);
            console.log(first);
            console.log(op);
            second = joinedvalues.slice(i + 1, joinedvalues.length);
            console.log(second);
            result = operate(op, first, second);
            display.value = "" + result;
        }
        if (joinedvalues[i].includes("/")) {
            let op = joinedvalues[i];
            first = joinedvalues.slice(0, i);
            console.log(first);
            console.log(op);
            second = joinedvalues.slice(i + 1, joinedvalues.length);
            console.log(second);
            result = operate(op, first, second);
            display.value = "" + result;
        }
        if (joinedvalues[i].includes("*")) {
            let op = joinedvalues[i];
            first = joinedvalues.slice(0, i);
            console.log(first);
            console.log(op);
            second = joinedvalues.slice(i + 1, joinedvalues.length);
            console.log(second);
            result = operate(op, first, second);
            display.value = "" + result;
        }
        if (joinedvalues[i].includes("+")) {
            let op = joinedvalues[i];
            first = joinedvalues.slice(0, i);
            console.log(first);
            console.log(op);
            second = joinedvalues.slice(i + 1, joinedvalues.length);
            console.log(second);
            result = operate(op, parseFloat(first), parseFloat(second));
            display.value = "" + result;
        }
    }
});

clear.addEventListener("click", function() {
    display.value = "";
    joinedvalues.length == 0;
    values.length = 0;
});