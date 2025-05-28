document.addEventListener('DOMContentLoaded', function() {
  // Get the dashboard button
  const dashboardToggle = document.getElementById('dashboard');
  const dashboardPanel = document.getElementById('dashboard-panel');
  
  // Initialize the dashboard panel with content
  initDashboardPanel();
  
  if (dashboardToggle && dashboardPanel) {
    // Create dashboard text element
    const dashboardText = document.createElement('span');
    dashboardText.className = 'dashboard-text';
    dashboardText.textContent = 'Dashboard';
    dashboardToggle.parentElement.appendChild(dashboardText);
    
    // Add click event listener
    dashboardToggle.addEventListener('click', function() {
      // Toggle dashboard panel
      toggleDashboardPanel();
    });
    
    // Close dashboard panel when clicking outside
    document.addEventListener('click', function(event) {
      if (
        !dashboardPanel.contains(event.target) && 
        !dashboardToggle.contains(event.target) &&
        !dashboardPanel.classList.contains('hidden') &&
        document.body.classList.contains('dashboard-active')
      ) {
        toggleDashboardPanel();
      }
    });
  }
});

// Function to toggle dashboard panel
function toggleDashboardPanel() {
  const dashboardPanel = document.getElementById('dashboard-panel');
  
  if (dashboardPanel) {
    // Toggle active class on dashboard panel
    dashboardPanel.classList.toggle('hidden');
    dashboardPanel.classList.toggle('active');
    
    // Toggle profile-active class on body
    document.body.classList.toggle('dashboard-active');
  }
}

// Initialize the dashboard panel with some content
function initDashboardPanel() {
  const dashboardPanel = document.getElementById('dashboard-panel');
  
  if (dashboardPanel) {
    // Add basic dashboard content with portfolio sections
    dashboardPanel.innerHTML = `
      <div class="dashboard-header">
        <button id="close-dashboard" aria-label="Close dashboard">
          <i class="fas fa-times"></i>
        </button>
        <h2>Dashboard</h2>
      </div>
      <div class="dashboard-content">
        <div class="dashboard-avatar">
          <i class="fas fa-user-circle fa-3x"></i>
        </div>
        <div class="dashboard-info">
          <h3>User Profile</h3>
          <p>user@example.com</p>
        </div>
        
        <!-- Portfolio Section -->
        <div class="dashboard-section">
          <h3>Portfolio</h3>
          <div class="portfolio-links">
            <a href="#education" class="dashboard-link" data-section="portfolio">
              <i class="fas fa-graduation-cap"></i>
              <span data-i18n="submenus.portfolio.education">Education</span>
            </a>
            <a href="#experience" class="dashboard-link" data-section="portfolio">
              <i class="fas fa-briefcase"></i>
              <span data-i18n="submenus.portfolio.experience">Experience</span>
            </a>
            <a href="#skills" class="dashboard-link" data-section="portfolio">
              <i class="fas fa-tools"></i>
              <span data-i18n="submenus.portfolio.skills">Skills</span>
            </a>
            <a href="#projects" class="dashboard-link" data-section="portfolio">
              <i class="fas fa-project-diagram"></i>
              <span data-i18n="submenus.portfolio.projects">Projects</span>
            </a>
          </div>
        </div>
      </div>
    `;
    
    // Add event listener to close button
    const closeButton = dashboardPanel.querySelector('#close-dashboard');
    if (closeButton) {
      closeButton.addEventListener('click', toggleDashboardPanel);
    }
    
    // Add event listeners to portfolio links
    const portfolioLinks = dashboardPanel.querySelectorAll('.dashboard-link[data-section="portfolio"]');
    portfolioLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetHash = this.getAttribute('href');
        // Navigate to portfolio section
        window.location.hash = `portfolio${targetHash}`;
        // Close dashboard
        toggleDashboardPanel();
      });
    });
  }
} 