/*
 * @Author: chenghao
 * @Date: 2022-11-28 13:56:18
 * @Last Modified by: chenghao
 * @Last Modified time: 2022-11-30 18:56:35
 * @Desc: rollup打包，已废弃；
 */
const fs = require('fs');
const path = require('path');
const json = require('@rollup/plugin-json');
const vue = require('@vitejs/plugin-vue');
const { terser } = require('rollup-plugin-terser');
const { nodeResolve } = require('@rollup/plugin-node-resolve');
const babel = require('@rollup/plugin-babel');
const commonjs = require('@rollup/plugin-commonjs');
const { DEFAULT_EXTENSIONS } = require('@babel/core');

const isDev = process.env.NODE_ENV !== 'production';
// packages 文件夹路径
const root = path.resolve(__dirname, 'packages/components');

// 公共插件配置
const getPlugins = () => {
  return [
    vue(),
    nodeResolve({
      mainField: ['jsnext:main', 'browser', 'module', 'main'],
      browser: true
    }),
    commonjs(),
    json(),
    postcss({
      plugins: [require('autoprefixer')],
      // 把 css 插入到 style 中
      inject: true,
      // 把 css 放到和js同一目录
      // extract: true
      // Minimize CSS, boolean or options for cssnano.
      minimize: !isDev,
      // Enable sourceMap.
      sourceMap: isDev,
      // This plugin will process files ending with these extensions and the extensions supported by custom loaders.
      extensions: ['.sass', '.scss', '.css']
    }),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'runtime',
      // babel 默认不支持 ts 需要手动添加
      extensions: [...DEFAULT_EXTENSIONS, '.vue']
    }),
    // 如果不是开发环境，开启压缩
    !isDev && terser({ toplevel: true })
  ];
};

console.log(fs.readdirSync(root).filter(item => fs.statSync(path.resolve(root, item)).isDirectory()));

module.exports = fs
  .readdirSync(root)
  // 过滤，只保留文件夹
  .filter(item => fs.statSync(path.resolve(root, item)).isDirectory())
  // 为每一个文件夹创建对应的配置
  .map(item => {
    const pkg = require(path.resolve(root, item, 'package.json'));
    console.log(pkg);
    return {
      input: path.resolve(root, item, 'src/main.ts'),
      output: [
        {
          name: 'index',
          file: path.resolve(root, item, pkg.main),
          format: 'umd',
          sourcemap: isDev,
          globals: {
            vue: 'vue',
            'element-plus': 'element-plus'
          }
        },
        {
          name: 'index.module',
          file: path.join(root, item, pkg.module),
          format: 'es',
          sourcemap: isDev,
          globals: {
            vue: 'vue',
            'element-plus': 'element-plus'
          }
        }
      ],
      onwarn: function (warning) {
        if (warning.code === 'THIS_IS_UNDEFINED' || warning.code === 'CIRCULAR_DEPENDENCY') {
          return;
        }
        console.error(`(!) ${warning.message}`);
      },
      plugins: getPlugins(),
      external: Object.keys(require(path.join(root, item, 'package.json'))?.peerDependencies || {})
    };
  });
