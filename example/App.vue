<template>
  <div>
    <xs-card header="商品总览"> 商品总览数据 </xs-card>
    <xs-card header="商品总览">
      商品总览数据

      <template #extra>
        <xs-button type="primary">更多数据</xs-button>
      </template>
    </xs-card>

    <xs-card header="商品总览">
      <template #header>
        <span>商品总览标题</span>
      </template>

      <template #sub-header>
        <span>商品总览副标题</span>
      </template>

      <template #extra>
        <span>1223</span>
      </template>
      商品总览数据
    </xs-card>
  </div>
</template>
<script setup>
  // import { ref } from 'vue';
</script>

<style scoped></style>
