function fun() {
    console.log("hi I am Anurag");
}

// fun();

let sayHi;

sayHi = function() {
    console.log("sayHi function");
}

// sayHi();



// High Order Function => functions which accepts function as a argument
// Callback Function => function which are passed as a argument in a function


function callback() { // This is a callback function
    console.log("Hi bitches");
    return 5;
}

function highorderfunction(cb) { 
    let value = cb();
    console.log(value);
}

highorderfunction(callback); // This is a high order function

 