<template>
  <span :class="[ns.b(), _class]"> {{ formatter(value) }}</span>
</template>

<script>
  export default {
    name: 'XsColorFontCell'
  };
</script>
<script setup>
  import { computed } from 'vue';
  import { useNamespace } from '@xishui-ui/hooks';
  import { formatOriginal } from '../utils';

  const props = defineProps({
    value: {
      type: [Number, String],
      default: ''
    },
    isPositive: {
      type: Boolean,
      default: false
    },
    formatter: {
      type: Function,
      default: formatOriginal
    }
  });
  const ns = useNamespace('color-font');

  const _class = computed(() => {
    const { isPositive, value } = props;
    if (+value === 0) return 'normal';
    return isPositive ? 'positive' : 'negitive';
  });
</script>
