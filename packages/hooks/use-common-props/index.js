/*
 * @Author: chenghao
 * @Date: 2022-11-19 23:48:54
 * @Last Modified by: chenghao
 * @Last Modified time: 2022-11-24 17:33:17
 */
import { componentSizes } from '@xs-ui/config';
import { computed, unref } from 'vue';
import { useProp } from '../use-prop';
import { useGlobalConfig } from '../use-global-config';

export const useSizeProp = {
  type: String,
  values: componentSizes,
  required: false
};

export const useSize = fallback => {
  const size = useProp('size');

  const globalConfig = useGlobalConfig('size');
  return computed(() => size.value || unref(fallback) || globalConfig.value || '');
};

export const useDisabled = fallback => {
  const disabled = useProp('disabled');
  return computed(() => disabled.value || unref(fallback) || false);
};
