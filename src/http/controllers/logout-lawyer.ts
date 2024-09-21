import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeLogoutLawyer } from './factories/make-logout-lawyer'

export async function logoutLawyerControllers(
  request: FastifyRequest,
  reply: FastifyReply,
) {
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
}
