document.addEventListener('DOMContentLoaded', function() {
  const langToggle = document.getElementById('langToggle');
  
  if (langToggle) {
    // Create language text element
    const langText = document.createElement('span');
    langText.className = 'lang-text';
    langText.textContent = 'Lang';
    langToggle.parentElement.appendChild(langText);

    // Add click event to language toggle button
    langToggle.addEventListener('click', function() {
      // Toggle between languages (to be implemented)
      console.log('Language toggle clicked');
    });
  }
}); 