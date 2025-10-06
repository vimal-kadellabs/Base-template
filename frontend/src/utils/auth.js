import { getUsers, saveUsers, getSession, saveSession, clearSession } from './localStorage';
import { ROLES } from '../constants/config';

/**
 * Validate user credentials against mock data
 * @param {string} username - Username
 * @param {string} password - Password
 * @returns {Object|null} User object if valid, null otherwise
 */
export const validateCredentials = (username, password) => {
  const users = getUsers();
  const user = users.find(
    (u) => u.username === username && u.password === password
  );
  
  if (user) {
    // Update last login time
    const updatedUsers = users.map((u) =>
      u.id === user.id ? { ...u, lastLogin: new Date().toISOString() } : u
    );
    saveUsers(updatedUsers);
    
    return user;
  }
  
  return null;
};

/**
 * Create session object for authenticated user
 * @param {Object} user - User object
 * @returns {Object} Session object
 */
export const createSession = (user) => {
  const session = {
    userId: user.id,
    username: user.username,
    email: user.email,
    role: user.role,
    loginTime: new Date().toISOString(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
  };
  
  saveSession(session);
  return session;
};

/**
 * Get current session if valid
 * @returns {Object|null} Session object if valid, null otherwise
 */
export const getCurrentSession = () => {
  const session = getSession();
  
  if (!session) {
    return null;
  }
  
  // Check if session has expired
  const now = new Date();
  const expiresAt = new Date(session.expiresAt);
  
  if (now > expiresAt) {
    clearSession();
    return null;
  }
  
  return session;
};

/**
 * Clear current session (logout)
 */
export const destroySession = () => {
  clearSession();
};

/**
 * Check if user is authenticated
 * @returns {boolean} True if authenticated, false otherwise
 */
export const isAuthenticated = () => {
  const session = getCurrentSession();
  return session !== null;
};

/**
 * Check if current user has required role
 * @param {string} requiredRole - Required role (from ROLES constant)
 * @returns {boolean} True if user has role, false otherwise
 */
export const hasRole = (requiredRole) => {
  const session = getCurrentSession();
  
  if (!session) {
    return false;
  }
  
  // Admin has access to everything
  if (session.role === ROLES.ADMIN) {
    return true;
  }
  
  return session.role === requiredRole;
};

/**
 * Check if current user is admin
 * @returns {boolean} True if admin, false otherwise
 */
export const isAdmin = () => {
  const session = getCurrentSession();
  return session && session.role === ROLES.ADMIN;
};

/**
 * Get current user from session
 * @returns {Object|null} User object or null
 */
export const getCurrentUser = () => {
  const session = getCurrentSession();
  
  if (!session) {
    return null;
  }
  
  const users = getUsers();
  return users.find((u) => u.id === session.userId) || null;
};

/**
 * Login user with credentials
 * @param {string} username - Username
 * @param {string} password - Password
 * @returns {Object} Result object with success status and data/error
 */
export const login = (username, password) => {
  if (!username || !password) {
    return {
      success: false,
      error: 'Username and password are required',
    };
  }
  
  const user = validateCredentials(username, password);
  
  if (!user) {
    return {
      success: false,
      error: 'Invalid username or password',
    };
  }
  
  if (user.status === 'inactive') {
    return {
      success: false,
      error: 'Account is inactive. Please contact administrator.',
    };
  }
  
  const session = createSession(user);
  
  return {
    success: true,
    data: {
      user,
      session,
    },
  };
};

/**
 * Logout current user
 */
export const logout = () => {
  destroySession();
};
