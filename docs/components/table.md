# Table 表格

用于展示多条结构类似的数据， 可对数据进行排序、筛选、对比或其他自定义操作。基于 `el-table` 封装。

::: tip 新特性

1. [x] 使用 JSON 配置表格;
1. [x] 支持列的 slot;
1. [x] 列支持自定义 render 函数，支持渲染 jsx 片段;
1. [x] 支持自定义表头的 slot,
1. [x] 列头支持自定义的 renderLabel 函数，也支持渲染 jsx 片段；
1. [x] 表格吸顶，支持配置吸顶的偏移量，同时横向滚动条吸底；
1. [x] 斑马纹支持起始行号配置；
1. [x] 骨架屏加载, 支持配置骨架屏行数；
1. [x] 自带分页，支持关闭和调整分页布局和参数;
1. [x] 全量数据排序；
1. [x] 全量数据筛选，支持数据范围，文本输入，时间选择，下拉多选的筛选模式;
1. [x] 支持表格外部控制表格的排序和筛选;
1. [x] 表头颜色主题色配置和自定义颜色；
1. [x] 支持分组和分组的 EmptySlot 自定义;
1. [x] 合计行支持位置调整；
1. [x] 数字格式化,支持格式与小数位数的自定义;
1. [x] 单选调整
1. [ ] ~~跨页多选支持~~

:::

## 基础表格

基础的表格展示用法。

当 `xs-table` 元素中注入 `data` 和 `columns` 对象数组后，在 `column` 中用 `prop` 属性来对应对象中的键名即可填入数据，用 `label` 属性来定义表格的列名。 可以使用 `width` 属性来定义列宽。前端分页默认开启。

:::demo

```vue
<template>
  <xs-table :columns="columns" :data="data" />
</template>
<script>
  import { ref } from 'vue';
  export default {
    setup() {
      const data = ref(
        Array.from({ length: 10 }).map((_, index) => ({
          date: `2023-01-1${index}`,
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }))
      );
      const columns = ref([
        {
          prop: 'date',
          label: 'Date',
          width: 180
        },
        {
          prop: 'name',
          label: 'Name',
          width: 180
        },
        {
          prop: 'address',
          label: 'Address'
        }
      ]);

      return {
        data,
        columns
      };
    }
  };
</script>
```

:::

## Loading 加载

传入 `loading` 属性即可控制表格是否处于加载状态。还可以通过设置 `skeleton-rows` 配置骨架屏行数， 默认为 20 行。

:::demo

```vue
<template>
  <xs-button type="primary" @click="loading = !loading">{{ loading ? '关闭' : '打开' }}加载</xs-button>

  <xs-table :columns="columns" :data="data" :loading="loading" :skeleton-rows="10" />
</template>
<script>
  import { ref } from 'vue';
  export default {
    setup() {
      const data = ref(
        Array.from({ length: 10 }).map((_, index) => ({
          date: `2023-01-1${index}`,
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }))
      );

      const loading = ref(true);
      const columns = ref([
        {
          prop: 'date',
          label: 'Date',
          width: 180
        },
        {
          prop: 'name',
          label: 'Name',
          width: 180
        },
        {
          prop: 'address',
          label: 'Address'
        }
      ]);

      return {
        data,
        columns,
        loading
      };
    }
  };
</script>
```

:::

## 分页

如果你需要后端分页时，你可以关闭组件内的分页。

或者调整一下分页的参数也是可以的。

分页内有 2 个插槽提供。

::: demo

```vue
<template>
  <div style="margin-bottom:12px;">
    <xs-button type="warning" @click="pagination = !pagination">{{ pagination ? '关闭' : '打开' }}分页</xs-button>
    <xs-button v-if="pagination" type="primary" @click="setPage">调整页长和页长选项</xs-button>

    <xs-button v-if="pagination" type="danger" @click="slotVisible = !slotVisible">
      {{ slotVisible ? '关闭' : '显示' }} 插槽
    </xs-button>
  </div>
  <xs-table :columns="columns" :data="data" :pagination="pagination" :reset-position-on-data-change="false">
    <template v-if="slotVisible" #paginationLeft>
      <xs-button type="warning">分页左侧slot</xs-button>
    </template>

    <template v-if="slotVisible" #paginationRight>
      <xs-button type="warning">分页右侧slot</xs-button>
    </template>
  </xs-table>
</template>
<script>
  import { ref } from 'vue';
  export default {
    setup() {
      const data = ref(
        Array.from({ length: 10 }).map((_, index) => ({
          date: `2023-01-1${index}`,
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
          tag: 'Office'
        }))
      );
      const columns = ref([
        {
          prop: 'date',
          label: 'Date',
          fixed: true
        },
        {
          prop: 'name',
          label: 'Name'
        },

        {
          prop: 'address',
          label: 'Address',
          width: 600
        }
      ]);

      const pagination = ref(true);

      const setPage = () => {
        if (typeof pagination.value === 'object') {
          pagination.value = true;
        } else {
          pagination.value = {
            layout: 'sizes, prev, pager, next, total',
            position: 'flex-start',
            pageSizes: [25, 50, 100], // 默认的可选分页数量
            pageSize: 50 // 默认的每页条数
          };
        }
      };

      const slotVisible = ref(false);

      return {
        data,
        columns,
        setPage,
        pagination,
        slotVisible
      };
    }
  };
</script>
```

:::

## 斑马纹表格

`stripe` 可以创建带斑马纹的表格。 如果 `true`, 表格将会带有斑马纹。

斑马纹默认开启。如果不需要，可以手动关闭。

在设计图中，如果表头带有背景色，则斑马纹是从第二行开始的。

:::demo

```vue
<template>
  <xs-button type="primary" @click="toggleStripe"> {{ stripe ? '关闭' : '打开' }}斑马纹 </xs-button>
  <xs-button v-if="stripe" type="danger" @click="changeIndex"> 切换斑马纹的起始序号 </xs-button>

  <xs-table :columns="columns" :data="data" :stripe="stripe" :stripe-index="stripeIndex" />
</template>
<script>
  import { ref } from 'vue';
  export default {
    setup() {
      const data = ref(
        Array.from({ length: 10 }).map((_, index) => ({
          date: `2023-01-1${index}`,
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }))
      );

      const stripe = ref(true);
      const stripeIndex = ref(0);

      const toggleStripe = () => {
        stripe.value = !stripe.value;
      };

      const changeIndex = () => {
        if (stripeIndex.value) {
          stripeIndex.value = 0;
        } else {
          stripeIndex.value = 1;
        }
      };

      const columns = ref([
        {
          prop: 'date',
          label: 'Date',
          width: 180
        },
        {
          prop: 'name',
          label: 'Name',
          width: 180
        },
        {
          prop: 'address',
          label: 'Address'
        }
      ]);

      return {
        data,
        columns,
        toggleStripe,
        stripe,
        stripeIndex,
        changeIndex
      };
    }
  };
</script>
```

