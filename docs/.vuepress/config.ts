import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from '@vuepress/theme-default'

export default defineUserConfig<DefaultThemeOptions>({
  base: '/mini-extends/',
  title: 'Mini Extends',
  description: 'Mini Program Components Extends',
  themeConfig: {
    repo: 'haiweilian/mini-extends',
    nav: [
      { text: '组件', link: '/components/' },
      { text: 'GitHub', link: 'https://github.com/haiweilian/mini-extends' },
    ],
    sidebar: [
      {
        text: '组件',
        link: '/components/',
        collapsible: true,
        children: ['/components/backtop/backtop', '/components/driver/driver'],
      },
    ],
  },
})
