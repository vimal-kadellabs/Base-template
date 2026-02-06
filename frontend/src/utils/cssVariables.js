/**
 * CSS Variable Injection Utility
 * Handles dynamic CSS custom property updates for theming
 */

import { getColorValues } from '@/settings/theme/colors';
import { getFontFamily } from '@/settings/theme/fonts';
import { getLayoutTypeCss } from '@/settings/layout/types';
import { getNavPositionCss } from '@/settings/layout/navigation';

/**
 * CSS variable prefix for the application
 */
const CSS_VAR_PREFIX = '--';

/**
 * Convert camelCase to kebab-case
 * @param {string} str - camelCase string
 * @returns {string} kebab-case string
 */
const toKebabCase = (str) => {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
};

/**
 * Set a CSS custom property on an element
 * @param {string} property - Property name (without --)
 * @param {string} value - Property value
 * @param {HTMLElement} element - Target element (defaults to :root)
 */
export const setCssVariable = (property, value, element = document.documentElement) => {
  element.style.setProperty(`${CSS_VAR_PREFIX}${property}`, value);
};

/**
 * Get a CSS custom property value
 * @param {string} property - Property name (without --)
 * @param {HTMLElement} element - Target element (defaults to :root)
 * @returns {string} Property value
 */
export const getCssVariable = (property, element = document.documentElement) => {
  return getComputedStyle(element).getPropertyValue(`${CSS_VAR_PREFIX}${property}`).trim();
};

/**
 * Remove a CSS custom property
 * @param {string} property - Property name (without --)
 * @param {HTMLElement} element - Target element (defaults to :root)
 */
export const removeCssVariable = (property, element = document.documentElement) => {
  element.style.removeProperty(`${CSS_VAR_PREFIX}${property}`);
};

/**
 * Apply color scheme CSS variables
 * @param {string} colorSchemeId - Color scheme ID
 * @param {string} mode - 'light' or 'dark'
 */
export const applyColorScheme = (colorSchemeId, mode) => {
  const colors = getColorValues(colorSchemeId, mode);
  
  Object.entries(colors).forEach(([key, value]) => {
    const cssVarName = toKebabCase(key);
    setCssVariable(cssVarName, value);
  });
};

/**
 * Apply font family CSS variable
 * @param {string} fontId - Font ID
 */
export const applyFont = (fontId) => {
  const fontFamily = getFontFamily(fontId);
  setCssVariable('font-family', fontFamily);
  
  // Also set on body for broader compatibility
  document.body.style.fontFamily = fontFamily;
};

/**
 * Apply theme mode class to document
 * @param {string} mode - 'light' or 'dark'
 */
export const applyThemeMode = (mode) => {
  const root = document.documentElement;
  
  if (mode === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  
  // Set color-scheme for native elements
  root.style.colorScheme = mode;
};

/**
 * Apply layout CSS variables
 * @param {string} layoutTypeId - Layout type ID
 */
export const applyLayoutType = (layoutTypeId) => {
  const layoutCss = getLayoutTypeCss(layoutTypeId);
  
  Object.entries(layoutCss).forEach(([key, value]) => {
    const cssVarName = `layout-${toKebabCase(key)}`;
    setCssVariable(cssVarName, value);
  });
};

/**
 * Apply navigation position CSS variables
 * @param {string} navPositionId - Navigation position ID
 */
export const applyNavPosition = (navPositionId) => {
  const navCss = getNavPositionCss(navPositionId);
  
  Object.entries(navCss).forEach(([key, value]) => {
    const cssVarName = `nav-${toKebabCase(key)}`;
    setCssVariable(cssVarName, value);
  });
};

/**
 * Apply all settings as CSS variables
 * @param {object} settings - Complete settings object
 */
export const applyAllSettings = (settings) => {
  const { mode, colorScheme, font, navigation } = settings;
  
  // Apply theme mode (light/dark class)
  applyThemeMode(mode);
  
  // Apply color scheme
  applyColorScheme(colorScheme, mode);
  
  // Apply font
  applyFont(font);
  
  // Apply layout type
  applyLayoutType(navigation.layout);
  
  // Apply navigation position
  applyNavPosition(navigation.position);
};

/**
 * Load Google Font dynamically
 * @param {string} fontUrl - Google Font URL
 * @returns {Promise} Promise that resolves when font is loaded
 */
export const loadGoogleFont = (fontUrl) => {
  return new Promise((resolve, reject) => {
    if (!fontUrl) {
      resolve(); // System font, no need to load
      return;
    }
    
    // Check if font is already loaded
    const existingLink = document.querySelector(`link[href="${fontUrl}"]`);
    if (existingLink) {
      resolve();
      return;
    }
    
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = fontUrl;
    link.onload = resolve;
    link.onerror = reject;
    
    document.head.appendChild(link);
  });
};

/**
 * Remove all custom CSS variables (reset to defaults)
 */
export const resetCssVariables = () => {
  const root = document.documentElement;
  
  // Get all custom properties set on root
  const style = root.style;
  const propsToRemove = [];
  
  for (let i = 0; i < style.length; i++) {
    const prop = style[i];
    if (prop.startsWith('--')) {
      propsToRemove.push(prop);
    }
  }
  
  propsToRemove.forEach(prop => {
    root.style.removeProperty(prop);
  });
  
  // Remove dark class
  root.classList.remove('dark');
};
