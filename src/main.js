import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// import vuetify from './plugins/vuetify'
import './index.css'
import { createPinia } from 'pinia'
import { loadFonts } from './plugins/webfontloader'


loadFonts()
const pinia = createPinia();

createApp(App)
  .use(router)
  .use(pinia)
  .mount('#app')
