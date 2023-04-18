let matchLink = "https://www.espncricinfo.com/series/indian-premier-league-2022-1298423/chennai-super-kings-vs-kolkata-knight-riders-1st-match-1304047/full-scorecard";

const request = require("request");
const cheerio = require("cheerio");

request(matchLink , cb);
function cb(error , response , data) {
    getBattingTable(data);
}

function getBattingTable(data) {
    let myDocument = cheerio.load(data);
    let bothBattingTables = myDocument("table.ds-w-full.ds-table.ds-table-md.ds-table-auto.ci-scorecard-table tbody");
    // console.log(bothBattingTables.length);

    let playerName;
    let runs;
    let balls;
    let fours;
    let sixes;
    let strikeRate;


    for(let i = 0 ; i < bothBattingTables.length ; i++) {
        battingTable = myDocument(bothBattingTables[i]);
        let allTrs = battingTable.find(" tr");

        for(let j = 0 ; j < allTrs.length-4 ; j++) {
            let allTds = myDocument(allTrs[j]).find("td");
            if(allTds.length > 1) {
                let batsmanName = myDocument(allTds[0]).text().trim();
                let runs = myDocument(allTds[2]).text().trim();
                let balls = myDocument(allTds[3]).text().trim();
                let fours = myDocument(allTds[5]).text().trim();
                let sixes = myDocument(allTds[6]).text().trim();
                let strikeRate = myDocument(allTds[7]).text().trim();

                console.log(`Batsman Name: ${batsmanName} Runs: ${runs} balls: ${balls} fours: ${fours} sixes: ${sixes} Strike Rate: ${strikeRate}`);
            }
        }
    }

    
}

