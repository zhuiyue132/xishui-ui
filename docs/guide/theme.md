# 主题

创建一个样式文件，比如 `styles/variable.scss`;

```scss
// styles/variable.scss

/* 只需要重写你需要的即可 */
@forward 'xishui-ui/theme-chalk/src/common/var.scss' with (
  $colors: (
    'primary': (
      'base': green
    )
  )
);
```

在 vite.config.js 中添加方式覆盖

```js
import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "~/styles/variable.scss" as *;`
      }
    }
  }
});
```

如果你不用 scss 开发, 还可以通过 CSS 变量设置。

就像这样：

```css
:root {
  --xs-color-primary: green;
}
```

如果你只想自定义一个特定的组件，只需为某些组件单独添加内联样式。

```html
<xs-button style="--xs-color-primary: red">Tag</xs-button>
```

出于性能原因，更加推荐你在类名下添加自定义 css 变量，而不是在全局的 :root 下。

```css
.custom-class {
  --xs-color-primary: red;
}
```

更优雅的 css 变量使用方式 [https://vueuse.org/core/useCssVar/](https://vueuse.org/core/useCssVar/)。
