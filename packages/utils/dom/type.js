export const isObj = val => Object.prototype.toString.call(val).slice(8, -1).toLowerCase() === 'object';

export const isUndefined = val => val === undefined;

export const isNumber = val =>
  Object.prototype.toString.call(val).slice(8, -1).toLowerCase() === 'number' && !isNaN(val);

export const isObject = isObj;

export const isString = val => Object.prototype.toString.call(val).slice(8, -1).toLowerCase() === 'string';

export const isNil = val => isUndefined(val) || val === null;

export const hasOwn = (val, key) => Object.prototype.hasOwnProperty.call(val, key);
