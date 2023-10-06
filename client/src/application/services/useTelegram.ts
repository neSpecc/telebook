import WebApp from '@twa-dev/sdk'

interface useTelegramComposableState {
  showMainButton: (text: string, callback: () => void) => void;
  hideMainButton: () => void;
  setButtonLoader: (state: boolean) => void;
  showAlert: (text: string) => void;
  openInvoice: (url: string, callback: (status: 'pending' | 'failed' | 'cancelled' | 'paid') => void) => void;
  closeApp: () => void;
  expand: () => void;
}

/**
 * Composable to work with Telegram using the Mini Apps SDK
 *
 * @see https://core.telegram.org/bots/webapps
 */
export default function useTelegram(): useTelegramComposableState {
  /**
   * We store current callback to be able to remove it later
   */
  let mainButtonCallback: (() => void) | null = null

  /**
   * Show the main button
   *
   * @param text The text to show on the button
   * @param callback The callback to call when the button is clicked
   */
  function showMainButton(text: string, callback: () => void): void {
    mainButtonCallback = callback

    WebApp.MainButton.text = text ?? 'Submit'
    WebApp.MainButton.onClick(callback)
    WebApp.MainButton.isVisible = true
  }

  /**
   * Hide the main button
   */
  function hideMainButton(): void {
    if (mainButtonCallback === null) {
      console.warn('Trying to hide main button but no callback was set')
    }

    WebApp.MainButton.offClick(mainButtonCallback)
    WebApp.MainButton.isVisible = false
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

  return {
    showMainButton,
    hideMainButton,
    setButtonLoader,
    showAlert,
    openInvoice,
    closeApp,
    expand
  }
}
