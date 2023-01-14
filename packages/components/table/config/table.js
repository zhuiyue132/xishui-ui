/*
 * @Author: chenghao
 * @Date: 2022-03-29 10:38:11
 * @Last Modified by: chenghao
 * @Last Modified time: 2022-08-20 22:48:06
 * @Desc: table 组件的默认配置项
 */

import dayjs from 'dayjs';
import { reactive, unref } from 'vue';
import { plainTextFilter, multiPlainTextFilter, timeRangeFilter, numberRangeFilter } from '../utils';

/**
 * 过滤面板默认;
 */
export const HEADER_FILTER_CONFIG = {
  inputCount: 1,
  placeholder: '请输入',
  placeholderAlign: 'left',
  cancelBtnText: '清除',
  confirmBtnText: '确定',
  showCancelBtn: true, // 默认不显示清除按钮;
  sortSubTitle: '',
  filterSubTitle: '',
  suffixLabel: '',
  type: 'input',
  multiple: false
};

/**
 * 单个column的默认配置;
 */
export const TABLE_COLUMN_ITEM = {
  filterable: false,
  sortable: false,
  align: 'left'
};

export const GROUPNAME_PEFIX = 'xs-table-group__';

/**
 * 工作台组件表格定位
 * @type {number}
 */
export const WORKTABLE_TABLE_OFFSET = 124;

/**
 * 把输入框的绑定的model塞到filter内补
 */
export const setInputModel = (filter = {}) => {
  let { inputCount = 1, type = 'input' } = filter;
  if (type === 'time' || type === 'number') {
    inputCount = 2;
  }
  filter.models = new Array(inputCount).fill('');
  return { ...filter, inputCount };
};

/**
 * 补充一些column的默认字段；
 * @param {*} columns
 * @returns
 */
export const getColumn = (columns, $filters, level = 0, color = '', group = '') => {
  // const isGroup = columns.map(({ children }) => children).filter(Boolean).length > 0;
  const _filters = unref($filters);

  const methods = {
    input: plainTextFilter,
    number: numberRangeFilter,
    select: multiPlainTextFilter,
    time: timeRangeFilter
  };

  return columns.map(column => {
    const { filter = {}, children = [], prop = '', className = '' } = column;

    let { filterable, sortable } = column;

    if (!prop || children?.length > 0) {
      // 连prop都没有，你排什么筛什么？？
      // 只有叶子节点才能排序和筛选；
      filterable = false;
      sortable = false;
    }
    // 颜色设置
    column.background = column.background ?? color;

    if (level !== 0) {
      // 如果不是第一层，group继承上级的group；
      column.group = group;
    }

    // 对于group的处理做class的标记；
    if (column.group) {
      column.className = `${GROUPNAME_PEFIX}${column.group} ${className}`;
    }

    if (children?.length) {
      column.children = getColumn(column.children, $filters, level + 1, column.background, column.group);
    }

    if ((filterable || sortable) && prop) {
      const newFilter = setInputModel({
        ...HEADER_FILTER_CONFIG,
        ...filter,
        sortable // 把sortable也放进filter内来，方便于筛选面板使用；
      });

      if (!column.filterMethod) {
        column.filterMethod = methods[newFilter.type] || plainTextFilter;
        if (newFilter.multiple && newFilter.type === 'select') {
          column.filterMethod = multiPlainTextFilter;
        }
      }

      // 如果有默认筛选；
      if (_filters[prop]) {
        if (Array.isArray(_filters[prop])) {
          newFilter.models = [..._filters[prop], '', '']
            .filter(item => !isNaN(Number(item)))
            .slice(0, newFilter.inputCount);
        } else {
          newFilter.models[0] = _filters[prop];
        }
      }

      return reactive({
        ...TABLE_COLUMN_ITEM,
        ...column,
        filter: newFilter
      });
    }
    return reactive({ ...TABLE_COLUMN_ITEM, ...column, filterable, sortable });
  });
};

/**
 * 表头与筛选面板的关联状态定义;
 */
export const TABLE_HEAD_STATUS = {
  normal: 'normal', // 正常状态，箭头向下
  asc: 'ascending', // 仅升序状态；
  desc: 'descending', // 仅降序状态
  ascAndFilter: 'ascAndFilter', // 升序且筛选状态；
  descAndFilter: 'descAndFilter', // 降序且筛选状态；
  filtered: 'filtered', // 仅筛选状态;
  caretAsc: 'caretAsc', // 升序状态，箭头向上
  caretDesc: 'caretDesc', // 降序状态，箭头向下
  caretNoSort: 'caretNoSort' // 无排序状态，箭头向下
};

/**
 * 表格组件内部分页组件的默认配置
 */
export const DEFAULT_PAGINATION = {
  position: 'flex-end', // 分页组件默认居右 flex-start | center | flex-end；
  pageSizes: [10, 25, 50], // 默认的可选分页数量
  pageSize: 25, // 默认的每页条数
  layout: 'total, sizes, prev, pager, next, jumper' // 分页组件默认显示的控件;
};

// 时间排序
const timeSorter = (prop, order) => {
  return (a, b) => {
    let { [prop]: a1 } = a;
    let { [prop]: b1 } = b;

    if (order === 'ascending') {
      return dayjs(a1).valueOf() - dayjs(b1).valueOf();
    } else if (order === 'descending') {
      return dayjs(b1).valueOf() - dayjs(a1).valueOf();
    }
    return 0;
  };
};

const TIME_COLUMN_PROPS = ['date'];

/**
 * 表格全局排序；
 * @param {*} prop 按哪个字段排序；
 * @param {*} order ascending | descending ;
 * @param {*} secondaryKey 次要排序辅助字段， 当两值相等时，继续按照次要字段排序;
 * @returns
 */
export const sorter = (prop, order, timeProps = []) => {
  if ([...TIME_COLUMN_PROPS, ...timeProps].includes(prop)) return timeSorter(prop, order);
  return (a, b) => {
    if (!prop) return 0;
    let { [prop]: v1 } = a;
    let { [prop]: v2 } = b;

    const inf = order === 'descending' ? -Infinity : Infinity;
    const invalid = [null, undefined, NaN, '--', ''];
    v1 = invalid.includes(v1) ? inf : v1;
    v2 = invalid.includes(v2) ? inf : v2;
    if (order === 'ascending') {
      return v1 - v2;
    } else if (order === 'descending') {
      return v2 - v1;
    }
    return 0;
  };
};
