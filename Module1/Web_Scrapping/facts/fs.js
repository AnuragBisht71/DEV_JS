const fs = require("fs");

let cheerio = require("cheerio");

let html = fs.readFileSync("./index.html" , "utf8");

let myDocument = cheerio.load(html);
let h1 = myDocument("h1").text();
console.log(h1);