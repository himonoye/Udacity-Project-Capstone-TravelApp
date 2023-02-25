const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/**
* @description display traveling info of a single trip
* @param {newTripEntry} a JSON object of collected user input
* @param {weatherList} an HTML element of a list of weather info for the destination of the trip
* @param {imageURL} image url of an image related to the destination of the trip
* @returns {tripItem} an HTML element containing traveling info of a single trip
*/
function showTrip(newTripEntry, weatherList, imageURL) {

    //  // Construct a new trip entry
    //  const newTripEntry = {
    //     today: today,
    //     departCity: departCity,
    //     departCountry: departCountry,
    //     destCity: destCity,
    //     destCountry: destCountry,
    //     departDateTime: departDateTime,
    //     xDaysAway: xDaysAway,
    // }

    // Assemble trip wrapper to store trip info
    const tripItem = document.createElement("div");
    tripItem.classList.add("tripItem");

    // Assemble departure day and time
    const departDateTime = document.createElement("div");
    departDateTime.classList.add("departDateTime");

    const departMonth = document.createElement("div");
    departMonth.classList.add("departMonth");
    departMonth.innerHTML += months[newTripEntry.departDateTime.getMonth()];

    const departDate = document.createElement("div");
    departDate.classList.add("departDate");
    departDate.innerHTML += newTripEntry.departDateTime.getDate();

    departDateTime.appendChild(departMonth);
    departDateTime.appendChild(departDate);

    // Assemble travel info
    const travelInfo = document.createElement("div");
    travelInfo.classList.add("travelInfo");

    // Assemble departure location
    const departure = document.createElement("span");
    departure.classList.add("tripDeparture");
    departure.innerHTML += newTripEntry.departCity + ', ' + newTripEntry.departCountry;

    // Assemble "to" label
    const toLabel = document.createElement("span");
    toLabel.classList.add("propLabel");
    toLabel.innerHTML += ' to ';

    // Assemble destination
    const destination = document.createElement("span");
    destination.classList.add("tripDestination");
    destination.innerHTML += newTripEntry.destCity + ', ' + newTripEntry.destCountry;

    travelInfo.appendChild(departure);
    travelInfo.appendChild(toLabel);
    travelInfo.appendChild(destination);
    travelInfo.appendChild(weatherList);
    
    // Assemble trip image
    const additionalInfoWrapper = document.createElement("div");
    additionalInfoWrapper.classList.add("additionalInfoWrapper");


    const tripImageWrapper = document.createElement("div");
    tripImageWrapper.classList.add("tripImageWrapper");

    const tripImage = new Image();
    tripImage.classList.add("tripImage");
    tripImage.src = imageURL;

    const pixaBayLogoWrapper = document.createElement("div");
    pixaBayLogoWrapper.classList.add("pixaBayLogoWrapper");

    const pixaBayLogo = new Image();
    pixaBayLogo.classList.add("pixaBayLogo");
    pixaBayLogo.src = "https://pixabay.com/static/img/logo.svg";

    // Assemble xDaysAway
    const xDaysAway = document.createElement("div");
    xDaysAway.classList.add("xDaysAway");
    xDaysAway.innerHTML += newTripEntry.xDaysAway + " days away";

    tripImageWrapper.appendChild(tripImage);
    pixaBayLogoWrapper.appendChild(pixaBayLogo);

    additionalInfoWrapper.appendChild(xDaysAway);
    additionalInfoWrapper.appendChild(tripImageWrapper);
    additionalInfoWrapper.appendChild(pixaBayLogoWrapper);

    tripItem.appendChild(departDateTime);
    tripItem.appendChild(travelInfo);
    tripItem.appendChild(additionalInfoWrapper);

    return tripItem;

}


export { showTrip}