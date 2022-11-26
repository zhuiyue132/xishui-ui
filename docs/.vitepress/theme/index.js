import DefaultTheme from 'vitepress/theme';
import 'vitepress-theme-demoblock/dist/theme/styles/index.css';
import { useComponents } from './useComponents';
import './styles/index.css';
import { XsButton, XsConfigProvider } from '../../../packages/components/components';
import '../../../packages/theme-chalk/src/index.scss';

console.log(11, XsButton, XsConfigProvider);

export default {
  ...DefaultTheme,
  enhanceApp(ctx) {
    DefaultTheme.enhanceApp(ctx);
    useComponents(ctx.app);
    ctx.app.component(`XsButton`, XsButton);
    ctx.app.component(XsConfigProvider.name, XsConfigProvider);
  }
};
