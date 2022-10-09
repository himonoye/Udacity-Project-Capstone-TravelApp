/* Global Variables */

// Personal API Key for OpenWeatherMap API
const APIkey = '6355e9fecff4b4b4baffa22bce943115'

// Create a new date instance dynamically with JS
let d = new Date();
date = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

/* Function to GET Web API Data*/
//const webAPIData = await fetch('/')
const getWeather =  async (lat, lon) =>{
    // Pass the latitude and longtitude to the Current Wheather API
    const request = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid='+APIkey + '&units=Metric')
        .then (response => response.json())
        .then((data) => {return data['main'].temp})
        .catch((e) => {
            console.log('error', e);
        })
    return request;
}
    
const getGeoDecoder =  async (zip) =>{
    const request = await fetch('http://api.openweathermap.org/geo/1.0/zip?zip='+ zip +',US'+ '&appid='+APIkey)
        .then (response => response.json())
        .then((data) => {return getWeather(data.lat, data.lon)})
        .catch((e) => {
            console.log('error', e);
        })
            // Pass the latitude and longtitude to the getWeather function
    return request;
    }

/* Function to POST data */
const postData = async (data={}) =>{
    const request = await fetch('/',{
        method: 'POST',
        credentials: 'same-origin', 
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).catch((e) => {
            console.log('error', e);
        })
}


/* Function to GET Project Data */
const retrieveData = async () =>{
    const request = await fetch('/all');
    try {
        // Transform into JSON
        const allData = await request.json()
        // Write updated data to DOM elements
        document.getElementById('temp').innerHTML = Math.round(allData.temp)+ 'degrees';
        document.getElementById('content').innerHTML = allData.feel;
        document.getElementById('date').innerHTML =allData.date;
    }
        catch(error) {
        console.log('error', error);
        // appropriately handle the error
    }
}

function checkZipValid(zip) {
    return /^\d{5}(-\d{4})?$/.test(zip)
}

function clearErrState(){
    document.getElementById('zipErr').innerText = '';
    document.getElementById('feelErr').innerText = '';
}

/* Function called by event listener */
async function onClick(){
    "::: Form Submitted :::"
    clearErrState()

    let feel, temp;
    feel = document.getElementById('feelings').value;
    zip = document.getElementById('zip').value;

    if (!checkZipValid(zip)){
        document.getElementById('zipErr').innerText = 'Please input a valid US zip code';
    }
    
    if (!feel) {
        document.getElementById('feelErr').innerText = 'This can not be empty';
    }

    if (checkZipValid(zip) && feel){
        temp = await getGeoDecoder(zip)
            .then((response) => {return response})
            .catch((e) => {
                console.log('error', e);
            })
        postData({temp: temp, feel: feel, date: date})
        .then(retrieveData())
        .catch((e) => {
            console.log('error', e);
        });
    }  

}

// Event listener to add function to existing HTML DOM element
const submitButton = document.getElementById('generate');
submitButton.addEventListener('click', onClick);
