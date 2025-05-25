/**
 * Language Switcher Module
 * Handles switching between English and Persian
 */
import i18n from './i18n.js';

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  initLanguageControl();
});

/**
 * Initialize language control
 */
function initLanguageControl() {
  const languageToggle = document.getElementById('languageToggle');
  
  if (!languageToggle) {
    console.error('Language toggle button not found');
    return;
  }
  
  // Get the parent element (utility-control div)
  const parentElement = languageToggle.parentElement;
  
  if (!parentElement) {
    console.error('Language toggle parent element not found');
    return;
  }
  
  // Add language text to parent element (not the button)
  const langText = document.createElement('span');
  langText.className = 'lang-text';
  langText.textContent = 'EN|FA';
  parentElement.appendChild(langText);
  
  // Handle language toggle click
  languageToggle.addEventListener('click', toggleLanguage);
  
  // Initialize language based on saved preference
  setInitialLanguage();
}

/**
 * Toggle between English and Persian
 */
function toggleLanguage() {
  const currentLang = i18n.getCurrentLanguage();
  const newLang = currentLang === 'en' ? 'fa' : 'en';
  
  i18n.changeLanguage(newLang);
}

/**
 * Set initial language based on saved preference or browser settings
 */
function setInitialLanguage() {
  // Current language is already set in i18n.init()
  const currentLang = i18n.getCurrentLanguage();
  
  // For debugging
  console.log(`Initial language: ${currentLang}`);
  
  // Update DOM with correct translations
  i18n.updateDom();
} 