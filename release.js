/*
 * @Author: chenghao
 * @Date: 2022-12-06 16:13:41
 * @Last Modified by: chenghao
 * @Last Modified time: 2022-12-06 17:34:21
 * @Desc: 自动发布到npm;
 */
const process = require('process');
const path = require('path');
const execa = require('execa');
const consola = require('consola');
const npmPublish = require('@jsdevtools/npm-publish');

const NPM_DEFAULT_REGISTRY = 'https://registry.npmjs.org';
const NPM_PUBLISH_TOKEN = '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';

const root = process.cwd();
const rootPkgInfo = require(path.resolve(root, 'package.json'));

/**
 * 打印步骤
 */
const step = msg => consola.success(msg);
/**
 * 打包构建
 */
async function buildModules() {
  step('打包构建');
  await execa('pnpm', ['build'], { stdio: 'inherit' });
}

/**
 * 将包发布到 npm
 * @params {String} targetVersion 更新的版本号
 */
async function publishPkg(targetVersion) {
  step('发布 NPM');
  const pkgName = rootPkgInfo.name;
  try {
    // npm publish 发布
    await npmPublish({
      package: `${root}/dist/xishui-ui/package.json`,
      token: NPM_PUBLISH_TOKEN,
      registry: NPM_DEFAULT_REGISTRY
    });
    consola.success(`Successfully published ${pkgName}@${targetVersion}`);
  } catch (e) {
    throw e;
  }
}
// 组合发布流程并执行
(async function main() {
  const targetVersion = rootPkgInfo.version;
  await buildModules();
  await publishPkg(targetVersion);
})().catch(err => {
  throw err;
});
