import { createApp } from 'vue'
import App from './App.vue'
import router, { setupRouter } from './router'
import { setupElementPlus } from '@/setup/element-plus'
import { setupStore } from '@/store'
import 'normalize.css'
import '@/assets/styles/index.scss'

const app = createApp(App)

// setup element-plus
setupElementPlus(app)

// setup vuex store
setupStore(app)

// setup router
setupRouter(app)

// mount app when router is ready
router.isReady().then(() => {
  app.mount('#app')
})
