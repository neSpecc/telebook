import Config from './config.js'
import HttpApi from './api/http.js'
import Bot from './api/bot.js'
import { notify } from './infra/utils/notify/index.js';
import { VercelRequest, VercelResponse } from '@vercel/node';


const bot = new Bot(Config)
/**
 * Listen for messages from Telegram
*/
const botApi = bot.run();

const api = new HttpApi(Config, botApi)

/**
 * Listen for HTTP requests
 */
api.run()

notify('🤖 Bot started')


export default async function handler(request: VercelRequest, response: VercelResponse): Promise<any> {
  await api.ready();

  api.emit(request, response);
}
