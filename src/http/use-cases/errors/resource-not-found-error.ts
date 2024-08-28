export class ResourceNotFound extends Error {
  constructor() {
    super('Esse recurso não foi encontrado.')
  }
}
