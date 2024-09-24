export class NotConfirmLawyerError extends Error {
  constructor() {
    super('Ação proibida! Esse advogado ainda não confirmou seus dados.')
  }
}
