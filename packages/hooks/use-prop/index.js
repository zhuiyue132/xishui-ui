import { computed, getCurrentInstance } from 'vue';

export const useProp = name => {
  const vm = getCurrentInstance();
  return computed(() => (vm.proxy?.$props)[name] ?? undefined);
};
