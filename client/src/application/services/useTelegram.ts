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
  getViewportHeight: () => number | undefined;
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
  let mainButtonCallback: (() => void) | null = null

  /**
   * We store current BackButton callback to be able to remove it later
   */
  let backButtonCallback: (() => void) | null = null

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

    mainButtonCallback = callback

    WebApp.MainButton.text = text ?? 'Submit'
    WebApp.MainButton.onClick(callback)
    WebApp.MainButton.isVisible = true

    if (debugMainButton.value !== undefined) {
      debugMainButton.value.innerText = text ?? 'Submit'
      debugMainButton.value.addEventListener('click', mainButtonCallback)
      debugMainButton.value.classList.add('visible')
    }
  }

  /**
   * Hide the main button
   */
  function hideMainButton(): void {
    if (mainButtonCallback === null) {
      console.warn('Trying to hide main button but no callback was set')
      return
    }

    WebApp.MainButton.offClick(mainButtonCallback)
    debugMainButton.value?.removeEventListener('click', mainButtonCallback)
    mainButtonCallback = null

    WebApp.MainButton.isVisible = false
    debugMainButton.value?.classList.remove('visible')
  }

  /**
   * Show the back button
   */
  function showBackButton(callback: () => void): void {
    prepareDebugButton(debugBackButton, 'fake-back-button')

    backButtonCallback = callback

    WebApp.BackButton.onClick(callback)
    WebApp.BackButton.show()

    if (debugBackButton.value !== undefined) {
      debugBackButton.value.innerText = '‹ Back'
      debugBackButton.value.addEventListener('click', backButtonCallback)
      debugBackButton.value.classList.add('visible')
    }
  }

  /**
   * Hide the back button
   */
  function hideBackButton(): void {
    if (backButtonCallback === null) {
      console.warn('Trying to hide back button but no callback was set')
      return
    }

    WebApp.BackButton.offClick(backButtonCallback)
    debugBackButton.value?.removeEventListener('click', backButtonCallback)
    backButtonCallback = null

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
  function getViewportHeight(): number | undefined {
    return WebApp.viewportHeight
  }

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
  }
}
