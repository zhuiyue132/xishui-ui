<template>
  <button class="xs-button" :class="classList" :type="nativeType"  :disabled="disabled"
    @click="handlerClick">
    <slot></slot>
  </button>
</template>

<script setup name="XSButton">
import { computed } from "vue"
import { Props, Emits } from "./button"

const props = defineProps(Props)
const emits = defineEmits(Emits)

const classList = computed(() => {
  const {
    type,
    size,
    round,
    plain,
    circle,
    disabled,
    nativeType,
  } = props
  return [
    {
      [`xs-button--${type}`]: type,
      [`xs-button--${size}`]: size,
      [`is-disabled`]: disabled,
      [`is-round`]: round,
      [`is-plain`]: plain,
      [`is-circle`]: circle,
    },
  ]
});

const handlerClick = (evt) => {
  emits("click", evt)
}
</script>
