document.addEventListener('DOMContentLoaded', () => {
    // Wait until the header is potentially loaded
    // Use MutationObserver to detect when the header is added to the DOM
    const observer = new MutationObserver((mutationsList, observer) => {
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            // Header loaded, initialize theme functionality
            initializeTheme(themeToggle);
            observer.disconnect(); // Stop observing once the button is found
        }
    });

    // Start observing the body for child list changes (header insertion)
    observer.observe(document.body, { childList: true, subtree: true });

    // Fallback in case the header is already present when this script runs
    const initialThemeToggle = document.getElementById('themeToggle');
    if (initialThemeToggle) {
        initializeTheme(initialThemeToggle);
        observer.disconnect(); // Ensure observer stops if already found
    }
});

function initializeTheme(themeToggle) {
    const body = document.body;
    const currentTheme = localStorage.getItem('theme');

    // Create theme toggle text element
    const themeText = document.createElement('span');
    themeText.className = 'theme-toggle-text';
    themeText.textContent = 'Dark/Light';
    themeToggle.parentElement.appendChild(themeText);

    // Ensure the theme toggle has the dot elements
    if (!themeToggle.querySelector('.light-dot')) {
        const lightDot = document.createElement('span');
        lightDot.className = 'theme-dot light-dot';
        themeToggle.appendChild(lightDot);
    }
    
    if (!themeToggle.querySelector('.dark-dot')) {
        const darkDot = document.createElement('span');
        darkDot.className = 'theme-dot dark-dot';
        themeToggle.appendChild(darkDot);
    }

    // Function to apply the theme
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light'); // Explicitly set light
        }
    };

    // Apply the initial theme
    if (currentTheme) {
        applyTheme(currentTheme);
    } else {
        // Optional: Check for system preference if no theme is saved
        // const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        // applyTheme(prefersDark ? 'dark' : 'light');
        // Default to light if no preference check needed
         applyTheme('light');
    }

    // Add event listener for the toggle button
    themeToggle.addEventListener('click', () => {
        const newTheme = body.classList.contains('dark-theme') ? 'light' : 'dark';
        applyTheme(newTheme);
    });
} 