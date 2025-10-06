import { ROLES, USER_STATUS, NOTIFICATION_CHANNELS, ALERT_TYPES } from './config';

// Initial mock users
export const INITIAL_USERS = [
  {
    id: '1',
    username: 'admin',
    email: 'admin@example.com',
    password: 'admin123', // In real app, this would be hashed
    role: ROLES.ADMIN,
    status: USER_STATUS.ACTIVE,
    createdAt: new Date('2024-01-01').toISOString(),
    lastLogin: new Date().toISOString(),
  },
  {
    id: '2',
    username: 'user',
    email: 'user@example.com',
    password: 'user123',
    role: ROLES.USER,
    status: USER_STATUS.ACTIVE,
    createdAt: new Date('2024-01-15').toISOString(),
    lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
  },
  {
    id: '3',
    username: 'john_doe',
    email: 'john@example.com',
    password: 'john123',
    role: ROLES.USER,
    status: USER_STATUS.ACTIVE,
    createdAt: new Date('2024-02-01').toISOString(),
    lastLogin: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
  },
  {
    id: '4',
    username: 'jane_smith',
    email: 'jane@example.com',
    password: 'jane123',
    role: ROLES.USER,
    status: USER_STATUS.INACTIVE,
    createdAt: new Date('2024-02-10').toISOString(),
    lastLogin: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
  },
  {
    id: '5',
    username: 'mike_admin',
    email: 'mike@example.com',
    password: 'mike123',
    role: ROLES.ADMIN,
    status: USER_STATUS.ACTIVE,
    createdAt: new Date('2024-01-20').toISOString(),
    lastLogin: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(), // 5 hours ago
  },
];

// Default configuration
export const DEFAULT_CONFIG = {
  email: {
    smtpServer: 'smtp.example.com',
    smtpPort: 587,
    senderEmail: 'noreply@example.com',
    senderName: 'Admin Panel',
    emailTemplate: {
      welcome: 'Welcome to our platform!',
      passwordReset: 'Click here to reset your password.',
      notification: 'You have a new notification.',
    },
    enableSSL: true,
  },
  notifications: {
    [NOTIFICATION_CHANNELS.EMAIL]: true,
    [NOTIFICATION_CHANNELS.SMS]: false,
    [NOTIFICATION_CHANNELS.IN_APP]: true,
    digestFrequency: 'daily', // immediate, hourly, daily
    quietHoursStart: '22:00',
    quietHoursEnd: '08:00',
  },
  alerts: {
    enableAlerts: true,
    channels: [NOTIFICATION_CHANNELS.EMAIL, NOTIFICATION_CHANNELS.IN_APP],
    thresholds: {
      [ALERT_TYPES.INFO]: 10,
      [ALERT_TYPES.WARNING]: 5,
      [ALERT_TYPES.ERROR]: 1,
      [ALERT_TYPES.CRITICAL]: 1,
    },
    alertTypes: {
      systemErrors: true,
      securityEvents: true,
      performanceIssues: false,
      userActivity: false,
    },
  },
  llm: {
    selectedModel: 'gpt-4',
    temperature: 0.7,
    maxTokens: 2000,
    enableLogging: true,
  },
};

// Sample activity logs
export const INITIAL_ACTIVITY_LOGS = [
  {
    id: 'log1',
    userId: '1',
    username: 'admin',
    action: 'User Login',
    timestamp: new Date().toISOString(),
    details: 'Successful login from 192.168.1.1',
  },
  {
    id: 'log2',
    userId: '2',
    username: 'user',
    action: 'User Login',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    details: 'Successful login from 192.168.1.5',
  },
  {
    id: 'log3',
    userId: '1',
    username: 'admin',
    action: 'User Created',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    details: 'Created new user: mike_admin',
  },
  {
    id: 'log4',
    userId: '5',
    username: 'mike_admin',
    action: 'Configuration Updated',
    timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    details: 'Updated email configuration',
  },
  {
    id: 'log5',
    userId: '3',
    username: 'john_doe',
    action: 'User Login',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    details: 'Successful login from 10.0.0.15',
  },
];
