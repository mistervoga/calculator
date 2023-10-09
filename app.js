"use strict";

const display = document.querySelector(".display");
const numbers = document.querySelectorAll(".num");
const operators = document.querySelectorAll(".operator");
const equals = document.querySelector(".equals");
const clear = document.querySelector(".delete-all");
const decimal = document.querySelector(".decimal");

let firstOperand = ""; // Stores the first operand
let operator = null; // Stores the selected operator
let secondOperand = ""; // Stores the second operand

// Function to update the display
function updateDisplay() {
  display.value = firstOperand + (operator ? operator : "") + secondOperand;
}

// Function to handle number button clicks
numbers.forEach((number) => {
  number.addEventListener("click", function (e) {
    if (operator === null) {
      // If no operator is selected, update the first operand
      firstOperand += e.target.value;
    } else {
      // If an operator is selected, update the second operand
      secondOperand += e.target.value;
    }
    updateDisplay();
  });
});

// Function to handle operator button clicks
operators.forEach((operatorButton) => {
  operatorButton.addEventListener("click", function (e) {
    if (firstOperand !== "") {
      operator = e.target.value;
      updateDisplay();
    }
  });
});

// Function to handle the equals button click
equals.addEventListener("click", function () {
  if (firstOperand !== "" && secondOperand !== "") {
    // Perform the calculation and update the display
    firstOperand = String(
      operate(operator, parseFloat(firstOperand), parseFloat(secondOperand))
    );
    secondOperand = "";
    operator = null;
    updateDisplay();
  }
});

// Function to handle the AC (clear) button click
clear.addEventListener("click", function () {
  firstOperand = "";
  secondOperand = "";
  operator = null;
  updateDisplay();
});

// Function to handle the decimal button click
decimal.addEventListener("click", function () {
  if (operator === null) {
    if (!firstOperand.includes(".")) {
      firstOperand += ".";
    }
  } else {
    if (!secondOperand.includes(".")) {
      secondOperand += ".";
    }
  }
  updateDisplay();
});

// Arithmetic operations
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    return "Error"; // Handle division by zero
  }
  return a / b;
}

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
    default:
      return "Error"; // Handle invalid operator
  }
}
