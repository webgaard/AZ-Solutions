document.addEventListener('DOMContentLoaded', function() {
  // Get the profile toggle button
  const profileToggle = document.getElementById('profileToggle');
  const profilePanel = document.getElementById('profile-panel');
  
  // Initialize the profile panel with content
  initProfilePanel();
  
  if (profileToggle && profilePanel) {
    // Create profile text element
    const profileText = document.createElement('span');
    profileText.className = 'profile-text';
    profileText.textContent = 'Profile';
    profileToggle.parentElement.appendChild(profileText);
    
    // Add click event listener
    profileToggle.addEventListener('click', function() {
      // Toggle profile panel
      toggleProfilePanel();
    });
    
    // Close profile panel when clicking outside
    document.addEventListener('click', function(event) {
      if (
        !profilePanel.contains(event.target) && 
        !profileToggle.contains(event.target) &&
        !profilePanel.classList.contains('hidden') &&
        document.body.classList.contains('profile-active')
      ) {
        toggleProfilePanel();
      }
    });
  }
});

// Function to toggle profile panel
function toggleProfilePanel() {
  const profilePanel = document.getElementById('profile-panel');
  
  if (profilePanel) {
    // Toggle active class on profile panel
    profilePanel.classList.toggle('hidden');
    profilePanel.classList.toggle('active');
    
    // Toggle profile-active class on body
    document.body.classList.toggle('profile-active');
  }
}

// Initialize the profile panel with some content
function initProfilePanel() {
  const profilePanel = document.getElementById('profile-panel');
  
  if (profilePanel) {
    // Add basic profile content
    profilePanel.innerHTML = `
      <div class="profile-header">
        <button id="close-profile" aria-label="Close profile">
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
    const closeButton = profilePanel.querySelector('#close-profile');
    if (closeButton) {
      closeButton.addEventListener('click', toggleProfilePanel);
    }
  }
} 