import type { Lawyers } from '@prisma/client'

// import { resend } from '@/lib/resend'
import type { LawyersInterface } from '@/repositories/interfaces/lawyers-interface'

// import { TemplateSendEmailLawyers } from '@/utils/template-send-email-lawyers'
import { LawyerAlreadyRegistered } from './errors/lawyer-already-registered'
import { NotConfirmLawyerError } from './errors/not-confirm-lawyer-error'
import { ResourceNotFound } from './errors/resource-not-found-error'

interface ConfirmLawyerGeridRequest {
  lawyerId: string
}

interface ConfirmLawyerGeridResponse {
  lawyer: Lawyers
}

export class ConfirmLawyerGerid {
  // Obtendo as dependências do caso de uso ao invés de instância-las.
  constructor(private lawyersInterface: LawyersInterface) {}

  // execute => Único método a ser chamado desse caso de uso.
  async execute({
    lawyerId,
  }: ConfirmLawyerGeridRequest): Promise<ConfirmLawyerGeridResponse> {
    const lawyer = await this.lawyersInterface.findById(lawyerId)

    if (!lawyer) {
      throw new ResourceNotFound()
    }

    if (!lawyer.informations_accepted) {
      throw new NotConfirmLawyerError()
    }

    if (lawyer.registered) {
      throw new LawyerAlreadyRegistered()
    }

    // Dispara e-mail de confirmação de registro para o advogado
    // await resend.emails.send({
    //   from: 'OAB INSS DIGITAL <inssdigital@oabma.com.br>',
    //   // TODO: Depois alterar o e-mail para o do advogado
    //   to: 'hilquiasfmelo@hotmail.com',
    //   subject: 'Confirmação de cadastro no GERID ✅',
    //   react: TemplateSendEmailLawyers({
    //     name: lawyer.name,
    //     cpf: lawyer.cpf,
    //     oab: lawyer.oab,
    //     email: lawyer.email,
    //     birth: lawyer.birth,
    //   }),
    // })

    /** Seta a data que o administrador confirmou o cadastro do advogado no GERID */
    lawyer.registered = new Date()

    await this.lawyersInterface.save(lawyer)

    return { lawyer }
  }
}
