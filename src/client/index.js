import './styles/style.scss';
import './styles/trip.scss';
import { handleSubmit } from './js/main.js';
import { activateServiceWorker } from './js/serviceWorker';

//test
import { postData, getData } from './js/serverAPIs.js';


// Activate service worker
activateServiceWorker();

// Event listener to add function to existing HTML DOM element
const submitButton = document.getElementById('submission');
submitButton.addEventListener('click', handleSubmit);

console.log("All code run successfully");