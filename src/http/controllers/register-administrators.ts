import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { AdministradorAlreadyExists } from '../use-cases/errors/administrator-already-exists'
import { SecurityCodeIncorrect } from '../use-cases/errors/security-code-incorrect'
import { makeRegisterAdministrators } from './factories/make-register-administrators'

export async function registerAdmininistratorControllers(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email('Esse campo deve ser um e-mail válido.'),
    password: z.string().min(6, 'A senha deve conter no mínimo 6 caracteres.'),
    securityCode: z.string(),
  })

  const { name, email, password, securityCode } = registerBodySchema.parse(
    request.body,
  )

  try {
    const registerAdministratorsUseCase = makeRegisterAdministrators()

    await registerAdministratorsUseCase.execute({
      name,
      email,
      password,
      securityCode,
    })
  } catch (err) {
    if (err instanceof SecurityCodeIncorrect) {
      return reply.status(400).send({
        message: err.message,
      })
    }

    if (err instanceof AdministradorAlreadyExists) {
      return reply.status(400).send({
        message: err.message,
      })
    }

    // Uma camada acima tratará esse erro.
    throw err
  }

  return reply.status(201).send()
}
