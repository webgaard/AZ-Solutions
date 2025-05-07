document.addEventListener('DOMContentLoaded', function() {
  fetch('/src/components/header.html') // Assuming header component is here
    .then(response => response.text())
    .then(data => {
      const headerPlaceholder = document.getElementById('main-header');
      if (headerPlaceholder) {
        headerPlaceholder.innerHTML = data;
      } else {
        console.error('Header placeholder element with ID "main-header" not found.');
      }
    })
    .catch(error => console.error('Error loading header:', error));
}); 