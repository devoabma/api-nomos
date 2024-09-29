import type { FastifyReply, FastifyRequest } from 'fastify'

import { ResourceNotFound } from '../use-cases/errors/resource-not-found-error'
import { makeGetAllLawyers } from './factories/make-get-all-lawyers'

export async function getAllLawyersController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getAllLawyersUseCase = makeGetAllLawyers()

    const { lawyers } = await getAllLawyersUseCase.execute()

    return reply.status(200).send({ lawyers })
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
