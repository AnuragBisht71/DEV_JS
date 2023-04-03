// function fun() {
//     console.log("hi I am Anurag");
// }

// fun();

// let sayHi;

// sayHi = function() {
//     console.log("sayHi function");
// }

// sayHi();

function callback() {
    console.log("Hi bitches");
    return 5;
}

function highorderfunction(cb) {
    let value = cb();
    console.log(value);
}

highorderfunction(callback);

 