//Set up service worker
function activateServiceWorker() {
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js').then(() => {
            console.log('Service worker registered!');
            }).catch((error) => {
                console.warn('Error registering service worker:');
                console.warn(error);
            });
        });
    }
}

export { activateServiceWorker }