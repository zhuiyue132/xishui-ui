export const emptyProps = {
  image: {
    type: String,
    default: ''
  },
  size: {
    type: [Number, String],
    default: 360
  },
  description: {
    type: String,
    default: '暂无数据'
  },
  icon: {
    type: String,
    default: ''
  }
};

export const svgs = import.meta.globEager('../svg/*.svg');
