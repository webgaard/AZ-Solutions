// Import i18n loader
import i18n from './i18n.js';

document.addEventListener('DOMContentLoaded', async function() {
  // Initialize i18n module
  await i18n.init();
  
  // Apply strings to DOM elements
  i18n.updateDom();
  
  // Update document title
  document.title = i18n.getString('global.appTitle');
  
  console.log('Application initialized');
}); 