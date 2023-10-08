import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import Config from '../config.js'
import Fastify from 'fastify'
import cors from '@fastify/cors';
import TelegramBot from 'node-telegram-bot-api'
import Router from './router/index.js'


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
   * Method used to know when the fastify instance is ready
   */
  public async ready(): Promise<void> {
    return this.server.ready()
  }

  /**
   * Run HTTP server
   */
  public async run(): Promise<void> {
    this.server.register(Router, {
      config: this.config,
    })


    // this.server.listen({
    //   port: parseInt(this.config.port),
    // }, (err: Error | null, address: string) => {
    //   if (err) {
    //     console.error(err)
    //     process.exit(1)
    //   }
    //   console.log(`🫡  ${this.config.appName || 'Server'} API listening at ${address}`)
    // })

    /**
     * Allow cors for allowed origins from config
     */
    await this.server.register(cors, {
      origin: this.config.allowedOrigins,
    });
  }

  emit(request: any, response: any): void {
    this.server.server.emit('request', request, response)
  }
}

