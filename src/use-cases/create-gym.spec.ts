import { expect, describe, it, beforeEach } from "vitest"
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository"
import { CreateGymUseCase } from "./create-gym"

let inMemoryGymsRepository: InMemoryGymsRepository
let sut: CreateGymUseCase

describe("Gym Use Case", () => {
  beforeEach(() => {
    inMemoryGymsRepository = new InMemoryGymsRepository()
    sut = new CreateGymUseCase(inMemoryGymsRepository)
  })

  it("should be able to create gym", async () => {
    const { gym } = await sut.execute({
      title: "Gym",
      description: "Gym description",
      phone: "123456789",
      latitude: -27.2092052,
      longitude: -49.6401091,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
