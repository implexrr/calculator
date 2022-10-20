class Calculator {
  constructor(x, y) {
    console.log("Calculation initialized...");
    this.x = x;
    this.y = y;
    this.operator = "";
    this.result = "";
    this.lastButtonEqual = false;
    this.lastOperator = "";
    this.lastResult = "";
    this.input1Empty = true;
    this.input2Empty = true;
    this.dotPresent = false;
    
  }

  add () {
    return (this.x + this.y);
  }

  subtract () {
    return (this.x - this.y);
  }

  multiply () {
    return (this.x * this.y);
  }

  divide () {
    return (this.x / this.y);
  }

  addOperator(operator) {
    this.operator = operator;
  }

  preformOperation () {
    switch (this.operator) {
      case "add": return this.add();
      case "subtract": return this.subtract();
      case "multiply": return this.multiply();
      case "divide": return this.divide();
    }
  }

  boundRecord = this.record.bind(this);
  record (e) {
    console.log(this);
    if (this.input1Empty == true) {
      this.x = e.target.textContent;
    }
    else {
      console.log('asdasd');
      // this.x = this.x.toString().concat(e.target.textContent);
    }
  }
}



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

let calculation = new Calculator("", "");

let numbers = document.querySelectorAll('.number');
for (let i = 0; i < numbers.length; i++) {
  numbers[i].addEventListener('click', calculation.boundRecord);
}



