import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { verifyAdministrator } from '../middlewares/verify-administrator'
import { verifyJWT } from '../middlewares/verify-jwt'
import { makeGetProfileAdministrator } from './factories/make-get-profile-administrator'

export async function getProfileAdmininistratorControllers(
  app: FastifyInstance,
) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/administrator/me',
    {
      onRequest: [verifyJWT, verifyAdministrator('ADMIN')],
      schema: {
        tags: ['administrators'],
        summary: 'Busca o perfil do administrador autenticado',
        response: {
          200: z.object({
            user: z.object({
              id: z.string().uuid(),
              name: z.string(),
              email: z.string().email(),
            }),
          }),
        },
      },
    },
    async (request, reply) => {
      const getProfileAdministratorUseCase = makeGetProfileAdministrator()

      const { administrator } = await getProfileAdministratorUseCase.execute({
        administratorId: request.user.sub,
      })

      return reply.status(200).send({
        user: {
          id: administrator.id,
          name: administrator.name,
          email: administrator.email,
        },
      })
    },
  )
}
