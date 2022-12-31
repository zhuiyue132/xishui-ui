import { computed, unref } from 'vue';

import DY from './svg/dy.svg';
import JD from './svg/jd.svg';
import PDD from './svg/pdd.svg';
import TX from './svg/tb.svg';
import KS from './svg/ks.svg';
import YMX from './svg/ymx.svg';
import TM from './svg/tm.svg';

const PLATFORMS = new Map([
  ['DY', { name: '抖音', icon: DY }],
  ['JD', { name: '京东', icon: JD }],
  ['PDD', { name: '拼多多', icon: PDD }],
  ['KS', { name: '快手', icon: KS }],
  ['TX', { name: '淘宝', icon: TX }],
  ['YMX', { name: '亚马逊', icon: YMX }],
  ['TM', { name: '天猫', icon: TM }]
]);

export const usePlatform = (platform = 'TX') => {
  const _default = PLATFORMS.get('TX');

  const _platform = computed(() => {
    return PLATFORMS.get(unref(platform)?.toString?.()?.toUpperCase?.()) || _default;
  });

  const icon = computed(() => {
    return _platform.value.icon;
  });

  const name = computed(() => {
    return _platform.value.name;
  });

  return {
    icon: unref(icon),
    name: unref(name)
  };
};
