import path from 'path';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { rollup } from 'rollup';
import commonjs from '@rollup/plugin-commonjs';
import vue from '@vitejs/plugin-vue';
import DefineOptions from 'unplugin-vue-define-options/rollup';
import vueJsx from '@vitejs/plugin-vue-jsx';
import esbuild, { minify as minifyPlugin } from 'rollup-plugin-esbuild';
import { parallel } from 'gulp';
import { PKG_CAMELCASE_NAME } from '../config';
import { epOutput, epRoot } from '../utils';
import { formatBundleFilename, generateExternal, withTaskName, writeBundles } from '../utils';
import json from '@rollup/plugin-json';

async function buildFullEntry(minify) {
  const plugins = [
    DefineOptions(),
    vue({
      isProduction: true
    }),
    vueJsx(),
    nodeResolve({
      extensions: ['.mjs', '.js']
    }),
    commonjs(),
    json(),
    esbuild({
      exclude: [],
      sourceMap: minify,
      target: 'es2018',
      define: {
        'process.env.NODE_ENV': JSON.stringify('production')
      },
      treeShaking: true,
      legalComments: 'eof'
    })
  ];
  if (minify) {
    plugins.push(minifyPlugin({ sourceMap: true }));
  }

  const bundle = await rollup({
    input: path.resolve(epRoot, 'index.js'),
    plugins,
    external: await generateExternal({ full: true }),
    treeshake: true
  });
  await writeBundles(bundle, [
    {
      format: 'umd',
      file: path.resolve(epOutput, 'dist', formatBundleFilename('index.full', minify, 'js')),
      exports: 'named',
      name: PKG_CAMELCASE_NAME,
      globals: {
        vue: 'Vue'
      },
      sourcemap: minify
    },
    {
      format: 'esm',
      file: path.resolve(epOutput, 'dist', formatBundleFilename('index.full', minify, 'mjs')),
      sourcemap: minify
    }
  ]);
}

export const buildFull = minify => async () => Promise.all([buildFullEntry(minify)]);

export const buildFullBundle = parallel(
  withTaskName('buildFullMinified', buildFull(true)),
  withTaskName('buildFull', buildFull(false))
);
