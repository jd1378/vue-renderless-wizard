export const isFunction = (value) => typeof value === 'function';

// Strict object type check
// Only returns true for plain JavaScript objects
export const isPlainObject = (obj) =>
  Object.prototype.toString.call(obj) === '[object Object]';
