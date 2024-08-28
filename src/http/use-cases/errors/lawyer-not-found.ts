export class LawyerNotFound extends Error {
  constructor() {
    super('Advogado não encontrado ou dados inconsistentes')
  }
}
