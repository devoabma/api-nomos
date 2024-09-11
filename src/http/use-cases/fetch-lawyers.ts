import type { Lawyers } from '@prisma/client'

import type { LawyersInterface } from '@/repositories/interfaces/lawyers-interface'

interface FetchLawyersUseCaseRequest {
  page: number
}

interface FetchLawyersUseCaseResponse {
  lawyers: Lawyers[]
}

export class FetchLawyersUseCase {
  constructor(private lawyersInterface: LawyersInterface) {}

  async execute({
    page,
  }: FetchLawyersUseCaseRequest): Promise<FetchLawyersUseCaseResponse> {
    const lawyers = await this.lawyersInterface.findMany(page)

    return { lawyers }
  }
}
