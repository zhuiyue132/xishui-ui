import DefaultTheme from 'vitepress/theme';
import 'vitepress-theme-demoblock/dist/theme/styles/index.css';
import { useComponents } from './useComponents';
import components from '../../../packages/xishui-ui/components';
import '../../../packages/theme-chalk/src/index.scss';
import './styles/index.css';

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
