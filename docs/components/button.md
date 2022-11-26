# Button 按钮

常用的操作按钮。

## 基础用法

基础的按钮用法。

使用 `type`、`plain`、`round` 和 `circle` 属性来定义 Button 的样式。

:::demo

```vue
<template>
  <xs-button>默认按钮</xs-button>
  <xs-button type="primary">主要按钮</xs-button>
  <xs-button type="success">成功按钮</xs-button>
  <xs-button type="info">信息按钮</xs-button>
  <xs-button type="warning">警告按钮</xs-button>
  <xs-button type="danger">危险按钮</xs-button>
  <!-- <xs-button type="text">文字按钮</xs-button> -->
  <!-- <xs-button type="link">Link按钮</xs-button> -->
  <br />
  <xs-button plain>默认按钮</xs-button>
  <xs-button plain type="primary">主要按钮</xs-button>
  <xs-button plain type="success">成功按钮</xs-button>
  <xs-button plain type="info">信息按钮</xs-button>
  <xs-button plain type="warning">警告按钮</xs-button>
  <xs-button plain type="danger">危险按钮</xs-button>

  <br />
  <xs-button round>默认按钮</xs-button>
  <xs-button round type="primary">主要按钮</xs-button>
  <xs-button round type="success">成功按钮</xs-button>
  <xs-button round type="info">信息按钮</xs-button>
  <xs-button round type="warning">警告按钮</xs-button>
  <xs-button round type="danger">危险按钮</xs-button>

  <br />
  <xs-button circle>溪</xs-button>
  <xs-button circle type="primary">水</xs-button>
  <xs-button circle type="success">网</xs-button>
  <xs-button circle type="info">络</xs-button>
  <xs-button circle type="warning">组</xs-button>
  <xs-button circle type="danger">件</xs-button>
</template>
```

:::

## 禁用状态

你可以使用 `disabled` 属性来定义按钮是否被禁用。

使用 `disabled` 属性来控制按钮是否为禁用状态。 该属性接受一个 `Boolean` 类型的值。

:::demo

```vue
<template>
  <xs-button disabled>默认按钮</xs-button>
  <xs-button type="primary" disabled>主要按钮</xs-button>
  <xs-button type="success" disabled>成功按钮</xs-button>
  <xs-button type="info" disabled>信息按钮</xs-button>
  <xs-button type="warning" disabled>警告按钮</xs-button>
  <xs-button type="danger" disabled>危险按钮</xs-button>

  <br />
  <xs-button plain disabled>默认按钮</xs-button>
  <xs-button plain type="primary" disabled>主要按钮</xs-button>
  <xs-button plain type="success" disabled>成功按钮</xs-button>
  <xs-button plain type="info" disabled>信息按钮</xs-button>
  <xs-button plain type="warning" disabled>警告按钮</xs-button>
  <xs-button plain type="danger" disabled>危险按钮</xs-button>
</template>
```

:::

## 文字按钮

没有边框和背景色的按钮
:::demo

```vue
<template>
  <xs-button type="text">文字按钮</xs-button>
  <xs-button type="text" disabled>文字按钮禁用</xs-button>
</template>
```

:::

## 链接按钮

:::demo

```vue
<template>
  <xs-button type="link">链接按钮</xs-button>
  <xs-button type="link" disabled>链接按钮禁用</xs-button>
</template>
```

:::

## 调整尺寸

内部一共有三个预设尺寸，`large`, `default`, `small`

:::demo

```vue
<template>
  <xs-button type="primary" size="small">主要按钮</xs-button>
  <xs-button type="primary">主要按钮</xs-button>
  <xs-button type="primary" size="large">主要按钮</xs-button>

  <xs-button type="primary" plain size="small">主要按钮</xs-button>
  <xs-button type="primary" plain>主要按钮</xs-button>
  <xs-button type="primary" plain size="large">主要按钮</xs-button>

  <br />

  <xs-button type="primary" round size="small">主要按钮</xs-button>
  <xs-button type="primary" round>主要按钮</xs-button>
  <xs-button type="primary" round size="large">主要按钮</xs-button>

  <xs-button type="primary" circle size="small">难</xs-button>
  <xs-button type="primary" circle>难</xs-button>
  <xs-button type="primary" circle size="large">难</xs-button>
</template>
```

:::

## ButtonApi

| 参数        | 说明               | 类型    | 可选值                                          | 默认值  |
| ----------- | ------------------ | ------- | ----------------------------------------------- | ------- |
| size        | 尺寸               | string  | large/small/default                             | default |
| type        | 类型               | string  | primary / success/warning/info/danger/text/link | -       |
| disabled    | 按钮是否为禁用状态 | boolean | —                                               | false   |
| round       | 是否为圆角按钮     | boolean | —                                               | false   |
| circle      | 是否为圆形按钮     | boolean | —                                               | false   |
| native-type | 原生 type 属性     | string  | button/submit/reset                             | button  |
| disabled    | 按钮是否为禁用状态 | boolean | —                                               | false   |
