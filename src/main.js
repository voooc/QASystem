import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/reset.css'
import installElement from './utils/element.config'
import drag from './utils/drag.js'

const app = createApp(App)
app
  .use(installElement)
  .use(drag)
  .use(store)
  .use(router)
  .mount('#app')
