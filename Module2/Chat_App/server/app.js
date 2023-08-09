const express = require('express');

// express => it is used to create server easily

// server is created
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

// GET METHOD with route /
// app.get("/" , function(request , response) {
//     response.send("<h1>Welcome To My App</h1>");
// });

app.use(express.static("client"));

let users = [];

io.on("connection", function (socket) {
    console.log(socket.id, "Socket Connected !!!");

    socket.on("user-connected", function (name) {
        users.push({ id: socket.id, name: name });
        console.log(users);

        socket.broadcast.emit("user-joined", name);
    });

    socket.on("disconnect", function () {
        let disconnectedUser;
        let filteredUsers = users.filter((userObj) => {
            if (userObj.id == socket.id) {
                disconnectedUser = userObj;
                return false;
            }
            return true;
        });
        users = filteredUsers;
        socket.broadcast.emit("user-leave", disconnectedUser.name);
    });
});

server.listen(4000, function () {
    console.log("Started!!!!");
});