import type { Administrators } from '@prisma/client'

import type { AdministratorsInterface } from '@/repositories/interfaces/administrators-interface'

import { ResourceNotFound } from './errors/resource-not-found-error'

interface GetProfileAdministratorUseCaseRequest {
  administratorId: string
}

interface GetProfileAdministratorUseCaseResponse {
  administrator: Administrators
}

export class GetProfileAdministratorUseCase {
  // Obtendo as dependências do caso de uso ao invés de instância-las.
  constructor(private administratorsInterface: AdministratorsInterface) {}

  // execute => Único método a ser chamado desse caso de uso.
  async execute({
    administratorId,
  }: GetProfileAdministratorUseCaseRequest): Promise<GetProfileAdministratorUseCaseResponse> {
    // Valida se o email que o administrador está informando existe na base de dados
    const administrator =
      await this.administratorsInterface.findById(administratorId)

    if (!administrator) {
      throw new ResourceNotFound()
    }

    return { administrator }
  }
}
