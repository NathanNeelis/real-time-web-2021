const express = require("express");
const path = require("path");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const fetch = require("node-fetch");
const port = process.env.PORT || 8080;
let filter = require('bad-words')
filter = new filter()

const fs = require("fs");
let connectedUsers = 0; // users currently connected

app.use(express.static(path.resolve("public")));

io.on("connection", (socket) => {
connectedUsers++ // incremenent currently connected users
io.emit('connectedUsers', connectedUsers) // send msg containing number of users connected
socket.on('disconnect', ()=>{ // on disconnect
    connectedUsers-- // decrease the number of users connected
    io.emit('connectedUsers', connectedUsers) // send msg containing number of users connected
})
  console.log(`User with this socket ID: ${socket.id} just connected`);

  let history = fs.readFileSync("database.json", { encoding: "utf-8" }); // read database
  history = JSON.parse(history);
// socket.emit('connectedUsers', )
  socket.emit("history", history); // send historic chat messages

  socket.on("message", (msgObj) => {
    // data from database read file
    let data = JSON.parse(fs.readFileSync("database.json", { encoding: "utf-8" }));

    // rewrite msgObj to include socket ID

    // const randomColor = Math.floor(Math.random()*16777215).toString(16);
    
    msgObj = {
      userName: msgObj.userName,
      message: filter.clean(msgObj.message),
      socketID: socket.id,
      // color: randomColor,
    };

    // PUSH the newly added to the data file in the chatdata array
    console.log("this is msgObj", msgObj);
    data.chatData.push(msgObj);

    // Rewrite the data file with the newly added data
    const temp = fs.writeFileSync("database.json", JSON.stringify(data, null, 2));

    // Add message real time
    io.emit("message", msgObj);
  });

  socket.on("typing", (userName) => {
    io.emit("typing", userName);
  })
});

app.get("/getAllUsers", (req, res) => {
  let allUsers = [];
  let messagesData = fs.readFileSync("database.json", { encoding: "utf-8" });
  messagesData = JSON.parse(messagesData).chatData;
  messagesData.forEach((msg) => {
    if (!allUsers.includes(msg.userName)) { // if user is not already in the allUsers array
      allUsers.push(msg.userName) // push user inside array
    }
  })
  res.setHeader("Content-Type", "application/json");
  res.send({status: "ok", allUsers}); // send users to client
})

http.listen(port, () => {
  console.log(`server is running live on ${port}`);
});
