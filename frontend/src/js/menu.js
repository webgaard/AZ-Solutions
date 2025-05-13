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
      
      // Load default sub-menu (portfolio)
      window.loadSubMenu('portfolio');
    })
    .catch(error => console.error('Error loading main menu:', error));
});

let combinedSubMenuContent = null; // Cache for sub-menu HTML

// Function to fetch and cache the sub-menu content
async function fetchCombinedSubMenu() {
  if (combinedSubMenuContent === null) { // Check if null to allow fetching even if previous attempt resulted in empty string
    try {
      const response = await fetch('../src/components/sub-menu.html');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      combinedSubMenuContent = await response.text();
      if (!combinedSubMenuContent.trim()) {
          console.warn('Fetched sub-menu.html is empty.');
          // combinedSubMenuContent remains empty string, error will be handled by caller
      }
    } catch (error) {
      console.error('Error loading sub-menu:', error);
      combinedSubMenuContent = ''; // Set to empty string on error to prevent retries only if error
    }
  }
  return combinedSubMenuContent;
}

// Function to initialize main navigation
function initializeMainNav() {
  const mainNavLinks = document.querySelectorAll('#main-menu-container .main-nav a');
  mainNavLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const section = this.getAttribute('href').substring(1);
      window.loadSubMenu(section);
      updateMainNav(section);
      
      // Update URL hash
      window.location.hash = `#${section}`;
    });
  });
}

// Function to update main navigation active state
function updateMainNav(section) {
  const mainNavLinks = document.querySelectorAll('#main-menu-container .main-nav a');
  mainNavLinks.forEach(link => {
    if (link.getAttribute('href') === `#${section}`) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Function to load sub-menu based on selected section
// Make it available globally for router.js
window.loadSubMenu = async function(section) {
  const fullSubMenuHTML = await fetchCombinedSubMenu();

  // Remove existing sub-menu if it exists
  const existingSubMenu = document.getElementById('sub-menu-container');
  if (existingSubMenu) {
    existingSubMenu.remove();
  }

  if (!fullSubMenuHTML || !fullSubMenuHTML.trim()) {
    console.error(`Sub-menu content could not be loaded or is empty. Cannot display sub-menu for ${section}.`);
    return;
  }

  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = fullSubMenuHTML;
  const subMenuContentDiv = tempDiv.querySelector(`#sub-menu-${section}-content`);

  if (subMenuContentDiv && subMenuContentDiv.innerHTML.trim()) {
    // Create a container for the sub-menu that will be a direct child of body
    const subMenuContainer = document.createElement('div');
    subMenuContainer.id = 'sub-menu-container';
    subMenuContainer.innerHTML = subMenuContentDiv.innerHTML;
    
    // Add to body directly instead of the main-header
    document.body.appendChild(subMenuContainer);
    
    initializeSubMenuNav(section);
  } else {
    console.error(`Sub-menu content for #sub-menu-${section}-content not found or is empty in sub-menu.html`);
  }
};

// Function to initialize sub-menu navigation
function initializeSubMenuNav(parentSection) {
  const subMenuLinks = document.querySelectorAll('#sub-menu-container .section-nav a');
  subMenuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const subsection = this.getAttribute('href').substring(1);
      updateSubMenuNav(subsection);
      
      // Load content for this subsection
      if (window.loadContent) {
        window.loadContent(parentSection, subsection);
      }
      
      // Update URL hash
      window.location.hash = `#${parentSection}/${subsection}`;
    });
  });
}

// Function to update sub-menu navigation active state
function updateSubMenuNav(subsection) {
  const subMenuLinks = document.querySelectorAll('#sub-menu-container .section-nav a');
  subMenuLinks.forEach(link => {
    if (link.getAttribute('href') === `#${subsection}`) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
} 