# Tabs 标签页

分隔内容上有关联但属于不同类别的数据集合

## 基础用法

基础的、简洁的标签页。

:::demo

```vue
<template>
  <xs-tabs v-model="tab" :tab-list="list" />
  <div>{{ tab }}</div>
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
```

:::

## 有禁用项时

:::demo

```vue
<template>
  <xs-tabs v-model="tab" :tab-list="list" />
  <div>{{ tab }}</div>
</template>
<script>
  import { ref } from 'vue';
  export default {
    setup: () => {
      // 当然你也可以每一项都是Object
      const list = ['推广分析', { name: 'sku', label: 'SKU分析', disabled: true }, '地域分析', '时段分析'];

      const tab = ref('推广分析');
      return {
        list,
        tab
      };
    }
  };
</script>
```

:::

## 自定义 TabPane 内容

可以通过具名插槽来实现自定义标签页的内容,

:::demo

```vue
<template>
  <xs-tabs v-model="tab" :tab-list="list">
    <template #sku> <span style="color:red">SKU分析</span> </template>
  </xs-tabs>
  <div>{{ tab }}</div>
</template>
<script>
  import { ref } from 'vue';
  export default {
    setup: () => {
      const list = ['推广分析', { name: 'sku', label: 'SKU分析' }, '地域分析', '时段分析'];

      const tab = ref('推广分析');
      return {
        list,
        tab
      };
    }
  };
</script>
```

:::

## 属性

| 参数                | 说明                                                                             | 类型                                | 可选值                                       | 默认值 |
| ------------------- | -------------------------------------------------------------------------------- | ----------------------------------- | -------------------------------------------- | ------ |
| tabList             | 标签页合集                                                                       | array                               | ['tab1'] = [{ name: 'tab1', label: 'tab1' }] |        |
| model-value/v-model | 绑定值，选中选项卡的 name                                                        | string/number                       |                                              |        |
| before-leave        | 切换标签之前的钩子函数， 若返回 false 或者返回被 reject 的 Promise，则阻止切换。 | Function(activeName, oldActiveName) |                                              | true   |
| prop                | 指定选项的值为选项对象的某个属性值                                               | '{ label: 'label', name: 'name' }'  |                                              |        |

## 插槽

| 参数           | 说明                                   | 类型 | 可选值 | 默认值 |
| -------------- | -------------------------------------- | ---- | ------ | ------ |
| [tabPane.name] | 根据 tabPane 的 name 属性生成动态 slot |      |        |        |

## tabPane 属性

| 参数     | 说明                   | 类型          | 可选值 | 默认值 |
| -------- | ---------------------- | ------------- | ------ | ------ |
| label    | 标签页上显示的文案     | string        |        |        |
| name     | 绑定值，标签页唯一属性 | string/number |        |        |
| disabled | 标签页是否禁用         | boolean       |        | false  |
