import { withInstall } from '@xs-ui/utils';
import ConfigProvider from './src/config-provider';

export const XsConfigProvider = withInstall(ConfigProvider);
export default XsConfigProvider;

export * from './src/config-provider';
