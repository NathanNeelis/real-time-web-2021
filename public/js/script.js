const socket = io();


if (window.location.protocol.indexOf('https') == 0) {
    var el = document.createElement('meta')
    el.setAttribute('http-equiv', 'Content-Security-Policy')
    el.setAttribute('content', 'upgrade-insecure-requests')
    document.head.append(el)
}


const gridItem = document.querySelectorAll('.dndMap li')

const room = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});


// console.log(location.search)
// console.log(room)

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



//chatRoom
const messages = document.querySelector(".chatRoom ul");
const messageContainer = document.querySelector('.chatRoom')
const inputMsg = document.getElementById("newMessage")
const sendBtn = document.querySelector(".chatBoxItem button");


sendBtn.addEventListener("click", (e) => {
    e.preventDefault()
    sendMessage();
});

// send message to server with message and username
function sendMessage() {
    if (inputMsg.value) {
        const msgData = {
            userName: inputUsername.value,
            message: inputMsg.value,
        };
        socket.emit("message", msgData);
        inputMsg.value = "";
    } else if (!inputMsg.value) {
        alert("Vul eerst bericht in!");
    }
}

// returned socket from server create the dom element for the message
socket.on("message", ({
    userName,
    message
}) => {
    createMessage(userName, message);
});

// CREATES THE LI DOM OBJECT FOR THE MESSAGE
// TO DO: SPAN FOR USERNAME
// ANIMATION?
function createMessage(userName, message) {
    const element = document.createElement("li");
    // let userSpan = docuemnt.createElement("span");
    let msg = document.createElement("p");

    // your messages say "you" instead of your username
    if (userName === localStorage.getItem("userName")) {
        // element.classList.add("rightSide");
        msg.textContent = "You: " + message;
    } else {
        msg.textContent = userName + `: ` + message;
    }

    element.append(msg);
    messages.appendChild(element);
    messageContainer.scrollTop = messageContainer.scrollHeight;
    // receiveAnimation(element)
}



// Send room id
const activeRoom = document.querySelector(".roomID")

socket.on("roomID", (room) => {
    activeRoom.textContent = 'Room key: ' + room;
});

// DICE
const selectedDice = document.getElementById("selectDice")
const amount = document.getElementById("amountDice")
const throwDice = document.getElementById("throwDice")


throwDice.addEventListener("click", (e) => {
    e.preventDefault()
    sendDice(amount.value, selectedDice.value)
});


function sendDice(amount, selectedDie) {
    // if dice amount is 0
    if (amount === '0') {
        alert("How do you throw zero dices? Please fill in an amount")
    }

    // if everything is ok
    else if (selectedDice && amount) {

        const username = localStorage.getItem("username");
        const endpoint = "http://roll.diceapi.com/json/"

        // fetch dice api
        const url = endpoint + amount + selectedDie

        // result in const
        getData(url)
            .then(data => {
                const dice = {
                    dice: selectedDie,
                    amount: amount,
                    result: data.dice,
                    username: username
                };

                socket.emit("dice", dice);
            })

        amount.value = "";
    }

    // if there is no amount filled in
    else if (!amount) {
        alert("Please fill in an amount of dice you want to throw!");
    }
}


// die socket creating die messages
socket.on("dice", (dice) => {
    const selectedDie = dice.dice
    const result = dice.result
    let resultArray = result.map(a => a.value);
    const username = dice.username

    // loop over all results and adds all values into a string.
    let i, outcome;
    for (i = 0, len = result.length, outcome = ""; i < len; i++) {
        outcome += result[i].value + ' ';
    }

    // resource:  https://www.sololearn.com/Discuss/1325502/loop-to-add-numbers-in-array-js 


    const totalOutcome = '(' + selectedDie + ')' + '  ' + outcome // adds selected die to message
    const totalAmount = addsum(resultArray) // summing all values

    // die messages to DOM
    sendAllDices(username, totalOutcome);
    sendTotalDice(totalAmount);
});


// send message with total amount of all thrown dices
function sendTotalDice(message) {
    const element = document.createElement("li");
    // let userSpan = docuemnt.createElement("span");
    let msg = document.createElement("p");
    msg.classList.add('totalDice')

    msg.textContent = "Total: " + message;

    element.append(msg);
    messages.appendChild(element);
    messageContainer.scrollTop = messageContainer.scrollHeight;
}

// sends message with each die result
function sendAllDices(userName, message) {
    const element = document.createElement("li");
    // let userSpan = docuemnt.createElement("span");
    let msg = document.createElement("p");
    msg.classList.add('dicing')

    // your messages say "you" instead of your username
    if (userName === localStorage.getItem("userName")) {
        // element.classList.add("rightSide");
        msg.textContent = "You: " + message;
    } else {
        msg.textContent = userName + `: ` + message;
    }

    element.append(msg);
    messages.appendChild(element);
    messageContainer.scrollTop = messageContainer.scrollHeight;
    // receiveAnimation(element)
}



// fetches API data
async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// Sum - adds all dice to one value
function addsum(arr) {
    var sum = 0;
    for (var z = 0; z < arr.length; z++) {
        sum += arr[z];
    }
    return sum;
}