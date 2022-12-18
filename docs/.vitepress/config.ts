import { defineConfig } from 'vitepress'
import { autoGenerateSidebar, getFirstDocLink } from 'press-util'

const juejinLogo = `<svg width="36" height="28" viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M17.5875 6.77268L21.8232 3.40505L17.5875 0.00748237L17.5837 0L13.3555 3.39757L17.5837 6.76894L17.5875 6.77268ZM17.5863 17.3955H17.59L28.5161 8.77432L25.5526 6.39453L17.59 12.6808H17.5863L17.5825 12.6845L9.61993 6.40201L6.66016 8.78181L17.5825 17.3992L17.5863 17.3955ZM17.5828 23.2891L17.5865 23.2854L32.2133 11.7456L35.1768 14.1254L28.5238 19.3752L17.5865 28L0.284376 14.3574L0 14.1291L2.95977 11.7531L17.5828 23.2891Z" />
</svg>`

export default defineConfig({
  base: process.env.NODE_ENV === 'development' ? '/' : '/book/',
  title: 'Xpzheng\'s Blog',
  description: '晓平写文字的地方',

  themeConfig: {
    logo: '/logo.svg',
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
        text: '代码质量与工作流',
        link: getFirstDocLink('project/quality')
      }, /* {
        text: '路由',
        link: getFirstDocLink('project/router')
      }, */ /* {
        text: '其他',
        link: getFirstDocLink('project/other')
      }, */ {
        text: '性能优化',
        link: getFirstDocLink('project/performance')
      }, {
        text: '代码转译与polyfill',
        link: getFirstDocLink('project/babel')
      }, {
        text: '实战',
        link: getFirstDocLink('project/practice')
      }]
    }/* , {
      text: 'Vue源码',
      link: getFirstDocLink('source/vue')
    } */, {
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
    }, {
      icon: {
        svg: juejinLogo
      },
      link: 'https://juejin.cn/user/1099167356957885'
    }],
    footer: {
      copyright: 'Copyright © 2022 Xiao'
    }
  }
})
