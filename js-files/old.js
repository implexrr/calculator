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

// class Calculation {
//   constructor(input1, input2, operator) {
//     console.log("Calculation initialized...");
//     this.input1 = input1;
//     this.input2 = input2;
//     this.operator = operator;
//   }
//   calculate () {
//     return this.operator(this.input1, this.input2);
//   };
// }

// const calc1 = new Calculation("","","");
// console.log(calc1);

// const calc1 = new Calculation(1, 2, add);
// console.log(calc1);
// console.log(calc1.calculate());


// nine.addEventListener("click", record);
// multi.addEventListener("click", multiP);
// equal.addEventListener("click", equality);
// function record (e) {
//   console.log(`user pressed ${e.target.textContent}`);
//   // x = x.concat(e.target.textContent);
//   x = x.toString().concat(e.target.textContent);
// }

// function multiP (e) {
//   operation = "multiply";
//   console.log(`${x} is in input 1, ${y} is in input 2`);
//   if (y != "") {
//     x = equality();
//   }
//   else {
//     y = x;
//     x = "";
//   }
// }

// function equality (e) {
//   // console.log(x);
//   // console.log(y);
//   // console.log(operation);
//   let testcalc;
//   let result;
//   if (operation == "multiply") {
//     testcalc = new Calculation(parseInt(x), parseInt(y), multiply);
//   }
//   // console.log(testcalc.calculate());
//   x = "";
//   y = "";
//   operation = "";
//   console.log(`result is ${result}`);
//   result = testcalc.calculate();
//   return result;
// }