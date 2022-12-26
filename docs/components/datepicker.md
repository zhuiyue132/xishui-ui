# DatePicker 时间类型选择

本组件和 BI 系统业务息息相关,一般在页面中以右对齐展示。

## 基本用法

:::demo

```vue
<template>
  <xs-date-picker
    v-model="value"
    v-model:type="type"
    :layout="['day1', 'day7', 'day30', 'date', 'week', 'month', 'year']"
  />

  <br />

  {{ type }} / {{ JSON.stringify(value) }}
</template>
<script>
  import { ref } from 'vue';
  export default {
    setup: () => {
      const type = ref('day1');
      const value = ref([]);

      return {
        type,
        value
      };
    }
  };
</script>
<style>
  .vp-doc li + li {
    margin-top: 0;
  }
</style>
```

:::

## 默认日期/默认类型/时间文案

:::demo

```vue
<template>
  <xs-button @click="onClick">切换文案显示状态</xs-button> <br />

  <xs-date-picker
    v-model="value"
    v-model:type="type"
    time-label="解封时间"
    :show-time-label="visible"
    :default-date="['2022-10-01', '2022-10-31']"
    :layout="['date', 'week', 'month', 'year']"
  />

  <br />

  {{ type }} / {{ JSON.stringify(value) }}
</template>
<script>
  import { ref } from 'vue';
  export default {
    setup: () => {
      const type = ref('month');
      const value = ref([]);
      const visible = ref(true);
      const onClick = () => (visible.value = !visible.value);

      return {
        type,
        value,
        visible,
        onClick
      };
    }
  };
</script>
```

:::

## 设置每周起始计算时间

firstDayOfWeek : [0-6] ,即周日-周六

::: danger
尽量每个页面只有一个本组件，否则星期起始的设置会因为后方的组件而重置。
:::

:::demo

```vue
<template>
  <xs-date-picker v-model="value" v-model:type="type" :first-day-of-week="0" :layout="['date', 'week']" />

  <br />

  {{ type }} / {{ JSON.stringify(value) }}
</template>
<script>
  import { ref } from 'vue';
  export default {
    setup: () => {
      const type = ref('date');
      const value = ref([]);

      return {
        type,
        value
      };
    }
  };
</script>
```

:::

## 自定义时间类型的别名

可以通过 props 或 slot 的方式修改名称的显示；

每一个时间类型都对应了一个同名的 slot.

:::demo

```vue
<template>
  <xs-date-picker
    v-model="value"
    v-model:type="type"
    :layout="['date', 'week', 'month', 'year']"
    :alias="{ date: '子鼠', week: '丑牛', month: '寅虎', year: '卯兔' }"
    alias-enable
  />

  <xs-date-picker
    v-model="value"
    v-model:type="type"
    :layout="['date', 'week', 'month', 'year']"
    :alias="{ date: '子鼠', week: '丑牛', month: '寅虎', year: '卯兔' }"
    alias-enable
  >
    <template #year>
      <span style="color:red">卯兔</span>
    </template>
  </xs-date-picker>
</template>
<script>
  import { ref } from 'vue';
  export default {
    setup: () => {
      const type = ref('month');
      const value = ref([]);

      return {
        type,
        value
      };
    }
  };
</script>
```

:::

## 自定义时间范围的选择需要单独说说

daterange 的选择有 2 种，一种就是默认的任意范围。一种是有最大选择天数的限制。

此外，该类型还自带有 shortcuts 阳历阴历的快捷菜单。

:::demo

```vue
<template>
  <h4>1.默认</h4>
  <xs-date-picker v-model="value" v-model:type="type" :layout="['date', 'month', 'daterange']" />
  <h4>2.选中第一个时间后，只能选前后7天</h4>
  <xs-date-picker
    v-model="value"
    v-model:type="type"
    :layout="['date', 'month', 'daterange']"
    :dateRangeMaxInterval="7"
  />
  <h4>3.开启阴历和阳历的快捷选项</h4>
  <xs-date-picker
    v-model="value"
    v-model:type="type"
    :layout="['date', 'month', 'daterange']"
    :shortcutsYearRange="[2020, 2022]"
    shortcutsEnable
  />
</template>
<script>
  import { ref } from 'vue';
  export default {
    setup: () => {
      const type = ref('date');
      const value = ref([]);

      return {
        type,
        value
      };
    }
  };
</script>
```

