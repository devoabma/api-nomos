import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { verifyAdministrator } from '../middlewares/verify-administrator'
import { verifyJWT } from '../middlewares/verify-jwt'
import { NotConfirmLawyerError } from '../use-cases/errors/not-confirm-lawyer-error'
import { makeConfirmLawyerGerid } from './factories/make-confirm-lawyer-gerid'

export async function confirmLawyerGeridController(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().patch(
    '/lawyer/:lawyerId/confirm',
    {
      onRequest: [verifyJWT, verifyAdministrator('ADMIN')],
      schema: {
        tags: ['lawyers'],
        summary: 'Confirma o advogado cadastrado no GERID',
        params: z.object({
          lawyerId: z.string().uuid(),
        }),
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
        const { lawyerId } = request.params

        const confirmLawyerGeridUsecase = makeConfirmLawyerGerid()

        await confirmLawyerGeridUsecase.execute({
          lawyerId,
        })

        return reply.status(204).send()
      } catch (err) {
        if (err instanceof NotConfirmLawyerError) {
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
