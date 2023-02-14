export const isObj = val => Object.prototype.toString.call(val).slice(8, -1).toLowerCase() === 'object';

export const isArray = val => Object.prototype.toString.call(val).slice(8, -1).toLowerCase() === 'array';

export const isUndefined = val => val === undefined;

export const isNumber = val =>
  Object.prototype.toString.call(val).slice(8, -1).toLowerCase() === 'number' && !isNaN(val);

export const isObject = isObj;

export const isString = val => Object.prototype.toString.call(val).slice(8, -1).toLowerCase() === 'string';

export const isNil = val => isUndefined(val) || val === null || Number.isNaN(val) || val === '--';

export const hasOwn = (val, key) => Object.prototype.hasOwnProperty.call(val, key);

export const isFunction = val => Object.prototype.toString.call(val).slice(8, -1).toLowerCase() === 'function';

export const isEmpty = val =>
  (!val && val !== 0) || (isArray(val) && val.length === 0) || (isObject(val) && !Object.keys(val).length);

export const isPromise = obj => {
  return !!obj && (isObj(obj) || isFunction(obj)) && isFunction(obj.then);
};
