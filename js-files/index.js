function add (a, b) {
  return a + b;
}

function subtract (a, b) {
  return a - b;
}

function multiply (a, b) {
  return a * b;
}

function divide (a, b) {
  return a / b;
}

let input1 = "";
let input2 = "";
let operation = "";

let one = document.querySelector("#one");
let two = document.querySelector("#two");
let three = document.querySelector("#three");
let four = document.querySelector("#four");
let five = document.querySelector("#five");
let six = document.querySelector("#six");
let seven = document.querySelector("#seven");
let eight = document.querySelector("#eight");
let nine = document.querySelector("#nine");
let multi = document.querySelector("#multiply");
let equal = document.querySelector("#equals");

// When user presses a number, store it in input1
// When user presses a operator, store/replace it in operator and store input1 in input2
  // If input2 is empty, then you're done
  // if input2 is already filled, then replace input2 with input1 OPERATION input2
