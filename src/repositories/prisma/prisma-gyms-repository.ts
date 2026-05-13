import { prisma } from '@/lib/prisma'
import { Gym, Prisma } from '@prisma/client'
import { FindManyNearbyParams, GymsRepository } from '../gyms-repository'

const NEARBY_RADIUS_IN_KILOMETERS = 10
const KILOMETERS_PER_LATITUDE_DEGREE = 111.32

export class PrismaGymsRepository implements GymsRepository {
  async findById(id: string) {
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    })

    return gym
  }

  async findManyNearby({ latitude, longitude }: FindManyNearbyParams) {
    const latitudeDelta =
      NEARBY_RADIUS_IN_KILOMETERS / KILOMETERS_PER_LATITUDE_DEGREE
    const longitudeDelta =
      NEARBY_RADIUS_IN_KILOMETERS /
      (KILOMETERS_PER_LATITUDE_DEGREE *
        Math.max(Math.abs(Math.cos((latitude * Math.PI) / 180)), 0.01))

    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * FROM gyms
      WHERE latitude BETWEEN ${latitude - latitudeDelta} AND ${latitude + latitudeDelta}
        AND longitude BETWEEN ${longitude - longitudeDelta} AND ${longitude + longitudeDelta}
        AND ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= ${NEARBY_RADIUS_IN_KILOMETERS}
    `

    return gyms
  }

  async searchMany(query: string, page: number) {
    const gyms = await prisma.gym.findMany({
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

  async create(data: Prisma.GymCreateInput) {
    const gym = await prisma.gym.create({
      data,
    })

    return gym
  }
}
