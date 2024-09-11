import { GetLawyersRegisteredMetricsUseCase } from '@/http/use-cases/get-lawyers-registered-metrics'
import { PrismaLawyersRepository } from '@/repositories/prisma/lawyers-repository'

export function makeGetLawyersRegisteredMetrics() {
  const prismaLawyersRepository = new PrismaLawyersRepository()

  const getLawyersRegisteredMetricsUseCase =
    new GetLawyersRegisteredMetricsUseCase(prismaLawyersRepository)

  return getLawyersRegisteredMetricsUseCase
}
