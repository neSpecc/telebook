import WebApp from '@twa-dev/sdk'
import { type Ref, ref } from 'vue'

interface useTelegramComposableState {
  showMainButton: (text: string, callback: () => void) => void;
  hideMainButton: () => void;
  showBackButton: (callback: () => void) => void;
  hideBackButton: () => void;
  setButtonLoader: (state: boolean) => void;
  showAlert: (text: string) => void;
  openInvoice: (url: string, callback: (status: 'pending' | 'failed' | 'cancelled' | 'paid') => void) => void;
  closeApp: () => void;
  expand: () => void;
  getViewportHeight: () => number;
  vibrate: (style?: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft' | 'error' | 'warning' | 'success') => void;
  ready: () => void;
  colorScheme: 'light' | 'dark' | undefined;
  platform: 'android' | 'android_x' | 'ios' | 'macos' | 'tdesktop' | 'web' | 'weba' | 'webk' | 'unigram' | 'unknown';
  headerColor: string;
  setHeaderColor: (color: 'bg_color' | 'secondary_bg_color' | `#${string}`) => void;
}

/**
 * Composable to work with Telegram using the Mini Apps SDK
 *
 * @see https://core.telegram.org/bots/webapps
 */
export default function useTelegram(): useTelegramComposableState {
  /**
   * We store current MainButton callback to be able to remove it later
   */
  const mainButtonCallback = ref<(() => void) | null>(null)

  /**
   * We store current BackButton callback to be able to remove it later
   */
  const backButtonCallback = ref<(() => void) | null>(null)

  const debugMainButton = ref<HTMLButtonElement | undefined>()
  const debugBackButton = ref<HTMLButtonElement | undefined>()

  /**
   * When we debug the app in the browser, we need to create a fake main button
   *
   * @param reference The reference to store the button
   * @param className The class name to add to the button
   */
  function prepareDebugButton(reference: Ref<any>, className: string): void {
    if (WebApp.platform !== 'unknown') {
      return
    }

    if (reference.value !== undefined) {
      return
    }

    const button = document.createElement('button')

    button.classList.add(className)
    document.body.appendChild(button)
    reference.value = button
  }

  /**
   * Show the main button
   *
   * @param text The text to show on the button
   * @param callback The callback to call when the button is clicked
   */
  function showMainButton(text: string, callback: () => void): void {
    prepareDebugButton(debugMainButton, 'fake-main-button')

    if (mainButtonCallback.value !== null) {
      WebApp.MainButton.offClick(mainButtonCallback.value)
    }

    mainButtonCallback.value = callback

    WebApp.MainButton.text = text ?? 'Submit'
    WebApp.MainButton.onClick(mainButtonCallback.value)
    WebApp.MainButton.isVisible = true

    if (debugMainButton.value !== undefined) {
      debugMainButton.value.innerText = text ?? 'Submit'
      debugMainButton.value.addEventListener('click', mainButtonCallback.value)
      debugMainButton.value.classList.add('visible')
    }
  }

  /**
   * Hide the main button
   */
  function hideMainButton(): void {
    if (mainButtonCallback.value === null) {
      console.warn('Trying to hide main button but no callback was set')
      return
    }

    WebApp.MainButton.offClick(mainButtonCallback.value)
    debugMainButton.value?.removeEventListener('click', mainButtonCallback.value)
    mainButtonCallback.value = null

    WebApp.MainButton.isVisible = false
    debugMainButton.value?.classList.remove('visible')
  }

  /**
   * Show the back button
   */
  function showBackButton(callback: () => void): void {
    prepareDebugButton(debugBackButton, 'fake-back-button')

    if (backButtonCallback.value !== null) {
      WebApp.BackButton.offClick(backButtonCallback.value)
    }

    backButtonCallback.value = callback

    WebApp.BackButton.onClick(backButtonCallback.value)
    WebApp.BackButton.show()

    if (debugBackButton.value !== undefined) {
      debugBackButton.value.innerText = '‹ Back'
      debugBackButton.value.addEventListener('click', backButtonCallback.value)
      debugBackButton.value.classList.add('visible')
    }
  }

  /**
   * Hide the back button
   */
  function hideBackButton(): void {
    if (backButtonCallback.value === null) {
      console.warn('Trying to hide back button but no callback was set')
      return
    }

    WebApp.BackButton.offClick(backButtonCallback.value)
    debugBackButton.value?.removeEventListener('click', backButtonCallback.value)
    backButtonCallback.value = null

    WebApp.BackButton.hide()
    debugBackButton.value?.classList.remove('visible')
  }

  /**
   * Show/hide the main button loader
   *
   * @param state The state to set the loader to
   */
  function setButtonLoader(state: boolean): void {
    if (state) {
      WebApp.MainButton.showProgress()
    } else {
      WebApp.MainButton.hideProgress()
    }
  }

  /**
   * Shows native Telegram alert message
   *
   * @param text The text to show in the alert
   */
  function showAlert(text: string): void {
    WebApp.showAlert(text)
  }

  /**
   * Opens Telegram invoice
   *
   * @param url The invoice URL
   * @param callback The callback to call when the invoice is paid
   */
  function openInvoice(url: string, callback: (status: 'pending' | 'failed' | 'cancelled' | 'paid') => void): void {
    WebApp.openInvoice(url, callback)
  }

  /**
   * Closes the app
   */
  function closeApp(): void {
    WebApp.close()
  }

  /**
   * Expands Telegram app layout
   */
  function expand(): void {
    WebApp.expand()
  }

  /**
   *
   * The current height of the visible area of the Mini App. Also available in CSS as the variable var(--tg-viewport-height).
   * The application can display just the top part of the Mini App, with its lower part remaining outside the screen area.
   * From this position, the user can “pull” the Mini App to its maximum height, while the bot can do the same by calling the expand() method.
   * As the position of the Mini App changes, the current height value of the visible area will be updated in real time.
   * Please note that the refresh rate of this value is not sufficient to smoothly follow the lower border of the window.
   * It should not be used to pin interface elements to the bottom of the visible area.
   * It's more appropriate to use the value of the viewportStableHeight field for this purpose.
   */
  function getViewportHeight(): number {
    return WebApp.viewportStableHeight
  }

  /**
   * Vibrate the device
   *
   * @param style The style of the vibration
   */
  function vibrate(style: 'light' | 'medium' | 'heavy' | 'rigid' | 'soft' | 'error' | 'warning' | 'success' = 'heavy'): void {
    switch (style) {
      case 'light':
      case 'medium':
      case 'heavy':
      case 'rigid':
      case 'soft':
        WebApp.HapticFeedback.impactOccurred(style)
        break
      case 'error':
      case 'warning':
      case 'success':
        WebApp.HapticFeedback.notificationOccurred(style)
        break
    }
  }

  /**
   * Tells Telegram
   */
  function ready(): void {
    WebApp.ready()
  }

  /**
   * Sets the header color of the app wrapper
   */
  function setHeaderColor(color: 'bg_color' | 'secondary_bg_color' | `#${string}`): void {
    WebApp.setHeaderColor(color)
  }

  /**
   * The current color scheme of the device. Can be light or dark.
   * If app is launched in a browser, the value will be undefined.
   */
  const colorScheme = WebApp.platform !== 'unknown' ? WebApp.colorScheme : undefined

  /**
   * The current platform of the device.
   */
  const platform = WebApp.platform

  /**
   * The current header color of the app wrapper
   */
  const headerColor = WebApp.headerColor

  return {
    showMainButton,
    hideMainButton,
    setButtonLoader,
    showAlert,
    openInvoice,
    closeApp,
    expand,
    getViewportHeight,
    showBackButton,
    hideBackButton,
    vibrate,
    ready,
    colorScheme,
    platform,
    headerColor,
    setHeaderColor,
  }
}
