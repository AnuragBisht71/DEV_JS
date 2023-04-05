const fs = require("fs");

let f1 = fs.readFileSync("./f1.txt" , "utf-8");

function applyNFlag(f1) {
    let count = 1;
    let splittedData = f1.split("\r\n");
    for(let i = 0; i < splittedData.length; i++) {
        splittedData[i] = `${count}. ${splittedData[i]}`;
        count++;
    }

    console.log(splittedData); // --> [ '1. Hi i am f1!!', '', '', '', '', '2. Bye i am going' ]
    let NlaggedString = splittedData.join("\r\n");
    return NlaggedString;
}

let NlaggedString = applyNFlag(f1);
console.log(NlaggedString); 
// 1. Hi i am f1!!
// 2. SPACE 
// 3. SPACE
// 4. SPACE
// 5. SPACE
// 6. Bye i am going



