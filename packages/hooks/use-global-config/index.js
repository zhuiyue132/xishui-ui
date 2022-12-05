import { computed, getCurrentInstance, inject, provide, ref, unref } from 'vue';
import { configProviderContextKey } from '@xishui-ui/token';

const globalConfig = ref();

const merge = (a, b) => {
  const keys = [...new Set([...Object.keys(a), ...Object.keys(b)])];
  const obj = {};
  for (const key of keys) {
    obj[key] = b[key] ?? a[key];
  }
  return obj;
};

export function useGlobalConfig(key, defaultValue = undefined) {
  const config = getCurrentInstance() ? inject(configProviderContextKey, globalConfig) : globalConfig;
  if (key) {
    return computed(() => config.value?.[key] ?? defaultValue);
  } else {
    return config;
  }
}

export function provideGlobalConfig(config, app, global = false) {
  const inSetup = !!getCurrentInstance();
  const oldConfig = inSetup ? useGlobalConfig() : undefined;

  const provideFn = app?.provide ?? (inSetup ? provide : undefined);
  const context = computed(() => {
    const cfg = unref(config);
    if (!oldConfig?.value) return cfg;
    return merge(oldConfig.value, cfg);
  });
  provideFn(configProviderContextKey, context);
  if (global) {
    globalConfig.value = context.value;
  }
  return context;
}
