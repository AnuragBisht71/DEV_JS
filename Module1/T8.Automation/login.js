const puppeteer = require("puppeteer");
const id = "towofit285@gam1fy.com";
const pw = "123456789";
let tab;

let browserOpenPromise = puppeteer.launch({
    headless : false, 
    defaultViewport : null, 
    args : ["--start-maximized"],
});

browserOpenPromise.then(function(browser) {
    console.log("Browser is opened !!");
    return browser.pages();
})
.then(function(pages){
    tab = pages[0];
    return tab.goto("https://www.hackerrank.com/auth/login");
})
.then(function() {
    return tab.type("#input-1" , id);
})
.then(function() {
    return tab.type("#input-2" , pw);
})
.then(function() {
    return tab.click(".ui-btn.ui-btn-large.ui-btn-primary.auth-button.ui-btn-styled");
})
// .then(function() {
//     return tab.waitForSelector(".ui-btn.ui-btn-normal.ui-btn-primary" , {visible: true});
// })
// .then(function() {
//     return tab.click(".ui-btn.ui-btn-normal.ui-btn-primary");
// })
.then(function() {
    return waithAndClick(".ui-btn.ui-btn-normal.ui-btn-primary");
})
.then(function() {
    return tab.waitForSelector(".ui-btn.ui-btn-normal.ui-btn-line-primary.interview-ch-li-cta" , {visible: true});
})
.then(function() {
    return tab.$$(".ui-btn.ui-btn-normal.ui-btn-line-primary.interview-ch-li-cta");
})
.then(function(allQuesArray){
    let allPendingPromises = [];
    for(let i = 0 ; i < allQuesArray.length ; i++) {
        let oneATag = allQuesArray[i];
        let pendingPromise = oneATag.evaluate(function(element){
            return element.getAttribute("href");
        } , oneATag);
        allPendingPromises.push(pendingPromise);
    }

    let allPromisesCombined = Promise.all(allPendingPromises);
    return allPromisesCombined;
})
.then(function(allQuesLinks){
    console.log(allQuesLinks);
})
.catch(function(err) {
    console.log(err);
})

function waithAndClick(selector) {
    return new Promise(function(scb , fcb){
        let waitPromise = tab.waitForSelector(selector , {visible: true});
        waitPromise.then(function(){
            return tab.click(selector);
        })
        .then(function(){
            scb();
        })
        .catch(function(){
            fcb();
        })
    })
}


