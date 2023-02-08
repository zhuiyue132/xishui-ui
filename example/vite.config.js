import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import VueSetupExtend from 'vite-plugin-vue-setup-extend';
import viteEslint from 'vite-plugin-eslint';
import vueJsx from '@vitejs/plugin-vue-jsx';
export default defineConfig({
  plugins: [vue(), vueJsx(), VueSetupExtend(), viteEslint()],
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: '@use "./style.scss" as *;@use "./style2.scss" as *;'
        additionalData: '@use "./style.scss" as *;'
      }
    }
  }
});
