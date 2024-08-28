import type { Lawyers } from '@prisma/client'

import type { LawyersInterface } from '@/repositories/interfaces/lawyers-interface'

import { LawyerNotFound } from './errors/lawyer-not-found'

interface AuthenticateLawyersUseCaseRequest {
  cpf: string
  oab: string
}

interface AuthenticateLawyersUseCaseResponse {
  lawyer: Lawyers
}

export class AuthenticateLawyersUseCase {
  // Obtendo as dependências do caso de uso ao invés de instância-las.
  constructor(private lawyersInterface: LawyersInterface) {}

  // execute => Único método a ser chamado desse caso de uso.
  async execute({
    cpf,
    oab,
  }: AuthenticateLawyersUseCaseRequest): Promise<AuthenticateLawyersUseCaseResponse> {
    // Valida se existe um cadastro com esse cpf
    const lawyer = await this.lawyersInterface.findByCPF(cpf)

    if (!lawyer) {
      throw new LawyerNotFound()
    }

    if (oab !== lawyer.oab) {
      throw new LawyerNotFound()
    }

    return { lawyer }
  }
}
