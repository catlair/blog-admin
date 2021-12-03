import { createApp } from 'vue'
import { pinia } from './store'
import router from './router'
import App from './App.vue'
import '@/design/index.less'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')
