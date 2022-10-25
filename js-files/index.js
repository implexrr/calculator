assignVariablesToButtons();


// Template for objects of type calculator
class Calculator {
  constructor() {
    // Initialize everything
    this.initialize();
    this.input1 = "";
    this.result = "";
    results.textContent = "";
    console.log("First initialization")
  }

  // Initialization function
  boundInitialize = this.initialize.bind(this);
  initialize () {
    console.log("Calculator initialized...");
    this.input1 = "0";
    this.input2 = "";
    this.operator = "";
    this.result = "0";
    this.lastOperationNumber = "";
    this.lastButtonEqual = false;
    this.lastButtonOperator = false;
    this.lastButtonNumber = false;
    this.input1DotPresent = false;
    this.input2DotPresent = false;
    this.input1Write = false;
    this.input2Write = false;
    results.textContent = "0";
  }

  // Basic arithmetic functions
  add () { return (parseFloat(this.input1) + parseFloat(this.input2)).toString() }
  subtract () { return (parseFloat(this.input1) - parseFloat(this.input2)).toString() }
  multiply () { return (parseFloat(this.input1) * parseFloat(this.input2)).toString() }
  divide () { return (parseFloat(this.input1) / parseFloat(this.input2)).toString() }

  // Preform operation (based on operator value)
  preformOperation () {
    switch (this.operator) {
      case "+": return this.add();
      case "-": return this.subtract();
      case "×": return this.multiply();
      case "÷": return this.divide();
    }
  }

  writeNewInput(e, input) { this[input] = e.target.textContent; }
  appendToInput (e, input) { this[input] = this[input].concat(e.target.textContent.slice(0,8)); }

  // Record user input, extend input string and display on results window for calculator
  writeInput (e, input) {
    if (input == "input1") {
      this.input1Write = true;
      this.input2Write = false;
    }
    else if (input == "input2") {
      this.input1Write = false;
      this.input2Write = true;
    }
    (this[input] == "0" && e.target.textContent != ".") ? this.writeNewInput(e, input) : this.appendToInput(e, input);
    results.textContent = this[input];
  }

  // See if input already has a dot, if it does then do nothing, otherwise concatenate dot to input
  // I WAS HERE

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

  limitCheck () {
    if (this.result >= 99999999) this.result = "99999999";
    else if (this.result <= -9999999) this.result = "-9999999";
    else if ((this.result <= 6.25e-8) && (this.result >= 0)) this.result = "0";
  }

  leadingZeros(e, currentValue, dotState) {
    if (e.target.textContent == "0" && parseFloat(currentValue) == 0 && dotState == false) return true;
  }


  
  bothInputsEmpty() { return (this.input1 == "" && this.input2 == "" ? true : false); }
  bothInputsFull() { return (this.input1 != "" && this.input2 != "" ? true : false); }
  inputsHalfFull() { return (((this.input1 == "" && this.input2 != "") || (this.input1 != "" && this.input2 == "")) ? true : false)}
  sliceResult() {
    this.result = this.result.slice(0,8);
    results.textContent = this.result;
  }

  // Delete one character of user input
  delInput(input) {
    console.log(`erasing ${input}`) // I WAS HERE

    // Check to see if user is about to delete a dot
    let final = this[input].length - 1;

    // Are we deleting from input1 or input2
    if (this[input].charAt(final) == "." && input == "input2") this.input2DotPresent = false;
    else if (this[input].charAt(final) == "." && input == "input1") this.input1DotPresent = false;

    // Delete one character, display results
    this[input] = this[input].slice(0,-1);
    results.textContent = this[input];
  }

  prepareNewOperation(e) {
    this.input1 = this.result;
    this.input2 = "";
    this.operator = e.target.textContent;
  }
  
  isZeroDiv() { return ((this.operator == "÷") && (this.input2 == "0") ? true : false) }

  resultToInput1() {
    this.result = this.preformOperation(this.input1, this.input2);
    this.limitCheck();
    this.sliceResult();
    this.input1 = this.result;
  }

  boundRecord = this.record.bind(this); // Allows the record method to be used outside of the class, more info @https://alephnode.io/07-event-handler-binding/
  record (e) {
    // Start a new calculation, since the last button was "equals"
    if (this.lastButtonEqual == true) {
      if (e.target.textContent == ".") return; // First character shouldn't be a period
      this.initialize();
      this.writeInput(e, "input1");
    } 

