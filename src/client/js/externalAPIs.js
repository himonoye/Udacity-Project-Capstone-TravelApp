/**
* @description call Geonames API to retreat cooridnates of a given search term
* @param {destCity} city of destination
* @param {destCountry} country of destination
* @param {userName} username for Geonames account
* @returns {request} response from the API
*/
const getCoordinates =  async(city, country, userName) =>{
    "::: Call Geonames API :::"
    const request = fetch('http://api.geonames.org/searchJSON?formatted=true&q=' + city + '&username=' + userName + '&maxRows=1')
        .then (response => response.json())
        .then((data) => {
            // Pass the latitude and longtitude to Weatherbit API
            const lat = data.geonames[0].lat;
            const lon = data.geonames[0].lng;
            return {lat, lon};
        })
        .catch((e) => {
            console.log('error', e);
        })
    return request;
}

/**
* @description call Weatherbit API to retreat weather forcast for the next 7 days with a given set of cooridnates
* @param {lat} latitude
* @param {lon} longtitude
* @param {APIKey} API key for Weatherbit
* @returns {request} response from the API
*/
const getWeatherForcast =  async(lat, lng, APIKey) =>{
    "::: Call WeatherBit API :::"
    const request = fetch('https://api.weatherbit.io/v2.0/forecast/daily?' + 'lat=' + lat + '&lon=' + lng + '&key=' + APIKey + '&units=M')
        .then (response => response.json())
        .then((data) => {
            return data
        })
        .catch((e) => {
            console.log('error', e);
        })
    return request;
}


/**
* @description call Weatherbit API to retreat current weather info with a given set of cooridnates
* @param {lat} latitude
* @param {lon} longtitude
* @param {APIKey} API key for Weatherbit
* @returns {request} response from the API
*/
const getCurrentWeather =  async(lat, lng, APIKey) =>{
    "::: Call WeatherBit API :::"
    const request = fetch('https://api.weatherbit.io/v2.0/current?' + 'lat=' + lat + '&lon=' + lng + '&key=' + APIKey + '&units=M')
        .then (response => response.json())
        .then((data) => {
            return data;
        })
        .catch((e) => {
            console.log('error', e);
        })
    return request;
}

/**
* @description call PixaBay API to retreat an related image with a given search term
* @param {searchTerm} key word used for image search
* @param {APIKey} API key for pixaBay
* @returns {request} response from the API
*/
const getImageURL =  async(searchTerm, APIKey) =>{
    "::: Call PixelBay API :::"
    const request = fetch('https://pixabay.com/api/?' + 'q=' + searchTerm + '&key=' + APIKey + '&image_type=photo&orientation=horizontal')
        .then (response => response.json())
        .then((data) => {
            const imageURL = data.hits[0].webformatURL;
            return imageURL;
        })
        .catch((e) => {
            console.log('error', e);
        })
    return request;
}

export { getCoordinates, getWeatherForcast, getCurrentWeather, getImageURL }