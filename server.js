const express = require("express");
const path = require("path");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 8080;

// dotenv
require("dotenv").config();


// FIREBASE Database
let fb_Config = {
    TYPE: process.env.FB_TYPE,
    project_id: process.env.FB_project_id,
    private_key_id: process.env.FB_private_key_id,
    private_key: process.env.FB_private_key.replace(/\\n/g, '\n'),
    client_email: process.env.FB_client_email,
    client_id: process.env.FB_client_id,
    auth_uri: process.env.FB_auth_uri,
    token_uri: process.env.FB_token_uri,
    auth_provider_x509_cert_url: process.env.FB_auth_provider_x509_cert_url,
    client_x509_cert_url: process.env.FB_client_x509_cert_url

}

const admin = require("firebase-admin");

admin.initializeApp({
    credential: admin.credential.cert(fb_Config)
});

const db = admin.firestore();


// import routes
const login = require('./renderFunctions/login');
const playground = require('./renderFunctions/playground');
const room = require('./renderFunctions/room');
const getData = require('./utils/getData')


// EXPRESS ROUTeS
app.use(express.static(path.resolve("public")));

// Routing
app.get("/", login)
    .get("/room", room)
    .get("/playground", playground)


// WEBSOCKET
io.on("connection", (socket) => {

    let roomID = '';
    console.log(`User with this socket ID: ${socket.id} just connected`);

    // create room
    socket.on("roomID", (room) => {

        roomID = room.roomid

        // connect to room
        socket.join(roomID);
        console.log('you have joined id:', roomID)


        socket.on("location", async (playerLocation) => {

            // add room to player object
            playerLocation = {
                username: playerLocation.username,
                room: roomID,
                color: playerLocation.color,
                column: playerLocation.column,
                row: playerLocation.row
            };

            // Save playerLocation to specific room collection in database
            // const docRef = db.collection(roomID).doc(playerLocation.username);
            // await docRef.set(playerLocation);

            await db.collection(roomID).doc(playerLocation.username).set(playerLocation);

            // make a validation on grid
            if (playerLocation.column <= 15 && playerLocation.row <= 10) {

                // extract player object from database
                db.collection(roomID).get()
                    .then(snapshot => {
                        snapshot.docs.forEach(doc => {
                            // send player object back to client
                            console.log('data from firestore', doc.data())
                            io.to(roomID).emit("location", playerLocation);
                        })
                    })
                    .catch(err => {
                        console.error('Error in getting document from FB', err);
                        process.exit();
                    })

            } else {
                console.error('there has been an error in the playerlocation', playerLocation)
            }




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

            // FETCH DICE API ON SERVER INSTEAD OF CLIENT
            const endpoint = "http://roll.diceapi.com/json/"
            const username = dice.username

            // fetch dice api
            const url = endpoint + dice.amount + dice.dice


            getData(url, username)
                .then(data => {
                    // result in const dice
                    const dice = {
                        result: data.dice,
                        username: username
                    };

                    // Add message real time
                    io.to(roomID).emit("dice", dice);
                })
        });

    });


    socket.on('disconnect', () => { // on disconnect
        console.log('user disconnected', roomID)

        // TO DO
        // if 0 players remain in room, delete all data
        // db.collection(roomID)
    })

});




http.listen(port, () => {
    console.log(`server is running live on ${port}`);
});