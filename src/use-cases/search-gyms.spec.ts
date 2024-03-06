import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { expect, describe, it, beforeEach } from "vitest"
import { SearchGymsUseCase } from "./search-gyms"

let inMemoryGymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe("Search Gyms Use Case", () => {
  beforeEach(async () => {
    inMemoryGymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(inMemoryGymsRepository)
  })

  it("should be able to search for gyms", async () => {
    await inMemoryGymsRepository.create({
      title: "Javascript Gym",
      description: "Gym description",
      phone: "123456789",
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    await inMemoryGymsRepository.create({
      title: "Typescript Gym",
      description: "Gym description",
      phone: "123456789",
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    const { gyms } = await sut.execute({
      query: "Typescript",
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: "Typescript Gym" })])
  })

  it("should be able to fetch paginated gyms search", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryGymsRepository.create({
        title: `Gym ${i}`,
        description: "Gym description",
        phone: "123456789",
        latitude: -27.2092052,
        longitude: -49.6401091,
      })
    }

    const { gyms } = await sut.execute({
      query: "Gym",
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: "Gym 21" }),
      expect.objectContaining({ title: "Gym 22" }),
    ])
  })
})
