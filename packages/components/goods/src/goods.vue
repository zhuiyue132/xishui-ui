<template>
  <div :class="ns.b()">
    <xs-avatar :src="_src" shape="square" :size="size" :class="ns.e('image')">
      <template #error>
        <slot name="error"></slot>
      </template>
    </xs-avatar>

    <div :class="[ns.e('content'), ns.m(`row-${rows}`)]">
      <slot>
        <a
          :href="data[prop.link]"
          :class="[ns.e('link')]"
          target="_blank"
          :linkable="!!data[prop.link]"
          rel="noopener noreferrer"
        >
          {{ _name }}
        </a>
      </slot>
    </div>
  </div>
</template>
<script>
  import XsAvatar from '@xishui-ui/components/avatar';
  export default {
    name: 'XsGoods',
    components: {
      XsAvatar
    }
  };
</script>

<script setup>
  import { computed } from 'vue';
  import { defaultProp, Props } from './goods';
  import { useNamespace } from '@xishui-ui/hooks';

  const props = defineProps(Props);
  const prop = computed(() => ({ ...defaultProp, ...props.prop }));

  const ns = useNamespace('goods');
  const _src = computed(() => {
    return props.data[prop.value.url];
  });

  const _name = computed(() => {
    return props.name || props.data[prop.value.name];
  });
</script>
