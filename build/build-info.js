import path from 'path';
import { PKG_NAME } from './config';
import { epOutput } from './utils';
export const buildConfig = {
  esm: {
    module: 'ESNext',
    format: 'esm',
    ext: 'mjs',
    output: {
      name: 'es',
      path: path.resolve(epOutput, 'es')
    },
    bundle: {
      path: `${PKG_NAME}/es`
    }
  },
  cjs: {
    module: 'CommonJS',
    format: 'cjs',
    ext: 'js',
    output: {
      name: 'lib',
      path: path.resolve(epOutput, 'lib')
    },
    bundle: {
      path: `${PKG_NAME}/lib`
    }
  }
};
export const buildConfigEntries = Object.entries(buildConfig);
