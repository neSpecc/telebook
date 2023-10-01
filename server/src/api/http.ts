import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import Fastify from 'fastify'
import Config from '../config.js'


/**
 * HTTP server implementation using Fastify.
 */
export default class HttpApi {
  private fastify = Fastify()
  /**
   *
   */
  constructor(private readonly config: typeof Config) {}

  /**
   *
   */
  public run(): void {
    this.fastify = Fastify()

    this.fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
      return 'aaa pong\n'
    })

    this.fastify.listen({
      port: parseInt(this.config.port),
    }, (err: Error | null, address: string) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
      console.log(`🫡  ${this.config.appName || 'Server'} API listening at ${address}`)
    })
  }
}

