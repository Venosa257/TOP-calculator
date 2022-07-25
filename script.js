// yeah, i don't know
// variable
const numberBtn = document.querySelectorAll(".number");
const operatorBtn = document.querySelectorAll(".operator");
const mainDisplay = document.querySelector("#bot-display");
const resultDisplay = document.querySelector("#top-display");
const backBtn = document.querySelector("#back");
const clearBtn = document.querySelector("#clear");
const equalBtn = document.querySelector("#equal");
const decimal = document.querySelector("#dot");
const negativeBtn = document.querySelector("#turnNegative");

let haveOperator = false;
let previousValue = "";
let currentValue = "";
let operators = "";
let display = "";
let result = "";
let isDecimal = false;

// event listener
negativeBtn.onclick = () => turnNegative();
backBtn.onclick = () => back();
equalBtn.onclick = () => operate(equalBtn.innerHTML);
clearBtn.onclick = () => clear();

numberBtn.forEach((number) => {
  number.onclick = () => showDisplay(number.innerHTML);
});
operatorBtn.forEach((operator) => {
  operator.onclick = () => {
    if (previousValue != "") {
      showDisplay(operator.innerHTML);
      operate(operator.innerHTML);
      result = "";
    }
  };
});
decimal.onclick = () => {
  if (isDecimal == false && haveOperator == false)
    showDisplay(decimal.innerHTML);
  if (isDecimal == false && haveOperator == true)
    showDisplay(decimal.innerHTML);
  isDecimal = true;
};
// show the number or operator on display
function showDisplay(e) {
  if (e == undefined) return;
  mainDisplay.innerHTML += e;
  if (operators == "") resultDisplay.innerHTML = "";
  if (e != "+" && e != "-" && e != "x" && e != "/" && haveOperator == false)
    previousValue += e;
  if (
    e != "+" &&
    e != "-" &&
    e != "x" &&
    e != "/" &&
    haveOperator == true &&
    operators != ""
  )
    currentValue += e;

  if (
    operators == "" &&
    result !== "" &&
    e != "+" &&
    e != "-" &&
    e != "x" &&
    e != "/"
  ) {
    resultDisplay.innerHTML = "";
    previousValue = e;
    result = "";
  }
}

function operate(operator) {
  haveOperator = true;
  if (currentValue.length != 0 && haveOperator == true) findOperator(operator);
  if (haveOperator == true && currentValue === "" && operator != "=")
    changeOperator(operator);
  isDecimal = false;
}

// arithmetic
function findOperator(operator) {
  if (operators == "+" && currentValue != "")
    currentValue = add(previousValue, currentValue);
  if (operators == "-" && currentValue != "")
    currentValue = subtract(previousValue, currentValue);
  if (operators == "x" && currentValue != "")
    currentValue = multiply(previousValue, currentValue);
  if (operators == "/" && currentValue != "")
    currentValue = divide(previousValue, currentValue);
  if (operator == "=") clickEqual();
  if (operator != "=") replaceDisplay(operator);
}

function replaceDisplay(operator) {
  result = currentValue;
  resultDisplay.innerHTML = result;
  resultDisplay.innerHTML += operator;
  previousValue = result;
  currentValue = "";
  mainDisplay.innerHTML = "";
}
// change the operator if another one is clicked
function changeOperator(operator) {
  operators = operator;
  resultDisplay.innerHTML = previousValue + operators;
  mainDisplay.innerHTML = "";
  currentValue = "";
}
// equal button is clicked
function clickEqual() {
  operators = "";
  result = currentValue;
  resultDisplay.innerHTML = result;
  previousValue = result;
  currentValue = "";
  mainDisplay.innerHTML = "";
  haveOperator = false;
}
// clear the calculator
function clear() {
  haveOperator = false;
  previousValue = "";
  currentValue = "";
  operators = "";
  display = "";
  result = "";
  mainDisplay.innerHTML = "";
  resultDisplay.innerHTML = "";
  isDecimal = false;
}
// the backspace button is pressed
function back() {
  // backspace for negative number
  if (previousValue < 0 && haveOperator == false) {
    previousValue = "";
    mainDisplay.innerHTML = "";
    resultDisplay.innerHTML = "";
    isDecimal = false;
  }
  if (currentValue < 0 && haveOperator == true) {
    currentValue = "";
    mainDisplay.innerHTML = "";
    isDecimal = false;
  }

  // backspace for positive number
  if (haveOperator == false && currentValue == "")
    previousValue = previousValue.slice(0, -1);
  if (haveOperator == true && currentValue == "") {
    operators = operators.slice(0, -1);
    haveOperator = false;
  }
  if (haveOperator == true && currentValue != "")
    currentValue = currentValue.slice(0, -1);

  // backspace for the display
  if (mainDisplay.innerHTML != "" && resultDisplay.innerHTML == "")
    mainDisplay.innerHTML = mainDisplay.innerHTML.slice(0, -1);
  if (mainDisplay.innerHTML != "" && resultDisplay.innerHTML != "")
    mainDisplay.innerHTML = mainDisplay.innerHTML.slice(0, -1);

  if (resultDisplay.innerHTML != "" && mainDisplay.innerHTML == "") {
    resultDisplay.innerHTML = resultDisplay.innerHTML.slice(0, -1);
    previousValue = resultDisplay.innerHTML;
  }
}

// turn the number into negative if positive and vice versa
function turnNegative() {
  if (previousValue == "" && haveOperator == false) return;
  if (haveOperator == false && currentValue == "") {
    previousValue *= -1;
    mainDisplay.innerHTML = previousValue;
  }
  if (currentValue != "") {
    currentValue *= -1;
    mainDisplay.innerHTML = currentValue;
  }
  if (haveOperator == false && previousValue != "")
    resultDisplay.innerHTML = "";
}

function add(a, b) {
  num1 = parseFloat(a);
  num2 = parseFloat(b);
  isDecimal = false;
  return num1 + num2;
}

function subtract(a, b) {
  num1 = parseFloat(a);
  num2 = parseFloat(b);
  isDecimal = false;
  return num1 - num2;
}

function divide(a, b) {
  num1 = parseFloat(a);
  num2 = parseFloat(b);
  isDecimal = false;
  return num1 / num2;
}

function multiply(a, b) {
  num1 = parseFloat(a);
  num2 = parseFloat(b);
  isDecimal = false;
  return num1 * num2;
}

// keyboard support
document.addEventListener("keydown", (event) => {
  if (event.key == "+") {
    document.getElementById("+").click();
  }
  if (event.key == "-") {
    document.getElementById("-").click();
  }
  if (event.key == "x") {
    document.getElementById("x").click();
  }
  if (event.key == "/") {
    document.getElementById("/").click();
  }
  if (event.key == "Enter") {
    equalBtn.click();
  }
  if (event.key == ".") {
    decimal.click();
  }
  if (event.key == "Backspace") {
    backBtn.click();
  }
  if (event.key == "c") {
    clearBtn.click();
  }
  if (event.key == "t") {
    negativeBtn.click();
  }
  for (let i = 0; i < numberBtn.length; i++) {
    if (event.key == i) {
      document.getElementById(i).click();
    }
  }
});

alert("press t to turn number to negative and vice versa");
