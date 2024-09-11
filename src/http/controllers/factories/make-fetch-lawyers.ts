import { FetchLawyersUseCase } from '@/http/use-cases/fetch-lawyers'
import { PrismaLawyersRepository } from '@/repositories/prisma/lawyers-repository'

export function makeFetchLawyers() {
  const prismaLawyersRepository = new PrismaLawyersRepository()

  const fetchLawyersUseCase = new FetchLawyersUseCase(prismaLawyersRepository)

  return fetchLawyersUseCase
}
