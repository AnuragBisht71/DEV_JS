const fs = require('fs');

let files = ["../f1.txt" , "../f2.txt" , "../f3.txt"];

for(let i = 0 ; i < files.length ; i++) {
    let filesPendingPromise = fs.promises.readFile(files[i]);
    filesPendingPromise.then(function(data){
        console.log(data+"");
    })
}


