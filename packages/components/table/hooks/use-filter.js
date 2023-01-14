import { computed, ref, unref, watch, reactive, toRefs } from 'vue';

export const tree2List = (tree, result = []) => {
  tree.forEach(node => {
    result.push(node);
    node.children && tree2List(node.children, result);
  });
  return result;
};

/**
 * 表格配套筛选；
 * @param {*} $data computedRef
 * @param {*} $columns computedRef
 * @param {*} $filters ref
 * @param {*} props  proxy
 * @returns
 */
export const useTableFilter = ($data, $columns, $filters, props) => {
  const { useInnerFilter } = toRefs(props);

  const columns = computed(() => {
    return tree2List($columns.value);
  });

  const getFilterMethodMap = () => {
    return columns.value
      .filter(({ filterable, prop }) => !!prop && !!filterable)
      .map(({ prop, filterMethod }) => ({
        [prop]: filterMethod
      }))
      .reduce((acc, cur) => ({ ...acc, ...cur }), {});
  };

  let filterMethodMap = reactive(getFilterMethodMap());

  /**
   * $filters.value的形式是： { [prop]: [value1, value2] } }
   *
   * filters.value的形式是： { [prop]: (row) => Boolean }
   *
   * 二者不同，需要注意。
   */
  const getFilters = () => {
    const propKeys = Object.keys($filters.value);
    return propKeys.reduce((acc, cur) => {
      const value = $filters.value[cur];
      const column = columns.value.find(e => e.prop === cur);

      if (column && value && filterMethodMap[cur]) {
        acc[cur] = filterMethodMap[cur]({ value, prop: cur, column });
      }

      return acc;
    }, {});
  };

  const filters = ref(getFilters());
  const filteredData = ref([]);

  const removeFilter = prop => {
    delete $filters.value[prop];
    delete filters.value[prop];
  };

  const triggerFilter = () => {
    if (!unref($data).length) {
      filteredData.value = [];
    } else if (!useInnerFilter.value) {
      filteredData.value = unref($data);
    } else {
      filteredData.value = $data.value.filter(row => {
        const methods = Object.values(filters.value);
        return methods.reduce((prev, current) => {
          return prev && current?.(row);
        }, true);
      });
    }
  };

  // 筛选确认事件；
  const onPopoverConfirm = ({ value, prop, column }) => {
    // 如果筛选值为空，即使点击的是确认筛选，也当做取消筛选来做；
    if (!value || value.every(e => [null, ''].includes(e))) {
      removeFilter(prop);
    } else {
      // 根据列名生成新的筛选项
      filters.value[prop] = filterMethodMap[prop]?.({ value, prop, column });
      $filters.value[prop] = value;
    }
  };

  // 取消筛选事件；
  const onPopoverCancel = ({ prop }) => removeFilter(prop);

  const clearFilter = prop => {
    if (prop) {
      removeFilter(prop);
    } else {
      filters.value = {};
      $filters.value = {};
    }
  };

  const getFilter = () => {
    return JSON.parse(JSON.stringify($filters.value));
  };

  watch([filters, $data], triggerFilter, { immediate: true, deep: true });

  watch(
    $filters,
    () => {
      if (Object.keys($filters.value).length !== Object.keys(filters.value).length) {
        filters.value = getFilters();
      }
    },
    { deep: true }
  );

  watch($columns, () => {
    filterMethodMap = reactive(getFilterMethodMap());
  });

  return {
    data: filteredData,
    onPopoverConfirm,
    onPopoverCancel,
    clearFilter,
    getFilter,
    columns
  };
};
