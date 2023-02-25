import { clearErrState } from './clearErrState';
import { postData, getData } from './serverAPIs';
import { getCoordinates, getImageURL } from './externalAPIs';
import { countDown } from './calculateDates';
import { showTrip } from './displayTrip';
import { generateWeatherList } from './displayWeather';

/**
* @description handle form submission event
* @param {e} click event
*/
async function handleSubmit(e){

    e.preventDefault();

    "::: Form Submitted :::"

    // Clear Error State
    clearErrState();


    // Create a new date instance dynamically with JS
    const today = new Date();

    // Extract user input
    const departCity = document.getElementById('departCity').value;
    const departCountry = document.getElementById('departCountry').value;
    const destCity = document.getElementById('destCity').value;
    const destCountry = document.getElementById('destCountry').value;
    const departDateTime = new Date(document.getElementById('departDateTime').value);
    const xDaysAway = countDown(today, departDateTime)!=-1?countDown(today, departDateTime):0;

    const temp = departCity && departCountry && destCity && destCountry && departDateTime;

    if (departCity && departCountry && destCity && destCountry && departDateTime) {

        // Construct a new trip entry using user input
        const newTripEntry = {
            today: today,
            departCity: departCity,
            departCountry: departCountry,
            destCity: destCity,
            destCountry: destCountry,
            departDateTime: departDateTime,
            xDaysAway: xDaysAway,
        }

        //Creat empty div to store APIs callback
        const tripList = document.getElementById('tripList');

        "::: API Calls start :::"

        // Get profile data from rge server
        const profile = await getData('/profile');

        // Get Coordinates of the city
        const coordinate = await getCoordinates(destCity, destCountry, profile.USER_NAME);

        // Get imageURL of the city and country
        const imageURL = await getImageURL(destCity + '+' + destCountry, profile.PIXALBAY_API_KEY);

        // Get weather list
        const weatherList = await generateWeatherList(coordinate.lat, coordinate.lon, xDaysAway, destCity, destCountry, profile.WEATHERBIT_API_KEY);

        // Create a new trip list item for the current trip
        const tripListItem = showTrip(newTripEntry, weatherList, imageURL);

        // Append the new trip list item to the trip list
        tripList.appendChild(tripListItem);

        // Post the new trip entry to the server
        postData(newTripEntry,'/all')
        .catch((e) => {
            console.log('error', e);
        });
    } else {
        document.getElementById('fieldErr').innerText = '*All fields are required';
    }

}

export { handleSubmit };