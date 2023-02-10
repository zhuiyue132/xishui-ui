<template>
  <xs-card>11223 </xs-card>
  <xs-button type="primary" @click="setCurrentRow">123</xs-button>

  <xs-table
    ref="tableRef"
    :columns="columns2"
    :data="data"
    highlight-current-row
    stickyable
    @current-change="onCurrentChange"
  >
    <template #tagLabel>
      <xs-button type="link">自定义头部</xs-button>
    </template>

    <template #userNameEmpty>
      自定义分组的空状态
      <xs-empty icon="no-wifi" description="你网线被拔了...">
        <xs-button type="primary">请上传报表数据</xs-button>
      </xs-empty>
    </template>
  </xs-table>
</template>

<script setup>
  import { ref } from 'vue';
  import {
    createProgressCell,
    formatNumber,
    createColorFontCell,
    createColorBlockCell,
    createAverageCell,
    createTooltipCell,
    createTooltipListCell,
    createSalaryCell,
    createWarningCell,
    createTrendCell,
    createTooltipLabel
  } from '../packages/components';

  const data = ref(
    Array.from({ length: 200 }).map((_, index) => ({
      rank: index,
      max: 10,
      age: Math.random() * 10,
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
  const onCurrentChange = row => {
    console.log(row);
  };

  const tableRef = ref();

  const setCurrentRow = () => {
    tableRef.value.setCurrentRow(1);
  };

  const columns2 = ref([
    {
      prop: 'rank',
      label: 'Rank',
      fixed: true,
      width: 100,
      render: ({ row }) => {
        return createColorFontCell({
          value: row.rank,
          isPositive: row.rank % 2 === 0
        });
      }
    },
    {
      prop: 'rank',
      label: 'Rank',
      width: 100,
      render: ({ row }) => {
        return createColorBlockCell({
          value: row.rank,
          base: 5
        });
      }
    },
    {
      prop: 'rank',
      label: 'Rank',
      width: 100,
      render: ({ row }) => {
        return createAverageCell({
          value: row.rank,
          average: 3
        });
      }
    },

    {
      prop: 'rank',
      label: 'RankTooltip',
      width: 100,
      fixed: 'right',
      render: ({ row }) => {
        return createTooltipCell(
          createColorBlockCell({
            value: row.rank
          }),
          '我是tooltip'
        );
      }
    },
    {
      prop: 'rank',
      label: 'RankTooltip',
      width: 100,
      fixed: 'right',
      render: ({ row }) => {
        return createTooltipListCell(
          createColorBlockCell({
            value: row.rank
          }),
          [
            { roi: null, name: '淘宝客', cost: '8899' },
            { roi: 222.2, name: '淘宝客', cost: '28899' },
            { roi: 1112.2, name: '销售推广费用', cost: '8899' },
            { roi: 999912.2, name: '销售推广费用', cost: '8899' }
          ],
          true
        );
      }
    },
    {
      prop: 'rank',
      label: '薪水',
      filterable: true,
      sortable: true,
      width: 100,
      renderLabel(column) {
        return createTooltipLabel(column.label + '', '按支付时间统计的订单销售额总额');
      },
      render: ({ row }) => {
        return createSalaryCell({
          value: row.rank,
          base: 2
        });
      }
    },
    {
      prop: 'rank',
      label: '警告',
      width: 100,
      align: 'right',
      render: ({ row }) => {
        return createWarningCell({
          value: row.rank,
          showWarning: row.rank > 1
        });
      }
    },

    {
      prop: 'rank',
      label: '趋势',
      width: 100,
      align: 'right',
      render: ({ row }) => {
        return createTrendCell({
          value: row.rank,
          base: 1
        });
      }
    },
    {
      prop: 'age',
      label: 'age',
      fixed: true,
      width: 100,
      align: 'right',
      filterable: true,
      filter: {
        type: 'select'
      },
      render: ({ row }) => {
        return createProgressCell({
          value: row.age,
          max: 10,
          formatter: formatNumber
        });
      }
    },

    {
      prop: 'date',
      label: 'Date',
      fixed: true,
      width: 150
    },

    {
      prop: 'address',
      label: 'Address',
      width: 800,
      showOverflowTooltip: true
    }
  ]);
  console.log(data);
</script>
