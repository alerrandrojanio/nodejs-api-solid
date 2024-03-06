import { expect, describe, it, beforeEach } from "vitest"
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository"
import { GetUserMetricsUseCase } from "./get-user-metrics"

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let sut: GetUserMetricsUseCase

describe("Get User Metrics Use Case", () => {
  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    sut = new GetUserMetricsUseCase(inMemoryCheckInsRepository)
  })

  it("should be able to get check-ins count from metrics", async () => {
    await inMemoryCheckInsRepository.create({
      gym_id: "gym-id-01",
      user_id: "user-id",
    })

    await inMemoryCheckInsRepository.create({
      gym_id: "gym-id-02",
      user_id: "user-id",
    })

    const { checkInsCount } = await sut.execute({
      userId: "user-id",
    })

    expect(checkInsCount).toEqual(2)
  })
})
