<template>
  <div style="width: 1000px">
    <xs-tabs v-model="tab" :tab-list="list">
      <template #key1>
        <div> hello slot </div>
      </template>
    </xs-tabs>

    <!-- <xs-scrollbar max-height="500px" wrap-class="test" view-class="test2">
      <p v-for="item in 20" :key="item" class="scrollbar-demo-item">{{ item }}</p>
    </xs-scrollbar> -->
    <div style="height: 2000px"></div>
    <xs-scrollbar always stickyable>
      <div style="width: 1000px">
        <p v-for="item in 100" :key="item" class="scrollbar-demo-item">{{ item }}</p>
      </div>
    </xs-scrollbar>

    <div style="height: 1000px"></div>
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

<style scoped>
  .scrollbar-demo-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    width: 1700px;
    margin: 10px;
    text-align: center;
    border-radius: 4px;
    background: var(--xs-color-primary-light-9);
    color: var(--xs-color-primary);
  }
</style>
