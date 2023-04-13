const request = require("request");
const cheerio = require("cheerio");

function getAllMatches(allMatchesLink) {
    request(allMatchesLink , function(error, response, data) {
        processData(data);
    })
}

function processData(html) {
    let myDocument = cheerio.load(html);
    
    let allAtags = myDocument(".ds-grow.ds-px-4.ds-border-r.ds-border-line-default-translucent a");
    // console.log(allAtags.length);

    for(let i = 0; i < allAtags.length; i++) {
        let matchLink = "https://www.espncricinfo.com" + myDocument(allAtags[i]).attr("href");
        console.log(matchLink);
        // getMatchDetails(matchLink);
    }

}

module.exports = getAllMatches;


