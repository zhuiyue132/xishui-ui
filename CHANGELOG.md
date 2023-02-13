## [1.0.14-beta.8](https://gitee.com/creektech/xishui-ui/compare/v1.0.14-beta.7...v1.0.14-beta.8) (2023-02-13)

### Bug Fixes

- 修正一些组件按需加载时应该使用 scss 却引入了 css 的问题; ([2cc7763](https://gitee.com/creektech/xishui-ui/commits/2cc7763d59ef84c9977dc7ff85be589a166bbb79))

## [1.0.14-beta.7](https://gitee.com/creektech/xishui-ui/compare/v1.0.14-beta.6...v1.0.14-beta.7) (2023-02-13)

## [1.0.14-beta.6](https://gitee.com/creektech/xishui-ui/compare/v1.0.14-beta.5...v1.0.14-beta.6) (2023-02-13)

## [1.0.14-beta.5](https://gitee.com/creektech/xishui-ui/compare/v1.0.14-beta.4...v1.0.14-beta.5) (2023-02-13)

## [1.0.14-beta.4](https://gitee.com/creektech/xishui-ui/compare/v1.0.14-beta.3...v1.0.14-beta.4) (2023-02-13)

## [1.0.14-beta.3](https://gitee.com/creektech/xishui-ui/compare/v1.0.14-beta.2...v1.0.14-beta.3) (2023-02-10)

### Bug Fixes

- **table:** 吸顶状态切换时,更新一下滚动状态,避免样式丢失; ([9a67e0d](https://gitee.com/creektech/xishui-ui/commits/9a67e0da77dfa1d672da65018a682c45cd705cbd))

## [1.0.14-beta.2](https://gitee.com/creektech/xishui-ui/compare/v1.0.14-beta.1...v1.0.14-beta.2) (2023-02-10)

### Bug Fixes

- **table:** 修正表头处于吸顶时改变窗口大小导致计算宽度错的问题; ([c204008](https://gitee.com/creektech/xishui-ui/commits/c204008a74069d947ada4434a5b2611f318917fc))

## [1.0.14-beta.1](https://gitee.com/creektech/xishui-ui/compare/v1.0.14-beta.0...v1.0.14-beta.1) (2023-02-10)

### Bug Fixes

- 组件按需加载的样式补充; ([deb9361](https://gitee.com/creektech/xishui-ui/commits/deb9361c0ad981421146f288a3da58c01c753328))

## [1.0.14-beta.0](https://gitee.com/creektech/xishui-ui/compare/v1.0.13...v1.0.14-beta.0) (2023-02-10)

### Features

- 增加 tooltip 组件和维护 goods 组件; ([1514f3e](https://gitee.com/creektech/xishui-ui/commits/1514f3e81735ab64da3f583e0e8569daeb0e3b4f))

## [1.0.13](https://gitee.com/creektech/xishui-ui/compare/v1.0.12...v1.0.13) (2023-02-10)

### Features

- 增加 tooltip 组件和维护 goods 组件; ([0f8d8ab](https://gitee.com/creektech/xishui-ui/commits/0f8d8abb0805bc905a38a82edf7b7603ab6c1a41))
- **table:** 表头吸顶样式改版;表头自定义 tooltip; ([09be532](https://gitee.com/creektech/xishui-ui/commits/09be5329d32b0bcbb07dc45f34a0b05aa936fa2d))
- **table:** 增加表格单选的支持; ([02ed2c8](https://gitee.com/creektech/xishui-ui/commits/02ed2c85ead63511e1ec2bf2d4c0a84cae268221))

## [1.0.12](https://gitee.com/creektech/xishui-ui/compare/v1.0.11...v1.0.12) (2023-02-08)

### Bug Fixes

- 修正鼠标事件对象缺失了 path 属性导致筛选功能异常的问题;一些格式化问题的修改; ([6c3533e](https://gitee.com/creektech/xishui-ui/commits/6c3533e08917d8c485886e1d103d2d9a0e07c6f8))
- **table:** 解决打包过程中出现循环依赖的警告; ([c0ffb41](https://gitee.com/creektech/xishui-ui/commits/c0ffb4161c995049a3fd7678e7a903e7aceb77d2))

### Features

- 增加样式覆盖 xishui-ui 时,自动透传到 element;增加样式主题的文档; ([744279a](https://gitee.com/creektech/xishui-ui/commits/744279a79cd93b5c79d8872c7eabc52adcaeed0f))
- **table:** select 筛选类型兼容带有英文逗号的数据生成 option; ([049f1c8](https://gitee.com/creektech/xishui-ui/commits/049f1c8be5ad1526ea47091d41f3f95182af1202))

## [1.0.11](https://gitee.com/creektech/xishui-ui/compare/v1.0.10...v1.0.11) (2023-02-07)

## [1.0.10](https://gitee.com/creektech/xishui-ui/compare/v1.0.9...v1.0.10) (2023-02-07)

### Bug Fixes

- 删除不合规范的组件; ([0c6cc04](https://gitee.com/creektech/xishui-ui/commits/0c6cc04ba17212f3501c2739c94e91cc40d4e0fd))

## [1.0.9](https://gitee.com/creektech/xishui-ui/compare/v1.0.8...v1.0.9) (2023-02-07)

### Features

- **table:** 增加表格的按需加载; ([c942418](https://gitee.com/creektech/xishui-ui/commits/c942418d77d1aea73bd037d31a730801c26e7709))

## [1.0.8](https://gitee.com/creektech/xishui-ui/compare/v1.0.7...v1.0.8) (2023-02-07)

### Bug Fixes

- **table:** 修正表格分页 size-change 和 current-change 回调执行两次的问题; ([32df40a](https://gitee.com/creektech/xishui-ui/commits/32df40ad00cc934bc8f62170d440d7e51daec3dc))

### Features

- **table:** 薪资,警告,趋势三个数据形态的封装; ([6f4143f](https://gitee.com/creektech/xishui-ui/commits/6f4143f408ef9406d3a544203bb50923eb3658ae))
- **table:** 增加了一些单元格数据形态的封装; ([1395029](https://gitee.com/creektech/xishui-ui/commits/1395029bb43bc0c8d4e5dabb4a40dd59c87e9365))

## [1.0.7](https://gitee.com/creektech/xishui-ui/compare/v1.0.7-beta.12...v1.0.7) (2023-01-14)

### Bug Fixes

- 解决因服务端没有 document,window 等对象的报错的问题; ([c1701c6](https://gitee.com/creektech/xishui-ui/commits/c1701c64834a41c8b18b9d85a9039232139a7b9a))

### Features

- 增加 Table 组件及其文档; ([ba9202c](https://gitee.com/creektech/xishui-ui/commits/ba9202c5f8eb1973d398cc26aa06dd5356ee4933))

### Reverts

- Revert "docs(release): auto update" ([4452ff0](https://gitee.com/creektech/xishui-ui/commits/4452ff0f357fbf6701cf2a4674d3baaf3da6c24b))

## [1.0.7-beta.12](https://gitee.com/creektech/xishui-ui/compare/v1.0.7-beta.11...v1.0.7-beta.12) (2023-01-06)

### Bug Fixes

- **tabs:** 解决 tab-pane 样式丢失问题; ([0bebef4](https://gitee.com/creektech/xishui-ui/commits/0bebef43baf5b0b0e9627e11a85bce8a173ad6a6))

## [1.0.7-beta.11](https://gitee.com/creektech/xishui-ui/compare/v1.0.7-beta.10...v1.0.7-beta.11) (2023-01-05)

### Bug Fixes

- **empty:** 调整 Empty 组件图片的导入方式; ([b9159bc](https://gitee.com/creektech/xishui-ui/commits/b9159bc8b15bbe5847599226da3f457d65985704))

## [1.0.7-beta.10](https://gitee.com/creektech/xishui-ui/compare/v1.0.7-beta.9...v1.0.7-beta.10) (2023-01-05)

### Bug Fixes

- 调整 MessageBox 图片导入方式; ([9cab9be](https://gitee.com/creektech/xishui-ui/commits/9cab9beeaeefe7de0da665df8ca260700d676279))

## [1.0.7-beta.9](https://gitee.com/creektech/xishui-ui/compare/v1.0.7-beta.8...v1.0.7-beta.9) (2023-01-05)

## [1.0.7-beta.8](https://gitee.com/creektech/xishui-ui/compare/v1.0.7-beta.6...v1.0.7-beta.8) (2023-01-05)

## [1.0.7-beta.6](https://gitee.com/creektech/xishui-ui/compare/v1.0.7-beta.5...v1.0.7-beta.6) (2023-01-05)

### Bug Fixes

- 调整 datepicker 的命名空间为 date-picker; ([3a911b0](https://gitee.com/creektech/xishui-ui/commits/3a911b008b54f0e2c8f81b796c48b884cb73aecc))

## [1.0.7-beta.5](https://gitee.com/creektech/xishui-ui/compare/v1.0.7-beta.4...v1.0.7-beta.5) (2023-01-05)

### Bug Fixes

- 按需加载的 css 加载路径纠错; ([12c4263](https://gitee.com/creektech/xishui-ui/commits/12c426315f8dfa6c7dad389d53cc1bd8ffa34e3a))

## [1.0.7-beta.4](https://gitee.com/creektech/xishui-ui/compare/v1.0.7-beta.3...v1.0.7-beta.4) (2023-01-05)

## [1.0.7-beta.3](https://gitee.com/creektech/xishui-ui/compare/v1.0.7-beta.2...v1.0.7-beta.3) (2023-01-05)

## [1.0.7-beta.2](https://gitee.com/creektech/xishui-ui/compare/v1.0.7-beta.1...v1.0.7-beta.2) (2023-01-05)

## [1.0.7-beta.1](https://gitee.com/creektech/xishui-ui/compare/v1.0.7-beta.0...v1.0.7-beta.1) (2023-01-04)

### Features

- 增加 empty 空占位组件; ([0d1c6e2](https://gitee.com/creektech/xishui-ui/commits/0d1c6e21a5ff34ec8c615f48d01564ed2504fb9a))
- 增加 goods 和 shop 小组件; ([8d4b6fe](https://gitee.com/creektech/xishui-ui/commits/8d4b6fe1493589e1e57c3fda54b5fa1110b7e4a1))
- **avatar:** 增加头像组件,支持文字头像,文字数量可配置; ([e1fbebf](https://gitee.com/creektech/xishui-ui/commits/e1fbebf2779c4fe90f4c9d0414bc241d7da94380))
- **datepicker:** 增加时间类型选择组件; ([05c1586](https://gitee.com/creektech/xishui-ui/commits/05c15866a36a03b6268b6f2b377ecc83db301904))
- **datepicker:** 增加阳历和农历的快捷选项; ([8a59216](https://gitee.com/creektech/xishui-ui/commits/8a5921635c76591d3191c8eb03dce23d11025434))
- **message-box:** 增加 MessageBox 组件及其文档; ([f3b2822](https://gitee.com/creektech/xishui-ui/commits/f3b2822d23c3a6bb225f729577576d75ef7c807a))

## [1.0.7-beta.0](https://gitee.com/creektech/xishui-ui/compare/v1.0.6...v1.0.7-beta.0) (2022-12-19)

## [1.0.6](https://gitee.com/creektech/xishui-ui/compare/v1.0.6-beta.5...v1.0.6) (2022-12-19)

## [1.0.6-beta.5](https://gitee.com/creektech/xishui-ui/compare/v1.0.6-beta.4...v1.0.6-beta.5) (2022-12-19)

## [1.0.6-beta.4](https://gitee.com/creektech/xishui-ui/compare/v1.0.6-beta.3...v1.0.6-beta.4) (2022-12-19)

## [1.0.6-beta.3](https://gitee.com/creektech/xishui-ui/compare/v1.0.6-beta.2...v1.0.6-beta.3) (2022-12-19)

## [1.0.6-beta.2](https://gitee.com/creektech/xishui-ui/compare/v1.0.6-beta.1...v1.0.6-beta.2) (2022-12-19)

## [1.0.6-beta.1](https://gitee.com/creektech/xishui-ui/compare/v1.0.6-beta.0...v1.0.6-beta.1) (2022-12-19)

## [1.0.6-beta.0](https://gitee.com/creektech/xishui-ui/compare/v1.0.5...v1.0.6-beta.0) (2022-12-19)

## [1.0.5](https://gitee.com/creektech/xishui-ui/compare/v1.0.5-beta.0...v1.0.5) (2022-12-19)

### Bug Fixes

- 调整打包流程版本号相关; ([e63af4c](https://gitee.com/creektech/xishui-ui/commits/e63af4c9a0a6c97833269755a88ef6ed876d5ac4))
- fix pipeline ([0dd79aa](https://gitee.com/creektech/xishui-ui/commits/0dd79aab6aaf0c9c66cfcf43780d3b885bc94fab))

## [1.0.5-beta.0](https://gitee.com/creektech/xishui-ui/compare/v1.0.4-beta.8...v1.0.5-beta.0) (2022-12-19)

### Features

- **card:** 增加 card 卡片组件; ([ff4adfa](https://gitee.com/creektech/xishui-ui/commits/ff4adfa106f1f25156632421f589a02b8ac97330))
- **icon:** 增加 icon 组件; ([7e9daa0](https://gitee.com/creektech/xishui-ui/commits/7e9daa05c5c60b2b31002ee32d763609a4b662f9))
- **scrollbar:** 增加滚动条组件,支持吸底; ([18e45e7](https://gitee.com/creektech/xishui-ui/commits/18e45e797b877ae29b07afeac6dcb097197f2bc7))
- **tabs:** 增加 tabs 组件; ([f521192](https://gitee.com/creektech/xishui-ui/commits/f52119221cf7c19b4177f36bdf0a0d8910578a9c))

## [1.0.4-beta.8](https://gitee.com/creektech/xishui-ui/compare/v1.0.4-beta.3...v1.0.4-beta.8) (2022-12-08)

## [1.0.4-beta.3](https://gitee.com/creektech/xishui-ui/compare/v1.0.4-beta.2...v1.0.4-beta.3) (2022-12-07)

### Bug Fixes

- 修改目录以适配按需加载; ([629b118](https://gitee.com/creektech/xishui-ui/commits/629b11863088ad1f51028e2d4fe2043a81675ec1))

## [1.0.4-beta.2](https://gitee.com/creektech/xishui-ui/compare/v1.0.4-beta.1...v1.0.4-beta.2) (2022-12-07)

## [1.0.4-beta.1](https://gitee.com/creektech/xishui-ui/compare/v1.0.4-beta.0...v1.0.4-beta.1) (2022-12-07)

## [1.0.4-beta.0](https://gitee.com/creektech/xishui-ui/compare/v1.0.1...v1.0.4-beta.0) (2022-12-07)

### Features

- 增加 style 的按需加载; ([72b8e39](https://gitee.com/creektech/xishui-ui/commits/72b8e39cc53ab37e905e90d33b8c672ad4b684c3))

## [1.0.1](https://gitee.com/creektech/xishui-ui/compare/v1.0.4...v1.0.1) (2022-12-06)

## [1.0.4](https://gitee.com/creektech/xishui-ui/compare/v1.0.3-beta.0...v1.0.4) (2022-12-06)

## [1.0.3-beta.0](https://gitee.com/creektech/xishui-ui/compare/581df031a0f97e2c9f856218fecf0647652e2746...v1.0.3-beta.0) (2022-12-06)

### Bug Fixes

- 修改流水线; ([a336e26](https://gitee.com/creektech/xishui-ui/commits/a336e2680b6b27b986f116c33ea24a95b1d009a6))
- 修正一些包名的引用; ([a68478a](https://gitee.com/creektech/xishui-ui/commits/a68478ac3ff92dafe4fca9a2f929194aed4371f5))

### Features

- 工程化配置 ([e4e3d89](https://gitee.com/creektech/xishui-ui/commits/e4e3d894dbd9955822717737a0e6458d57cbf674))
- 工程化配置; ([577060c](https://gitee.com/creektech/xishui-ui/commits/577060c9df4f173812bc5005a9f51810cda463c2))
- 完善组件库的架构; ([948d1b7](https://gitee.com/creektech/xishui-ui/commits/948d1b7bc78aedb9500d36a83a064cb782b055d9))
- 组件库完善 ([f776f02](https://gitee.com/creektech/xishui-ui/commits/f776f023ab026a02af1fbb530365b71a9b002824))
- button 组件 ([f8046b1](https://gitee.com/creektech/xishui-ui/commits/f8046b1c6c5387bc05b485b294f76b1f80a2bf15))
- **button:** 按钮组件基本完成; ([8f1eff0](https://gitee.com/creektech/xishui-ui/commits/8f1eff0d4476fba6441512f6ba61484d0c9b6902))
- first commit ([581df03](https://gitee.com/creektech/xishui-ui/commits/581df031a0f97e2c9f856218fecf0647652e2746))
- **style:** 调整样式变量定义方式,导出到:root 和组件下; ([2b896f4](https://gitee.com/creektech/xishui-ui/commits/2b896f49f24e985440994067be22437f2ceaa0c6))
