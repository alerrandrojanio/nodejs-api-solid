import { prismaClient } from "@/lib/prisma"
import {
  FindManyNearbyParams,
  GymsRepository,
} from "../interfaces/gyms-repository"
import { Gym, Prisma } from "@prisma/client"

export class PrismaGymsRepository implements GymsRepository {
  async findById(gymId: string) {
    const gym = await prismaClient.gym.findUnique({
      where: {
        id: gymId,
      },
    })

    return gym
  }

  async create(data: Prisma.GymCreateInput) {
    const gym = await prismaClient.gym.create({
      data,
    })

    return gym
  }

  async searchMany(query: string, page: number) {
    const gyms = await prismaClient.gym.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return gyms
  }

  async findManyNearby(params: FindManyNearbyParams) {
    const gyms = await prismaClient.$queryRaw<Gym[]>`
      SELECT * FROM gyms
      WHERE ( 6371 * acos( cos( radians(${params.userLatitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${params.userLongitude}) ) + sin( radians(${params.userLatitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `

    return gyms
  }
}
