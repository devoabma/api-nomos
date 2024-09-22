import type { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { LawyerNotFound } from '../use-cases/errors/lawyer-not-found'
import { makeAuthenticateLawyers } from './factories/make-authenticate-lawyers'

export async function authenticateLawyersControllers(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    cpf: z.string(),
    oab: z.string(),
  })

  const { cpf, oab } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateLawyersUseCase = makeAuthenticateLawyers()

    const { lawyer } = await authenticateLawyersUseCase.execute({
      cpf,
      oab,
    })

    // Criação do token de autenticação
    const token = await reply.jwtSign(
      {
        role: lawyer.role,
      },
      {
        sign: {
          sub: lawyer.id,
          expiresIn: '1d',
        },
      },
    )

    return reply
      .setCookie('@nomos-auth', token, {
        path: '/',
        httpOnly: true,
        sameSite: true,
        maxAge: 60 * 60 * 24,
      })
      .status(200)
      .send({
        token,
      })
  } catch (err) {
    if (err instanceof LawyerNotFound) {
      return reply.status(400).send({
        message: err.message,
      })
    }

    // Uma camada acima tratará esse erro.
    throw err
  }
}
