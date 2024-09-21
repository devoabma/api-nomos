import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetProfileAdministrator } from './factories/make-get-profile-administrator'

export async function getProfileAdmininistratorControllers(
  request: FastifyRequest,
  reply: FastifyReply,
) {
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
}
