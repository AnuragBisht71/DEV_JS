const puppeteer = require("puppeteer");

let browserOpenPromise = puppeteer.launch({headless : false});

console.log(browserOpenPromise);

browserOpenPromise.then(function(browser) {
    console.log("Browser is opened !!");
    return browser.pages();
})
.then(function(pages){
    let tab = pages[0];
    return tab.goto("https://google.com");
})
.then(function(){
    console.log("On google homepage");
})