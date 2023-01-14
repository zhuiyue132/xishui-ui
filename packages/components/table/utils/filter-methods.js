import { ElMessage } from 'element-plus';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

/*
 * 对popover的输入数据做一下简单的校验，多个数字需要满足数字正确，范围正确；
 * @param {*} value
 * @param {*} prop
 * @returns
 */
export const valueValidator = (value, prop) => {
  if (!prop || !value) return false;
  if (!Array.isArray(value)) {
    value = [value];
  }

  if (value.map(item => Number(item)).includes(NaN)) {
    ElMessage.error('请输入正确的数字范围');
    return false;
  }

  const [min, max] = value.map(item => (item === '' ? null : Number(item)));

  if (min && max && min > max) {
    ElMessage.error('最小值不能大于最大值');
    return false;
  }
  return [min, max];
};

/**
 * 纯文本筛选；
 * @param {*} param0
 * @returns
 */
export const plainTextFilter = ({ value, prop }) => {
  if (!prop || !value) return () => true;
  return row => {
    return new RegExp(value[0]).test(JSON.stringify(row[prop]));
  };
};

/**
 * 多个纯文本筛选；
 * @param {*} param0
 * @returns
 */
export const multiPlainTextFilter = ({ value, prop }) => {
  if (!prop || !value) return () => true;
  if (!Array.isArray(value)) {
    console.error('筛选条件必须为数组');
    return;
  }
  return row => {
    return value.some(val => new RegExp(val).test(JSON.stringify(row[prop])));
  };
};

/**
 * 数字范围筛选；
 * @param {*} param0
 * @returns
 */
export const numberRangeFilter = ({ value, prop, column }) => {
  const validateRes = valueValidator(value, prop);
  if (!validateRes) return () => true;
  let [min, max] = validateRes;
  min = min === null ? NaN : min;
  max = max === null ? NaN : max;
  return row => {
    const value = Number(row[prop]);

    if (isNaN(value)) return false;
    const { suffixLabel = '' } = column.filter || {};

    const suffixMap = {
      '%': 0.01,
      万: 10000,
      亿: 100000000
    };

    let multiplier = suffixMap[suffixLabel] || 1;

    if (!isNaN(min)) min = Number(min);
    if (!isNaN(max)) max = Number(max);

    if (min === 0 && max === 0) {
      return value === 0;
    }
    if (isNaN(max)) {
      return !(value < min * multiplier);
    }

    if (isNaN(min)) {
      return !(value > max * multiplier);
    }

    return value >= min * multiplier && value <= max * multiplier;
  };
};

/**
 * 时间范围筛选；
 * @param {*} param0
 */
export const timeRangeFilter = ({ value, prop }) => {
  return row => {
    const timeVal = row[prop];
    if (!timeVal) return false;
    const [start, end = start] = value;
    return dayjs(timeVal).isBetween(`${start} 00:00:00`, `${end} 23:59:59`, null, '[]');
  };
};
