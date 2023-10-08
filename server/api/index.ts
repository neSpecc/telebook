import Config from '../src/config.js'
import HttpApi from '../src/api/http.js'
import Bot from '../src/api/bot.js'
import { notify } from '../src/infra/utils/notify/index.js';
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

console.log('Test log')


export default async function handler(request: VercelRequest, response: VercelResponse): Promise<any> {
  await api.ready();

  api.emit(request, response);
}
