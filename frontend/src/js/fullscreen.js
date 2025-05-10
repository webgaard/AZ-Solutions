const fullscreenButton = document.getElementById('fullscreen-button'); // Ensure you have a button with this ID in your HTML
const docElement = document.documentElement;

// Create fullscreen text element
const fullscreenText = document.createElement('span');
fullscreenText.className = 'fullscreen-text';
fullscreenText.textContent = 'FullScreen';
fullscreenButton.parentElement.appendChild(fullscreenText);

fullscreenButton.addEventListener('click', () => {
  toggleFullScreen();
});

function toggleFullScreen() {
  if (!document.fullscreenElement &&    // Standard syntax
      !document.mozFullScreenElement && // Firefox
      !document.webkitFullscreenElement && // Chrome, Safari and Opera
      !document.msFullscreenElement) {  // IE/Edge
    requestFullScreen(docElement);
  } else {
    exitFullScreen();
  }
}

function requestFullScreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) { // Firefox
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) { // Chrome, Safari and Opera
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) { // IE/Edge
    element.msRequestFullscreen();
  }
}

function exitFullScreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { // Firefox
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { // IE/Edge
    document.msExitFullscreen();
  }
}

// Optional: Listen for fullscreen changes (e.g., user pressing Esc)
document.addEventListener('fullscreenchange', handleFullScreenChange);
document.addEventListener('webkitfullscreenchange', handleFullScreenChange);
document.addEventListener('mozfullscreenchange', handleFullScreenChange);
document.addEventListener('MSFullscreenChange', handleFullScreenChange);

function handleFullScreenChange() {
  if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
    console.log("Entered fullscreen mode");
    // Add any classes or logic needed when entering fullscreen
    // fullscreenButton.textContent = 'Exit Fullscreen'; // Example
  } else {
    console.log("Exited fullscreen mode");
    // Add any classes or logic needed when exiting fullscreen
    // fullscreenButton.textContent = 'Enter Fullscreen'; // Example
  }
} 