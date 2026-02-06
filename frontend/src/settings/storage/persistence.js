/**
 * Settings Persistence Configuration
 * localStorage keys and utilities for persisting settings
 */

/**
 * Storage keys for different settings
 */
export const STORAGE_KEYS = {
  // Main settings key (stores all settings as JSON)
  SETTINGS: 'app-settings',
  
  // Individual setting keys (for quick access)
  THEME_MODE: 'app-theme-mode',
  COLOR_SCHEME: 'app-color-scheme',
  FONT: 'app-font',
  NAV_POSITION: 'app-nav-position',
  NAV_LAYOUT: 'app-nav-layout',
  
  // Sidebar state (expanded/collapsed)
  SIDEBAR_COLLAPSED: 'app-sidebar-collapsed',
};

/**
 * Storage version for migrations
 */
export const STORAGE_VERSION = '1.0.0';

/**
 * Save settings to localStorage
 * @param {object} settings - Settings object to save
 */
export const saveSettings = (settings) => {
  try {
    const dataToSave = {
      version: STORAGE_VERSION,
      settings,
      timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(dataToSave));
    return true;
  } catch (error) {
    console.error('Failed to save settings:', error);
    return false;
  }
};

/**
 * Load settings from localStorage
 * @returns {object|null} Saved settings or null if not found
 */
export const loadSettings = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!data) return null;
    
    const parsed = JSON.parse(data);
    
    // Version check for future migrations
    if (parsed.version !== STORAGE_VERSION) {
      console.warn('Settings version mismatch, may need migration');
      // Future: implement migration logic here
    }
    
    return parsed.settings;
  } catch (error) {
    console.error('Failed to load settings:', error);
    return null;
  }
};

/**
 * Clear all settings from localStorage
 */
export const clearSettings = () => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error('Failed to clear settings:', error);
    return false;
  }
};

/**
 * Save individual setting value
 * @param {string} key - Storage key
 * @param {*} value - Value to save
 */
export const saveSetting = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Failed to save setting ${key}:`, error);
    return false;
  }
};

/**
 * Load individual setting value
 * @param {string} key - Storage key
 * @returns {*} Saved value or null
 */
export const loadSetting = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error(`Failed to load setting ${key}:`, error);
    return null;
  }
};

/**
 * Check if settings exist in storage
 * @returns {boolean} Whether settings exist
 */
export const hasStoredSettings = () => {
  return localStorage.getItem(STORAGE_KEYS.SETTINGS) !== null;
};

/**
 * Get settings age in milliseconds
 * @returns {number|null} Age in ms or null if no settings
 */
export const getSettingsAge = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!data) return null;
    
    const parsed = JSON.parse(data);
    return Date.now() - (parsed.timestamp || 0);
  } catch {
    return null;
  }
};
