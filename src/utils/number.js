export const toInteger = (value, defaultValue = NaN) => {
  const integer = parseInt(value, 10);
  return isNaN(integer) ? defaultValue : integer;
};
