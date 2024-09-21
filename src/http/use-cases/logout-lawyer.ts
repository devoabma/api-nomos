import type { Lawyers } from '@prisma/client'

import type { LawyersInterface } from '@/repositories/interfaces/lawyers-interface'

import { ResourceNotFound } from './errors/resource-not-found-error'

interface LogoutLawyerUseCaseRequest {
  lawyerId: string
}

interface LogoutLawyerUseCaseResponse {
  lawyer: Lawyers
}

export class LogoutLawyerUseCase {
  // Obtendo as dependências do caso de uso ao invés de instância-las.
  constructor(private lawyersInterface: LawyersInterface) {}

  // execute => Único método a ser chamado desse caso de uso.
  async execute({
    lawyerId,
  }: LogoutLawyerUseCaseRequest): Promise<LogoutLawyerUseCaseResponse> {
    // Valida se o email que o administrador está informando existe na base de dados
    const lawyer = await this.lawyersInterface.findById(lawyerId)

    if (!lawyer) {
      throw new ResourceNotFound()
    }

    return { lawyer }
  }
}
