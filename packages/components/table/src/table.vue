<template>
  <el-config-provider :locale="zhCn">
    <div
      :class="[
        ns.b(),
        ns.e('wrapper'),
        $attrs.class || '',
        ns.is('sticky-table', stickyable),
        ns.is('group-table', isGroup)
      ]"
      :style="_styleVar"
    >
      <div ref="reference" class="reference reference-top"></div>
      <el-table
        ref="tableRef"
        v-bind="$attrs"
        :data="loading ? [] : _data"
        :default-sort="{}"
        :stripe="false"
        :row-class-name="_rowClassName"
        :cell-class-name="_cellClassName"
        :class="[
          ns.m('content'),
          ns.m(tableId),
          stripe && 'el-table--striped',
          ns.is('summary-top', summaryPosition === 'top'),
          ns.is('empty', isEmpty),
          ns.is('sticky', isSticky)
        ]"
        :max-height="maxHeight"
        :height="height"
        table-layout="fixed"
      >
        <xs-table-column
          v-for="(column, index) in _columns"
          :key="`${column.label}-${index}`"
          :number-class-name="numberClassName"
          :text-class-name="textClassName"
          :header-clickable="headerClickable"
          :column="column"
        />
        <div id="boxsss"></div>

        <template #empty>
          <el-skeleton v-if="loading" animated :class="[ns.e('skeleton')]">
            <template #template>
              <el-skeleton-item
                v-for="item in skeletonRows"
                :key="item"
                :class="[ns.e('skeleton-item'), ns.em('skeleton-item', item)]"
              />
            </template>
          </el-skeleton>
          <slot v-else name="empty">
            <xs-empty />
          </slot>
        </template>
      </el-table>

      <template v-if="isGroup && isMounted">
        <div
          v-for="item in emptySlots"
          :key="item.name"
          :class="[ns.em('group', 'empty')]"
          :style="{ ...item }"
          @mousemove="onMouseChange(tableRef)"
          @mouseleave="onMouseChange(tableRef, 'mouseleave')"
        >
          <slot :name="item.name">
            <xs-empty size="200" />
          </slot>
        </div>
      </template>

      <div ref="referenceBottom" class="reference reference-bottom"></div>

      <div v-if="pagination && !isEmpty & !loading" :class="[ns.e('page')]" :style="{ justifyContent: position }">
        <slot name="paginationLeft"></slot>
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          background
          v-bind="{
            total,
            layout,
            pageSizes
          }"
        />
        <slot name="paginationRight"></slot>
      </div>
    </div>
  </el-config-provider>
</template>

<script>
  import { ElTable, ElConfigProvider, ElPagination, ElSkeleton, ElSkeletonItem } from 'element-plus';
  import XsEmpty from '@xishui-ui/components/empty';
  import XsTableColumn from './table-column.vue';

  export default {
    name: 'XsTable',
    inheritAttrs: false,
    components: {
      ElTable,
      ElConfigProvider,
      XsTableColumn,
      ElPagination,
      ElSkeleton,
      ElSkeletonItem,
      XsEmpty
    }
  };
</script>

