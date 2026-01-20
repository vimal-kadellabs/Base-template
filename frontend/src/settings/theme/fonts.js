/**
 * Font Configuration Definitions
 * Font families and typography settings
 */

export const FONTS = {
  INTER: 'inter',
  ROBOTO: 'roboto',
  POPPINS: 'poppins',
  SYSTEM: 'system',
};

/**
 * Font family configurations
 */
export const fonts = {
  [FONTS.INTER]: {
    id: 'inter',
    name: 'Inter',
    description: 'Modern, clean UI font',
    fontFamily: '"Inter", sans-serif',
    googleFontUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap',
    weights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  [FONTS.ROBOTO]: {
    id: 'roboto',
    name: 'Roboto',
    description: 'Material Design style',
    fontFamily: '"Roboto", sans-serif',
    googleFontUrl: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap',
    weights: {
      light: 300,
      normal: 400,
      medium: 500,
      bold: 700,
    },
  },
  [FONTS.POPPINS]: {
    id: 'poppins',
    name: 'Poppins',
    description: 'Friendly, rounded style',
    fontFamily: '"Poppins", sans-serif',
    googleFontUrl: 'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap',
    weights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
  [FONTS.SYSTEM]: {
    id: 'system',
    name: 'System',
    description: 'Native system font',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    googleFontUrl: null, // No external font needed
    weights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  },
};

/**
 * Typography scale configuration
 */
export const typographyScale = {
  xs: '0.75rem',     // 12px
  sm: '0.875rem',    // 14px
  base: '1rem',      // 16px
  lg: '1.125rem',    // 18px
  xl: '1.25rem',     // 20px
  '2xl': '1.5rem',   // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem',  // 36px
  '5xl': '3rem',     // 48px
};

/**
 * Line height configurations
 */
export const lineHeights = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
};

export const getAvailableFonts = () => Object.values(fonts);

export const getFontById = (fontId) => fonts[fontId] || fonts[FONTS.INTER];

export const isValidFont = (fontId) => Object.values(FONTS).includes(fontId);

/**
 * Get the font family CSS value for a font ID
 * @param {string} fontId - Font ID
 * @returns {string} CSS font-family value
 */
export const getFontFamily = (fontId) => {
  const font = getFontById(fontId);
  return font.fontFamily;
};

/**
 * Get Google Font URL for loading
 * @param {string} fontId - Font ID
 * @returns {string|null} Google Font URL or null for system fonts
 */
export const getGoogleFontUrl = (fontId) => {
  const font = getFontById(fontId);
  return font.googleFontUrl;
};
