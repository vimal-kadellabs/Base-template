/**
 * Settings Context
 * Global state management for application settings (theme, layout, etc.)
 */

import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { defaultSettings, createDefaultSettings } from '@/settings/theme/defaults';
import { getGoogleFontUrl } from '@/settings/theme/fonts';
import { saveSettings, loadSettings } from '@/settings/storage/persistence';
import { validateSettings, sanitizeSettings } from '@/utils/settingsValidator';
import { 
  applyAllSettings, 
  applyThemeMode, 
  applyColorScheme, 
  applyFont, 
  applyLayoutType, 
  applyNavPosition,
  loadGoogleFont 
} from '@/utils/cssVariables';

/**
 * Settings Context
 */
const SettingsContext = createContext(null);

/**
 * Settings Provider Component
 * Wraps the application and provides settings state
 */
export function SettingsProvider({ children, initialSettings = null }) {
  // Initialize state with defaults or stored settings
  const [settings, setSettingsState] = useState(() => {
    // Try to load from localStorage first
    const stored = loadSettings();
    if (stored) {
      const { sanitized } = validateSettings(stored);
      return sanitized;
    }
    // Use initial settings if provided, otherwise defaults
    if (initialSettings) {
      const { sanitized } = validateSettings(initialSettings);
      return sanitized;
    }
    return createDefaultSettings();
  });

  // Sidebar collapsed state (separate from main settings for performance)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const stored = localStorage.getItem('app-sidebar-collapsed');
    return stored ? JSON.parse(stored) : false;
  });

  // Loading state for async operations
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Apply settings to DOM on mount and when settings change
   */
  useEffect(() => {
    const applySettings = async () => {
      setIsLoading(true);
      
      try {
        // Load Google Font if needed
        const fontUrl = getGoogleFontUrl(settings.font);
        if (fontUrl) {
          await loadGoogleFont(fontUrl);
        }
        
        // Apply all CSS variables and classes
        applyAllSettings(settings);
      } catch (error) {
        console.error('Error applying settings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    applySettings();
  }, [settings]);

  /**
   * Persist settings to localStorage when they change
   */
  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  /**
   * Persist sidebar state
   */
  useEffect(() => {
    localStorage.setItem('app-sidebar-collapsed', JSON.stringify(sidebarCollapsed));
  }, [sidebarCollapsed]);

  /**
   * Update entire settings object
   */
  const setSettings = useCallback((newSettings) => {
    const sanitized = sanitizeSettings(
      typeof newSettings === 'function' 
        ? newSettings(settings) 
        : newSettings
    );
    setSettingsState(sanitized);
  }, [settings]);

  /**
   * Update theme mode (light/dark)
   */
  const setMode = useCallback((mode) => {
    setSettingsState(prev => {
      const newSettings = { ...prev, mode };
      applyThemeMode(mode);
      applyColorScheme(prev.colorScheme, mode);
      return newSettings;
    });
  }, []);

  /**
   * Toggle between light and dark mode
   */
  const toggleMode = useCallback(() => {
    setSettingsState(prev => {
      const newMode = prev.mode === 'light' ? 'dark' : 'light';
      applyThemeMode(newMode);
      applyColorScheme(prev.colorScheme, newMode);
      return { ...prev, mode: newMode };
    });
  }, []);

  /**
   * Update color scheme
   */
  const setColorScheme = useCallback((colorScheme) => {
    setSettingsState(prev => {
      applyColorScheme(colorScheme, prev.mode);
      return { ...prev, colorScheme };
    });
  }, []);

  /**
   * Update font
   */
  const setFont = useCallback(async (font) => {
    const fontUrl = getGoogleFontUrl(font);
    if (fontUrl) {
      await loadGoogleFont(fontUrl);
    }
    applyFont(font);
    setSettingsState(prev => ({ ...prev, font }));
  }, []);

  /**
   * Update navigation position
   */
  const setNavPosition = useCallback((position) => {
    applyNavPosition(position);
    setSettingsState(prev => ({
      ...prev,
      navigation: { ...prev.navigation, position }
    }));
  }, []);

  /**
   * Update layout type
   */
  const setLayoutType = useCallback((layout) => {
    applyLayoutType(layout);
    setSettingsState(prev => ({
      ...prev,
      navigation: { ...prev.navigation, layout }
    }));
  }, []);

  /**
   * Update login layout
   */
  const setLoginLayout = useCallback((layout) => {
    setSettingsState(prev => ({
      ...prev,
      login: { ...prev.login, layout }
    }));
  }, []);

  /**
   * Toggle sidebar collapsed state
   */
  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed(prev => !prev);
  }, []);

  /**
   * Reset settings to defaults
   */
  const resetSettings = useCallback(() => {
    const defaults = createDefaultSettings();
    setSettingsState(defaults);
    applyAllSettings(defaults);
  }, []);

  /**
   * Context value
   */
  const value = useMemo(() => ({
    // Current settings
    settings,
    
    // Individual setting values (for convenience)
    mode: settings.mode,
    colorScheme: settings.colorScheme,
    font: settings.font,
    navPosition: settings.navigation.position,
    layoutType: settings.navigation.layout,
    loginLayout: settings.login?.layout || 'center',
    
    // Sidebar state
    sidebarCollapsed,
    
    // Loading state
    isLoading,
    
    // Update functions
    setSettings,
    setMode,
    toggleMode,
    setColorScheme,
    setFont,
    setNavPosition,
    setLayoutType,
    setLoginLayout,
    setSidebarCollapsed,
    toggleSidebar,
    resetSettings,
  }), [settings, sidebarCollapsed, isLoading, setSettings, setMode, toggleMode, setColorScheme, setFont, setNavPosition, setLayoutType, setLoginLayout, toggleSidebar, resetSettings]);

  return (
    <SettingsContext.Provider value={value}>
      {children}
    </SettingsContext.Provider>
  );
}

/**
 * Hook to access settings context
 * @returns {object} Settings context value
 * @throws {Error} If used outside of SettingsProvider
 */
export function useSettingsContext() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettingsContext must be used within a SettingsProvider');
  }
  return context;
}

export default SettingsContext;
