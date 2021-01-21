import { isPlainObject } from './inspect';
export const cloneDeep = (obj, defaultValue = obj) => {
  if (Array.isArray(obj)) {
    return obj.reduce((result, val) => [...result, cloneDeep(val, val)], []);
  }
  if (isPlainObject(obj)) {
    return Object.keys(obj).reduce(
      (result, key) => ({ ...result, [key]: cloneDeep(obj[key], obj[key]) }),
      {}
    );
  }
  return defaultValue;
};
