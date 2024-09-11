import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { verifyAdministrator } from '../middlewares/verify-administrator'
import { verifyJWT } from '../middlewares/verify-jwt'
import { makeGetLawyersApprovedMetrics } from './factories/make-get-lawyers-approved-metrics'

export async function getLawyersApprovedMetrics(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/lawyers/metrics/approved',
    {
      onRequest: [verifyJWT, verifyAdministrator('ADMIN')],
      schema: {
        tags: ['lawyers'],
        summary:
          'Retorna a quantidade de advogados que aprovaram seus cadastrados',
        response: {
          200: z.number(),
        },
      },
    },
    async (request, reply) => {
      const getLawyersApprovedMetricsUseCase = makeGetLawyersApprovedMetrics()

      const { lawyersApproved } =
        await getLawyersApprovedMetricsUseCase.execute()

      return reply.status(200).send(lawyersApproved)
    },
  )
}
