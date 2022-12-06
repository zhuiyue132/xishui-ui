import installer from './defaults';
export * from '@xishui-ui/components';
export * from '@xishui-ui/config';
export * from '@xishui-ui/hooks';
export * from '@xishui-ui/token';
export * from '@xishui-ui/utils';
export * from './installer';

export const install = installer.install;
export const version = installer.version;
export default installer;
