import { type Lawyers, Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import type { LawyersInterface } from '../interfaces/lawyers-interface'

export class PrismaLawyersRepository implements LawyersInterface {
  async findById(id: string) {
    const lawyer = await prisma.lawyers.findUnique({
      where: {
        id,
      },
    })

    return lawyer
  }

  async findByCPF(cpf: string) {
    const lawyer = await prisma.lawyers.findUnique({
      where: {
        cpf,
      },
    })

    return lawyer
  }

  async findByOAB(oab: string) {
    const lawyer = await prisma.lawyers.findUnique({
      where: {
        oab,
      },
    })

    return lawyer
  }

  async findMany(
    pageIndex: number,
    name?: string,
    cpf?: string,
    email?: string,
  ) {
    const lawyers = await prisma.lawyers.findMany({
      take: 10,
      skip: (pageIndex - 1) * 10,
      where: {
        ...(name && { name: { contains: name, mode: 'insensitive' } }), // Filtro por nome, insensível a maiúsculas/minúsculas
        ...(cpf && { cpf }),
        ...(email && { email: { contains: email, mode: 'insensitive' } }),
      },
      orderBy: [
        { registered: 'desc' }, // Os primeiros serão os últimos
        { informations_accepted: 'asc' }, // Os últimos serão os primeiros
      ],
      select: {
        id: true,
        name: true,
        cpf: true,
        oab: true,
        email: true,
        birth: true,
        telephone: true,
        informations_accepted: true,
        registered: true,
        role: true,
        created_at: true,
        updated_at: true,
      },
    })

    return lawyers
  }

  async countAllLawyer() {
    const lawyers = await prisma.lawyers.count()

    return lawyers
  }

  async countLawyerApproved(): Promise<number> {
    const lawyersApproved = await prisma.lawyers.count({
      where: {
        informations_accepted: {
          not: null,
        },
      },
    })

    return lawyersApproved
  }

  async countLawyerRegistered(): Promise<number> {
    const lawyersRegistered = await prisma.lawyers.count({
      where: {
        registered: {
          not: null,
        },
      },
    })

    return lawyersRegistered
  }

  async create(data: Prisma.LawyersUncheckedCreateInput) {
    const lawyer = await prisma.lawyers.create({
      data,
    })

    return lawyer
  }

  async save(data: Lawyers) {
    const lawyer = await prisma.lawyers.update({
      where: {
        id: data.id,
      },
      data,
    })

    return lawyer
  }
}
