import { provideGlobalConfig } from '@xishui-ui/hooks';
import { INSTALLED_KEY } from '@xishui-ui/token';
import { version } from './package.json';

export const makeInstaller = components => {
  const install = (app, options = undefined) => {
    if (app[INSTALLED_KEY]) return;

    app[INSTALLED_KEY] = true;
    components.forEach(c => app.use(c));

    if (options) provideGlobalConfig(options, app, true);
  };

  return {
    version,
    install
  };
};
