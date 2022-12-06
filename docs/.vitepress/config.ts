import { defineConfig } from 'vitepress'
import { autoGenerateSidebar, getFirstDocLink } from 'press-util'

export default defineConfig({
  base: process.env.NODE_ENV === 'development' ? '/' : '/book/',
  title: '晓阁',
  description: '晓平写文字的地方',

  themeConfig: {
    nav: [{
      text: 'JavaScript',
      items: [{
        text: '基础',
        link: getFirstDocLink('js/base')
      }, {
        text: '对象',
        link: getFirstDocLink('js/object')
      }, {
        text: '函数/作用域/闭包',
        link: getFirstDocLink('js/function')
      }],
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
      }, {
        text: '路由',
        link: getFirstDocLink('project/router')
      }, {
        text: '其他',
        link: getFirstDocLink('project/other')
      }]
    }, {
      text: 'Vue源码',
      link: getFirstDocLink('source/vue')
    }, {
      text: '算法',
      link: getFirstDocLink('algorithm')
    }, {
      text: '杂谈',
      link: getFirstDocLink('others')
    }],
    sidebar: autoGenerateSidebar() as any,
    socialLinks: [{
      icon: 'github',
      link: 'https://github.com/shoppingzh'
    }, {
      icon: 'youtube',
      link: 'https://www.youtube.com/channel/UCxaFFcf1Ddur1Y9EesdwB8Q'
    }],
    footer: {
      copyright: 'Copyright © 2022 Xiao'
    }
  }
})
