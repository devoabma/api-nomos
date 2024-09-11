import type { Lawyers } from '@prisma/client'

import type { LawyersInterface } from '@/repositories/interfaces/lawyers-interface'

import { ResourceNotFound } from './errors/resource-not-found-error'
import { ValidateDataLawyersApprovedError } from './errors/validate-data-lawyers-approved'

interface ValidateDataLawyerUseCaseRequest {
  lawyerId: string
}

interface ValidateDataLawyerUseCaseResponse {
  lawyer: Lawyers
}

export class ValidateDataLawyerUseCase {
  // Obtendo as dependências do caso de uso ao invés de instância-las.
  constructor(private lawyersInterface: LawyersInterface) {}

  // execute => Único método a ser chamado desse caso de uso.
  async execute({
    lawyerId,
  }: ValidateDataLawyerUseCaseRequest): Promise<ValidateDataLawyerUseCaseResponse> {
    // Valida se o email que o administrador está informando existe na base de dados
    const lawyer = await this.lawyersInterface.findById(lawyerId)

    if (!lawyer) {
      throw new ResourceNotFound()
    }

    if (lawyer.informations_accepted) {
      throw new ValidateDataLawyersApprovedError()
    }

    /** Seta a data que o advogado confirmou seus dados para cadastro da GERID */
    lawyer.informations_accepted = new Date()

    await this.lawyersInterface.save(lawyer)

    return { lawyer }
  }
}
