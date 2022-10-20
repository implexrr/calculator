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
let prevInput = "";
let operator = "";
let prevEqual = false;


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
let results = document.querySelector("#results")

// When user presses a number, store it in input1
// When user presses a operator, store/replace it in operator and store input1 in input2
  // If input2 is empty, then you're done
  // if input2 is already filled, then replace input2 with input1 OPERATION input2

let numbers = document.querySelectorAll('.number');
for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener('click', record);
}

function record (e) {
  if (prevEqual == true) {
    deleteAll();
    input1 = e.target.textContent;
  }
  else {
    input1 = input1.toString().concat(e.target.textContent);
  }
  console.log(`input1 is ${input1}, input2 is ${input2}, operator is ${operator}`);
  results.textContent = input1;
}

let operations = document.querySelectorAll(".operator");
for (let i = 0; i < operations.length; i++) {
  operations[i].addEventListener('click', prepareOperation)
  operations[i].addEventListener("click", (e) => {prevEqual = false;});
} 

function prepareOperation (e) {
  if (input1 == "" && input2 == "") {
    return;
  }
  if (input2 == "" && input1 != "") {
    input2 = input1;
    input1 = ""
    operator = e.target.textContent;
    console.log(`input1 is ${input1}, input2 is ${input2}, operator is ${operator}`);
  }
  else if (input2 != "" && input1 == "") {
    console.log(`Before new operator: input1 is ${input1}, input2 is ${input2}, operator is ${operator}`);
    operator = e.target.textContent;
    console.log(`After new operator: input1 is ${input1}, input2 is ${input2}, operator is ${operator}`);
  }
  else {
    console.log(`Before new operator: input1 is ${input1}, input2 is ${input2}, operator is ${operator}`);
    input2 = evaluate();
    operator = e.target.textContent;
    console.log(`After new operator: input1 is ${input1}, input2 is ${input2}, operator is ${operator}`);
  }
}

let equalButton = document.querySelector("#equals");

equalButton.addEventListener("click", evaluate);
equalButton.addEventListener("click", (e) => {prevEqual = true});

function evaluate (e) {
  if (input1 != "") {
    prevInput = input1;
  }

  console.log(`Before operation: input1 is ${input1}, input2 is ${input2}, prev is ${prevInput} operator is ${operator}`);

  if (input1 == "") {
    if (input2 == "") {
      console.log("nothing here pal")
      return;
    }
    else {
      input1 = parseFloat(input1);
      input2 = parseFloat(input2);
      prevInput = parseFloat(prevInput);
      switch (operator) {
        case "×": input2 = multiply(input2, prevInput); break;
        case "+": input2 = add(input2, prevInput); break;
        case "-": input2 = subtract(input2, prevInput); break;
        case "÷": input2 = divide(input2, prevInput); break;
      }
      input2 = input2.toString();
      prevInput = prevInput.toString();
      input1 = "";
      console.log(`After operation: input1 is ${input1}, input2 is ${input2}, prev is ${prevInput} operator is ${operator}`);
      results.textContent = input2;
      return input2;
    }
  }



  input1 = parseFloat(input1);
  input2 = parseFloat(input2);
  prevInput = parseFloat(prevInput);
  switch (operator) {
    case "×": input2 = multiply(input2, input1); break;
    case "+": input2 = add(input2, input1); break;
    case "-": input2 = subtract(input2, input1); break;
    case "÷": input2 = divide(input2, input1); break;
  }
  input2 = input2.toString();
  prevInput = prevInput.toString();
  input1 = "";
  console.log(`After operation: input1 is ${input1}, input2 is ${input2}, prev is ${prevInput} operator is ${operator}`);
  results.textContent = input2;
  return input2;
}

let clear = document.querySelector("#clear");
let backspace = document.querySelector("#backspace");

clear.addEventListener("click", deleteAll);

function deleteAll (e) {
  input1 = "";
  input2 = "";
  operator = "";
  console.log(`input1 is ${input1}, input2 is ${input2}, operator is ${operator}`);
  results.textContent = 0;
}

backspace.addEventListener("click", deleteLast);

function deleteLast (e) {
  input1 = input1.slice(0,-1);
  console.log(`input1 is now ${input1}`);
  results.textContent = input1;
}