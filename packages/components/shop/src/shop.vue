<template>
  <span :class="[ns.b()]">
    <slot name="image">
      <xs-avatar :src="icon" shape="square" :size="size" :class="ns.e('image')">
        <template #error>
          <slot name="error"></slot>
        </template>
      </xs-avatar>
    </slot>

    <slot>
      <a :href="data[prop.link]" :class="[ns.e('link')]" target="_blank" rel="noopener noreferrer"> {{ _name }}</a>
    </slot>
  </span>
</template>

<script>
  import XsAvatar from '@xishui-ui/components/avatar';

  export default {
    name: 'XsShop',
    components: {
      XsAvatar
    }
  };
</script>

<script setup>
  import { computed } from 'vue';
  import { defaultProp, Props } from './shop';
  import { useNamespace, usePlatform } from '@xishui-ui/hooks';
  const props = defineProps(Props);
  const prop = computed(() => ({ ...defaultProp, ...props.prop }));

  const ns = useNamespace('shop');
  const icon = computed(() => {
    return props.src || usePlatform(props.data[prop.value.platform])?.icon;
  });

  const _name = computed(() => {
    return props.name || props.data[prop.value.name];
  });
</script>
