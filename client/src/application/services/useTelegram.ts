import WebApp from '@twa-dev/sdk'

interface useTelegramComposableState {
  showMainButton: (text: string, callback: () => void) => void;
  hideMainButton: () => void;
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

  return {
    showMainButton,
    hideMainButton,
  }
}
