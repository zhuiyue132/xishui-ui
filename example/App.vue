<template>
  <div>
    <xs-date-picker v-model="time" v-model:type="timeType" limit-start-date="2022-10-31" />

    <br />

    {{ timeType }} {{ JSON.stringify(time) }}
  </div>
</template>
<script setup>
  import { ref } from 'vue';
  const timeType = ref('date');
  const time = ref([]);
</script>

<style scoped></style>
