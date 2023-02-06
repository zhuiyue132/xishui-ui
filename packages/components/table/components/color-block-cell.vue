<template>
  <div :class="[ns.b()]">
    <div class="count" :class="[_class]" :style="{ textAlign: align }">{{ formatter(value) }}</div>
  </div>
</template>
<script>
  export default {
    name: 'XsColorBlockCell'
  };
</script>
<script setup>
  import { computed } from 'vue';
  import { formatOriginal } from '../utils';
  import { useNamespace } from '@xishui-ui/hooks';

  const props = defineProps({
    formatter: {
      type: Function,
      default: formatOriginal
    },
    value: {
      type: [Number, String],
      default: ''
    },
    align: {
      type: String,
      default: 'right',
      validator: val => ['left', 'center', 'right'].includes(val)
    },
    base: {
      type: Number,
      default: 0
    }
  });

  const ns = useNamespace('color-block');

  const _class = computed(() => {
    const { value, base } = props;
    if (+value === base) {
      return 'normal';
    }
    return +value > base ? 'positive' : 'negitive';
  });
</script>
