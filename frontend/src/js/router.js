// Simple router for handling content loading
document.addEventListener('DOMContentLoaded', function() {
  const contentContainer = document.getElementById('app-content');
  const mainContent = contentContainer.querySelector('.main-content');
  
  // Function to load content for a specific section and subsection
  window.loadContent = function(section, subsection) {
    if (!contentContainer || !mainContent) {
      console.error('Content containers not found');
      return;
    }
    
    // For demonstration, we'll just show a placeholder
    mainContent.innerHTML = `
      <div class="content-container">
        <h1>${section.charAt(0).toUpperCase() + section.slice(1)}</h1>
        <h2>${subsection.charAt(0).toUpperCase() + subsection.slice(1)}</h2>
        <p>Content for ${section} > ${subsection} would be loaded here.</p>
      </div>
    `;
  };
  
  // Check for URL hash on page load
  const checkInitialRoute = () => {
    const hash = window.location.hash;
    if (hash) {
      const parts = hash.substring(1).split('/');
      const section = parts[0] || 'portfolio';
      const subsection = parts[1] || getDefaultSubsection(section);
      
      // Load the appropriate menu and content
      if (window.loadSubmenu) {
        window.loadSubmenu(section);
        loadContent(section, subsection);
      }
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
  
  // Listen for hash changes
  window.addEventListener('hashchange', function() {
    checkInitialRoute();
  });
  
  // Check initial route on page load
  setTimeout(checkInitialRoute, 500); // Delay to ensure menus are loaded
}); 