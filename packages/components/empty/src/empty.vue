<template>
  <div :class="ns.b()">
    <div :class="ns.e('image')" :style="_style">
      <slot name="image">
        <img :src="_icon" ondragstart="return false" />
      </slot>
    </div>
    <div :class="ns.e('description')">
      <slot name="description">
        <p>{{ _description }}</p>
      </slot>
    </div>
    <div v-if="$slots.default" :class="ns.e('bottom')">
      <slot />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'XsEmpty'
  };
</script>
<script setup>
  import { computed } from 'vue';
  import { useNamespace } from '@xishui-ui/hooks';
  import { emptyProps, svgs } from './empty';
  import { addUnit } from '@xishui-ui/utils';

  const props = defineProps(emptyProps);

  const ns = useNamespace('empty');

  const _description = computed(() => props.description);

  const _style = computed(() => ({
    width: addUnit(+props.size)
  }));

  const _icon = computed(() => {
    const { icon, image } = props;
    if (image) {
      return image;
    }
    return svgs[`${icon}`] ?? svgs['no-data'];
  });
</script>
