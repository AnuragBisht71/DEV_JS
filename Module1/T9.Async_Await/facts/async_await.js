const fs = require('fs');

console.log("Start");

async function callMe() {
    try{
        console.log("Hello world!");
        console.log("I am inside async function!!");

        let f1 = fs.promises.readFile("./f1.txt" , "utf8");
        let f2 = fs.promises.readFile("./f2.txt" , "utf8");
        let bothData = await Promise.all([f1 , f2])
        console.log(bothData);
    }
    
    catch(error) {
        console.log(error);
    }
}

callMe();

console.log("End");