:::

## 带边框表格

默认情况下，Table 组件是不具有竖直方向的边框的， 如果需要，可以使用 `border` 属性，把该属性设置为 `true` 即可启用。

::: demo

```vue
<template>
  <xs-table :columns="columns" :data="data" border />
</template>
<script>
  import { ref } from 'vue';
  export default {
    setup() {
      const data = ref(
        Array.from({ length: 10 }).map((_, index) => ({
          date: `2023-01-1${index}`,
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }))
      );
      const columns = ref([
        {
          prop: 'date',
          label: 'Date',
          width: 180
        },
        {
          prop: 'name',
          label: 'Name',
          width: 180
        },
        {
          prop: 'address',
          label: 'Address'
        }
      ]);

      return {
        data,
        columns
      };
    }
  };
</script>
```

:::

## 带状态表格

可将表格内容 highlight 显示，方便区分「成功、信息、警告、危险」等内容。

可以通过指定 Table 组件的 `row-class-name` 属性来为 Table 中的某一行添加 class， 这样就可以自定义每一行的样式了。

::: demo

```vue
<template>
  <xs-table :columns="columns" :data="data" :row-class-name="tableRowClassName" :abc="1" />
</template>
<script>
  import { ref } from 'vue';
  export default {
    setup() {
      const data = ref(
        Array.from({ length: 10 }).map((_, index) => ({
          date: `2023-01-1${index}`,
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }))
      );

      const tableRowClassName = ({ row, rowIndex }) => {
        if (rowIndex === 0) {
          return 'warning-row';
        } else if (rowIndex === 3) {
          return 'success-row';
        }
        return '';
      };
      const columns = ref([
        {
          prop: 'date',
          label: 'Date',
          width: 180
        },
        {
          prop: 'name',
          label: 'Name',
          width: 180
        },
        {
          prop: 'address',
          label: 'Address'
        }
      ]);

      return {
        data,
        columns,
        tableRowClassName
      };
    }
  };
</script>

<style>
  .xs-table .el-table .warning-row td {
    background-color: var(--xs-color-warning-light-8) !important;
  }
  .xs-table .el-table .success-row {
    background-color: var(--xs-color-success-light-8);
  }
</style>
```

:::

## 固定表头

纵向内容过多时，可选择固定表头。

只要在元素中定义了 height 属性，即可实现固定表头的表格，而不需要额外的代码。

::: demo

```vue
<template>
  <xs-table :columns="columns" :data="data" height="250" />
</template>
<script>
  import { ref } from 'vue';
  export default {
    setup() {
      const data = ref(
        Array.from({ length: 10 }).map((_, index) => ({
          date: `2023-01-1${index}`,
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }))
      );
      const columns = ref([
        {
          prop: 'date',
          label: 'Date',
          width: 180
        },
        {
          prop: 'name',
          label: 'Name',
          width: 180
        },
        {
          prop: 'address',
          label: 'Address'
        }
      ]);

      return {
        data,
        columns
      };
    }
  };
</script>
```

:::

## 固定列

横向内容过多时，可选择固定列。

固定列需要使用 `fixed` 属性，它接受 `Boolean` 值。 如果为 `true`, 列将被左侧固定. 它还接受传入字符串，`left` 或 `right`，表示左边固定还是右边固定。

::: demo

```vue
<template>
  <xs-table :columns="columns" :data="data">
    <template #operations>
      <xs-button link type="danger" size="small">删除</xs-button>
    </template>
  </xs-table>
</template>
<script>
  import { ref } from 'vue';
  export default {
    setup() {
      const data = ref(
        Array.from({ length: 10 }).map((_, index) => ({
          date: `2023-01-1${index}`,
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
          tag: 'Office'
        }))
      );
      const columns = ref([
        {
          prop: 'date',
          label: 'Date',
          width: 100,
          fixed: true
        },
        {
          prop: 'name',
          label: 'Name',
          width: 200
        },
        {
          prop: 'state',
          label: 'State',
          width: 200
        },
        {
          prop: 'city',
          label: 'City',
          width: 200
        },
        {
          prop: 'address',
          label: 'Address',
          width: 600
        },
        {
          slot: 'operations',
          label: 'Operations',
          width: 120,
          fixed: 'right'
        }
      ]);

      return {
        data,
        columns
      };
    }
  };
</script>
```

:::

## 固定列和表头

固定列和表头可以同时使用，只需要将上述两个属性(`fixed`, `height`)分别设置好即可。本章节无 demo;

## 流体高度

当数据量动态变化时，可以为 Table 设置一个最大高度。

通过设置 `max-height` 属性指定最大高度。 此时若表格所需的高度大于最大高度，则会显示一个滚动条

::: demo

```vue
<template>
  <xs-table :columns="columns" :data="data" max-height="250">
    <template #operations="{ $index }">
      <xs-button type="link" size="small" @click="deleteRow($index)">删除</xs-button>
    </template>
  </xs-table>

  <xs-button style="width:100%;margin-top:12px" @click="addRow">增加一项到表格</xs-button>
</template>
<script>
  import { ref } from 'vue';
  export default {
    setup() {
      const data = ref(
        Array.from({ length: 2 }).map((_, index) => ({
          date: `2023-01-1${index}`,
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
          tag: 'Office'
        }))
      );

      const deleteRow = index => {
        data.value.splice(index, 1);
      };

      const addRow = () => {
        if (data.value.length >= 10) return;
        data.value.push({
          date: `2023-01-1${data.value.length}`,
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036'
        });
      };

      const columns = ref([
        {
          prop: 'date',
          label: 'Date',
          width: 100,
          fixed: true
        },
        {
          prop: 'name',
          label: 'Name',
          width: 200
        },
        {
          prop: 'state',
          label: 'State',
          width: 200
        },
        {
          prop: 'city',
          label: 'City',
          width: 200
        },
        {
          prop: 'address',
          label: 'Address',
          width: 600
        },
        {
          slot: 'operations',
          label: 'Operations',
          width: 120,
          fixed: 'right'
        }
      ]);

      return {
        data,
        columns,
        deleteRow,
        addRow
      };
    }
  };
</script>
```

