import { createApp } from 'vue';
import App from './App.vue';

import '@xishui-ui/theme-chalk/src/index.scss';
import XSUI from '@xishui-ui/components';
const app = createApp(App);
app.use(XSUI);
app.mount('#app');
