import type { Lawyers } from '@prisma/client'

import type { LawyersInterface } from '@/repositories/interfaces/lawyers-interface'

interface FetchLawyersUseCaseRequest {
  pageIndex: number
  name?: string
  cpf?: string
  email?: string
}

interface FetchLawyersUseCaseResponse {
  lawyers: Lawyers[]
}

export class FetchLawyersUseCase {
  constructor(private lawyersInterface: LawyersInterface) {}

  async execute({
    pageIndex,
    name,
    cpf,
    email,
  }: FetchLawyersUseCaseRequest): Promise<FetchLawyersUseCaseResponse> {
    const lawyers = await this.lawyersInterface.findMany(
      pageIndex,
      name || '',
      cpf || '',
      email || '',
    )

    return { lawyers }
  }
}
