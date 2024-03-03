import { Prisma } from "@prisma/client"
import { CheckInsRepository } from "../interfaces/check-ins-repository"
import { prismaClient } from "@/lib/prisma"

export class PrismaCheckInsRepository implements CheckInsRepository {
  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = await prismaClient.checkIn.create({
      data,
    })

    return checkIn
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const checkInOnSameDay = await prismaClient.checkIn.findFirst({
      where: {
        user_id: userId,
        created_at: {
          gte: date,
          lt: new Date(date.getTime() + 24 * 60 * 60 * 1000),
        },
      },
    })

    return checkInOnSameDay
  }
}
