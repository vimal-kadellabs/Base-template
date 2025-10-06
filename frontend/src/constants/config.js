// LocalStorage keys
export const STORAGE_KEYS = {
  USERS: 'admin_panel_users',
  CONFIG: 'admin_panel_config',
  SESSION: 'admin_panel_session',
};

// User roles
export const ROLES = {
  USER: 'user',
  ADMIN: 'admin',
};

// User status
export const USER_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
};

// App configuration
export const APP_CONFIG = {
  APP_NAME: 'Admin Panel',
  SESSION_TIMEOUT: 24 * 60 * 60 * 1000, // 24 hours in milliseconds
  PASSWORD_MIN_LENGTH: 6,
  USERNAME_MIN_LENGTH: 3,
};

// LLM model options (placeholder)
export const LLM_MODELS = [
  { value: 'gpt-4', label: 'GPT-4' },
  { value: 'gpt-4o-mini', label: 'GPT-4o Mini' },
  { value: 'gpt-3.5-turbo', label: 'GPT-3.5 Turbo' },
  { value: 'claude-3-opus', label: 'Claude 3 Opus' },
  { value: 'claude-3-sonnet', label: 'Claude 3 Sonnet' },
  { value: 'gemini-pro', label: 'Gemini Pro' },
];

// Notification channels
export const NOTIFICATION_CHANNELS = {
  EMAIL: 'email',
  SMS: 'sms',
  IN_APP: 'in_app',
};

// Alert types
export const ALERT_TYPES = {
  INFO: 'info',
  WARNING: 'warning',
  ERROR: 'error',
  CRITICAL: 'critical',
};
