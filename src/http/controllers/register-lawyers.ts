import { AxiosError } from 'axios'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { LawyerAlreadyExists } from '../use-cases/errors/lawyer-already-exists'
import { LawyerNotFound } from '../use-cases/errors/lawyer-not-found'
import { makeRegisterLawyer } from './factories/make-register-lawyer'

export async function registerLawyerControllers(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/lawyers/register',
    {
      schema: {
        tags: ['lawyers'],
        summary: 'Registro de um advogado.',
        body: z.object({
          cpf: z.string().min(11),
          oab: z.string().max(7),
          birth: z.string().min(8),
        }),
      },
    },
    async (request, reply) => {
      const { cpf, oab, birth } = request.body

      try {
        const registerLawyersUseCase = makeRegisterLawyer()

        await registerLawyersUseCase.execute({
          cpf,
          oab,
          birth,
        })
      } catch (err) {
        if (err instanceof AxiosError) {
          return reply.status(404).send({
            message: 'Advogado não encontrado ou dados inconsistentes.',
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

        throw err
      }

      return reply.status(201).send()
    },
  )
}
