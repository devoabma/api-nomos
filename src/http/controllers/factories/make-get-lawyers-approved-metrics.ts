import { GetLawyersApprovedMetricsUseCase } from '@/http/use-cases/get-lawyers-approved-metrics'
import { PrismaLawyersRepository } from '@/repositories/prisma/lawyers-repository'

export function makeGetLawyersApprovedMetrics() {
  const prismaLawyersRepository = new PrismaLawyersRepository()

  const getLawyersApprovedMetricsUseCase = new GetLawyersApprovedMetricsUseCase(
    prismaLawyersRepository,
  )

  return getLawyersApprovedMetricsUseCase
}
