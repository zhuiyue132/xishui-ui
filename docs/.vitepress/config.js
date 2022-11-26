/*
 * @Author: chenghao
 * @Date: 2022-11-26 13:47:20
 * @Last Modified by: chenghao
 * @Last Modified time: 2022-11-26 17:23:46
 * @Desc：文档站点的一些配置；
 */
import { defineConfig } from 'vitepress';
import { demoBlockPlugin } from 'vitepress-theme-demoblock';
import nav from './config/nav';
import sidebar from './config/sidebar';

export default defineConfig({
  // lang: 'en-US',
  title: '溪水UI',
  description: '使用 Vitepress 搭建组件库文档站点。',

  lastUpdated: true,
  cleanUrls: 'without-subfolders',

  base: process.env.BASE || '/',
  head: [['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }]],

  markdown: {
    headers: {
      level: [0, 0]
    },

    // options for markdown-it-anchor
    anchor: { permalink: false },

    // options for markdown-it-toc
    toc: { includeLevel: [1, 2] },

    // light: #f9fafb, dark: --vp-code-block-bg
    theme: { light: 'github-light', dark: 'github-dark' },

    config: md => {
      md.use(demoBlockPlugin, {
        cssPreprocessor: 'sass'
      });
    }
  },

  themeConfig: {
    outlineTitle: '本页目录',
    lastUpdatedText: '上次更新',
    logo: '/logo.svg',

    // nav
    nav,

    // sidebar
    sidebar,

    socialLinks: [{ icon: 'github', link: 'https://gitee.com/creektech/xishui-ui' }],

    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present 溪水网络'
    }
  }
});
