const link = "https://github.com/topics";
const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

request(link , function(err, res, data) {
    processData(data);
})

// let gitHubTopics = [];
const {getTopicProjects} = require("./getTopicProjects");

function processData(data) {
    let myDocument = cheerio.load(data);
    let allATags = myDocument(".topic-box");
    // console.log(allATags);
    for(let i = 0 ; i < allATags.length ; i++) {
        let allTopics = myDocument(allATags[i]).find("a");
        let allLinks = "https://github.com"+allTopics.attr("href");
        let allTopicsName = allTopics.find(".f3.lh-condensed.text-center").text().split("\n")[1].trim();
        let topicFolderPath = `./Topics/${allTopicsName}`;
        fs.mkdirSync(topicFolderPath);
        getTopicProjects(allTopicsName , allLinks);
        // gitHubTopics = [ {TopicName : allTopicsName , Links : allLinks} ];
        // console.log(gitHubTopics);
    }

}
