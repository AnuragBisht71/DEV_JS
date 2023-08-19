// Arrays

let a = [1, 2, 3];
let b = [4, 5];

let c = [...a, ...b];
let d = [...a, ...a, ...a];

console.log(a);
console.log(b);
console.log(c);
console.log(d);


// Objects

let o1 = {a:1 , b:2};
let o2 = {c:3 , d:4};

let o3 = {...o1, ...o2};

console.log(o1);
console.log(o2);
console.log(o3);

