export class NotConfirmLawyerError extends Error {
  constructor() {
    super('Ação proibida! Pois esse advogado ainda não confirmou seus dados.')
  }
}
