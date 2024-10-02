import type { Lawyers } from '@prisma/client'

import type { LawyersInterface } from '@/repositories/interfaces/lawyers-interface'

import { ResourceNotFound } from './errors/resource-not-found-error'

interface RemoveLawyerGeridRequest {
  lawyerId: string
}

interface RemoveLawyerGeridResponse {
  lawyer: Lawyers
}

export class RemoveLawyerGeridUseCase {
  // Obtendo as dependências do caso de uso ao invés de instância-las.
  constructor(private lawyersInterface: LawyersInterface) {}

  // execute => Único método a ser chamado desse caso de uso.
  async execute({
    lawyerId,
  }: RemoveLawyerGeridRequest): Promise<RemoveLawyerGeridResponse> {
    const lawyer = await this.lawyersInterface.findById(lawyerId)

    if (!lawyer) {
      throw new ResourceNotFound()
    }

    /** Seta as datas de aprovação e registro com nulos, para o advogado poder confirmar novamente. */
    if (lawyer.registered) {
      lawyer.registered = null
    }

    if (lawyer.informations_accepted) {
      lawyer.informations_accepted = null
    }

    await this.lawyersInterface.save(lawyer)

    return { lawyer }
  }
}
