function fn1(x, y) {
    console.log("Some process");
    return 2 * x;
}

let fa1 = (x, y) => {
    console.log("Some process");
    return 2 * x;
}


// -----------------------------


function fn2(x) {
    console.log("Some process");
    return 2 * x;
}

let fa2 = x => {
    console.log("Some process");
    return 2 * x;
}


// -----------------------------


function fn3(x) {
    return 3 * x;
}

let fa3 = x => 3 * x;

