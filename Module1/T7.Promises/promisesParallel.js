// Parallely read content of f1 , f2 and f3 using promisified function

const fs = require('fs');

let f1Promise = fs.promises.readFile("./f1.txt" , "utf8");
let f2Promise = fs.promises.readFile("./f2.txt" , "utf8");
let f3Promise = fs.promises.readFile("./f3.txt" , "utf8");

f1Promise.then(function(data){
    console.log(data);
});

f2Promise.then(function(data){
    console.log(data);
});

f3Promise.then(function(data){
    console.log(data);
});


