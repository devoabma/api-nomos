import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetLawyersMetrics } from './factories/make-get-lawyers-metrics'

export async function getLawyersMetrics(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getLawyersMetricsUseCase = makeGetLawyersMetrics()

  const { countAllLawyers } = await getLawyersMetricsUseCase.execute()

  return reply.status(200).send(countAllLawyers)
}
