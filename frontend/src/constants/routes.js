// Route path constants
export const ROUTES = {
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  USERS: '/users',
  CONFIG: '/config',
  ADMIN_PANEL: '/admin',
};

// Route configuration with metadata
export const ROUTE_CONFIG = [
  {
    path: ROUTES.LOGIN,
    name: 'Login',
    isPublic: true,
    requiresAuth: false,
  },
  {
    path: ROUTES.DASHBOARD,
    name: 'Dashboard',
    isPublic: false,
    requiresAuth: true,
    allowedRoles: ['user', 'admin'],
  },
  {
    path: ROUTES.USERS,
    name: 'User Management',
    isPublic: false,
    requiresAuth: true,
    allowedRoles: ['admin'],
  },
  {
    path: ROUTES.CONFIG,
    name: 'Configuration',
    isPublic: false,
    requiresAuth: true,
    allowedRoles: ['admin'],
  },
  {
    path: ROUTES.ADMIN_PANEL,
    name: 'Admin Panel',
    isPublic: false,
    requiresAuth: true,
    allowedRoles: ['admin'],
  },
];
