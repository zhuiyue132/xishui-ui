export function addUnit(value, defaultUnit = 'px') {
  if (!value) return '';
  if (typeof value === 'string') {
    return value;
  } else if (typeof value === 'number') {
    return `${value}${defaultUnit}`;
  }
}
