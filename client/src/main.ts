import { createApp } from 'vue'
import App from './App.vue'
import Router from '@/application/router'
import './presentation/styles/index.css'
import { loadCities } from '@/infra/store/cities'
import { useTelegram } from '@/application/services'
import { getCSSVariable } from './infra/utils/dom'
import { darkenColor } from './infra/utils/color'

/**
 * @todo async lottie-player loading
 * @todo preload all icons
 * @todo describe thumbnail generation and work
 * @todo describe next/main buttons simulation
 * @todo close confirmation
 * @todo cancel payment toast
 */

const { platform, ready, showAlert } = useTelegram()

if (platform !== 'unknown') {
  switch (platform) {
    case 'android':
    case 'android_x':
    case 'web':
    case 'weba':
    case 'tdesktop':
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
 * In the last Telegram iOS client, some theme variable are broken in Dark mode:
 * --tg-theme-bg-color (used for island in docs) became #000000
 * --tg-theme-secondary-bg-color (used for app bg in docs) became lighter that the --tg-theme-bg-color
 *
 * As a temporary workaround, we check if the variables are broken and swap them
 *
 * Another issue we have in iOS Dark Dimmed theme: both variables are the same, so we manually change one of them
 *
 */
function handleBrokenVariables(): void {
  const themeBgColor = getCSSVariable('--tg-theme-bg-color')
  const themeSecondaryBgColor = getCSSVariable('--tg-theme-secondary-bg-color')

  if (themeBgColor === '#000000' && themeSecondaryBgColor !== '#000000') {
    document.documentElement.style.setProperty('--tg-theme-bg-color', themeSecondaryBgColor ?? '')
    document.documentElement.style.setProperty('--tg-theme-secondary-bg-color', themeBgColor ?? '')

    return
  }

  /**
   * Workaround problem with iOS Dark Dimmed theme. Manually make secondary bg color darker
   */
  if (themeBgColor === themeSecondaryBgColor && themeBgColor !== undefined) {
    document.documentElement.style.setProperty('--tg-theme-secondary-bg-color', darkenColor(themeBgColor, 2.3))
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
      if (platform === 'ios') {
        handleBrokenVariables()
      }

      ready()
    })
  })
