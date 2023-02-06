import numeral from 'numeral';
import { isNumber } from '@xishui-ui/utils';

/**
 * numeral文档：http://numeraljs.com
 */

const EMPTY = '--';

const EMPTY_LIST = [null, undefined, '', '-', '--'];

const isEmtpy = value => EMPTY_LIST.includes(value);

numeral.nullFormat(EMPTY);

export const getUnit = value => {
  if (isEmtpy(value)) return;
  if (isNaN(+value)) return;
  const val = numeral(value).value();
  if (Math.abs(val) >= Math.pow(100, 4)) return '亿';
  else if (Math.abs(val) >= Math.pow(100, 2)) return '万';
  else return '';
};

/**
 * 数字格式化
 * @param {*} value 数字
 * @param {*} digitsCountOrFormat 小数位数或自定义格式化字符串
 * @param {*} unit 是否除以单位制
 * @returns
 */
export const formatNumber = (value, digitsCountOrFormat = 0, unit = false) => {
  if (isEmtpy(value)) return EMPTY;

  if (isNaN(+value)) return value;

  const _def = '0,0';

  let format = _def;

  if (isNumber(digitsCountOrFormat)) {
    if (digitsCountOrFormat < 0) digitsCountOrFormat = 0;
    format = digitsCountOrFormat > 0 ? `${_def}.${'0'.repeat(+digitsCountOrFormat)}` : _def;
  } else {
    format = digitsCountOrFormat;
  }

  const result = numeral(value).format(format);

  if (!unit) return result;
  const _unit = getUnit(value);

  const units = {
    万: 10000,
    亿: 100000000
  };

  return numeral(value)
    .divide(units[_unit] || 1)
    .format(format);
};

/**
 * 百分比转化
 * @param {*} value 数字
 * @param {*} digits 小数位数，默认为2位小数
 * @returns 百分比字符串
 */
export const formatPercent = (value, digits = 2) => {
  const _def = '0%';

  if (digits < 0) digits = 0;

  const format = digits > 0 ? `0.${'0'.repeat(digits)}%` : _def;

  return formatNumber(value, format);
};

/**
 * 输入什么就输出什么，用于一些默认的格式化占位，避免没有格式函数时报错；
 * @param {*} v
 * @returns
 */
export const formatOriginal = v => v;
