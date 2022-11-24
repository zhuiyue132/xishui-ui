import { provideGlobalConfig, useSizeProp } from '@xs-ui/hooks';
import { defineComponent, renderSlot } from 'vue';

export const Props = {
  size: useSizeProp,
  namespace: {
    type: String,
    default: 'xs'
  }
};
const ConfigProvider = defineComponent({
  name: 'XsConfigProvider',
  props: Props,

  setup(props, { slots }) {
    const config = provideGlobalConfig(props);

    return () => renderSlot(slots, 'default', { config: config?.value });
  }
});

export default ConfigProvider;
