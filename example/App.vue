<template>
  <xs-date-picker v-model="value" v-model:type="type" :first-day-of-week="4" :layout="['date', 'week']" />

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
