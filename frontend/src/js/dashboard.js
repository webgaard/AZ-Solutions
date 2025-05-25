document.addEventListener('DOMContentLoaded', function() {
  // Get the dashboard button
  const dashboardToggle = document.getElementById('dashboard');
  const dashboardPanel = document.getElementById('profile-panel');
  
  // Initialize the dashboard panel with content
  initDashboardPanel();
  
  if (dashboardToggle && dashboardPanel) {
    // Create dashboard text element
    const dashboardText = document.createElement('span');
    dashboardText.className = 'profile-text';
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
        document.body.classList.contains('profile-active')
      ) {
        toggleDashboardPanel();
      }
    });
  }
});

// Function to toggle dashboard panel
function toggleDashboardPanel() {
  const dashboardPanel = document.getElementById('profile-panel');
  
  if (dashboardPanel) {
    // Toggle active class on dashboard panel
    dashboardPanel.classList.toggle('hidden');
    dashboardPanel.classList.toggle('active');
    
    // Toggle profile-active class on body
    document.body.classList.toggle('profile-active');
  }
}

// Initialize the dashboard panel with some content
function initDashboardPanel() {
  const dashboardPanel = document.getElementById('profile-panel');
  
  if (dashboardPanel) {
    // Add basic dashboard content
    dashboardPanel.innerHTML = `
      <div class="profile-header">
        <button id="close-profile" aria-label="Close dashboard">
          <i class="fas fa-times"></i>
        </button>
        <h2>User Profile</h2>
      </div>
      <div class="profile-content">
        <div class="profile-avatar">
          <i class="fas fa-user-circle fa-5x"></i>
        </div>
        <div class="profile-info">
          <h3>User Name</h3>
          <p>user@example.com</p>
        </div>
      </div>
    `;
    
    // Add event listener to close button
    const closeButton = dashboardPanel.querySelector('#close-profile');
    if (closeButton) {
      closeButton.addEventListener('click', toggleDashboardPanel);
    }
  }
} 