const eslintRules = require('./eslint.rules');
const vueRules = require('./vue.rules');

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  globals: {
    document: true,
    localStorage: true,
    window: true,
    process: true,
    echarts: true,
    __dirname: true,
    defineProps: true,
    defineEmits: true
  },
  extends: ['plugin:vue/vue3-essential', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    allowImportExportEverywhere: false,
    ecmaFeatures: { jsx: true }
  },
  plugins: ['vue', 'prettier'],
  rules: {
    ...eslintRules,
    ...vueRules
  }
};
