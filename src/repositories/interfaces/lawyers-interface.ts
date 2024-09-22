import { Lawyers, Prisma } from '@prisma/client'

export interface LawyersInterface {
  findById(id: string): Promise<Lawyers | null>
  findByCPF(cpf: string): Promise<Lawyers | null>
  findByOAB(oab: string): Promise<Lawyers | null>
  countAllLawyer(): Promise<number>
  countLawyerApproved(): Promise<number>
  countLawyerRegistered(): Promise<number>
  findMany(
    pageIndex: number,
    name?: string,
    cpf?: string,
    email?: string,
  ): Promise<Lawyers[]>
  create(data: Prisma.LawyersUncheckedCreateInput): Promise<Lawyers>
  save(lawyer: Lawyers): Promise<Lawyers>
}
