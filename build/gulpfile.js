/*
 * @Author: chenghao
 * @Date: 2022-11-28 11:42:21
 * @Last Modified by: chenghao
 * @Last Modified time: 2022-12-06 17:53:52
 * @Desc: 项目打包入口；
 */
import path from 'path';
import { copyFile, mkdir } from 'fs/promises';
import { run, runTask, withTaskName, epOutput, epPackage, projRoot } from './utils';
import { parallel, series } from 'gulp';

export const copyFiles = () =>
  Promise.all([
    copyFile(epPackage, path.join(epOutput, 'package.json')),
    copyFile(path.resolve(projRoot, 'README.md'), path.resolve(epOutput, 'README.md')),
    copyFile(path.resolve(projRoot, 'CHANGELOG.md'), path.resolve(epOutput, 'CHANGELOG.md'))
  ]);

export const copyFullStyle = async () => {
  await mkdir(path.resolve(epOutput, 'dist'), { recursive: true });
  await copyFile(path.resolve(epOutput, 'theme-chalk/index.css'), path.resolve(epOutput, 'dist/index.css'));
};
export default series(
  withTaskName('clear', () => run('pnpm run clear')),
  withTaskName('createOutput', () => mkdir(epOutput, { recursive: true })),
  parallel(
    runTask('buildModules'),
    runTask('buildFullBundle'),
    series(
      withTaskName('buildThemeChalk', () => run('pnpm run -C packages/theme-chalk build')),
      copyFullStyle
    )
  ),
  parallel(copyFiles)
);

export * from './work';
