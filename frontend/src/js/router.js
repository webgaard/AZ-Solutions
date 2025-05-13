// Simple router for handling content loading
document.addEventListener('DOMContentLoaded', function() {
  const contentContainer = document.getElementById('app-content');
  const mainContent = contentContainer?.querySelector('.main-content');
  
  // Function to load content for a specific section and subsection
  window.loadContent = function(section, subsection) {
    if (!contentContainer || !mainContent) {
      console.error('Content containers not found');
      return;
    }
    
    try {
      // Update document title with current navigation
      document.title = `AZ Solutions - ${section.charAt(0).toUpperCase() + section.slice(1)} - ${subsection.charAt(0).toUpperCase() + subsection.slice(1)}`;
      
      // For demonstration, we'll just show a placeholder
      mainContent.innerHTML = `
        <div class="content-container">
          <h1>${section.charAt(0).toUpperCase() + section.slice(1)}</h1>
          <h2>${subsection.charAt(0).toUpperCase() + subsection.slice(1)}</h2>
          <p>Content for ${section} > ${subsection} would be loaded here.</p>
        </div>
      `;
      
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
      'portfolio': 'education',
      'projects': 'residential',
      'about': 'vision',
      'contact': 'email'
    };
    return defaults[section] || 'education';
  }
  
  // Check for URL hash on page load
  const checkInitialRoute = () => {
    try {
      const hash = window.location.hash;
      if (hash) {
        const parts = hash.substring(1).split('/');
        const section = parts[0] || 'portfolio';
        const subsection = parts[1] || getDefaultSubsection(section);
        
        // Load the appropriate menu and content
        if (window.loadSubMenu) {
          window.loadSubMenu(section);
          loadContent(section, subsection);
        }
      } else {
        // Handle default route when no hash is present
        const defaultSection = 'portfolio';
        const defaultSubsection = getDefaultSubsection(defaultSection);
        
        if (window.loadSubMenu) {
          window.loadSubMenu(defaultSection);
          loadContent(defaultSection, defaultSubsection);
        }
        
        // Update URL hash to reflect default route
        window.location.hash = `#${defaultSection}/${defaultSubsection}`;
      }
    } catch (error) {
      console.error('Error in route handling:', error);
    }
  };
  
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