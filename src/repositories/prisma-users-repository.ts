import { prismaClient } from "@/lib/prisma"
import { Prisma } from "@prisma/client"

export class PrismaUsersRepository {
  async create(data: Prisma.UserCreateInput) {
    const user = await prismaClient.user.create({
      data,
    })

    return user
  }
}
