export const Props = {
  name: {
    type: String
  },
  color: {
    type: String
  },
  size: {
    type: [String, Number]
  },
  prefix: {
    type: String,
    default: 'icon-'
  },
  loading: {
    type: Boolean,
    default: false
  }
};
