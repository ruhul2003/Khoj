/**
 * Currency and Number Formatting Utilities for Khoj Marketplace
 */

/**
 * Format a number as Bangladeshi Taka (৳) with standard comma separation
 * @param {number|string} amount 
 * @param {boolean} includeSymbol - default true
 * @returns {string} e.g. "৳ 45,000"
 */
export function formatBDT(amount, includeSymbol = true) {
  if (amount === undefined || amount === null || isNaN(Number(amount))) {
    return includeSymbol ? '৳ 0' : '0';
  }

  const num = Number(amount);
  const formatted = num.toLocaleString('en-IN'); // South Asian grouping (lakhs/crores compatible)

  return includeSymbol ? `৳ ${formatted}` : formatted;
}

/**
 * Format compact numbers for quick metrics (e.g. 1.2k, 25k, 1.5M)
 * @param {number|string} num 
 * @returns {string}
 */
export function formatCompactNumber(num) {
  if (!num || isNaN(Number(num))) return '0';
  const n = Number(num);
  if (n >= 10000000) return (n / 10000000).toFixed(1) + ' Cr';
  if (n >= 100000) return (n / 100000).toFixed(1) + ' L';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
  return n.toString();
}

/**
 * Calculate percentage discount between original and current price
 * @param {number} original 
 * @param {number} current 
 * @returns {number}
 */
export function calculateDiscount(original, current) {
  if (!original || !current || original <= current) return 0;
  return Math.round(((original - current) / original) * 100);
}
