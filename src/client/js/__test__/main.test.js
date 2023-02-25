import { handleSubmit } from "../main.js";


// The describe() function takes two arguments - a string description, and a test suite as a callback function.  
// A test suite may contain one or more related tests    
describe("Testing the checkForURLfunctionality", () => {
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    test("Testing whether the handle submit function is defined", () => {
        expect(handleSubmit).toBeDefined();
    })
    
});