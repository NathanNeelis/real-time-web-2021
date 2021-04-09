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
    sendAnimation(inputMsg)
  } else if (!inputMsg.value) {
    alert("Vul eerst bericht in!");
  }
}

socket.on('connectedUsers', (n)=>{
  const el = document.querySelector('#connectedUsers')
  el.innerText = n
})

socket.on("message", ({ userName, message, color }) => {
  createLine(userName, message, color);
});

socket.on("history", (data) => {
  console.log('history data', data);
  data.chatData.forEach((msg) => {
    createLine(msg.userName, msg.message);
  });
})

function createLine(userName, message, color) {
  const element = document.createElement("li");
  let msg = document.createElement("p");

  // element.style.color = "#" + color

  if (userName === localStorage.getItem("userName")) {
    element.classList.add("rightSide");
    msg.textContent = "You: " + message;
    element.style.color = '#363163'
    element.style.borderColor = '#363163'
    element.style.background = 'rgb(54,49,99, 0.2)'
  } else {
    msg.textContent = userName + `: ` + message;
  }

  if (message.includes("blob")) {
    console.log(message);
    const audioElement = new Audio(message);
    audioElement.setAttribute("controls", "controls");
    msg = audioElement;
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

// on enter click
inputMsg.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    sendMessage();
    sendAnimation(inputMsg)
  }
})

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
    fetchUsers();
  }, 2000)
})

// fetch all userNames
async function fetchUsers() {
  let allUsers = await fetch("/getAllUsers").then(res => res.json());
  allUsers = allUsers.allUsers;
  let usersHtmlString = "";
  allUsers.forEach(user => usersHtmlString += `${user}, `);
  typingSpan.innerText = usersHtmlString;
  return allUsers;
}

fetchUsers();



function sendAnimation(el){
  el.classList.add("messageSend")
}

function receiveAnimation(el){
  el.classList.add("messageReceived")
}

// record audio

const recordAudioBtn = document.querySelector(".recordAudioBtn");
const stopRecord = document.querySelector(".stopRecord");

recordAudioBtn.addEventListener("click", () => {
  navigator.mediaDevices.getUserMedia({audio: true})
  .then(stream => {
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();
    recordAudioBtn.innerText = "recording...";

    const audioChuncks = [];

    mediaRecorder.addEventListener("dataavailable", event => {
      audioChuncks.push(event.data);
    })

    mediaRecorder.addEventListener("stop", () => {
      const audioBlob = new Blob(audioChuncks);
      const audioUrl = URL.createObjectURL(audioBlob);
      inputMsg.value = audioUrl;
    })
    
    stopRecord.addEventListener("click", () => {
      mediaRecorder.stop();
      recordAudioBtn.innerText = "Record audio";
    })
  })
})