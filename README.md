## XS-UI - 溪水组件库

<p >Xs Ui - A Vue.js 3 UI library</p>

- 💪 Written in JavaScript
- 💪 Vue 3 Composition API

### 开始

- [组件库文档](https://zhuiyue132.github.io/component-docs)

## 使用 pnpm

```bash
npm install pnpm -g
pnpm run dev # or build task and other...
```

> 注意：npm 不支持 workspace 的定义方式，所以会报错。请切到 pnpm

## 如何发布 npm 包

1. 确保本地工作区和暂存区没有未提交的内容；
1. 打开终端，执行 `node tag`, 选择你需要发布的版本号；
   1. 值得注意的是，本步骤会在远端仓库创建一个以`v{version}`的 tag。
   1. 每种版本号有不同含义，建议慎重选择。
   1. tag 创建后，gitee go 会以正则捕获这个 git tag 的 hook，默认会执行流水线任务。
   1. 流水线内的任务定义在 `.workflow`内。
   1. 本质上执行的是 `node release.js`。
   1. 如果需要修改包的所有者，请修改 `NPM_PUBLISH_TOKEN`。

## 如何发布文档站点

- 跟随上述发 npm 流程自动更新文档站点;
- 手动发布比较繁琐，等我写个脚本简化操作后再更新文档;
