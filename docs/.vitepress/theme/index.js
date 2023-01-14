import DefaultTheme from 'vitepress/theme';
import 'vitepress-theme-demoblock/dist/theme/styles/index.css';
import { useComponents } from './useComponents';
import '../../../packages/theme-chalk/src/index.scss';
import './styles/index.css';
import XSUI from '../../../packages/xishui-ui/index';

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx);
    useComponents(ctx.app);
    // if (inBrowser) {
    ctx.app.use(XSUI);
    // }
  }
};
