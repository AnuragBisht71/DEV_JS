let a = [1, 2, 3, 4];

function double(x) {
    return 2 * x;
}

let mappedValue = a.map(double);

console.log("Original map function");
console.log(a);
console.log(mappedValue);


// -------------------------------

// myMap

function myMap(arr, f) {

    let ans = [];

    for (let i = 0; i < arr.length; i++) {
        ans.push(f(arr[i]));
    }

    return ans;
}

console.log("Created map function");
console.log(a);
console.log(myMap(a, double));

