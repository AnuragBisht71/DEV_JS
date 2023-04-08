let matchLink = "https://www.espncricinfo.com/series/indian-premier-league-2023-1345038/kolkata-knight-riders-vs-royal-challengers-bangalore-9th-match-1359483/full-scorecard";

const fs = require("fs");
const request = require("request");
const cheerio = require("cheerio");

request(matchLink , cb);

function cb(error , response , data) {
    getHighestFours(data);
}

function getHighestFours(data) {
    let myDocument = cheerio.load(data);
    let bothBattingTables = myDocument("table.ds-w-full.ds-table.ds-table-md.ds-table-auto.ci-scorecard-table");
    // console.log(bothBattingTables.length);

    let playerName;
    let noOfFours;
    let economyOfThePlayer;

    for(let i = 0 ; i < bothBattingTables.length ; i++) {
        battingTables = myDocument(bothBattingTables[i]);
        let allTableRows = battingTables.find("tbody tr");

        for(let j = 0;  j < allTableRows.length; j++) {
            let allTds = myDocument(allTableRows[j]).find("td");
            if(i == 0 && j == 0) {
                playerName = myDocument(allTds[0]).find("a").text();
                noOfFours = myDocument(allTds[5]).text();
                economyOfThePlayer = myDocument(allTds[7]).text();
            }

            else {
                let curNoOfFours = myDocument(allTds[5]).text();
                let curEconomyOfThePlayer = myDocument(allTds[7]).text();

                if(curNoOfFours > noOfFours) {
                    playerName = myDocument(allTds[0]).find("a").text();
                    noOfFours = curNoOfFours;
                    economyOfThePlayer = myDocument(allTds[7]).text();
                }

                else if(curNoOfFours == noOfFours && curEconomyOfThePlayer < economyOfThePlayer) {
                    playerName = myDocument(allTds[0]).find("a").text();
                    noOfFours = myDocument(allTds[5]).text();
                    economyOfThePlayer = curEconomyOfThePlayer;
                }
            }
        }
    }

    console.log("Name if the Player = " + playerName);
    console.log("NO. of Fours = " + noOfFours);
    console.log("Economy of the Player = " + economyOfThePlayer);

}





