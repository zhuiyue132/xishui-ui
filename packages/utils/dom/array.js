export const castArray = arr => {
  if (!arr && arr !== 0) return [];
  return Array.isArray(arr) ? arr : [arr];
};

export const unique = arr => [...new Set(arr)];

const spreadableSymbol = Symbol.isConcatSpreadable;
function isFlattenable(value) {
  return Array.isArray(value) || isArguments(value) || !!(value && value[spreadableSymbol]);
}
function baseFlatten(array, depth, predicate, isStrict, result) {
  predicate || (predicate = isFlattenable);
  result || (result = []);

  if (array == null) {
    return result;
  }

  for (const value of array) {
    if (depth > 0 && predicate(value)) {
      if (depth > 1) {
        baseFlatten(value, depth - 1, predicate, isStrict, result);
      } else {
        result.push(...value);
      }
    } else if (!isStrict) {
      result[result.length] = value;
    }
  }
  return result;
}

export function flattenDeep(array) {
  const length = array == null ? 0 : array.length;
  return length ? baseFlatten(array, INFINITY) : [];
}
