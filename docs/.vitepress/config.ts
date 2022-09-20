import { defineConfig } from 'vitepress'
import { autoGenerateSidebar, getFirstDocLink } from 'press-util'

export default defineConfig({
  base: process.env.NODE_ENV === 'development' ? '/' : '/book/',
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
      }, {
        text: '代码质量',
        link: getFirstDocLink('project/quality')
      }, {
        text: 'Git',
        link: getFirstDocLink('project/git')
      }]
    }, {
      text: '第三方库',
      items: [{
        text: 'echarts',
        link: getFirstDocLink('3rd/echarts')
      }]
    }, {
      text: 'Vue源码',
      link: getFirstDocLink('source/vue')
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
