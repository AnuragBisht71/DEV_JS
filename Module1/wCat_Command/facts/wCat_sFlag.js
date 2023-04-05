const fs = require("fs");

let f1 = fs.readFileSync("./f1.txt" , "utf-8");
let f2 = fs.readFileSync("./f2.txt" , "utf-8");
// console.log(f1);
// console.log(f2);


    //  S Flag Implementation
function applySFlag(f1) {
    let emptyIncluded = false;
    let removedSpaces = [];
    let splittedData = f1.split("\r\n"); 
    console.log(splittedData); // --> [ 'Hi i am f1!!', '', '', '', '', 'Bye i am going' ]

    for(let i = 0; i  < splittedData.length; i++) {
        if(splittedData[i] == "" && emptyIncluded == false) {
            removedSpaces.push(splittedData[i]);    
            emptyIncluded = true;
        }
        else if(splittedData[i] != "") {
            removedSpaces.push(splittedData[i]);
            if(i < splittedData.length-2) emptyIncluded = false;
        } 
    }
    
    console.log(removedSpaces); // --> [ 'Hi i am f1!!', '', 'Bye i am going' ]
    let removedSpacesString = removedSpaces.join("\r\n");
    return removedSpacesString;
}

let removedSpacesString = applySFlag(f1);
console.log(removedSpacesString);
// Hi i am f1!!
// SPACE
// Bye i am going


