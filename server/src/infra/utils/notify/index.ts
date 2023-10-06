import { resolve } from "node:path"
import { fileURLToPath } from 'node:url'
import { dirname } from 'node:path'
import { fork } from 'node:child_process'

const __dirname = dirname(fileURLToPath(import.meta.url))

/**
 * Send a message to telegram
 *
 * @param text The text to send
 */
export function notify(text: string): void {
  /**
   * Call internal notify in child process
   */
  const child = fork(resolve(__dirname, 'notify.js'))

  child.send(text)
}
