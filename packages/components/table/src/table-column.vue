<template>
  <el-table-column v-bind="_column" :class-name="`${ns.b()} ${_columnClass(column)}`">
    <!-- 表头的header slot 声明 -->
    <template #header>
      <div
        :class="ns.e('header')"
        :style="{ justifyContent: _align(column), '--xs-table-column-color': column.background }"
      >
        <span class="custom-header" @click.stop="onLabelClick">
          <xs-render-helper v-if="column.slotLabel" :data="{ column }" :content="$slots[column.slotLabel]" />

          <template v-else-if="column.renderLabel">
            <xs-render-helper :content="column.renderLabel({ ...column })" />
          </template>
          <template v-else>
            {{ column.label }}
          </template>
        </span>

        <template v-if="column.sortable || column.filterable">
          <xs-table-popover :column="column" @confirm="onConfirm" @cancel="onCancel" @sort="onSort">
            <template #default="{ state }">
              <img :src="svgs[state]" class="status-icon" @click="onReferenceClick" />
            </template>
          </xs-table-popover>
        </template>
      </div>
    </template>

    <!-- 多级表头支持 -->
    <template v-if="column.children?.length" #default>
      <xs-table-column
        v-for="(columnChild, index) in column.children"
        :key="index"
        :number-class-name="numberClassName"
        :text-class-name="textClassName"
        :column="columnChild"
      />
    </template>

    <!-- <template v-else-if="column.type === 'singleSelect'" #default="{ row, $index }"> // TODO: 表格单选 </template> -->

    <!-- 单元格的cell slot 声明 -->
    <template v-else-if="column.slot" #default="{ row, $index }">
      <xs-render-helper
        :data="{ column, row: row, rows: $data, columns: $columns, $index }"
        :content="$slots[column.slot]"
      />
    </template>

    <!-- 如果单元格的配置内有render函数，依惯例，slot的优先级高于render函数 -->
    <template v-else-if="column.render" #default="{ row, $index }">
      <xs-render-helper :content="column.render({ column, row, rows: $data, columns: $columns, $index })" />
    </template>
  </el-table-column>
</template>

<script>
  import { ElTableColumn } from 'element-plus';
  import XsRenderHelper from '@xishui-ui/components/render-helper';
  import XsTablePopover from './table-popover.vue';

  export default {
    name: 'XsTableColumn',
    components: {
      ElTableColumn,
      XsRenderHelper,
      XsTablePopover
    }
  };
</script>

<script setup>
  import { computed, toRefs, toRaw, inject } from 'vue';
  import { useNamespace } from '@xishui-ui/hooks';
  import { ColumnProps } from '../config';
  import { deepClone } from '@xishui-ui/utils';
  import svgs from '../svg';
  import {
    tableEmitContextKey,
    tableSlotsContextKey,
    tablColumnsContextKey,
    tableDataContextKey,
    tableSortContextKey
  } from '@xishui-ui/token';

  const ns = useNamespace('table-column');
  const props = defineProps({
    column: {
      type: Object,
      required: true
    },
    ...ColumnProps
  });

  const { numberClassName, textClassName } = toRefs(props);

  const $emits = inject(tableEmitContextKey);
  const $slots = inject(tableSlotsContextKey);
  const $columns = inject(tablColumnsContextKey);
  const $data = inject(tableDataContextKey);
  const $sort = inject(tableSortContextKey);

  /**
   * dom 不能接收children 的属性，所以需要手动删除一下；
   */
  const _column = computed(() => {
    const columnRaw = deepClone(toRaw(props.column));
    delete columnRaw.children;
    return columnRaw;
  });

  const _columnClass = computed(() => {
    return column => {
      const classArr = [];
      classArr.push(column.isNumberCell ? numberClassName.value : textClassName.value);
      if (column.className) classArr.push(column.className);
      return classArr.join(' ');
    };
  });

  const _align = computed(() => {
    return ({ align = 'left' }) => {
      if (align === 'left') return 'flex-start';
      else if (align === 'right') return 'flex-end';
      return 'center';
    };
  });

  const _isOnlySort = computed(() => {
    const { sortable, filterable } = props.column;
    return sortable && !filterable;
  });

  const onConfirm = (value, prop, column) => {
    $emits('popoverConfirm', { value, prop, column });
  };

  const onCancel = (prop, column) => {
    $emits('popoverCancel', { prop, column });
  };

  const onSort = ({ prop, order }) => {
    $emits('sortChange', { prop, order });
  };

  const onLabelClick = () => {
    const { prop } = props.column;
    if (_isOnlySort.value) {
      const { prop: sortKey, order } = $sort.value;
      const isAsc = sortKey && order === 'ascending';
      onSort({ prop, order: isAsc ? 'descending' : 'ascending' });
    }
    $emits('headerClick', { column: props.column, prop });
  };

  const onReferenceClick = () => {
    if (!_isOnlySort.value) return;
    onLabelClick();
  };
</script>
