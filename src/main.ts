import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '../styles.css'
import App from './App.vue'
import { VueQueryPlugin } from '@tanstack/vue-query'


// Supports weights 100-900
import '@fontsource-variable/noto-sans'
import router from '@/router'

const app = createApp(App)
const pinia = createPinia()

app
  .use(pinia)
  .use(router)
  .use(VueQueryPlugin)
  .mount('#app')
