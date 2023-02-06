import { ref, watch, computed, toRefs } from 'vue';
import { DEFAULT_PAGINATION } from '../config';

const _chunk = (arr = [], num = 1) => {
  num = num * 1;
  let ret = [];
  arr.forEach(function (item, i) {
    if (i % num === 0) {
      ret.push([]);
    }
    ret[ret.length - 1].push(item);
  });
  return ret;
};

export const useTablePagination = ($data, props = {}) => {
  const { pagination } = toRefs(props);

  const canPaginated = computed(() => {
    if (!pagination.value) return false;
    return true;
  });

  const _pagination = computed(() => {
    if (!pagination.value) return DEFAULT_PAGINATION;
    return {
      ...DEFAULT_PAGINATION,
      ...(typeof pagination.value === 'boolean' ? {} : pagination.value)
    };
  });

  const _size = computed(() => {
    if (canPaginated.value) return pageSize.value;
    return $data.value.length;
  });

  const position = computed(() => _pagination.value.position);
  const currentPage = ref(1);
  const total = ref($data.value.length);
  // const pageSize = computed(() => _pagination.value.pageSize);
  const pageSize = ref(_pagination.value.pageSize);
  const pageSizes = computed(() => _pagination.value.pageSizes);
  const layout = computed(() => _pagination.value.layout);
  const paging = ref(_chunk($data.value, _size.value));
  const currentData = ref(paging.value[0] || []);

  const onPageSizeChange = () => {
    console.log('onPageSizeChange');
    paging.value = _chunk($data.value, _size.value);
    onCurrentChange();
  };

  const onCurrentChange = () => {
    currentData.value = paging.value[currentPage.value - 1] || [];
  };

  watch(pageSize, onPageSizeChange);
  watch(currentPage, onCurrentChange);
  watch(
    $data,
    () => {
      onPageSizeChange();
      total.value = $data.value.length;
    },
    { deep: true }
  );

  return {
    currentPage,
    total,
    pageSize,
    pageSizes,
    layout,
    paging,
    currentData,
    onPageSizeChange,
    onCurrentChange,
    position
  };
};
