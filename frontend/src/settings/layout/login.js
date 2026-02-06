/**
 * Login Layout Configuration
 * Defines login screen layout options
 */

export const LOGIN_LAYOUTS = {
  LEFT: 'left',
  CENTER: 'center',
  RIGHT: 'right',
};

/**
 * Login layout configurations
 */
export const loginLayouts = {
  [LOGIN_LAYOUTS.LEFT]: {
    id: 'left',
    name: 'Left',
    description: 'Login card on the left, content on the right',
    icon: 'PanelLeft',
    cardPosition: 'left',
    contentPosition: 'right',
    showContent: true,
  },
  [LOGIN_LAYOUTS.CENTER]: {
    id: 'center',
    name: 'Center',
    description: 'Login card centered, no side content',
    icon: 'Square',
    cardPosition: 'center',
    contentPosition: null,
    showContent: false,
  },
  [LOGIN_LAYOUTS.RIGHT]: {
    id: 'right',
    name: 'Right',
    description: 'Login card on the right, content on the left',
    icon: 'PanelRight',
    cardPosition: 'right',
    contentPosition: 'left',
    showContent: true,
  },
};

/**
 * Get all available login layouts
 * @returns {Array} Array of login layout configs
 */
export const getAvailableLoginLayouts = () => Object.values(loginLayouts);

/**
 * Get login layout by ID
 * @param {string} layoutId - Layout ID
 * @returns {object} Login layout config
 */
export const getLoginLayoutById = (layoutId) => 
  loginLayouts[layoutId] || loginLayouts[LOGIN_LAYOUTS.CENTER];

/**
 * Validate login layout ID
 * @param {string} layoutId - Layout ID to validate
 * @returns {boolean} Whether the layout ID is valid
 */
export const isValidLoginLayout = (layoutId) => 
  Object.values(LOGIN_LAYOUTS).includes(layoutId);
