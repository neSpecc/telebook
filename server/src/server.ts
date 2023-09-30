import Fastify, { FastifyError, FastifyReply, FastifyRequest } from 'fastify'

export default class Server {
  fastify: any;
  constructor() {}

  run(){
    this.fastify = Fastify()

    this.fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
      return 'aaa pong\n'
    })

    this.fastify.listen({ port: 8080 }, (err: FastifyError, address: string) => {
      if (err) {
        console.error(err)
        process.exit(1)
      }
      console.log(`Server listening at ${address}`)
    })
  }
}

