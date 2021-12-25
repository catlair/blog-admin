import { createApp } from 'vue'
import { pinia } from './store'
import router from './router'
import App from './App.vue'
import '@/design/index.less'
import '@/design/antdv'
import { setupRouterGuard } from './router/guard'
import { setupGlobDirectives } from './directives'

const app = createApp(App)

app.use(pinia)
app.use(router)

setupRouterGuard(router)

setupGlobDirectives(app)

app.mount('#app')
