import installer from './defaults';
export * from '@xs-ui/components';
export * from '@xs-ui/config';
export * from '@xs-ui/directives';
export * from '@xs-ui/hooks';
export * from '@xs-ui/tokens';
export * from './installer';

export const install = installer.install;
export const version = installer.version;
export default installer;
