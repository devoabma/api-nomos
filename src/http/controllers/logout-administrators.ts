import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeLogoutAdministrator } from './factories/make-logout-administrators'

export async function logoutAdmininistratorControllers(
  request: FastifyRequest,
  reply: FastifyReply,
) {
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
}
