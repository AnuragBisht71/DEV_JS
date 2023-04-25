const puppeteer = require("puppeteer");
const id = "towofit285@gam1fy.com";
const pw = "123456789";
const challenges = require("./challenges.js");

(async function() {
    let browser = await puppeteer.launch({
        headless : false, 
        defaultViewport : null, 
        args : ["--start-maximized"],

    });
    let pages = await browser.pages();
    let tab = pages[0];
    await tab.goto("https://www.hackerrank.com/auth/login");
    await tab.type("#input-1" , id);
    await tab.type("#input-2" , pw);
    await tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
    await tab.waitForSelector('div[data-analytics="NavBarProfileDropDown"]' , {visible:true});
    await tab.waitForTimeout(2000);
    await tab.click('div[data-analytics="NavBarProfileDropDown"]');
    await tab.waitForSelector('a[data-analytics="NavBarProfileDropDownAdministration"]' , {visible:true});
    await tab.click('a[data-analytics="NavBarProfileDropDownAdministration"]');
    await tab.waitForSelector(".nav-tabs.nav.admin-tabbed-nav li" , {visible:true});
    let bothLi = await tab.$$(".nav-tabs.nav.admin-tabbed-nav li");
    let manageChallengeLi = bothLi[1];
    await manageChallengeLi.click();
    await tab.waitForSelector(".btn.btn-green.backbone.pull-right");
    let createChallenge = await tab.$(".btn.btn-green.backbone.pull-right");
    let createChallengeLink = await tab.evaluate(function(elem) { return elem.getAttribute("href"); } , createChallenge);
    // createChallengeLink = "https://www.hackerrank.com/"+createChallengeLink;
    // console.log("https://www.hackerrank.com/"+createChallenge);

    for(let i = 0 ; i < challenges.length ; i++) {
        await addChallenges(browser , challenges[i]);
    }
})();

async function addChallenges(browser , challenges) {
    let newTab = await browser.newPage();
    await newTab.goto("https://www.hackerrank.com/administration/challenges/create");
    let challengeName = challenges["Challenge Name"];
    let description = challenges["Description"];
    let problemStatement = challenges["Problem Statement"];
    let inputFormat = challenges["Input Format"];
    let constraints = challenges["Constraints"];
    let outputFormat = challenges["Output Format"];
    let tags = challenges["Tags"];

    await newTab.waitForTimeout(2000);
    await newTab.type("#name" , challengeName);
    await newTab.type("#preview" , description);
    await newTab.type("#problem_statement-container .CodeMirror textarea" , problemStatement);
    await newTab.type("#input_format-container .CodeMirror textarea" , inputFormat);
    await newTab.type("#constraints-container .CodeMirror textarea" , constraints);
    await newTab.type("#output_format-container .CodeMirror textarea" , outputFormat);
    await newTab.type("#tags_tagsinput #tags_tag" , tags);
    await newTab.keyboard.press("Enter");
    await newTab.click(".save-challenge.btn.btn-green");
    await newTab.waitForTimeout(3000);
    await newTab.close();
}