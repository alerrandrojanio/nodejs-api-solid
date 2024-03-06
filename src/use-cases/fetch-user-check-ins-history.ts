import { CheckIn } from "@prisma/client"
import { CheckInsRepository } from "@/repositories/interfaces/check-ins-repository"

interface FetchUserCheckInsHistoricUseCaseRequest {
  userId: string
  page: number
}

interface FetchUserCheckInsHistoricUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchUserCheckInsHistoricUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    userId,
    page,
  }: FetchUserCheckInsHistoricUseCaseRequest): Promise<FetchUserCheckInsHistoricUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page
    )

    return {
      checkIns,
    }
  }
}
