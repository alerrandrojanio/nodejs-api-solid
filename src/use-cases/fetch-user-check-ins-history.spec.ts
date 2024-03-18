import { expect, describe, it, beforeEach } from "vitest"
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository"
import { FetchUserCheckInsHistoryUseCase } from "./fetch-user-check-ins-history"

let inMemoryCheckInsRepository: InMemoryCheckInsRepository
let sut: FetchUserCheckInsHistoryUseCase

describe("Fetch User Check Ins Historic Use Case", () => {
  beforeEach(async () => {
    inMemoryCheckInsRepository = new InMemoryCheckInsRepository()
    sut = new FetchUserCheckInsHistoryUseCase(inMemoryCheckInsRepository)
  })

  it("should be able to fetch check-in history", async () => {
    await inMemoryCheckInsRepository.create({
      gym_id: "gym-id-01",
      user_id: "user-id",
    })

    await inMemoryCheckInsRepository.create({
      gym_id: "gym-id-02",
      user_id: "user-id",
    })

    const { checkIns } = await sut.execute({
      userId: "user-id",
      page: 1,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-id-01" }),
      expect.objectContaining({ gym_id: "gym-id-02" }),
    ])
  })

  it("should be able to fetch paginated check-in history", async () => {
    for (let i = 1; i <= 22; i++) {
      await inMemoryCheckInsRepository.create({
        gym_id: `gym-id-${i}`,
        user_id: "user-id",
      })
    }

    const { checkIns } = await sut.execute({
      userId: "user-id",
      page: 2,
    })

    expect(checkIns).toHaveLength(2)
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-id-21" }),
      expect.objectContaining({ gym_id: "gym-id-22" }),
    ])
  })
})
