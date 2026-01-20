/**
 * useNavPosition Hook
 * Hook for managing navigation position (vertical/horizontal)
 */

import { useSettingsContext } from '@/contexts/SettingsContext';
import { 
  NAV_POSITIONS, 
  getAvailableNavPositions, 
  getNavPositionById 
} from '@/settings/layout/navigation';

/**
 * Hook to manage navigation position
 * @returns {object} Navigation position state and control functions
 * 
 * @example
 * const { navPosition, setNavPosition, isVertical } = useNavPosition();
 */
export function useNavPosition() {
  const { navPosition, setNavPosition } = useSettingsContext();
  
  // Get current position details
  const currentPosition = getNavPositionById(navPosition);
  
  return {
    // Current position ID
    navPosition,
    
    // Current position details
    currentPosition,
    
    // Position name for display
    positionName: currentPosition.name,
    
    // Convenience booleans
    isVertical: navPosition === NAV_POSITIONS.VERTICAL,
    isHorizontal: navPosition === NAV_POSITIONS.HORIZONTAL,
    
    // CSS values for current position
    css: currentPosition.css,
    
    // Layout info
    layout: currentPosition.layout,
    
    // Available positions for UI
    availablePositions: getAvailableNavPositions(),
    
    // Position constants
    NAV_POSITIONS,
    
    // Update function
    setNavPosition,
    
    // Set specific positions
    setVertical: () => setNavPosition(NAV_POSITIONS.VERTICAL),
    setHorizontal: () => setNavPosition(NAV_POSITIONS.HORIZONTAL),
  };
}

export default useNavPosition;
