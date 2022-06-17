import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from '@vuepress/theme-default'

export default defineUserConfig<DefaultThemeOptions>({
  base: '/wxmini-component/',
  title: 'Mini Extends',
  description: 'Mini Program Components Extends',
  themeConfig: {
    repo: 'bfelib/wxmini-component',
    nav: [
      { text: '组件', link: '/components/' },
      { text: 'GitHub', link: 'https://github.com/bfelib/wxmini-component' },
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
