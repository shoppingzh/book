import Theme from 'vitepress/theme'
import ui from './ui'
import components from '../components'
import { EnhanceAppContext } from 'vitepress'
import '../styles/index.less'

export default {
  ...Theme,
  enhanceApp({ app, siteData }: EnhanceAppContext) {
    app.use(ui)
    app.use(components)
    if (typeof window !== 'undefined') {
      // 默认暗黑模式
      // document.documentElement.classList.add('dark')
    }
  }
}