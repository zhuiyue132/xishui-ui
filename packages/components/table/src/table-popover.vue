<!-- table 的排序、筛选弹窗面板 -->
<template>
  <span :key="column.prop || column.label" @click.stop>
    <el-popover
      ref="popoverRef"
      :visible="visible"
      :show-arrow="false"
      :persistent="false"
      :popper-class="[ns.b()]"
      :disabled="column.sortable && !column.filterable"
      trigger="click"
      @show="onShow"
      @hide="onHide"
      @before-enter="onBeforeEnter"
    >
      <template #reference>
        <div :class="[ns.e('trigger'), triggerClass]" @click="clickTrigger">
          <slot name="default" :state="state"></slot>
        </div>
      </template>

      <div v-on-click-outside="clickOut" :class="[ns.e('content')]">
        <template v-if="column.sortable">
          <div :class="ns.e('cell')">
            <div :class="ns.em('cell', 'title')">
              <span>{{ column.filter?.sortTitle || '排序' }}</span>
              <span>{{ column.filter?.sortSubTitle }}</span>
            </div>
            <div :class="[ns.em('cell', 'content'), ns.em('cell', 'sort')]">
              <xs-button :class="[ns.is('active', isSortBtnActive('ascending'))]" @click="onSortClick('ascending')">
                <img :src="svgs.sortAsc" />
                <img :src="svgs.sortAscActive" />
                <span>升序</span>
              </xs-button>

              <xs-button :class="[ns.is('active', isSortBtnActive('descending'))]" @click="onSortClick('descending')">
                <img :src="svgs.sortDesc" />
                <img :src="svgs.sortDescActive" />
                <span>降序</span>
              </xs-button>
            </div>
          </div>
        </template>

        <template v-if="column.filterable">
          <div :class="ns.e('cell')">
            <div :class="ns.em('cell', 'title')">
              <span>{{ column.filter?.filterTitle || '筛选' }}</span>
              <span>{{ column.filter?.filterSubTitle }}</span>
            </div>
            <div :class="[ns.em('cell', 'content'), ns.em('cell', 'filter')]">
              <!-- 时间格式筛选 -->
              <div v-if="column.filter?.type === 'time'" class="type-time">
                <el-date-picker
                  :model-value="models"
                  :editable="false"
                  type="daterange"
                  value-format="YYYY-MM-DD"
                  clearable
                  range-separator="~"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  class="table-filter__time"
                  popper-class="table-filter__popper"
                  :disabled-date="calcDisabledDate"
                  @update:model-value="onDateChange"
                />
              </div>

              <!-- 下拉框形式的筛选 -->
              <div v-if="column.filter?.type === 'select'" class="type-select">
                <el-select
                  ref="selectRef"
                  :model-value="isMultiSelect ? models : models[0]"
                  filterable
                  clearable
                  :multiple="isMultiSelect"
                  :placeholder="`请选择${column.label}`"
                  class="table-filter__select"
                  popper-class="table-filter__popper"
                  @update:model-value="onSelectChange"
                  @clear="onCancelClick"
                >
                  <template #empty>
                    <xs-empty size="48" icon="no-data-small" />
                  </template>

                  <el-option v-for="_option in _options" :key="_option" :label="_option" :value="_option" />
                </el-select>
              </div>

              <!-- 输入框筛选和数字筛选 -->
              <div v-if="['input', 'number'].includes(column.filter?.type)" class="type-input">
                <template v-for="index in column.filter.inputCount" :key="`input-${index}`">
                  <div class="search-input-item">
                    <span v-if="column.filter?.suffixLabel">
                      {{ column.filter.suffixLabel }}
                    </span>
                    <!-- 存在 suffixLabel时，不显示placeholder -->
                    <input
                      :ref="setInputRef"
                      v-model="models[index - 1]"
                      :placeholder="column.filter?.suffixLabel ? '' : column.filter?.placeholder"
                      :style="{
                        '--xs-placeholder-align': column.filter?.placeholderAlign
                      }"
                      type="text"
                    />
                  </div>

                  <b v-if="index !== column.filter.inputCount">-</b>
                </template>
              </div>
            </div>
          </div>

          <div v-if="_btnVisible" :class="ns.e('button')">
            <xs-button v-if="column.filter.showCancelBtn" @click="onCancelClick">
              {{ column.filter.cancelBtnText }}
            </xs-button>
            <xs-button type="primary" @click="onConfirmClick">
              {{ column.filter.confirmBtnText }}
            </xs-button>
          </div>
        </template>
      </div>
    </el-popover>
  </span>
