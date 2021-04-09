const socket = io();

const messages = document.querySelector(".messages ul");
const userNameInput = document.querySelector("input#userName");
const inputMsg = document.querySelector("input#newMessage");
const sendBtn = document.querySelector(".inputUser button");

sendBtn.addEventListener("click", (e) => {
    e.preventDefault()
    sendAnimation(sendBtn)
    sendMessage();
});

function sendMessage() {
    if (inputMsg.value) {
        const msgData = {
            userName: userNameInput.value,
            message: inputMsg.value,
        };
        socket.emit("message", msgData);
        inputMsg.value = "";
    } else if (!inputMsg.value) {
        alert("Vul eerst bericht in!");
    }
}

// How many users are connected
socket.on('connectedUsers', (total) => {
    const el = document.querySelector('#connectedUsers')
    el.innerText = total
})

socket.on("message", ({
    userName,
    message
}) => {
    createLine(userName, message);
});

function createLine(userName, message) {
    const element = document.createElement("li");
    let msg = document.createElement("p");

    // element.style.color = "#" + color

    if (userName === localStorage.getItem("userName")) {
        element.classList.add("rightSide");
        msg.textContent = "You: " + message;
    } else {
        msg.textContent = userName + `: ` + message;
    }

    element.append(msg);
    messages.appendChild(element);
    messages.scrollTop = messages.scrollHeight;
    receiveAnimation(element)
}


if (localStorage.getItem("userName")) {
    userNameInput.value = localStorage.getItem("userName");
}

userNameInput.addEventListener("change", () => {
    localStorage.setItem("userName", userNameInput.value);
})

// IF NOT A FORM 
// on enter click
// inputMsg.addEventListener("keyup", (event) => {
//     if (event.key === "Enter") {
//         sendMessage();
//         sendAnimation(inputMsg)
//     }
// })


function sendAnimation(el) {
    el.classList.add("messageSend")
}

function receiveAnimation(el) {
    el.classList.add("messageReceived")
}


// user is typing...
inputMsg.addEventListener("keyup", () => {
    if (userNameInput.value) {
        socket.emit("typing", userNameInput.value);
    }
})

const typingSpan = document.querySelector(".typingStatus");

socket.on("typing", (userName) => {
    typingSpan.innerText = `${userName} is typing...`;
    setTimeout(() => {
        typingSpan.textContent = ' ';
    }, 4000)
})