import { LogoutAdministratorUseCase } from '@/http/use-cases/logout-administrator'
import { PrismaAdmininistratosRepository } from '@/repositories/prisma/administrators-repository'

export function makeLogoutAdministrator() {
  const prismaAdmininistratosRepository = new PrismaAdmininistratosRepository()

  const logoutAdministratorUseCase = new LogoutAdministratorUseCase(
    prismaAdmininistratosRepository,
  )

  return logoutAdministratorUseCase
}
