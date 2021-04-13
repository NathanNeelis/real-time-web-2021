// const socket = io();

const createRoomBtn = document.getElementById('createRoom')
const joinRoomBtn = document.getElementById('joinRoom')
const roomID = document.querySelector('.joinRoomForm input#roomID')

// room is query

// createRoomBtn.addEventListener("click", (e) => {
//     // e.preventDefault()
//     // getRoomID()

//     // window.location = '/playground'
// });

// joinRoomBtn.addEventListener("click", (e) => {
//     e.preventDefault()
//     // let roomID = roomID.value
//     // socket.emit("roomID", roomID)
//     getRoomID()
//     window.location = '/playground'
// });


// function getRoomID() {
//     if (roomID.value) {
//         socket.emit("roomID", roomID);
//         roomID.value = "";
//     } else if (!inputMsg.value) {
//         alert("Vul eerst een roomID in");
//     }
// }