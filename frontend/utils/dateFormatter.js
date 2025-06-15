/**
 * Standardized Date Formatter using Day.js
 * Ensures consistent date presentation across user profile, room bookings, and reviews.
 */

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

/**
 * Format a date string or timestamp into readable format
 * @param {string|Date|number} date
 * @param {string} formatPattern Default: 'MMM DD, YYYY'
 * @returns {string} Formatted date string
 */
export const formatDate = (date, formatPattern = 'MMM DD, YYYY') => {
  if (!date) return 'N/A';
  const parsed = dayjs(date);
  return parsed.isValid() ? parsed.format(formatPattern) : 'Invalid Date';
};

/**
 * Format date into relative time (e.g. "3 days ago")
 * @param {string|Date|number} date
 * @returns {string}
 */
export const formatRelativeTime = (date) => {
  if (!date) return '';
  const parsed = dayjs(date);
  return parsed.isValid() ? parsed.fromNow() : '';
};

export default dayjs;
