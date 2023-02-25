import {getCurrentWeather, getWeatherForcast} from './externalAPIs';
import { postData, getData } from './serverAPIs';

/**
* @description generate a list of weather depends on how many days away is the trip
* @param {lat} latitude
* @param {lon} longtitude
* @param {xDaysAway} days until trip
* @param {destCity} city of destination
* @param {destCountry} country of destination
* @param {WEATHERBIT_API_KEY} WeatherbitAPIKey
* @returns {weatherlist} an HTML element of either the current weather or 7-days weather forcast
*/
async function generateWeatherList(lat, lon, xDaysAway, destCity, destCountry, WEATHERBIT_API_KEY) {

    // Check if the depature date is less than one week away
    if ( xDaysAway < 0) {

        throw error ('Choosen date is in the past')

    } else if (xDaysAway <= 7) {

        // MockAPI test
        //const currentWeather = await getData('/mockAPI');

        // Get current weather
        const currentWeather = await getCurrentWeather(lat, lon, WEATHERBIT_API_KEY);
            
        // Append the weather info to the new trip list item
        const currentweatherlist = showAllWeather(currentWeather.data, destCity, destCountry);

        return currentweatherlist

    } else {

        // MockAPI test
        //const currentWeather = await getData('/mockAPI');

        // Get weather forcast
        const weatherForcast = await getWeatherForcast(lat, lon, WEATHERBIT_API_KEY);

        // Append the weather info to the new trip list item
        const weatherforcastlist = showAllWeather(weatherForcast.data, destCity, destCountry)

        return weatherforcastlist

    }
}

/**
* @description display weather of multiple days
* @param {arrayOfDays} an array of JSON objects that contains weather info of multiple days
* @param {destCity} city of destination
* @param {destCountry} country of destination
* @returns {allWeatherWrapper} an HTML element of weather list
*/
function showAllWeather(arrayOfDays, destCity, destCountry) {

    // Assemble all weather wrapper to store all weather info
    const allWeatherWrapper = document.createElement("div");
    allWeatherWrapper.classList.add("allWeatherWrapper")

    // Assemble weather headline
    const headline = document.createElement("div");
    headline.innerHTML += "Weather in " + destCity + ', ' + destCountry;
    headline.classList.add("sub-title");

    allWeatherWrapper.appendChild(headline);

    // Display all weather info in the array one by one
    arrayOfDays.forEach((day, i) => {
        allWeatherWrapper.appendChild(showWeather(day, i));
    })

    return allWeatherWrapper
}

/**
* @description display weather of one day
* @param {day} a JSON object that contains weather info of a single day
* @param {index} index of the array
* @returns {weatherWrapper} an HTML element containing weather info of a single day
*/
function showWeather(day, index) {

    const daysOfWeek = ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat", "Sun"];

    // Assemble weather wrapper to store weather info
    const weatherWrapper = document.createElement("div");
    weatherWrapper.classList.add("weatherWrapper");

    // Assemble date and year
    const weatherDay = document.createElement("span");
    weatherDay.classList.add("weatherLabels");

    if (index == 0) {
        weatherDay.innerHTML += "Today";
    } else {
        const dayObj = new Date(day.valid_date);
        weatherDay.innerHTML += daysOfWeek[dayObj.getDay()];
    }

    // Assemble weather icon
    const weatherIcon = new Image();
    weatherIcon.src = "./assets/images/weatherIcons/" + day.weather.icon + ".png";
    weatherIcon.classList.add("weatherIcon");

    // Assemble weather description
    const temp = document.createElement("div");
    temp.classList.add("weatherLabels");
    temp.innerHTML += day.temp + " °C";

    weatherWrapper.appendChild(weatherDay);
    weatherWrapper.appendChild(weatherIcon);
    weatherWrapper.appendChild(temp);

    return weatherWrapper;

}


export { generateWeatherList }