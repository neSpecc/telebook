import 'dotenv/config'

if (!process.env.BOT_TOKEN) {
  throw new Error('BOT_TOKEN is not defined. Please set it in .env file.')
}

/**
 * We use .env for configuration.
 */
export default {
  appName: process.env.APP_NAME || 'Server',
  port: process.env.PORT || '3000',
  botToken: process.env.BOT_TOKEN,
  isTestEnvironment: process.env.IS_TEST_ENVIRONMENT === 'true',
}
