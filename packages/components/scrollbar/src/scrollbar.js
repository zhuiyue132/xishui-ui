import { isNumber } from '@xishui-ui/utils';

export const scrollbarProps = {
  height: {
    type: [String, Number],
    default: ''
  },
  maxHeight: {
    type: [String, Number],
    default: ''
  },
  native: Boolean,
  wrapStyle: {
    type: [String, Object, Array],
    default: ''
  },
  wrapClass: {
    type: [String, Array],
    default: ''
  },
  viewClass: {
    type: [String, Array],
    default: ''
  },
  viewStyle: {
    type: [String, Array, Object],
    default: ''
  },
  noresize: Boolean, // 如果 container 尺寸不会发生变化，最好设置它可以优化性能
  tag: {
    type: String,
    default: 'div'
  },
  always: Boolean,
  minSize: {
    type: Number,
    default: 20
  },
  stickyable: Boolean // 是否开启滚动条粘性吸底，开启后横向滚动条会视口底部固定
};

export const scrollbarEmits = {
  scroll: ({ scrollTop, scrollLeft }) => [scrollTop, scrollLeft].every(isNumber)
};
