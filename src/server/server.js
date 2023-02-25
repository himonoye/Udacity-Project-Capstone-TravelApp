const app = require('./app.js');

// Spin up the server
const port = 8000;
app.listen(8000, ()=>{console.log(`Running on local host: ${port}`)})