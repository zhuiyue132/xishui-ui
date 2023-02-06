<template>
  <xs-table :columns="columns2" :data="data">
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
    createTooltipListCell
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

  const columns2 = ref([
    {
      prop: 'rank',
      label: 'Rank',
      fixed: true,
      width: 100,
      render: ({ row }) => {
        return createColorFontCell({
          value: row.rank,
          isPositive: row.rank > 15
        });
      }
    },
    {
      prop: 'rank',
      label: 'Rank',
      width: 100,
      render: ({ row }) => {
        return createColorBlockCell({
          value: row.rank
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
          average: 10
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
      prop: 'age',
      label: 'age',
      fixed: true,
      width: 100,
      align: 'right',
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
          sortable: true
        },
        {
          prop: 'zip',
          label: '继承name的颜色',
          align: 'center'
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
          align: 'center'
        },
        {
          prop: 'zip2',
          label: 'Zip',
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
          sortable: true
        },
        {
          prop: 'zip3',
          label: '继承name的颜色',
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
  console.log(data);
</script>
