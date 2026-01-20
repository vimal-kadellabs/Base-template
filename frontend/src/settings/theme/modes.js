/**
 * Theme Mode Definitions
 * Defines light and dark mode configurations
 */

export const THEME_MODES = {
  LIGHT: 'light',
  DARK: 'dark',
};

export const themeModes = {
  [THEME_MODES.LIGHT]: {
    id: 'light',
    name: 'Light',
    icon: 'Sun',
    description: 'Light mode with bright backgrounds',
  },
  [THEME_MODES.DARK]: {
    id: 'dark',
    name: 'Dark',
    icon: 'Moon',
    description: 'Dark mode with dark backgrounds',
  },
};

/**
 * CSS class applied to document root for each mode
 */
export const modeClasses = {
  [THEME_MODES.LIGHT]: '',
  [THEME_MODES.DARK]: 'dark',
};

export const getAvailableModes = () => Object.values(themeModes);

export const getModeById = (modeId) => themeModes[modeId] || themeModes[THEME_MODES.LIGHT];

export const isValidMode = (modeId) => Object.values(THEME_MODES).includes(modeId);
