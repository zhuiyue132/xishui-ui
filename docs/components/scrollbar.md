# Scrollbar 滚动条

用于替换浏览器原生滚动条。兼容 `element-plus` 的 [el-scrollbar](https://element-plus.gitee.io/zh-CN/component/scrollbar.html) 的所有用法。

## 基础用法

通过 `height` 属性设置滚动条高度，若不设置则根据父容器高度自适应。

:::demo

```vue
<template>
  <xs-scrollbar height="400px">
    <p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{ item }}</p>
  </xs-scrollbar>
</template>

<style>
  .scrollbar-demo-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    background: var(--xs-color-primary-light-9);
    color: var(--xs-color-primary);
  }
</style>
```

:::

## 横向滚动

当元素宽度大于滚动条宽度时，会显示横向滚动条。

:::demo

```vue
<template>
  <xs-scrollbar>
    <div class="scrollbar-flex-content">
      <p v-for="item in 50" :key="item" class="scrollbar-demo-item2">
        {{ item }}
      </p>
    </div>
  </-scrollbar>
</template>

<style scoped>
.scrollbar-flex-content {
  display: flex;
}
.scrollbar-demo-item2 {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 50px;
  margin: 10px !important;
  text-align: center;
  border-radius: 4px;
  background: var(--xs-color-danger-light-9);
  color: var(--xs-color-danger);
}
</style>


```

:::

## 最大高度

当元素高度超过最大高度，才会显示滚动条。

:::demo

```vue
<template>
  <xs-button @click="add">Add Item</xs-button>
  <xs-button @click="onDelete">Delete Item</xs-button>
  <xs-scrollbar max-height="400px">
    <p v-for="item in count" :key="item" class="scrollbar-demo-item3">
      {{ item }}
    </p>
  </-scrollbar>
</template>

<script >
import { ref } from 'vue'
export default {
  setup: () => {
    const count = ref(3)

    const add = () => {
      count.value++
    }
    const onDelete = () => {
      if (count.value > 0) {
        count.value--
      }
    }
    return {
      count,
      add,onDelete
    };
  }
};
</script>

<style>
.scrollbar-demo-item3 {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  text-align: center;
  border-radius: 4px;
  background: var(--xs-color-primary-light-9);
  color: var(--xs-color-primary);
}
</style>

```

:::

## 手动滚动

通过使用 `setScrollTop` 与 `setScrollLeft` 方法，可以手动控制滚动条滚动。

:::demo

```vue
<template>
  <xs-scrollbar ref="scrollbarRef" height="400px" always @scroll="scroll">
    <div ref="innerRef">
      <p v-for="item in 20" :key="item" class="scrollbar-demo-item4">
        {{ item }}
      </p>
    </div>
  </xs-scrollbar>

  <br />

  <xs-button @click="onClick(20)">+20</xs-button>
  <xs-button @click="onClick(-20)">-20</xs-button>
</template>

<script>
  import { onMounted, ref } from 'vue';

  export default {
    setup() {
      const max = ref(0);
      const value = ref(0);
      const innerRef = ref();
      const scrollbarRef = ref();

      onMounted(() => {
        max.value = innerRef.value.clientHeight - 380;
      });

      const inputSlider = value => {
        scrollbarRef.value.setScrollTop(value);
      };
      const scroll = ({ scrollTop }) => {
        value.value = scrollTop;
      };
      const formatTooltip = value => {
        return `${value} px`;
      };

      const onClick = val => {
        if (val < 0 && value.value <= 0) return;

        value.value += val;

        inputSlider(value.value);
      };

      return {
        max,
        innerRef,
        scrollbarRef,
        scroll,
        formatTooltip,
        onClick
      };
    }
  };
</script>

<style scoped>
  .scrollbar-demo-item4 {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    background: var(--xs-color-primary-light-9);
    color: var(--xs-color-primary);
  }
  .el-slider {
    margin-top: 20px;
  }
</style>
```

:::

## 横向滚动条吸底

使用 `position: sticky` 实现，使用有一定的前置条件，如果没生效，检查下祖先元素是否存在 `overflow:hidden`。

参考文章：[https://www.zhangxinxu.com/wordpress/2018/12/css-position-sticky/](https://www.zhangxinxu.com/wordpress/2018/12/css-position-sticky/)

**_注意看下面示例的横向滚动条_**

:::demo

```vue
<template>
  <xs-scrollbar always stickyable>
    <div style="width: 500px">
      <p v-for="item in 50" :key="item" class="scrollbar-demo-item5">{{ item }}</p>
    </div>
  </xs-scrollbar>
</template>

<style scoped>
  .demo-scrollbar .source {
    overflow: unset !important;
  }
  /* * {
    overflow: unset !important;
  } */
  .scrollbar-demo-item5 {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 800px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    background: var(--xs-color-primary-light-9);
    color: var(--xs-color-primary);
  }
</style>
```

:::

## API

去看 [el-scrollbar](https://element-plus.gitee.io/zh-CN/component/scrollbar.html#属性)的吧，懒得写了。他的 api 全部兼容.

## 新增 api

| 参数       | 说明                               | 类型    | 可选值                                                     | 默认值 |
| ---------- | ---------------------------------- | ------- | ---------------------------------------------------------- | ------ |
| stickyable | 底部的横向滚动条是否开启吸底效果。 | Boolean | 适用场景：用户横向滚动时需要滚动到底部才可以看到横向滚动条 | false  |
