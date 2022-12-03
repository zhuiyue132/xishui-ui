/*
 * @Author: chenghao
 * @Date: 2022-11-28 11:17:44
 * @Last Modified by: chenghao
 * @Last Modified time: 2022-12-02 16:08:54
 * @Desc: 打包辅助函数;
 */
import { existsSync } from 'fs';
import { resolve } from 'path';
import { mkdir, writeFile } from 'fs/promises';
import chalk from 'chalk';
import { spawn } from 'child_process';

/**
 * 一些路径配置;
 */
export const projRoot = resolve(__dirname, '..', '..');
export const pkgRoot = resolve(projRoot, 'packages');
export const compRoot = resolve(pkgRoot, 'components');
export const themeRoot = resolve(pkgRoot, 'theme-chalk');
export const hookRoot = resolve(pkgRoot, 'hooks');
export const epRoot = resolve(pkgRoot, 'xishui-ui');
export const buildRoot = resolve(projRoot, 'build', 'work');

export const docsDirName = 'docs';
export const docRoot = resolve(projRoot, docsDirName);
export const vpRoot = resolve(docRoot, '.vitepress');

export const buildOutput = resolve(projRoot, 'dist');
export const epOutput = resolve(buildOutput, 'xishui-ui');

export const projPackage = resolve(projRoot, 'package.json');
export const compPackage = resolve(compRoot, 'package.json');
export const themePackage = resolve(themeRoot, 'package.json');
export const hookPackage = resolve(hookRoot, 'package.json');
export const epPackage = resolve(epRoot, 'package.json');
export const docPackage = resolve(docRoot, 'package.json');
/* path end
 ------------*/

/**
 * 写入json文件
 * @param {*} path 文件路径
 * @param {*} data 被写入的数据
 * @param {*} spaces 缩进字符数，为0时不缩进
 * @returns
 */
export const writeJson = (path, data, spaces = 0) => writeFile(path, JSON.stringify(data, undefined, spaces), 'utf-8');

/**
 * 文件夹检测， 不存在指定路径时，则创建一个新的文件夹；
 * @param {*} path 路径
 */
export const ensureDir = async path => {
  if (!existsSync(path)) await mkdir(path, { recursive: true });
};

/**
 * 文件夹排除；
 * @param {*} files
 * @returns
 */
export const excludeFiles = files => {
  const excludes = ['node_modules', 'test', 'mock', 'gulpfile', 'dist'];
  return files.filter(path => !excludes.some(exclude => path.includes(exclude)));
};

/**
 * 创建或合并一个任务
 * @param {*} name
 * @param {*} fn
 * @returns
 */
export const withTaskName = (name, fn) => Object.assign(fn, { displayName: name });

/**
 * 在根目录中运行命令
 * @param {*} name 命令名称
 * @returns
 */
export const runTask = name => withTaskName(`shellTask:${name}`, () => run(`pnpm run start ${name}`, buildRoot));

export const run = async (command, cwd = projRoot) =>
  new Promise((resolve, reject) => {
    const [cmd, ...args] = command.split(' ');
    console.info(`run: ${chalk.green(`${cmd} ${args.join(' ')}`)}`);
    const app = spawn(cmd, args, {
      cwd,
      stdio: 'inherit',
      shell: process.platform === 'win32'
    });

    const onProcessExit = () => app.kill('SIGHUP');

    app.on('close', code => {
      process.removeListener('exit', onProcessExit);

      if (code === 0) resolve();
      else reject(new Error(`Command failed. \n Command: ${command} \n Code: ${code}`));
    });
    process.on('exit', onProcessExit);
  });

export const getPackageManifest = pkgPath => {
  return require(pkgPath);
};

export const getPackageDependencies = pkgPath => {
  const manifest = getPackageManifest(pkgPath);
  const { dependencies = {}, peerDependencies = {} } = manifest;

  return {
    dependencies: Object.keys(dependencies),
    peerDependencies: Object.keys(peerDependencies)
  };
};

export const generateExternal = async (options = {}) => {
  const { dependencies, peerDependencies } = getPackageDependencies(epPackage);

  return id => {
    const packages = peerDependencies;
    if (!options.full) {
      packages.push('@vue', ...dependencies);
    }

    return [...new Set(packages)].some(pkg => id === pkg || id.startsWith(`${pkg}/`));
  };
};
export function writeBundles(bundle, options) {
  return Promise.all(options.map(option => bundle.write(option)));
}

export function formatBundleFilename(name, minify, ext) {
  return `${name}${minify ? '.min' : ''}.${ext}`;
}
