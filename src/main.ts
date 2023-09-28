import { createApp } from 'vue'
import App from './App.vue'
import WebApp from '@twa-dev/sdk'
import './styles/index.css'

WebApp.ready()

createApp(App).mount('#app')
