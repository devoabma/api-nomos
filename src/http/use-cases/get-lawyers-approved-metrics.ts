import type { LawyersInterface } from '@/repositories/interfaces/lawyers-interface'

interface GetLawyersApprovedMetrics {
  lawyersApproved: number
}

export class GetLawyersApprovedMetricsUseCase {
  constructor(private lawyersInterface: LawyersInterface) {}

  async execute(): Promise<GetLawyersApprovedMetrics> {
    const lawyersApproved = await this.lawyersInterface.countLawyerApproved()

    return { lawyersApproved }
  }
}
