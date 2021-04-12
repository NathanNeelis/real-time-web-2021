const getData = require('../utils/getData');

async function home(req, res) {
    // const url = 'https://api.unsplash.com/photos?' + new URLSearchParams({
    //     client_id: process.env.UNSPLASH_KEY,
    // })
    // console.log('fetch url', url)
    // const data = await getData(url); // FETCH THE DATA
    // console.log(data);


    res.render("home.ejs", {

    });
}

module.exports = home;