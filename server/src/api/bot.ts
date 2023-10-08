import TelegramBot from 'node-telegram-bot-api'
import Config from '../config.js'

/**
 * Class for working with Telegram Bot aAPI
 */
export default class Bot {
  /**
   * @param config - Config instance
   */
  constructor(private readonly config: typeof Config) {

  }

  /**
   * Listen for messages from Telegram
   */
  public async run(): Promise<TelegramBot> {
    const bot = new TelegramBot(this.config.botToken, {
      // @ts-ignore — undocumented option
      testEnvironment: this.config.isTestEnvironment,
    })

    const setHookResponse = await bot.setWebHook(`${this.config.publicHost}/bot`);

    console.log('setHookResponse', setHookResponse);


    bot.getMe()
      .then((info) => {
        console.log('Me got:', info);
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
      bot.sendMessage(chatId, 'Received your message')
      // bot.sendMessage(chatId, '🎉')
    })

    return bot;

  }
}
