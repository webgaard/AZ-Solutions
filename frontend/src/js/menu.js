document.addEventListener('DOMContentLoaded', function() {
  // Load main menu header
  fetch('../src/components/main-menu.html')
    .then(response => response.text())
    .then(data => {
      const mainMenuContainer = document.createElement('div');
      mainMenuContainer.id = 'main-menu-container';
      mainMenuContainer.innerHTML = data;
      document.body.insertBefore(mainMenuContainer, document.body.firstChild);
      
      // Initialize main navigation
      initializeMainNav();
    })
    .catch(error => console.error('Error loading main menu:', error));
});

// Function to initialize main navigation
function initializeMainNav() {
  const mainNavLinks = document.querySelectorAll('#main-menu-container .timeline-nav a');
  mainNavLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const section = this.getAttribute('href').substring(1);
      updateHeader(section);
      updateMainNav(section);
    });
  });
}

// Function to update main navigation active state
function updateMainNav(section) {
  const mainNavLinks = document.querySelectorAll('#main-menu-container .timeline-nav a');
  mainNavLinks.forEach(link => {
    if (link.getAttribute('href') === `#${section}`) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Function to update header based on menu selection
function updateHeader(section) {
  const header = document.getElementById('main-header');
  if (header) {
    // Update header content based on selected section
    console.log(`Updating header for section: ${section}`);
    
    // Update the active section in the navigation
    const navLinks = document.querySelectorAll('#main-header .timeline-nav a');
    navLinks.forEach(link => {
      if (link.getAttribute('data-section') === section) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
} 