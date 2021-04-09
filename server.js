const express = require("express");
const path = require("path");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 8080;

app.use(express.static(path.resolve("public")));


// WEBSOCKET
io.on("connection", (socket) => {

    console.log(`User with this socket ID: ${socket.id} just connected`);

    socket.on('disconnect', () => { // on disconnect
        console.log('user disconnected')
    })

});


http.listen(port, () => {
    console.log(`server is running live on ${port}`);
});