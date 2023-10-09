# Get Started with the repo

This guide describes base aspects of this example implementation

- 🏠 [Frontend tech guide](./client/README.md) - how to setup Client
- 🎁 [Backend tech guide](./server/README.md) - how to setup Backend

## Local Development

What you need to know about development of Telegram Mini Apps and bot:

- Telegram Test Environment
- Telegram Debug Mode
- Local ports forwarding through ngrok

### About Telegram Test Environment

Telegram has a test environment that allows you to test your bots without affecting the production environment.
The database of users in the test environment is separate from the production environment.

Read more: [Using bots in the test environment](https://core.telegram.org/bots/webapps#using-bots-in-the-test-environment)

It is recommended to use the test environment for development and testing of bots.

### Telegram Debug Mode

It is a special mode of Telegram clients allowing to debug and inspect Mini Apps

Read more: [Debug Mode for Mini Apps](https://core.telegram.org/bots/webapps#debug-mode-for-mini-apps)

#### Debug Mode on Android devices

Note. Official guide does not contain information about how to enable debug mode on Android devices.
However, it is possible:

- Download [Telegram Beta](https://install.appcenter.ms/users/drklo-2kb-ghpo/apps/Telegram-Beta-2/distribution_groups/All-users-of-Telegram-Beta-2) android client
- On login, entered your number and check the "Test Backend" mark.
- Scan the QR code

### Ports forwarding using ngrok

To test your Mini App or Bot you need to give its URL to @BotFather. It does not accept local URLs so you'll need port forwarding.

Ngrok — is util that allows you to expose your local ports to the internet. We need to expose two ports: both for client and server.

1. [Install ngrok](https://ngrok.com/docs/getting-started/#step-2-install-the-ngrok-agent)
2. Sigh up and get Auth Token
3. Copy ngrok.yml.example to ngrok.yml
4. Fill it with your token and local ports
5. Run ngrok using config:

```
ngrok start --all --config ./ngrok.yml
```

You'll see public hosts assigned to you. Send Client host to BotFather, and fill both client and server .env files with them
