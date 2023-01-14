import { defineComponent } from 'vue';
import { isFunction } from '@xishui-ui/utils';

export default defineComponent({
  name: 'XsRenderHelper',
  props: {
    content: {
      type: [String, Number, Boolean, Object, Function],
      default: null
    },
    data: {
      type: Object,
      default: () => ({})
    }
  },
  // eslint-disable-next-line vue/component-api-style
  render: props => {
    const { content, data } = props;
    if (isFunction(content)) {
      return content(data);
    }
    return content;
  }
});
