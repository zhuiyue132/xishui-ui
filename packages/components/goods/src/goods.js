export const defaultProp = {
  name: 'goodsName',
  link: 'goodsLink',
  url: 'goodsUrl'
};

// 默认props
export const Props = {
  data: {
    type: Object,
    required: true
  },
  prop: {
    type: Object,
    default: () => defaultProp
  },
  size: {
    type: [Number],
    default: 40
  },
  rows: {
    type: [Number],
    default: 2
  }
};
