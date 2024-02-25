import { expect, describe, it } from "vitest"
import { hash } from "bcryptjs"
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository"
import { beforeEach } from "vitest"
import { GetUserProfileUseCase } from "./get-user-profile"
import { ResourceNotFoundError } from "./errors/resource-not-found-error"

let inMemoryUsersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe("Get User Profile Use Case", () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(inMemoryUsersRepository)
  })

  it("should be able to get user profile", async () => {
    const createdUser = await inMemoryUsersRepository.create({
      name: "John Doe",
      email: "johndoe@email.com",
      password_hash: await hash("123456", 6),
    })

    const { user } = await sut.execute({
      userId: createdUser.id,
    })

    expect(user.id).toEqual(expect.any(String))
    expect(user.name).toEqual(createdUser.name)
  })

  it("should be able to get user profile with wrong id", async () => {
    await expect(() =>
      sut.execute({
        userId: "wrong-id",
      })
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
