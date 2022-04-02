module.exports = {
  base: '/mini-extends/',
  title: 'Mini Extends',
  description: 'Mini Program Components Extends',
  themeConfig: {
    nav: [
      { text: '组件', link: '/components/' },
      { text: 'GitHub', link: 'https://github.com/haiweilian/mini-extends' },
    ],
    sidebar: [
      {
        title: '组件',
        path: '/components/',
        collapsable: false,
        children: ['/components/backtop', '/components/driver'],
      },
    ],
  },
}
