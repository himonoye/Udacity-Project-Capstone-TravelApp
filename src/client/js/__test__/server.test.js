import app  from "../../../server/app.js";
import { getProfile }  from "../../../server/app.js";
import request from "supertest"


// The describe() function takes two arguments - a string description, and a test suite as a callback function.  
// A test suite may contain one or more related tests    
describe("Testing the get functionality", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  

    test("Testing get /profile", async() => {

        const res = await request(app).get('/profile', getProfile);
        
        expect(JSON.parse(res.text).PIXALBAY_API_KEY).toBeDefined();
        expect(JSON.parse(res.text).WEATHERBIT_API_KEY).toBeDefined();
        expect(JSON.parse(res.text).USER_NAME).toBeDefined();

        //console.log(res);
        //expect(res.status).toBe(200);
    })
    
});

