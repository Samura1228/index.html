// Initialize Telegram Mini App
let tg = window.Telegram.WebApp;
tg.expand(); // Expand the Web App to take the full screen

// Initialize app state
const state = {
    user: null,
    currentSection: 'browse'
};

// DOM Elements
const navLinks = document.querySelectorAll('nav a');
const sections = document.querySelectorAll('main section');
const userInfoElement = document.getElementById('user-info');

// Apply Telegram theme
document.body.classList.add(tg.colorScheme === 'dark' ? 'dark-theme' : 'light-theme');

// Set up event listeners
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const section = link.getAttribute('data-section');
        changeSection(section);
    });
});

// Change active section
function changeSection(sectionId) {
    // Update navigation
    navLinks.forEach(link => {
        if (link.getAttribute('data-section') === sectionId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Update sections
    sections.forEach(section => {
        if (section.id === sectionId) {
            section.classList.add('active');
        } else {
            section.classList.remove('active');
        }
    });
    
    state.currentSection = sectionId;
    updateBackButton();
}

// Get user data from Telegram
if (tg.initDataUnsafe && tg.initDataUnsafe.user) {
    state.user = tg.initDataUnsafe.user;
    
    // Display user info
    userInfoElement.innerHTML = `
        <span>${state.user.first_name}</span>
    `;
}

// Set up back button handler
tg.BackButton.onClick(() => {
    if (state.currentSection !== 'browse') {
        changeSection('browse');
        return;
    }
    
    tg.close();
});

// Show back button when not on browse section
function updateBackButton() {
    if (state.currentSection !== 'browse') {
        tg.BackButton.show();
    } else {
        tg.BackButton.hide();
    }
}

// Initialize
updateBackButton();
