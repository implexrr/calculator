// Assign unique variables to each button
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
let results = document.querySelector("#results");
let backspace = document.querySelector("#backspace");
let clear = document.querySelector("clear");









// Template for objects of type calculator
class Calculator {

// TODO
// parent classes operator, operatorAdder and recorder?
// Initialize function?
// Dot handler function?
// Extender function?
// First input letter function?

  constructor() {
    // Initialize everything
    console.log("Calculation initialized...");
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
    
  }

  // Basic arithmetic functions
  add () {
    return (parseFloat(this.input1) + parseFloat(this.input2)).toString();
  }

  subtract () {
    return (parseFloat(this.input1) - parseFloat(this.input2)).toString();
  }

  multiply () {
    return (parseFloat(this.input1) * parseFloat(this.input2)).toString();
  }

  divide () {
    return (parseFloat(this.input1) / parseFloat(this.input2)).toString();
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

  boundRecord = this.record.bind(this); // Allows the record method to be used outside of the class, more info @https://alephnode.io/07-event-handler-binding/
  record (e) {

    // If last button was "equals", the operation must have completed already, so we reset everything
    if (this.lastButtonEqual == true) {
      if (e.target.textContent == ".") return; // Except when there's a "." -- in this case, do nothing

      // Reset everything
      this.input1 = e.target.textContent;
      this.input2 = "";
      this.operator = "";
      this.result = "";
      this.lastOperationNumber = "";
      this.lastButtonEqual = false;
      this.lastButtonOperator = false;
      this.lastButtonNumber = false;
      this.input1DotPresent = false;
      this.input2DotPresent = false;
      results.textContent = this.input1

    }    
    // If input1 is empty
    else if (this.input1 == "") {
      if (e.target.textContent == ".") return; // Do nothing if user input is "."
      
      // Write user input into input1, display input1 on results window for calculator
      this.input1 = e.target.textContent;
      results.textContent = this.input1;
    }

    else {

      // If input1 is non-empty, but operator is empty
      if (this.operator == "") {

        // Dot handling process
        if ((e.target.textContent == ".") && (this.input1DotPresent == true)) return;  // Do nothing if user input is "." and dot is present in input1 string already
        if (e.target.textContent == ".") this.input1DotPresent = true;                // If dot not already present, change state of "dot present" to true
        
        // Record user input, extend input1 string and display on results window for calculator
        this.input1 = this.input1.concat(e.target.textContent);
        results.textContent = this.input1;
      }
      
      // Input1, operator both nonempty, but input2 is empty
      else if (this.input2 == "") {
        if (e.target.textContent == ".") return; // Do nothing if user input is "."
        // Write user input into input2, display input2 on results window for calculator
        this.input2 = e.target.textContent;
        results.textContent = this.input2;
      }

      // Input1, operator, and input2 all nonempty
      else {
      // We want to extend input2 string
      // Dot handling process
      if ((e.target.textContent == ".") && (this.input2DotPresent == true)) return;  // Do nothing if user input is "." and dot is present in input2 string already
      if (e.target.textContent == ".") this.input2DotPresent = true;                // If dot not already present, change state of "dot present" to true

      // Record user input, extend input2 string and display on results window for calculator
      this.input2 = this.input2.concat(e.target.textContent);
      results.textContent = this.input2;
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
      this.result = this.preformOperation(this.input1, this.input2);
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


    // If both inputs are full, we should preform the relevant operation
    else if (this.input1 != "" && this.input2 != "") {
      this.result = this.preformOperation(this.input1, this.input2);
      results.textContent = this.result;
      this.input1 = this.result;
      this.lastOperationNumber = this.input2
      this.input2 = "";
    }

    // If the last button was "equals", then we simply continue the operation
    else if (this.lastButtonEqual == true) {
      this.input2 = this.lastOperationNumber;
      this.result = this.preformOperation(this.input1, this.input2);
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
    if (this.lastButtonNumber != true) return;
    if (this.input2 != "") {
      this.input2 = this.input2.slice(0,-1);
      results.textContent = this.input2;
    }
    if (this.input1 != "") {
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
