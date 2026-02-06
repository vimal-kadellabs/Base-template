/**
 * Navigation Menu Configuration
 * Centralized navigation structure for the application
 */

import { 
  LayoutDashboard, 
  Users, 
  Settings,
  Home,
  FileText,
  BarChart3,
  Bell,
  HelpCircle,
  Palette
} from 'lucide-react';
import { ROUTES } from './routes';

/**
 * Main navigation menu items
 * Used by all navigation components (horizontal, vertical, etc.)
 */
export const NAVIGATION_ITEMS = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    path: ROUTES.DASHBOARD,
    icon: LayoutDashboard,
    roles: ['user', 'admin'],
    children: null,
  },
  {
    id: 'users',
    name: 'Users',
    path: ROUTES.USERS,
    icon: Users,
    roles: ['admin'],
    children: null,
  },
  {
    id: 'config',
    name: 'Configuration',
    path: ROUTES.CONFIG,
    icon: Settings,
    roles: ['admin'],
    children: null,
  },
  {
    id: 'settings',
    name: 'Settings',
    path: '/settings',
    icon: Palette,
    roles: ['user', 'admin'],
    children: null,
  },
];

/**
 * Filter navigation items based on user role
 * @param {Array} items - Navigation items
 * @param {string} role - User role
 * @param {boolean} isAdmin - Whether user is admin
 * @returns {Array} Filtered navigation items
 */
export const filterNavigationByRole = (items, role, isAdmin = false) => {
  return items.filter((item) => {
    if (isAdmin) return true;
    return item.roles.includes(role);
  });
};

/**
 * Get navigation item by ID
 * @param {string} id - Navigation item ID
 * @returns {object|undefined} Navigation item
 */
export const getNavigationItemById = (id) => {
  return NAVIGATION_ITEMS.find(item => item.id === id);
};

/**
 * Get navigation item by path
 * @param {string} path - Route path
 * @returns {object|undefined} Navigation item
 */
export const getNavigationItemByPath = (path) => {
  return NAVIGATION_ITEMS.find(item => item.path === path);
};
