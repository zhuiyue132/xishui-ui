# Icon 图标

> 组件库内并不提供图标，只是 iconfont 的 svg 图标封装态。支持且仅支持 iconfont。

## 基本使用

> 注意：使用前需要先在元素的根容器 index.html 内引入 iconfont 提供的 js;

![kLpc9e](https://picture.zhuiyue.vip:444/images/2022/12/10/kLpc9e.png)

cdn 引入或本地引入均可。

:::demo

```vue
<template>
  <xs-icon name="close" />
</template>
```

:::

## 修改颜色和大小

:::demo

```vue
<template>
  <xs-icon name="close" color="red" :size="20" />
  <xs-icon name="close" color="green" :size="30" />
  <xs-icon name="close" color="blue" :size="45" />
</template>
```

:::

> 自带颜色的 svg 图标无法通过 color 属性更改颜色。

## 旋转 icon

:::demo

```vue
<template>
  <xs-icon name="email" color="red" :size="20" />
  <xs-icon name="email" color="red" :size="20" loading />
  <xs-icon name="email" color="green" :size="30" loading />
  <xs-icon name="email" color="blue" :size="45" loading />
</template>
```

:::

## 一个项目内存在多个 iconfont 图标库时

`prefix` 的值为图标库中图标的前缀，一般同一个图标库只有一个前缀。如：`svg-icon-close` 和 `svg-icon-right` 的 prefix 是 `svg-icon-`;

`prefix` 的默认值为 `icon-`;

> 总之就是 prefix + name 是一个完整的 图标名称;

:::demo

```vue
<template>
  <xs-icon name="enterpriseSituation" size="100" />
  <xs-icon prefix="svg-icon-" name="TableSortUp" size="100"></xs-icon>
  <xs-icon prefix="work-icon-" name="shentuku-xian" size="100"></xs-icon>
</template>
```

:::
