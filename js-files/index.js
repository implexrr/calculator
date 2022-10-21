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








// Template for objects of type calculator
class Calculator {
  constructor() {
    // Initialize everything
    console.log("Calculation initialized...");
    this.input1 = "";
    this.input2 = "";
    this.operator = "";
    this.result = "";
    this.lastButtonEqual = false;
    this.lastOperator = "";
    this.lastResult = "";
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
    return (parseFloat(his.input1) / parseFloat(this.input2)).toString();
  }

  // Change operator value
  addOperator(operator) {
    this.operator = operator;
  }

  // Preform operation (based on operator value)
  preformOperation () {
    switch (this.operator) {
      case "add": return this.add();
      case "subtract": return this.subtract();
      case "multiply": return this.multiply();
      case "divide": return this.divide();
    }
  }

  boundRecord = this.record.bind(this); // Allows the record method to be used outside of the class, more info @https://alephnode.io/07-event-handler-binding/
  record (e) {

    // If input1 is empty
    if (this.input1 == "") {
      if (e.target.textContent == ".") return; // Do nothing if user input is "."
      
      // Write user input into input1, display input1 on results window for calculator
      this.input1 = e.target.textContent;
      results.textContent = this.input1;
    }

    else {

      // If input1 is non-empty, but operator is empty
      if (this.operator == "") {

        // Dot handling process
        if ((e.target.textContent == ".") && (this.input1DotPresent== true)) return;  // Do nothing if user input is "." and dot is present in input1 string already
        if (e.target.textContent == ".") this.input1DotPresent = true;                // If dot not already present, change state of "dot present" to true
        
        // Record user input, extend input1 string and display on results window for calculator
        this.input1 = this.input1.concat(e.target.textContent);
        results.textContent = this.input1;
      }
      
      // Input1, operator both nonempty, but input2 is empty
      else if (this.input2 = "") {
        if (e.target.textContent == ".") return; // Do nothing if user input is "."

        // Record user input, extend input2 string and display on results window for calculator
        this.input2 = e.target.textContent;
        results.textContent = this.input2;
      }

      // Input1, operator, and input2 all nonempty
      else {

        // If last button was "equals", the operation must have completed already, so we reset everything
        if (this.lastButtonEqual == true) {
          if (e.target.textContent == ".") return; // Except when there's a "." -- in this case, do nothing

          // Reset everything
          this.input1 = e.target.textContent;
          this.input2 = "";
          this.operator = "";
          this.result = "";
          this.lastButtonEqual = false;
          this.lastOperator = "";
          this.input1DotPresent = false;
          this.input2DotPresent = false;
          results.textContent = this.input1;
        }

        // Last button was not equals, so we want to extend input2 string
        else {

          // Dot handling process
          if ((e.target.textContent == ".") && (this.input2DotPresent== true)) return;  // Do nothing if user input is "." and dot is present in input2 string already
          if (e.target.textContent == ".") this.input2DotPresent = true;                // If dot not already present, change state of "dot present" to true


          // Write user input into input2, display input2 on results window for calculator
          this.input2 = this.input2.toString().concat(e.target.textContent);
          results.textContent = this.input2;
        }
      }
    }

    // DEBUGGING STATEMENT
    console.log(this);
  }
}

// Create new calculator object
let calculation = new Calculator();


// Add "Record" functionality from calculator class onto all buttons with class "number"
let numbers = document.querySelectorAll('.number');
for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener('click', calculation.boundRecord);
}



