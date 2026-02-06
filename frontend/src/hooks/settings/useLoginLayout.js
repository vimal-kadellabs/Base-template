/**
 * useLoginLayout Hook
 * Hook for managing login screen layout
 */

import { useSettingsContext } from '@/contexts/SettingsContext';
import { 
  LOGIN_LAYOUTS, 
  getAvailableLoginLayouts, 
  getLoginLayoutById 
} from '@/settings/layout/login';

/**
 * Hook to manage login layout
 * @returns {object} Login layout state and control functions
 * 
 * @example
 * const { loginLayout, setLoginLayout, isLeft, isCenter, isRight } = useLoginLayout();
 */
export function useLoginLayout() {
  const { loginLayout, setLoginLayout } = useSettingsContext();
  
  // Get current layout details
  const currentLayout = getLoginLayoutById(loginLayout);
  
  return {
    // Current layout ID
    loginLayout,
    
    // Current layout details
    currentLayout,
    
    // Layout name for display
    layoutName: currentLayout.name,
    
    // Convenience booleans
    isLeft: loginLayout === LOGIN_LAYOUTS.LEFT,
    isCenter: loginLayout === LOGIN_LAYOUTS.CENTER,
    isRight: loginLayout === LOGIN_LAYOUTS.RIGHT,
    
    // Layout properties
    cardPosition: currentLayout.cardPosition,
    contentPosition: currentLayout.contentPosition,
    showContent: currentLayout.showContent,
    
    // Available layouts for UI
    availableLayouts: getAvailableLoginLayouts(),
    
    // Layout constants
    LOGIN_LAYOUTS,
    
    // Update function
    setLoginLayout,
    
    // Set specific layouts
    setLeft: () => setLoginLayout(LOGIN_LAYOUTS.LEFT),
    setCenter: () => setLoginLayout(LOGIN_LAYOUTS.CENTER),
    setRight: () => setLoginLayout(LOGIN_LAYOUTS.RIGHT),
  };
}

export default useLoginLayout;
