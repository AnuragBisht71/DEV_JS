const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

// let matchLink = "https://www.espncricinfo.com/series/indian-premier-league-2022-1298423/chennai-super-kings-vs-kolkata-knight-riders-1st-match-1304047/full-scorecard";

let leaderboard = [];
let countOfRequest = 0;

function getMatchDetails(matchLink) {
    console.log("Sending request" , countOfRequest);
    countOfRequest++;
    
    request(matchLink , function(error, response, data) {
        countOfRequest--;
        processData(data);
        console.log("Callback" , countOfRequest);
        if(countOfRequest == 0) {
            console.table(leaderboard);
        }
    })
}


function processData(data) {
    let myDocument = cheerio.load(data);
    let bothInnings = myDocument(".ds-text-title-xs.ds-font-bold.ds-capitalize");
    let innings = myDocument("table.ds-w-full.ds-table.ds-table-md.ds-table-auto.ci-scorecard-table");
        
        for(let i = 0 ; i < innings.length ; i++) {
            let oneInnings = myDocument(bothInnings[i]);
            let teamName = oneInnings.text();
            teamName = teamName.split("()")[0].trim();
            console.log(teamName);

            inningTable = myDocument(innings[i]);
            allTrs = inningTable.find("tbody tr");

            for(let j = 0 ; j < allTrs.length-4; j++) {
                let allTds = myDocument(allTrs[j]).find("td");
    
                if(allTds.length > 1) {
                    let batsmanName = myDocument(allTds[0]).text().trim();
                    let runs = myDocument(allTds[2]).text().trim();
                    let balls = myDocument(allTds[3]).text().trim();
                    let fours = myDocument(allTds[5]).text().trim();
                    let sixes = myDocument(allTds[6]).text().trim();
                    let strikeRate = myDocument(allTds[7]).text().trim();
    
                    // console.log(`Batsman Name: ${batsmanName} Runs: ${runs} balls: ${balls} fours: ${fours} sixes: ${sixes} Strike Rate: ${strikeRate}`);
                    // processDetails(teamName , batsmanName , runs , balls , fours , sixes , strikeRate);
                    processLeaderBoard(teamName , batsmanName , runs , balls , fours , sixes);
                }
                
            }
        }

    console.log("------------------------------>");
}

function processLeaderBoard(teamName , batsmanName , runs , balls , fours , sixes) {
    runs = Number(runs);
    balls = Number(balls);
    fours = Number(fours);
    sixes = Number(sixes);

    for(let i = 0 ; i < leaderboard.length; i++) {
        let batsmanObject = leaderboard[i];

        if(batsmanObject.Team == teamName && batsmanObject.Batsman == batsmanName) {
            batsmanObject.Runs += runs;
            batsmanObject.Balls += balls;
            batsmanObject.Fours += fours;
            batsmanObject.Sixes += sixes;
            return;
        }
    }

    let batsmanObject = {
        Team : teamName , 
        Batsman : batsmanName ,
        Runs : runs , 
        Balls : balls ,
        Fours : fours ,
        Sixes : sixes 
    }
    leaderboard.push(batsmanObject);
}


module.exports.getMatchDetails = getMatchDetails;

