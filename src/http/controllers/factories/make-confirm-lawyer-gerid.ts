import { ConfirmLawyerGerid } from '@/http/use-cases/confirm-lawyer-gerid'
import { PrismaLawyersRepository } from '@/repositories/prisma/lawyers-repository'

export function makeConfirmLawyerGerid() {
  const prismaLawyersRepository = new PrismaLawyersRepository()

  const confirmLawyerGeridUsecase = new ConfirmLawyerGerid(
    prismaLawyersRepository,
  )

  return confirmLawyerGeridUsecase
}
