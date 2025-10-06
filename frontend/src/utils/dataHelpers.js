import { ROLES, USER_STATUS } from '../constants/config';

/**
 * Generate unique ID (simple implementation)
 * @returns {string} Unique ID
 */
export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

/**
 * Search users by term (searches username and email)
 * @param {Array} users - Array of user objects
 * @param {string} searchTerm - Search term
 * @returns {Array} Filtered users
 */
export const searchUsers = (users, searchTerm) => {
  if (!searchTerm || searchTerm.trim() === '') {
    return users;
  }
  
  const term = searchTerm.toLowerCase().trim();
  
  return users.filter(
    (user) =>
      user.username.toLowerCase().includes(term) ||
      user.email.toLowerCase().includes(term)
  );
};

/**
 * Filter users by role
 * @param {Array} users - Array of user objects
 * @param {string} role - Role to filter by
 * @returns {Array} Filtered users
 */
export const filterUsersByRole = (users, role) => {
  if (!role || role === 'all') {
    return users;
  }
  
  return users.filter((user) => user.role === role);
};

/**
 * Filter users by status
 * @param {Array} users - Array of user objects
 * @param {string} status - Status to filter by
 * @returns {Array} Filtered users
 */
export const filterUsersByStatus = (users, status) => {
  if (!status || status === 'all') {
    return users;
  }
  
  return users.filter((user) => user.status === status);
};

/**
 * Sort users by field and order
 * @param {Array} users - Array of user objects
 * @param {string} sortBy - Field to sort by (username, email, createdAt, lastLogin)
 * @param {string} order - Sort order (asc, desc)
 * @returns {Array} Sorted users
 */
export const sortUsers = (users, sortBy = 'username', order = 'asc') => {
  const sortedUsers = [...users];
  
  sortedUsers.sort((a, b) => {
    let valueA = a[sortBy];
    let valueB = b[sortBy];
    
    // Handle dates
    if (sortBy === 'createdAt' || sortBy === 'lastLogin') {
      valueA = new Date(valueA).getTime();
      valueB = new Date(valueB).getTime();
    }
    
    // Handle strings
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      valueA = valueA.toLowerCase();
      valueB = valueB.toLowerCase();
    }
    
    if (order === 'asc') {
      return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
    } else {
      return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
    }
  });
  
  return sortedUsers;
};

/**
 * Get user statistics
 * @param {Array} users - Array of user objects
 * @returns {Object} Statistics object
 */
export const getUserStats = (users) => {
  const total = users.length;
  const active = users.filter((u) => u.status === USER_STATUS.ACTIVE).length;
  const inactive = users.filter((u) => u.status === USER_STATUS.INACTIVE).length;
  const admins = users.filter((u) => u.role === ROLES.ADMIN).length;
  const regularUsers = users.filter((u) => u.role === ROLES.USER).length;
  
  // Users who logged in within last 24 hours
  const now = Date.now();
  const recentlyActive = users.filter((u) => {
    if (!u.lastLogin) return false;
    const lastLogin = new Date(u.lastLogin).getTime();
    return now - lastLogin < 24 * 60 * 60 * 1000;
  }).length;
  
  return {
    total,
    active,
    inactive,
    admins,
    regularUsers,
    recentlyActive,
  };
};

/**
 * Find user by ID
 * @param {Array} users - Array of user objects
 * @param {string} userId - User ID
 * @returns {Object|null} User object or null
 */
export const findUserById = (users, userId) => {
  return users.find((u) => u.id === userId) || null;
};

/**
 * Find user by username
 * @param {Array} users - Array of user objects
 * @param {string} username - Username
 * @returns {Object|null} User object or null
 */
export const findUserByUsername = (users, username) => {
  return users.find((u) => u.username === username) || null;
};

/**
 * Find user by email
 * @param {Array} users - Array of user objects
 * @param {string} email - Email
 * @returns {Object|null} User object or null
 */
export const findUserByEmail = (users, email) => {
  return users.find((u) => u.email === email) || null;
};

/**
 * Check if username is unique (not already taken)
 * @param {Array} users - Array of user objects
 * @param {string} username - Username to check
 * @param {string} excludeUserId - User ID to exclude from check (for edit)
 * @returns {boolean} True if unique, false otherwise
 */
export const isUsernameUnique = (users, username, excludeUserId = null) => {
  return !users.some(
    (u) => u.username === username && u.id !== excludeUserId
  );
};

/**
 * Check if email is unique (not already taken)
 * @param {Array} users - Array of user objects
 * @param {string} email - Email to check
 * @param {string} excludeUserId - User ID to exclude from check (for edit)
 * @returns {boolean} True if unique, false otherwise
 */
export const isEmailUnique = (users, email, excludeUserId = null) => {
  return !users.some(
    (u) => u.email === email && u.id !== excludeUserId
  );
};

/**
 * Apply multiple filters and search to users
 * @param {Array} users - Array of user objects
 * @param {Object} filters - Filter options
 * @returns {Array} Filtered users
 */
export const applyFilters = (users, filters = {}) => {
  let filtered = [...users];
  
  // Apply search
  if (filters.search) {
    filtered = searchUsers(filtered, filters.search);
  }
  
  // Apply role filter
  if (filters.role) {
    filtered = filterUsersByRole(filtered, filters.role);
  }
  
  // Apply status filter
  if (filters.status) {
    filtered = filterUsersByStatus(filtered, filters.status);
  }
  
  // Apply sorting
  if (filters.sortBy) {
    filtered = sortUsers(filtered, filters.sortBy, filters.order || 'asc');
  }
  
  return filtered;
};