:::

## 多级表头

数据结构比较复杂的时候，可使用多级表头来展现数据的层次关系。

只需要将 `columnItem` 添加一个 `children` 字段，并放入子集 `columnItem` 你可以实现组头。

这里还使用了 `align` 和 `showOverflowTooltip` 属性。

::: demo

```vue
<template>
  <xs-table :columns="columns" :data="data">
    <template #operations>
      <xs-button link type="danger" size="small">删除</xs-button>
    </template>
  </xs-table>
</template>
<script>
  import { ref } from 'vue';
  export default {
    setup() {
      const data = ref(
        Array.from({ length: 10 }).map((_, index) => ({
          date: `2023-01-1${index}`,
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
          tag: 'Office'
        }))
      );
      const columns = ref([
        {
          prop: 'date',
          label: 'Date',
          fixed: true
        },
        {
          prop: 'name',
          label: 'Name',
          align: 'center',
          children: [
            {
              prop: 'tag',
              label: 'Tag',
              align: 'center'
            },
            {
              prop: 'zip',
              label: 'Zip',
              align: 'center'
            }
          ]
        },

        {
          prop: 'address',
          label: 'Address',
          showOverflowTooltip: true
        }
      ]);

      return {
        data,
        columns
      };
    }
  };
</script>
```

:::

## 表头颜色自定义

在 `column` 设置 `background` 即可, 多级表头的子集如果没有定义背景色则继承上级。

如果 Table 传入了 `theme-color`, 优先显示。

::: demo

```vue
<template>
  <xs-button type="primary" @click="themeColor = '#e1f3d8'">打开主题色</xs-button>
  <xs-button type="danger" @click="themeColor = ''">关闭主题色</xs-button>
  <br />
  <br />
  <xs-table :columns="columns" :data="data" :theme-color="themeColor" />
  <br />
  <xs-table :columns="columns2" :data="data" :theme-color="themeColor">
    <template #tagLabel>
      <xs-button type="link">自定义头部</xs-button>
    </template>
  </xs-table>
</template>
<script>
  import { ref } from 'vue';
  export default {
    setup() {
      const data = ref(
        Array.from({ length: 4 }).map((_, index) => ({
          date: `2023-01-1${index}`,
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: null,
          tag: null,
          zip2: '我在鼓楼',
          tag2: '春天花会开',
          zip3: '--',
          tag3: '--'
        }))
      );

      const themeColor = ref('');
      const columns = ref([
        {
          type: 'index',
          index: idx => idx * 2,
          background: '#c5d3f4',
          label: '#',
          align: 'center'
        },
        {
          prop: 'date',
          label: 'Date',
          background: '#e1f3d8'
        },
        {
          prop: 'name',
          label: 'Name',
          background: '#ffd180'
        },
        {
          prop: 'address',
          label: 'Address',
          background: '#d78e6a'
        }
      ]);

      const columns2 = ref([
        {
          prop: 'date',
          label: 'Date',
          fixed: true,
          width: 150
        },
        {
          prop: 'name',
          label: 'Name',
          align: 'center',
          background: '#fcd3d3',
          group: 'userName',
          children: [
            {
              prop: 'tag',
              label: 'Tag',
              align: 'center',
              background: '#ffd180',
              slotLabel: 'tagLabel',
              width: 220
            },
            {
              prop: 'zip',
              label: '继承name的颜色',
              align: 'center',
              width: 320
            }
          ]
        },

        {
          prop: 'name',
          label: 'Name',
          align: 'center',
          background: '#e1f3d8',
          group: 'userName2',
          children: [
            {
              prop: 'tag2',
              label: 'Tag',
              width: 220,
              align: 'center'
            },
            {
              prop: 'zip2',
              label: 'Zip',
              width: 200,
              align: 'center'
            }
          ]
        },

        {
          prop: 'name',
          label: 'Name',
          align: 'center',
          background: '#fcd3d3',
          group: 'userName3',
          children: [
            {
              prop: 'tag3',
              label: 'Tag',
              align: 'center',
              background: '#ffd180',
              slotLabel: 'tagLabel',
              width: 220
            },
            {
              prop: 'zip3',
              label: '继承name的颜色',
              align: 'center',
              width: 220
            }
          ]
        },

        {
          prop: 'address',
          label: 'Address',
          showOverflowTooltip: true
        }
      ]);

      return {
        data,
        columns,
        columns2,
        themeColor
      };
    }
  };
</script>
```

:::

## 多选

你可以选择多行。

实现多选非常简单: 手动添加一个 column，设 type 属性为 selection 即可；

此外, 还开启了 `type = index` 的序号列。

::: demo

```vue
<template>
  <xs-table :columns="columns" :data="data">
    <template #operations>
      <xs-button link type="danger" size="small">删除</xs-button>
    </template>
  </xs-table>
</template>
<script>
  import { ref } from 'vue';
  export default {
    setup() {
      const data = ref(
        Array.from({ length: 10 }).map((_, index) => ({
          date: `2023-01-1${index}`,
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
          tag: 'Office'
        }))
      );
      const columns = ref([
        {
          type: 'selection',
          width: 60,
          align: 'center'
        },
        {
          type: 'index',
          width: 60,
          label: '#'
        },
        {
          prop: 'date',
          label: 'Date'
        },
        {
          prop: 'name',
          label: 'Name'
        },

        {
          prop: 'address',
          label: 'Address'
        }
      ]);

      return {
        data,
        columns
      };
    }
  };
</script>
```

:::

## 单选

::: warning
本表格的单选与 `el-table` 的单选使用方式略有不同。具体请看 demo。
:::

选择单行数据时使用色块表示。

Table 组件提供了单选的支持， 只需要配置 `highlight-current-row` 属性即可实现单选。 之后由 `current-change` 事件来管理选中时触发的事件，它会传入 `{ currentRow, oldCurrentRow, currentRowIndex, oldCurrentIndex }`。

