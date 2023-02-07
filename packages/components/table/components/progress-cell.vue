<template>
  <div :class="ns.b()">
    <div class="count">
      {{ formatter(value) }}
    </div>
    <div class="progress" :style="_style">
      <div v-if="animated" class="move"></div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'XsProgressCell'
  };
</script>
<script setup>
  import { computed } from 'vue';
  import { formatOriginal } from '../utils';
  import { useNamespace } from '@xishui-ui/hooks';

  const props = defineProps({
    value: {
      type: [Number, String],
      default: ''
    },
    width: {
      type: [Number, String],
      default: 0
    },
    formatter: {
      type: Function,
      default: formatOriginal
    },
    animated: {
      type: Boolean,
      default: true
    },
    prefix: {
      type: String,
      default: ''
    },
    suffix: {
      type: String,
      default: ''
    }
  });

  const ns = useNamespace('progress-cell');

  const _style = computed(() => {
    const { width } = props;
    return {
      width
    };
  });
</script>
