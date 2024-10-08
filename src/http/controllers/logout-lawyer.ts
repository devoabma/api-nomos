import type { FastifyReply, FastifyRequest } from 'fastify'

import { ResourceNotFound } from '../use-cases/errors/resource-not-found-error'
import { makeLogoutLawyer } from './factories/make-logout-lawyer'

export async function logoutLawyerControllers(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const logoutLawyerUseCase = makeLogoutLawyer()

    await logoutLawyerUseCase.execute({
      lawyerId: request.user.sub,
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
