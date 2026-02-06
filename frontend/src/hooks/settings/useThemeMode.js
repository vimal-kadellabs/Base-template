/**
 * useThemeMode Hook
 * Hook for managing light/dark theme mode
 */

import { useSettingsContext } from '@/contexts/SettingsContext';
import { THEME_MODES, getAvailableModes } from '@/settings/theme/modes';

/**
 * Hook to manage theme mode (light/dark)
 * @returns {object} Mode state and control functions
 * 
 * @example
 * const { mode, setMode, toggleMode, isDark } = useThemeMode();
 */
export function useThemeMode() {
  const { mode, setMode, toggleMode } = useSettingsContext();
  
  return {
    // Current mode
    mode,
    
    // Convenience booleans
    isDark: mode === THEME_MODES.DARK,
    isLight: mode === THEME_MODES.LIGHT,
    
    // Available modes for UI
    availableModes: getAvailableModes(),
    
    // Update functions
    setMode,
    toggleMode,
    
    // Set specific modes
    setLightMode: () => setMode(THEME_MODES.LIGHT),
    setDarkMode: () => setMode(THEME_MODES.DARK),
  };
}

export default useThemeMode;
