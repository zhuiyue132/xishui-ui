export const isObj = val => Object.prototype.toString.call(val).slice(8, -1).toLowerCase() === 'object';
