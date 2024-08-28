import { Administrators, Prisma } from '@prisma/client'

export interface AdministratorsInterface {
  findById(id: string): Promise<Administrators | null>
  findByEmail(email: string): Promise<Administrators | null>
  create(data: Prisma.AdministratorsCreateInput): Promise<Administrators>
}
