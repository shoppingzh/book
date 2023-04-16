export interface Item {
  name: string
  description?: string
  url?: string
  logo?: string
}

interface Group {
  name: string
  items: Item[]
}

export default {
  groups: [{
    name: '模板',
    items: [{
      name: 'rollup-lib-template',
      description: '开箱即用的Rollup库打包模板，提供常用的打包配置。',
      url: 'https://github.com/shoppingzh/rollup-lib-template'
    }, {
      name: 'vitepress-template',
      description: 'Vitepress模板，快速搭建文档中心',
      url: 'https://github.com/shoppingzh/vitepress-template',
      logo: 'vitepress-template',
    }, {
      name: 'vue-relaxed-admin',
      description: '开箱即用的中后台模板',
      url: 'https://vue.zhengxiaoping.xyz/',
      logo: 'vue-relaxed-admin',
    }]
  }, {
    name: '工具',
    items: [{
      name: 'magic-hooks',
      description: '魔法Hooks库，更快更高效解决业务问题！',
      url: 'https://github.com/shoppingzh/magic-hooks',
      logo: 'magic',
    }, {
      name: 'tongpo',
      description: '乐天工具库',
      url: 'https://shoppingzh.gitee.io/tongpo/'
    }, {
      name: 'fly-image',
      description: '飞行图片查看器',
      url: 'https://github.com/shoppingzh/fly-image',
    }, {
      name: 'cool-parser',
      description: '试题解析器',
      url: 'https://github.com/shoppingzh/cool-parser',
    }, {
      name: 'anything-watermark',
      description: '万物皆水印',
      url: 'https://github.com/shoppingzh/anything-watermark',
      logo: 'watermark',
    }, {
      name: 'iconfont-downloader',
      description: 'iconfont图标下载工具',
      url: 'https://github.com/shoppingzh/iconfont-downloader',
    }, {
      name: 'press-util',
      description: 'Vitepress/Vuepress支撑工具',
      url: 'https://github.com/shoppingzh/press-util',
    }]
  }] as Group[]
}