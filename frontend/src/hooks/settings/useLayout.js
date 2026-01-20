/**
 * useLayout Hook
 * Hook for managing layout type (expandable/sticky)
 */

import { useSettingsContext } from '@/contexts/SettingsContext';
import { 
  LAYOUT_TYPES, 
  getAvailableLayoutTypes, 
  getLayoutTypeById,
  getLayoutTypeFeatures,
  layoutTypeSupportsFeature 
} from '@/settings/layout/types';

/**
 * Hook to manage layout type
 * @returns {object} Layout type state and control functions
 * 
 * @example
 * const { layoutType, setLayoutType, isExpandable, features } = useLayout();
 */
export function useLayout() {
  const { 
    layoutType, 
    setLayoutType, 
    sidebarCollapsed, 
    setSidebarCollapsed, 
    toggleSidebar 
  } = useSettingsContext();
  
  // Get current layout type details
  const currentLayout = getLayoutTypeById(layoutType);
  
  // Get features for current layout
  const features = getLayoutTypeFeatures(layoutType);
  
  return {
    // Current layout type ID
    layoutType,
    
    // Current layout details
    currentLayout,
    
    // Layout name for display
    layoutName: currentLayout.name,
    
    // Convenience booleans
    isExpandable: layoutType === LAYOUT_TYPES.EXPANDABLE,
    isSticky: layoutType === LAYOUT_TYPES.STICKY,
    
    // Sidebar state (for expandable layout)
    sidebarCollapsed,
    sidebarExpanded: !sidebarCollapsed,
    
    // CSS values for current layout
    css: currentLayout.css,
    
    // Feature flags
    features,
    
    // Check specific feature
    supportsFeature: (feature) => layoutTypeSupportsFeature(layoutType, feature),
    
    // Available layout types for UI
    availableLayouts: getAvailableLayoutTypes(),
    
    // Layout type constants
    LAYOUT_TYPES,
    
    // Update functions
    setLayoutType,
    setSidebarCollapsed,
    toggleSidebar,
    
    // Set specific layouts
    setExpandable: () => setLayoutType(LAYOUT_TYPES.EXPANDABLE),
    setSticky: () => setLayoutType(LAYOUT_TYPES.STICKY),
    
    // Sidebar controls
    expandSidebar: () => setSidebarCollapsed(false),
    collapseSidebar: () => setSidebarCollapsed(true),
  };
}

export default useLayout;
