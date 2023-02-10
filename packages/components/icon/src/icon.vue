<template>
  <svg v-if="iconName" :class="[ns.b(), ns.is('loading', !!loading)]" aria-hidden="true" :style="style" v-bind="$attrs">
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<script>
  export default {
    name: 'XsIcon',
    inheritAttrs: false
  };
</script>

<script setup>
  import { computed } from 'vue';
  import { useNamespace } from '@xishui-ui/hooks';
  import { Props } from './icon';
  import { addUnit, isUndefined } from '@xishui-ui/utils';

  const ns = useNamespace('icon');
  const props = defineProps(Props);

  const prefix = computed(() => props.prefix);
  const iconName = computed(() => {
    return props.name ? `#${prefix.value}${props.name}` : '';
  });

  const style = computed(() => {
    if (!props.size && !props.color) return {};

    return {
      fontSize: isUndefined(props.size) ? undefined : addUnit(props.size),
      '--color': props.color
    };
  });
</script>
