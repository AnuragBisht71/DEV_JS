const fs = require("fs");

function getFilesData(files) {
    let filesData = "";
    for(let i = 0; i < files.length; i++) {
        if(!fs.existsSync(files[i])) {
            console.log("One or more files does not exist");
            return;
        }
        if(i == files.length - 1) {
            filesData += fs.readFileSync(files[i]);
        }
        else {
            filesData += fs.readFileSync(files[i]) + "\r\n";
        }
    }

    return filesData;
}

                                    // S Flag Data

function applySFlag(f1) {
    let emptyIncluded = false;
    let removedSpaces = [];
    let splittedData = f1.split("\r\n"); 
    // console.log(splittedData); // --> [ 'Hi i am f1!!', '', '', '', '', 'Bye i am going' ]

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
    
    // console.log(removedSpaces); // --> [ 'Hi i am f1!!', '', 'Bye i am going' ]
    let removedSpacesString = removedSpaces.join("\r\n");
    return removedSpacesString;
}


                                    // B Flag Data

function applyBFlag(f1) {
    let count = 1;
    let splittedData = f1.split("\r\n");
    for(let i = 0; i < splittedData.length; i++) {
        if(splittedData[i] != 0) {
            splittedData[i] = `${count}. ${splittedData[i]}`;
            count++;
        }
    }

    // console.log(splittedData); // --> [ '1. Hi i am f1!!', '', '', '', '', '2. Bye i am going' ]
    let bFlaggedString = splittedData.join("\n");
    return bFlaggedString;
}


                                    // N Flag Data

function applyNFlag(f1) {
    let count = 1;
    let splittedData = f1.split("\r\n");
    for(let i = 0; i < splittedData.length; i++) {
        splittedData[i] = `${count}. ${splittedData[i]}`;
        count++;
    }

    // console.log(splittedData); // --> [ '1. Hi i am f1!!', '', '', '', '', '2. Bye i am going' ]
    let bFlaggedString = splittedData.join("\n");
    return bFlaggedString;
}

module.exports.getFilesData = getFilesData;
module.exports.applySFlag = applySFlag;
module.exports.applyBFlag = applyBFlag;
module.exports.applyNFlag = applyNFlag;


