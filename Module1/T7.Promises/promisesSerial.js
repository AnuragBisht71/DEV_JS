// Serially read content of f1 , f2 and f3 using promisified function

const fs = require('fs');

// let f1PendingPromise = fs.promises.readFile("./f1.txt" , "utf8");
// let f2PendingPromise = fs.promises.readFile("./f2.txt" , "utf8");
// let f3PendingPromise = fs.promises.readFile("./f3.txt" , "utf8");

// f1PendingPromise.then(function(data){
//     console.log(data);
//     f2PendingPromise.then(function(data){
//         console.log(data);
//         f3PendingPromise.then(function(data){
//             console.log(data);
//         });
//     });
// });


// PROMISE HELL

let f1PendingPromise = fs.promises.readFile("./f1.txt" , "utf8");
f1PendingPromise.then(function(data){
    console.log(data);
    
    let f2PendingPromise = fs.promises.readFile("./f2.txt" , "utf8");
    f2PendingPromise.then(function(data){
        console.log(data);

        let f3PendingPromise = fs.promises.readFile("./f3.txt" , "utf8");
        f3PendingPromise.then(function(data){
            console.log(data);
        });
    });
});


