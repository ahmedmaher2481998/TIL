import { createApp } from 'vue'
import { createPinia } from 'pinia'
import "./styles.css"
import App from './App.vue'
// Supports weights 300-700
import '@fontsource-variable/fira-code';




import router from './router'

const app = createApp(App)

app.use(createPinia())

app.use(router)

app.mount('#app')
