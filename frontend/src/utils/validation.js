import { APP_CONFIG } from '../constants/config';

/**
 * Validate email format
 * @param {string} email - Email address
 * @returns {boolean} True if valid, false otherwise
 */
export const validateEmail = (email) => {
  if (!email) return false;
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password
 * @returns {Object} Validation result with isValid and message
 */
export const validatePassword = (password) => {
  if (!password) {
    return {
      isValid: false,
      message: 'Password is required',
    };
  }
  
  if (password.length < APP_CONFIG.PASSWORD_MIN_LENGTH) {
    return {
      isValid: false,
      message: `Password must be at least ${APP_CONFIG.PASSWORD_MIN_LENGTH} characters long`,
    };
  }
  
  return {
    isValid: true,
    message: 'Password is valid',
  };
};

/**
 * Validate username format
 * @param {string} username - Username
 * @returns {Object} Validation result with isValid and message
 */
export const validateUsername = (username) => {
  if (!username) {
    return {
      isValid: false,
      message: 'Username is required',
    };
  }
  
  if (username.length < APP_CONFIG.USERNAME_MIN_LENGTH) {
    return {
      isValid: false,
      message: `Username must be at least ${APP_CONFIG.USERNAME_MIN_LENGTH} characters long`,
    };
  }
  
  // Username should only contain alphanumeric characters and underscores
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!usernameRegex.test(username)) {
    return {
      isValid: false,
      message: 'Username can only contain letters, numbers, and underscores',
    };
  }
  
  return {
    isValid: true,
    message: 'Username is valid',
  };
};

/**
 * Validate required field
 * @param {any} value - Field value
 * @param {string} fieldName - Field name for error message
 * @returns {Object} Validation result
 */
export const validateRequired = (value, fieldName = 'Field') => {
  if (value === null || value === undefined || value === '') {
    return {
      isValid: false,
      message: `${fieldName} is required`,
    };
  }
  
  return {
    isValid: true,
    message: '',
  };
};

/**
 * Validate form with multiple fields and rules
 * @param {Object} formData - Form data object
 * @param {Object} rules - Validation rules object
 * @returns {Object} Validation result with errors object
 */
export const validateForm = (formData, rules) => {
  const errors = {};
  let isValid = true;
  
  Object.keys(rules).forEach((field) => {
    const value = formData[field];
    const fieldRules = rules[field];
    
    // Check required
    if (fieldRules.required) {
      const result = validateRequired(value, fieldRules.label || field);
      if (!result.isValid) {
        errors[field] = result.message;
        isValid = false;
        return;
      }
    }
    
    // Check email
    if (fieldRules.email && value) {
      if (!validateEmail(value)) {
        errors[field] = 'Invalid email format';
        isValid = false;
        return;
      }
    }
    
    // Check minLength
    if (fieldRules.minLength && value) {
      if (value.length < fieldRules.minLength) {
        errors[field] = `Must be at least ${fieldRules.minLength} characters`;
        isValid = false;
        return;
      }
    }
    
    // Check maxLength
    if (fieldRules.maxLength && value) {
      if (value.length > fieldRules.maxLength) {
        errors[field] = `Must be no more than ${fieldRules.maxLength} characters`;
        isValid = false;
        return;
      }
    }
    
    // Check custom validator
    if (fieldRules.validator && value) {
      const result = fieldRules.validator(value);
      if (!result.isValid) {
        errors[field] = result.message;
        isValid = false;
        return;
      }
    }
  });
  
  return {
    isValid,
    errors,
  };
};

/**
 * Get validation error message for display
 * @param {string} field - Field name
 * @param {string} message - Error message
 * @returns {string} Formatted error message
 */
export const getValidationErrorMessage = (field, message) => {
  return message || `${field} is invalid`;
};
