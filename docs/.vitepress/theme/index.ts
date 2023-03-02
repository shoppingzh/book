import Theme from 'vitepress/theme'
import ui from './ui'
import components from '../components'
import { EnhanceAppContext } from 'vitepress'
import 'animate.css/animate.min.css'
import '../styles/index.less'
import Layout from '@/layout/index.vue'
import 'virtual:svg-icons-register'

export default {
  ...Theme,
  Layout,
  enhanceApp(ctx: EnhanceAppContext) {
    const { app } = ctx;
    Theme.enhanceApp(ctx);
    app.use(ui)
    app.use(components)
    if (typeof window !== 'undefined') {
      // 默认暗黑模式
      // document.documentElement.classList.add('dark')
    }
  }
}