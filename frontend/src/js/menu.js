document.addEventListener('DOMContentLoaded', function() {
  // Load main menu header
  fetch('../src/components/main-menu.html')
    .then(response => response.text())
    .then(data => {
      const mainMenuContainer = document.createElement('div');
      mainMenuContainer.id = 'main-menu-container';
      mainMenuContainer.innerHTML = data;
      document.body.insertBefore(mainMenuContainer, document.body.firstChild);
      
      // Load and initialize sub-menu
      return loadSubMenuContainer();
    })
    .then(() => {
      // Load footer after menu components
      return loadFooter();
    })
    .then(() => {
      // Initialize main navigation after all components are loaded
      initializeMainNav();
      initializeHoverMenu();
    })
    .catch(error => console.error('Error loading menu components:', error));
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

// Function to load sub-menu container initially
async function loadSubMenuContainer() {
  const fullSubMenuHTML = await fetchCombinedSubMenu();
  
  if (!fullSubMenuHTML || !fullSubMenuHTML.trim()) {
    console.error('Sub-menu content could not be loaded or is empty.');
    return;
  }

  // Insert sub-menu container after main menu
  const mainMenuContainer = document.getElementById('main-menu-container');
  if (mainMenuContainer) {
    mainMenuContainer.insertAdjacentHTML('afterend', fullSubMenuHTML);
    
    // Initialize sub-menu navigation for all sections
    initializeSubMenuNav();
  }
}

// Function to initialize hover menu functionality
// Sub-menus can be shown both by hover and by click
// When clicked, sub-menus stay visible until user clicks elsewhere or toggles the same menu item
function initializeHoverMenu() {
  const hasSubMenuItems = document.querySelectorAll('.has-submenu');
  const subMenuContainer = document.getElementById('sub-menu-container');
  const logoContainer = document.querySelector('.logo-container');
  const mainMenuContainer = document.getElementById('main-menu-container');
  
  let hideTimeout;
  
  function showSubMenuContainer() {
    // Show sub-menu container
    if (subMenuContainer) {
      subMenuContainer.classList.add('show');
    }
    cancelHideSubMenu();
  }
  
  function hideSubMenu() {
    hideTimeout = setTimeout(() => {
      // Only hide if the sub-menu wasn't activated by click
      // Check if any main nav item is currently active (indicating click activation)
      const activeMainNavItem = document.querySelector('#main-menu-container .main-nav a.active');
      if (!activeMainNavItem) {
        if (subMenuContainer) {
          subMenuContainer.classList.remove('show');
        }
        const allSubMenus = document.querySelectorAll('#sub-menu-container .section-nav');
        allSubMenus.forEach(menu => menu.classList.remove('active'));
      }
    }, 200); // Small delay to allow moving between menu areas
  }
  
  function cancelHideSubMenu() {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      hideTimeout = null;
    }
  }
  
  // Show submenu container when hovering over any menu item (except logo)
  hasSubMenuItems.forEach(item => {
    const link = item.querySelector('a');
    const submenuType = link.getAttribute('data-submenu');
    
    item.addEventListener('mouseenter', function() {
      showSubMenuContainer();
      
      // Hide all sub-menus first
      const allSubMenus = document.querySelectorAll('#sub-menu-container .section-nav');
      allSubMenus.forEach(menu => menu.classList.remove('active'));
      
      // Show the corresponding sub-menu
      const targetSubMenu = document.getElementById(`sub-menu-${submenuType}`);
      if (targetSubMenu) {
        targetSubMenu.classList.add('active');
      }
    });
  });
  
  // Handle main menu container hover - keep submenu visible when moving within menu
  if (mainMenuContainer) {
    mainMenuContainer.addEventListener('mouseenter', function(e) {
      // Only show submenu if hovering over submenu items, not logo
      if (!e.target.closest('.logo-container')) {
        // Check if we're over a submenu item
        const hasSubmenuParent = e.target.closest('.has-submenu');
        if (hasSubmenuParent) {
          showSubMenuContainer();
        }
      }
      cancelHideSubMenu();
    });
    
    mainMenuContainer.addEventListener('mouseleave', hideSubMenu);
  }
  
  // Prevent logo from showing sub-menu
  if (logoContainer) {
    logoContainer.addEventListener('mouseenter', function() {
      // Hide sub-menu when hovering over logo, but don't trigger the timeout
      if (subMenuContainer) {
        subMenuContainer.classList.remove('show');
      }
      const allSubMenus = document.querySelectorAll('#sub-menu-container .section-nav');
      allSubMenus.forEach(menu => menu.classList.remove('active'));
      cancelHideSubMenu();
    });
  }
  
  // Keep submenu visible when hovering over submenu itself
  if (subMenuContainer) {
    subMenuContainer.addEventListener('mouseenter', cancelHideSubMenu);
    subMenuContainer.addEventListener('mouseleave', hideSubMenu);
  }

  // Hide sub-menu when clicking outside of it
  document.addEventListener('click', function(e) {
    const isClickInsideMenu = e.target.closest('#main-menu-container') || e.target.closest('#sub-menu-container');
    const activeMainNavItem = document.querySelector('#main-menu-container .main-nav a.active');
    
    if (!isClickInsideMenu && subMenuContainer && !activeMainNavItem) {
      subMenuContainer.classList.remove('show');
      const allSubMenus = document.querySelectorAll('#sub-menu-container .section-nav');
      allSubMenus.forEach(menu => menu.classList.remove('active'));
    }
  });
}

// Function to initialize main navigation
function initializeMainNav() {
  const mainNavLinks = document.querySelectorAll('#main-menu-container .main-nav a');
  mainNavLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const section = this.getAttribute('href').substring(1);
      const submenuType = this.getAttribute('data-submenu');
      
      // Check if this is the logo link (points to home)
      if (section === 'home') {
        // Hide all sub-menus for home
        const allSubMenus = document.querySelectorAll('#sub-menu-container .section-nav');
        allSubMenus.forEach(menu => menu.classList.remove('active'));
        
        // Hide sub-menu container
        const subMenuContainer = document.getElementById('sub-menu-container');
        if (subMenuContainer) {
          subMenuContainer.classList.remove('show');
        }
        
        // Load home page content directly
        if (window.loadContent) {
          window.loadContent('home', '');
        }
        
        // Don't update main nav active state for logo clicks
        window.location.hash = `#${section}`;
      } else if (submenuType) {
        // Check if this menu item is already active (to toggle)
        const isCurrentlyActive = this.classList.contains('active');
        const subMenuContainer = document.getElementById('sub-menu-container');
        
        if (isCurrentlyActive) {
          // Toggle off: hide sub-menu and remove active states
          if (subMenuContainer) {
            subMenuContainer.classList.remove('show');
          }
          const allSubMenus = document.querySelectorAll('#sub-menu-container .section-nav');
          allSubMenus.forEach(menu => menu.classList.remove('active'));
          
          // Remove active state from all main nav items
          const mainNavLinks = document.querySelectorAll('#main-menu-container .main-nav a');
          mainNavLinks.forEach(link => link.classList.remove('active'));
        } else {
          // Show sub-menu container and corresponding sub-menu for items with submenu
          if (subMenuContainer) {
            subMenuContainer.classList.add('show');
          }
          
          // Show corresponding sub-menu and update active states
          showSubMenuSection(section);
          updateMainNav(section);
          
          // Load default content for the section if available
          if (window.loadContent) {
            window.loadContent(section, '');
          }
          
          window.location.hash = `#${section}`;
        }
      }
    });
  });
}

