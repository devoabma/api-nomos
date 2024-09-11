import { GetLawyersMetricsUseCase } from '@/http/use-cases/get-lawyers-metrics'
import { PrismaLawyersRepository } from '@/repositories/prisma/lawyers-repository'

export function makeGetLawyersMetrics() {
  const prismaLawyersRepository = new PrismaLawyersRepository()

  const getLawyersMetricsUseCase = new GetLawyersMetricsUseCase(
    prismaLawyersRepository,
  )

  return getLawyersMetricsUseCase
}
