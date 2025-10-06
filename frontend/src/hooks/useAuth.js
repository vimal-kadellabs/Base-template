import { useContext } from 'react';
import { AuthContext } from '@/contexts/AuthContext';

/**
 * Custom hook to access AuthContext
 * Must be used within AuthProvider
 * 
 * @returns {Object} Auth context value
 * @property {Object|null} currentUser - Current user object
 * @property {boolean} isAuthenticated - Authentication status
 * @property {boolean} isAdmin - Admin status
 * @property {boolean} loading - Loading state
 * @property {Object|null} session - Current session
 * @property {Function} login - Login function
 * @property {Function} logout - Logout function
 * @property {Function} refreshUser - Refresh user data
 * @property {Function} hasRole - Check if user has role
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};
