export class InvalidCredentialsError extends Error {
  constructor() {
    super('Credenciais inseridas são inválidas.')
  }
}
