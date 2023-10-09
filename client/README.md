# Telegram Mini App client

This doc describes of how to run and maintain project

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


## Setup

### Install dependencies

```
yarn install
```

### Copy .env.example to .env and fill the variables

| Name | Description | Example |
| -- | -- | -- |
| VITE_WEB_HOST | Web client endpoint | `https://xxxx-xx-xxx-xxx-xx.ngrok-free.app` |
| VITE_API_HOST | Backend endpoint | `https://xxxx-xx-xxx-xxx-xx.ngrok-free.app` |

## Tech stack

- TypeScript
- Vue 3
- Vite

### Recommended IDE Setup

- [VS Code](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).