::: demo

```vue
<template>
  <div style="margin-bottom:12px;">
    <xs-button type="warning" @click="onClick(2)">选中第三行</xs-button>
    <xs-button type="primary" @click="onClick">清除选中</xs-button>
  </div>
  <xs-table ref="tableRef" :columns="columns" :data="data" highlight-current-row @current-change="onCurrentChange">
  </xs-table>
</template>
<script>
  import { ref } from 'vue';
  export default {
    setup() {
      const tableRef = ref(null);
      const data = ref(
        Array.from({ length: 10 }).map((_, index) => ({
          date: `2023-01-1${index}`,
          age: index + 1,
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
          tag: 'Office'
        }))
      );
      const columns = ref([
        {
          type: 'index',
          width: 60,
          label: '#',
          align: 'center'
        },
        {
          prop: 'date',
          label: 'Date',
          sortable: true
        },
        {
          prop: 'age',
          label: 'Age',
          sortable: true
        },
        {
          prop: 'name',
          label: 'Name',
          render: ({ column, row, rows, columns, $index }) =>
            `${row.name}-${rows.length}-${columns.length}-${column.prop}-${$index}`
        },

        {
          prop: 'address',
          showOverflowTooltip: true,
          label: 'Address'
        }
      ]);

      const onClick = rowIndex => {
        tableRef.value.setCurrentRow(rowIndex);
      };

      const onCurrentChange = ({ currentRowIndex }) => {
        alert(currentRowIndex === -1 ? '取消单选' : `选中了第${currentRowIndex + 1}行`);
      };

      return {
        data,
        tableRef,
        columns,
        onCurrentChange,
        onClick
      };
    }
  };
</script>
```

:::

## 排序

对表格进行排序，可快速查找或对比数据。

部分字段是时间格式的，排序需要按照时间去排，组件内置了时间类型的字段： `['date']`, 当你需要其他的字段也要按照时间排序时，需要传入 `timeProps`。

在列中设置 `sortable` 属性即可实现以该列为基准的排序， 接受一个 Boolean，默认为 false。 可以通过 Table 的 `sort` 属性设置默认的排序列和排序顺序。

如果需要后端排序, 需要在 组件属性 `useInnerSort` 置为 `false`, 同时监听 `sort-change` 事件，在事件回调中可以获取当前排序的字段名和排序顺序，从而向接口请求排序后的表格数据。

在本例中，我们还使用了 `render` 属性，它用于格式化指定列的值， 接受一个 Function，传入参数：`{ column, row, rows, columns, $index  }`， 可以根据自己的需求进行处理。

不支持 `default-sort` 属性，支持 `sort` 属性动态控制表格的排序。

::: demo

```vue
<template>
  <div style="margin-bottom:12px;">
    <xs-button type="warning" @click="sort = { prop: 'date', order: 'descending' }">按Date降序</xs-button>
    <xs-button type="primary" @click="sort = { prop: 'age', order: 'ascending' }">按Age升序</xs-button>
  </div>
  <xs-table :columns="columns" :data="data" :sort="sort"> </xs-table>
</template>
<script>
  import { ref } from 'vue';
  export default {
    setup() {
      const data = ref(
        Array.from({ length: 10 }).map((_, index) => ({
          date: `2023-01-1${index}`,
          age: index + 1,
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
          tag: 'Office'
        }))
      );
      const columns = ref([
        {
          type: 'index',
          width: 60,
          label: '#',
          align: 'center'
        },
        {
          prop: 'date',
          label: 'Date',
          sortable: true
        },
        {
          prop: 'age',
          label: 'Age',
          sortable: true
        },
        {
          prop: 'name',
          label: 'Name',
          render: ({ column, row, rows, columns, $index }) =>
            `${row.name}-${rows.length}-${columns.length}-${column.prop}-${$index}`
        },

        {
          prop: 'address',
          showOverflowTooltip: true,
          label: 'Address'
        }
      ]);

      const sort = ref({});

      return {
        data,
        columns,
        sort
      };
    }
  };
</script>
```

:::

## 筛选

对原有表格的筛选重写，筛选，可快速查找到自己想看的数据。

在列中设置 filterable 属性即可开启该列的筛选，默认是输入类型的筛选模式。 filterable 是一个布尔值，它用于决定某些数据是否显示。

组件内置了几种筛选方法,分别是输入类型筛选(`input`)、下拉选择类型筛选(`select`)、数字范围筛选(`number`)、时间范围筛选(`time`), 指定筛选的 `type` 即可开启指定类型的筛选模式。

下拉选择类型筛选支持多选，需要指定 `filter.multiple` 为 `true` 。

其中数字范围的筛选可以根据 `column.filter.suffixLabel` 决定筛选基数。`{
      '%': 0.01,
      万: 10000,
      亿: 100000000
    }`。当 `suffixLabel` 为对应 key 时，输入框的值将会乘以这个基数后再和单元格的值做比较。匹配不到以上三个 key 时，基数为 1。

也可以通过 `Table` 的 `filter` 属性动态控制表格的筛选。

::: demo

```vue
<template>
  <div style="margin-bottom:12px;">
    <xs-button type="warning" @click="addFilter('name', ['Jerry'])">筛选name=Jerry的数据</xs-button>
    <xs-button type="primary" @click="addFilter('date', ['2023-01-10', '2023-01-15'])"
      >在Jerry基础上筛选01-10到01-15的数据</xs-button
    >
    <xs-button type="danger" @click="clearFilter">清空筛选</xs-button>
  </div>
  <xs-table ref="tableRef" :filter="filters" :columns="columns" :data="data"> </xs-table>
</template>
<script>
  import { ref } from 'vue';
  export default {
    setup() {
      const data = ref(
        Array.from({ length: 10 }).map((_, index) => ({
          date: `2023-01-1${index}`,
          age: index * 10 + 10,
          name: index % 2 === 0 ? 'Tom' : 'Jerry',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
          tag: 'Office'
        }))
      );
      const columns = ref([
        {
          type: 'index',
          width: 60,
          label: '#',
          align: 'center'
        },
        {
          prop: 'date',
          label: 'Date',
          sortable: true,
          filterable: true,
          filter: {
            type: 'time'
          }
        },
        {
          prop: 'name',
          label: 'Name',
          filterable: true,
          filter: {
            type: 'select',
            multiple: true
          },
          render: ({ column, row, rows, columns, $index }) =>
            `${row.name}-${rows.length}-${columns.length}-${column.prop}-${$index}`
        },

        {
          prop: 'name',
          label: 'Name',
          filterable: true,
          filter: {
            type: 'select'
          },
          render: ({ row }) => row.name
        },
        {
          prop: 'age',
          label: 'Age',
          filterable: true,
          filter: {
            type: 'number',
            suffixLabel: '岁'
          }
        },

        {
          prop: 'address',
          label: 'Address',
          filterable: true,
          showOverflowTooltip: true
        }
      ]);

      const filters = ref({});

      const addFilter = (prop, value) => {
        filters.value[prop] = value;
      };

      const tableRef = ref();

      const clearFilter = () => {
        filters.value = {};
        tableRef.value.clearFilter();
      };

      return {
        data,
        filters,
        addFilter,
        clearFilter,
        columns,
        tableRef
      };
    }
  };
</script>
```

