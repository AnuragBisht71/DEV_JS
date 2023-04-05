const fs = require('fs');

let f1 = fs.readFileSync("./f1.txt" , "utf-8");

function applyBFlag(f1) {
    let count = 1;
    let splittedData = f1.split("\r\n");
    for(let i = 0; i < splittedData.length; i++) {
        if(splittedData[i] != 0) {
            splittedData[i] = `${count}. ${splittedData[i]}`;
            count++;
        }
    }

    console.log(splittedData); // --> [ '1. Hi i am f1!!', '', '', '', '', '2. Bye i am going' ]
    let bFlaggedString = splittedData.join("\r\n");
    return bFlaggedString;
}

let bFlaggedString = applyBFlag(f1);
console.log(bFlaggedString);
// 1. Hi i am f1!!
// SPACE 
// SPACE
// SPACE
// SPACE
// 2. Bye i am going


