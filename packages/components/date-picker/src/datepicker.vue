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
            :popper-class="
              [
                `popover-${item}`,
                ns.is(`interval--${dateRangeMaxInterval}`, dateRangeMaxInterval > 0 && item === 'daterange')
              ].join(' ')
            "
            :shortcuts="item === 'daterange' ? shortcuts : []"
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
  import useShortcuts from './shortcuts';

  const props = defineProps(Props);
  const emits = defineEmits(Emits);
  const ns = useNamespace('date-picker');
  const _disabled = useDisabled();
  // ??????????????????????????????
  const expandType = ref('');

  const { shortcuts } = useShortcuts(props);

  /**
   * ??????el-date-picker???ref
   */
  const itemRefs = {};
  const setItemRef = type => el => {
    if (el) {
      itemRefs[type] = el;
    }
  };

  /**
   * ????????????????????????????????????
   */
  const setFirstDayOfWeek = () => {
    const { firstDayOfWeek } = toRefs(props);
    locale.weekStart = firstDayOfWeek.value;
    dayjs.locale(locale, null, true);
  };
  watch(() => props.firstDayOfWeek, setFirstDayOfWeek, { immediate: true });

  /**
   * ???????????????????????????;
   */
  const layoutNames = computed(() => {
    let names = { ...DATEPICKER_LAYOUT };
    const { aliasEnable, alias } = props;
    if (aliasEnable) {
      names = { ...names, ...alias };
    }
    return names;
  });

  // ???????????????????????????
  const currentType = computed({
    get() {
      return props.type || props.layout[0] || '';
    },
    set(val) {
      emits('update:type', val);
    }
  });

  // ?????????????????????;
  const isInited = ref(false);

  // ??????????????????
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

  // ???????????????????????????????????????????????????????????????????????????
  const pickerModelValue = computed(() => {
    return type => {
      if (type === 'daterange') return currentModelValue.value;
      const [start, end] = currentModelValue.value;
      return end || start;
    };
  });

  const { getDate, formatDate, disabledDate, onPickDateRange } = useCalcDate(props);

  // ????????????????????????
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
   * ????????????????????????
   * @param {*} type
   */
  const handleTypeClick = async type => {
    if (!HAS_PICKER_TYPE.includes(type)) {
      if (currentType.value === type) return;
      currentType.value = type;
      if (type === 'all') {
        // ????????????????????????????????????select-all?????????????????????????????????;
        // ???????????????????????????????????????????????????????????????????????????
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
   * ??????????????????/??????
   * @param {*} type ????????????
   * @param {*} visible ????????????
   */
  const onTogglePane = (type, visible) => {
    expandType.value = visible ? type : '';
  };

  const onTimeChange = (type, val) => {
    console.log(2, type, val);
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
