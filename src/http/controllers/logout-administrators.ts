import type { FastifyReply, FastifyRequest } from 'fastify'

import { ResourceNotFound } from '../use-cases/errors/resource-not-found-error'
import { makeLogoutAdministrator } from './factories/make-logout-administrators'

export async function logoutAdmininistratorControllers(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const logoutAdministratorUseCase = makeLogoutAdministrator()

    await logoutAdministratorUseCase.execute({
      administratorId: request.user.sub,
    })

    return reply
      .clearCookie('@nomos-auth', {
        path: '/',
      })
      .status(200)
      .send()
  } catch (err) {
    if (err instanceof ResourceNotFound) {
      return reply.status(400).send({
        message: err.message,
      })
    }

    // Uma camada acima tratará esse erro.
    throw err
  }
}
