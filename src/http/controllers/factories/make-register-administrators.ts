import { RegisterAdministratorsUseCase } from '@/http/use-cases/register-administrators'
import { PrismaAdmininistratosRepository } from '@/repositories/prisma/administrators-repository'

export function makeRegisterAdministrators() {
  const prismaAdmininistratosRepository = new PrismaAdmininistratosRepository()

  const registerAdministratorsUseCase = new RegisterAdministratorsUseCase(
    prismaAdmininistratosRepository,
  )

  return registerAdministratorsUseCase
}
