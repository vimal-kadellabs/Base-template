import { useState, useCallback, useEffect } from 'react';
import { getUsers, saveUsers } from '@/utils/localStorage';
import {
  generateId,
  searchUsers,
  filterUsersByRole,
  filterUsersByStatus,
  sortUsers,
  getUserStats,
  findUserById,
  isUsernameUnique,
  isEmailUnique,
  applyFilters,
} from '@/utils/dataHelpers';
import { validateForm, validateEmail, validatePassword, validateUsername } from '@/utils/validation';
import { getCurrentTimestamp } from '@/utils/dateHelpers';
import { USER_STATUS, ROLES } from '@/constants/config';

/**
 * Custom hook for user management operations
 * Provides CRUD operations and filtering for users
 * 
 * @returns {Object} User management functions and state
 */
export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Load users from localStorage
   */
  const loadUsers = useCallback(() => {
    try {
      setLoading(true);
      const loadedUsers = getUsers();
      setUsers(loadedUsers);
      setError(null);
    } catch (err) {
      console.error('Error loading users:', err);
      setError('Failed to load users');
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Load users on mount
   */
  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  /**
   * Save users to localStorage
   */
  const persistUsers = useCallback((updatedUsers) => {
    try {
      saveUsers(updatedUsers);
      setUsers(updatedUsers);
      return { success: true };
    } catch (err) {
      console.error('Error saving users:', err);
      return { success: false, error: 'Failed to save users' };
    }
  }, []);

  /**
   * Add new user
   * @param {Object} userData - User data
   * @returns {Object} Result with success status
   */
  const addUser = useCallback(
    (userData) => {
      try {
        // Validate required fields
        const rules = {
          username: { required: true, minLength: 3, label: 'Username' },
          email: { required: true, email: true, label: 'Email' },
          password: { required: true, minLength: 6, label: 'Password' },
          role: { required: true, label: 'Role' },
        };

        const validation = validateForm(userData, rules);
        if (!validation.isValid) {
          return {
            success: false,
            error: Object.values(validation.errors)[0],
          };
        }

        // Check username uniqueness
        if (!isUsernameUnique(users, userData.username)) {
          return {
            success: false,
            error: 'Username already exists',
          };
        }

        // Check email uniqueness
        if (!isEmailUnique(users, userData.email)) {
          return {
            success: false,
            error: 'Email already exists',
          };
        }

        // Create new user
        const newUser = {
          id: generateId(),
          username: userData.username,
          email: userData.email,
          password: userData.password,
          role: userData.role || ROLES.USER,
          status: userData.status || USER_STATUS.ACTIVE,
          createdAt: getCurrentTimestamp(),
          lastLogin: null,
        };

        const updatedUsers = [...users, newUser];
        const result = persistUsers(updatedUsers);

        if (result.success) {
          return {
            success: true,
            user: newUser,
            message: 'User added successfully',
          };
        }

        return result;
      } catch (err) {
        console.error('Error adding user:', err);
        return {
          success: false,
          error: 'Failed to add user',
        };
      }
    },
    [users, persistUsers]
  );

  /**
   * Update existing user
   * @param {string} userId - User ID
   * @param {Object} updates - Updated user data
   * @returns {Object} Result with success status
   */
  const updateUser = useCallback(
    (userId, updates) => {
      try {
        const userToUpdate = findUserById(users, userId);
        
        if (!userToUpdate) {
          return {
            success: false,
            error: 'User not found',
          };
        }

        // Validate username if changed
        if (updates.username && updates.username !== userToUpdate.username) {
          if (!isUsernameUnique(users, updates.username, userId)) {
            return {
              success: false,
              error: 'Username already exists',
            };
          }
        }

        // Validate email if changed
        if (updates.email && updates.email !== userToUpdate.email) {
          if (!isEmailUnique(users, updates.email, userId)) {
            return {
              success: false,
              error: 'Email already exists',
            };
          }
        }

        // Update user
        const updatedUsers = users.map((user) =>
          user.id === userId ? { ...user, ...updates } : user
        );

        const result = persistUsers(updatedUsers);

        if (result.success) {
          return {
            success: true,
            user: updatedUsers.find((u) => u.id === userId),
            message: 'User updated successfully',
          };
        }

        return result;
      } catch (err) {
        console.error('Error updating user:', err);
        return {
          success: false,
          error: 'Failed to update user',
        };
      }
    },
    [users, persistUsers]
  );

  /**
   * Delete user
   * @param {string} userId - User ID
   * @returns {Object} Result with success status
   */
  const deleteUser = useCallback(
    (userId) => {
      try {
        const userToDelete = findUserById(users, userId);
        
        if (!userToDelete) {
          return {
            success: false,
            error: 'User not found',
          };
        }

        const updatedUsers = users.filter((user) => user.id !== userId);
        const result = persistUsers(updatedUsers);

        if (result.success) {
          return {
            success: true,
            message: 'User deleted successfully',
          };
        }

        return result;
      } catch (err) {
        console.error('Error deleting user:', err);
        return {
          success: false,
          error: 'Failed to delete user',
        };
      }
    },
    [users, persistUsers]
  );

  /**
   * Reset user password
   * @param {string} userId - User ID
   * @param {string} newPassword - New password
   * @returns {Object} Result with success status
   */
  const resetPassword = useCallback(
    (userId, newPassword) => {
      try {
        const validation = validatePassword(newPassword);
        
        if (!validation.isValid) {
          return {
            success: false,
            error: validation.message,
          };
        }

        return updateUser(userId, { password: newPassword });
      } catch (err) {
        console.error('Error resetting password:', err);
        return {
          success: false,
          error: 'Failed to reset password',
        };
      }
    },
    [updateUser]
  );

  /**
   * Get user by ID
   * @param {string} userId - User ID
   * @returns {Object|null} User object or null
   */
  const getUserById = useCallback(
    (userId) => {
      return findUserById(users, userId);
    },
    [users]
  );

  /**
   * Get filtered users
   * @param {Object} filters - Filter options
   * @returns {Array} Filtered users
   */
  const getFilteredUsers = useCallback(
    (filters) => {
      return applyFilters(users, filters);
    },
    [users]
  );

  /**
   * Get user statistics
   * @returns {Object} User stats
   */
  const getStats = useCallback(() => {
    return getUserStats(users);
  }, [users]);

  /**
   * Refresh users from localStorage
   */
  const refresh = useCallback(() => {
    loadUsers();
  }, [loadUsers]);

  return {
    // State
    users,
    loading,
    error,
    
    // CRUD operations
    addUser,
    updateUser,
    deleteUser,
    resetPassword,
    
    // Query operations
    getUserById,
    getFilteredUsers,
    getStats,
    
    // Utility
    refresh,
  };
};
