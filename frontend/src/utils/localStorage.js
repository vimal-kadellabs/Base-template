import { STORAGE_KEYS } from '../constants/config';
import { INITIAL_USERS, DEFAULT_CONFIG } from '../constants/mockData';

/**
 * Get item from localStorage and parse JSON
 * @param {string} key - localStorage key
 * @returns {any} Parsed JSON data or null
 */
export const getItem = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error getting item from localStorage: ${key}`, error);
    return null;
  }
};

/**
 * Set item in localStorage as JSON string
 * @param {string} key - localStorage key
 * @param {any} value - Value to store
 */
export const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Error setting item in localStorage: ${key}`, error);
    return false;
  }
};

/**
 * Remove item from localStorage
 * @param {string} key - localStorage key
 */
export const removeItem = (key) => {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.error(`Error removing item from localStorage: ${key}`, error);
    return false;
  }
};

/**
 * Clear all app data from localStorage
 */
export const clearAll = () => {
  try {
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error('Error clearing localStorage', error);
    return false;
  }
};

/**
 * Initialize localStorage with mock data if not already present
 */
export const initializeStorage = () => {
  try {
    // Initialize users if not present
    if (!getItem(STORAGE_KEYS.USERS)) {
      setItem(STORAGE_KEYS.USERS, INITIAL_USERS);
      console.log('Initialized users in localStorage');
    }

    // Initialize config if not present
    if (!getItem(STORAGE_KEYS.CONFIG)) {
      setItem(STORAGE_KEYS.CONFIG, DEFAULT_CONFIG);
      console.log('Initialized config in localStorage');
    }

    return true;
  } catch (error) {
    console.error('Error initializing localStorage', error);
    return false;
  }
};

/**
 * Get all users from localStorage
 * @returns {Array} Array of user objects
 */
export const getUsers = () => {
  return getItem(STORAGE_KEYS.USERS) || [];
};

/**
 * Save users to localStorage
 * @param {Array} users - Array of user objects
 */
export const saveUsers = (users) => {
  return setItem(STORAGE_KEYS.USERS, users);
};

/**
 * Get configuration from localStorage
 * @returns {Object} Configuration object
 */
export const getConfig = () => {
  return getItem(STORAGE_KEYS.CONFIG) || DEFAULT_CONFIG;
};

/**
 * Save configuration to localStorage
 * @param {Object} config - Configuration object
 */
export const saveConfig = (config) => {
  return setItem(STORAGE_KEYS.CONFIG, config);
};

/**
 * Get session from localStorage
 * @returns {Object|null} Session object or null
 */
export const getSession = () => {
  return getItem(STORAGE_KEYS.SESSION);
};

/**
 * Save session to localStorage
 * @param {Object} session - Session object
 */
export const saveSession = (session) => {
  return setItem(STORAGE_KEYS.SESSION, session);
};

/**
 * Clear session from localStorage
 */
export const clearSession = () => {
  return removeItem(STORAGE_KEYS.SESSION);
};
