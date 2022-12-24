<template>
  <el-config-provider :locale="zhCn">
    <div :class="[ns.b(), ns.is('disabled', _disabled)]">
      <div :class="[ns.e('label')]">
        <slot name="label">
          <span>{{ _timeLabel }}</span>
        </slot>
      </div>

      <ul :class="[ns.e('content')]">
        <li
          v-for="item in layout"
          :key="item"
          :class="[ns.e('item'), ns.m(item), ns.is('active', item === currentType)]"
          @click="handleTypeClick(item)"
        >
          <span>
            <slot :name="item">{{ layoutNames[item] }}</slot>
          </span>

          <el-date-picker
            v-if="HAS_PICKER_TYPE.includes(item)"
            :ref="setItemRef(item)"
            :model-value="pickerModelValue(item)"
            :type="item"
            :disabled-date="disabledDate[item]"
            :popper-class="[
              `popover-${item}`,
              ns.is(`interval--${dateRangeMaxInterval}`, dateRangeMaxInterval > 0 && item === 'daterange')
            ]"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
            @visible-change="onTogglePane(item, $event)"
            @update:model-value="onTimeChange(item, $event)"
            @calendar-change="onPickDateRange"
          />
        </li>
      </ul>
    </div>
  </el-config-provider>
</template>
<script>
  import { ElDatePicker, ElConfigProvider } from 'element-plus';
  import 'element-plus/lib/components/date-picker/style/css';
  export default {
    name: 'XsDatePicker',
    components: {
      ElDatePicker,
      ElConfigProvider
    }
  };
</script>
<script setup>
  import { computed, toRefs, watch, ref, nextTick } from 'vue';
  import { Props, Emits, DATEPICKER_LAYOUT, HAS_PICKER_TYPE } from './datepicker';
  import { useNamespace, useDisabled } from '@xishui-ui/hooks';
  import { isString } from '@xishui-ui/utils';
  import dayjs from 'dayjs';
  import locale from 'dayjs/locale/zh-cn';
  import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
  import useCalcDate from './calc-date.js';
  const props = defineProps(Props);
  const emits = defineEmits(Emits);

  const ns = useNamespace('date-picker');
  const _disabled = useDisabled();

  /**
   * 设置el-date-picker的ref
   */
  const itemRefs = {};
  const setItemRef = type => el => {
    if (el) {
      itemRefs[type] = el;
    }
  };

  /**
   * 每周第一天的传入并计算；
   */
  const setFirstDayOfWeek = () => {
    const { firstDayOfWeek } = toRefs(props);
    locale.weekStart = firstDayOfWeek.value;
    dayjs.locale(locale, null, true);
  };
  watch(() => props.firstDayOfWeek, setFirstDayOfWeek, { immediate: true });
  // 当前展开的面板类型；
  const expandType = ref('');
  /**
   * 合并时间类型的名称;
   */
  const layoutNames = computed(() => {
    let names = { ...DATEPICKER_LAYOUT };
    const { aliasEnable, alias } = props;
    if (aliasEnable) {
      names = { ...names, ...alias };
    }
    return names;
  });

  // 选中的时间类型计算
  const currentType = computed({
    get() {
      return props.type || props.layout[0] || '';
    },
    set(val) {
      emits('update:type', val);
    }
  });

  // 是否初始化过了;
  const isInited = ref(false);

  // 选中时间计算
  const currentModelValue = computed({
    get() {
      const { modelValue } = props;
      if (isString(modelValue)) {
        return [modelValue];
      }
      return modelValue;
    },
    set(val) {
      const value = isString(val) ? [val] : val;
      emits('update:modelValue', isString(val) ? [val] : val);
      if (!isInited.value) return;
      emits('change', {
        type: currentType.value,
        value
      });
    }
  });

  // 绑定单个时间的面板需要绑的值是时间范围的右侧时间；
  const pickerModelValue = computed(() => {
    return type => {
      if (type === 'daterange') return currentModelValue.value;
      const [start, end] = currentModelValue.value;
      return end || start;
    };
  });

  const { getDate, formatDate, disabledDate, onPickDateRange } = useCalcDate(props);

  // 默认时间初始化；
  const setDefault = () => {
    currentModelValue.value = props.defaultDate?.length ? [...props.defaultDate] : getDate(currentType.value);
    if (isInited.value || props.immediate) {
      emits('change', {
        type: currentType.value,
        value: currentModelValue.value
      });
    }
    isInited.value = true;
  };
  setDefault();

  /**
   * 时间类型点击事件
   * @param {*} type
   */
  const handleTypeClick = async type => {
    if (!HAS_PICKER_TYPE.includes(type)) {
      if (currentType.value === type) return;
      currentType.value = type;
      if (type === 'all') {
        // 选择的全部类型时，是触发select-all事件，需要外部设置时间;
        // 因为时间组件内并不能获取到外部业务的全部时间范围；
        emits('select-all');
      } else {
        currentModelValue.value = getDate(type);
      }
    } else {
      await nextTick();
      const item = itemRefs[type];
      item && item.focus();
    }
  };

  /**
   * 时间面板展开/收起
   * @param {*} type 时间类型
   * @param {*} visible 是否展开
   */
  const onTogglePane = (type, visible) => {
    expandType.value = visible ? type : '';
  };

  const onTimeChange = (type, val) => {
    currentModelValue.value = getDate(type, val);
    currentType.value = type;
  };
  const _timeLabel = computed(() => {
    const { timeLabel, showTimeLabel } = props;
    if (showTimeLabel) {
      return `( ${timeLabel ? timeLabel + ':' : ''} ${formatDate(currentModelValue.value)} )`;
    }
    return null;
  });
</script>
