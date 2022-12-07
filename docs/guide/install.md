# 安装

## 使用包管理器

我们建议您使用包管理器（如 NPM、Yarn 或 pnpm）安装 Xishui Ui，然后您就可以使用打包工具，例如 Vite 或 webpack。

```bash
# 选择一个你喜欢的包管理器

# NPM
$ npm install xishui-ui --save

# Yarn
$ yarn add xishui-ui

# pnpm
$ pnpm install xishui-ui
```

## 浏览器直接引入

直接通过浏览器的 HTML 标签导入，然后就可以使用全局变量 XishuiUI 了

### unpkg

```html
<head>
  <!-- Import style -->
  <link rel="stylesheet" href="//unpkg.com/xishui-ui/dist/index.css" />
  <!-- Import Vue 3 -->
  <script src="//unpkg.com/vue@3"></script>
  <!-- Import component library -->
  <script src="//unpkg.com/xishui-ui"></script>
</head>
```

### jsDelivr

```html
<head>
  <!-- Import style -->
  <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/xishui-ui/dist/index.css" />
  <!-- Import Vue 3 -->
  <script src="//cdn.jsdelivr.net/npm/vue@3"></script>
  <!-- Import component library -->
  <script src="//cdn.jsdelivr.net/npm/xishui-ui"></script>
</head>
```

> TIPS
>
> 我们建议使用 CDN 引入的用户在链接地址上锁定版本，以免将来升级时受到非兼容性更新的影响。

如果是通过包管理器安装，并希望配合打包工具使用，请阅读下一节.
