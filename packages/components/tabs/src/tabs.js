export const Props = {
  tabList: { type: Array, default: () => [], required: true },
  modelValue: { type: [String, Number], required: true },
  prop: {
    type: Object,
    default: () => ({ label: 'label', name: 'name' })
  },
  beforeLeave: {
    type: Function,
    default: () => true
  }
};

export const Emits = ['tab-change', 'update:modelValue'];
