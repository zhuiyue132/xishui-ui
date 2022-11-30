/*
 * @Author: chenghao
 * @Date: 2022-11-28 11:42:21
 * @Last Modified by: chenghao
 * @Last Modified time: 2022-11-30 19:00:32
 * @Desc: 项目打包入口；
 */
import path from 'path';
import { copyFile, mkdir } from 'fs/promises';
import { run, runTask, withTaskName, epOutput } from './utils';
import { parallel, series } from 'gulp';

export const copyFiles = () =>
  Promise.all([
    copyFile(epPackage, path.join(epOutput, 'package.json')),
    copyFile(path.resolve(projRoot, 'README.md'), path.resolve(epOutput, 'README.md'))
  ]);

export const copyFullStyle = async () => {
  await mkdir(path.resolve(epOutput, 'dist'), { recursive: true });
  await copyFile(path.resolve(epOutput, 'theme-chalk/index.css'), path.resolve(epOutput, 'dist/index.css'));
};
export default series(
  withTaskName('clear', () => run('pnpm run clear')),
  withTaskName('createOutput', () => mkdir(epOutput, { recursive: true })),

  parallel(
    runTask('buildModules')
    // runTask('buildFullBundle'),
    // runTask('generateTypesDefinitions'),
    // runTask('buildHelper'),
    // series(
    //   withTaskName('buildThemeChalk', () => run('pnpm run -C packages/theme-chalk build')),
    //   copyFullStyle
    // )
  )
);

export * from './work';
