import { GetProfileLawyerUseCase } from '@/http/use-cases/get-profile-lawyer'
import { PrismaLawyersRepository } from '@/repositories/prisma/lawyers-repository'

export function makeGetProfileLawyer() {
  const prismaLawyersRepository = new PrismaLawyersRepository()

  const getProfileLawyerUseCase = new GetProfileLawyerUseCase(
    prismaLawyersRepository,
  )

  return getProfileLawyerUseCase
}
