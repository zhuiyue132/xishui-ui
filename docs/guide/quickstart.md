# 快速开始

本节将介绍如何在项目中使用 Xishui Ui。

## 完整引入

如果你对打包后的文件大小不是很在乎，那么使用完整导入会更方便。因为本库依赖了 `element-plus`, 完整引入时会把 `element-plus/theme-chalk/index.css` 全量引入。

更建议你使用按需引入，见下一章节。

```js
import { createApp } from 'vue';
import XSUI from 'xishui-ui';
import 'xishui-ui/dist/index.css';
import App from './App.vue';

const app = createApp(App);
app.use(XSUI);
app.mount('#app');
```

## 按需引入

### 自动导入

您需要使用额外的插件来导入要使用的组件。

```bash
npm install -D unplugin-components-vue unplugin-auto-import
```

然后把下列代码插入到你的 Vite 或 Webpack 的配置文件中

```js
import { defineConfig } from 'vite';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-components-vue/vite';
import { XishuiUiResolver, ElementPlusResolver } from 'unplugin-components-vue/resolvers';

export default defineConfig({
  // ...
  plugins: [
    // ...
    AutoImport({
      resolvers: [XishuiUiResolver() /** 如果你的项目用了多个组件库 ElementPlusResolver() */]
    }),
    Components({
      resolvers: [XishuiUiResolver() /** 如果你的项目用了多个组件库 ElementPlusResolver() */]
    })
  ]
});
```

### 手动引入

```bash
npm i unplugin-xishui-ui
```

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
// vite.config.js
import { defineConfig } from 'vite';
import xishui from 'unplugin-xishui-ui/vite';

export default defineConfig({
  // ...
  plugins: [xishui()]
});
```

::: danger
注意：无论你使用何种方式的按需加载，指令类和使用方法调用的组件，如 MessageBox 等需要手动引入样式,如：

```js
<script>import "xishui-ui/es/packages/components/message-box/style/css";</script>
```

:::
