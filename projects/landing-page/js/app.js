/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Comments should be present at the beginning of each procedure and class.
 * Great to have comments before crucial code sections within the procedure.
*/

/**
 * Define Global Variables
 * 
*/

let sections = [];
let navigations = document.getElementById('navbar__list');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// function AddActiveClassName(Element){

// }

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
function buildNavigation(){

    // console.log('start building nav');
    sections = document.getElementsByTagName('section');

    // console.log('iternate through Section Array:');
    // console.log(sections);
    for (const k in sections){
        if (sections.hasOwnProperty(k)) {

            // create a new "li" element
            let newNav = document.createElement('li');

            // Add properties
            const dataNav = sections[k].getAttribute('data-nav');
            newNav.setAttribute('class','menu__link');
            newNav.setAttribute('id', "menu__link__"+k);
            newNav.setAttribute('data-nav', dataNav);

            // Add text node
            let newNavText = document.createTextNode(dataNav);

            // Append the new menu item to the "ul" element
            newNav.appendChild(newNavText);
            navigations.appendChild(newNav);

        }
    }
}

// Add class 'active' to section when near top of viewport
function setToActive(){

    let scrollYPos = window.pageYOffset;

    // console.log('Scroll position:');
    // console.log(scrollYPos);
    
    for (const k in sections){
        if (sections.hasOwnProperty(k)) {

            // console.log('The section top:');
            // console.log(sections[k].offsetTop);
            const dataNav = sections[k].getAttribute('data-nav');

            if (scrollYPos >= (sections[k].offsetTop) && scrollYPos < (sections[k].offsetTop + sections[k].offsetHeight)){
                sections[k].classList.add('active');
                document.getElementById("menu__link__"+k).classList.add('active')
            } else {
                sections[k].classList.remove('active');
                document.getElementById("menu__link__"+k).classList.remove('active')
            }
        }
    }
}

// Scroll to anchor ID using scrollTO event
function srollToActive(e){
    const id = e.target.getAttribute('data-nav');
    let targetSection = document.getElementById(id.replace(/\s+/g, '').toLowerCase());
    window.scrollTo(0, targetSection.offsetTop);
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
document.addEventListener('DOMContentLoaded', buildNavigation());


/********** Notes for Reviewer: I'm not sure if I'm doing the timeout thing right. 
 * I have also attempted to use promise function to implement this but gave up really quickly.
 * Would love some pointers here***********/

// Set a nav link to active when a section is near top of viewport
setTimeout(() => {
    document.addEventListener('scroll', (e) => setToActive());
}, 1000);


 // Scroll to section on link click
setTimeout(() => {
    const navLinks = document.getElementsByClassName('menu__link');
    for (k in navLinks) {
        if (navLinks.hasOwnProperty(k)) {
            navLinks[k].addEventListener('click', (e) => srollToActive(e));
        }
    }
}, 1000);

// Set sections as active


