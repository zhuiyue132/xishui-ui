<template>
  <el-avatar v-bind="$attrs" :src="src">
    <slot />
  </el-avatar>
</template>
<script>
  import { ElAvatar } from 'element-plus';

  export default {
    name: 'XsAvatar',
    inheritAttrs: false,
    components: {
      ElAvatar
    }
  };
</script>
<script setup>
  import { useAttrs, computed } from 'vue';
  import { Props } from './avatar';

  const $attrs = useAttrs();
  const props = defineProps(Props);

  const hasSrc = computed(() => {
    return !!$attrs.src;
  });

  const src = computed(() => {
    if (hasSrc.value) return $attrs.src;
    const { name } = props;
    if (!name) return;
    return getAvatar();
  });

  const name = computed(() => {
    const { from, count } = props;
    const nameCrop = count * (from === 'start' ? 1 : -1);
    return nameCrop > 0 ? props.name.slice(0, nameCrop) : props.name.slice(nameCrop);
  });

  const getColorByName = name => {
    const { colors } = props;
    const allCharCodes = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[allCharCodes % colors.length];
  };

  const getAvatar = () => {
    let canvas = document.createElement('canvas');
    canvas.width = canvas.height = 200 * window.devicePixelRatio;
    const context = canvas.getContext('2d');

    context.fillStyle = getColorByName(props.name);
    context.fillRect(0, 0, canvas.width, canvas.height);
    const fontSize = Math.round(canvas.width / (1 + name.value.length));
    context.font = `bold ${fontSize}px/1 Microsoft Yahei`;

    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillStyle = '#FFF';
    context.fillText(`${name.value || ''}`.replace(/\s+/g, ''), canvas.width / 2, canvas.height / 2);
    return canvas.toDataURL();
  };
</script>
