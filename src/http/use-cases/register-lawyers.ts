import type { Lawyers } from '@prisma/client'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { API_PROTHEUS } from '@/lib/axios'
import type { LawyersInterface } from '@/repositories/interfaces/lawyers-interface'

import { LawyerAlreadyExists } from './errors/lawyer-already-exists'
import { LawyerNotFound } from './errors/lawyer-not-found'

interface RegisterLawyersUseCaseRequest {
  cpf: string
  oab: string
  birth: string
}

interface RegisterLawyersUseCaseResponse {
  lawyer: Lawyers
}

interface LawyersProps {
  lawyer: {
    nome: string
    cpf: string
    registro: string
    dataNascimento: string
    email: string
    telefone: string
  }
}

export class RegisterLawyersUseCase {
  constructor(private lawyersInterface: LawyersInterface) {}

  async execute({
    cpf,
    oab,
    birth,
  }: RegisterLawyersUseCaseRequest): Promise<RegisterLawyersUseCaseResponse> {
    /** Busca na API do Protheus */
    const { data } = await API_PROTHEUS<LawyersProps>(`/${cpf}`)

    /** Formata a data para 02031993 */
    dayjs.extend(utc)
    const formattedDateBirth = dayjs(data.lawyer.dataNascimento)
      .utc()
      .format('DDMMYYYY')

    if (oab !== data.lawyer.registro || birth !== formattedDateBirth) {
      throw new LawyerNotFound()
    }

    /** Verifica se o advogado já esta cadastrado na base de dados */
    const lawyerWithSameCPF = await this.lawyersInterface.findByCPF(cpf)
    const lawyerWithSameOAB = await this.lawyersInterface.findByOAB(oab)

    if (lawyerWithSameCPF || lawyerWithSameOAB) {
      throw new LawyerAlreadyExists()
    }

    const lawyer = await this.lawyersInterface.create({
      name: data.lawyer.nome,
      cpf,
      oab,
      email: data.lawyer.email,
      birth: formattedDateBirth,
      telephone: data.lawyer.telefone,
    })

    return { lawyer }
  }
}
