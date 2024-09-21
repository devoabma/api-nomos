import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { InvalidCredentialsError } from '../use-cases/errors/invalid-credentials-error'
import { NotAdministrator } from '../use-cases/errors/not-administrator'
import { makeAuthenticateAdministrators } from './factories/make-authenticate-administrators'

export async function authenticateAdmininistratorControllers(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email('Esse campo deve ser um e-mail válido.'),
    password: z.string().min(6, 'A senha deve conter no mínimo 6 caracteres.'),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateAdministratorsUseCase = makeAuthenticateAdministrators()

    const { administrator } = await authenticateAdministratorsUseCase.execute({
      email,
      password,
    })

    // Criação do token de autenticação
    const token = await reply.jwtSign(
      {
        role: administrator.role,
      },
      {
        sign: {
          sub: administrator.id,
          expiresIn: '1d',
        },
      },
    )

    return reply
      .setCookie('@nomos-auth', token, {
        path: '/',
        httpOnly: true,
        sameSite: true,
        secure: true,
        maxAge: 60 * 60 * 24,
      })
      .status(200)
      .send({
        token,
      })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({
        message: err.message,
      })
    }

    if (err instanceof NotAdministrator) {
      return reply.status(403).send({
        message: err.message,
      })
    }

    // Uma camada acima tratará esse erro.
    throw err
  }
}
