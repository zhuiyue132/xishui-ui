import { isNumber, isNil, isString, isObject, hasOwn } from './type';

/**
 * 将数组内除了主键字段外，能转换成数字的字段转换成数字
 * @param {*} data
 * @returns
 */
export const toNumber = (data = []) => {
  if (!Array.isArray(data)) return [];
  return data.map(item => {
    if (isNil(item)) return null;
    if (isNumber(item)) return item;
    if (isString(item)) return !Number.isNaN(Number(item)) && item ? Number(item) : item;

    if (isObject(item)) {
      const result = {};
      for (const key in item) {
        if (key?.toString()?.toLowerCase()?.indexOf?.('id') > -1) {
          result[key] = item[key];
          continue;
        }
        if (hasOwn(item, key)) {
          if (Array.isArray(item[key])) {
            result[key] = toNumber(item[key]);
          } else if (!Number.isNaN(Number(item[key])) && item[key]) {
            result[key] = Number(item[key]);
          } else {
            result[key] = item[key];
          }
        }
      }
      return result;
    }

    return null;
  });
};
