import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeFetchLawyers } from './factories/make-fetch-lawyers'

export async function fetchLawyersControllers(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const querySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = querySchema.parse(request.query)

  const fetchLawyersUseCase = makeFetchLawyers()

  const { lawyers } = await fetchLawyersUseCase.execute({
    page,
  })

  return reply.status(200).send({ lawyers })
}
