import { RemoveLawyerGeridUseCase } from '@/http/use-cases/remove-lawyer-gerid'
import { PrismaLawyersRepository } from '@/repositories/prisma/lawyers-repository'

export function makeRemoveLawyerGerid() {
  const prismaLawyersRepository = new PrismaLawyersRepository()

  const removeLawyerGeridUsecase = new RemoveLawyerGeridUseCase(
    prismaLawyersRepository,
  )

  return removeLawyerGeridUsecase
}
