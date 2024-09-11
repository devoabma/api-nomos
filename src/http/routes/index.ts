import { FastifyInstance } from 'fastify'

import { authenticateAdmininistratorControllers } from '../controllers/authenticate-administrators'
import { authenticateLawyersControllers } from '../controllers/authenticate-lawyers'
import { confirmLawyerGeridController } from '../controllers/confirm-lawyer-gerid'
import { fetchLawyersControllers } from '../controllers/fetch-lawyers'
import { getLawyersApprovedMetrics } from '../controllers/get-lawyers-approved-metrics'
import { getLawyersMetrics } from '../controllers/get-lawyers-metrics'
import { getLawyersRegisteredMetrics } from '../controllers/get-lawyers-registered-metrics'
import { getProfileAdmininistratorControllers } from '../controllers/get-profile-administrator'
import { getProfileLawyerControllers } from '../controllers/get-profile-lawyer'
import { registerAdmininistratorControllers } from '../controllers/register-administrators'
import { registerLawyerControllers } from '../controllers/register-lawyers'
import { validateDataLawyerController } from '../controllers/validate-data-lawyer'

export async function appRouter(app: FastifyInstance) {
  /** Administradores */
  app.register(registerAdmininistratorControllers)
  app.register(authenticateAdmininistratorControllers)
  app.register(getProfileAdmininistratorControllers)

  app.register(fetchLawyersControllers)
  app.register(confirmLawyerGeridController)
  app.register(getLawyersMetrics)
  app.register(getLawyersApprovedMetrics)
  app.register(getLawyersRegisteredMetrics)

  /** Advogados */
  app.register(registerLawyerControllers)
  app.register(authenticateLawyersControllers)
  app.register(getProfileLawyerControllers)
  app.register(validateDataLawyerController)
}
