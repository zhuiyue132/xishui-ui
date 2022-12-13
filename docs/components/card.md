# Card 卡片

将信息聚合在卡片容器中展示。以下 demo 将和 Tabs 组件结合演示。

## 基本用法

:::demo

```vue
<template>
  <xs-card header="商品总览">
    <xs-tabs v-model="tab" :tab-list="list" />
  </xs-card>
</template>

<script>
  import { ref } from 'vue';
  export default {
    setup: () => {
      const list = ['总览数据', '流量分析', '搜索分析', '标题优化'];
      const tab = ref('总览数据');
      return {
        list,
        tab
      };
    }
  };
</script>
<style>
  .demo-card {
    background: #f6f6f6;
  }
</style>
```

:::

## 没有底边框的卡片

:::demo

```vue
<template>
  <xs-card header="商品总览" :border="false">
    <xs-tabs v-model="tab" :tab-list="list" />
  </xs-card>
</template>

<script>
  import { ref } from 'vue';
  export default {
    setup: () => {
      const list = ['总览数据', '流量分析', '搜索分析', '标题优化'];
      const tab = ref('总览数据');
      return {
        list,
        tab
      };
    }
  };
</script>
<style>
  .demo-card {
    background: #f6f6f6;
  }
</style>
```

:::

## 带插槽的卡片

:::demo

```vue
<template>
  <xs-card header="商品总览">
    <template #extra>
      <xs-button style="margin:0">更多数据</xs-button>
    </template>

    <template #sub-header>
      <span style="color:#ccc;font-size:14px">只统计一段时间的数据</span>
    </template>
    <xs-tabs v-model="tab" :tab-list="list" />
  </xs-card>
</template>

<script>
  import { ref } from 'vue';
  export default {
    setup: () => {
      const list = ['总览数据', '流量分析', '搜索分析', '标题优化'];
      const tab = ref('总览数据');
      return {
        list,
        tab
      };
    }
  };
</script>
<style>
  .demo-card {
    background: #f6f6f6;
  }
</style>
```

:::

## API

| 参数   | 说明               | 类型    | 可选值 | 默认值 |
| ------ | ------------------ | ------- | ------ | ------ |
| border | 是否添加底部的边框 | Boolean |        | true   |
| header | 标题文案           | string  |        |        |

## 插槽

| 插槽       | 说明               |
| ---------- | ------------------ |
| header     | 标题               |
| sub-header | 副标题             |
| extra      | 右上角区域         |
| default    | 默认插槽，内容区域 |
