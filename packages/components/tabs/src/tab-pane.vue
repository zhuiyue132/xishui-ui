<template>
  <div
    :id="`pane-${paneName}`"
    :class="[ns.b(), ns.is('active', _active), ns.is('disabled', disabled)]"
    role="tabpanel"
  >
    <slot v-if="slots[paneName]" :name="paneName" />
    <span v-else>{{ label }}</span>
  </div>
</template>

<script>
  export default {
    name: 'XsTabPane'
  };
</script>
<script setup>
  import { useNamespace } from '@xishui-ui/hooks';
  import { computed, useSlots } from 'vue';
  const props = defineProps({
    label: {
      type: String,
      default: ''
    },
    name: {
      type: [String, Number],
      default: ''
    },
    current: {
      type: [String, Number],
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  });

  const ns = useNamespace('tab-pane');
  const slots = useSlots();
  const paneName = computed(() => props.name);
  const _active = computed(() => props.current === paneName.value);
</script>