</template>
<script>
  import { ElPopover, ElDatePicker, ElSelect, ElOption } from 'element-plus';
  import XsButton from '@xishui-ui/components/button';
  import XsEmpty from '@xishui-ui/components/empty';

  export default {
    name: 'XsTablePopover',
    components: {
      ElPopover,
      ElDatePicker,
      ElSelect,
      ElOption,
      XsButton,
      XsEmpty
    }
  };
</script>
<script setup>
  import { ref, computed, inject, toRaw, nextTick } from 'vue';
  import { debounce } from '@xishui-ui/utils';
  import { ClickOutside as vOnClickOutside } from '@xishui-ui/directives';
  import { useNamespace } from '@xishui-ui/hooks';
  import { TABLE_HEAD_STATUS } from '../config';
  import { valueValidator } from '../utils';
  import { tableSortContextKey, tableFilterContextKey, tableDataContextKey } from '@xishui-ui/token';
  import svgs from '../svg';

  const ns = useNamespace('table-popover');
  const props = defineProps({
    column: {
      type: Object,
      required: true
    }
  });
  const emit = defineEmits(['confirm', 'cancel', 'sort']);

  /**
   * popover实例绑定;
   */
  const popoverRef = ref();
  const selectRef = ref();

  /**
   * 设置input的ref;
   */
  const inputRefs = ref([]);
  const setInputRef = el => {
    if (!el) return;
    inputRefs.value.push(el);
  };

  /**
   * 上游注入的数据
   */
  const $sort = inject(tableSortContextKey);
  const $filters = inject(tableFilterContextKey);
  const $data = inject(tableDataContextKey);

  // options 用于下拉框的筛选，自动从数据中提取去重；
  const _options = computed(() => {
    const { filter, prop } = props.column;
    if (!filter) return [];
    const { type } = filter;
    if (type !== 'select') return [];

    const data = item[prop];
    if (!data?.includes?.(',')) return [...new Set($data.value.map(item => item[prop]).filter(Boolean))];
    return [
      ...new Set(
        $data.value
          .map(item => item[prop]?.split?.(','))
          .flat(Infinity)
          .filter(Boolean)
      )
    ];
  });

  /**
   * 手动控制 popover 是否显示
   */
  const visible = ref(false);
  const uuid = ref(Math.random().toString(16).slice(2));
  const triggerClass = ref('trigger__' + uuid.value);

  /**
   * 点击 trigger
   */
  const clickTrigger = debounce(() => {
    visible.value = !visible.value;
  }, 250);

  /**
   * 点击 popover 外部
   */
  const clickOut = debounce(e => {
    if (ignoreClick(e)) return;
    visible.value = false;
  }, 250);

  // 是否多选
  const isMultiSelect = computed(() => {
    return props.column.filter?.type === 'select' && props.column?.filter?.multiple;
  });

  /**
   * 是否忽略点击
   * @param {*} e
   */
  const ignoreClick = e => {
    // 点击时 popover 未显示
    // 点击的是 popover 容器
    // 点击的是选择器下拉选项
    // 点击的是自身 popover 触发项
    return !visible.value || isClickPopoverContainer(e) || isClickSelectOption(e) || isClickSelfTrigger(e);
  };
  // 点击的是选择器下拉选项
  const isClickSelectOption = e => e?.path?.some?.(item => item.classList?.contains?.('table-filter__popper'));

  // 点击的是 popover 容器
  const isClickPopoverContainer = e => e?.path?.some?.(item => item.classList?.contains?.(ns.b()));

  // 点击本身 trigger
  const isClickSelfTrigger = e => e?.path?.some?.(item => item.classList?.contains?.(triggerClass.value));

  const getInitModels = () => {
    const value = [...($filters.value[props.column.prop] ?? [])];
    return isMultiSelect.value ? (Array.isArray(value) ? value.filter(Boolean) : []) : value;
  };

  const models = ref(getInitModels());
  /**
   * 清空输入框；
   */
  const emptyValues = () => {
    models.value = isMultiSelect.value ? [] : new Array(models.value.length).fill('');
  };

  const onDateChange = value => {
    if (value) {
      models.value = value;
    } else {
      emptyValues();
    }
    onConfirmClick();
  };

  const onSelectChange = async val => {
    console.log(val);

    if (!props.column?.filter?.multiple) {
      models.value[0] = val;
      onConfirmClick();
    } else {
      models.value = val;
      if (!val?.length) {
        selectRef.value?.blur?.();
        await nextTick();
        onCancelClick();
      }
    }
  };

  /**
   * 时间选择器禁用时间计算
   */
  const calcDisabledDate = date => date.getTime() > Date.now();

  /**
   * 按钮显隐判断
   */
  const _btnVisible = computed(() => {
    const { filter = {} } = props.column;
    if (!filter) return false;
    const { type, multiple } = filter;
    return !(type === 'time' || (type === 'select' && !multiple));
  });

  /**
   * popover 状态；
   * 用来指示下拉箭头的状态；
   * normal = 正常箭头向下;  asc = 升序；desc: 降序；ascAndFilter：升序且筛选；descAndFilter: 降序且筛选；filtered：筛选；
   */

  const state = computed(() => {
    const {
      column: { prop, filterable, sortable }
    } = props;

    const { prop: sortKey, order: sortOrder } = $sort.value;
    const { ascAndFilter, descAndFilter, filtered, asc, desc, normal, caretAsc, caretDesc, caretNoSort } =
      TABLE_HEAD_STATUS;

    const isSort = sortKey === prop;
    const isAsc = isSort && sortOrder === 'ascending';
    const hasFiltered = filterable && $filters.value?.[prop];
    let state = normal;
    const onlySort = sortable && !filterable;
    if (hasFiltered) {
      if (isSort) {
        state = isAsc ? ascAndFilter : descAndFilter;
      } else {
        state = filtered;
      }
    } else {
      if (isSort) {
        if (onlySort) {
          state = isAsc ? caretAsc : caretDesc;
        } else {
          state = isAsc ? asc : desc;
        }
      } else {
        state = onlySort ? caretNoSort : normal;
      }
    }

    return state;
  });

  /**
   * 判断排序按钮的状态；
   * @param {*} order
   */
  const isSortBtnActive = computed(() => {
    const {
      column: { prop }
    } = props;
    const { prop: sortKey, order: sortOrder } = $sort.value;
    return order => {
      if (prop === sortKey && order === sortOrder) return 'is-active';
      return '';
    };
  });

  /**
   * popover关闭时判断状态;
   * @param {*} clearable 是否情况选中的值
   */
  const onHide = (clearable = false) => {
    visible.value = false;
    popoverRef.value?.hide?.();
    if (clearable) {
      emptyValues();
    }
  };

  /**
   * 第一次打开筛选时输入框聚焦;
   */
  const onShow = async () => {
    inputRefs.value?.[0]?.focus?.();
    selectRef.value?.toggleMenu?.();
  };

  const onBeforeEnter = () => {
    visible.value = true;
    models.value = getInitModels();
  };

  /**
   * 确定按钮点击，更新输入框的值并隐藏popover;
   */
  const onConfirmClick = debounce(() => {
    let canContinue = true;
    if (models.value.length > 1 && !['select', 'time'].includes(props.column.filter?.type)) {
      canContinue = valueValidator(toRaw(models.value), props.column.prop);
    }
    if (!canContinue) return;

    emit('confirm', toRaw(models.value), props.column.prop, props.column);
    //可能未render
    onHide();
  }, 100);

  /**
   * 清除按钮点击,清空输入框，并隐藏popover；
   */
  const onCancelClick = debounce(() => {
    emit('cancel', props.column.prop, props.column);
    onHide(true);
  }, 50);

  /**
   * 排序点击
   */
  const onSortClick = debounce(order => {
    const { prop } = props.column;
    emit('sort', { prop, order });
    onHide();
  }, 50);

  const clear = () => {
    emptyValues();
    emit('cancel', props.column.prop, props.column);
  };

  defineExpose({
    clear
  });
</script>
