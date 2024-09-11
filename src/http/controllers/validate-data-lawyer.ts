import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { verifyJWT } from '../middlewares/verify-jwt'
import { ValidateDataLawyersApprovedError } from '../use-cases/errors/validate-data-lawyers-approved'
import { makeValidateDataLawyer } from './factories/make-validate-data-lawyer'

export async function validateDataLawyerController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().patch(
    '/lawyer/approved',
    {
      onRequest: [verifyJWT],
      schema: {
        tags: ['lawyers'],
        summary: 'Confirma os dados do advogado para cadastro no GERID',
        response: {
          204: z.null(),
          409: z.object({
            message: z.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      try {
        const validateDataLawyerUseCase = makeValidateDataLawyer()

        await validateDataLawyerUseCase.execute({
          lawyerId: request.user.sub,
        })

        return reply.status(204).send()
      } catch (err) {
        if (err instanceof ValidateDataLawyersApprovedError) {
          return reply.status(409).send({
            message: err.message,
          })
        }

        // Uma camada acima tratará esse erro.
        throw err
      }
    },
  )
}
