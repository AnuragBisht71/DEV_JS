
const { getFilesData , applySFlag , applyBFlag , applyNFlag } = require("./util");

let content = process.argv.slice(2);
// console.log(content); // --> [ '-s', '-b', '-n', 'f1.txt', 'f2.txt' ]

const flags = [];
const files = [];

for(let i = 0; i < content.length; i++) {
    if(content[i].startsWith("-")) {
        flags.push(content[i]);
    }
    else {
        files.push(content[i]);
    }
}


let filesData = getFilesData(files);

if(flags.includes("-s")) {
    filesData = applySFlag(filesData);
}


if(flags.includes("-b") && flags.includes("-n")) {
    if(flags.indexOf("-b") < flags.indexOf("-n")) {
        filesData = applyBFlag(filesData);
    }
    else {
        filesData = applyNFlag(filesData);
    }
}

else if(flags.includes("-b")) {
    filesData = applyBFlag(filesData);
}

else if(flags.includes("-n")) {
    filesData = applyNFlag(filesData);
}

console.log(filesData);

