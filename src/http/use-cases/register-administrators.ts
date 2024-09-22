import type { Administrators } from '@prisma/client'
import { hash } from 'bcryptjs'

import { env } from '@/env'
import { resend } from '@/lib/resend'
// import { resend } from '@/lib/resend'
import type { AdministratorsInterface } from '@/repositories/interfaces/administrators-interface'
// import { getCurrentDateInfo } from '@/utils/get-current-date-info'
import { TemplateSendEmailAdministrator } from '@/utils/template-send-email-administrator'

// import { getCurrentDateInfo } from '@/utils/get-current-date-info'
import { AdministradorAlreadyExists } from './errors/administrator-already-exists'
import { SecurityCodeIncorrect } from './errors/security-code-incorrect'

interface RegisterAdministratorsUseCaseRequest {
  name: string
  email: string
  password: string
  securityCode: string
}

interface RegisterAdministratorsUseCaseResponse {
  administrator: Administrators
}

export class RegisterAdministratorsUseCase {
  // Obtendo as dependências do caso de uso ao invés de instância-las.
  constructor(private administratorsInterface: AdministratorsInterface) {}

  // execute => Único método a ser chamado desse caso de uso.
  async execute({
    name,
    email,
    password,
    securityCode,
  }: RegisterAdministratorsUseCaseRequest): Promise<RegisterAdministratorsUseCaseResponse> {
    // Gerando hash da senha e do código de registro.
    const password_hash = await hash(password, 6)
    const code_hash = await hash(securityCode, 6)

    // const { day, fullMonth, year } = getCurrentDateInfo()

    // Busca no banco de dados se tem algum usuário criado com esse e-mail.
    const searchAdministrator =
      await this.administratorsInterface.findByEmail(email)

    if (email === searchAdministrator?.email) {
      throw new AdministradorAlreadyExists()
    }

    const registredCode = env.SECURITY_CODE

    if (securityCode !== registredCode) {
      throw new SecurityCodeIncorrect()
    }

    // const { day, fullMonth, year } = getCurrentDateInfo()

    // Dispara e-mail de confirmação de registro
    await resend.emails.send({
      from: 'OAB INSS DIGITAL <inssdigital@oabma.com.br>',
      // TODO: Depois alterar o e-mail para produção
      to: 'hilquiasfmelo@hotmail.com',
      subject: 'Cadastro Administrativo ✅',
      react: TemplateSendEmailAdministrator({
        name,
        email,
        password,
      }),
    })

    const administrator = await this.administratorsInterface.create({
      name,
      email,
      password_hash,
      code_hash,
    })

    return { administrator }
  }
}
