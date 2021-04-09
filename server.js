const express = require("express");
const path = require("path");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 8080;


app.use(express.static(path.resolve("public")));

app.set('view engine', 'ejs') // templating engine = ejs
    .set('views', 'views') // find the views in views(route)
    .get("/", home)


function home(req, res) {
    res.render("home.ejs");
}

let connectedUsers = 0; // users currently connected

// WEB SOCKETS
io.on("connection", (socket) => {
    // console.log(`User with this socket ID: ${socket.id} just connected`);
    connectedUsers++ // increases users connected
    io.emit('connectedUsers', connectedUsers) // sends amount of connected users to client

    socket.on('disconnect', () => { // on disconnect
        connectedUsers-- // decrease users connected
        io.emit('connectedUsers', connectedUsers) // sends amount of connected users to client
    })

    socket.on("message", (msgObj) => {
        // ads socket ID to message object
        msgObj = {
            userName: msgObj.userName,
            message: msgObj.message,
            socketID: socket.id,
        };

        // console.log('message', msgObj)

        // Add message real time
        io.emit("message", msgObj);
    });

    socket.on("typing", (userName) => {
        io.emit("typing", userName);
    })

});



http.listen(port, () => {
    console.log(`server is running live on ${port}`);
});