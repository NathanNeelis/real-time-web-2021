const express = require("express");
const path = require("path");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 8080;

require("dotenv").config();


// import routes
const login = require('./renderFunctions/login');
const playground = require('./renderFunctions/playground');
const room = require('./renderFunctions/room');


// EXPRESS ROUTeS
app.use(express.static(path.resolve("public")));

// Routing
app.get("/", login)
    .get("/room", room)
    .get("/playground", playground)
// app.post("/", postLogin)

// WEBSOCKET
io.on("connection", (socket) => {

    console.log(`User with this socket ID: ${socket.id} just connected`);

    // create room
    socket.on("roomID", (room) => {

        const roomID = room.roomid

        // connect to room
        socket.join(roomID);
        console.log('you have joined id:', roomID)

        socket.on("location", (playerLocation) => {

            // connect with datasbase? 
            // save player object to database

            // extract player object from database
            // send player object back to client

            // make a validation on grid
            console.log('player location', playerLocation)

            // Add message real time
            io.to(roomID).emit("location", playerLocation);

        });

        socket.on("message", (msgObj) => {
            // ads socket ID to message object
            msgObj = {
                userName: msgObj.userName,
                message: msgObj.message,
                socketID: socket.id,
            };

            // Add message real time
            io.to(roomID).emit("message", msgObj);
        });

        io.to(roomID).emit("roomID", roomID);

        socket.on("dice", (dice) => {
            console.log(dice)

            // Add message real time
            io.to(roomID).emit("dice", dice);
        });

    });

    socket.on('disconnect', () => { // on disconnect
        console.log('user disconnected')
    })


    // let userID = socket.id
    // io.emit('userID', userID)

    // socket.on("userName", (userObj) => {
    //     // ads socket ID to message object
    //     userObj = {
    //         userName: userObj.userName,
    //         color: userObj.color,
    //         socketID: socket.id,
    //     };

    //     console.log('user', userObj)

    //     // Add message real time
    //     io.emit("userName", userObj);
    // });



});




http.listen(port, () => {
    console.log(`server is running live on ${port}`);
});