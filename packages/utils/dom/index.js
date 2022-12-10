export const isObj = val => Object.prototype.toString.call(val).slice(8, -1).toLowerCase() === 'object';

export const isUndefined = val => val === undefined;

export function addUnit(value, defaultUnit = 'px') {
  if (!value) return '';
  if (typeof value === 'string') {
    return value;
  } else if (typeof value === 'number') {
    return `${value}${defaultUnit}`;
  }
}
