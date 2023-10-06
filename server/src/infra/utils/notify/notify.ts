/**
 * Listen to messages from the parent process
 */
process.on('message', (text: string) => {
  /**
   * Send a message to telegram
   *
   * @param text The text to send
   */
  _notify(text)
})

/**
 * Send a message to telegram
 *
 * @param text The text to send
 */
function _notify(text: string): void {
  /**
   * Send curl -X POST https://notify.bot.ifmo.su/u/ABCD1234 -d "message=Hello world"
   */
  const url = process.env.NOTIFY_WEBHOOK

  if (!url) {
    console.info('Notify webhook is not set')
    console.info('💌 ' + text)
    return
  }

  const payload = {
    message: text
  }

  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: `message=${text}&parse_mode=Markdown`
  }

  fetch(url, options).then(response => response.text()).then((response) => {
    console.info('💌 Sent', response)
  }).catch((error) => {
    console.error('💌 ❌ Sending failed', error)
  })
}
