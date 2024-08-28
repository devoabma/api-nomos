import { Prisma } from '@prisma/client'

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

  async create(data: Prisma.LawyersUncheckedCreateInput) {
    const lawyer = await prisma.lawyers.create({
      data,
    })

    return lawyer
  }
}
