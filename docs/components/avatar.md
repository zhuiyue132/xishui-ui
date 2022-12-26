# Avatar 头像

基于`el-avatar`做了一些功能扩展.

## 基础用法

使用 shape 和 size 属性来设置 Avatar 的形状和大小。size 可以为数字。

:::demo

```vue
<template>
  <xs-avatar size="small" :src="circleUrl" />
  <xs-avatar :src="circleUrl" />
  <xs-avatar :size="50" :src="circleUrl" />
  <xs-avatar size="large" :src="circleUrl" />
  <xs-avatar shape="square" size="small" :src="squareUrl" />
  <xs-avatar shape="square" :src="squareUrl" />
  <xs-avatar shape="square" :size="50" :src="squareUrl" />
  <xs-avatar shape="square" size="large" :src="squareUrl" />
</template>
<script>
  import { ref } from 'vue';
  export default {
    setup: () => {
      const circleUrl = 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';
      const squareUrl = 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png';

      return {
        circleUrl,
        squareUrl
      };
    }
  };
</script>
<style>
  .el-avatar + .el-avatar {
    margin-left: 16px;
  }
</style>
```

:::

## 展示类型

支持使用图片，图标或者和自定义内容 作为 Avatar。

:::demo

```vue
<template>
  <xs-avatar :size="50" :src="circleUrl" />
  <xs-avatar :size="50">追月</xs-avatar>
</template>
<script>
  import { ref } from 'vue';
  export default {
    setup: () => {
      const circleUrl = 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png';

      return {
        circleUrl
      };
    }
  };
</script>
```

:::

## 文字头像

真实的文字头像，支持显示多个字符，支持正向和反向的文字截取, 支持自定义头像背景色。

::: warning

`src` 和 `name` 同时存在时，优先显示`src`.

:::

::: tip
背景色的计算规则： color = colors[ (所有字符的 charCode 之和) % colors.length ]。

默认的 colors 列表内只有 10 个颜色，如果想要文字头像更加绚烂一点，那你需要多传入一些颜色进去哦。
:::

:::demo

```vue
<template>
  <xs-avatar :size="50" name="乔布斯"></xs-avatar>
  <xs-avatar :size="50" name="马云"></xs-avatar>
  <xs-avatar :size="50" name="马化腾"></xs-avatar>
  <xs-avatar :size="50" name="李彦宏"></xs-avatar>
  <xs-avatar :size="50" name="张一鸣"></xs-avatar>
  <br />
  <xs-avatar :size="50" :count="2" name="乔布斯"></xs-avatar>
  <xs-avatar :size="50" :count="2" name="马云"></xs-avatar>
  <xs-avatar :size="50" :count="2" name="马化腾"></xs-avatar>
  <xs-avatar :size="50" :count="2" name="李彦宏"></xs-avatar>
  <xs-avatar :size="50" :count="2" name="张一鸣"></xs-avatar>
  <br />
  <xs-avatar :size="50" :count="2" from="end" name="乔布斯"></xs-avatar>
  <xs-avatar :size="50" :count="2" from="end" name="马云"></xs-avatar>
  <xs-avatar :size="50" :count="2" from="end" name="马化腾"></xs-avatar>
  <xs-avatar :size="50" :count="2" from="end" name="李彦宏"></xs-avatar>
  <xs-avatar :size="50" :count="2" from="end" name="张一鸣"></xs-avatar>
</template>
```

:::

## 回退行为

图片加载失败时的回退行为

:::demo

```vue
<template>
  <xs-avatar :size="60" src="https://empty" @error="errorHandler">
    <img
      src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
    />
  </xl-avatar>
</template>
<script>
  import { ref } from 'vue';
  export default {
    setup: () => {
      return {
        errorHandler: () => true
      };
    }
  };
</script>
```

:::

## 适应容器

当使用图片作为用户头像时，设置该图片如何在容器中展示.

:::demo

```vue
<template>
  <div class="demo-fit">
    <div v-for="fit in fits" :key="fit" class="block">
      <span class="title">{{ fit }}</span>
      <xs-avatar shape="square" :size="100" :fit="fit" :src="url" />
    </div>
  </div>
</template>
<script>
  import { ref, reactive } from 'vue';
  export default {
    setup: () => {
      return {
        fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
      };
    }
  };
</script>

<style scoped>
  .demo-fit {
    display: flex;
    text-align: center;
    justify-content: space-between;
  }
  .demo-fit .block {
    flex: 1;
    display: flex;
    flex-direction: column;
    flex-grow: 0;
  }

  .demo-fit .title {
    margin-bottom: 10px;
    font-size: 14px;
    color: var(--xs-text-color-secondary);
  }
</style>
```

:::

## API

### 属性

| 参数    | 说明                                         | 类型                                                   | 可选值 | 默认值   |
| ------- | -------------------------------------------- | ------------------------------------------------------ | ------ | -------- |
| size    | 头像大小                                     | number ,['small', 'large']                             |        |          |
| shape   | 头像形状                                     | ['circle', 'square']                                   |        | 'circle' |
| src     | 图片源地址                                   | string                                                 |        |          |
| src-set | 原生 srcset                                  | string                                                 |        |          |
| alt     | 原生 alt 属性                                | string                                                 |        |          |
| fit     | 当展示类型为图片的时候，设置图片如何适应容器 | ['fill' , 'contain' , 'cover' , 'none' , 'scale-down'] |        | 'cover'  |
| name    | 文字头像的名称                               | string                                                 |        |          |
| count   | 文字头像文字数量                             | number                                                 |        | 1        |
| from    | 文字头像内的文字从何种方向裁剪得到           | ['start', 'end']                                       |        | 'start'  |

### 事件

| 事件  | 说明               |
| ----- | ------------------ |
| error | 图片加载失败时触发 |

### 插槽

| 插槽    | 说明               |
| ------- | ------------------ |
| default | 自定义头像展示内容 |
