import Config from './config.js'
import HttpApi from './api/http.js'
import Bot from './api/bot.js'

/**
 * Create Telegram Bot backend
 */
const bot = new Bot(Config)

/**
 * Listen for messages from Telegram
*/
const botApi = await bot.run();

/**
 * Create HTTP interface
 */
const api = new HttpApi(Config, botApi)

/**
 * Listen for HTTP requests
 */
api.run()

/**
 * Export HTTP server for serverless calls
 */
export default api

/**
 * Handler for 'error' event that can be emitted by worker
 */
process.on('error', (err) => {
  console.error('\n\n❌ Process error: \n', err);
});

/**
 * Catch unhandled exceptions
 */
process.on('uncaughtException', (err) => {
  console.error('\n\n❌ Uncaught Exception: \n', err);
});

/**
 * Catch unhandled rejections
 */
process.on('unhandledRejection', (error) => {
  console.error('\n\n❌ Unhandled promise rejection: \n', error);
});
