import { createApp } from 'vue'
import App from './App.vue'
import WebApp from '@twa-dev/sdk'
import Router from '@/application/router'
import './presentation/styles/index.css'
import { loadCities } from '@/infra/store/cities'
import { useTelegram } from '@/application/services'

/**
 * @todo Close confirmation
 * @todo cancel payment toast
 * @todo test in all clients
 * @todo add "4 viewing right now" with 👀 animation
 */

const { platform } = useTelegram()

if (platform !== 'unknown') {
  switch (platform) {
    case 'android':
    case 'android_x':
    case 'web':
      document.body.classList.add('is-material')
      break
    case 'ios':
    case 'macos':
      document.body.classList.add('is-apple')
      break
    default:
      document.body.classList.add(`is-${platform}`)
      break
  }
}

/**
 * Some clients may use material/apple base styles, but has some overrides
 * For instance, WebK uses material but more rounded and clean
 */
document.body.classList.add(`is-exact-${platform}`)

/**
 * Prepare app data
 *
 * @todo load icons
 * @todo prepare image thumbs
 */
void loadCities()
  .then(() => {
    const app = createApp(App)

    app.use(Router)
    app.mount('#app')

    requestAnimationFrame(() => {
      WebApp.ready()
    })
  })
