import Theme from 'vitepress/theme'
import ui from './ui'
import components from '../components'
import '../styles/index.less'

export default {
  ...Theme,
  enhanceApp({ app }) {
    // 自动启用暗黑模式
    if (!localStorage.getItem('vitepress-theme-appearance')) {
      localStorage.setItem('vitepress-theme-appearance', 'dark')
    }
    app.use(ui)
    app.use(components)
  }
}