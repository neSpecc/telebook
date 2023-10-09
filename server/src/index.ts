import Config from './config.js'
import HttpApi from './api/http.js'
import Bot from './api/bot.js'
import { notify } from './infra/utils/notify/index.js';
// import { VercelRequest, VercelResponse } from '@vercel/node';


const bot = new Bot(Config)
/**
 * Listen for messages from Telegram
*/
const botApi = await bot.run();

const api = new HttpApi(Config, botApi)

/**
 * Listen for HTTP requests
 */
api.run()

notify('🤖 Bot started')

export default api


// export default async function handler(request: VercelRequest, response: VercelResponse): Promise<any> {
//   await api.ready();

//   api.emit(request, response);
// }


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
