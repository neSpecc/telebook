import { createApp } from 'vue'
import App from './App.vue'
import WebApp from '@twa-dev/sdk'
import Router from '@/application/router'
import './presentation/styles/index.css'
import { loadCities } from '@/infra/store/cities'
import { useTelegram } from '@/application/services'


/**
 * @todo "Back" segue transition
 * @todo Close confirmation
 * @todo cancel payment toast
 * @todo picture slider on Rooms page
 * @todo documentation
 * @todo share order
 * @todo test in all clients
 * @todo add "4 viewing right now" with 👀 animation
 */

const { platform } = useTelegram()

if (platform !== 'unknown') {
  switch (platform) {
    case 'android':
    case 'android_x':
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
