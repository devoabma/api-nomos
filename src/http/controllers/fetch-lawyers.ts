import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { verifyAdministrator } from '../middlewares/verify-administrator'
import { verifyJWT } from '../middlewares/verify-jwt'
import { makeFetchLawyers } from './factories/make-fetch-lawyers'

export async function fetchLawyersControllers(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/lawyers',
    {
      onRequest: [verifyJWT, verifyAdministrator('ADMIN')],
      schema: {
        tags: ['lawyers'],
        summary: 'Retorna todos os advogados cadastrados',
        querystring: z.object({
          page: z.coerce.number().min(1).default(1),
        }),
        response: {
          200: z.object({
            lawyers: z.array(
              z.object({
                id: z.string().uuid(),
                name: z.string(),
                cpf: z.string(),
                oab: z.string(),
                email: z.string().email(),
                birth: z.string(),
                telephone: z.string(),
                informations_accepted: z.date().nullable(),
                registered: z.date().nullable(),
              }),
            ),
          }),
        },
      },
    },
    async (request, reply) => {
      const { page } = request.query

      const fetchLawyersUseCase = makeFetchLawyers()

      const { lawyers } = await fetchLawyersUseCase.execute({
        page,
      })

      return reply.status(200).send({ lawyers })
    },
  )
}
