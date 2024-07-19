import { createApp } from 'vue'
import { createPinia } from 'pinia'
import naive from 'naive-ui'
import "./styles.css"
import App from './App.vue'
import 'vfonts/Lato.css'
// Monospace Font
import 'vfonts/FiraCode.css'
// then it works


import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(naive)
app.use(router)

app.mount('#app')
