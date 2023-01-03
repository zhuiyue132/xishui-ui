# Empty 空状态

## 基础用法

:::demo

```vue
<template>
  <xs-empty description="暂无相关数据" />
</template>
```

:::

## 自定义图片

通过设置 image 属性传入图片 URL。

:::demo

```vue
<template>
  <xs-empty
    image="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
    description="暂无相关数据"
  />
</template>
```

:::

## 尺寸定义

使用 size 来控制图片大小。

:::demo

```vue
<template>
  <xs-empty size="480" description="暂无相关数据" />
</template>
```

:::

## 底部内容

使用默认插槽可在底部插入内容。

:::demo

```vue
<template>
  <xs-empty icon="folder" description="请新建一个文件夹">
    <xs-button type="primary">新建文件夹</xs-button>
  </xs-empty>
</template>
```

:::

## 其他一些内置的图

有且仅有这些，如果一下不满足你的需求，你可以找 UI 给你出，或者你自己传自定义的 image。

:::demo

```vue
<template>
  <xs-empty description="暂无相关数据" />
  <xs-empty icon="no-data-small" size="80" description="暂无相关数据" />
  <xs-empty icon="404" description="你访问的页面不存在" />
  <xs-empty icon="question" />
  <xs-empty icon="question-small" size="80" />

  <xs-empty icon="group" description="暂未设置自定义分组" />
  <xs-empty icon="lock" description="暂无权限" />
  <xs-empty icon="lock-small" size="80" description="暂无权限" />

  <xs-empty icon="no-message" description="暂无新消息" />
  <xs-empty icon="no-message-small" size="80" description="暂无新消息" />

  <xs-empty icon="folder" description="请新建一个文件夹" />
  <xs-empty icon="pie" />
  <xs-empty icon="bar" />
  <xs-empty icon="app" description="此类目下已经没有子类目" />
  <xs-empty icon="basket" description="暂未配置商品" />
  <xs-empty icon="box" description="该店铺在所选日期范围内没有上新商品" />
  <xs-empty icon="car" description="暂未设置运费模板规则" />
  <xs-empty icon="no-wifi" description="哎呀，网络出错了…" />
  <xs-empty icon="no-wifi-small" size="80" description="暂无网络" />

  <xs-empty icon="calculator" description="暂未设置分利计算规则" />
</template>
```

:::

## API

### 属性

| 参数        | 说明           | 类型          | 可选值 | 默认值   |
| ----------- | -------------- | ------------- | ------ | -------- |
| icon        | 显示的内置图片 | string        |        | no-data  |
| image       | 图片地址       | string        |        |          |
| size        | 图片大小(宽度) | string/number |        | 360      |
| description | 文案描述       | string        |        | 暂无数据 |

### 插槽

| 参数        | 说明           | 类型 | 可选值 | 默认值 |
| ----------- | -------------- | ---- | ------ | ------ |
| --          | 自定义底部内容 |      |        |        |
| image       | 自定义图片     |      |        |        |
| description | 自定义描述     |      |        |        |
