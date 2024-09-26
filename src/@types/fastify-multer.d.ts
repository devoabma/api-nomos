import 'fastify'

import { Multer } from 'fastify-multer'

declare module 'fastify' {
  interface FastifyRequest {
    file: Multer.File // Definindo o tipo do arquivo
  }
}