:::

## 自定义列模板和自定义表头

自定义列的显示内容，可组合其他组件使用，需要在 `column` 内部指定 `slot` 字段 或 `render` 函数, 接受 `{ row, rows, column, columns, $index }` 为参数。

自定义表头的显示内容，需要在 `column` 内指定 `slotLabel` 字段或 `renderLabel` 函数， 接收 `column` 作为参数。

::: demo

```vue
<template>
  <xs-table :columns="columns" :data="data">
    <template #ageLabel="{ column }">
      <xs-button type="primary" size="small">slotLabel渲染{{ column.prop }}</xs-button>
    </template>

    <template #age="{ row }">
      <xs-button type="primary" size="small">slot: {{ row.age }}</xs-button>
    </template>
  </xs-table>
</template>
<script>
  import { ref } from 'vue';
  export default {
    setup() {
      const data = ref(
        Array.from({ length: 10 }).map((_, index) => ({
          date: `2023-01-1${index}`,
          age: index + 1,
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
          tag: 'Office'
        }))
      );
      const columns = ref([
        {
          type: 'index',
          width: 60,
          label: '#',
          align: 'center'
        },
        {
          prop: 'date',
          label: 'Date',
          renderLabel: column => {
            return 'renderLabel函数渲染' + column.prop;
          },
          render: ({ column, row }) => {
            return `render: ${row[column.prop]}`;
          },
          sortable: true
        },
        {
          prop: 'age',
          label: 'Age',
          slotLabel: 'ageLabel',
          slot: 'age',
          sortable: true
        },
        {
          prop: 'name',
          label: 'Name',
          render: ({ column, row, rows, columns, $index }) =>
            `${row.name}-${rows.length}-${columns.length}-${column.prop}-${$index}`
        },

        {
          prop: 'address',
          showOverflowTooltip: true,
          label: 'Address'
        }
      ]);

      return {
        data,
        columns
      };
    }
  };
</script>
```

:::

## 展开行

当行内容过多并且不想显示横向滚动条时，可以使用 Table 展开行功能。

通过设置 type="expand" 和 slot 可以开启展开行功能， 模板会被渲染成为展开行的内容，展开行可访问的属性与使用自定义列模板时的 slot 相同。

::: demo

```vue
<template>
  <xs-table :columns="columns" :data="data">
    <template #expand="{ row, column, rows, $index, columns }">
      row = {{ row }}
      <br />
      column = {{ column }}
      <br />
      rows[2] = {{ rows[2] }}
      <br />
      columns[2] = {{ columns[2] }}
      <br />
      $index = {{ $index }}
    </template>
  </xs-table>
</template>
<script>
  import { ref } from 'vue';
  export default {
    setup() {
      const data = ref(
        Array.from({ length: 10 }).map((_, index) => ({
          date: `2023-01-1${index}`,
          age: index * 10 + 10,
          name: index % 2 === 0 ? 'Tom' : 'Jerry',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
          tag: 'Office'
        }))
      );
      const columns = ref([
        {
          type: 'expand',
          width: 60,
          label: '#',
          align: 'center',
          slot: 'expand'
        },
        {
          prop: 'date',
          label: 'Date',
          sortable: true,
          filterable: true,
          filter: {
            type: 'time'
          }
        },
        {
          prop: 'name',
          label: 'Name',
          filterable: true,
          render: ({ column, row, rows, columns, $index }) =>
            `${row.name}-${rows.length}-${columns.length}-${column.prop}-${$index}`
        },
        {
          prop: 'age',
          label: 'Age',
          filterable: true,
          filter: {
            type: 'number',
            suffixLabel: '岁'
          }
        },

        {
          prop: 'address',
          label: 'Address',
          showOverflowTooltip: true
        }
      ]);

      return {
        data,
        columns
      };
    }
  };
</script>
```

:::

## 树形数据与懒加载

支持树类型的数据的显示。 当 row 中包含 `children` 字段时，被视为树形数据。 渲染嵌套数据需要 prop 的 `row-key`。 此外，子行数据可以异步加载。 设置 Table 的 `lazy` 属性为 `true` 与加载函数 `load` 。 通过指定 row 中的 `hasChildren` 字段来指定哪些行是包含子节点。 `children` 与 `hasChildren` 都可以通过 `tree-props` 配置。

::: demo

