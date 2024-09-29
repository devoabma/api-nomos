import type { Lawyers } from '@prisma/client'

import type { LawyersInterface } from '@/repositories/interfaces/lawyers-interface'

import { ResourceNotFound } from './errors/resource-not-found-error'

interface GetAllLawyersUseCaseResponse {
  lawyers: Lawyers[]
}

export class GetAllLawyersUseCase {
  constructor(private lawyersInterface: LawyersInterface) {}

  async execute(): Promise<GetAllLawyersUseCaseResponse> {
    const lawyers = await this.lawyersInterface.findAllLawyers()

    if (!lawyers) {
      throw new ResourceNotFound()
    }

    return { lawyers }
  }
}
