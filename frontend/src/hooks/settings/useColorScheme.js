/**
 * useColorScheme Hook
 * Hook for managing color scheme/palette
 */

import { useSettingsContext } from '@/contexts/SettingsContext';
import { 
  COLOR_SCHEMES, 
  getAvailableColorSchemes, 
  getColorSchemeById 
} from '@/settings/theme/colors';

/**
 * Hook to manage color scheme
 * @returns {object} Color scheme state and control functions
 * 
 * @example
 * const { colorScheme, setColorScheme, availableSchemes } = useColorScheme();
 */
export function useColorScheme() {
  const { colorScheme, setColorScheme, mode } = useSettingsContext();
  
  // Get current scheme details
  const currentScheme = getColorSchemeById(colorScheme);
  
  return {
    // Current color scheme ID
    colorScheme,
    
    // Current scheme details
    currentScheme,
    
    // Scheme name for display
    schemeName: currentScheme.name,
    
    // Preview colors for UI
    previewColors: currentScheme.preview,
    
    // Current mode (for color values)
    mode,
    
    // Available schemes for UI
    availableSchemes: getAvailableColorSchemes(),
    
    // Color scheme constants
    COLOR_SCHEMES,
    
    // Update function
    setColorScheme,
  };
}

export default useColorScheme;
