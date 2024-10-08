import { AxiosError } from 'axios'
import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { LawyerAlreadyExists } from '../use-cases/errors/lawyer-already-exists'
import { LawyerDefaulterError } from '../use-cases/errors/lawyer-defaulter-error'
import { LawyerNotFound } from '../use-cases/errors/lawyer-not-found'
import { makeRegisterLawyer } from './factories/make-register-lawyer'

export async function registerLawyerControllers(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    cpf: z.string().min(11),
    oab: z.string().min(1),
    birth: z.string().min(1),
  })

  const { cpf, oab, birth } = registerBodySchema.parse(request.body)

  try {
    const registerLawyersUseCase = makeRegisterLawyer()

    await registerLawyersUseCase.execute({
      cpf,
      oab,
      birth,
    })

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof AxiosError) {
      return reply.status(404).send({
        message: 'Advogado não encontrado ou dados inconsistentes.',
      })
    }

    if (err instanceof LawyerDefaulterError) {
      return reply.status(401).send({
        message: err.message,
      })
    }

    if (err instanceof LawyerNotFound) {
      return reply.status(404).send({
        message: err.message,
      })
    }

    if (err instanceof LawyerAlreadyExists) {
      return reply.status(409).send({
        message: err.message,
      })
    }

    // Uma camada acima tratará esse erro.
    throw err
  }
}
