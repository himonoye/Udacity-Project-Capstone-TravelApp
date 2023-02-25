import { countDown } from "../calculateDates.js";


// The describe() function takes two arguments - a string description, and a test suite as a callback function.  
// A test suite may contain one or more related tests    
describe("Testing the checkForURLfunctionality", () => {
  
    // The test() function has two arguments - a string description, and an actual test as a callback function.  
    
    test("Testing positive result", () => {
        const dateA = new Date('2022-03-22');
        const dateB = new Date('2022-03-25');
        expect(countDown(dateA, dateB)).toBe(3);
    })

    test("Testing negative result", () => {
        const dateA = new Date('2022-03-22');
        const dateB = new Date('2022-03-20');
        expect(countDown(dateA, dateB)).toBe(-2);
    })

    test("Testing 0 result", () => {
        const dateA = new Date('2022-03-22');
        const dateB = new Date('2022-03-22');
        expect(countDown(dateA, dateB)).toBe(0);
    })
    
});
