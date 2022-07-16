import { App } from 'vue'

const modules = import.meta.globEager('./**/*.vue')

function getComponentName(path: string) {
  const re = new RegExp(/^\.\/(.*)?\.vue$/g)
  const result = re.exec(path)
  if (!result) return null
  const parts = result[1].split('/')
  if (parts[parts.length - 1] === 'index') {
    parts.splice(parts.length - 1, 1)
  }
  return parts.join('-')
}

export default function(app: App, options: object) {
  Object.keys(modules).forEach(path => {
    const component = modules[path].default
    if (!component) return
    const componentName = getComponentName(path)
    if (!componentName) return
    app.component(componentName, component)
  })
}
