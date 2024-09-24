export class LawyerLoginDefaulterError extends Error {
  constructor() {
    super(
      'Não podemos seguir com o login! Por favor, entre em contato com o Setor Financeiro para regularização.',
    )
  }
}
