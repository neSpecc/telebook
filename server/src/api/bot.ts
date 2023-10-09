import TelegramBot from 'node-telegram-bot-api'
import Config from '../config.js'

/**
 * Class for working with Telegram Bot aAPI
 */
export default class Bot {
  /**
   * Telegram bot instance
   */
  private bot: TelegramBot | null = null;

  /**
   * @param config - Config instance
   */
  constructor(private readonly config: typeof Config) {}

  /**
   * Listen for messages from Telegram
   */
  public async run(): Promise<TelegramBot> {
    this.bot = new TelegramBot(this.config.botToken, {
      // @ts-ignore — undocumented option
      testEnvironment: this.config.isTestEnvironment,
    })

    await this.setWebhook();

    /**
     * We use the getMe() method to check if bot is working properly
     */
    this.bot.getMe()
      .then((info) => {
        console.log(`🤖 @${info.username} is running...`);
      })
      .catch((e) => {
          console.log('🤖❌', e);
      });


    this.bot.on('pre_checkout_query', (update) => {
      this.preCheckoutQuery(update);
    })

    this.bot.on('message', (msg) => {
      this.onMessage(msg);
    })

    return this.bot;
  }

  /**
   * Handler for messages from Telegram
   *
   * @param msg - object that the bot got from Telegram
   */
  private onMessage(msg: TelegramBot.Message): void {
    const chatId = msg.chat.id

    console.log('📥', msg);

    if (msg.successful_payment) {
      console.log('💰 successful_payment', msg.successful_payment);
      this.bot!.sendMessage(chatId, '🎉')
    }

    // send a message to the chat acknowledging receipt of their message
    // this.bot!.sendMessage(chatId, 'Received your message: ' + msg.text)
  }

  /**
   * Handler for pre_checkout_query event
   *
   * Got when user clicks on "Pay" button
   * We need to validate order here and answer with answerPreCheckoutQuery() in 10sec
   *
   * @see https://core.telegram.org/bots/payments#7-pre-checkout
   *
   * @param update - object that the bot got from Telegram
   */
  private preCheckoutQuery(update: TelegramBot.PreCheckoutQuery): void {
    console.log('🤖 pre_checkout_query: ', update);

    /**
     * @todo validate order here: get order from database and compare with update
     */

    this.bot!.answerPreCheckoutQuery(update.id, true)
  }

  /**
   * Set webhook for Telegram bot
   *
   * @todo For now we're setting webhook every time the server starts. Use some kind of storage to avoid this.
   */
  private async setWebhook(): Promise<void> {
    try {
      console.log('🤖 setting a webhook to @BotFather: ', `${this.config.publicHost}/bot`);

      const setHookResponse = await this.bot!.setWebHook(`${this.config.publicHost}/bot`);

      if (setHookResponse === true){
        console.log('🤖 webhook set ᕕ( ᐛ )ᕗ');
      } else {
        console.warn('🤖 webhook not set (╯°□°）╯︵ ┻━┻');
        console.warn('setHookResponse', setHookResponse);
      }
    } catch (e) {
      console.warn('Can not set Telegram Webhook')
      console.warn(e)
    }
  }
}
