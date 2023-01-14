import { computed, inject, unref } from 'vue';

const defaultIdInjection = {
  prefix: Math.floor(Math.random() * 10000),
  current: 0
};

export const ID_INJECTION_KEY = Symbol('xsIdInjection');

export const useId = deterministicId => {
  const idInjection = inject(ID_INJECTION_KEY, defaultIdInjection);
  const idRef = computed(() => unref(deterministicId) || `${idInjection.prefix}-${idInjection.current++}`);
  return idRef;
};
