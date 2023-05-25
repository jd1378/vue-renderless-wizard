// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(value: unknown): value is Function {
  return typeof value === 'function';
}

// Strict object type check
// Only returns true for plain JavaScript objects
export function isPlainObject(obj: unknown): obj is object {
  return Object.prototype.toString.call(obj) === '[object Object]';
}
