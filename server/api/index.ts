import type { VercelRequest, VercelResponse } from '@vercel/node';
import Config from '../src/config.js';
import Router from '../src/api/router/index.js'
import Fastify from 'fastify';

const app = Fastify({
  logger: true,
});

// Register your application as a normal plugin.
app.register(Router, {
  config: Config,
});


// import HttpApi from './api/http.js';
// import Bot from './api/bot.js';
// import { notify } from './infra/utils/notify/index.js';
// const bot = new Bot(Config.botToken, Config.isTestEnvironment);


export default async function handler(request: VercelRequest, response: VercelResponse): Promise<any> {
  await app.ready();

  app.server.emit('request', request, response);
}
