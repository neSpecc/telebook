# Telegram Mini App client

This project contains an example of Telegram Mini App.

Telebook — is a fictional hotel booking service integrated to Telegram. It uses completely mocked data of hotels, cities and pictures.

<p align="center">
  <a href="https://t.me/tebook_bot/telebook">
    <picture>
      <source media="(prefers-color-scheme: dark)"  srcset="../docs/assets/cover.png">
      <source media="(prefers-color-scheme: light)" srcset="../docs/assets/cover-light.png">
      <img alt="Editor.js Logo" src="../docs/assets/cover.png">
    </picture>
  </a>
</p>

## Features and Stack

- 📦 Vue Telegram UI Kit
- 📲 Declarative screens construction
- ✈️ `useTelegram()` composable that simplifies usage of Telegram Web App SDK
- 💎 Clean but simple architecture
- ✨ Hot Reloading
- 💰 Payments support

## Vue Telegram UI Kit

It contains ready-to-use collection of components that could be used to create native-like views that will look perfect on iOS, Android and other devices

- [Amount](./src/presentation/components/Amount)
- [Avatar](./src/presentation/components/Avatar)
- [Data Overview](./src/presentation/components/DataOverview)
- [Date Picker](./src/presentation/components/DatePicker)
- [Icon](./src/presentation/components/Icon)
- [Input](./src/presentation/components/Input)
- [List](./src/presentation/components/List)
- [Page With Header](./src/presentation/components/Page)
- [Fixed Footer](./src/presentation/components/Page/)
- [Placeholder](./src/presentation/components/Placeholder)
- [Rating](./src/presentation/components/Rating)
- [Section](./src/presentation/components/Section)
- [Text ](./src/presentation/components/Text )


## Get started

0. Crate a bot

Go to [@BotFather](https://t.me/@BotFather), write the `/newbot` command and follow instructions.

Then, call the `/newapp` comman to create your app. When BotFather will ask about Web App Url, start running the application as described below.

1. Install dependencies

```
yarn install
```

2. Copy .env.example to .env and fill the variables

```
cp .env.example .env
```

| Name | Description | Example | Where to get |
| -- | -- | -- | -- |
| VITE_WEB_HOST | Web client endpoint | `https://xxxx-xx-xxx-xxx-xx.ngrok-free.app` | Use ngrok host for local development and your production host on real environemnt |
| VITE_API_HOST | Backend endpoint | `https://xxxx-xx-xxx-xxx-xx.ngrok-free.app` | Use ngrok host for local development and your production host on real environemnt |

3. Run

| Command | Description |
| -- | -- |
| `yarn dev` | Start dev server with Hot Reloading |
| `yarn build` | Compile TS and prepare bundle for production |
| `yarn preview` | Preview production bundle |
| `yarn link` | Check ESLint problems |
| `yarn link:fox` | Autofix ESLint problems when possible |

4. When app is running, give a link to @BotFather:

Copy the URL of your running app and send it to [@BotFather](https://t.me/@BotFather) if he still waiting for it during app creation process. Or call `/myapps`, select our bot and press `Edit Web App URL` button on the Inline Keyboard.

### Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).


## Tech Stack and credits

List of libraries the project relies on

- TypeScript
- [Vue.js 3](https://vuejs.org) — reactive UI framework
- [Vite](https://vitejs.dev) — build system
- [@twa-dev/sdk](https://github.com/twa-dev/SDK) — Telegram Web App SDK wrapper and Type Definitions
- [@vueuse/core](https://vueuse.org) — Collection of Essential Vue Composition Utilities
- [normalize.css](https://necolas.github.io/normalize.css/) — makes browsers render all elements more consistently
- [Vue Router](https://router.vuejs.org) — helps handling of navigation
- [vue3-lottie](https://vue3-lottie.vercel.app) — Lottie animations player