<script setup>
  import { ref, toRefs, useAttrs, computed, watch, provide, toRaw, useSlots, onMounted, nextTick, unref } from 'vue';
  import { useElementBounding, isClient } from '@vueuse/core';
  import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
  import { useNamespace, useId } from '@xishui-ui/hooks';
  import { isFunction, isObject, toNumber, isNil } from '@xishui-ui/utils';
  import {
    tableSortContextKey,
    tableFilterContextKey,
    tableEmitContextKey,
    tableFilterOptionsContextKey,
    tableSlotsContextKey,
    tablColumnsContextKey,
    tableDataContextKey
  } from '@xishui-ui/token';
  import {
    useTableScroll,
    useTableFilter,
    useEventProxy,
    useTableSort,
    useTablePagination,
    useTableSticky,
    useTablePosition,
    useTableGroup
  } from '../hooks';
  import { TableProps, Emits, getColumn } from '../config';

  const ns = useNamespace('table');
  const tableId = useId();
  const tableRef = ref();
  const $attrs = useAttrs();
  const props = defineProps(TableProps);
  const emits = defineEmits(Emits);
  const $sort = ref({ order: 'descending', ...props.sort });
  const $filter = ref({ ...props.filter });
  const $filterOptions = computed(() => ({ ...props.filterOptions }));
  const $slots = useSlots();

  /* 设置一些样式变量
  -------------------------- */
  const _styleVar = computed(() => {
    const { offset, stickyable } = props;
    return {
      '--xs-table-theme-color': `${props.themeColor}`,
      '--xs-table-sticky-offset': `${unref(stickyable) ? unref(offset) : 0}px`,
      '--xs-table-position': `${unref(stickyable) ? 'sticky' : 'relative'}`
    };
  });

  onMounted(async () => {
    if (!isClient) return;
    await nextTick();
    setTimeout(() => {
      const { height: _headerHeight } = useElementBounding(tableRef.value.$refs.tableHeaderRef);
      let _footerHeight = ref(0);
      if (tableRef.value.$refs.footerWrapper) {
        const { height } = useElementBounding(tableRef.value.$refs.footerWrapper);
        _footerHeight.value = height.value;
      }

      const parent = tableRef.value.$el.parentNode;
      parent.style.setProperty('--xs-table-header-height', `${_headerHeight.value}px`);
      parent.style.setProperty('--xs-table-footer-height', `${_footerHeight.value}px`);
    }, 0);
  });

  /* 响应外部的sort和filter
  -------------------------- */
  watch(
    () => props.sort,
    val => {
      if (isObject(toRaw(val))) {
        $sort.value = { order: 'descending', ...toRaw(val) };
      }
    },
    { deep: true }
  );

  watch(
    () => props.filter,
    val => {
      if (isObject(toRaw(val))) {
        $filter.value = { ...toRaw(val) };
      }
    },
    { deep: true, immediate: true }
  );

  /* 表头
  -------------------------- */
  const _columns = computed(() => {
    const { columns } = props;
    return getColumn(columns, $filter);
  });

  /* 纯叶子节点的表头；
  -------------------------- */
  const _columnsFlat = computed(() => {
    const getColumnsLeaf = columns => {
      const leaf = [];
      columns.forEach(column => {
        if (column.children?.length) {
          leaf.push(...getColumnsLeaf(column.children));
        } else {
          leaf.push(column);
        }
      });
      return leaf;
    };

    return getColumnsLeaf(unref(_columns));
  });

  /* 数据源重算
  -------------------------- */
  const _source = computed(() => {
    return toNumber(props.data || []);
  });

  /* 向下级组件提供数据
  -------------------------- */
  provide(tableSortContextKey, $sort);
  provide(tableFilterContextKey, $filter);
  provide(tableFilterOptionsContextKey, $filterOptions);
  provide(tableSlotsContextKey, $slots);
  provide(tablColumnsContextKey, _columns);
  provide(tableDataContextKey, _source);

  /* 表格横向滚动（因为业务内的表格基本是跟随页面滚动的，即没有区域滚动，所以此处不考虑垂直滚动的相关参数）
  -------------------------- */
  const { scrollLeft } = useTableScroll(tableRef, emits);

  /* 表格分组；
  -------------------------- */
  const { isGroup, slots: emptySlots, isMounted, onMouseChange } = useTableGroup(_columns, _source, scrollLeft);

  /* 表格筛选；
  -------------------------- */
  const { data, clearFilter, onPopoverConfirm, onPopoverCancel } = useTableFilter(_source, _columns, $filter, props);
  const { $emits } = useEventProxy(props, emits, $sort, $filter, onPopoverConfirm, onPopoverCancel);
  provide(tableEmitContextKey, $emits);

  /* 表格排序；
  -------------------------- */
  const { data: sortData } = useTableSort(data, $sort, props);

  /* 表格分页；
  -------------------------- */
  const {
    currentPage,
    total,
    pageSize,
    pageSizes,
    layout,
    currentData: _data,
    position
  } = useTablePagination(sortData, props);

  // 本页数据变化时，需要通知外部；
  watch(_data, val => {
    $emits('currentDataChange', { data: val });
  });

  /* 表格吸顶；
  -------------------------- */
  const reference = ref();
  const referenceBottom = ref();
  const isSticky = ref(false);
  useTableSticky({ reference, referenceBottom, tableRef, isSticky }, props, emits);
  useTablePosition(reference, _data, props);

  /* 是否为空表格
  -------------------------- */
  const isEmpty = computed(() => {
    return props.data?.length === 0 || _data.value.length === 0;
  });

  /* 斑马纹计算
  -------------------------- */
  const { stripeIndex, stripe } = toRefs(props);
  const _rowClassName = args => {
    const { rowIndex } = args;
    const { rowClassName } = props;
    let className = isFunction(rowClassName) ? rowClassName(args) : rowClassName;
    if (stripe.value && rowIndex % 2 === Number(stripeIndex.value)) {
      className += ' el-table__row--striped';
    }
    return className;
  };

  /* 单元格样式计算
  -------------------------- */
  const _cellClassName = args => {
    const { cellClassName } = props;
    let className = isFunction(cellClassName) ? cellClassName(args) : cellClassName;
    const { column, row, columnIndex } = args;
    if (isGroup.value && isNil(row[column.property])) {
      className += ' xs-table__cell--nil';
    }
    if (
      isGroup.value &&
      columnIndex &&
      _columnsFlat.value[columnIndex + 1] &&
      _columnsFlat.value[columnIndex + 1].group !== _columnsFlat.value[columnIndex].group
    ) {
      className += ' xs-table__cell--nil-last';
    }
    return className;
  };

  defineExpose({
    tableRef,
    tableId,
    clearFilter
  });
</script>
