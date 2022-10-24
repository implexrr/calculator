// Assign unique variables to each button
let zero = document.querySelector("#zero");
let one = document.querySelector("#one");
let two = document.querySelector("#two");
let three = document.querySelector("#three");
let four = document.querySelector("#four");
let five = document.querySelector("#five");
let six = document.querySelector("#six");
let seven = document.querySelector("#seven");
let eight = document.querySelector("#eight");
let nine = document.querySelector("#nine");
let dot = document.querySelector("#dot");
let plus = document.querySelector("#plus");
let minus = document.querySelector("#minus");
let divide = document.querySelector("#divide");
let multiply = document.querySelector("#multiply");
let equal = document.querySelector("#equals");
let results = document.querySelector("#results");
let backspace = document.querySelector("#backspace");
let clear = document.querySelector("#clear");









// Template for objects of type calculator
class Calculator {

  constructor() {
    // Initialize everything
    this.initialize();
    
  }

  initialize (e) {
    console.log("Calculator initialized...");
    this.input1 = "";
    this.input2 = "";
    this.operator = "";
    this.result = "";
    this.lastOperationNumber = "";
    this.lastButtonEqual = false;
    this.lastButtonOperator = false;
    this.lastButtonNumber = false;
    this.input1DotPresent = false;
    this.input2DotPresent = false;
    this.input1Write = false;
    this.input2Write = false;
  }
  // Basic arithmetic functions
  add () {
    return (parseFloat(this.input1) + parseFloat(this.input2)).toString()
  }

  subtract () {
    return (parseFloat(this.input1) - parseFloat(this.input2)).toString()
  }

  multiply () {
    return (parseFloat(this.input1) * parseFloat(this.input2)).toString()
  }

  divide () {
    return (parseFloat(this.input1) / parseFloat(this.input2)).toString()
  }

  // Change operator value
  addOperator(operator) {
    this.operator = operator;
  }

  // Preform operation (based on operator value)
  preformOperation () {
    switch (this.operator) {
      case "+": return this.add();
      case "-": return this.subtract();
      case "×": return this.multiply();
      case "÷": return this.divide();
    }
  }

  writeInput1 (e) {
    this.input1 = this.input1.concat(e.target.textContent).slice(0,8);
    results.textContent = this.input1;
    this.input1Write = true;
    this.input2Write = false;
  }

  writeInput2 (e) {
    this.input2 = this.input2.concat(e.target.textContent).slice(0,8);
    results.textContent = this.input2;
    this.input1Write = false;
    this.input2Write = true;
  }

  boundRecord = this.record.bind(this); // Allows the record method to be used outside of the class, more info @https://alephnode.io/07-event-handler-binding/
  record (e) {
    // If last button was "equals", the operation must have completed already, so we reset everything
    if (this.lastButtonEqual == true) {
      if (e.target.textContent == ".") return; // Except when there's a "." -- in this case, do nothing

      // Reset everything
      this.initialize(e);

      // Write into input1
      this.writeInput1(e);

    } 
    // If input1 is empty
    else if (this.input1 == "") {
      if (e.target.textContent == ".") return; // Do nothing if user input is "."
      
      // Write user input into input1, display input1 on results window for calculator
      this.writeInput1(e);
    }

    else {

      // If input1 is non-empty, but operator is empty
      if (this.operator == "") {

        // Dot handling process
        if ((e.target.textContent == ".") && (this.input1DotPresent == true)) return;  // Do nothing if user input is "." and dot is present in input1 string already
        if (e.target.textContent == ".") this.input1DotPresent = true;                // If dot not already present, change state of "dot present" to true
        if (e.target.textContent == "0" && parseFloat(this.input1) == 0 && this.input1DotPresent == false) return; // Zero handler
        // Record user input, extend input1 string and display on results window for calculator

        this.writeInput1 (e);
      }
      
      // Input1, operator both nonempty, but input2 is empty
      else if (this.input2 == "") {
        if (e.target.textContent == ".") return; // Do nothing if user input is "."
        // Write user input into input2, display input2 on results window for calculator
        this.writeInput2(e)
      }

      // Input1, operator, and input2 all nonempty
      else {
      // We want to extend input2 string
      // Dot handling process
      if ((e.target.textContent == ".") && (this.input2DotPresent == true)) return;  // Do nothing if user input is "." and dot is present in input2 string already
      if (e.target.textContent == ".") this.input2DotPresent = true;                // If dot not already present, change state of "dot present" to true
      if (e.target.textContent == "0" && parseFloat(this.input2) == 0 && this.input2DotPresent == false) return; // Zero handler

      // Record user input, extend input2 string and display on results window for calculator
      this.writeInput2(e);
      }
    }
    this.lastButtonOperator = false;
    this.lastButtonEqual = false;
    this.lastButtonNumber = true;
    // DEBUGGING STATEMENT
    console.log(this);
  }

