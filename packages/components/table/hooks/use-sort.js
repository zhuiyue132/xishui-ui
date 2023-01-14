import { watch, toRefs, unref } from 'vue';
import { sorter } from '../config';

/**
 *表格排序；
 * @param {*} $data ref
 * @param {*} $sort ref
 * @param {*} props proxy
 * @returns
 */
export const useTableSort = ($data, $sort, props) => {
  const { useInnerSort, timeProps } = toRefs(props);

  const onSortChange = () => {
    if (!useInnerSort.value) return;
    const { prop = '', order = '' } = unref($sort);
    $data.value = $data.value.sort(sorter(prop, order, unref(timeProps)));
  };

  watch($sort, onSortChange, { immediate: true, deep: true });
  watch($data, onSortChange);

  return {
    data: $data
  };
};
