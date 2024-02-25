import { prismaClient } from "@/lib/prisma"
import { Prisma } from "@prisma/client"
import { UsersRepository } from "../interfaces/users-repository"

export class PrismaUsersRepository implements UsersRepository {
  async findById(id: string) {
    const user = await prismaClient.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async findByEmail(email: string) {
    const userWithSameEmail = await prismaClient.user.findUnique({
      where: {
        email,
      },
    })

    return userWithSameEmail
  }

  async create(data: Prisma.UserCreateInput) {
    const user = await prismaClient.user.create({
      data,
    })

    return user
  }
}
