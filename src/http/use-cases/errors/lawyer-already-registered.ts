export class LawyerAlreadyRegistered extends Error {
  constructor() {
    super('Esse advogado(a) já foi confirmado no GERID.')
  }
}
