import { AuthenticateAdministratorsUseCase } from '@/http/use-cases/authenticate-administrators'
import { PrismaAdmininistratosRepository } from '@/repositories/prisma/administrators-repository'

export function makeAuthenticateAdministrators() {
  const prismaAdmininistratosRepository = new PrismaAdmininistratosRepository()

  const authenticateAdministratorsUseCase =
    new AuthenticateAdministratorsUseCase(prismaAdmininistratosRepository)

  return authenticateAdministratorsUseCase
}
