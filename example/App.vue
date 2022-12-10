<template>
  <div>
    <xs-tabs v-model="tab" :tab-list="list">
      <template #key1>
        <div> hello slot </div>
      </template>
    </xs-tabs>

    <xs-icon name="enterpriseSituation" color="red" size="100" loading />
    <br />
    <br />
    <xs-icon prefix="svg-icon-" name="TableSortUp" size="100" color="red" loading></xs-icon>
    <br />
    <br />
    <xs-icon name="close" color="red" size="100" loading />
  </div>
</template>
<script setup>
  import { ref } from 'vue';
  const list = [
    { name: 'key1', label: '标签1', disabled: true },
    { name: 'key2', label: '标签2' },
    { name: 'key3', label: '标签3', disabled: true },
    { name: 'key4', label: '标签4' }
  ];
  const tab = ref('key2');
</script>
