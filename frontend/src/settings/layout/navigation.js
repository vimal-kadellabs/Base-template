/**
 * Navigation Position Configuration
 * Defines vertical and horizontal navigation layouts
 */

export const NAV_POSITIONS = {
  VERTICAL: 'vertical',
  HORIZONTAL: 'horizontal',
};

/**
 * Navigation position configurations
 */
export const navigationPositions = {
  [NAV_POSITIONS.VERTICAL]: {
    id: 'vertical',
    name: 'Vertical',
    description: 'Sidebar navigation on the left',
    icon: 'PanelLeft',
    layout: {
      direction: 'column',
      mainAxis: 'left',
      contentFlow: 'horizontal',
    },
    css: {
      navWidth: '280px',
      navCollapsedWidth: '70px',
      headerHeight: '64px',
    },
  },
  [NAV_POSITIONS.HORIZONTAL]: {
    id: 'horizontal',
    name: 'Horizontal',
    description: 'Top navigation bar',
    icon: 'PanelTop',
    layout: {
      direction: 'row',
      mainAxis: 'top',
      contentFlow: 'vertical',
    },
    css: {
      navHeight: '64px',
      subNavHeight: '48px',
    },
  },
};

/**
 * Get all available navigation positions
 * @returns {Array} Array of navigation position configs
 */
export const getAvailableNavPositions = () => Object.values(navigationPositions);

/**
 * Get navigation position by ID
 * @param {string} positionId - Position ID
 * @returns {object} Navigation position config
 */
export const getNavPositionById = (positionId) => 
  navigationPositions[positionId] || navigationPositions[NAV_POSITIONS.VERTICAL];

/**
 * Validate navigation position ID
 * @param {string} positionId - Position ID to validate
 * @returns {boolean} Whether the position ID is valid
 */
export const isValidNavPosition = (positionId) => 
  Object.values(NAV_POSITIONS).includes(positionId);

/**
 * Get CSS values for a navigation position
 * @param {string} positionId - Position ID
 * @returns {object} CSS configuration values
 */
export const getNavPositionCss = (positionId) => {
  const position = getNavPositionById(positionId);
  return position.css;
};
