/*
 * @Author: chenghao
 * @Date: 2022-12-06 16:13:41
 * @Last Modified by: chenghao
 * @Last Modified time: 2022-12-06 17:34:21
 * @Desc: 自动发布到npm;
 */
const process = require('process');
const path = require('path');
const fs = require('fs');
const semver = require('semver');
const inquirer = require('inquirer');
const execa = require('execa');
const consola = require('consola');

const root = process.cwd();
const rootPkgInfo = require(path.resolve(root, 'package.json'));
const xpPkgInfo = require(path.resolve(`${root}/packages/xishui-ui`, 'package.json'));
const currentVersion = rootPkgInfo.version;
const semverReleaseType = ['patch', 'minor', 'major', 'prepatch', 'preminor', 'premajor', 'prerelease'];

/**
 * 打印步骤
 */
const step = msg => consola.success(msg);

/**
 * 询问并更新版本号
 */
async function updateVersion() {
  step('更新版本号');
  const { targetVersion } = await inquirer.prompt([
    {
      type: 'list',
      name: 'targetVersion',
      message: '选择你想要发布的版本: ',
      choices: semverReleaseType
        .map(release => semver.inc(currentVersion, release, 'beta')) // semver.inc 方法递增版本号
        .map(v => ({ value: v, title: v }))
    }
  ]);

  // 更新版本号并写入 package.json 文件中
  rootPkgInfo.version = targetVersion;
  xpPkgInfo.version = targetVersion;
  fs.writeFileSync(path.resolve(root, 'package.json'), JSON.stringify(rootPkgInfo, null, 2) + '\n');
  fs.writeFileSync(
    path.resolve(`${root}/packages/xishui-ui`, 'package.json'),
    JSON.stringify(xpPkgInfo, null, 2) + '\n'
  );

  return targetVersion;
}
/**
 * 打 tag 并推送到远程仓库
 */
async function gitTag(targetVersion) {
  step('打 TAG');
  const suffixVersion = `v${targetVersion}`;
  await execa('git', ['tag', suffixVersion], { stdio: 'inherit' });
  await execa('git', ['push', 'origin', `refs/tags/${suffixVersion}`], { stdio: 'inherit' });
  await execa('git', ['push'], { stdio: 'inherit' });
}

// 组合发布流程并执行
(async function main() {
  const targetVersion = await updateVersion();
  await gitTag(targetVersion);
})().catch(err => {
  throw err;
});
