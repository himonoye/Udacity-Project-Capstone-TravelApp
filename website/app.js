/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Personal API Key for OpenWeatherMap API
const APIkey = 'https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid=6355e9fecff4b4b4baffa22bce943115'

// Event listener to add function to existing HTML DOM element
let submitButton = document.getElementById('generate');
console.log(submitButton);
submitButton.addEventListener('click', onClick());

/* Function called by event listener */
function onClick(){
    let userInput = document.getElementById("feelings").innerHTML;
    console.log(userInput);
}

/* Function to GET Web API Data*/

/* Function to POST data */


/* Function to GET Project Data */