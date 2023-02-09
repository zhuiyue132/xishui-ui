<template>
  <el-tooltip v-bind="$attrs" :disabled="disabled" :content="content" placement="top">
    <div :class="ns.b() + '__wrapper'">
      <div :class="_class" @mouseenter.stop="onMouseEnter">
        {{ text || content }}
      </div>
    </div>
  </el-tooltip>
</template>

<script>
  import { ElTooltip } from 'element-plus';
  export default {
    name: 'XsTooltip',
    components: {
      ElTooltip
    }
  };
</script>

<script setup>
  import { ref, computed } from 'vue';
  import { useNamespace } from '@xishui-ui/hooks';

  const props = defineProps({
    content: {
      type: String,
      required: true
    },
    text: {
      type: String,
      default: ''
    },
    rows: {
      type: Number,
      default: 1
    },
    auto: {
      type: Boolean,
      default: true
    }
  });

  const ns = useNamespace('tooltip');

  const _class = computed(() => {
    const { rows = 1 } = props;
    return [ns.b(), `rows-${rows}`];
  });

  const disabled = ref(false);

  const onMouseEnter = evt => {
    if (!props.auto) return;
    const { scrollWidth, offsetWidth, scrollHeight, clientHeight } = evt.target;

    if (props.rows > 1) {
      disabled.value = scrollHeight - clientHeight < clientHeight / props.rows;
    } else {
      disabled.value = scrollWidth <= offsetWidth;
    }
  };
</script>
