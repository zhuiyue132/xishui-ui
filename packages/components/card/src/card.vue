<template>
  <div :class="[ns.b(), ns.is('border', border)]">
    <header v-if="hasHeader" :class="ns.e('header')">
      <div :class="[ns.m('header--content')]">
        <slot name="header">
          <div v-if="header" :class="ns.e('title')">{{ header }}</div>
        </slot>
        <slot name="sub-header" />
      </div>

      <span :class="ns.e('extra')">
        <slot name="extra" />
      </span>
    </header>
    <slot></slot>
  </div>
</template>
<script>
  export default {
    name: 'XsCard'
  };
</script>
<script setup>
  import { computed, useSlots } from 'vue';
  import { useNamespace } from '@xishui-ui/hooks';
  import { Props } from './card';

  const ns = useNamespace('card');
  const slots = useSlots();

  const props = defineProps(Props);

  const hasHeader = computed(() => {
    return [props.header, slots.header, slots.subHeader, slots.extra].some(Boolean);
  });
</script>
