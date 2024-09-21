import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetLawyersApprovedMetrics } from './factories/make-get-lawyers-approved-metrics'

export async function getLawyersApprovedMetrics(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getLawyersApprovedMetricsUseCase = makeGetLawyersApprovedMetrics()

  const { lawyersApproved } = await getLawyersApprovedMetricsUseCase.execute()

  return reply.status(200).send(lawyersApproved)
}
