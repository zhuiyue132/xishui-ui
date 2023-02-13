# 主题

## 使用 SCSS

创建 3 个样式文件，比如 `styles/xishui.scss`, `styles/element.scss` 和 `styles/index.scss`。

> 出于 scss 语法特性，不得不拆成 2 个样式，否则会报错。

```scss
/* styles/xishui.scss 只需要重写你需要的即可 */
@forward 'xishui-ui/theme-chalk/src/common/var.scss' with (
  $colors: (
    'primary': (
      'base': green
    )
  )
);
```

```scss
/* styles/element.scss 只需要重写你需要的即可 */
@forward 'element-plus/theme-chalk/src/common/var.scss' with (
  $colors: (
    'primary': (
      'base': green
    )
  )
);
```

尽量使用两个文件的变量内容保持一致（或者统一定义一套变量，在两个文件内分别引入并使用也是可以的）。

```scss
@use './xishui.scss' as *;
@use './element.scss' as *;
```

在 vite.config.js 中添加方式覆盖

```js
import { defineConfig } from 'vite';
import path from 'path';
import { XishuiUiResolver, ElementPlusResolver } from 'unplugin-components-vue/resolvers';
import AutoImport from 'unplugin-auto-import/vite';

// 或者手动引入
// import xishui from "unplugin-xishui-ui/vite";

export default defineConfig({
  resolve: {
    alias: {
      '~/': `${path.resolve(__dirname, 'src')}/`
    }
  },
  plugins: [
    AutoImport({
      resolvers: [XishuiUiResolver({ importStyle: 'sass' })]
    }),
    Components({
      resolvers: [XishuiUiResolver({ importStyle: 'sass' })]
    })
    // 对应上方的 unplugin-xishui-ui/vite 插件
    // xishui({
    //   useSource: true,
    // })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "~/styles/index.scss" as *;`
      }
    }
  }
});
```

## 如果不使用 SCSS

如果你不用 SCSS 开发, 还可以通过 CSS 变量设置。

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