```vue
<template>
  <xs-table :columns="columns" :data="data" row-key="id" />

  <xs-table :columns="columns" :data="data2" row-key="id" lazy :load="load" />
</template>
<script>
  import { ref } from 'vue';
  export default {
    setup() {
      const data = ref([
        {
          id: '1',
          date: '2016-05-02',
          name: 'wangxiaohu',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          id: '2',
          date: '2016-05-04',
          name: 'wangxiaohu',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          id: '3',
          date: '2016-05-01',
          name: 'wangxiaohu',
          address: 'No. 189, Grove St, Los Angeles',
          children: [
            {
              id: '31',
              date: '2016-06-01',
              name: 'wangxiaohu',
              address: 'No. 189, Grove St, Los Angeles'
            },
            {
              id: '32',
              date: '2016-05-02',
              name: 'wangxiaohu',
              address: 'No. 189, Grove St, Los Angeles'
            }
          ]
        },
        {
          id: '4',
          date: '2016-05-03',
          name: 'wangxiaohu',
          address: 'No. 189, Grove St, Los Angeles'
        }
      ]);

      const data2 = ref([
        {
          id: '1',
          date: '2016-05-02',
          name: 'wangxiaohu',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          id: '2',
          date: '2016-05-04',
          name: 'wangxiaohu',
          address: 'No. 189, Grove St, Los Angeles'
        },
        {
          id: '3',
          date: '2016-05-01',
          name: 'wangxiaohu',
          address: 'No. 189, Grove St, Los Angeles',
          hasChildren: true
        },
        {
          id: '4',
          date: '2016-05-03',
          name: 'wangxiaohu',
          address: 'No. 189, Grove St, Los Angeles'
        }
      ]);
      const columns = ref([
        {
          prop: 'date',
          label: 'Date'
        },
        {
          prop: 'name',
          label: 'Name'
        },
        {
          prop: 'address',
          label: 'Address'
        }
      ]);

      const load = (row, treeNode, resolve) => {
        setTimeout(() => {
          resolve([
            {
              id: 31,
              date: '2016-05-01',
              name: 'wangxiaohu',
              address: 'No. 189, Grove St, Los Angeles'
            },
            {
              id: 32,
              date: '2016-05-01',
              name: 'wangxiaohu',
              address: 'No. 189, Grove St, Los Angeles'
            }
          ]);
        }, 1000);
      };

      return {
        data,
        load,
        data2,
        columns
      };
    }
  };
</script>
```

:::

## 合计行

通过 `show-summary` 打开表格合计, `sum-text` 默认为 `"合计"`。

若表格展示的是各类数字，可以在显示各列的合计。可以通过 `summary-position` 配置 合计行的位置， 默认为 `bottom`。

如果需要自定义汇总数据，请传入一个 `summary-method`, 参数为 `{ columns, data }`。

::: demo

```vue
<template>
  <xs-table :columns="columns" :data="data" show-summary></xs-table>
  <xs-table
    :columns="columns"
    :data="data"
    show-summary
    :summary-method="getSummaries"
    summary-position="top"
  ></xs-table>
</template>
<script>
  import { ref } from 'vue';
  export default {
    setup() {
      const data = ref(
        Array.from({ length: 10 }).map((_, index) => ({
          date: `2023-01-1${index}`,
          age: index * 10 + 10,
          name: index % 2 === 0 ? 'Tom' : 'Jerry',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
          tag: 'Office'
        }))
      );
      const columns = ref([
        {
          prop: 'date',
          label: 'Date',
          sortable: true,
          filterable: true,
          filter: {
            type: 'time'
          }
        },
        {
          prop: 'name',
          label: 'Name',
          filterable: true,
          render: ({ column, row, rows, columns, $index }) =>
            `${row.name}-${rows.length}-${columns.length}-${column.prop}-${$index}`
        },
        {
          prop: 'age',
          label: 'Age',
          filterable: true,
          filter: {
            type: 'number',
            suffixLabel: '岁'
          }
        },

        {
          prop: 'address',
          label: 'Address',
          showOverflowTooltip: true
        }
      ]);

      const getSummaries = param => {
        const { columns, data } = param;
        const sums = [];
        columns.forEach((column, index) => {
          if (index === 0) {
            sums[index] = 'Total Cost';
            return;
          }
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => Number.isNaN(value))) {
            sums[index] = `$ ${values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!Number.isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0)}`;
          } else {
            sums[index] = 'N/A';
          }
        });

        return sums;
      };

      return {
        data,
        getSummaries,
        columns
      };
    }
  };
</script>
```

:::

## 合并行或列

多行或多列共用一个数据时，可以合并行或列。

通过给 table 传入`span-method`方法可以实现合并行或列， 方法的参数是一个对象，里面包含当前行 `row`、当前列 `column`、当前行号 `rowIndex`、当前列号 `columnIndex` 四个属性。 该函数可以返回一个包含两个元素的数组，第一个元素代表 `rowspan`，第二个元素代表 `colspan`。 也可以返回一个键名为 `rowspan` 和 `colspan` 的对象。

::: demo

```vue
<template>
  <xs-table :columns="columns" :span-method="arraySpanMethod" :data="data" border />
</template>
<script>
  import { ref } from 'vue';
  export default {
    setup() {
      const data = ref(
        Array.from({ length: 10 }).map((_, index) => ({
          date: `2023-01-1${index}`,
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }))
      );
      const columns = ref([
        {
          prop: 'date',
          label: 'Date'
        },
        {
          prop: 'name',
          label: 'Name'
        },
        {
          prop: 'address',
          label: 'Address'
        }
      ]);

      const arraySpanMethod = ({ row, column, rowIndex, columnIndex }) => {
        if (rowIndex % 2 === 0) {
          if (columnIndex === 0) {
            return [1, 2];
          } else if (columnIndex === 1) {
            return [0, 0];
          }
        }
      };

      return {
        data,
        columns,
        arraySpanMethod
      };
    }
  };
</script>
```

:::

## 自定义索引

自定义 type=index 列的行号。

通过给 type=index 的列传入 `index` 属性，可以自定义索引。 该属性传入数字时，将作为索引的起始值。 也可以传入一个方法，它提供当前行的行号（从 0 开始）作为参数，返回值将作为索引展示。

::: demo

```vue
<template>
  <xs-table :columns="columns" :data="data" />
</template>
<script>
  import { ref } from 'vue';
  export default {
    setup() {
      const data = ref(
        Array.from({ length: 5 }).map((_, index) => ({
          date: `2023-01-1${index}`,
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles'
        }))
      );
      const columns = ref([
        {
          type: 'index',
          index: idx => idx * 2
        },
        {
          prop: 'date',
          label: 'Date'
        },
        {
          prop: 'name',
          label: 'Name'
        },
        {
          prop: 'address',
          label: 'Address'
        }
      ]);

      return {
        data,
        columns
      };
    }
  };
</script>
```

:::

## 表头吸顶和横向滚动条吸底

通过属性 `stickyable` 可以指定表格表头是否吸顶，横向滚动条是否吸底。还可以通过 `offset`属性配置距离视口顶部的偏移量。
默认吸顶关闭的。

::: demo

