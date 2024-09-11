import { ValidateDataLawyerUseCase } from '@/http/use-cases/validate-data-lawyer'
import { PrismaLawyersRepository } from '@/repositories/prisma/lawyers-repository'

export function makeValidateDataLawyer() {
  const prismaLawyersRepository = new PrismaLawyersRepository()

  const validateDataLawyerUseCase = new ValidateDataLawyerUseCase(
    prismaLawyersRepository,
  )

  return validateDataLawyerUseCase
}
