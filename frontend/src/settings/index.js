/**
 * Settings Module - Main Export
 * 
 * This module provides a complete, portable settings system for:
 * - Theme modes (light/dark)
 * - Color schemes (preset palettes)
 * - Font selection
 * - Navigation positioning
 * - Layout types
 * 
 * Usage:
 * import { settings, THEME_MODES, COLOR_SCHEMES } from '@/settings';
 */

// Theme exports
export {
  // Mode constants and configs
  THEME_MODES,
  themeModes,
  modeClasses,
  getAvailableModes,
  getModeById,
  isValidMode,
  
  // Color scheme constants and configs
  COLOR_SCHEMES,
  colorSchemes,
  getAvailableColorSchemes,
  getColorSchemeById,
  isValidColorScheme,
  getColorValues,
  
  // Font constants and configs
  FONTS,
  fonts,
  typographyScale,
  lineHeights,
  getAvailableFonts,
  getFontById,
  isValidFont,
  getFontFamily,
  getGoogleFontUrl,
  
  // Default settings
  defaultSettings,
  settingsSchema,
  getDefaultValue,
  createDefaultSettings,
} from './theme';

// Layout exports
export {
  // Navigation position constants and configs
  NAV_POSITIONS,
  navigationPositions,
  getAvailableNavPositions,
  getNavPositionById,
  isValidNavPosition,
  getNavPositionCss,
  
  // Layout type constants and configs
  LAYOUT_TYPES,
  layoutTypes,
  getAvailableLayoutTypes,
  getLayoutTypeById,
  isValidLayoutType,
  getLayoutTypeCss,
  getLayoutTypeFeatures,
  layoutTypeSupportsFeature,
} from './layout';

// Storage exports
export {
  STORAGE_KEYS,
  STORAGE_VERSION,
  saveSettings,
  loadSettings,
  clearSettings,
  saveSetting,
  loadSetting,
  hasStoredSettings,
  getSettingsAge,
} from './storage/persistence';

/**
 * Consolidated settings object for easy access
 */
import { defaultSettings } from './theme';
import { themeModes, colorSchemes, fonts } from './theme';
import { navigationPositions, layoutTypes } from './layout';

export const settings = {
  defaults: defaultSettings,
  theme: {
    modes: themeModes,
    colors: colorSchemes,
    fonts: fonts,
  },
  layout: {
    positions: navigationPositions,
    types: layoutTypes,
  },
};