```vue
<template>
  <xs-table stickyable :columns="columns" :data="data" :offset="73">
    <template #operations>
      <xs-button link type="danger" size="small">删除</xs-button>
    </template>
  </xs-table>
</template>
<script>
  import { ref } from 'vue';
  export default {
    setup() {
      const data = ref(
        Array.from({ length: 10 }).map((_, index) => ({
          date: `2023-01-1${index}`,
          name: 'Tom',
          state: 'California',
          city: 'Los Angeles',
          address: 'No. 189, Grove St, Los Angeles',
          zip: 'CA 90036',
          tag: 'Office'
        }))
      );
      const columns = ref([
        {
          prop: 'date',
          label: 'Date',
          width: 100,
          fixed: true
        },
        {
          prop: 'name',
          label: 'Name',
          width: 200
        },
        {
          prop: 'state',
          label: 'State',
          width: 200
        },
        {
          prop: 'city',
          label: 'City',
          width: 200
        },
        {
          prop: 'address',
          label: 'Address',
          width: 600
        },
        {
          slot: 'operations',
          label: 'Operations',
          width: 120,
          fixed: 'right'
        }
      ]);

      return {
        data,
        columns
      };
    }
  };
</script>
```

:::

## 预设的数据形态

### 1. createProgressCell 进度条，表示占比

