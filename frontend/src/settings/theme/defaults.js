/**
 * Default Theme Settings
 * Central configuration for default values
 */

import { THEME_MODES } from './modes';
import { COLOR_SCHEMES } from './colors';
import { FONTS } from './fonts';
import { NAV_POSITIONS } from '../layout/navigation';
import { LAYOUT_TYPES } from '../layout/types';
import { LOGIN_LAYOUTS } from '../layout/login';

/**
 * Default settings configuration
 */
export const defaultSettings = {
  // Theme settings
  mode: THEME_MODES.LIGHT,
  colorScheme: COLOR_SCHEMES.DEFAULT,
  font: FONTS.INTER,
  
  // Navigation settings
  navigation: {
    position: NAV_POSITIONS.VERTICAL,
    layout: LAYOUT_TYPES.EXPANDABLE,
  },
  
  // Login screen settings
  login: {
    layout: LOGIN_LAYOUTS.CENTER,
  },
};

/**
 * Settings schema for validation
 */
export const settingsSchema = {
  mode: {
    type: 'string',
    values: Object.values(THEME_MODES),
    default: defaultSettings.mode,
  },
  colorScheme: {
    type: 'string',
    values: Object.values(COLOR_SCHEMES),
    default: defaultSettings.colorScheme,
  },
  font: {
    type: 'string',
    values: Object.values(FONTS),
    default: defaultSettings.font,
  },
  navigation: {
    type: 'object',
    properties: {
      position: {
        type: 'string',
        values: Object.values(NAV_POSITIONS),
        default: defaultSettings.navigation.position,
      },
      layout: {
        type: 'string',
        values: Object.values(LAYOUT_TYPES),
        default: defaultSettings.navigation.layout,
      },
    },
  },
  login: {
    type: 'object',
    properties: {
      layout: {
        type: 'string',
        values: Object.values(LOGIN_LAYOUTS),
        default: defaultSettings.login.layout,
      },
    },
  },
};

/**
 * Get default value for a specific setting
 * @param {string} path - Dot notation path (e.g., 'navigation.position')
 * @returns {*} Default value for the setting
 */
export const getDefaultValue = (path) => {
  const parts = path.split('.');
  let value = defaultSettings;
  
  for (const part of parts) {
    if (value && typeof value === 'object' && part in value) {
      value = value[part];
    } else {
      return undefined;
    }
  }
  
  return value;
};

/**
 * Create a fresh copy of default settings
 * @returns {object} Copy of default settings
 */
export const createDefaultSettings = () => JSON.parse(JSON.stringify(defaultSettings));
