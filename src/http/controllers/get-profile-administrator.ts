import type { FastifyReply, FastifyRequest } from 'fastify'

import { ResourceNotFound } from '../use-cases/errors/resource-not-found-error'
import { makeGetProfileAdministrator } from './factories/make-get-profile-administrator'

export async function getProfileAdmininistratorControllers(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const getProfileAdministratorUseCase = makeGetProfileAdministrator()

    const { administrator } = await getProfileAdministratorUseCase.execute({
      administratorId: request.user.sub,
    })

    return reply.status(200).send({
      user: {
        id: administrator.id,
        name: administrator.name,
        email: administrator.email,
      },
    })
  } catch (err) {
    if (err instanceof ResourceNotFound) {
      return reply.status(401).send({
        message: err.message,
      })
    }

    // Uma camada acima tratará esse erro.
    throw err
  }
}
