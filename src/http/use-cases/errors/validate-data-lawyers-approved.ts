export class ValidateDataLawyersApprovedError extends Error {
  constructor() {
    super('Você já aprovou os seus dados para cadastro no GERID.')
  }
}
