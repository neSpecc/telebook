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
  public run(): TelegramBot {
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


    bot.on('pre_checkout_query', (update) => {
      console.log('pre_checkout_query', update);

      /**
       * @todo validate order
       */
      bot.answerPreCheckoutQuery(update.id, true)
    })

    bot.on('message', (msg) => {
      const chatId = msg.chat.id

      console.log('message', msg);

      if (msg.successful_payment) {
        console.log('successful_payment', msg.successful_payment);
        bot.sendMessage(chatId, '🎉')
      }


      // send a message to the chat acknowledging receipt of their message
      // bot.sendMessage(chatId, 'Received your message')
      // bot.sendMessage(chatId, '🎉')
    })

    return bot;

  }
}
