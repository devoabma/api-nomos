import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { LawyerAlreadyRegistered } from '../use-cases/errors/lawyer-already-registered'
import { NotConfirmLawyerError } from '../use-cases/errors/not-confirm-lawyer-error'
import { ResourceNotFound } from '../use-cases/errors/resource-not-found-error'
import { makeConfirmLawyerGerid } from './factories/make-confirm-lawyer-gerid'

export async function confirmLawyerGeridController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const confirmLawyerParamsSchema = z.object({
    lawyerId: z.string().uuid(),
  })

  const { lawyerId } = confirmLawyerParamsSchema.parse(request.params)

  try {
    const confirmLawyerGeridUsecase = makeConfirmLawyerGerid()

    await confirmLawyerGeridUsecase.execute({
      lawyerId,
    })

    return reply.status(204).send()
  } catch (err) {
    if (err instanceof ResourceNotFound) {
      return reply.status(404).send({
        message: err.message,
      })
    }

    if (err instanceof NotConfirmLawyerError) {
      return reply.status(409).send({
        message: err.message,
      })
    }

    if (err instanceof LawyerAlreadyRegistered) {
      return reply.status(409).send({
        message: err.message,
      })
    }

    // Uma camada acima tratará esse erro.
    throw err
  }
}
