import { RegisterLawyersUseCase } from '@/http/use-cases/register-lawyers'
import { PrismaLawyersRepository } from '@/repositories/prisma/lawyers-repository'

export function makeRegisterLawyer() {
  const prismaLawyersRepository = new PrismaLawyersRepository()

  const registerLawyersUseCase = new RegisterLawyersUseCase(
    prismaLawyersRepository,
  )

  return registerLawyersUseCase
}
