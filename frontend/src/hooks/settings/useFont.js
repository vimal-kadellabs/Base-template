/**
 * useFont Hook
 * Hook for managing font selection
 */

import { useSettingsContext } from '@/contexts/SettingsContext';
import { 
  FONTS, 
  getAvailableFonts, 
  getFontById,
  getFontFamily 
} from '@/settings/theme/fonts';

/**
 * Hook to manage font selection
 * @returns {object} Font state and control functions
 * 
 * @example
 * const { font, setFont, fontFamily, availableFonts } = useFont();
 */
export function useFont() {
  const { font, setFont } = useSettingsContext();
  
  // Get current font details
  const currentFont = getFontById(font);
  
  return {
    // Current font ID
    font,
    
    // Current font details
    currentFont,
    
    // Font name for display
    fontName: currentFont.name,
    
    // CSS font-family value
    fontFamily: getFontFamily(font),
    
    // Font description
    description: currentFont.description,
    
    // Available fonts for UI
    availableFonts: getAvailableFonts(),
    
    // Font constants
    FONTS,
    
    // Update function (async - loads font)
    setFont,
  };
}

export default useFont;
