/**
 * Format date to readable string
 * @param {string|Date} date - Date to format
 * @param {string} format - Format type (short, long, datetime)
 * @returns {string} Formatted date string
 */
export const formatDate = (date, format = 'short') => {
  if (!date) return 'N/A';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }
  
  const options = {
    short: { year: 'numeric', month: 'short', day: 'numeric' },
    long: { year: 'numeric', month: 'long', day: 'numeric' },
    datetime: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    },
  };
  
  return dateObj.toLocaleDateString('en-US', options[format] || options.short);
};

/**
 * Get relative time (e.g., "2 hours ago")
 * @param {string|Date} date - Date to convert
 * @returns {string} Relative time string
 */
export const getRelativeTime = (date) => {
  if (!date) return 'Never';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return 'Invalid Date';
  }
  
  const now = Date.now();
  const timestamp = dateObj.getTime();
  const diffInSeconds = Math.floor((now - timestamp) / 1000);
  
  if (diffInSeconds < 60) {
    return 'Just now';
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  }
  
  const diffInWeeks = Math.floor(diffInDays / 7);
  if (diffInWeeks < 4) {
    return `${diffInWeeks} week${diffInWeeks > 1 ? 's' : ''} ago`;
  }
  
  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  }
  
  const diffInYears = Math.floor(diffInDays / 365);
  return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
};

/**
 * Check if date is recent (within specified threshold)
 * @param {string|Date} date - Date to check
 * @param {number} thresholdInHours - Threshold in hours (default: 24)
 * @returns {boolean} True if recent, false otherwise
 */
export const isRecent = (date, thresholdInHours = 24) => {
  if (!date) return false;
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return false;
  }
  
  const now = Date.now();
  const timestamp = dateObj.getTime();
  const diffInMs = now - timestamp;
  const thresholdInMs = thresholdInHours * 60 * 60 * 1000;
  
  return diffInMs <= thresholdInMs;
};

/**
 * Get current timestamp in ISO format
 * @returns {string} ISO timestamp string
 */
export const getCurrentTimestamp = () => {
  return new Date().toISOString();
};

/**
 * Format time to HH:MM format
 * @param {string|Date} date - Date to format
 * @returns {string} Time string
 */
export const formatTime = (date) => {
  if (!date) return 'N/A';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return 'Invalid Time';
  }
  
  return dateObj.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Check if date is today
 * @param {string|Date} date - Date to check
 * @returns {boolean} True if today, false otherwise
 */
export const isToday = (date) => {
  if (!date) return false;
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  
  if (isNaN(dateObj.getTime())) {
    return false;
  }
  
  const today = new Date();
  
  return (
    dateObj.getDate() === today.getDate() &&
    dateObj.getMonth() === today.getMonth() &&
    dateObj.getFullYear() === today.getFullYear()
  );
};

/**
 * Get date range description
 * @param {string|Date} startDate - Start date
 * @param {string|Date} endDate - End date
 * @returns {string} Date range description
 */
export const getDateRangeDescription = (startDate, endDate) => {
  if (!startDate || !endDate) return 'N/A';
  
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;
  
  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    return 'Invalid Date Range';
  }
  
  const diffInMs = end.getTime() - start.getTime();
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  
  if (diffInDays === 0) {
    return 'Same day';
  }
  
  if (diffInDays === 1) {
    return '1 day';
  }
  
  if (diffInDays < 7) {
    return `${diffInDays} days`;
  }
  
  const weeks = Math.floor(diffInDays / 7);
  if (weeks < 4) {
    return `${weeks} week${weeks > 1 ? 's' : ''}`;
  }
  
  const months = Math.floor(diffInDays / 30);
  return `${months} month${months > 1 ? 's' : ''}`;
};
