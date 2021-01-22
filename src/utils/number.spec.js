import { toInteger } from './number';

test('toInteger()', () => {
  expect(toInteger(1)).toBe(1);
  expect(toInteger('1')).toBe(1);
  expect(toInteger(1e5)).toBe(100000);
  expect(toInteger('1e5')).toBe(1);
  expect(toInteger('256 foobar')).toBe(256);
  expect(toInteger('foo 256bar')).toBe(NaN);
  expect(toInteger({})).toBe(NaN);
  expect(toInteger([])).toBe(NaN);
  expect(toInteger(new Date())).toBe(NaN);
  expect(toInteger(null)).toBe(NaN);
  expect(toInteger(undefined)).toBe(NaN);
  expect(toInteger(null, 0)).toBe(0);
  expect(toInteger(undefined, -1)).toBe(-1);
});
