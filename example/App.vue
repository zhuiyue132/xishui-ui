<template>
  <div>
    <xs-date-picker v-model="time" v-model:type="timeType" shortcuts-enable />

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
