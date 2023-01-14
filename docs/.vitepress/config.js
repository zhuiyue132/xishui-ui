/*
 * @Author: chenghao
 * @Date: 2022-11-26 13:47:20
 * @Last Modified by: chenghao
 * @Last Modified time: 2022-12-13 16:35:09
 * @Desc：文档站点的一些配置；
 */
import { defineConfig } from 'vitepress';
import { demoBlockPlugin } from 'vitepress-theme-demoblock';
import nav from './config/nav';
import sidebar from './config/sidebar';

export default defineConfig({
  // lang: 'en-US',
  title: '溪水',
  description: '使用 Vitepress 搭建组件库文档站点。',

  lastUpdated: true,
  cleanUrls: 'without-subfolders',

  base: ['prod', 'production'].includes(process.env.NODE_ENV) ? '/component-docs/' : '',
  head: [
    [
      'link',
      {
        rel: 'icon',
        type: 'image/svg+xml',
        href: `${['prod', 'production'].includes(process.env.NODE_ENV) ? '/component-docs/' : '/'}logo.svg`
      }
    ],
    ['script', { src: '//at.alicdn.com/t/c/font_3759346_bq2y5b0qsgw.js' }],
    ['script', { src: '//at.alicdn.com/t/c/font_3759470_js03enos04h.js' }],
    ['script', { src: '//at.alicdn.com/t/c/font_3766763_85qv1gojmxq.js' }]
  ],

  markdown: {
    headers: {
      level: [0, 0]
    },

    // options for markdown-it-anchor
    anchor: { permalink: false },

    // options for markdown-it-toc
    toc: { includeLevel: [1, 2, 3] },

    // light: #f9fafb, dark: --vp-code-block-bg
    theme: { light: 'github-light', dark: 'github-dark' },

    config: md => {
      md.use(demoBlockPlugin, {
        cssPreprocessor: 'scss'
      });

      // 使用更多的 markdown-it 插件!
      md.use(require('markdown-it-task-lists'));
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
      message: 'Released under the MIT License. Made with ❤️ by zhuiyue132'
    }
  }
});
