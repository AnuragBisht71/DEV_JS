let fs = require("fs");

let extensionsMapping = require("./util.js");

let testFolderPath = "./Downloads";
let allFiles = fs.readdirSync(testFolderPath);

for(let i = 0; i < allFiles.length; i++) {
    sortFiles(allFiles[i]);
}

function getExtension(file) {
    file = file.split(".");
    return file[1];
}

function checkExtensionFolder(extension) {
    let extensionFolderName = testFolderPath;
    for(let key in extensionsMapping) {
        let extensions = extensionsMapping[key];
        if(extensions.includes(extension)) {
            extensionFolderName = extensionFolderName+"/"+key;
            break;
        }
    }

    let isFolderExist = fs.existsSync(extensionFolderName);
    if(!isFolderExist) {
        fs.mkdirSync(extensionFolderName);
    }
    return extensionFolderName;
}

function moveFiles(file , extensionFolderName) {
    let sourceFile = testFolderPath+"/"+file;
    let destinationFile = extensionFolderName+"/"+file;
    fs.copyFileSync(sourceFile , destinationFile);
    fs.unlinkSync(sourceFile);
}

function sortFiles(file) {
    let extension = getExtension(file);
    let extensionFolderName = checkExtensionFolder(extension);
    moveFiles(file , extensionFolderName); 
}
