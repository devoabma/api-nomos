export class AdministradorAlreadyExists extends Error {
  constructor() {
    super('Esse administrador já existe na base de dados.')
  }
}
