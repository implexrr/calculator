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

let x;
let y;

// function operate (operator, a, b) {
//   return operator(a,b);
// }

// function Calculation(input1, input2, operator) {
//   console.log("Calculation initialized...");
//   this.input1 = input1;
//   this.input2 = input2;
//   this.operator = operator;
// }

// Calculation.prototype.calculate = function () {
//   return this.operator(this.input1, this.input2);
// }

// class Calculation {
//   constructor(input1, input2, operator) {
//     console.log("Calculation initialized...");
//     this.input1 = input1;
//     this.input2 = input2;
//     this.operator = operator;
//     this.calculate = function () {
//       return operator(input1, input2);
//     };
//   }
// }

class Calculation {
  constructor(input1, input2, operator) {
    console.log("Calculation initialized...");
    this.input1 = input1;
    this.input2 = input2;
    this.operator = operator;
  }
  calculate () {
    return this.operator(this.input1, this.input2);
  };
}



const calc1 = new Calculation(1, 2, add);
console.log(calc1);
console.log(calc1.calculate());