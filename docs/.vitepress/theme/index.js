import DefaultTheme from 'vitepress/theme';
import 'vitepress-theme-demoblock/dist/theme/styles/index.css';
import { useComponents } from './useComponents';
import './styles/index.css';
import components from '../../../packages/xishui-ui/components';
import '../../../packages/theme-chalk/src/index.scss';

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx);
    useComponents(ctx.app);
    components.forEach(component => {
      ctx.app.component(component.name, component);
    });
  }
};
