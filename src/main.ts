import { createApp } from 'vue'
import { pinia } from './store'
import router from './router'
import App from './App.vue'
import '@/design/index.less'
import '@/design/antdv'
import { setupRouterGuard } from './router/guard'

const app = createApp(App)

app.use(pinia)
app.use(router)

setupRouterGuard(router)

app.mount('#app')
