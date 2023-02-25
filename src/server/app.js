// Require dependencies & set up .env file config
const express  = require('express');
const cors = require('cors');
const path  = require('path');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

// Config .env file
dotenv.config();

// Setup empty JS object to act as endpoint for all routes
var tripEntry = {};

// Set up .env file
const USER_NAME = process.env.USER_NAME;
const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY;
const PIXALBAY_API_KEY = process.env.PIXALBAY_API_KEY;
const profile = {
    USER_NAME : USER_NAME, 
    WEATHERBIT_API_KEY : WEATHERBIT_API_KEY, 
    PIXALBAY_API_KEY : PIXALBAY_API_KEY
}

// Start up an instance of app
const app = express();

/* Dependencies */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

/**
* @description update data base with new trip entries
* @param {req} the request contains info about a new trip entry
* @param {res} the response is to confirm the trip info has been recieved.
*/
async function postTripEntry(req, res) {

    "::: Update Data Base :::"
    tripEntry = {
        today: req.body.today,
        departCity: req.body.departCity,
        departCountry: req.body.departCountry,
        destCity: req.body.destCity,
        destCountry: req.body.destCountry,
        departDateTime: req.body.departDateTime,
        xDaysAway: req.body.xDaysAway,
    }

    //Send updated trip entry back   
    res.send("Trip Info Received");
}

/**
* @description send back profile data that includes the API keys and username
* @param {res} the response includes API keys and username.
*/
async function getProfile(req, res) {
    "::: Send back profile data that includes the API keys and API username:::"
    res.status(200).send(profile);
}

/**
* @description send back mock API
* @param {res}
*/
async function getMockAPI(req, res) {
    "::: Send back MockAPI:::"
    res.sendFile(path.resolve('./src/server/mockAPI.json'));
}

// get data route
app.get('/profile', getProfile);

// get data route
app.get('/mockAPI', getMockAPI);

// post data route
app.post('/all', postTripEntry);


// Export for testing
module.exports = app;
exports.getProfile = getProfile;