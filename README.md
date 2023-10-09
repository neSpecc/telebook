# Telebook

Telegram Mini Application for booking hotels *

* — it's just a demonstration of [Telegram Mini Apps](https://core.telegram.org/bots/webapps) platform. No real hotels and payments.

<p align="center">
  <a href="https://t.me/tebook_bot/telebook">
    <picture>
      <source media="(prefers-color-scheme: dark)"  srcset="./docs/assets/cover.png">
      <source media="(prefers-color-scheme: light)" srcset="./docs/assets/cover-light.png">
      <img alt="Editor.js Logo" src="./docs/assets/cover.png">
    </picture>
  </a>
</p>

<p align="center">
 <a href="https://t.me/tebook_bot/telebook">@tebook_bot/telebook</a> |
  <a href="https://core.telegram.org/bots/webapps">Telegram Mini Apps</a> |
  <a href="#-how-to-use-repo">Documentation</a>
</p>

Use this project as an example or template for the creation of your app:

1. 🧩 Meet Telegram Vue.js UI Kit — build native-like interfaces with ready-to-use components
2. ✨ Advanced DX — fast build, hot reloading, modern code style and linters, well-documented code
3. 💎 Clean but simple architecture — easy to scale and maintain
4. 📦 Production-ready deployment setup
5. 💵 Payments support

## 👋 About the example

Telebook — is a kind of booking app that runs inside the Telegram. It provides several screens demonstrating different abilities: list views, cards, animations, forms, payments, etc.

It uses mocked data:
- Cities available for search
- Hotels
- Rooms
- Reviews
- All mock pictures are generated using [Shedevrum AI](https://shedevrum.ai)

It uses following Telegram Web App features:

- [ThemeParams](https://core.telegram.org/bots/webapps#themeparams)
- [Payments API](https://core.telegram.org/bots/payments)
- [MainButton](https://core.telegram.org/bots/webapps#mainbutton) and [BackButton](https://core.telegram.org/bots/webapps#backbutton)
- and other

## 📖 How to use repo

Use following instructions

- [Frontend tech guide](./client/README.md)
- [Backend tech guide](./server/README.md)
- [How to setup Payments](./docs/Payments.md)

## 😎 Awesome list

List of resources that can be useful when building your own Telegram Mini App

### Examples

- [@DurgerKingBot](https://t.me/durgerkingbot/menu) - simple official example demonstrating what Mini Apps is
- [@wallet](https://t.me/@wallet) - full featured example of how Mini App could be

### Development

- [@twa-dev/SDK](https://github.com/twa-dev/SDK) - Node.js API wrapper and type definitions
- [@twa-dev/Mark42](https://github.com/twa-dev/Mark42) - React Ui library
- [@twa-dev/vanilla-js-boilerplate](https://github.com/twa-dev/vanilla-js-boilerplate) -  boilerplate based on simple web technologies: JavaScript, HTML, and CSS
- [@twa-dev/webpack-boilerplate](https://github.com/twa-dev/webpack-boilerplate) -  React + TypeScript + Webpack boilerplate
- [@twa-dev/vite-boilerplate](https://github.com/twa-dev/vite-boilerplate) -  React + TypeScript + Vite boilerplate
- [@yagop/node-telegram-bot-api](https://github.com/yagop/node-telegram-bot-api) - Telegram Bot API for NodeJS

### Community

- [Telegram Mini Apps dev community](https://github.com/twa-dev) - A community of builders that enhances developer experience for the Telegram Mini Apps (TMA) platform with tools, docs, and tutorials
- [Telegram Developers Community](https://t.me/+1mQMqTopB1FkNjIy) - Telegram chat for mini apps developers
- [Telegram Apps](https://www.tapps.center) — Telegram Apps catalog

### Guides

- [Telegram Mini Apps](https://core.telegram.org/bots/webapps) — official platform documentation
- Web Apps ([docs.twa.dev](https://docs.twa.dev/docs/introduction/about-platform)) — more detailed platform documentation by community
- Ton Community / [What are Mini Apps?](https://docs.ton.org/develop/dapps/telegram-apps/) — guide from Ton Community

### Payments

- [Platform Overview](https://core.telegram.org/bots/payments) — Platform overview and Step-by-step guide
- [Payments API](https://core.telegram.org/bots/api#payments) — official API documentation
- [Stripe Test Mode](https://stripe.com/docs/test-mode) — how get test account, keys, cards numbers etc
- [Stripe Testing](https://stripe.com/docs/testing) — detailed guide how to simulate transactions

### Design

- Figma / [Telegram Library](https://www.figma.com/@firststagelabs) — basic design system for iOS and Android
- Figma / [Apple iOS 17 UI Kit](https://www.figma.com/community/file/1247769024068708989/apple-ios-17-ui-kit-variables) - Figma with iOS 17 components
- Figma / [iOS 17 and iPadOS 17 ](https://www.figma.com/file/tYi5KTNYSPGBsyrxz4SZaG/Apple-Design-Resources-%E2%80%93-iOS-17-and-iPadOS-17-(Community)?type=design&node-id=209-55480&mode=design&t=BA25hDUllNQGDsAa-0) - Apple Design Resources community library
- [Material 3](https://m3.material.io) — Material 3 Design Guidelines
- Figma / [Material 3](https://www.figma.com/community/file/1035203688168086460/material-3-design-kit) — Material 3 Design Kit
