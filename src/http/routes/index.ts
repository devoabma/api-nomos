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
import { logoutAdmininistratorControllers } from '../controllers/logout-administrators'
import { logoutLawyerControllers } from '../controllers/logout-lawyer'
import { registerAdmininistratorControllers } from '../controllers/register-administrators'
import { registerLawyerControllers } from '../controllers/register-lawyers'
import { validateDataLawyerController } from '../controllers/validate-data-lawyer'
import { verifyAdministrator } from '../middlewares/verify-administrator'
import { verifyJWT } from '../middlewares/verify-jwt'

export async function appRouter(app: FastifyInstance) {
  /** Administradores */
  app.post('/administrator/register', registerAdmininistratorControllers)

  app.post('/administrator/sessions', authenticateAdmininistratorControllers)

  app.post(
    '/administrador/logout',
    { onRequest: [verifyJWT, verifyAdministrator('ADMIN')] },
    logoutAdmininistratorControllers,
  )

  app.get(
    '/administrator/me',
    { onRequest: [verifyJWT, verifyAdministrator('ADMIN')] },
    getProfileAdmininistratorControllers,
  )

  app.get(
    '/lawyers',
    { onRequest: [verifyJWT, verifyAdministrator('ADMIN')] },
    fetchLawyersControllers,
  )

  app.get(
    '/lawyers/metrics',
    { onRequest: [verifyJWT, verifyAdministrator('ADMIN')] },
    getLawyersMetrics,
  )

  app.get(
    '/lawyers/metrics/approved',
    { onRequest: [verifyJWT, verifyAdministrator('ADMIN')] },
    getLawyersApprovedMetrics,
  )

  app.patch(
    '/lawyer/:lawyerId/confirm',
    { onRequest: [verifyJWT, verifyAdministrator('ADMIN')] },
    confirmLawyerGeridController,
  )

  app.get(
    '/lawyers/metrics/registered',
    { onRequest: [verifyJWT, verifyAdministrator('ADMIN')] },
    getLawyersRegisteredMetrics,
  )

  // /** Advogados */
  app.post('/lawyers/register', registerLawyerControllers)

  app.post('/lawyer/sessions', authenticateLawyersControllers)

  app.post(
    '/lawyer/logout',
    { onRequest: [verifyJWT] },
    logoutLawyerControllers,
  )

  app.get('/lawyer/me', { onRequest: [verifyJWT] }, getProfileLawyerControllers)

  app.patch(
    '/lawyer/approved',
    { onRequest: [verifyJWT] },
    validateDataLawyerController,
  )
}
