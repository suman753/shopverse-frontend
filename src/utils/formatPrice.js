/**
 * Format a number as a USD price string.
 * @param {number} price
 * @returns {string}
 */
export function formatPrice(price) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}
