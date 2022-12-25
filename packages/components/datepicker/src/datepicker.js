import dayjs from 'dayjs';

/**
 * 以下是时间类型的定义
 */
export const DATEPICKER_LAYOUT = {
  day1: '昨天',
  today: '今天',
  day7: '7天',
  day14: '14天',
  day30: '30天',
  date: '日',
  week: '周',
  month: '月',
  year: '年',
  year1: '1年',
  year2: '2年',
  daterange: '自定义',
  lastMonth6: '最近6个月',
  lastMonth12: '最近12个月',
  lastMonth24: '最近24个月',
  lastYear1: '最近一年',
  lastYear2: '最近两年',
  all: '全部'
};
/**
 * 以下这些类型有时间选择面板；
 */
export const HAS_PICKER_TYPE = ['date', 'week', 'month', 'year', 'daterange'];

export const Props = {
  /**
   * 展示的时间类型
   */
  layout: {
    type: Array,
    require: true,
    default: () => Object.keys(DATEPICKER_LAYOUT),
    validator: val => {
      return val.every(item => {
        return Object.keys(DATEPICKER_LAYOUT).includes(item);
      });
    }
  },
  // 当前选中时间，支持vmodel双向绑定；
  modelValue: {
    type: [String, Array]
  },
  // 当前时间类型，支持v-model:type双向绑定；
  type: {
    type: String,
    validator: val => {
      return Object.keys(DATEPICKER_LAYOUT).includes(val);
    }
  },
  /**
   * 默认时间类型
   */
  defaultLayout: {
    type: String,
    default: ''
  },
  /**
   * 默认日期
   */
  defaultDate: {
    type: Array,
    default: () => []
  },
  /**
   * 是否立即触发 change 事件，默认 true
   */
  immediate: {
    type: Boolean,
    default: true
  },
  /**
   * 时间描述文案
   */
  timeLabel: {
    type: String,
    default: '统计时间'
  },
  /**
   * 是否展示时间描述文案
   */
  showTimeLabel: {
    type: Boolean,
    default: true
  },
  /**
   * 日期最后可选择时间，默认昨天;
   */
  limitEndDate: {
    type: String,
    default: dayjs().add(-1, 'day').format('YYYY-MM-DD')
  },
  /**
   * 日期最前可选择时间，如YYYY-MM-DD YYYY/MM/DD，其他类似格式也可，只要dayjs格式化时间方法支持就行;
   */
  limitStartDate: String,
  /**
   * 本年/本月/本周是否可选，如果包含在数组里，则不可选
   */
  currentDisabledType: {
    type: [String, Array],
    default: () => ['year', 'month', 'week']
  },
  /**
   * day7， day14, day30 的时间段中是否包含今天；
   */
  includesToday: Boolean,
  /**
   * 是否禁用
   */
  disabled: Boolean,
  /**
   * 周起始日，默认星期日;
   * [0-6]，周日-周六;
   */
  firstDayOfWeek: {
    type: Number,
    default: 1
  },
  /**
   * 选择时间段时，最大间隔时间，单位为天，大于0生效；
   */
  dateRangeMaxInterval: {
    type: Number,
    default: 0
  },
  // 周月年是否开启时间格式的别名显示；
  aliasEnable: Boolean,
  alias: {
    type: Object,
    default: () => ({})
  },
  // 是否开启快捷选择；
  shortcutsEnable: Boolean,
  // 快捷选项的年份范围，如[2019, 2020]，则只显示2019年和2020年的阴历和阳历快捷选项；如果不传，则默认计算当前年份的前后1年；
  shortcutsYearRange: {
    type: Array,
    default: () => []
  }
};

export const Emits = ['update:type', 'update:modelValue', 'change', 'selectAll'];

/**
 * dayjs 时间对象格式化为时间字符串
 * @param {*} v 时间对象值
 * @param {*} f 格式化字符串
 * @returns
 */
export const format = (v, f = 'YYYY-MM-DD') => dayjs(v).format(f);

/**
 * 今天
 */
export const today = format(dayjs());
/**
 * 昨天
 */
export const yesterday = format(dayjs().subtract(1, 'day'));

/**
 * 时间加法
 * @param {*} date
 * @param {*} count
 * @param {*} unit
 * @returns
 */
export const add = (date = undefined, count = 0, unit = 'day') => {
  if (!date) date = undefined;
  return format(dayjs(date).add(count, unit));
};

/**
 * 时间减法
 * @param {*} date
 * @param {*} count
 * @param {*} unit
 * @returns
 */
export const subtract = (date = today, count = 0, unit = 'day') => {
  if (!date) date = undefined;
  return format(dayjs(date).subtract(count, unit));
};

/**
 * 时间段开始时间取值
 * @param {*} date
 * @param {*} unit
 * @returns
 */
export const startOf = (date = today, unit = 'week') => {
  if (!date) date = undefined;
  return format(dayjs(date).startOf(unit));
};

/**
 * 时间段结束时间取值
 * @param {*} date
 * @param {*} unit
 * @returns
 */
export const endOf = (date = today, unit = 'week') => {
  if (!date) date = undefined;
  return format(dayjs(date).endOf(unit));
};
