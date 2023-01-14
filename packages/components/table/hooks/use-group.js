import { computed, onMounted, nextTick, ref, unref } from 'vue';
import { isNil, addUnit, triggerEvent } from '@xishui-ui/utils';
import { isClient, useEventListener } from '@vueuse/core';
import { GROUPNAME_PEFIX } from '../config';

/**
 * 获取指定组的叶子节点的prop；
 * @param {*} columns
 * @param {*} name
 * @returns
 */
const getColumnsLeafProp = (columns, name) => {
  const leaf = [];
  columns.forEach(column => {
    if (column.group === name) {
      if (column.children?.length) {
        leaf.push(...getColumnsLeafProp(column.children, name));
      } else {
        leaf.push(column.prop);
      }
    }
  });
  return leaf.filter(Boolean);
};

export const useTableGroup = ($columns, $data, scrollLeft) => {
  /**
   * 表格是否有主动的分组；
   * 即便多级表头，如果没有主动设置group，也不算分组，无法使用分组的slot；
   */
  const isGroup = computed(() => {
    return $columns.value.some(item => item.children?.length && !!item.group);
  });

  const isMounted = ref(false);
  const slots = ref([]);

  /**
   * 统计好的分组信息
   * { [组名]：[prop1, prop2, ...] }
   */
  const groupProps = computed(() => {
    if (!isGroup.value) return {};
    const _groups = $columns.value.filter(item => item.children?.length && !!item.group).map(item => item.group);

    return _groups
      .map(group => ({
        [group]: getColumnsLeafProp($columns.value, group)
      }))
      .reduce((a, b) => ({ ...a, ...b }), {});
  });

  /**
   * 判断指定的prop是否都为空；
   * @param {*} props
   * @returns
   */
  const isEmpty = (props = []) => {
    const list = [];

    props.forEach(prop => {
      list.push($data.value.some(item => !isNil(item[prop])));
    });

    return list.filter(Boolean).length === 0;
  };

  const getSlotPosition = group => {
    if (!isClient || !isMounted.value) return null;
    const domNode = document.querySelectorAll(`td.${GROUPNAME_PEFIX}${group}`);

    const { 0: first, [domNode.length - 1]: last } = domNode;
    const { offsetLeft } = first || {};
    const { left = 0, top = 0 } = first?.getBoundingClientRect?.() || {};
    const { right = 0, bottom = 0 } = last?.getBoundingClientRect?.() || {};
    const _width = unref(right) - unref(left);
    const _height = unref(bottom) - unref(top);
    return {
      name: `${group}Empty`,
      width: addUnit(_width - 1),
      height: addUnit(_height),
      left: addUnit(unref(offsetLeft) - unref(scrollLeft))
    };
  };

  const getSlots = async () => {
    await nextTick();
    setTimeout(() => {
      slots.value = unref(emptyGroups).map(group => getSlotPosition(group));
    }, 0);
  };

  const onMouseChange = (tableRef, evtName = 'mousemove') => {
    const { scrollBarRef } = tableRef.$refs;
    if (!scrollBarRef) return;
    triggerEvent(scrollBarRef.wrapRef, evtName);
  };

  /**
   * 设置生成组的空占位slot；
   */
  const emptyGroups = computed(() => {
    const groups = Object.keys(groupProps.value);
    if (!isClient || !groups.length || !isMounted.value) return [];
    return groups.map(group => isEmpty(groupProps.value[group]) && group).filter(Boolean);
  });

  onMounted(async () => {
    await nextTick();
    setTimeout(() => {
      isMounted.value = true;
      if (!isClient || !emptyGroups.value.length) return [];
      getSlots();
      useEventListener('resize', getSlots, { passive: true });
      useEventListener('scroll', getSlots, { capture: true, passive: true });
    }, 0);
  });

  return {
    isGroup,
    isMounted,
    slots,
    onMouseChange
  };
};
