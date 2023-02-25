/**
* @description return the number of days between two dates
* @param {dateA} first of the two dates to compare
* @param {dateB} second of the two dates to compare
* @returns {xDaysAway} the number of days away between dateA and date B. The number could be negative
*/
function countDown(dateA, dateB) {
    const xDaysAway = Math.ceil((dateB.getTime() - dateA.getTime())/(1000*3600*24));
    return xDaysAway
}

export {countDown}