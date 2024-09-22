import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { makeFetchLawyers } from './factories/make-fetch-lawyers'

export async function fetchLawyersControllers(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const querySchema = z.object({
    pageIndex: z.coerce.number().min(1).default(1),
    name: z.string().optional(),
    cpf: z.string().optional(),
    email: z.string().optional(),
  })

  const { pageIndex, name, cpf, email } = querySchema.parse(request.query)

  const fetchLawyersUseCase = makeFetchLawyers()

  const { lawyers } = await fetchLawyersUseCase.execute({
    pageIndex,
    name,
    cpf,
    email,
  })

  return reply.status(200).send({ lawyers })
}
