import Config from './config.js'
import HttpApi from './api/http.js'
import Bot from './api/bot.js'

const api = new HttpApi(Config)
const bot = new Bot(Config.botToken, Config.isTestEnvironment)

/**
 * Listen for messages from Telegram
 */
bot.run()

/**
 * Listen for HTTP requests
 */
api.run()
