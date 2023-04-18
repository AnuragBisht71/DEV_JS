let matchLink = "https://www.espncricinfo.com/series/indian-premier-league-2022-1298423?ex_cid=google_cpc:search:dsa:ipl2023&gclid=Cj0KCQjwocShBhCOARIsAFVYq0hh4tqqqM6Q1Cg7zBDoB4prNKh3fuqWZGBZ2vGUMMjgrDe8_i8aDCEaArxFEALw_wcB";

const request = require("request");
const cheerio = require("cheerio");
const getAllMatches = require("./allMatches");

request(matchLink , function(error, response, data) {
    processData(data);
})

function processData(html) {
    let myDocument = cheerio.load(html);
    let aTags = myDocument("div.ds-border-t.ds-border-line.ds-text-center.ds-py-2 a");
    // console.log(aTags);
    let allMatchesLink = "https://www.espncricinfo.com" + aTags["0"].attribs.href;
    getAllMatches(allMatchesLink);

}

