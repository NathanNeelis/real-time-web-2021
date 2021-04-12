const express = require("express");
const path = require("path");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 8080;

require("dotenv").config();


// import routes
const home = require('./renderFunctions/home');



// EXPRESS ROUTeS
app.use(express.static(path.resolve("public")));

// Routing
app.get("/", home)


// WEBSOCKET
io.on("connection", (socket) => {

    console.log(`User with this socket ID: ${socket.id} just connected`);

    socket.on('disconnect', () => { // on disconnect
        console.log('user disconnected')
    })


    // let userID = socket.id
    // io.emit('userID', userID)

    socket.on("userName", (userObj) => {
        // ads socket ID to message object
        userObj = {
            userName: userObj.userName,
            color: userObj.color,
            socketID: socket.id,
        };

        console.log('user', userObj)

        // Add message real time
        io.emit("userName", userObj);
    });

});




http.listen(port, () => {
    console.log(`server is running live on ${port}`);
});