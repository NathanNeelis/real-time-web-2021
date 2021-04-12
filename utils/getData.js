const fetch = require('node-fetch');

async function getData(url) {
    const response = await fetch(url);
    const data = await response.json();

    // add filter functions

    return data;
}


module.exports = getData;