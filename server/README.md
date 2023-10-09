# Telegram Mini App + Bot server

You can use this project as an example of how to implement your own backend for Telegram Mini App

## Features

- 🤖 /start and /help commands handlers
- 🎹 Inline Keyboard
- 💰 Payments support
- ✨ Hot Reloading
- ▲ Serverless Vercel Deployment setup

## Getting Started

1. Install dependencies

```
yarn install
```

2. Create config. Copy .env.example to .env and fill it with your data

```
cp .env.example .env
```

| Variable | Example | Description | Where to get |
| -- | -- | -- | -- |
| APP_NAME | `Telebook` | Your Web App name. Used in bot messages | Just invent by yourself |
| PUBLIC_HOST | `https://d668-51-158-186-93.ngrok-free.app` | Backend public host | Get from ngrok on development, or use production deployment host |
| WEB_APP_URL | `https://01d0-51-158-186-93.ngrok-free.app` | Frontend public host | Get from ngrok on development, or use production deployment host |
| PORT | `8888` | Server listening port (for local development) | Any number |
| BOT_TOKEN | `1234567890:AsdApjfxhQJtdoRFU187NOir76rocvxxxxx` | Your bot token | Get from @BotFather |
| PROVIDER_TOKEN | `12345678:TEST:xxxxxxxxxxxxx` | Payment API provider token | See [Payments](../docs/Payments.md) docs |
| IS_TEST_ENVIRONMENT | `true` | Do we need to use [Telegram Test Environment](https://core.telegram.org/bots/webapps#using-bots-in-the-test-environment) | Set `true` on your local machine and `false` on production |
| ALLOWED_ORIGINS | `*` | From which origins server should accept requests | Set "*" for local, for production you can restrict origins for security reasons |

3. Run

| Command | Description |
| -- | -- |
| `yarn dev` | Start dev server with Hot Reloading |
| `yarn build` | Compile TS and prepare bundle for production |
| `yarn start` | Run production server |

## Tech Stack and credits

- Node.js
- TypeScript
- [Fastify](https://fastify.dev) — web server framework
- [node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api) - Node.js module to interact with the official Telegram Bot API
