import type { VercelRequest, VercelResponse } from '@vercel/node';
import Config from '../src/config.js';
// import HttpApi from './api/http.js';
// import Bot from './api/bot.js';
// import { notify } from './infra/utils/notify/index.js';
// const bot = new Bot(Config.botToken, Config.isTestEnvironment);


export default async function handler(request: VercelRequest, response: VercelResponse): Promise<any> {
  return response.send(`Hello test!` + Config.appName);
}
