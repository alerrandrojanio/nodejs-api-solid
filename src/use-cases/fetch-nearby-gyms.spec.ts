import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { expect, describe, it, beforeEach } from "vitest"
import { FetchNearbyGymsUseCase } from "./fetch-nearby-gyms"

let inMemoryGymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe("Fetch Nearby Gyms Use Case", () => {
  beforeEach(async () => {
    inMemoryGymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(inMemoryGymsRepository)
  })

  it("should be able to fetch nearby gyms", async () => {
    await inMemoryGymsRepository.create({
      title: "Near Gym",
      description: "Gym description",
      phone: "123456789",
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    await inMemoryGymsRepository.create({
      title: "Far Gym",
      description: "Gym description",
      phone: "123456789",
      latitude: -27.0610928,
      longitude: -49.5229501,
    })

    const { gyms } = await sut.execute({
      userLatitude: -27.2092052,
      userLongitude: -49.6401091,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: "Near Gym" })])
  })
})
