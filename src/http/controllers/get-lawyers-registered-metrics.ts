import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetLawyersRegisteredMetrics } from './factories/make-get-lawyers-registered-metrics'

export async function getLawyersRegisteredMetrics(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getLawyersRegisteredMetricsUseCase = makeGetLawyersRegisteredMetrics()

  const { lawyersRegistered } =
    await getLawyersRegisteredMetricsUseCase.execute()

  return reply.status(200).send(lawyersRegistered)
}
