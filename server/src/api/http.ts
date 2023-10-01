import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import Config from '../config.js'
import Fastify from 'fastify'
import cors from '@fastify/cors';


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
  constructor(private readonly config: typeof Config) {}

  /**
   * Run HTTP server
   */
  public async run(): Promise<void> {
    this.server = Fastify()

    this.server.get('*', async (request: FastifyRequest, reply: FastifyReply) => {
      console.log('Got ${request.method} request to ${request.url} from ${request.ip}')
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

