const fs = require("fs");

let cheerio = require("cheerio");

let html = fs.readFileSync("./index.html" , "utf8");

let myDocument = cheerio.load(html);
// let h1 = myDocument("h1").text();
// console.log(h1);

// Selectors---------->

// You will get all a tags
// console.log(myDocument("a").text());

// You will get all a tag inside ul
// console.log(myDocument("ul a").text());

// You will get all a tag inside li
// console.log(myDocument("ul li a").text());

// You will get only direct child of ul
// console.log(myDocument("ul>a").text());


// Classes and Ids
// Classes
console.log(myDocument(".main").text());
console.log(myDocument(".main.p").text());

// Id
console.log(myDocument("#main").text());



