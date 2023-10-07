import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import Config from '../config.js'
import Fastify from 'fastify'
import cors from '@fastify/cors';
import TelegramBot from 'node-telegram-bot-api'
import { notify } from '../infra/utils/notify/index.js';



/**
 * HTTP server implementation using Fastify.
 */
export default class HttpApi {
  private server = Fastify()
  /**
   * Constructor
   *
   * @param config - Config instance
   */
  constructor(private readonly config: typeof Config, private readonly bot: TelegramBot) {}

  /**
   * Run HTTP server
   */
  public async run(): Promise<void> {
    this.server = Fastify()

    this.server.get('*', async (request: FastifyRequest, reply: FastifyReply) => {
      console.log(`Got ${request.method} request to ${request.url} from ${request.ip}`)
    })

    this.server.post('/createInvoice', async (request: FastifyRequest, reply: FastifyReply) => {

      console.log(`Got ${request.method} request to ${request.url} from ${request.ip}`)

      const {
        title,
        description,
        prices,
        need_name,
        photo_url,
        photo_size,
        photo_width,
        photo_height,
      } = request.body as any;

      console.log('body', request.body);

      const payload = 'Order #' + Math.random().toString(36).substring(7);

      notify(`🛍️ Create Invoice:  \n\n **${payload}: ${title} ${description}`);


      try {
        // @ts-ignore — 'createInvoiceLink supported by the library, but does not defined in types
        const invoiceLink = await this.bot.createInvoiceLink(title, description, payload, this.config.providerToken, 'USD', prices, {
          need_name,
          photo_url,
          photo_size,
          photo_width,
          photo_height,
        })

        // const message = await this.bot.sendInvoice(chatId, title, description, payload, this.config.providerToken, 'USD', prices, {
        //   need_name,
        //   photo_url,
        //   photo_size,
        //   photo_width,
        //   photo_height,
        // })

        // console.log('message', message);


        // console.log('invoiceLink', invoiceLink);

        // if (message.invoice) {
        //   await.this.bot.sendInvoice
        // }

        notify(`🛍️ Create Invoice: Success ${invoiceLink} `)

        return reply
          .send({
            invoiceLink
          });
      } catch (e) {
        console.log('error', (e as Error).message);

        notify(`Failed to create invoice: ${(e as Error).message}`)

        reply
          .code(500)
          .send({
            message: (e as Error).message,
          });
      }
    })

    this.server.listen({
      port: parseInt(this.config.port),
    }, (err: Error | null, address: string) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
      console.log(`🫡  ${this.config.appName || 'Server'} API listening at ${address}`)
    })

    /**
     * Allow cors for allowed origins from config
     */
    await this.server.register(cors, {
      origin: this.config.allowedOrigins,
    });
  }
}

