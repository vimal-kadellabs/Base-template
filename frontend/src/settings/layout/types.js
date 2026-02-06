/**
 * Layout Type Configuration
 * Defines expandable sidebar and sticky menu layouts
 */

export const LAYOUT_TYPES = {
  EXPANDABLE: 'expandable',
  STICKY: 'sticky',
};

/**
 * Layout type configurations
 */
export const layoutTypes = {
  [LAYOUT_TYPES.EXPANDABLE]: {
    id: 'expandable',
    name: 'Expandable Sidebar',
    description: 'Full sidebar that can collapse to icons only',
    icon: 'PanelLeftClose',
    features: {
      collapsible: true,
      showLabels: true,
      showSubmenus: true,
      persistState: true,
    },
    css: {
      expandedWidth: '280px',
      collapsedWidth: '70px',
      transitionDuration: '300ms',
      transitionTiming: 'cubic-bezier(0.4, 0, 0.2, 1)',
    },
    states: {
      expanded: {
        width: '280px',
        showLabels: true,
        iconOnly: false,
      },
      collapsed: {
        width: '70px',
        showLabels: false,
        iconOnly: true,
      },
    },
  },
  [LAYOUT_TYPES.STICKY]: {
    id: 'sticky',
    name: 'Sticky Menu',
    description: 'Compact icon menu with tooltips and submenu bar',
    icon: 'LayoutList',
    features: {
      collapsible: false,
      showLabels: false, // Labels shown in tooltips
      showSubmenus: true, // Shown in separate submenu bar
      persistState: false,
      tooltips: true,
      submenuBar: true,
    },
    css: {
      iconMenuWidth: '70px',
      submenuBarWidth: '220px',
      tooltipDelay: '200ms',
      transitionDuration: '200ms',
      transitionTiming: 'ease-out',
    },
    components: {
      iconMenu: {
        width: '70px',
        iconSize: '24px',
        padding: '12px',
        gap: '8px',
      },
      submenuBar: {
        width: '220px',
        showOnHover: false,
        showOnSelect: true,
        position: 'adjacent', // 'adjacent' or 'overlay'
      },
      tooltip: {
        position: 'right',
        offset: '8px',
        delay: 200,
      },
    },
  },
};

/**
 * Get all available layout types
 * @returns {Array} Array of layout type configs
 */
export const getAvailableLayoutTypes = () => Object.values(layoutTypes);

/**
 * Get layout type by ID
 * @param {string} typeId - Layout type ID
 * @returns {object} Layout type config
 */
export const getLayoutTypeById = (typeId) => 
  layoutTypes[typeId] || layoutTypes[LAYOUT_TYPES.EXPANDABLE];

/**
 * Validate layout type ID
 * @param {string} typeId - Layout type ID to validate
 * @returns {boolean} Whether the layout type ID is valid
 */
export const isValidLayoutType = (typeId) => 
  Object.values(LAYOUT_TYPES).includes(typeId);

/**
 * Get CSS values for a layout type
 * @param {string} typeId - Layout type ID
 * @returns {object} CSS configuration values
 */
export const getLayoutTypeCss = (typeId) => {
  const layoutType = getLayoutTypeById(typeId);
  return layoutType.css;
};

/**
 * Get feature flags for a layout type
 * @param {string} typeId - Layout type ID
 * @returns {object} Feature flags
 */
export const getLayoutTypeFeatures = (typeId) => {
  const layoutType = getLayoutTypeById(typeId);
  return layoutType.features;
};

/**
 * Check if layout type supports a specific feature
 * @param {string} typeId - Layout type ID
 * @param {string} feature - Feature name
 * @returns {boolean} Whether the feature is supported
 */
export const layoutTypeSupportsFeature = (typeId, feature) => {
  const features = getLayoutTypeFeatures(typeId);
  return features[feature] === true;
};
