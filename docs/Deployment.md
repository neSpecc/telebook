# Deployment

This guide contains instructions on how to deploy your own instance of the bot.

## Vercel (serverless)

1. Create a new project on [Vercel](https://vercel.com/) and link it to your GitHub repository.
2. Fill in the environment variables in the Vercel dashboard (see [Backend Guide](../server/README.md)).
3. Update Vercel project settings:

"Build Command" — `yarn build`
"Output Directory" — `dist`
"Install Command" — `yarn install`

"Root Directory" — `server`

"Node.js Version" — `18.x

That's it! Other things are already configured for you via `vercel.json` and `package.json` files.

Deployment will be triggered automatically on every push to the `main` branch.

## Own server

1. Clone the repository to your server.
2. Install dependencies: `yarn install`.
3. Build the project: `yarn build`.
4. Fill in the environment variables (see [Backend Guide](../server/README.md)).
5. Daemonize bot. Here is an example using screen:

```bash
screen -dmS bot yarn start
```

You can also use [pm2](https://pm2.keymetrics.io/) or `forever`, or systemd, or Docker, or whatever you want.
