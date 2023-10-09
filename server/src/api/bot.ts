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

    console.log(`🤖 Bot is running...`);

    /**
     * Check if webhook is set
     * If not — set it
     */
    try {
      const whInfo = await this.bot.getWebHookInfo()

      if ('url' in whInfo && whInfo.url !== '') {
        console.log('🤖 WebHook info: ', whInfo);
      } else {
        await this.setWebhook();
      }
    } catch (e) {
      console.log('getWebHookInfo error', e);
    }

    /**
     * Listen for messages from Telegram
    */
    this.bot.on('message', (msg) => {
      this.onMessage(msg);
    })

    /**
     * Listen for pre_checkout_query event
     */
    this.bot.on('pre_checkout_query', (update) => {
      this.preCheckoutQuery(update);
    })

    return this.bot;
  }

  /**
   * Handler for messages from Telegram
   *
   * @param msg - object that the bot got from Telegram
   */
  private async onMessage(msg: TelegramBot.Message): Promise<void> {
    const chatId = msg.chat.id

    console.log('📥', msg);

    switch (msg.text) {
      case '/start':
        await this.replyStartMessage(chatId)
        return
      case '/help':
        await this.replyHelpMessage(chatId)
        return
    }


    if (msg.successful_payment) {
      console.log('💰 successful_payment', msg.successful_payment);

      await this.sendMessageQueue(chatId, [
        { text: '🎉' },
        { text: 'Your order was accepted! Have a nice trip!' },
        { text: 'It is not a real payment, so you\'re not charged. The hotel exists only in our imagination. Thanks for testing! \n\nDiscover the source code and documentation: \nhttps://github.com/neSpecc/telebook' },
      ])

      return;
    }

    /**
     * Send message with inline query containing a link to the mini-app
     */
    this.sendAppButton(chatId)
  }

  /**
   * Reply to the /start command
   *
   * @param chatId - chat id to send message to
   */
  private async replyStartMessage(chatId: number): Promise<void> {
    await this.bot!.sendMessage(chatId, 'Welcome to the hotel booking bot! Hope you enjoy the application I have 🏨', {
      reply_markup: {
        inline_keyboard: [
          [{
            text: `🦄 Open ${this.config.appName}`,
            web_app: {
              url: this.config.webAppUrl,
            },
          }],
        ],
      }
    });
  }

  /**
   * Reply to the /help command
   *
   * @param chatId - chat id to send message to
   */
  private async replyHelpMessage(chatId: number): Promise<void> {
    await this.bot!.sendMessage(chatId, 'Actually I\'m just an example bot, so all I can do is to send you a link to the mini-app 🤖', {
      reply_markup: {
        inline_keyboard: [
          [{
            text: `🦄 Open ${this.config.appName}`,
            web_app: {
              url: this.config.webAppUrl,
            },
          }],
        ],
      }
    });
  }

  /**
   * Send message with inline query containing a link to the mini-app
   *
   * @param chatId - chat id to send message to
   */
  private async sendAppButton(chatId: number): Promise<void> {
    await this.bot!.sendMessage(chatId, 'Click the button below to launch an app', {
      reply_markup: {
        inline_keyboard: [
          [{
            text: `🦄 Open ${this.config.appName}`,
            web_app: {
              url: this.config.webAppUrl,
            },
          }],
        ],
      },
    })
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

  /**
   * To send several messages at once we need to add a small timeout between them
   *
   * @param chatId - chat id to send message to
   * @param messages - array of messages to send
   */
  private async sendMessageQueue(chatId: TelegramBot.ChatId, messages: {text: string, options?: TelegramBot.SendMessageOptions}[]): Promise<void> {
    messages.forEach((message, index) => {
      setTimeout(async () => {
        await this.bot!.sendMessage(chatId, message.text, message.options)
      }, index * 500);
    })
  }
}
