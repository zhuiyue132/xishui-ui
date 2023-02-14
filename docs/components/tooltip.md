# Tooltip 文字提示

常用于展示鼠标 hover 时的提示信息。基于 `ElTooltip`封装。

## 基础用法

自动判断是否溢出，溢出时激活 hover 触发 tooltip，否则不显示。

:::demo

```vue
<template>
  <div style="width: 360px">
    <xs-tooltip :content="content"> </xs-tooltip>
    <br />
    <br />
    <xs-tooltip :content="content" text="我买几个橘子去"> </xs-tooltip>
  </div>
</template>
<script>
  export default {
    setup() {
      return {
        content:
          '“我买几个橘子去。你就在此地，不要走动。”我看那边月台的栅栏外有几个卖东西的等着顾客。走到那边月台，须穿过铁道，须跳下去又爬上去。父亲是一个胖子，走过去自然要费事些。'
      };
    }
  };
</script>
```

:::

## 当触发器和内容不相同时

:::demo

```vue
<template>
  <div style="width: 360px">
    <xs-tooltip :content="content" :text="text" />
  </div>
</template>
<script>
  export default {
    setup() {
      return {
        content:
          '“我买几个橘子去。你就在此地，不要走动。”我看那边月台的栅栏外有几个卖东西的等着顾客。走到那边月台，须穿过铁道，须跳下去又爬上去。父亲是一个胖子，走过去自然要费事些。',
        text: '他走了几步，回过头看见我，说：“进去吧，里边没人。”等他的背影混入来来往往的人里，再找不着了，我便进来坐下，我的眼泪又来了。'
      };
    }
  };
</script>
```

:::

## 设置显示行数

:::demo

```vue
<template>
  <div style="width: 360px">
    <xs-tooltip :content="content" :text="text" :rows="2" />
  </div>
</template>
<script>
  export default {
    setup() {
      return {
        content:
          '“我买几个橘子去。你就在此地，不要走动。”我看那边月台的栅栏外有几个卖东西的等着顾客。走到那边月台，须穿过铁道，须跳下去又爬上去。父亲是一个胖子，走过去自然要费事些。',
        text: '他走了几步，回过头看见我，说：“进去吧，里边没人。”等他的背影混入来来往往的人里，再找不着了，我便进来坐下，我的眼泪又来了。'
      };
    }
  };
</script>
```

:::

## 关闭是否溢出的自动判断

关闭自动判断后，即便文本不溢出也会触发 tooltip 的显示了。

:::demo

```vue
<template>
  <div style="width: 360px">
    <xs-tooltip :content="content" text="《背影》买橘子" :auto="false"> </xs-tooltip>
  </div>
</template>
<script>
  export default {
    setup() {
      return {
        content:
          '“我买几个橘子去。你就在此地，不要走动。”我看那边月台的栅栏外有几个卖东西的等着顾客。走到那边月台，须穿过铁道，须跳下去又爬上去。父亲是一个胖子，走过去自然要费事些。'
      };
    }
  };
</script>
```

:::

## 属性

| 参数    | 说明                                 | 类型    | 可选值 | 默认值 |
| ------- | ------------------------------------ | ------- | ------ | ------ |
| content | 小窗口内容                           | String  |        |        |
| text    | 默认显示内容，不传则取上面的 content | String  |        |        |
| rows    | 显示行数                             | Number  |        | 1      |
| auto    | 是否自动判断溢出？                   | Boolean |        | true   |
