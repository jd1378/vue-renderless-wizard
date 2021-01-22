import { isFunction, isPlainObject } from './inspect';

it('isFunction()', async () => {
  expect(isFunction(123)).toEqual(false);
  expect(isFunction('123')).toEqual(false);
  expect(isFunction(true)).toEqual(false);
  expect(isFunction({})).toEqual(false);
  expect(isFunction([])).toEqual(false);
  expect(isFunction(/abc/)).toEqual(false);
  expect(isFunction(() => {})).toEqual(true);
  expect(isFunction(Date)).toEqual(true);
  expect(isFunction(new Date())).toEqual(false);
  expect(isFunction(undefined)).toEqual(false);
  expect(isFunction(null)).toEqual(false);
});

it('isPlainObject()', async () => {
  expect(isPlainObject(123)).toEqual(false);
  expect(isPlainObject('123')).toEqual(false);
  expect(isPlainObject(true)).toEqual(false);
  expect(isPlainObject({})).toEqual(true);
  expect(isPlainObject([])).toEqual(false);
  expect(isPlainObject(/abc/)).toEqual(false);
  expect(isPlainObject(() => {})).toEqual(false);
  expect(isPlainObject(Date)).toEqual(false);
  expect(isPlainObject(new Date())).toEqual(false);
  expect(isPlainObject(undefined)).toEqual(false);
  expect(isPlainObject(null)).toEqual(false);
});
