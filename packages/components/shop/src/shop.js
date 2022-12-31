export const defaultProp = {
  name: 'shopName',
  link: 'shopLink',
  platform: 'platform'
};

// 默认props
export const Props = {
  data: {
    type: Object,
    required: true
  },
  src: {
    type: String,
    default: ''
  },
  prop: {
    type: Object,
    default: () => defaultProp
  },
  size: {
    type: [Number],
    default: 16
  }
};
