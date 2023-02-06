import ascFilter from './asc-filter.svg';
import descFilter from './desc-filter.svg';
import filter from './filter.svg';
import normal from './normal.svg';
import asc from './asc.svg';
import desc from './desc.svg';
import sortAsc from './sort-asc.svg';
import sortDesc from './sort-desc.svg';
import sortAscActive from './sort-asc-active.svg';
import sortDescActive from './sort-desc-active.svg';
import caretAsc from './caret-asc.svg';
import caretDesc from './caret-desc.svg';
import caretNoSort from './caret-no-sort.svg';
import arrowWarning from './warning-arrow.svg';
import arrowPositive from './positive-arrow.svg';
import arrowNegitive from './negitive-arrow.svg';
import { TABLE_HEAD_STATUS } from '../config';

export default {
  [TABLE_HEAD_STATUS.normal]: normal,
  [TABLE_HEAD_STATUS.asc]: asc,
  [TABLE_HEAD_STATUS.desc]: desc,
  [TABLE_HEAD_STATUS.ascAndFilter]: ascFilter,
  [TABLE_HEAD_STATUS.descAndFilter]: descFilter,
  [TABLE_HEAD_STATUS.filtered]: filter,
  sortAsc,
  sortDescActive,
  sortAscActive,
  sortDesc,
  [TABLE_HEAD_STATUS.caretAsc]: caretAsc,
  [TABLE_HEAD_STATUS.caretDesc]: caretDesc,
  [TABLE_HEAD_STATUS.caretNoSort]: caretNoSort,
  arrowWarning,
  arrowPositive,
  arrowNegitive
};
