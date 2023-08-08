const express = require('express');

// express => it is used to create server easily

// server is created
const app = express();

// GET METHOD with route /
app.get("/" , function(request , response) {
    response.send("<h1>Welcome To My App</h1>");
});

app.listen(4000 , function() {
    console.log("Started!!!!");
});