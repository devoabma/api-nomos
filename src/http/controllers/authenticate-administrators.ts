import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { InvalidCredentialsError } from '../use-cases/errors/invalid-credentials-error'
import { NotAdministrator } from '../use-cases/errors/not-administrator'
import { makeAuthenticateAdministrators } from './factories/make-authenticate-administrators'

export async function authenticateAdmininistratorControllers(
  app: FastifyInstance,
) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/administrator/sessions',
    {
      schema: {
        tags: ['administrators'],
        summary: 'Autenticação de um administrador.',
        body: z.object({
          email: z.string().email('Esse campo deve ser um e-mail válido.'),
          password: z
            .string()
            .min(6, 'A senha deve conter no mínimo 6 caracteres.'),
        }),
      },
    },
    async (request, reply) => {
      const { email, password } = request.body

      try {
        const authenticateAdministratorsUseCase =
          makeAuthenticateAdministrators()

        const { administrator } =
          await authenticateAdministratorsUseCase.execute({
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
          .setCookie('auth', token, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
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
    },
  )
}
