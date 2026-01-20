/**
 * useSettings Hook
 * Main hook for accessing all settings
 */

import { useSettingsContext } from '@/contexts/SettingsContext';

/**
 * Hook to access all settings and update functions
 * @returns {object} Complete settings state and methods
 * 
 * @example
 * const { settings, setSettings, resetSettings } = useSettings();
 */
export function useSettings() {
  const context = useSettingsContext();
  
  return {
    // Complete settings object
    settings: context.settings,
    
    // Loading state
    isLoading: context.isLoading,
    
    // Update entire settings
    setSettings: context.setSettings,
    
    // Reset to defaults
    resetSettings: context.resetSettings,
  };
}

export default useSettings;
