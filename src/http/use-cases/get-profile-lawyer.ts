import type { Lawyers } from '@prisma/client'

import type { LawyersInterface } from '@/repositories/interfaces/lawyers-interface'

import { ResourceNotFound } from './errors/resource-not-found-error'

interface GetProfileLawyerUseCaseRequest {
  lawyerId: string
}

interface GetProfileLawyerUseCaseResponse {
  lawyer: Lawyers
}

export class GetProfileLawyerUseCase {
  // Obtendo as dependências do caso de uso ao invés de instância-las.
  constructor(private lawyersInterface: LawyersInterface) {}

  // execute => Único método a ser chamado desse caso de uso.
  async execute({
    lawyerId,
  }: GetProfileLawyerUseCaseRequest): Promise<GetProfileLawyerUseCaseResponse> {
    // Valida se o email que o administrador está informando existe na base de dados
    const lawyer = await this.lawyersInterface.findById(lawyerId)

    if (!lawyer) {
      throw new ResourceNotFound()
    }

    return { lawyer }
  }
}
