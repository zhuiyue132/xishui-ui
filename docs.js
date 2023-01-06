/*
 * @Author: chenghao
 * @Date: 2023-01-06 16:13:41
 * @Last Modified by: chenghao
 * @Last Modified time: 2022-12-06 17:34:21
 * @Desc: 半自动更新文档库 node docs.js;
 */
const execa = require('execa');
const consola = require('consola');

const step = msg => consola.success(msg);

const buildDocsAndPublish = async () => {
  step('构建文档');
  await execa('pnpm', ['docs:build'], { stdio: 'inherit' });
  await execa('cd', ['docs/.vitepress/dist'], { stdio: 'inherit' });
  await execa('git', ['add', '-A'], { stdio: 'inherit' });
  await execa('git', ['commit', '-m', 'docs(release): auto update'], { stdio: 'inherit' });
  await execa(
    'git',
    [
      'remote',
      'add',
      'origin',
      'https://oauth2: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@gh.zhuiyue.work/github.com/zhuiyue132/component-docs.git'
    ],
    { stdio: 'inherit' }
  );
  await execa('git', ['branch', '-M', 'main'], { stdio: 'inherit' });
  await execa('git', ['push', '-u', '-f', 'origin', 'main'], { stdio: 'inherit' });
};

// 组合发布流程并执行
(async function main() {
  await buildDocsAndPublish();
})().catch(err => {
  throw err;
});
