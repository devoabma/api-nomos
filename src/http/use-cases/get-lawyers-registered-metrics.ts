import type { LawyersInterface } from '@/repositories/interfaces/lawyers-interface'

interface GetLawyersRegisteredMetrics {
  lawyersRegistered: number
}

export class GetLawyersRegisteredMetricsUseCase {
  constructor(private lawyersInterface: LawyersInterface) {}

  async execute(): Promise<GetLawyersRegisteredMetrics> {
    const lawyersRegistered =
      await this.lawyersInterface.countLawyerRegistered()

    return { lawyersRegistered }
  }
}
