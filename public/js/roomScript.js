firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        console.log('hello', user)
    } else {
        // No user is signed in.
        console.log('not signed in')
    }
});