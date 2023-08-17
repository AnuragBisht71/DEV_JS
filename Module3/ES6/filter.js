let a = [1,2,3,4];

let filteredArray = a.filter(function(isEven) {
    return isEven % 2 == 0;
});

console.log(a);
console.log(filteredArray);
