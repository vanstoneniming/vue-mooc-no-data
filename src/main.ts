import { createApp } from 'vue'
import App from './App.vue'
import router, { setupRouter } from './router'
import { setupStore } from '@/store'
import 'normalize.css'
import '@/assets/styles/index.scss'
import { Pagination, Form } from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import { setupElementPlus } from '@/setup/element-plus'

const app = createApp(App)
app.use(Pagination, Form)

setupElementPlus(app)

// setup vuex store
setupStore(app)

// setup router
setupRouter(app)

// mount app when router is ready
router.isReady().then(() => {
  app.mount('#app')
})
