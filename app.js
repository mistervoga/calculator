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
let resultDisplayed = false;

// Function to update the display
function updateDisplay() {
  let displayedFirstOperand = firstOperand === "" ? "0" : firstOperand;
  let displayedSecondOperand = secondOperand === "" ? "" : secondOperand;

  // Ensure the first operand always has at least one digit before the decimal point
  if (displayedFirstOperand === "." || displayedFirstOperand === "-.") {
    displayedFirstOperand = "0" + displayedFirstOperand;
  }

  // Ensure the second operand always has at least one digit before the decimal point
  if (displayedSecondOperand === "." || displayedSecondOperand === "-.") {
    displayedSecondOperand = "0" + displayedSecondOperand;
  }

  display.value =
    displayedFirstOperand + (operator ? operator : "") + displayedSecondOperand;
}

// Function to handle number button clicks
numbers.forEach((number) => {
  number.addEventListener("click", function (e) {
    if (operator === null) {
      // If no operator is selected, update the first operand
      if (resultDisplayed) {
        // Reset the first operand if a result was displayed
        firstOperand = e.target.value;
        resultDisplayed = false;
      } else {
        firstOperand += e.target.value;
      }
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
    resultDisplayed = true; // Indicate that a result has been displayed
    updateDisplay();
  }
});

// Function to handle the AC (clear) button click
clear.addEventListener("click", function () {
  firstOperand = "";
  secondOperand = "";
  operator = null;
  resultDisplayed = false; // Reset the resultDisplayed flag
  updateDisplay();
});

// Function to handle the decimal button click
decimal.addEventListener("click", function () {
  if (operator === null) {
    if (!firstOperand.includes(".")) {
      firstOperand += firstOperand === "" ? "0." : ".";
    }
  } else {
    if (!secondOperand.includes(".")) {
      secondOperand += secondOperand === "" ? "0." : ".";
    }
  }
  updateDisplay();
});

// Function to handle keyboard input
document.addEventListener("keydown", function (event) {
  // Prevent default browser behavior for certain keys
  if (["/", "*", "+", "-", "Enter"].includes(event.key)) {
    event.preventDefault();
  }

  // Check if the key pressed is a number block key
  if (event.key >= "0" && event.key <= "9") {
    if (operator === null) {
      firstOperand += event.key;
    } else {
      secondOperand += event.key;
    }
    updateDisplay();
  } else if (["+", "-", "*", "/"].includes(event.key)) {
    operator = event.key;
    updateDisplay();
  } else if (event.key === "Enter") {
    handleEquals();
  }
});

// Function to handle the equals key
function handleEquals() {
  if (firstOperand !== "" && secondOperand !== "") {
    firstOperand = String(
      operate(operator, parseFloat(firstOperand), parseFloat(secondOperand))
    );
    secondOperand = "";
    operator = null;
    resultDisplayed = true;
    updateDisplay();
  }
}

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
