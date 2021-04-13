const username = document.querySelector('input#username')
const color = document.querySelector('input#playerColor')
const sendBtn = document.querySelector(".loginform button")

sendBtn.addEventListener("click", (e) => {
    e.preventDefault()
    window.location = '/room'
});

// LOCAL STORAGE USERNAME
if (localStorage.getItem("username")) {
    username.value = localStorage.getItem("username");
}


username.addEventListener("change", () => {
    localStorage.setItem("username", username.value);
})

// LOCAL STORAGE Color
if (localStorage.getItem("selectedColor")) {
    color.value = localStorage.getItem("selectedColor");
}

color.addEventListener("change", () => {
    localStorage.setItem("selectedColor", color.value);
})