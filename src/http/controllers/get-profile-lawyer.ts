import type { FastifyReply, FastifyRequest } from 'fastify'

import { makeGetProfileLawyer } from './factories/make-get-profile-lawyer'

export async function getProfileLawyerControllers(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const getProfileLawyerUseCase = makeGetProfileLawyer()

  const { lawyer } = await getProfileLawyerUseCase.execute({
    lawyerId: request.user.sub,
  })

  return reply.status(200).send({
    user: {
      id: lawyer.id,
      name: lawyer.name,
      cpf: lawyer.cpf,
      oab: lawyer.oab,
      birth: lawyer.birth,
      email: lawyer.email,
      informations_accepted: lawyer.informations_accepted,
      registered: lawyer.registered,
    },
  })
}
