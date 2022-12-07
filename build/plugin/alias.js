import { PKG_NAME, PKG_PREFIX } from '../config';
export function XishuiUiAlias() {
  const themeChalk = 'theme-chalk';
  const sourceThemeChalk = `${PKG_PREFIX}/${themeChalk}`;
  const bundleThemeChalk = `${PKG_NAME}/${themeChalk}`;

  return {
    name: 'xishui-ui-alias-plugin',
    resolveId(id) {
      if (!id.startsWith(sourceThemeChalk)) return;
      return {
        id: id.replaceAll(sourceThemeChalk, bundleThemeChalk),
        external: 'absolute'
      };
    }
  };
}