    // Write into input1, since input1 is empty
    else if (this.input1 == "") {
      if (e.target.textContent == ".") return; // First character shouldn't be a period
      this.writeInput(e, "input1");
    }

    else {
      // Extend input1, since operator is empty
      if (this.operator == "") {
        if (this.checkInput1DuplicateDot(e)) return;                          // Dot handling
        if (this.leadingZeros(e, this.input1, this.input1DotPresent)) return; // Zero handling
        this.writeInput(e, "input1");
      }

      // Write into input2, since input1, operator both nonempty
      else if (this.input2 == "") {
        if (e.target.textContent == ".") return; // First character shouldn't be a period
        this.writeInput(e, "input2");
      }

      // Extend input2, since input1, operator and input2 are nonempty
      else {
        if (this.checkInput2DuplicateDot(e)) return;                          // Dot handling
        if (this.leadingZeros(e, this.input2, this.input2DotPresent)) return; // Zero handling
        this.writeInput(e, "input2");
      }
    }
    this.setLastButton("number");
  }

  boundPrepOperator = this.prepOperator.bind(this);
  prepOperator (e) {
    if (this.bothInputsEmpty()) return;

    // Add operator (or change operator, which only happens if last button was operator)
    else if (this.inputsHalfFull() || this.lastButtonOperator == true) {
      this.operator = e.target.textContent;
    }

    // Continue operation (operator present, all inputs filled)
    else if ((this.bothInputsFull()) && this.lastButtonNumber == true) {

      if(this.isZeroDiv()) {
        alert("Can't divide by zero!");
        return;
      }

      this.result = this.preformOperation(this.input1, this.input2);
      this.limitCheck();
      this.sliceResult();
      this.prepareNewOperation(e);
    }

    // Prep new operation (after equals is pressed)
    else if (this.lastButtonEqual == true) {
      this.prepareNewOperation(e);
    }
    this.setLastButton("operator");
  }
  
  boundEquals = this.equals.bind(this);
  equals () {

    if (this.operator == "" || this.lastButtonOperator == true) return;   // If operator is empty or user just pressed operator, nothing todo
    if (this.input2 == "" && this.lastOperationNumber == "") return;      // No inputs to work with, otherwise would return NaN

    else if (this.bothInputsFull()) {
      if(this.isZeroDiv()) {
        alert("Can't divide by zero!");
        return;
      }
      this.resultToInput1();
      this.lastOperationNumber = this.input2
      this.input2 = "";
    }

    // If the last button was "equals", then we simply continue the operation
    else if (this.lastButtonEqual == true) {
      this.input2 = this.lastOperationNumber;
      this.resultToInput1();
      this.input2 = "";
    }
    this.setLastButton("equal");
  }

  boundBackspace = this.backspace.bind(this);
  backspace () {
    if (this.lastButtonNumber != true) return;
    if (this.input2Write == true) this.delInput("input2");
    else if (this.input1Write == true) this.delInput("input1");
  }

}








// Create new calculator object
let calculator = new Calculator();


// Add "Record" functionality from Calculator class onto all buttons with html class="number"
for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener('click', calculator.boundRecord);
}

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

// Hip hip hooray
calculator.delInput("input1");

// Assign unique variables to each button
function assignVariablesToButtons () {
  let numbers = document.querySelectorAll('.number');
  for (let i = 0; i < numbers.length; i++) {
    window[numbers[i].id] = document.querySelector(`#${numbers[i].id}`);
    console.log(window[numbers[i].id]);
  }
  
  let miscellaneous = document.querySelectorAll('.miscellaneous');
  for (let i = 0; i < miscellaneous.length; i++) {
    window[miscellaneous[i].id] = document.querySelector(`#${miscellaneous[i].id}`);
    console.log(window[miscellaneous[i].id]);
  }
  
  let operators = document.querySelectorAll('.operator');
  for (let i = 0; i < operators.length; i++) {
    window[operators[i].id] = document.querySelector(`#${operators[i].id}`);
    console.log(window[operators[i].id]);
  }
}