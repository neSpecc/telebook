import 'dotenv/config'

if (!process.env.BOT_TOKEN) {
  throw new Error('BOT_TOKEN is not defined. Please set it in .env file.')
}

if (!process.env.PROVIDER_TOKEN) {
  throw new Error('PROVIDER_TOKEN is not defined. Please set it in .env file.')
}

if (!process.env.WEB_APP_URL) {
  throw new Error('WEB_APP_URL is not defined. Please set it in .env file.')
}

/**
 * We use .env for configuration.
 */
export default {
  appName: process.env.APP_NAME || 'Server',
  publicHost: process.env.PUBLIC_HOST || 'http://localhost:3000',
  webAppUrl: process.env.WEB_APP_URL,
  botToken: process.env.BOT_TOKEN,
  providerToken: process.env.PROVIDER_TOKEN,
  allowedOrigins: process.env.ALLOWED_ORIGINS || '*',
  isTestEnvironment: process.env.IS_TEST_ENVIRONMENT === 'true',
  port: process.env.PORT || '3000',
}
