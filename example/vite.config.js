import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueSetupExtend from 'vite-plugin-vue-setup-extend';

export default defineConfig({
  plugins: [vue(), VueSetupExtend()],
})