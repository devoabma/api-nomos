import { FastifyInstance } from 'fastify'

import { authenticateAdmininistratorControllers } from '../controllers/authenticate-administrators'
import { authenticateLawyersControllers } from '../controllers/authenticate-lawyers'
import { getProfileAdmininistratorControllers } from '../controllers/get-profile-administrator'
import { getProfileLawyerControllers } from '../controllers/get-profile-lawyer'
import { registerAdmininistratorControllers } from '../controllers/register-administrators'
import { registerLawyerControllers } from '../controllers/register-lawyers'

export async function appRouter(app: FastifyInstance) {
  /** Administradores */
  app.register(registerAdmininistratorControllers)
  app.register(authenticateAdmininistratorControllers)
  app.register(getProfileAdmininistratorControllers)

  /** Advogados */
  app.register(registerLawyerControllers)
  app.register(authenticateLawyersControllers)
  app.register(getProfileLawyerControllers)
}
