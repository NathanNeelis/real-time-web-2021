const socket = io();

const gridItem = document.querySelectorAll('.dndMap li')

gridItem.forEach(element => {
    element.addEventListener('click', doSomething)

    function doSomething() {

        if (localStorage.getItem("userName")) {
            const userName = localStorage.getItem("userName");
            const colorSelected = localStorage.getItem("selectedColor")

            gridItem.forEach(allElements => {
                const thisItem = document.querySelector('.playerOne')

                if (thisItem) {
                    thisItem.remove();
                }
            })


            let newCircle = document.createElement("div");
            newCircle.classList.add('playerOne')
            newCircle.setAttribute("id", userName);
            element.appendChild(newCircle);

            document.querySelector('.playerOne').style.backgroundColor = colorSelected;


            // do something realtime
            console.log('Column', element.dataset.column, '   ', 'row', element.dataset.row)
            const playerLocation = {
                column: element.dataset.column,
                row: element.dataset.row,
                color: colorSelected,
                username: userName
            }

            console.log('player location', playerLocation)
            socket.emit("location", playerLocation);
        }
    }
})


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