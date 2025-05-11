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
      
      // Load default submenu (portfolio)
      window.loadSubmenu('portfolio');
    })
    .catch(error => console.error('Error loading main menu:', error));
});

let combinedSubmenuContent = null; // Cache for submenu HTML

// Function to fetch and cache the submenu content
async function fetchCombinedSubmenu() {
  if (combinedSubmenuContent === null) { // Check if null to allow fetching even if previous attempt resulted in empty string
    try {
      const response = await fetch('../src/components/submenu.html');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      combinedSubmenuContent = await response.text();
      if (!combinedSubmenuContent.trim()) {
          console.warn('Fetched submenu.html is empty.');
          // combinedSubmenuContent remains empty string, error will be handled by caller
      }
    } catch (error) {
      console.error('Error loading submenu:', error);
      combinedSubmenuContent = ''; // Set to empty string on error to prevent retries only if error
    }
  }
  return combinedSubmenuContent;
}

// Function to initialize main navigation
function initializeMainNav() {
  const mainNavLinks = document.querySelectorAll('#main-menu-container .timeline-nav a');
  mainNavLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const section = this.getAttribute('href').substring(1);
      window.loadSubmenu(section);
      updateMainNav(section);
      
      // Update URL hash
      window.location.hash = `#${section}`;
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

// Function to load submenu based on selected section
// Make it available globally for router.js
window.loadSubmenu = async function(section) {
  const fullSubmenuHTML = await fetchCombinedSubmenu();

  const header = document.getElementById('main-header');
  if (!header) {
    console.error('Header element with ID "main-header" not found.');
    return;
  }

  if (!fullSubmenuHTML || !fullSubmenuHTML.trim()) {
    console.error(`Submenu content could not be loaded or is empty. Cannot display submenu for ${section}.`);
    header.innerHTML = '<p class="error-message">Submenu could not be loaded. Please check console for details.</p>';
    return;
  }

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = fullSubmenuHTML;
  const submenuContentDiv = tempDiv.querySelector(`#submenu-${section}-content`);

  if (submenuContentDiv && submenuContentDiv.innerHTML.trim()) {
    header.innerHTML = submenuContentDiv.innerHTML;
    initializeSubmenuNav(section);
  } else {
    header.innerHTML = `<p class="error-message">Submenu for "<strong>${section}</strong>" not found. Please check configuration.</p>`;
    console.error(`Submenu content for #submenu-${section}-content not found or is empty in submenu.html`);
  }
};

// Function to initialize submenu navigation
function initializeSubmenuNav(parentSection) {
  const submenuLinks = document.querySelectorAll('#main-header .timeline-nav a');
  submenuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const subsection = this.getAttribute('href').substring(1);
      updateSubmenuNav(subsection);
      
      // Load content for this subsection
      if (window.loadContent) {
        window.loadContent(parentSection, subsection);
      }
      
      // Update URL hash
      window.location.hash = `#${parentSection}/${subsection}`;
    });
  });
}

// Function to update submenu navigation active state
function updateSubmenuNav(subsection) {
  const submenuLinks = document.querySelectorAll('#main-header .timeline-nav a');
  submenuLinks.forEach(link => {
    if (link.getAttribute('href') === `#${subsection}`) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
} 