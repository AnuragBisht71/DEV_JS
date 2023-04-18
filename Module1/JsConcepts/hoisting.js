// HOISTING --> mechanism of accessing variable before the initailization
// Var -->

console.log(a);
var a = "name";
console.log(a);

// Hoisting is possible in var

// Let and Const -->

// console.log(a);
// let a = "name";
// console.log(a);

// console.log(a);
// const a = "name";
// console.log(a);

// Hoisting is possible in let and const but because let and const are stored in TDZ(Temporal Dead Zone) before initailization that why we cannot access variable n TDZ.