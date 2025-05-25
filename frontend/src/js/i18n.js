/**
 * Multi-language i18n string loader
 */
class I18nLoader {
  constructor() {
    this.strings = {};
    this.initialized = false;
    this.currentLanguage = 'en'; // Default language
    this.supportedLanguages = ['en', 'fa']; // English and Persian/Farsi
  }

  /**
   * Initialize the loader by fetching the strings for all languages
   * @returns {Promise<boolean>} Success status
   */
  async init() {
    try {
      // Load English strings (default)
      const enResponse = await fetch('../src/config/strings.json');
      if (!enResponse.ok) {
        throw new Error('Failed to load English strings');
      }
      
      // Load Persian strings
      const faResponse = await fetch('../src/config/strings-fa.json');
      if (!faResponse.ok) {
        console.warn('Persian strings not found, fallback to English');
      } else {
        this.strings.fa = await faResponse.json();
      }
      
      this.strings.en = await enResponse.json();
      
      // Get saved language preference or use default
      const savedLanguage = localStorage.getItem('language');
      if (savedLanguage && this.supportedLanguages.includes(savedLanguage)) {
        this.currentLanguage = savedLanguage;
      }
      
      this.initialized = true;
      
      // Update language attribute on html element
      document.documentElement.lang = this.currentLanguage;
      document.documentElement.dir = this.currentLanguage === 'fa' ? 'rtl' : 'ltr';
      
      return true;
    } catch (error) {
      console.error('Error loading strings:', error);
      this.strings = { en: {} };
      return false;
    }
  }

  /**
   * Get a string by its key path (e.g., "navigation.portfolio")
   * @param {string} keyPath - The dot-notation path to the string
   * @returns {string} The localized string or the key if not found
   */
  getString(keyPath) {
    if (!this.initialized) {
      console.warn('I18n not initialized. Returning key:', keyPath);
      return keyPath;
    }

    const keys = keyPath.split('.');
    let current = this.strings[this.currentLanguage];

    // Fallback to English if current language doesn't have the string
    if (!current) {
      current = this.strings.en;
    }

    // Navigate through the object based on the key path
    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        // Try fallback to English for this specific key
        if (this.currentLanguage !== 'en') {
          let enCurrent = this.strings.en;
          let found = true;
          
          for (const k of keys) {
            if (enCurrent && enCurrent[k] !== undefined) {
              enCurrent = enCurrent[k];
            } else {
              found = false;
              break;
            }
          }
          
          if (found) {
            return enCurrent;
          }
        }
        
        console.warn(`String key not found: ${keyPath}`);
        return keyPath;
      }
    }

    return current;
  }

  /**
   * Change the current language
   * @param {string} language - The language code to switch to
   * @returns {boolean} Success status
   */
  changeLanguage(language) {
    if (!this.supportedLanguages.includes(language)) {
      console.warn(`Unsupported language: ${language}`);
      return false;
    }
    
    this.currentLanguage = language;
    localStorage.setItem('language', language);
    
    // Update language attribute on html element
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'fa' ? 'rtl' : 'ltr';
    
    // Update all translated elements
    this.updateDom();
    
    // Dispatch event for other components to react to language change
    const event = new CustomEvent('languageChanged', { 
      detail: { language } 
    });
    document.dispatchEvent(event);
    
    return true;
  }

  /**
   * Replace all data-i18n elements with their corresponding strings
   */
  updateDom() {
    if (!this.initialized) {
      console.warn('I18n not initialized. Cannot update DOM.');
      return;
    }

    // Find all elements with data-i18n attribute
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      const text = this.getString(key);
      
      // If the element has data-i18n-attr, set that attribute instead of innerText
      const attr = element.getAttribute('data-i18n-attr');
      if (attr) {
        element.setAttribute(attr, text);
      } else {
        element.innerText = text;
      }
    });
    
    // Update document title
    document.title = this.getString('global.appTitle');
  }
  
  /**
   * Get the current language
   * @returns {string} Current language code
   */
  getCurrentLanguage() {
    return this.currentLanguage;
  }
  
  /**
   * Get all supported languages
   * @returns {Array} Array of supported language codes
   */
  getSupportedLanguages() {
    return this.supportedLanguages;
  }
}

// Create and export a singleton instance
const i18n = new I18nLoader();
export default i18n; 