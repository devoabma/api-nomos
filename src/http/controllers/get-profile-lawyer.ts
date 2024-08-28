import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { verifyJWT } from '../middlewares/verify-jwt'
import { makeGetProfileLawyer } from './factories/make-get-profile-lawyer'

export async function getProfileLawyerControllers(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/lawyer/me',
    {
      onRequest: [verifyJWT],
      schema: {
        tags: ['lawyers'],
        summary: 'Busca o perfil de um advogado autenticado',
        response: {
          200: z.object({
            user: z.object({
              id: z.string().uuid(),
              name: z.string(),
              cpf: z.string(),
              oab: z.string(),
              birth: z.string(),
              email: z.string().email(),
              informations_accepted: z.date().nullable(),
              registered: z.date().nullable(),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const getProfileLawyerUseCase = makeGetProfileLawyer()

      const { lawyer } = await getProfileLawyerUseCase.execute({
        lawyerId: request.user.sub,
      })

      return reply.status(200).send({
        user: {
          id: lawyer.id,
          name: lawyer.name,
          cpf: lawyer.cpf,
          oab: lawyer.oab,
          birth: lawyer.birth,
          email: lawyer.email,
          informations_accepted: lawyer.informations_accepted!,
          registered: lawyer.informations_accepted!,
        },
      })
    },
  )
}
