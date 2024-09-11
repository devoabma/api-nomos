import type { LawyersInterface } from '@/repositories/interfaces/lawyers-interface'

interface GetLawyersMetricsUseResponse {
  countAllLawyers: number
}

export class GetLawyersMetricsUseCase {
  constructor(private lawyersInterface: LawyersInterface) {}

  async execute(): Promise<GetLawyersMetricsUseResponse> {
    const countAllLawyers = await this.lawyersInterface.countAllLawyer()

    return { countAllLawyers }
  }
}
