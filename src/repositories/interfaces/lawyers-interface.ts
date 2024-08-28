import { Lawyers, Prisma } from '@prisma/client'

export interface LawyersInterface {
  findById(id: string): Promise<Lawyers | null>
  findByCPF(cpf: string): Promise<Lawyers | null>
  findByOAB(oab: string): Promise<Lawyers | null>
  create(data: Prisma.LawyersUncheckedCreateInput): Promise<Lawyers>
}
