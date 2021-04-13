const socket = io();

const gridItem = document.querySelectorAll('.dndMap li')

const room = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

console.log(location.search)

console.log(room)

if (room) {
    socket.emit("roomID", room);
}

// Event listener for each grid item
gridItem.forEach(element => {
    element.addEventListener('click', sendLocation)

    function sendLocation() {

        if (localStorage.getItem("username")) {
            const username = localStorage.getItem("username");
            const colorSelected = localStorage.getItem("selectedColor")


            // do something realtime
            // console.log('Column', element.dataset.column, '   ', 'row', element.dataset.row)
            const playerObj = {
                column: element.dataset.column,
                row: element.dataset.row,
                color: colorSelected,
                username: username
            }

            socket.emit("location", playerObj);
        }
    }
})

socket.on("location", (playerObj) => {
    newLocation(playerObj);
});


// CREATE LOCATION FOR ALL PLAYERS 
function newLocation(playerObj) {
    // console.log('this is player location', playerLocation)

    // Remove old item 
    const previousCircle = document.getElementById(playerObj.username)
    // console.log('this item needs to be removed', thisItem)
    if (previousCircle) {
        removeOldItem(previousCircle)
    }

    // create new circle
    gridItem.forEach(element => {
        if (element.dataset.column === playerObj.column && element.dataset.row === playerObj.row) {
            // console.log('target element', element)
            addNewItem(element, playerObj)
        }

    })
}

// remove old circle
function removeOldItem(item) {
    item.remove();
}

// new circle 
function addNewItem(newItem, playerObj) {
    let newCircle = document.createElement("div");
    newCircle.classList.add('player')
    newCircle.setAttribute("id", playerObj.username);

    newItem.appendChild(newCircle);

    document.getElementById(playerObj.username).style.backgroundColor = playerObj.color;
}


const inputUsername = document.querySelector("input#username")
const color = document.getElementById('playerColor');



// LOCAL STORAGE USERNAME
if (localStorage.getItem("username")) {
    inputUsername.value = localStorage.getItem("username");
}


inputUsername.addEventListener("change", () => {
    localStorage.setItem("username", inputUsername.value);
})

// LOCAL STORAGE Color
if (localStorage.getItem("selectedColor")) {
    color.value = localStorage.getItem("selectedColor");
}

color.addEventListener("change", () => {
    localStorage.setItem("selectedColor", color.value);
})