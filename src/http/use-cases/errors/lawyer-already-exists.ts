export class LawyerAlreadyExists extends Error {
  constructor() {
    super(
      'Você já possue cadastro. Por favor, efetue o login para acessar seus dados.',
    )
  }
}
