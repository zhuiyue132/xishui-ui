import { createApp } from 'vue';
import App from './App.vue';

import '@xs-ui/theme-chalk/src/index.scss';
import XSUI from '@xs-ui/components';

const app = createApp(App);
app.use(XSUI);
app.mount('#app');
