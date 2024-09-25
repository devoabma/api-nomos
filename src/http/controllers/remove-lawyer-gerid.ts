import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { ResourceNotFound } from '../use-cases/errors/resource-not-found-error'
import { makeRemoveLawyerGerid } from './factories/make-remove-lawyer-gerid'

export async function removeLawyerGeridController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const removeLawyerParamsSchema = z.object({
    lawyerId: z.string().uuid(),
  })

  const { lawyerId } = removeLawyerParamsSchema.parse(request.params)

  try {
    const removeLawyerGeridUsecase = makeRemoveLawyerGerid()

    await removeLawyerGeridUsecase.execute({
      lawyerId,
    })

    return reply.status(204).send()
  } catch (err) {
    if (err instanceof ResourceNotFound) {
      return reply.status(404).send({
        message: err.message,
      })
    }

    // Uma camada acima tratará esse erro.
    throw err
  }
}
