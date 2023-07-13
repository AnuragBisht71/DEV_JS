function getFirstName(fullName) { // This is a callback function
    // fullName = fullName.split(" ");
    return fullName;
}

function getLastName(fullName) { // This is a callback function
    // fullName = fullName.split(" ");
    return fullName;
}

function fun(fullName , cb) {
    let name = cb(fullName);
    console.log(name);
}

fun("Anurag Bisht" , getFirstName); // This is a high order function
fun("Mohit Singh" , getLastName); // This is a high order function