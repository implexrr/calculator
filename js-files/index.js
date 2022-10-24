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

  boundInitialize = this.initialize.bind(this);
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
    results.textContent = "";
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

  // See if input1 already has a dot, if it does then do nothing, otherwise concatenate dot to input1
  checkInput1DuplicateDot(e) {
    if (e.target.textContent == ".") {
      if (this.input1DotPresent == true) {
        return true;
      }
      else {
        this.input1DotPresent = true;
        return false;
      }
    }
  }

  // See if input2 already has a dot, if it does then do nothing, otherwise concatenate dot to input2
  checkInput2DuplicateDot(e) {
    if (e.target.textContent == ".") {
      if (this.input2DotPresent == true) {
        return true;
      }
      else {
        this.input2DotPresent = true;
        return false;
      }
    }
  }

  setLastButton (whichButton) {
    this.lastButtonEqual = false;
    this.lastButtonOperator = false;
    this.lastButtonNumber = false;
    console.log(whichButton);
    switch (whichButton) {
      case "operator": this.lastButtonOperator = true; break;
      case "equal": this.lastButtonEqual = true; break;
      case "number": this.lastButtonNumber = true; break;
    }
  }

  limitCheck (e) {
    if (this.result >= 99999999) this.result = "99999999";
    else if (this.result <= -9999999) this.result = "-9999999";
    else if ((this.result <= 6.25e-8) && (this.result >= 0)) this.result = "0";
  }

  leadingZeros(e, currentValue, dotState) {
    if (e.target.textContent == "0" && parseFloat(currentValue) == 0 && dotState == false) return true;
  }

  bothInputsEmpty(e) { return (this.input1 == "" && this.input2 == "" ? true : false); }
  bothInputsFull(e) { return (this.input1 != "" && this.input2 != "" ? true : false); }
  inputsHalfFull(e) { return (((this.input1 == "" && this.input2 != "") || (this.input1 != "" && this.input2 == "")) ? true : false)}
  sliceResult(e) {
    this.result = this.result.slice(0,8);
    results.textContent = this.result;
  }


  prepareNewOperation(e) {
    this.input1 = this.result;
    this.input2 = "";
    this.operator = e.target.textContent;
  }
  
  isZeroDiv(e) { return ((this.operator == "÷") && (this.input2 == "0") ? true : false) }


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
        if (this.checkInput1DuplicateDot(e)) return;

        // Zero handler
        if (this.leadingZeros(e, this.input1, this.input1DotPresent)) return;

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
      if (this.checkInput2DuplicateDot(e)) return;

      // Zero handler
      if (this.leadingZeros(e, this.input2, this.input2DotPresent)) return;
      

      // Record user input, extend input2 string and display on results window for calculator
      this.writeInput2(e);
      }
    }

    this.setLastButton("number");
    // DEBUGGING STATEMENT
    console.log(this);
  }

  boundPrepOperator = this.prepOperator.bind(this);
  prepOperator (e) {
    // Either just the operator changes
    // Or the the operator changes and so do the inputs
    // Or nothing happens at all

    // Nothing happens at all (if there are no inputs)
    if (this.bothInputsEmpty(e)) return;

    // Add operator (or change operator, which only happens if last button was operator)
    else if (this.inputsHalfFull(e) || this.lastButtonOperator == true) {
      this.operator = e.target.textContent;
    }

    // Continue operation (operator present, all inputs filled)
    else if ((this.bothInputsFull(e)) && this.lastButtonNumber == true) {

      // Division by zero handler
      if(this.isZeroDiv(e)) {
        alert("Can't divide by zero!");
        return;
      }
      this.result = this.preformOperation(this.input1, this.input2);

      // Limit handler
      this.limitCheck(e);
      this.sliceResult(e);
      this.prepareNewOperation(e);
    }




    // Prep new operation (after equals is pressed)
    else if (this.lastButtonEqual == true) {
      this.prepareNewOperation(e);
    }

    this.setLastButton("operator");
    return;
  }
  
  boundEquals = this.equals.bind(this);
  equals (e) {

    if (this.operator == "" || this.lastButtonOperator == true) return; // If operator is empty or user just pressed operator, nothing todo
    if (this.input2 == "" && this.lastOperationNumber == "") return // No inputs to work with, otherwise would return NaN

    // If both inputs are full, we should preform the relevant operation
    else if (this.bothInputsFull(e)) {
      // Division by zero handler
      if(this.isZeroDiv(e)) {
        alert("Can't divide by zero!");
        return;
      }
      this.result = this.preformOperation(this.input1, this.input2);
      // Limit handler
      this.limitCheck(e);
      
      this.sliceResult(e);
      this.input1 = this.result;
      this.lastOperationNumber = this.input2
      this.input2 = "";
    }

    // If the last button was "equals", then we simply continue the operation
    else if (this.lastButtonEqual == true) {
      this.input2 = this.lastOperationNumber;
      this.result = this.preformOperation(this.input1, this.input2);
      // Limit handler
      this.limitCheck(e);

      this.sliceResult(e);
      this.input1 = this.result;
      this.input2 = "";
    }

    this.setLastButton("equal");
  }

  boundBackspace = this.backspace.bind(this);
  backspace (e) {
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

clear.addEventListener('click', calculator.boundInitialize);


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