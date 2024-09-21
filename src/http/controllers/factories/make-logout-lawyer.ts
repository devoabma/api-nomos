import { LogoutLawyerUseCase } from '@/http/use-cases/logout-lawyer'
import { PrismaLawyersRepository } from '@/repositories/prisma/lawyers-repository'

export function makeLogoutLawyer() {
  const prismaLawyersRepository = new PrismaLawyersRepository()

  const logoutLawyerUseCase = new LogoutLawyerUseCase(prismaLawyersRepository)

  return logoutLawyerUseCase
}
