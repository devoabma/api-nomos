import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { AdministradorAlreadyExists } from '../use-cases/errors/administrator-already-exists'
import { SecurityCodeIncorrect } from '../use-cases/errors/security-code-incorrect'
import { makeRegisterAdministrators } from './factories/make-register-administrators'

export async function registerAdmininistratorControllers(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/administrator/register',
    {
      schema: {
        tags: ['administrators'],
        summary: 'Criação de um administrador.',
        body: z.object({
          name: z.string(),
          email: z.string().email('Esse campo deve ser um e-mail válido.'),
          password: z
            .string()
            .min(8, 'A senha deve conter no mínimo 8 caracteres.'),
          securityCode: z.string(),
        }),
      },
    },
    async (request, reply) => {
      const { name, email, password, securityCode } = request.body

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
    },
  )
}
