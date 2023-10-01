import { createApp } from 'vue'
import App from './App.vue'
import WebApp from '@twa-dev/sdk'
import Router from '@/application/router'
import './presentation/styles/index.css'

WebApp.ready()

const app = createApp(App)

app.use(Router)
app.mount('#app')
