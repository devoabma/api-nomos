import type { FastifyReply, FastifyRequest } from 'fastify'

import { ResourceNotFound } from '../use-cases/errors/resource-not-found-error'
import { makeGetProfileLawyer } from './factories/make-get-profile-lawyer'

export async function getProfileLawyerControllers(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
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
        telephone: lawyer.telephone,
        informations_accepted: lawyer.informations_accepted,
        registered: lawyer.registered,
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
