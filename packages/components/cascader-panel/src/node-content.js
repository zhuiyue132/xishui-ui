import { defineComponent, h } from 'vue';
import { useNamespace } from '@xishui-ui/hooks';

export default defineComponent({
  name: 'NodeContent',
  setup() {
    const ns = useNamespace('cascader-node');
    return { ns };
  },
  // eslint-disable-next-line vue/component-api-style
  render() {
    const { ns } = this;
    const { node, panel } = this.$parent;
    const { data, label } = node;
    const { renderLabelFn } = panel;
    return h('span', { class: ns.e('label') }, renderLabelFn ? renderLabelFn({ node, data }) : label);
  }
});
