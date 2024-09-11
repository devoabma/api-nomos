import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { verifyAdministrator } from '../middlewares/verify-administrator'
import { verifyJWT } from '../middlewares/verify-jwt'
import { makeGetLawyersRegisteredMetrics } from './factories/make-get-lawyers-registered-metrics'

export async function getLawyersRegisteredMetrics(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/lawyers/metrics/registered',
    {
      onRequest: [verifyJWT, verifyAdministrator('ADMIN')],
      schema: {
        tags: ['lawyers'],
        summary:
          'Retorna a quantidade de advogados que foram cadastrados no GERID',
        response: {
          200: z.number(),
        },
      },
    },
    async (request, reply) => {
      const getLawyersRegisteredMetricsUseCase =
        makeGetLawyersRegisteredMetrics()

      const { lawyersRegistered } =
        await getLawyersRegisteredMetricsUseCase.execute()

      return reply.status(200).send(lawyersRegistered)
    },
  )
}