:::

## 本年/本月/本周是否可选，如果包含在数组里，则不可选

:::demo

```vue
<template>
  <xs-date-picker
    v-model="value"
    v-model:type="type"
    :currentDisabledType="['week', 'month', 'year']"
    :layout="['date', 'week', 'month', 'year']"
  />

  <br />

  <xs-date-picker
    v-model="value"
    v-model:type="type"
    :currentDisabledType="[]"
    :layout="['date', 'week', 'month', 'year']"
  />
  <br />

  {{ type }} / {{ JSON.stringify(value) }}
</template>
<script>
  import { ref } from 'vue';
  export default {
    setup: () => {
      const type = ref('date');
      const value = ref([]);

      return {
        type,
        value
      };
    }
  };
</script>
```

:::

## 7 天， 14 天, 30 天 的时间段中是否包含今天

:::demo

```vue
<template>
  <xs-date-picker v-model="value" v-model:type="type" :layout="['day7', 'day14', 'day30']" />

  <br />

  <xs-date-picker v-model="value" v-model:type="type" includesToday :layout="['day7', 'day14', 'day30']" />
  <br />

  {{ type }} / {{ JSON.stringify(value) }}
</template>
<script>
  import { ref } from 'vue';
  export default {
    setup: () => {
      const type = ref('day7');
      const value = ref([]);

      return {
        type,
        value
      };
    }
  };
</script>
```

:::

## 可选时间限制

2022-11-01 ~ 2022-12-15 可选。

:::demo

```vue
<template>
  <xs-date-picker
    v-model="value"
    v-model:type="type"
    limitEndDate="2022-12-15"
    limitStartDate="2022-11-01"
    :layout="['date', 'week', 'month', 'year']"
  />

  <br />

  {{ type }} / {{ JSON.stringify(value) }}
</template>
<script>
  import { ref } from 'vue';
  export default {
    setup: () => {
      const type = ref('date');
      const value = ref([]);

      return {
        type,
        value
      };
    }
  };
</script>
```

:::

## 所有的时间类型

![gR1tL5](https://picture.zhuiyue.vip:444/images/2022/12/26/gR1tL5.png)

## 属性

| 参数                 | 说明                                               | 类型    | 可选值             | 默认值                    |
| -------------------- | -------------------------------------------------- | ------- | ------------------ | ------------------------- |
| layout               | 时间类型，必填                                     | array   |
| modelValue/v-model   | 选中的时间                                         | array   |
| type/v-model:type    | 选中的类型                                         | string  |
| defalutDate          | 默认选中的时间，只在初始化有用                     | array   |
| immediate            | 是否立即触发 change 事件                           | boolean |                    | true                      |
| timeLabel            | 时间描述文案                                       | string  |                    | 统计时间                  |
| showTimeLabel        | 是否展示时间范围和描述文案                         | boolean |                    | true                      |
| limitEndDate         | 日期最后可选择时间                                 | string  |                    | 昨天                      |
| limitStartDate       | 日期最前可选择时间                                 | string  |
| currentDisabledType  | 本年/本月/本周是否可选，如果包含在数组里，则不可选 | array   |                    | ['year', 'month', 'week'] |
| includesToday        | day7， day14, day30 的时间段中是否包含今天；       | boolean |
| firstDayOfWeek       | 周起始日                                           | number  | [0,6]， 周日到周六 | 1                         |
| dateRangeMaxInterval | 选择时间段时，最大间隔时间，单位为天，大于 0 生效  | number  |                    | 0                         |
| alias                | 时间类型别名                                       | object  |                    | {}                        |
| aliasEnable          | 是否启用时间类型别名                               | boolean |
| shortcutsYearRange   | 快捷选项年份范围[2019, 2022]                       | array   |                    | []默认计算最近 2 年       |
| shortcutsEnable      | 快捷选项是否可用                                   | boolean |

## 事件

| 事件      | 说明                 | 参数                             |
| --------- | -------------------- | -------------------------------- |
| change    | 时间变化时触发       | `{ type: string, value: array }` |
| selectAll | 点击”全部“类型时触发 | 需要你自己手动设置时间哦         |

## 插槽

每一个时间类型都有一个同名插槽，没有参数。
