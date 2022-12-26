import { base10Colors } from '@xishui-ui/config';

export const colors = [...base10Colors].slice(0, 10);

export const Props = {
  name: {
    type: String,
    default: ''
  },
  count: {
    type: Number,
    default: 1
  },
  from: {
    type: String,
    default: 'start'
  },
  // 必须传入的数量为10个颜色;
  colors: {
    type: Array,
    default: () => colors
  }
};
