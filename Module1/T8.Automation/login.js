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
.then(function() {
    console.log("logged in !!");
})