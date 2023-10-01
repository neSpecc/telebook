import TelegramBot from 'node-telegram-bot-api'

/**
 * Class for working with Telegram Bot aAPI
 */
export default class Bot {
  /**
   * @param token - Telegram Bot API token got from @BotFather
   */
  constructor(private readonly token: string, private readonly isTestEnvironment: boolean) {

  }

  /**
   * Listen for messages from Telegram
   */
  public run(): void {
    console.log('this.token', this.token);

    const bot = new TelegramBot(this.token, {
      // @ts-ignore — undocumented option
      testEnvironment: this.isTestEnvironment,
    })

    bot.getMe()
      .then((info) => {
        console.log(info);
        bot.startPolling();
      })
      .catch((e) => {
          console.log('error', e);
      });

    bot.on('message', (msg) => {
      const chatId = msg.chat.id

      console.log('message', msg);


      // send a message to the chat acknowledging receipt of their message
      bot.sendMessage(chatId, 'Received your message')
    })
  }
}
