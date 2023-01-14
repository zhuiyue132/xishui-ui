import { toRefs } from 'vue';
export const useEventProxy = (props, emits, $sort, $filter, onPopoverConfirm, onPopoverCancel) => {
  const { useInnerSort, useInnerFilter } = toRefs(props);

  const $emits = (type, args) => {
    emits(type, args);
    const { prop, order, value, column } = args;
    switch (type) {
      case 'sortChange':
        if (!useInnerSort.value) return;
        $sort.value.prop = prop;
        $sort.value.order = order;
        break;

      case 'filterChange':
        break;

      case 'popoverConfirm':
        if (!useInnerFilter.value) return;
        onPopoverConfirm({ column, value, prop });
        break;

      case 'popoverCancel':
        if (!useInnerFilter.value) return;
        onPopoverCancel({ column, prop });

        break;

      case 'currentDataChange':
        break;

      default:
        break;
    }
  };
  return {
    $emits
  };
};
