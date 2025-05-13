/**
 * Simple i18n string loader
 */
class I18nLoader {
  constructor() {
    this.strings = null;
    this.initialized = false;
  }

  /**
   * Initialize the loader by fetching the strings
   * @returns {Promise<boolean>} Success status
   */
  async init() {
    try {
      const response = await fetch('../src/config/strings.json');
      if (!response.ok) {
        throw new Error('Failed to load strings');
      }
      
      this.strings = await response.json();
      this.initialized = true;
      return true;
    } catch (error) {
      console.error('Error loading strings:', error);
      this.strings = {};
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
    let current = this.strings;

    // Navigate through the object based on the key path
    for (const key of keys) {
      if (current && current[key] !== undefined) {
        current = current[key];
      } else {
        console.warn(`String key not found: ${keyPath}`);
        return keyPath;
      }
    }

    return current;
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
  }
}

// Create and export a singleton instance
const i18n = new I18nLoader();
export default i18n; 