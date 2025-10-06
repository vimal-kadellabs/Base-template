import { useState, useCallback, useEffect } from 'react';
import { getConfig, saveConfig } from '@/utils/localStorage';
import { DEFAULT_CONFIG } from '@/constants/mockData';

/**
 * Custom hook for configuration management
 * Provides methods to get and update application configuration
 * 
 * @returns {Object} Configuration management functions and state
 */
export const useConfig = () => {
  const [config, setConfig] = useState(DEFAULT_CONFIG);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Load configuration from localStorage
   */
  const loadConfig = useCallback(() => {
    try {
      setLoading(true);
      const loadedConfig = getConfig();
      setConfig(loadedConfig);
      setError(null);
    } catch (err) {
      console.error('Error loading config:', err);
      setError('Failed to load configuration');
      setConfig(DEFAULT_CONFIG);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Load config on mount
   */
  useEffect(() => {
    loadConfig();
  }, [loadConfig]);

  /**
   * Update configuration
   * @param {Object} updates - Configuration updates (partial or full)
   * @returns {Object} Result with success status
   */
  const updateConfig = useCallback(
    (updates) => {
      try {
        setLoading(true);
        
        // Merge updates with existing config
        const updatedConfig = {
          ...config,
          ...updates,
        };

        // Save to localStorage
        const success = saveConfig(updatedConfig);

        if (success) {
          setConfig(updatedConfig);
          setError(null);
          return {
            success: true,
            message: 'Configuration updated successfully',
            config: updatedConfig,
          };
        } else {
          throw new Error('Failed to save configuration');
        }
      } catch (err) {
        console.error('Error updating config:', err);
        const errorMessage = 'Failed to update configuration';
        setError(errorMessage);
        return {
          success: false,
          error: errorMessage,
        };
      } finally {
        setLoading(false);
      }
    },
    [config]
  );

  /**
   * Update email configuration
   * @param {Object} emailConfig - Email configuration updates
   * @returns {Object} Result with success status
   */
  const updateEmailConfig = useCallback(
    (emailConfig) => {
      return updateConfig({
        email: {
          ...config.email,
          ...emailConfig,
        },
      });
    },
    [config, updateConfig]
  );

  /**
   * Update notification settings
   * @param {Object} notificationSettings - Notification settings updates
   * @returns {Object} Result with success status
   */
  const updateNotificationSettings = useCallback(
    (notificationSettings) => {
      return updateConfig({
        notifications: {
          ...config.notifications,
          ...notificationSettings,
        },
      });
    },
    [config, updateConfig]
  );

  /**
   * Update alert settings
   * @param {Object} alertSettings - Alert settings updates
   * @returns {Object} Result with success status
   */
  const updateAlertSettings = useCallback(
    (alertSettings) => {
      return updateConfig({
        alerts: {
          ...config.alerts,
          ...alertSettings,
        },
      });
    },
    [config, updateConfig]
  );

  /**
   * Update LLM configuration
   * @param {Object} llmConfig - LLM configuration updates
   * @returns {Object} Result with success status
   */
  const updateLLMConfig = useCallback(
    (llmConfig) => {
      return updateConfig({
        llm: {
          ...config.llm,
          ...llmConfig,
        },
      });
    },
    [config, updateConfig]
  );

  /**
   * Reset configuration to defaults
   * @returns {Object} Result with success status
   */
  const resetConfig = useCallback(() => {
    try {
      setLoading(true);
      const success = saveConfig(DEFAULT_CONFIG);

      if (success) {
        setConfig(DEFAULT_CONFIG);
        setError(null);
        return {
          success: true,
          message: 'Configuration reset to defaults',
          config: DEFAULT_CONFIG,
        };
      } else {
        throw new Error('Failed to reset configuration');
      }
    } catch (err) {
      console.error('Error resetting config:', err);
      const errorMessage = 'Failed to reset configuration';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Get specific configuration section
   * @param {string} section - Configuration section name
   * @returns {Object|null} Configuration section or null
   */
  const getConfigSection = useCallback(
    (section) => {
      return config[section] || null;
    },
    [config]
  );

  /**
   * Refresh config from localStorage
   */
  const refresh = useCallback(() => {
    loadConfig();
  }, [loadConfig]);

  return {
    // State
    config,
    loading,
    error,
    
    // General operations
    updateConfig,
    resetConfig,
    getConfigSection,
    
    // Specific section updates
    updateEmailConfig,
    updateNotificationSettings,
    updateAlertSettings,
    updateLLMConfig,
    
    // Utility
    refresh,
  };
};
