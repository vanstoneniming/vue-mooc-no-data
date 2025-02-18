import { createApp } from 'vue'
import App from './App.vue'
import router, { setupRouter } from './router'
import { setupStore } from '@/store'
import 'normalize.css'
import '@/assets/styles/index.scss'
import { setupElementPlus } from '@/setup/element-plus'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const app = createApp(App)

setupElementPlus(app)

setupStore(app)

// setup router
setupRouter(app)

// mount app when router is ready
router.isReady().then(() => {
  app.mount('#app')
})
