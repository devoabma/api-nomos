import type { FastifyReply, FastifyRequest } from 'fastify'

import { ResourceNotFound } from '../use-cases/errors/resource-not-found-error'
import { ValidateDataLawyersApprovedError } from '../use-cases/errors/validate-data-lawyers-approved'
import { makeValidateDataLawyer } from './factories/make-validate-data-lawyer'

export async function validateDataLawyerController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const validateDataLawyerUseCase = makeValidateDataLawyer()

    await validateDataLawyerUseCase.execute({
      lawyerId: request.user.sub,
    })

    return reply.status(204).send()
  } catch (err) {
    if (err instanceof ResourceNotFound) {
      return reply.status(409).send({
        message: err.message,
      })
    }

    if (err instanceof ValidateDataLawyersApprovedError) {
      return reply.status(409).send({
        message: err.message,
      })
    }

    // Uma camada acima tratará esse erro.
    throw err
  }
}
