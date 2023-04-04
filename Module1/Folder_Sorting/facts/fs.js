// fs --> file System

const fs = require("fs");
// console.log(fs);

// fs.writeFileSync("index.html", "Hello World!!!");
let fsKaData = fs.readFileSync("./index.html", "utf-8");
// console.log(fsKaData + "");

// fs.writeFileSync("../activity/activity,js", "Hi!!!");
// fs.writeFileSync("../activity/activity.js", "Hi!!!");
// fs.writeFileSync("../activity/folderSort.js", "Hi!!!");
// fs.writeFileSync("../activity/util.js", "Hi!!!");
