import { App } from 'vue'
import ElementPlus from 'element-plus/lib'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

export function setupElementPlus (app: App) {
  app.use(ElementPlus)
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
}
