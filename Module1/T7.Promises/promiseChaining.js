const fs = require('fs');


let f1PendingPromise = fs.promises.readFile("./f1.txt" , "utf8");

f1PendingPromise.then(function(f1Data){
    console.log(f1Data);
    let f2PendingPromise = fs.promises.readFile("./f2.txt" , "utf8");
    return f2PendingPromise;
})
.then(function(f2Data){
    console.log(f2Data);
    let f3PendingPromise = fs.promises.readFile("./f3.txt" , "utf8");
    return f3PendingPromise;
})
.then(function(f3Data){
    console.log(f3Data);
});




