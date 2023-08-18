let a = [1, 2, 3, 4];

function sum(a, b) {
    return a + b;
}

let reducedValue = a.reduce(sum);

console.log("Original reduce function");
console.log(a);
console.log(reducedValue);


// ------------------------------------------

// myReduce

function myReduce(arr, f) {

    let ans = arr[0];

    for (let i = 1; i < arr.length; i++) {
        ans = f(ans, arr[i]);
    }

    return ans;
}

console.log("Created reduce function");
console.log(a);
console.log(myReduce(a, sum));