// Function to show specific sub-menu section
function showSubMenuSection(section) {
  // Hide all sub-menus first
  const allSubMenus = document.querySelectorAll('#sub-menu-container .section-nav');
  allSubMenus.forEach(menu => menu.classList.remove('active'));
  
  // Show the corresponding sub-menu
  const targetSubMenu = document.getElementById(`sub-menu-${section}`);
  if (targetSubMenu) {
    targetSubMenu.classList.add('active');
  }
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

// Function to load sub-menu based on selected section (kept for backwards compatibility)
// Make it available globally for router.js
window.loadSubMenu = function(section) {
  showSubMenuSection(section);
  initializeSubMenuNav(section);
};

// Function to initialize sub-menu navigation
function initializeSubMenuNav(parentSection) {
  // Initialize all sub-menu links, not just the active section
  const subMenuLinks = document.querySelectorAll('#sub-menu-container .section-nav a');
  subMenuLinks.forEach(link => {
    // Remove existing event listeners to prevent duplicates
    link.removeEventListener('click', handleSubMenuClick);
    link.addEventListener('click', handleSubMenuClick);
  });
}

// Separate function to handle sub-menu clicks
function handleSubMenuClick(e) {
  e.preventDefault();
  const subsection = this.getAttribute('href').substring(1);
  const parentSection = this.getAttribute('data-section');
  
  updateSubMenuNav(subsection);
  
  // Load content for this subsection
  if (window.loadContent) {
    window.loadContent(parentSection, subsection);
  }
  
  // Update URL hash
  window.location.hash = `#${parentSection}/${subsection}`;
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

// Function to load footer
async function loadFooter() {
  try {
    const response = await fetch('../src/components/footer.html');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const footerHTML = await response.text();
    
    if (!footerHTML.trim()) {
      console.warn('Footer content is empty.');
      return;
    }
    
    // Insert footer at the end of main-container
    const mainContainer = document.getElementById('main-container');
    if (mainContainer) {
      mainContainer.insertAdjacentHTML('beforeend', footerHTML);
    } else {
      // Fallback: append to body
      document.body.insertAdjacentHTML('beforeend', footerHTML);
    }
    
    console.log('Footer loaded successfully');
  } catch (error) {
    console.error('Error loading footer:', error);
  }
} 