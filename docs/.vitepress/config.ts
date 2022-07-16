import { defineConfig } from 'vitepress'
import { autoGenerateSidebar, getFirstDocLink } from 'press-util'

export default defineConfig({
  base: '/',
  title: '晓阁',
  description: '晓平写文字的地方',

  themeConfig: {
    nav: [{
      text: 'JavaScript',
      link: getFirstDocLink('js')
    }, {
      text: '工程化',
      items: [{
        text: '性能优化',
        link: getFirstDocLink('project/performance')
      }, {
        text: '代码转译与polyfill',
        link: getFirstDocLink('project/babel')
      }]
    }, {
      text: '第三方库',
      items: [{
        text: 'echarts',
        link: getFirstDocLink('3rd/echarts')
      }]
    }],
    sidebar: autoGenerateSidebar(),
    socialLinks: [{
      icon: 'github',
      link: 'https://github.com/shoppingzh'
    }, {
      icon: 'youtube',
      link: 'https://www.youtube.com/channel/UCxaFFcf1Ddur1Y9EesdwB8Q'
    }]
  }
})
