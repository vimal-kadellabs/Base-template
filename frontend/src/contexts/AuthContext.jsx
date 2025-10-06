import React, { createContext, useState, useEffect, useCallback } from 'react';
import {
  login as authLogin,
  logout as authLogout,
  getCurrentSession,
  getCurrentUser,
  isAuthenticated as checkAuthenticated,
  isAdmin as checkAdmin,
} from '@/utils/auth';
import { ROUTES } from '@/constants/routes';

// Create AuthContext
export const AuthContext = createContext(null);

/**
 * AuthProvider Component
 * Provides authentication state and methods to all child components
 */
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);

  /**
   * Initialize auth state from localStorage on mount
   */
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const currentSession = getCurrentSession();
        
        if (currentSession) {
          const user = getCurrentUser();
          
          if (user) {
            setCurrentUser(user);
            setSession(currentSession);
            setIsAuthenticated(true);
            setIsAdmin(user.role === 'admin');
          } else {
            // Session exists but user not found, clear session
            authLogout();
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  /**
   * Login function
   * @param {string} username - Username
   * @param {string} password - Password
   * @returns {Object} Result object with success status and data/error
   */
  const login = useCallback((username, password) => {
    setLoading(true);
    
    try {
      const result = authLogin(username, password);
      
      if (result.success) {
        const { user, session: newSession } = result.data;
        
        setCurrentUser(user);
        setSession(newSession);
        setIsAuthenticated(true);
        setIsAdmin(user.role === 'admin');
        
        return {
          success: true,
          user,
        };
      } else {
        return {
          success: false,
          error: result.error,
        };
      }
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: 'An unexpected error occurred',
      };
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Logout function
   */
  const logout = useCallback(() => {
    try {
      authLogout();
      setCurrentUser(null);
      setSession(null);
      setIsAuthenticated(false);
      setIsAdmin(false);
    } catch (error) {
      console.error('Logout error:', error);
    }
  }, []);

  /**
   * Refresh user data from localStorage
   * Useful after user updates their profile
   */
  const refreshUser = useCallback(() => {
    try {
      const user = getCurrentUser();
      
      if (user) {
        setCurrentUser(user);
        setIsAdmin(user.role === 'admin');
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
    }
  }, []);

  /**
   * Check if current user has required role
   * @param {string} requiredRole - Required role
   * @returns {boolean} True if user has role
   */
  const hasRole = useCallback(
    (requiredRole) => {
      if (!currentUser) return false;
      if (currentUser.role === 'admin') return true; // Admin has all roles
      return currentUser.role === requiredRole;
    },
    [currentUser]
  );

  const value = {
    // State
    currentUser,
    isAuthenticated,
    isAdmin,
    loading,
    session,
    
    // Methods
    login,
    logout,
    refreshUser,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
