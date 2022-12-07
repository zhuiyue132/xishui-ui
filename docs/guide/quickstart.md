# 快速开始

本节将介绍如何在项目中使用 Xishui Ui。

## 用法

### 完整引入

如果你对打包后的文件大小不是很在乎，那么使用完整导入会更方便。

```js
import { createApp } from 'vue';
import XSUI from 'xishui-ui';
import 'xishui-ui/dist/index.css';
import App from './App.vue';

const app = createApp(App);
app.use(XSUI);
app.mount('#app');
```

### 按需引入

需要借助插件 [unplugin-element-plus](https://github.com/element-plus/unplugin-element-plus/blob/main/README.zh-CN.md) 完成手动按需引入的工作。

```html
<template>
  <xs-button>I am ElButton</xs-button>
</template>
<script>
  import { XsButton } from 'xishui-ui';
  export default {
    components: { XsButton }
  };
</script>
```

```js
// vite.config.js， 其他打包器参考 unplugin-element-plus 的文档；
import { defineConfig } from 'vite';
import Element from 'unplugin-element-plus/vite';

export default defineConfig({
  // ...
  plugins: [element({ lib: 'xishui-ui', prefix: 'Xs' })]
});
```
