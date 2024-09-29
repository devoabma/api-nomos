import { GetAllLawyersUseCase } from '@/http/use-cases/get-all-lawyers'
import { PrismaLawyersRepository } from '@/repositories/prisma/lawyers-repository'

export function makeGetAllLawyers() {
  const prismaLawyersRepository = new PrismaLawyersRepository()

  const getAllLawyersUseCase = new GetAllLawyersUseCase(prismaLawyersRepository)

  return getAllLawyersUseCase
}
