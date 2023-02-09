export const defaultProp = {
  name: 'goodsName',
  link: 'goodsLink',
  url: 'goodsUrl',
  id: 'goodsId'
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
    type: Number,
    default: 24
  },
  rows: {
    type: Number,
    default: 1
  },
  popoverDisabled: Boolean,
  idVisible: {
    type: Boolean,
    default: true
  }
};
