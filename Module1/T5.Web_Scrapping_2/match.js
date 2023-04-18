const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

// let matchLink = "https://www.espncricinfo.com/series/indian-premier-league-2022-1298423/chennai-super-kings-vs-kolkata-knight-riders-1st-match-1304047/full-scorecard";


function getMatchDetails(matchLink) {
    request(matchLink , function(error, response, data) {
        processData(data);
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
                    processDetails(teamName , batsmanName , runs , balls , fours , sixes , strikeRate);
                }
                
            }
        }

    console.log("------------------------------>");
}

    function checkTeamFolder(teamName) {
        let teamFolderPath = `./IPL/${teamName}`;
        return fs.existsSync(teamFolderPath);
    }

    function checkBatsmanFile(teamName , batsmanName) {
        let batsmanFilePath = `./IPL/${teamName}/${batsmanName}.json`;
        return fs.existsSync(batsmanFilePath);
    }

    function updateBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes , strikeRate) {
        let batsmanFilePath = `./IPL/${teamName}/${batsmanName}.json`;
        let batsmanFile = JSON.parse(fs.readFileSync(batsmanFilePath));
        let innings = {
            Runs : runs ,
            Balls : balls ,
            Fours : fours ,
            Sixex : sixes ,
            StrikeRate : strikeRate
        }
        batsmanFile.push(innings);
        fs.writeFileSync(batsmanFilePath , JSON.stringify(batsmanFile) );
    }

    function createBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes , strikeRate){
        let batsmanFilePath = `./IPL/${teamName}/${batsmanName}.json`;
        let batsmanFile = [];
        let innings = {
            Runs : runs ,
            Balls : balls ,
            Fours : fours ,
            Sixex : sixes ,
            StrikeRate : strikeRate
        }
        batsmanFile.push(innings);
        fs.writeFileSync(batsmanFilePath , JSON.stringify(batsmanFile) );
    }

    function createTeamFolder(teamName) {
        let teamFolderPath = `./IPL/${teamName}`;
        fs.mkdirSync(teamFolderPath);
    }

    function processDetails(teamName , batsmanName , runs , balls , fours , sixes , strikeRate) {
        let isTeamFolder = checkTeamFolder(teamName);
        if(isTeamFolder) {
            let isBatsmanFile = checkBatsmanFile(teamName , batsmanName);
            if(isBatsmanFile) {
                updateBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes , strikeRate);
            }
            else {
                createBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes , strikeRate);
            }
        }
        else {
            createTeamFolder(teamName);
            createBatsmanFile(teamName , batsmanName , runs , balls , fours , sixes , strikeRate);
        }
    }


module.exports.getMatchDetails = getMatchDetails;

