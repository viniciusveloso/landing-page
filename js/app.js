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
 * Define Global Variables
 * 
*/
const sections = document.querySelectorAll('section');
const menu_item_id_prefix = 'menu__item__';
let activeSectionId = '';

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

// Returns the ID of the most visible section or undefined when near the bottom of viewport

function getActiveSection() {
    let minTop = 10000;
    let idxMin = undefined;

    for (let i = 0; i < sections.length; i++) {
        const {top, bottom} = sections[i].getBoundingClientRect();
        if (bottom >= 300 && (idxMin == undefined || top <= minTop) ) {
            idxMin = i;
            minTop = top;
        }
    }
    return (idxMin === undefined ? undefined : sections[idxMin].id);
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// Add class 'active' to section when near top of viewport

function setActiveSection() {
    const newActiveSectionId = getActiveSection();

    if (activeSectionId != '') {
        document.getElementById(menu_item_id_prefix + activeSectionId).classList.remove('navbar__active__item');
    }
    if (newActiveSectionId != undefined) {
        document.getElementById(menu_item_id_prefix + newActiveSectionId).classList.add('navbar__active__item');
        activeSectionId = newActiveSectionId;
    }
}

// Build menu and set properties and onclic event for each item

function buildMenu() {    
    const fragment = document.createDocumentFragment();

    for (let section of sections) {
        const item = document.createElement('li');
        item.classList.add('menu__link');
        item.id = menu_item_id_prefix + section.id;
        item.textContent = section.dataset.nav;
        item.addEventListener('click', scrollToSection);
        
        fragment.appendChild(item);
    }
    document.querySelector("#navbar__list").appendChild(fragment);
}


/**
 * End Main Functions
 * Begin Events
 * 
*/

document.addEventListener('DOMContentLoaded', buildMenu);

// Scroll to section on link click
const scrollToSection = (evt) => {
    evt.preventDefault();
    const sectionId = evt.target.id.replace(menu_item_id_prefix, '');
    document.getElementById(sectionId).scrollIntoView(true);
}

// Set sections as active
document.addEventListener('scroll', setActiveSection);

