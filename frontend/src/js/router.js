// Import home page module
import { homePage } from './home.js';
// Import team page module
import { teamPage } from './team.js';

// Simple router for handling content loading
document.addEventListener('DOMContentLoaded', function() {
  const contentContainer = document.getElementById('app-content');
  const mainContent = contentContainer?.querySelector('.main-content');
  
  // Function to load content for a specific section and subsection
  window.loadContent = async function(section, subsection) {
    if (!contentContainer || !mainContent) {
      console.error('Content containers not found');
      return;
    }
    
    try {
      // Handle home page specially
      if (section === 'home') {
        document.title = 'AZ Arch - Home';
        const homeContent = await homePage.loadContent();
        mainContent.innerHTML = homeContent;
        
        // Initialize home page interactions after content is loaded
        setTimeout(() => {
          homePage.initializeInteractions();
        }, 100);
        
        // Update i18n if available
        if (window.i18n && window.i18n.updateDom) {
          window.i18n.updateDom();
        }
      } else if (section === 'aboutus' && subsection === 'team') {
        // Handle team section
        document.title = 'AZ Arch - About Us - Team';
        const teamContent = await teamPage.loadContent();
        mainContent.innerHTML = teamContent;
        
        // Initialize team page interactions after content is loaded
        setTimeout(() => {
          teamPage.initializeInteractions();
        }, 100);
        
        // Update i18n if available
        if (window.i18n && window.i18n.updateDom) {
          window.i18n.updateDom();
        }
      } else {
        // Update document title with current navigation
        document.title = `AZ Arch - ${section.charAt(0).toUpperCase() + section.slice(1)} - ${subsection.charAt(0).toUpperCase() + subsection.slice(1)}`;
        
        // For demonstration, we'll just show a placeholder
        mainContent.innerHTML = `
          <div class="content-container">
            <h1>${section.charAt(0).toUpperCase() + section.slice(1)}</h1>
            <h2>${subsection.charAt(0).toUpperCase() + subsection.slice(1)}</h2>
            <p>Content for ${section} > ${subsection} would be loaded here.</p>
          </div>
        `;
      }
      
      // Dispatch event to notify content has changed
      const contentChangedEvent = new CustomEvent('contentChanged', {
        detail: { section, subsection }
      });
      document.dispatchEvent(contentChangedEvent);
    } catch (error) {
      console.error('Error loading content:', error);
      mainContent.innerHTML = `<div class="error-message">Error loading content. Please try again.</div>`;
    }
  };
  
  // Default subsections for each main section
  function getDefaultSubsection(section) {
    const defaults = {
      'home': '',
      'discover': 'projects',
      'blog': 'posts',
      'joinus': 'signin',
      'aboutus': 'vision'
    };
    return defaults[section] || 'projects';
  }
  
  // Check for URL hash on page load
  const checkInitialRoute = () => {
    try {
      const hash = window.location.hash;
      if (hash) {
        const parts = hash.substring(1).split('/');
        const section = parts[0] || 'home';
        const subsection = parts[1] || getDefaultSubsection(section);
        
        // Load the appropriate menu and content
        if (window.loadSubMenu) {
          window.loadSubMenu(section);
          loadContent(section, subsection);
          
          // Set active main menu and submenu items
          updateMainNav(section);
          setTimeout(() => {
            updateSubMenuNav(subsection);
          }, 100); // Small delay to ensure submenu is loaded
        }
      } else {
        // Handle default route when no hash is present - load home page
        const defaultSection = 'home';
        
        // Load home page directly without submenu
        loadContent(defaultSection, '');
        
        // Update URL hash to reflect default route
        window.location.hash = `#${defaultSection}`;
      }
    } catch (error) {
      console.error('Error in route handling:', error);
    }
  };
  
  // Helper function to update main navigation state
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
  
  // Helper function to update submenu navigation state
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
  
  // Listen for hash changes
  window.addEventListener('hashchange', function() {
    checkInitialRoute();
  });
  
  // Check initial route on page load - use requestAnimationFrame for better performance
  window.requestAnimationFrame(() => {
    // Small delay to ensure menus are loaded
    setTimeout(checkInitialRoute, 300);
  });
}); 