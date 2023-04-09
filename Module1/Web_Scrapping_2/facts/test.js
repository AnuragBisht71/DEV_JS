const fs = require('fs');

let obj = [{
    Runs : "10" , 
    Balls : "2"
}]

let jsonObj = JSON.stringify(obj); // TO CONVERT JS DATA TO JSON DATA -------> {JSON.stringify}
// fs.writeFileSync("./a.json" , jsonObj);


let ObjRead = JSON.parse(fs.readFileSync("./a.json")); // TO CONVERT JSON DATA TO JS DATA -------> {JSON.parse}
console.log(ObjRead);


