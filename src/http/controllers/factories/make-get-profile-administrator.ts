import { GetProfileAdministratorUseCase } from '@/http/use-cases/get-profile-administrator'
import { PrismaAdmininistratosRepository } from '@/repositories/prisma/administrators-repository'

export function makeGetProfileAdministrator() {
  const prismaAdmininistratosRepository = new PrismaAdmininistratosRepository()

  const getProfileAdministratorUseCase = new GetProfileAdministratorUseCase(
    prismaAdmininistratosRepository,
  )

  return getProfileAdministratorUseCase
}
