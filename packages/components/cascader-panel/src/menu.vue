<template>
  <xs-scrollbar
    :key="menuId"
    tag="ul"
    role="menu"
    :class="ns.b()"
    :wrap-class="ns.e('wrap')"
    :view-class="[ns.e('list'), ns.is('empty', isEmpty)]"
    always
    @mousemove="handleMouseMove"
    @mouseleave="clearHoverZone"
  >
    <xs-cascader-node v-for="node in nodes" :key="node.uid" :node="node" :menu-id="menuId" @expand="handleExpand" />
    <div v-if="isLoading" :class="ns.e('empty-text')"> 加载中... </div>
    <div v-else-if="isEmpty" :class="ns.e('empty-text')"> 暂无数据 </div>
    <svg v-else-if="panel?.isHoverMenu" ref="hoverZone" :class="ns.e('hover-zone')"></svg>
  </xs-scrollbar>
</template>
<script>
  import { computed, defineComponent, getCurrentInstance, inject, ref } from 'vue';
  import XsScrollbar from '@xishui-ui/components/scrollbar';
  import XsCascaderNode from './node.vue';
  import { useNamespace } from '@xishui-ui/hooks';
  import { CASCADER_PANEL_INJECTION_KEY } from './types';

  export default defineComponent({
    name: 'XsCascaderMenu',

    components: {
      XsScrollbar,
      XsCascaderNode
    },

    props: {
      nodes: {
        type: Array,
        required: true
      },
      index: {
        type: Number,
        required: true
      }
    },

    setup(props) {
      const instance = getCurrentInstance();
      const ns = useNamespace('cascader-menu');
      const id = Math.floor(Math.random() * 10000);

      let activeNode = null;
      let hoverTimer = null;

      const panel = inject(CASCADER_PANEL_INJECTION_KEY);

      const hoverZone = ref(null);

      const isEmpty = computed(() => !props.nodes.length);
      const isLoading = computed(() => !panel.initialLoaded);
      const menuId = computed(() => `cascader-menu-${id}-${props.index}`);

      const handleExpand = e => {
        activeNode = e.target;
      };

      const handleMouseMove = e => {
        if (!panel.isHoverMenu || !activeNode || !hoverZone.value) return;

        if (activeNode.contains(e.target)) {
          clearHoverTimer();

          const el = instance.vnode.el;
          const { left } = el.getBoundingClientRect();
          const { offsetWidth, offsetHeight } = el;
          const startX = e.clientX - left;
          const top = activeNode.offsetTop;
          const bottom = top + activeNode.offsetHeight;

          hoverZone.value.innerHTML = `
          <path style="pointer-events: auto;" fill="transparent" d="M${startX} ${top} L${offsetWidth} 0 V${top} Z" />
          <path style="pointer-events: auto;" fill="transparent" d="M${startX} ${bottom} L${offsetWidth} ${offsetHeight} V${bottom} Z" />
        `;
        } else if (!hoverTimer) {
          hoverTimer = window.setTimeout(clearHoverZone, panel.config.hoverThreshold);
        }
      };

      const clearHoverTimer = () => {
        if (!hoverTimer) return;
        clearTimeout(hoverTimer);
        hoverTimer = null;
      };

      const clearHoverZone = () => {
        if (!hoverZone.value) return;
        hoverZone.value.innerHTML = '';
        clearHoverTimer();
      };
      return {
        ns,
        panel,
        hoverZone,
        isEmpty,
        isLoading,
        menuId,
        handleExpand,
        handleMouseMove,
        clearHoverZone
      };
    }
  });
</script>
