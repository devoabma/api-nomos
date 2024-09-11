import type { Lawyers } from '@prisma/client'

// import { resend } from '@/lib/resend'
import type { LawyersInterface } from '@/repositories/interfaces/lawyers-interface'

// import { getCurrentDateInfo } from '@/utils/get-current-date-info'
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

    // const { day, fullMonth, year } = getCurrentDateInfo()

    // Dispara e-mail de confirmação de registro
    // await resend.emails.send({
    //   from: 'OAB INSS DIGITAL <inssdigital@oabma.com.br>',
    //   to: lawyer.email,
    //   subject: 'Confirmação de cadastro no GERID ✅',
    //   html: `
    //       <strong>Nome completo: ${lawyer.name}</strong><br/>
    //       <strong>CPF: ${lawyer.cpf}</strong><br/>
    //        <strong>E-mail: ${lawyer.oab}</strong><br/>
    //       <strong>E-mail: ${lawyer.email}</strong><br/>
    //       <strong>E-mail: ${lawyer.birth}</strong><br/>
    //       <strong>Cadastro realizado em ${day} de ${fullMonth} de ${year}<br/>
    //     `,
    // })

    /** Seta a data que o administrador confirmou o cadastro do advogado no GERID */
    lawyer.registered = new Date()

    await this.lawyersInterface.save(lawyer)

    return { lawyer }
  }
}
