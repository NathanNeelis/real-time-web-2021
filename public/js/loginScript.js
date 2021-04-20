const username = document.querySelector('input#username')
const color = document.querySelector('input#playerColor')
const sendBtn = document.querySelector(".loginform button")

sendBtn.addEventListener("click", (e) => {
    e.preventDefault()
    window.location = '/room'
});



// LOCAL STORAGE Color
if (localStorage.getItem("selectedColor")) {
    color.value = localStorage.getItem("selectedColor");
}

color.addEventListener("change", () => {
    localStorage.setItem("selectedColor", color.value);
})



const loginBtn = document.getElementById("googleLogin")
loginBtn.addEventListener("click", googleSignIn)

const logoutBtn = document.getElementById("logout")
logoutBtn.addEventListener("click", signOut)

const userform = document.getElementById("loginForm")


function googleSignIn() {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
        .then(result => {
            console.log(result.user)
            console.log(result.user.displayName)
            console.log("login succes")
            localStorage.setItem("username", result.user.displayName);
            username.value = result.user.displayName
        })
        .catch(err => {
            console.log(err)
            console.log('login failed')
        })
}

function signOut() {
    console.log('logout')
    firebase.auth().signOut()
        .then(() => {
            console.log('user has been signed out')
            loginBtn.classList.remove("hide")
            logoutBtn.classList.add("hide")
            userform.classList.add("deactivated")
        })
        .catch(err => {
            console.error(err)
        })
}

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        console.log('hello', user)

        userform.classList.remove("deactivated")

        loginBtn.classList.add("hide")
        logoutBtn.classList.remove("hide")
    } else {
        // No user is signed in.
        console.log('not signed in')
    }
});


// LOCAL STORAGE USERNAME
if (localStorage.getItem("username")) {
    username.value = localStorage.getItem("username");
}


username.addEventListener("change", () => {
    localStorage.setItem("username", username.value);
})