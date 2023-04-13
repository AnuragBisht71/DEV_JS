const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");


function getTopicProjects(allTopicsName , allLinks) {
    request(allLinks , function(err , res , data) {
        processData(allTopicsName , data);
    })
}

function processData(allTopicsName , data) {
    let myDocument = cheerio.load(data);
    let allProjectH1Tags = myDocument(".f3");
    let topicFolderPath = `./Topics/${allTopicsName}`;
    let projectFile = [];

    for(let i = 0 ; i < 10 ; i++) {
        let projectH1Tags = allProjectH1Tags[i];
        let bothATags = myDocument(projectH1Tags).find("a");
        let projectATag = myDocument(bothATags[1]);
        let projectName = projectATag.text().split("\n")[1].trim();
        let projectLink = "https://github.com"+projectATag.attr("href");
        projectFile.push({projectName , projectLink});    
    }

    fs.writeFileSync(`${topicFolderPath}/project.json` , JSON.stringify(projectFile));
}


module.exports.getTopicProjects = getTopicProjects;