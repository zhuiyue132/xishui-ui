import { createApp } from 'vue';
import App from './App.vue';

import '../packages/theme-chalk/src/index.scss';
import XSUI from '../packages/xishui-ui/index.js';
const app = createApp(App);
app.use(XSUI);
app.mount('#app');
