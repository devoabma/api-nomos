import { AuthenticateLawyersUseCase } from '@/http/use-cases/authenticate-lawyers'
import { PrismaLawyersRepository } from '@/repositories/prisma/lawyers-repository'

export function makeAuthenticateLawyers() {
  const prismaLawyersRepository = new PrismaLawyersRepository()

  const authenticateLawyersUseCase = new AuthenticateLawyersUseCase(
    prismaLawyersRepository,
  )

  return authenticateLawyersUseCase
}
