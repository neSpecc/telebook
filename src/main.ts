import { createApp } from 'vue'
import App from './App.vue'
import WebApp from '@twa-dev/sdk'
import Router from './router'
import './styles/index.css'

WebApp.ready()

const app = createApp(App)

app.use(Router)
app.mount('#app')