  boundPrepOperator = this.prepOperator.bind(this);
  prepOperator (e) {
    // Either just the operator changes
    // Or the the operator changes and so do the inputs
    // Or nothing happens at all

    // Nothing happens at all (if there are no inputs)
    if (this.input1 == "" && this.input2 == "") return;

    // Add operator (or change oeprator, which only happens if last button was operator)
    else if ((this.input1 == "" && this.input2 != "") || (this.input1 != "" && this.input2 == "") || this.lastButtonOperator == true) {
      this.operator = e.target.textContent;
      this.lastButtonOperator = true;
    }

    // Continue operation (operator present, all inputs filled)
    else if (this.input1 != "" && this.input2 != "" && this.lastButtonNumber == true) {

      // Division by zero handler
      if ((this.operator == "÷") && (this.input2 == "0")) {
        alert("Can't divide by zero!");
        return;
      }
      this.result = this.preformOperation(this.input1, this.input2);

      // Limit handler
      if (this.result >= 99999999) this.result = "99999999";
      else if (this.result <= -9999999) this.result = "-9999999";
      else if ((this.result <= 6.25e-8) && (this.result >= 0)) this.result = "0";
      this.result = this.result.slice(0,8);
      results.textContent = this.result;
      this.input1 = this.result;
      this.input2 = "";
      this.operator = e.target.textContent;
    }




    // Prep new operation (after equals is pressed)
    else if (this.lastButtonEqual == true) {
      this.input1 = this.result;
      this.input2 = "";
      this.operator = e.target.textContent;
    }

    this.lastButtonOperator = true;
    this.lastButtonEqual = false;
    this.lastButtonNumber = false;
    return;
  }
  
  boundEquals = this.equals.bind(this);
  equals (e) {

    if (this.operator == "" || this.lastButtonOperator == true) return; // If operator is empty or user just pressed operator, nothing todo
    if (this.input2 == "" && this.lastOperationNumber == "") return // No inputs to work with, otherwise would return NaN

    // If both inputs are full, we should preform the relevant operation
    else if (this.input1 != "" && this.input2 != "") {
      // Division by zero handler
      if ((this.operator == "÷") && (this.input2 == "0")) {
        alert("Can't divide by zero!");
        return;
      }
      this.result = this.preformOperation(this.input1, this.input2);
      // Limit handler
      if (this.result >= 99999999) this.result = "99999999";
      else if (this.result <= -9999999) this.result = "-9999999";
      else if ((this.result <= 6.25e-8) && (this.result >= 0)) this.result = "0";
      this.result = this.result.slice(0,8);
      results.textContent = this.result;
      this.input1 = this.result;
      this.lastOperationNumber = this.input2
      this.input2 = "";
    }

    // If the last button was "equals", then we simply continue the operation
    else if (this.lastButtonEqual == true) {
      this.input2 = this.lastOperationNumber;
      this.result = this.preformOperation(this.input1, this.input2);
      // Limit handler
      if (this.result >= 99999999) this.result = "99999999";
      else if (this.result <= -9999999) this.result = "-9999999";
      else if ((this.result <= 6.25e-8) && (this.result >= 0)) this.result = "0";
      this.result = this.result.slice(0,8);
      results.textContent = this.result;
      this.input1 = this.result;
      this.input2 = "";
    }



    this.lastButtonOperator = false;
    this.lastButtonEqual = true;
    this.lastButtonNumber = false;
  }

  boundBackspace = this.backspace.bind(this);
  backspace (e) {
    // I WAS HERE
    if (this.lastButtonNumber != true) return;
    if (this.input2Write == true) {
      console.log("erasing input2");
      this.input2 = this.input2.slice(0,-1);
      results.textContent = this.input2;
    }
    else if (this.input1Write == true) {
      console.log("erasing input1");
      this.input1 = this.input1.slice(0,-1);
      results.textContent = this.input1;
    }
  }

  boundClear = this.clear.bind(this);

  clear (e) {
    // Reset everything
    this.input1 = "";
    this.input2 = "";
    this.operator = "";
    this.result = "";
    this.lastOperationNumber = "";
    this.lastButtonEqual = false;
    this.lastButtonOperator = false;
    this.lastButtonNumber = false;
    this.input1DotPresent = false;
    this.input2DotPresent = false;
    this.input1Write = false;
    this.input2Write = false;
    results.textContent = "";
  }



}








// Create new calculator object
let calculator = new Calculator();


// Add "Record" functionality from Calculator class onto all buttons with html class="number"
let numbers = document.querySelectorAll('.number');
for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener('click', calculator.boundRecord);
}

let operators = document.querySelectorAll('.operator');
for (let i = 0; i < operators.length; i++) {
  operators[i].addEventListener('click', calculator.boundPrepOperator);
}

equal.addEventListener('click', calculator.boundEquals);

backspace.addEventListener('click', calculator.boundBackspace);

clear.addEventListener('click', calculator.boundClear);


document.addEventListener('keydown', (e) => {

  let name = e.key;
  console.log(e.key);

  // TODO convert e.key from string to variable in a better way
  switch (name) {
    case "1": one.click(); break;
    case "2": two.click(); break;
    case "3": three.click(); break;
    case "4": four.click(); break;
    case "5": five.click(); break;
    case "6": six.click(); break;
    case "7": seven.click(); break;
    case "8": eight.click(); break;
    case "9": nine.click(); break;
    case "0": zero.click(); break;
    case ".": dot.click(); break;
    case "Backspace": backspace.click(); break;
    case "c": clear.click(); break;
    case "Enter": equal.click(); break;
    case "+": plus.click(); break;
    case "-": minus.click(); break;
    case "*": multiply.click(); break;
    case "/": divide.click(); break;
  }

});