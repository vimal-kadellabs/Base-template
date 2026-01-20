/**
 * Layout Settings Exports
 * Central export file for all layout configurations
 */

// Navigation position exports
export {
  NAV_POSITIONS,
  navigationPositions,
  getAvailableNavPositions,
  getNavPositionById,
  isValidNavPosition,
  getNavPositionCss,
} from './navigation';

// Layout type exports
export {
  LAYOUT_TYPES,
  layoutTypes,
  getAvailableLayoutTypes,
  getLayoutTypeById,
  isValidLayoutType,
  getLayoutTypeCss,
  getLayoutTypeFeatures,
  layoutTypeSupportsFeature,
} from './types';

// Login layout exports
export {
  LOGIN_LAYOUTS,
  loginLayouts,
  getAvailableLoginLayouts,
  getLoginLayoutById,
  isValidLoginLayout,
} from './login';
