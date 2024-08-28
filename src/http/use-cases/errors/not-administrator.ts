export class NotAdministrator extends Error {
  constructor() {
    super('Acesso permitido somente para administradores.')
  }
}
