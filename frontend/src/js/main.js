// Import i18n loader
import i18n from './i18n.js';
import './portfolio-timeline.js';

document.addEventListener('DOMContentLoaded', async function() {
  // Initialize i18n module
  await i18n.init();
  
  // Apply strings to DOM elements
  i18n.updateDom();
  
  // Update document title
  document.title = i18n.getString('global.appTitle');
  
  // Manually trigger contentChanged event to initialize components
  const contentChangedEvent = new CustomEvent('contentChanged', {
    detail: { 
      section: 'home', 
      subsection: '' 
    }
  });
  document.dispatchEvent(contentChangedEvent);
  
  console.log('Application initialized');
}); 