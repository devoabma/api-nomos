export class SecurityCodeIncorrect extends Error {
  constructor() {
    super('Código de segurança incorreto. Tente novamente!')
  }
}
