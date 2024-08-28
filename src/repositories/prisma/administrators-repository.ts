import { Prisma } from '@prisma/client'

import { prisma } from '@/lib/prisma'

import type { AdministratorsInterface } from '../interfaces/administrators-interface'

export class PrismaAdmininistratosRepository
  implements AdministratorsInterface
{
  async findById(id: string) {
    const administrator = await prisma.administrators.findUnique({
      where: {
        id,
      },
    })

    return administrator
  }

  async findByEmail(email: string) {
    const administrator = await prisma.administrators.findUnique({
      where: {
        email,
      },
    })

    return administrator
  }

  async create(data: Prisma.AdministratorsCreateInput) {
    const administrator = await prisma.administrators.create({
      data,
    })

    return administrator
  }
}
