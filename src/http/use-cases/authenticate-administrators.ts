import type { Administrators } from '@prisma/client'
import { compare } from 'bcryptjs'

import { env } from '@/env'
import type { AdministratorsInterface } from '@/repositories/interfaces/administrators-interface'

import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { NotAdministrator } from './errors/not-administrator'

interface AuthenticateAdministratorsUseCaseRequest {
  email: string
  password: string
}

interface AuthenticateAdministratorsUseCaseResponse {
  administrator: Administrators
}

export class AuthenticateAdministratorsUseCase {
  // Obtendo as dependências do caso de uso ao invés de instância-las.
  constructor(private administratorsInterface: AdministratorsInterface) {}

  // execute => Único método a ser chamado desse caso de uso.
  async execute({
    email,
    password,
  }: AuthenticateAdministratorsUseCaseRequest): Promise<AuthenticateAdministratorsUseCaseResponse> {
    // Valida se o email que o administrador está informando existe na base de dados
    const administrator = await this.administratorsInterface.findByEmail(email)

    if (!administrator) {
      throw new InvalidCredentialsError()
    }

    // Valida se a senha que o administradors está informando bate com a que está na base de dados
    const doesPasswordMatches = await compare(
      password,
      administrator.password_hash,
    )

    if (!doesPasswordMatches) {
      throw new InvalidCredentialsError()
    }

    const secutiryCode = env.SECURITY_CODE

    const doesSecurityCodeMatches = await compare(
      secutiryCode,
      administrator.code_hash,
    )

    if (!doesSecurityCodeMatches) {
      throw new NotAdministrator()
    }

    return { administrator }
  }
}
