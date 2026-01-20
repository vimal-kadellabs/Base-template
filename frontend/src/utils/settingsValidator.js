/**
 * Settings Validator Utility
 * Validates and sanitizes settings configurations
 */

import { isValidMode, THEME_MODES } from '@/settings/theme/modes';
import { isValidColorScheme, COLOR_SCHEMES } from '@/settings/theme/colors';
import { isValidFont, FONTS } from '@/settings/theme/fonts';
import { isValidNavPosition, NAV_POSITIONS } from '@/settings/layout/navigation';
import { isValidLayoutType, LAYOUT_TYPES } from '@/settings/layout/types';
import { defaultSettings } from '@/settings/theme/defaults';

/**
 * Validation result type
 * @typedef {Object} ValidationResult
 * @property {boolean} valid - Whether validation passed
 * @property {string[]} errors - Array of error messages
 * @property {object} sanitized - Sanitized settings object
 */

/**
 * Validate theme mode
 * @param {string} mode - Mode to validate
 * @returns {object} Validation result
 */
export const validateMode = (mode) => {
  if (isValidMode(mode)) {
    return { valid: true, value: mode };
  }
  return { 
    valid: false, 
    value: defaultSettings.mode,
    error: `Invalid mode: ${mode}. Using default: ${defaultSettings.mode}`
  };
};

/**
 * Validate color scheme
 * @param {string} colorScheme - Color scheme to validate
 * @returns {object} Validation result
 */
export const validateColorScheme = (colorScheme) => {
  if (isValidColorScheme(colorScheme)) {
    return { valid: true, value: colorScheme };
  }
  return { 
    valid: false, 
    value: defaultSettings.colorScheme,
    error: `Invalid color scheme: ${colorScheme}. Using default: ${defaultSettings.colorScheme}`
  };
};

/**
 * Validate font
 * @param {string} font - Font to validate
 * @returns {object} Validation result
 */
export const validateFont = (font) => {
  if (isValidFont(font)) {
    return { valid: true, value: font };
  }
  return { 
    valid: false, 
    value: defaultSettings.font,
    error: `Invalid font: ${font}. Using default: ${defaultSettings.font}`
  };
};

/**
 * Validate navigation position
 * @param {string} position - Position to validate
 * @returns {object} Validation result
 */
export const validateNavPosition = (position) => {
  if (isValidNavPosition(position)) {
    return { valid: true, value: position };
  }
  return { 
    valid: false, 
    value: defaultSettings.navigation.position,
    error: `Invalid nav position: ${position}. Using default: ${defaultSettings.navigation.position}`
  };
};

/**
 * Validate layout type
 * @param {string} layout - Layout type to validate
 * @returns {object} Validation result
 */
export const validateLayoutType = (layout) => {
  if (isValidLayoutType(layout)) {
    return { valid: true, value: layout };
  }
  return { 
    valid: false, 
    value: defaultSettings.navigation.layout,
    error: `Invalid layout type: ${layout}. Using default: ${defaultSettings.navigation.layout}`
  };
};

/**
 * Validate complete settings object
 * @param {object} settings - Settings to validate
 * @returns {ValidationResult} Validation result with sanitized settings
 */
export const validateSettings = (settings) => {
  const errors = [];
  const sanitized = {
    navigation: {}
  };
  
  // Validate mode
  const modeResult = validateMode(settings?.mode);
  sanitized.mode = modeResult.value;
  if (!modeResult.valid) errors.push(modeResult.error);
  
  // Validate color scheme
  const colorResult = validateColorScheme(settings?.colorScheme);
  sanitized.colorScheme = colorResult.value;
  if (!colorResult.valid) errors.push(colorResult.error);
  
  // Validate font
  const fontResult = validateFont(settings?.font);
  sanitized.font = fontResult.value;
  if (!fontResult.valid) errors.push(fontResult.error);
  
  // Validate navigation position
  const navPosResult = validateNavPosition(settings?.navigation?.position);
  sanitized.navigation.position = navPosResult.value;
  if (!navPosResult.valid) errors.push(navPosResult.error);
  
  // Validate layout type
  const layoutResult = validateLayoutType(settings?.navigation?.layout);
  sanitized.navigation.layout = layoutResult.value;
  if (!layoutResult.valid) errors.push(layoutResult.error);
  
  return {
    valid: errors.length === 0,
    errors,
    sanitized
  };
};

/**
 * Merge partial settings with defaults
 * @param {object} partialSettings - Partial settings to merge
 * @returns {object} Complete settings object
 */
export const mergeWithDefaults = (partialSettings) => {
  if (!partialSettings) {
    return { ...defaultSettings, navigation: { ...defaultSettings.navigation } };
  }
  
  return {
    mode: partialSettings.mode || defaultSettings.mode,
    colorScheme: partialSettings.colorScheme || defaultSettings.colorScheme,
    font: partialSettings.font || defaultSettings.font,
    navigation: {
      position: partialSettings.navigation?.position || defaultSettings.navigation.position,
      layout: partialSettings.navigation?.layout || defaultSettings.navigation.layout,
    }
  };
};

/**
 * Sanitize settings (validate and merge with defaults)
 * @param {object} settings - Settings to sanitize
 * @returns {object} Sanitized and valid settings
 */
export const sanitizeSettings = (settings) => {
  const merged = mergeWithDefaults(settings);
  const { sanitized } = validateSettings(merged);
  return sanitized;
};

/**
 * Check if two settings objects are equal
 * @param {object} a - First settings object
 * @param {object} b - Second settings object
 * @returns {boolean} Whether settings are equal
 */
export const settingsEqual = (a, b) => {
  if (!a || !b) return false;
  
  return (
    a.mode === b.mode &&
    a.colorScheme === b.colorScheme &&
    a.font === b.font &&
    a.navigation?.position === b.navigation?.position &&
    a.navigation?.layout === b.navigation?.layout
  );
};

/**
 * Get changed settings between two settings objects
 * @param {object} oldSettings - Previous settings
 * @param {object} newSettings - New settings
 * @returns {object} Object containing only changed values
 */
export const getChangedSettings = (oldSettings, newSettings) => {
  const changes = {};
  
  if (oldSettings.mode !== newSettings.mode) {
    changes.mode = newSettings.mode;
  }
  if (oldSettings.colorScheme !== newSettings.colorScheme) {
    changes.colorScheme = newSettings.colorScheme;
  }
  if (oldSettings.font !== newSettings.font) {
    changes.font = newSettings.font;
  }
  if (oldSettings.navigation?.position !== newSettings.navigation?.position) {
    changes.navPosition = newSettings.navigation.position;
  }
  if (oldSettings.navigation?.layout !== newSettings.navigation?.layout) {
    changes.navLayout = newSettings.navigation.layout;
  }
  
  return changes;
};
