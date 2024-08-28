import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { LawyerNotFound } from '../use-cases/errors/lawyer-not-found'
import { makeAuthenticateLawyers } from './factories/make-authenticate-lawyers'

export async function authenticateLawyersControllers(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/lawyer/sessions',
    {
      schema: {
        tags: ['lawyers'],
        summary: 'Autenticação de um advogado.',
        body: z.object({
          cpf: z.string(),
          oab: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { cpf, oab } = request.body

      try {
        const authenticateLawyersUseCase = makeAuthenticateLawyers()

        const { lawyer } = await authenticateLawyersUseCase.execute({
          cpf,
          oab,
        })

        // Criação do token de autenticação
        const token = await reply.jwtSign(
          {
            role: lawyer.role,
          },
          {
            sign: {
              sub: lawyer.id,
            },
          },
        )

        return reply.status(200).send({
          token,
        })
      } catch (err) {
        if (err instanceof LawyerNotFound) {
          return reply.status(400).send({
            message: err.message,
          })
        }

        // Uma camada acima tratará esse erro.
        throw err
      }
    },
  )
}
