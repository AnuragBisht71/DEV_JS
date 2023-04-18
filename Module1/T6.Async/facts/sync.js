const fs = require('fs');


console.log("start");


let f1Data = fs.readFileSync("./f1.txt");
console.log(f1Data+"");



console.log("end");