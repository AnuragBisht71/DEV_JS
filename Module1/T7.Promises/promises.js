const fs = require("fs");

// sync function
// async function
// promisifed function

let pendingPromises = fs.promises.readFile("./f1.txt" , "utf8");
console.log(pendingPromises);

pendingPromises.then(function(data) {
    console.log("Inside scb");
    console.log(data);
} )

pendingPromises.catch(function(err) {
    console.log("Inside fcb");
    console.log(err);
} )