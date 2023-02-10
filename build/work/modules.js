import { rollup } from 'rollup';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import DefineOptions from 'unplugin-vue-define-options/rollup';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import esbuild from 'rollup-plugin-esbuild';
import glob from 'fast-glob';
import { epRoot, excludeFiles, pkgRoot, generateExternal, writeBundles } from '../utils';
import json from '@rollup/plugin-json';
import { buildConfigEntries } from '../build-info';
import { XishuiUiAlias } from '../plugin/alias';
import image from '@rollup/plugin-image';
import scss from 'rollup-plugin-scss';
// 构建任务
export const buildModules = async () => {
  const input = excludeFiles(
    await glob('**/*.{js,vue,svg}', {
      cwd: pkgRoot,
      absolute: true,
      onlyFiles: true
    })
  );

  const bundle = await rollup({
    input,
    plugins: [
      XishuiUiAlias(),
      DefineOptions(),
      vue({
        isProduction: true
      }),
      vueJsx(),
      nodeResolve({
        extensions: ['.mjs', '.js', '.jsx']
      }),
      commonjs(),
      json(),
      scss(),
      image(),
      esbuild({
        sourceMap: true,
        target: 'es2018'
      })
    ],
    external: await generateExternal({ full: false }),
    treeshake: false
  });
  await writeBundles(
    bundle,
    buildConfigEntries.map(([module, config]) => {
      return {
        format: config.format,
        dir: config.output.path,
        exports: module === 'cjs' ? 'named' : undefined,
        preserveModules: true,
        preserveModulesRoot: epRoot,
        sourcemap: true,
        entryFileNames: `[name].${config.ext}`
      };
    })
  );
};
