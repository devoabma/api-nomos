import type { Lawyers } from '@prisma/client'

import { API_PROTHEUS_SITUATION } from '@/lib/axios'
import type { LawyersInterface } from '@/repositories/interfaces/lawyers-interface'

import { LawyerLoginDefaulterError } from './errors/lawyer-login-defaulter-error'
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

    /** Busca na API do Protheus a situação financeira do advogado(a) */
    const { data: dataStatus } = await API_PROTHEUS_SITUATION(`/${cpf}`)

    if (!dataStatus) {
      throw new LawyerLoginDefaulterError()
    }

    return { lawyer }
  }
}
