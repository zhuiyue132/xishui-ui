<template>
  <div :class="ns.b()">
    <xs-tab-pane
      v-for="item in tabs"
      :key="item.name"
      :label="item.label"
      :name="item.name"
      :disabled="item.disabled ?? false"
      :current="currentTab"
      @click="handleClick(item)"
    >
      <template v-if="slots[item.name]" #[item.name]>
        <slot :name="item.name"></slot>
      </template>
    </xs-tab-pane>
  </div>
</template>
<script>
  export default {
    name: 'XsTabs'
  };
</script>

<script setup>
  import { computed, useSlots } from 'vue';
  import { useNamespace } from '@xishui-ui/hooks';
  import { Props, Emits } from './tabs';
  import { isObj } from '@xishui-ui/utils';
  import XsTabPane from './tab-pane.vue';

  const ns = useNamespace('tabs');

  const props = defineProps(Props);
  const emits = defineEmits(Emits);

  const slots = useSlots();

  const handleClick = ({ name: val, disabled }) => {
    if (disabled) return;
    const canLeave = props.beforeLeave(val, currentTab.value);
    if (!canLeave) return;
    emits('tab-change', val);
    emits('update:modelValue', val);
  };

  const currentTab = computed(() => props.modelValue);

  const tabs = computed(() => {
    const { label, name } = props.prop;
    return props.tabList.map(tab => {
      if (isObj(tab)) {
        return { label: tab[label], name: tab[name], disabled: tab.disabled ?? false };
      }
      return { label: tab, name: tab };
    });
  });
</script>
