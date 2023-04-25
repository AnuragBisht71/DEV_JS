const puppeteer = require("puppeteer");
const id = "towofit285@gam1fy.com";
const pw = "123456789";

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
    let createChallengeLink = await tab.evaluate(function(elem) { return elem.getAttribute("href"); } , createChallenge)
    console.log("https://www.hackerrank.com/"+createChallenge);
})();