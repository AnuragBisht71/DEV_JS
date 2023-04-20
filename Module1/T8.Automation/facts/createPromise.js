const fs = require('fs');

function myPromisifiedFun(filePath) {
    return new Promise(function(scb , fcb){
        fs.readFile(filePath , function(error , data){
            if(error) {
                fcb("FailureCallback");
            }
            else {
                scb("SuccessfulCallback");
            }
        })
    })
}


let pendingPromise = myPromisifiedFun("./f1.txt");

pendingPromise.then(scb);
pendingPromise.catch(fcb);

function scb(data){
    console.log(data+"");
}

function fcb(error){
    console.log(error);
}



