import { toRefs, computed, unref, ref, onMounted, onBeforeUnmount, nextTick, watch } from 'vue';
import { useIntersectionObserver, useElementBounding, useWindowSize, isClient } from '@vueuse/core';

export const useTableSticky = ({ reference, referenceBottom, tableRef, isSticky }, props, $emits) => {
  const { stickyable, offset, maxHeight, height } = toRefs(props);
  const observerOpts = computed(() => {
    return {
      threshold: [1],
      rootMargin: `-${unref(offset)}px 0px 0px 0px`
    };
  });

  const instance = ref({});

  const setScrollbarPostion = () => {
    if (!isClient) return;
    /**
     * 滚动条的位置有以下的几种情况
     * 1 = reference , 2 = referenceBottom， 1 一定在 2 的上方。
     * 1. 1,2 都不在视口，滚动条需要跟随表格，不做处理。
     * 2. 1,2 都在视口，滚动条需要跟随表格， 滚动条不做处理。
     * 3. 1 在视口，2 不在视口，表格固定在视口底部，方便滚动。
     * 4. 2 在视口，1不在视口，滚动条需要跟随表格，不做处理
     */

    const { height } = useWindowSize();
    const { top: top1, left } = useElementBounding(reference);
    const { top: top2 } = useElementBounding(referenceBottom);

    const $el = tableRef.value?.$refs?.scrollBarRef?.$el;
    if (!$el) return;

    const scrollbar = $el.querySelector('.el-scrollbar__bar.is-horizontal');
    if (!scrollbar) return;

    const styleStr = 'position:fixed;bottom:0px;';

    // element滚动条左侧留白2px;

    const marginLeft = 2;
    let cssText = '';

    if (top1.value > height.value || (top1.value <= height.value && top2.value <= height.value)) {
      cssText = '';
    } else {
      cssText = `${styleStr}left:${left.value + marginLeft}px`;
    }

    scrollbar.style.cssText = cssText;
  };

  const setStyleVariable = (padding, width) => {
    tableRef.value.$el.style.setProperty('--xs-table-top-padding', `${padding}px`);
    tableRef.value.$el.style.setProperty('--xs-table-top-width', `${width}px`);
  };

  const observerCb = ([event]) => {
    const {
      target,
      boundingClientRect: { y: boundingY },
      rootBounds: { y: rootY }
    } = event;
    const isReferenceTop = target.classList.contains('reference-top');

    if (tableRef.value.$refs.tableHeaderRef) {
      const { top, height } = useElementBounding(tableRef.value.$refs.tableHeaderRef);
      const { width } = useElementBounding(tableRef.value.$el);
      if (isReferenceTop) {
        const { top: _top } = useElementBounding(referenceBottom);
        isSticky.value = rootY > boundingY && _top.value > 0;
      } else {
        isSticky.value = rootY <= boundingY && top.value <= unref(offset);
      }

      setStyleVariable(isSticky.value ? height.value : 0, width.value);
    }

    setScrollbarPostion();
  };

  const stop = watch(isSticky, () => {
    $emits('stickyChange', isSticky.value);
  });

  const createObserver = () => {
    const { stop: s1 } = useIntersectionObserver(reference, observerCb, unref(observerOpts));
    const { stop: s2 } = useIntersectionObserver(referenceBottom, observerCb, unref(observerOpts));
    return { reference: s1, referenceBottom: s2 };
  };

  const destoryObserver = () => {
    for (const key in instance.value) {
      instance.value[key]?.();
    }
  };

  onMounted(async () => {
    await nextTick();
    if (!unref(stickyable) || !isClient || maxHeight.value || height.value) return;
    instance.value = createObserver();
  });

  onBeforeUnmount(() => {
    stop?.();
    destoryObserver();
  });
};
