import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { verifyAdministrator } from '../middlewares/verify-administrator'
import { verifyJWT } from '../middlewares/verify-jwt'
import { makeGetLawyersMetrics } from './factories/make-get-lawyers-metrics'

export async function getLawyersMetrics(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/lawyers/metrics',
    {
      onRequest: [verifyJWT, verifyAdministrator('ADMIN')],
      schema: {
        tags: ['lawyers'],
        summary: 'Retorna a quantidade de advogados cadastrados',
        response: {
          200: z.number(),
        },
      },
    },
    async (request, reply) => {
      const getLawyersMetricsUseCase = makeGetLawyersMetrics()

      const { countAllLawyers } = await getLawyersMetricsUseCase.execute()

      return reply.status(200).send(countAllLawyers)
    },
  )
}
