import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue';

export const useTableScroll = (tableRef, $emit) => {
  const scroller = ref(null);
  const scrollLeft = ref(0);
  const scrollPos = ref('left');

  const onScroll = () => {
    scrollLeft.value = scroller.value?.scrollLeft;
    if (scrollLeft.value === 0) {
      scrollPos.value = 'left';
    } else if (Math.ceil(scroller.value?.scrollLeft + scroller.value?.offsetWidth) >= scroller.value?.scrollWidth) {
      scrollPos.value = 'right';
    } else {
      scrollPos.value = 'middle';
    }

    $emit('scroll', { scrollLeft: scrollLeft.value, position: scrollPos.value });
  };

  const init = () => {
    scroller.value = tableRef.value?.$el?.querySelector?.('.el-table .el-scrollbar__wrap');
    if (scroller.value) {
      scroller.value.addEventListener('scroll', onScroll);
      nextTick(onScroll);
    }
  };

  // 页面挂载后赋值并监听事件；
  onMounted(async () => {
    await nextTick();
    if (tableRef.value) {
      init();
    } else {
      const stopWatch = watch(tableRef, () => {
        init();
        stopWatch();
      });
    }
  });

  // 卸载后需要off事件；
  onUnmounted(() => {
    if (!scroller.value) return;
    scroller.value?.removeEventListener('scroll', onScroll);
  });

  return {
    scrollLeft
  };
};