`参数：{ value = 单元格的值, formatter = 值的格式化函数, max = 本字段对应的最大值，用来计算进度, animated = 是否启用动画效果 }`
![sXzzVm](https://picture.zhuiyue.vip:444/images/2023/02/07/sXzzVm.png)

![ojedv6](https://picture.zhuiyue.vip:444/images/2023/02/07/ojedv6.png)

### 2. createColorFontCell 带颜色的文字，表示上升和下降

`参数：({ value = 同上, formatter = 同上, isPositive = 是否显示为积极色 })`

![V2XNce](https://picture.zhuiyue.vip:444/images/2023/02/07/V2XNce.png)

![8rSNdz](https://picture.zhuiyue.vip:444/images/2023/02/07/8rSNdz.png)

### 3. createColorBlockCell 色块，表示上升和下降

`参数：{ value = 同上, formatter = 同上, base = 基础值，大于该值为积极色，小于该值为消极色, align = 对齐方式 }`

![l0bNjD](https://picture.zhuiyue.vip:444/images/2023/02/07/l0bNjD.png)

![ashw4T](https://picture.zhuiyue.vip:444/images/2023/02/07/ashw4T.png)

### 4. createAverageCell 大于平均值的数据才着色

`参数：{ average = 平均值, value = 同上, formatter = 同上 }`

![rqNUra](https://picture.zhuiyue.vip:444/images/2023/02/07/rqNUra.png)

![R6llDv](https://picture.zhuiyue.vip:444/images/2023/02/07/R6llDv.png)

### 5. createTooltipCell 带小窗口的单元格

`参数：(text = 单元格内容，可以是一个组件, content = tooltip 内容)`

![jZFxWE](https://picture.zhuiyue.vip:444/images/2023/02/07/jZFxWE.png)

![tfCRk8](https://picture.zhuiyue.vip:444/images/2023/02/07/tfCRk8.png)

### 6. createTooltipListCell 带有数据明细窗口的单元格

`参数：(text = 单元格内容，可以是一个组件, list = 明细列表，如下图, showRoi = 是否展示roi列)`

![esUzkM](https://picture.zhuiyue.vip:444/images/2023/02/07/esUzkM.png)

![s2qYpR](https://picture.zhuiyue.vip:444/images/2023/02/07/s2qYpR.png)

### 7. createSalaryCell 特殊色块，用于表示薪水

`参数：{ value = 同上, formatter = 同上, base = 基础值，大于该值为积极色，小于该值为消极色, align = 对齐方式 }`

![5iTuPP](https://picture.zhuiyue.vip:444/images/2023/02/07/5iTuPP.png)

![RIkdID](https://picture.zhuiyue.vip:444/images/2023/02/07/RIkdID.png)

### 8. createWarningCell 带有警告图标的单元格

`参数： ({ value = 同上, formatter = 同上, content = 警告内容,  showWarning = 是否展示警告图标})`

![n4pny7](https://picture.zhuiyue.vip:444/images/2023/02/07/n4pny7.png)

![tHt9lE](https://picture.zhuiyue.vip:444/images/2023/02/07/tHt9lE.png)

### 9. createTrendCell 带有趋势图标的单元格

`参数：({ value = 同上, formatter = 同上, base = 基础值，大于该值为上升趋势，小于该值为下降趋势 })`

![yAJPKq](https://picture.zhuiyue.vip:444/images/2023/02/07/yAJPKq.png)

![mTHgw1](https://picture.zhuiyue.vip:444/images/2023/02/07/mTHgw1.png)

## 属性

| 参数                      | 说明                                        | 类型           | 可选值                                                                                                                                                           | 默认值                    |
| ------------------------- | ------------------------------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| columns                   | 列的配置                                    | Array          | 见下方的 **列属性** 章节                                                                                                                                         |                           |
| loading                   | 是否处于加载状态                            | Boolean        |                                                                                                                                                                  | false                     |
| skeletonRows              | 骨架屏渲染行数                              | Number         |                                                                                                                                                                  | 20                        |
| stickyable                | 该表格是否可以吸顶；                        | Boolean        |                                                                                                                                                                  | false                     |
| offset                    | 表格吸顶的偏移量                            | Number         |                                                                                                                                                                  | 0                         |
| themeColor                | 表头主题色                                  | String         |                                                                                                                                                                  |                           |
| pagination                | 表格是否分页                                | Boolean/Object | 默认的分页： `{ position: 'flex-end', pageSizes: [10, 25, 50], pageSize: 25, layout: 'total, sizes, prev, pager, next, jumper'}`，传入配置对象时将和默认配置合并 | true                      |
| sort                      | 排序, 支持外部控制表格内的排序              | Object         |                                                                                                                                                                  | `{ prop: '', order: '' }` |
| filter                    | 筛选项                                      | Object         | prop 为 key，value 为筛选值构成的数组 的一个对象                                                                                                                 |                           |
| stripeIndex               | 斑马纹的起始行号，                          | Number         | 0， 1                                                                                                                                                            | 0                         |
| useInnerSort              | 是否使用表格内部的排序                      | Boolean        | 如果需要后端排序，则需要监听排序事件并请求接口，把数据赋值给表格回显                                                                                             | true                      |
| useInnerFilter            | 是否使用表格内部的筛选                      | Boolean        | 如果需要后端筛选，则需要监听筛选事件并请求接口，把数据赋值给表格回显                                                                                             | true                      |
| timeProps                 | 指定哪些字段排序时按时间排序                | Array          |                                                                                                                                                                  |                           |
| numberClassName           | 数字类型的单元格的 class 名称               | String         |                                                                                                                                                                  | xs-table-cell\_\_number   |
| textClassName             | 文本类型的单元格 class 属性名               | String         |                                                                                                                                                                  | xs-table-cell\_\_number   |
| summaryPosition           | 汇总行位置                                  | string         | bottom ，top                                                                                                                                                     | bottom                    |
| resetPositionOnDataChange | 数据变化时是否重置垂直滚动条                | Boolean        |                                                                                                                                                                  | false                     |
| scrollbarOffsetBottom     | 滚动条吸底时，距离视口底部的距离， 默认为 0 | Number,String  |                                                                                                                                                                  | 0                         |

以下为原有的 el-table 的属性，不支持的属性已被画了红线。

![4sVYO2](https://picture.zhuiyue.vip:444/images/2023/02/07/4sVYO2.png)
![rMqR50](https://picture.zhuiyue.vip:444/images/2023/02/07/rMqR50.png)
![gGM0Qd](https://picture.zhuiyue.vip:444/images/2023/02/07/gGM0Qd.png)
![1b6Sf6](https://picture.zhuiyue.vip:444/images/2023/02/07/1b6Sf6.png)

## 表格事件

| 事件                | 说明                                     | 回调参数                                                             |
| ------------------- | ---------------------------------------- | -------------------------------------------------------------------- |
| popover-confirm     | 单列筛选时触发                           | `{ column, value, prop }`                                            |
| popover-cancel      | 取消单列筛选时触发                       | `{ column, prop }`                                                   |
| sticky-change       | 吸顶状态变化时触发                       | isSticky                                                             |
| current-data-change | 表格显示的数据变化时                     | `{ data }`                                                           |
| scroll              | 滚动时触发                               | `{ scrollLeft, position }`                                           |
| sort-change         | 排序变化时触发                           | `{ prop, order }`                                                    |
| filter-change       | 筛选变化时触发                           |                                                                      |
| header-click        | 表头点击时触发                           | `{ column, prop }`                                                   |
| current-change      | 当表格的当前行发生变化的时候会触发该事件 | `{ currentRow, oldCurrentRow, currentRowIndex, oldCurrentRowIndex }` |

![dAnylL](https://picture.zhuiyue.vip:444/images/2023/02/07/dAnylL.png)
![HPZdmf](https://picture.zhuiyue.vip:444/images/2023/02/07/HPZdmf.png)

## 表格方法

原 `el-table` 下的方法挂载在 `tableRef`

| 方法          | 说明                                                                                  | 回调参数 |
| ------------- | ------------------------------------------------------------------------------------- | -------- |
| clearFilter   | 传入 prop 时清除指定的筛选，不传则清除所有筛选                                        |          |
| setCurrentRow | 用于单选表格，设定某一行为选中行， 如果调用时不加参数，则会取消目前高亮行的选中状态。 | rowIndex |

![vpGIST](https://picture.zhuiyue.vip:444/images/2023/02/07/vpGIST.png)

## 表格插槽

| 插槽                     | 说明                                                                                                                                    |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| append                   | 插入至表格最后一行之后的内容， 如果需要对表格的内容进行无限滚动操作，可能需要用到这个 slot。 若表格有合计行，该 slot 会位于合计行之上。 |
| empty                    | 当数据为空时自定义的内容                                                                                                                |
| paginationLeft           | 分页左侧内容                                                                                                                            |
| paginationRight          | 分页右侧的内容                                                                                                                          |
| \`${column.group}Empty\` | 当一组的数据都为空时（跨页判断）自定义的内容                                                                                            |
| \`${column.slot}\`       | 列自定义内容, 参数：`{ column, row, rows, columns, $index }`                                                                            |
| \`${column.slotLabel}\`  | 列头自定义内容，参数：column                                                                                                            |

## 列属性

在 columns 配置中，需要使用属性的驼峰命名。如：`showOverflowTooltip`

| 参数         | 说明                                             | 类型     | 可选值                                               | 默认值                                                                                                                                                                                                                                      |
| ------------ | ------------------------------------------------ | -------- | ---------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| slot         | 指定本列的 slot                                  | string   | 插槽的参数：`{ column, row, rows, columns, $index }` |                                                                                                                                                                                                                                             |
| slotLabel    | 指定本列的列头的 slot                            | string   |                                                      |                                                                                                                                                                                                                                             |
| sortable     | 本列是否开启排序                                 | Boolean  |                                                      | false                                                                                                                                                                                                                                       |
| background   | 表头背景色                                       | string   |                                                      |                                                                                                                                                                                                                                             |
| children     | 子列的集合                                       | Array    |                                                      |                                                                                                                                                                                                                                             |
| filter       | 筛选面板的一些配置                               | Object   |                                                      | `{inputCount: 1,placeholder: '请输入',placeholderAlign: 'left',cancelBtnText: '清除',confirmBtnText: '确定',showCancelBtn: true, // 默认不显示清除按钮, sortSubTitle: '',filterSubTitle: '',suffixLabel: '',type: 'input',multiple: false}` |
| filterMethod | 筛选方法，除非你要自定义筛选，否则用不到这个属性 | function |                                                      |                                                                                                                                                                                                                                             |
| render       | 单元格的渲染方法                                 | function | 回调参数：`{ column, row, rows, columns, $index }`   |                                                                                                                                                                                                                                             |
| renderLabel  | 列头的渲染方法                                   | function | 回调参数：`column`                                   |                                                                                                                                                                                                                                             |

renderLabel

![k7GO0V](https://picture.zhuiyue.vip:444/images/2023/02/07/k7GO0V.png)
![e8tgpK](https://picture.zhuiyue.vip:444/images/2023/02/07/e8tgpK.png)
![qYhYlj](https://picture.zhuiyue.vip:444/images/2023/02/07/qYhYlj.png)
![hehiXQ](https://picture.zhuiyue.vip:444/images/2023/02/07/hehiXQ.png)
