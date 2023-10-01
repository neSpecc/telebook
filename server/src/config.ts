import 'dotenv/config'

if (!process.env.BOT_TOKEN) {
  throw new Error('BOT_TOKEN is not defined. Please set it in .env file.')
}

if (!process.env.PROVIDER_TOKEN) {
  throw new Error('PROVIDER_TOKEN is not defined. Please set it in .env file.')
}

/**
 * We use .env for configuration.
 */
export default {
  appName: process.env.APP_NAME || 'Server',
  port: process.env.PORT || '3000',
  botToken: process.env.BOT_TOKEN,
  providerToken: process.env.PROVIDER_TOKEN,
  isTestEnvironment: process.env.IS_TEST_ENVIRONMENT === 'true',
  allowedOrigins: process.env.ALLOWED_ORIGINS || '*',
}
