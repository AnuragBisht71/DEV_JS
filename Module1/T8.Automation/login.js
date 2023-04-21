const puppeteer = require("puppeteer");
const id = "towofit285@gam1fy.com";
const pw = "123456789";
let tab;
let idx;
let gCode;

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

.then(function() {
    return waitAndClick(".ui-btn.ui-btn-normal.ui-btn-primary");
})
.then(function() {
    return tab.waitForSelector(".ui-btn.ui-btn-normal.ui-btn-line-primary.interview-ch-li-cta" , {visible: true});
})
.then(function() {
    return tab.$$(".ui-btn.ui-btn-normal.ui-btn-line-primary.interview-ch-li-cta");
})
.then(function(allQuesArray) {
    let allPendingPromises = [];
    for(let i = 0 ; i < allQuesArray.length ; i++) {
        let oneATag = allQuesArray[i];
        let pendingPromise = oneATag.evaluate(function(element){ return element.getAttribute("href"); } , oneATag);
        allPendingPromises.push(pendingPromise);
    }

    let allPromisesCombined = Promise.all(allPendingPromises);
    return allPromisesCombined;
})
.then(function(allQuesLinks) {
    let oneQuesSolvePromise = solveQuestion(allQuesLinks[0]);
    return oneQuesSolvePromise;
})
.then(function() {
    console.log("First Ques Solved successfully");
})
.catch(function(err) {
    console.log(err);
})

function getCode() {
    return new Promise(function(scb , fcb) {
        let waitPromise = tab.waitForSelector(".hackdown-content h3" , {visible: true});
        waitPromise.then(function() {
            return tab.$$(".hackdown-content h3");
        })
        .then(function(allCodeNamesElement) {
            let allCodeNamesPromises = [];
            for(let i = 0 ; i < allCodeNamesElement.length ; i++) {
                let codeNamePromises = tab.evaluate(function(elem) { return elem.textContent; } , allCodeNamesElement[i]);
                allCodeNamesPromises.push(codeNamePromises);
            }

            let combinedPromises = Promise.all(allCodeNamesPromises);
            return combinedPromises;
        })
        .then(function(allCodeNames) {
            for(let i = 0 ; i < allCodeNames.length ; i++) {
                if(allCodeNames[i] == "C++") {
                    idx = i;
                    break;
                }
            }
            return tab.$$(".hackdown-content .highlight");
        })
        .then(function(allCodeDiv) {
            let codeDiv = allCodeDiv[idx];
            return tab.evaluate(function(elem) { return elem.textContent; } , codeDiv);
        })
        .then(function(code) {
            gCode = code;
            scb();
        })
        .catch(function(error){
            fcb(error);
        })
    })
}

function pasteCode() {
    return new Promise(function (scb , fcb) {
        let waitAndClickPromise = waitAndClick(".checkbox-input");
        waitAndClickPromise.then(function() {
            return tab.waitForTimeout(2000);
        })
        .then(function() {
            return tab.type(".custominput" , gCode);
        })
        .then(function() {
            return tab.keyboard.down("Control");
        })
        .then(function() {
            return tab.keyboard.press("A");
        })
        .then(function() {
            return tab.keyboard.press("X");
        })
        .then(function() {
            return tab.click(".hr-monaco-editor-parent");
        })
        .then(function() {
            return tab.keyboard.press("A");
        })
        .then(function() {
            return tab.keyboard.press("V");
        })
        .then(function() {
            return tab.keyboard.up("Control");
        })
        .then(function() {
            scb();
        })
    })
}

function solveQuestion(questionLink) {
    return new Promise(function(scb , fcb){
        let gotoPromise = tab.goto("https://www.hackerrank.com"+questionLink);
        gotoPromise.then(function() {
            return waitAndClick('a[data-attr2="Editorial"]');
        })
        .then(function() {
            return getCode();
        })
        .then(function() {
            return tab.click('div[data-attr2="Problem"]');
        })
        .then(function() {
            return pasteCode();
        })
        .then(function(){
            return tab.click(".ui-btn.ui-btn-normal.ui-btn-primary");
        })
        .then(function() {
            scb();
        })
        .catch(function(error){
            fcb(error);
        })
    });
}

function waitAndClick(selector) {
    return new Promise(function(scb , fcb){
        let waitPromise = tab.waitForSelector(selector , {visible: true});
        waitPromise.then(function(){
            return tab.click(selector);
        })
        .then(function() {
            scb();
        })
        .catch(function() {
            fcb();
        })
    })
}




