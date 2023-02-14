import { computed } from 'vue';
import { noop } from '@xishui-ui/utils';
import { ExpandTrigger } from './node';

export const CommonProps = {
  modelValue: [Number, String, Array],
  options: {
    type: Array,
    default: () => []
  },
  props: {
    type: Object,
    default: () => ({})
  }
};

export const DefaultProps = {
  expandTrigger: ExpandTrigger.CLICK,
  multiple: false,
  checkStrictly: false, // whether all nodes can be selected
  emitPath: true, // wether to emit an array of all levels value in which node is located
  lazy: false,
  lazyLoad: noop,
  value: 'value',
  label: 'label',
  children: 'children',
  leaf: 'leaf',
  disabled: 'disabled',
  hoverThreshold: 500
};

export const useCascaderConfig = props => {
  return computed(() => ({
    ...DefaultProps,
    ...props.props
  }));
};
