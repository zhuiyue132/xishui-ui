<template>
  <button
    :class="[
      ns.b(),
      ns.m(_type),
      ns.m(_size),
      ns.is('disabled', _disabled),
      ns.is('plain', plain),
      ns.is('round', round),
      ns.is('circle', circle)
    ]"
    :type="nativeType"
    :aria-disabled="_disabled"
    :disabled="_disabled"
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

<script>
  export default {
    name: 'XsButton'
  };
</script>

<script setup>
  import { computed } from 'vue';
  import { Props, Emits } from './button';
  import { useNamespace, useSize, useDisabled } from '@xishui-ui/hooks';

  const props = defineProps(Props);
  const emits = defineEmits(Emits);

  const ns = useNamespace('button');
  const _size = useSize(computed(() => props?.size));

  const _type = computed(() => props.type || '');
  const _disabled = useDisabled();

  const handleClick = evt => {
    const { disabled } = props;
    if (disabled) return;
    emits('click', evt);
  };
</script>
