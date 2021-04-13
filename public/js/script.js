const socket = io();

const gridItem = document.querySelectorAll('.dndMap li')

gridItem.forEach(element => {
    element.addEventListener('click', doSomething)

    function doSomething() {

        if (localStorage.getItem("userName")) {
            const userName = localStorage.getItem("userName");
            const colorSelected = localStorage.getItem("selectedColor")


            // do something realtime
            // console.log('Column', element.dataset.column, '   ', 'row', element.dataset.row)
            const playerLocation = {
                column: element.dataset.column,
                row: element.dataset.row,
                color: colorSelected,
                username: userName
            }

            socket.emit("location", playerLocation);
        }
    }
})

socket.on("location", (playerLocation) => {
    newLocation(playerLocation);
});


// CREATE LOCATION FOR ALL PLAYERS 
function newLocation(playerLocation) {
    // console.log('this is player location', playerLocation)

    // Remove old item 
    const previousCircle = document.getElementById(playerLocation.username)
    // console.log('this item needs to be removed', thisItem)
    if (previousCircle) {
        removeOldItem(previousCircle)
    }

    // create new circle
    gridItem.forEach(element => {
        if (element.dataset.column === playerLocation.column && element.dataset.row === playerLocation.row) {
            // console.log('target element', element)
            addNewItem(element, playerLocation)
        }

    })
}

// remove old circle
function removeOldItem(item) {
    item.remove();
}

// new circle 
function addNewItem(newItem, playerLocation) {
    let newCircle = document.createElement("div");
    newCircle.classList.add('player')
    newCircle.setAttribute("id", playerLocation.username);

    newItem.appendChild(newCircle);

    document.getElementById(playerLocation.username).style.backgroundColor = playerLocation.color;
}

const sendBtn = document.querySelector(".usernameForm button");
const inputUserName = document.querySelector("input#userName")
const color = document.getElementById('playerColor');

sendBtn.addEventListener("click", (e) => {
    e.preventDefault()
    sendMessage();
});

function sendMessage() {
    if (inputUserName.value) {
        const userObj = {
            userName: inputUserName.value,
            color: color.value
        };
        socket.emit("userName", userObj);
    } else if (!inputUserName.value) {
        alert("Vul eerst je username in!");
    }
}


// LOCAL STORAGE USERNAME
if (localStorage.getItem("userName")) {
    inputUserName.value = localStorage.getItem("userName");
}


inputUserName.addEventListener("change", () => {
    localStorage.setItem("userName", inputUserName.value);
})


// user ID connected
// socket.on('userID', (userID) => {
//     console.log('the user id', userID)
// })

// username connected
socket.on('userName', (userObj) => {
    console.log('user object', userObj)
})

// LOCAL STORAGE USERNAME
if (localStorage.getItem("selectedColor")) {
    color.value = localStorage.getItem("selectedColor");
}



color.addEventListener("change", () => {
    localStorage.setItem("selectedColor", color.value);
    console.log(color.value)
})