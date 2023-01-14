export const ColumnProps = {
  /**
   * 数字类型的单元格的class名称；
   */
  numberClassName: {
    type: String,
    default: 'xs-table-cell__number'
  },

  /**
   * 文本类型的单元格class属性名
   */
  textClassName: {
    type: String,
    default: 'xs-table-cell__text'
  },

  // 表头是否可以点击
  headerClickable: {
    default: false,
    type: Boolean
  }
};

export const TableProps = {
  /**
   * 加载状态；
   */
  loading: Boolean,
  /**
   * 数据源；
   */
  data: {
    type: Array,
    default: () => []
  },

  /**
   * 列的配置,支持多级表头;
   */
  columns: {
    type: Array,
    default: () => []
  },

  /**
   * 骨架屏渲染行数，默认20，个别特殊的表格，不需要这么多行，所以需要自己传入；
   */
  skeletonRows: {
    type: Number,
    default: 20
  },

  /**
   * 表头吸顶时距离顶部的距离；
   */
  offset: {
    type: Number,
    default: 0
  },

  /**
   * 表头背景色，默认是空；
   */
  themeColor: {
    type: String,
    default: ''
  },

  /**
   * 该表格是否可以吸顶；
   */
  stickyable: {
    type: Boolean,
    default: false
  },

  /**
   * 分页选项，false为不分页；
   */
  pagination: {
    type: [Object, Boolean],
    default: true
  },

  /**
   * 排序
   */
  sort: {
    type: Object,
    default: () => ({ prop: '', order: '' })
  },

  /**
   * 表格筛选, { [prop]: [value] }
   */
  filter: {
    type: Object,
    default: () => ({})
  },

  /**
   * 是否启用斑马纹
   */
  stripe: {
    type: Boolean,
    default: true
  },

  /**
   * 斑马纹的起始行号， 可选值， 0，1；
   */
  stripeIndex: {
    type: [Number],
    default: 0
  },

  /**
   * 是否使用表格内部的排序；
   */
  useInnerSort: {
    type: Boolean,
    default: true
  },

  /**
   * 是否使用内部的筛选；
   */
  useInnerFilter: {
    type: Boolean,
    default: true
  },

  /**
   * 数据变化时是否重置垂直滚动条；
   */
  resetPositionOnDataChange: {
    default: false,
    type: Boolean
  },

  /**
   * 下拉筛选的选项
   * eg: {[prop]: [a,b,c], [prop2]: [a,b,c]}
   */
  filterOptions: {
    type: Object,
    default: () => ({})
  },

  // 声明这些prop字段排序时使用时间排序 ，
  // 默认值 = ['date', 'month', 'onSaleTime', 'calculateTime' ]
  timeProps: {
    type: Array,
    default: () => []
  },

  rowClassName: {
    type: [Function, String],
    default: ''
  },

  cellClassName: {
    type: [Function, String],
    default: ''
  },

  /**
   * 汇总行位置。可选值：top, bottom。
   */
  summaryPosition: {
    type: String,
    default: 'bottom'
  },

  /**
   * 高度相关
   */
  maxHeight: [String, Number],
  height: [String, Number],

  // 引入其他的props
  ...ColumnProps
};

export const Emits = [
  'popoverConfirm',
  'popoverCancel',
  'sortChange',
  'stickyChange',
  'filterChange',
  'currentDataChange',
  'scroll',
  'headerClick'
];
